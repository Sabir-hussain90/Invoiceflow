import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Fields we ever return to the client — never include passwordHash
  private readonly safeSelect = {
    id: true,
    email: true,
    fullName: true,
    phone: true,
    role: true,
    status: true,
    emailVerified: true,
    avatarUrl: true,
    shopId: true,
    lastLoginAt: true,
    createdAt: true,
    updatedAt: true,
  };

  // ---------------- LIST ----------------
  async findAll(shopId?: string) {
    return this.prisma.user.findMany({
      where: {
        deletedAt: null,
        ...(shopId ? { shopId } : {}),
      },
      select: this.safeSelect,
      orderBy: { createdAt: 'desc' },
    });
  }

  // ---------------- FIND ONE ----------------
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: this.safeSelect,
    });
    if (!user || user['deletedAt' as never]) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // ---------------- FIND BY EMAIL (used internally) ----------------
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: this.safeSelect,
    });
  }

  // ---------------- CREATE ----------------
  async create(dto: CreateUserDto, requesterShopId?: string) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (exists) throw new BadRequestException('Email already in use');

    const passwordHash = await bcrypt.hash(
      dto.password,
      Number(process.env.BCRYPT_ROUNDS || 10),
    );

    // If the requester has a shop, force the new user into that shop.
    // Otherwise, use the dto.shopId (only when called by an ADMIN).
    const shopId = requesterShopId || dto.shopId;

    const created = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        fullName: dto.fullName,
        phone: dto.phone,
        role: dto.role || 'CASHIER',
        shopId,
        status: 'ACTIVE',
        emailVerified: true,
        emailVerifiedAt: new Date(),
      },
      select: this.safeSelect,
    });

    return created;
  }

  // ---------------- UPDATE ----------------
  async update(id: string, dto: UpdateUserDto, requester: any) {
    const target = await this.prisma.user.findUnique({ where: { id } });
    if (!target) throw new NotFoundException('User not found');

    // Prevent a non-OWNER/ADMIN from editing users in a different shop
    if (
      requester.role !== 'ADMIN' &&
      target.shopId !== requester.shopId
    ) {
      throw new ForbiddenException('Cannot modify a user from another shop');
    }

    // A CASHIER cannot change roles or status of others
    if (
      requester.role === 'CASHIER' &&
      (dto.role || dto.status)
    ) {
      throw new ForbiddenException('You are not allowed to change role/status');
    }

    return this.prisma.user.update({
      where: { id },
      data: dto,
      select: this.safeSelect,
    });
  }

  // ---------------- SOFT DELETE ----------------
  async remove(id: string, requester: any) {
    const target = await this.prisma.user.findUnique({ where: { id } });
    if (!target) throw new NotFoundException('User not found');

    if (target.id === requester.id) {
      throw new BadRequestException('You cannot delete your own account');
    }

    if (
      requester.role !== 'ADMIN' &&
      target.shopId !== requester.shopId
    ) {
      throw new ForbiddenException('Cannot delete a user from another shop');
    }

    await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'INACTIVE' },
    });

    return { message: 'User deleted successfully' };
  }

  // ---------------- CHANGE PASSWORD (self) ----------------
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    if (!newPassword || newPassword.length < 6) {
      throw new BadRequestException('New password must be at least 6 characters');
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const ok = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!ok) throw new BadRequestException('Current password is incorrect');

    const passwordHash = await bcrypt.hash(
      newPassword,
      Number(process.env.BCRYPT_ROUNDS || 10),
    );

    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });

    return { message: 'Password changed successfully' };
  }
}