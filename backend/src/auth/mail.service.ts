import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private logger = new Logger(MailService.name);

  constructor(private prisma: PrismaService) {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async send(params: {
    to: string;
    subject: string;
    html: string;
    userId?: string;
    type:
      | 'EMAIL_VERIFICATION'
      | 'PASSWORD_RESET'
      | 'WELCOME'
      | 'INVOICE'
      | 'LOW_STOCK_ALERT'
      | 'DAILY_REPORT'
      | 'PAYMENT_REMINDER';
  }) {
    let logId: string | undefined;

    try {
      const log = await this.prisma.emailLog.create({
        data: {
          userId: params.userId,
          type: params.type,
          status: 'PENDING',
          toEmail: params.to,
          fromEmail: process.env.MAIL_FROM!,
          subject: params.subject,
          bodyPreview: params.html.substring(0, 200),
        },
      });
      logId = log.id;

      const info = await this.transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: params.to,
        subject: params.subject,
        html: params.html,
      });

      await this.prisma.emailLog.update({
        where: { id: logId },
        data: { status: 'SENT', sentAt: new Date(), messageId: info.messageId },
      });

      return { success: true };
    } catch (err: any) {
      this.logger.error('Email failed: ' + err.message);

      if (logId) {
        await this.prisma.emailLog.update({
          where: { id: logId },
          data: { status: 'FAILED', error: err.message },
        });
      }

      return { success: false, error: err.message };
    }
  }

  verificationEmail(name: string, link: string) {
    return `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
        <h2 style="color:#333;">Welcome to InvoiceFlow Pakistan, ${name}!</h2>
        <p>Please verify your email address by clicking the button below:</p>
        <p style="text-align:center;margin:30px 0;">
          <a href="${link}" style="background:#2563eb;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;">
            Verify Email
          </a>
        </p>
        <p style="color:#666;font-size:13px;">This link expires in 24 hours.</p>
        <p style="color:#666;font-size:13px;">If you didn't create this account, please ignore this email.</p>
      </div>
    `;
  }

  passwordResetEmail(name: string, link: string) {
    return `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
        <h2 style="color:#333;">Password Reset Request</h2>
        <p>Hi ${name},</p>
        <p>Click the button below to reset your password. This link expires in 1 hour.</p>
        <p style="text-align:center;margin:30px 0;">
          <a href="${link}" style="background:#dc2626;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;">
            Reset Password
          </a>
        </p>
        <p style="color:#666;font-size:13px;">If you didn't request this, ignore this email. Your password won't change.</p>
      </div>
    `;
  }

  welcomeEmail(name: string, shopName: string) {
    return `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
        <h2 style="color:#333;">Welcome, ${name}!</h2>
        <p>Your shop <b>${shopName}</b> is now set up on InvoiceFlow Pakistan.</p>
        <p style="text-align:center;margin:30px 0;">
          <a href="${process.env.FRONTEND_URL}/login" style="background:#16a34a;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;">
            Log In to Your Shop
          </a>
        </p>
      </div>
    `;
  }

  passwordChangedEmail(name: string) {
    return `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
        <h2 style="color:#333;">Password Changed</h2>
        <p>Hi ${name},</p>
        <p>Your password was successfully changed.</p>
        <p style="color:#dc2626;font-size:13px;">If you didn't do this, contact support immediately.</p>
      </div>
    `;
  }
}