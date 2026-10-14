import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto';
import { MailService } from './mail.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private mail: MailService,
  ) {}

  // Hash any token with SHA-256 before storing/looking up
  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  private signAccessToken(userId: string, role: any, shopId: string | null) {
    const payload = {
      sub: userId,
      role: role,
      shopId: shopId || '',
    };
    const options: any = {
      secret: process.env.JWT_SECRET as string,
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    };
    return this.jwt.sign(payload, options);
  }

  // ============================================
  // REGISTER
  // ============================================
  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new BadRequestException('Email already registered');

    const passwordHash = await bcrypt.hash(
      dto.password,
      Number(process.env.BCRYPT_ROUNDS || 10),
    );

    let shopId: string | undefined;
    if (dto.shopName) {
      const shop = await this.prisma.shop.create({
        data: { name: dto.shopName },
      });
      shopId = shop.id;
    }

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        fullName: dto.fullName,
        phone: dto.phone,
        role: dto.shopName ? 'OWNER' : 'CASHIER',
        shopId,
        status: 'PENDING_VERIFICATION',
      },
    });

    const rawToken = crypto.randomBytes(32).toString('hex');
    await this.prisma.emailVerification.create({
      data: {
        userId: user.id,
        token: this.hashToken(rawToken),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    const link = `${process.env.FRONTEND_URL}/verify-email?token=${rawToken}`;

    // Log the link in dev so you can copy it directly if Gmail is slow
    console.log('==========================================');
    console.log('📧 NEW REGISTRATION');
    console.log('   Email:', user.email);
    console.log('   🔗 VERIFY LINK:', link);
    console.log('==========================================');

    await this.mail.send({
      to: user.email,
      subject: 'Verify your InvoiceFlow Pakistan account',
      html: this.mail.verificationEmail(user.fullName, link),
      userId: user.id,
      type: 'EMAIL_VERIFICATION',
    });

    return {
      message: 'Registered successfully. Please check your email to verify.',
      userId: user.id,
    };
  }

  // ============================================
  // VERIFY EMAIL (idempotent)
  // ============================================
  async verifyEmail(rawToken: string) {
    console.log('==========================================');
    console.log('🔵 VERIFY EMAIL CALLED');
    console.log('   Raw token:', rawToken);
    console.log('   Token length:', rawToken?.length);

    const hashed = this.hashToken(rawToken);
    console.log('   Hashed token:', hashed);

    const record = await this.prisma.emailVerification.findUnique({
      where: { token: hashed },
      include: { user: true },
    });

    if (!record) {
      console.log('❌ NO RECORD FOUND for this hashed token');
      console.log('==========================================');
      throw new BadRequestException('Invalid or expired verification token');
    }

    console.log('✅ RECORD FOUND');
    console.log('   userId:', record.userId);
    console.log('   expiresAt:', record.expiresAt);
    console.log('   verifiedAt:', record.verifiedAt);
    console.log('   now:', new Date());
    console.log('   isExpired:', record.expiresAt < new Date());
    console.log('   isUsed:', !!record.verifiedAt);

    // Expired check
    if (record.expiresAt < new Date()) {
      console.log('❌ EXPIRED');
      console.log('==========================================');
      throw new BadRequestException(
        'Verification link has expired. Please register again.',
      );
    }

    // Already verified — return success (idempotent, no error on re-click)
    if (record.verifiedAt) {
      console.log('✅ ALREADY VERIFIED — returning success (idempotent)');
      console.log('==========================================');
      return { message: 'Email already verified. You can log in.' };
    }

    // First-time verification
    console.log('🔄 Marking as verified...');
    await this.prisma.$transaction([
      this.prisma.emailVerification.update({
        where: { id: record.id },
        data: { verifiedAt: new Date() },
      }),
      this.prisma.user.update({
        where: { id: record.userId },
        data: {
          emailVerified: true,
          emailVerifiedAt: new Date(),
          status: 'ACTIVE',
        },
      }),
    ]);

    console.log('✅ VERIFIED SUCCESSFULLY');
    console.log('==========================================');

    return { message: 'Email verified successfully. You can now log in.' };
  }

  // ============================================
  // LOGIN
  // ============================================
  async login(dto: LoginDto, ip?: string, userAgent?: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new UnauthorizedException('Account locked. Try again later.');
    }

    if (!user.emailVerified) {
      throw new UnauthorizedException(
        'Please verify your email before logging in.',
      );
    }

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Your account is not active.');
    }

    const passwordOk = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordOk) {
      const attempts = user.failedLoginAttempts + 1;
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: attempts,
          lockedUntil:
            attempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null,
        },
      });
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.signAccessToken(user.id, user.role, user.shopId);

    const rawRefresh = crypto.randomBytes(48).toString('hex');
    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: this.hashToken(rawRefresh),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    await this.prisma.session.create({
      data: {
        userId: user.id,
        token: this.hashToken(accessToken),
        ipAddress: ip,
        userAgent,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        lastLoginAt: new Date(),
        lastLoginIp: ip,
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
    });

    return {
      accessToken,
      refreshToken: rawRefresh,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        shopId: user.shopId,
      },
    };
  }

  // ============================================
  // LOGOUT
  // ============================================
  async logout(userId: string, rawAccessToken: string) {
    await this.prisma.session.updateMany({
      where: {
        userId,
        token: this.hashToken(rawAccessToken),
        isActive: true,
      },
      data: { isActive: false, revokedAt: new Date() },
    });
    return { message: 'Logged out successfully' };
  }

  // ============================================
  // REFRESH
  // ============================================
  async refresh(rawRefreshToken: string) {
    const hashed = this.hashToken(rawRefreshToken);
    const stored = await this.prisma.refreshToken.findUnique({
      where: { token: hashed },
      include: { user: true },
    });

    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const accessToken = this.signAccessToken(
      stored.user.id,
      stored.user.role,
      stored.user.shopId,
    );

    return { accessToken };
  }

  // ============================================
  // FORGOT PASSWORD
  // ============================================
  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    const genericResponse = {
      message: 'If that email exists, a reset link has been sent.',
    };
    if (!user) return genericResponse;

    const rawToken = crypto.randomBytes(32).toString('hex');
    await this.prisma.passwordReset.create({
      data: {
        userId: user.id,
        token: this.hashToken(rawToken),
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    const link = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;

    console.log('==========================================');
    console.log('🔑 PASSWORD RESET REQUESTED');
    console.log('   Email:', user.email);
    console.log('   🔗 RESET LINK:', link);
    console.log('==========================================');

    await this.mail.send({
      to: user.email,
      subject: 'Reset your InvoiceFlow Pakistan password',
      html: this.mail.passwordResetEmail(user.fullName, link),
      userId: user.id,
      type: 'PASSWORD_RESET',
    });

    return genericResponse;
  }

  // ============================================
  // RESET PASSWORD
  // ============================================
  async resetPassword(rawToken: string, newPassword: string) {
    if (!newPassword || newPassword.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters');
    }

    const hashed = this.hashToken(rawToken);
    const record = await this.prisma.passwordReset.findUnique({
      where: { token: hashed },
      include: { user: true },
    });

    if (!record || record.expiresAt < new Date() || record.usedAt) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const passwordHash = await bcrypt.hash(
      newPassword,
      Number(process.env.BCRYPT_ROUNDS || 10),
    );

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: record.userId },
        data: { passwordHash, failedLoginAttempts: 0, lockedUntil: null },
      }),
      this.prisma.passwordReset.update({
        where: { id: record.id },
        data: { usedAt: new Date() },
      }),
      this.prisma.session.updateMany({
        where: { userId: record.userId, isActive: true },
        data: { isActive: false, revokedAt: new Date() },
      }),
    ]);

    return { message: 'Password reset successful. Please log in again.' };
  }
}