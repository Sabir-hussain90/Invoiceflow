import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './create-customer.dto';
import { UpdateCustomerDto } from './update-customer.dto';
import { QueryCustomerDto } from './query-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  // ---------------- LIST ----------------
  async findAll(shopId: string, q: QueryCustomerDto) {
    const where: any = {
      shopId,
      deletedAt: null,
    };

    if (q.search) {
      where.OR = [
        { name: { contains: q.search, mode: 'insensitive' } },
        { phone: { contains: q.search } },
        { email: { contains: q.search, mode: 'insensitive' } },
        { cnic: { contains: q.search } },
      ];
    }

    let customers = await this.prisma.customer.findMany({
      where,
      include: {
        _count: { select: { sales: true, payments: true } },
      },
      orderBy: { name: 'asc' },
    });

    // Post-filter: only customers with balance > 0
    if (q.withBalance === 'true') {
      customers = customers.filter((c) => Number(c.totalOwed) > 0);
    }

    return customers;
  }

  // ---------------- FIND ONE ----------------
  async findOne(id: string, shopId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        _count: { select: { sales: true, payments: true } },
      },
    });

    if (!customer || customer.deletedAt) {
      throw new NotFoundException('Customer not found');
    }

    if (customer.shopId !== shopId) {
      throw new ForbiddenException('Customer belongs to another shop');
    }

    return customer;
  }

  // ---------------- DETAIL WITH HISTORY ----------------
  async detail(id: string, shopId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        sales: {
          where: { deletedAt: null },
          orderBy: { saleDate: 'desc' },
          take: 30,
          select: {
            id: true,
            invoiceNumber: true,
            totalAmount: true,
            amountPaid: true,
            amountDue: true,
            paymentStatus: true,
            saleDate: true,
          },
        },
        payments: {
          orderBy: { paidAt: 'desc' },
          take: 30,
          select: {
            id: true,
            amount: true,
            method: true,
            paidAt: true,
            reference: true,
            notes: true,
          },
        },
      },
    });

    if (!customer || customer.deletedAt) {
      throw new NotFoundException('Customer not found');
    }

    if (customer.shopId !== shopId) {
      throw new ForbiddenException('Customer belongs to another shop');
    }

    return {
      ...customer,
      balanceDue: Number(customer.totalOwed),
      totalPurchases: customer.sales.reduce(
        (sum, s) => sum + Number(s.totalAmount),
        0,
      ),
    };
  }

  // ---------------- CREATE ----------------
  async create(shopId: string, dto: CreateCustomerDto) {
    // Prevent duplicate phone within the same shop
    if (dto.phone) {
      const dup = await this.prisma.customer.findFirst({
        where: { shopId, phone: dto.phone, deletedAt: null },
      });
      if (dup) {
        throw new BadRequestException(
          'A customer with this phone number already exists',
        );
      }
    }

    const openingBalance = Number(dto.openingBalance || 0);

    return this.prisma.customer.create({
      data: {
        shopId,
        name: dto.name.trim(),
        phone: dto.phone,
        email: dto.email,
        address: dto.address,
        city: dto.city,
        cnic: dto.cnic,
        notes: dto.notes,
        creditLimit: dto.creditLimit ?? 0,
        openingBalance,
        totalOwed: openingBalance,
      },
    });
  }

  // ---------------- UPDATE ----------------
  async update(id: string, shopId: string, dto: UpdateCustomerDto) {
    const customer = await this.prisma.customer.findUnique({ where: { id } });
    if (!customer || customer.deletedAt) {
      throw new NotFoundException('Customer not found');
    }
    if (customer.shopId !== shopId) {
      throw new ForbiddenException('Customer belongs to another shop');
    }

    // Prevent duplicate phone on rename
    if (dto.phone && dto.phone !== customer.phone) {
      const dup = await this.prisma.customer.findFirst({
        where: {
          shopId,
          phone: dto.phone,
          deletedAt: null,
          id: { not: id },
        },
      });
      if (dup) {
        throw new BadRequestException(
          'A customer with this phone number already exists',
        );
      }
    }

    return this.prisma.customer.update({
      where: { id },
      data: dto,
    });
  }

  // ---------------- RECORD PAYMENT (udhaar collection) ----------------
  async recordPayment(
    id: string,
    shopId: string,
    userId: string,
    amount: number,
    method:
      | 'CASH'
      | 'BANK_TRANSFER'
      | 'DIGITAL_WALLET'
      | 'CARD'
      | 'OTHER',
    reference?: string,
    notes?: string,
  ) {
    if (!amount || amount <= 0) {
      throw new BadRequestException('Amount must be greater than zero');
    }

    const customer = await this.prisma.customer.findUnique({ where: { id } });
    if (!customer || customer.deletedAt) {
      throw new NotFoundException('Customer not found');
    }
    if (customer.shopId !== shopId) {
      throw new ForbiddenException('Customer belongs to another shop');
    }

    const currentOwed = Number(customer.totalOwed);
    if (amount > currentOwed) {
      throw new BadRequestException(
        `Amount exceeds outstanding balance (Rs. ${currentOwed.toFixed(2)})`,
      );
    }

    return this.prisma.$transaction(async (tx) => {
      // Create the payment row (no sale linked — it's an account payment)
      await tx.payment.create({
        data: {
          shopId,
          customerId: id,
          receivedById: userId,
          amount,
          method,
          status: 'PAID',
          reference,
          notes,
        },
      });

      // Decrease owed, increase paid
      const updated = await tx.customer.update({
        where: { id },
        data: {
          totalOwed: { decrement: amount },
          totalPaid: { increment: amount },
        },
      });

      return {
        message: 'Payment recorded',
        newBalance: Number(updated.totalOwed),
        paymentAmount: amount,
      };
    });
  }

  // ---------------- SOFT DELETE ----------------
  async remove(id: string, shopId: string) {
    const customer = await this.prisma.customer.findUnique({ where: { id } });
    if (!customer || customer.deletedAt) {
      throw new NotFoundException('Customer not found');
    }
    if (customer.shopId !== shopId) {
      throw new ForbiddenException('Customer belongs to another shop');
    }

    if (Number(customer.totalOwed) > 0) {
      throw new BadRequestException(
        `Cannot delete: customer still owes Rs. ${Number(customer.totalOwed).toFixed(2)}`,
      );
    }

    await this.prisma.customer.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });

    return { message: 'Customer deleted successfully' };
  }

  // ---------------- TOP CUSTOMERS ----------------
  async topCustomers(shopId: string, limit = 10) {
    const customers = await this.prisma.customer.findMany({
      where: { shopId, deletedAt: null },
      include: {
        sales: {
          where: { deletedAt: null, status: { in: ['COMPLETED', 'PARTIALLY_RETURNED'] } },
          select: { totalAmount: true },
        },
      },
    });

    const ranked = customers
      .map((c) => ({
        id: c.id,
        name: c.name,
        phone: c.phone,
        totalPurchases: c.sales.reduce(
          (sum, s) => sum + Number(s.totalAmount),
          0,
        ),
        saleCount: c.sales.length,
        outstanding: Number(c.totalOwed),
      }))
      .sort((a, b) => b.totalPurchases - a.totalPurchases)
      .slice(0, limit);

    return ranked;
  }

  // ---------------- OUTSTANDING BALANCES ----------------
  async outstanding(shopId: string) {
    const customers = await this.prisma.customer.findMany({
      where: {
        shopId,
        deletedAt: null,
        totalOwed: { gt: 0 },
      },
      select: {
        id: true,
        name: true,
        phone: true,
        totalOwed: true,
        totalPaid: true,
        creditLimit: true,
        lastLoginAt: false as any,
      },
      orderBy: { totalOwed: 'desc' },
    });

    const totalOutstanding = customers.reduce(
      (sum, c) => sum + Number(c.totalOwed),
      0,
    );

    return {
      totalOutstanding,
      count: customers.length,
      customers,
    };
  }
}