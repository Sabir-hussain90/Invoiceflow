import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSupplierDto } from './create-supplier.dto';
import { UpdateSupplierDto } from './update-supplier.dto';
import { QuerySupplierDto } from './query-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}

  // ---------------- LIST ----------------
  async findAll(shopId: string, q: QuerySupplierDto) {
    const where: any = {
      shopId,
      deletedAt: null,
    };

    if (q.search) {
      where.OR = [
        { name: { contains: q.search, mode: 'insensitive' } },
        { companyName: { contains: q.search, mode: 'insensitive' } },
        { phone: { contains: q.search } },
        { email: { contains: q.search, mode: 'insensitive' } },
      ];
    }

    let suppliers = await this.prisma.supplier.findMany({
      where,
      include: {
        _count: { select: { purchases: true } },
      },
      orderBy: { name: 'asc' },
    });

    // Post-filter: only suppliers with outstanding balance
    if (q.withBalance === 'true') {
      suppliers = suppliers.filter((s) => Number(s.totalOwed) > 0);
    }

    return suppliers;
  }

  // ---------------- FIND ONE ----------------
  async findOne(id: string, shopId: string) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
      include: {
        _count: { select: { purchases: true } },
      },
    });

    if (!supplier || supplier.deletedAt) {
      throw new NotFoundException('Supplier not found');
    }

    if (supplier.shopId !== shopId) {
      throw new ForbiddenException('Supplier belongs to another shop');
    }

    return supplier;
  }

  // ---------------- DETAIL WITH HISTORY ----------------
  async detail(id: string, shopId: string) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
      include: {
        purchases: {
          where: { deletedAt: null },
          orderBy: { purchaseDate: 'desc' },
          take: 30,
          select: {
            id: true,
            purchaseNumber: true,
            totalAmount: true,
            amountPaid: true,
            amountDue: true,
            status: true,
            paymentMethod: true,
            purchaseDate: true,
          },
        },
      },
    });

    if (!supplier || supplier.deletedAt) {
      throw new NotFoundException('Supplier not found');
    }

    if (supplier.shopId !== shopId) {
      throw new ForbiddenException('Supplier belongs to another shop');
    }

    const totalPurchases = supplier.purchases.reduce(
      (sum, p) => sum + Number(p.totalAmount),
      0,
    );

    return {
      ...supplier,
      balanceDue: Number(supplier.totalOwed),
      totalPurchases,
    };
  }

  // ---------------- CREATE ----------------
  async create(shopId: string, dto: CreateSupplierDto) {
    // Prevent duplicate phone within the same shop
    if (dto.phone) {
      const dup = await this.prisma.supplier.findFirst({
        where: { shopId, phone: dto.phone, deletedAt: null },
      });
      if (dup) {
        throw new BadRequestException(
          'A supplier with this phone number already exists',
        );
      }
    }

    const openingBalance = Number(dto.openingBalance || 0);

    return this.prisma.supplier.create({
      data: {
        shopId,
        name: dto.name.trim(),
        companyName: dto.companyName,
        phone: dto.phone,
        email: dto.email,
        address: dto.address,
        city: dto.city,
        ntnNumber: dto.ntnNumber,
        notes: dto.notes,
        openingBalance,
        totalOwed: openingBalance,
      },
    });
  }

  // ---------------- UPDATE ----------------
  async update(id: string, shopId: string, dto: UpdateSupplierDto) {
    const supplier = await this.prisma.supplier.findUnique({ where: { id } });
    if (!supplier || supplier.deletedAt) {
      throw new NotFoundException('Supplier not found');
    }
    if (supplier.shopId !== shopId) {
      throw new ForbiddenException('Supplier belongs to another shop');
    }

    // Prevent duplicate phone on rename
    if (dto.phone && dto.phone !== supplier.phone) {
      const dup = await this.prisma.supplier.findFirst({
        where: {
          shopId,
          phone: dto.phone,
          deletedAt: null,
          id: { not: id },
        },
      });
      if (dup) {
        throw new BadRequestException(
          'A supplier with this phone number already exists',
        );
      }
    }

    return this.prisma.supplier.update({
      where: { id },
      data: dto,
    });
  }

  // ---------------- RECORD PAYMENT TO SUPPLIER ----------------
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

    const supplier = await this.prisma.supplier.findUnique({ where: { id } });
    if (!supplier || supplier.deletedAt) {
      throw new NotFoundException('Supplier not found');
    }
    if (supplier.shopId !== shopId) {
      throw new ForbiddenException('Supplier belongs to another shop');
    }

    const currentOwed = Number(supplier.totalOwed);
    if (amount > currentOwed) {
      throw new BadRequestException(
        `Amount exceeds outstanding balance (Rs. ${currentOwed.toFixed(2)})`,
      );
    }

    const updated = await this.prisma.supplier.update({
      where: { id },
      data: {
        totalOwed: { decrement: amount },
        totalPaid: { increment: amount },
      },
    });

    return {
      message: 'Payment to supplier recorded',
      newBalance: Number(updated.totalOwed),
      paymentAmount: amount,
      reference,
      notes,
    };
  }

  // ---------------- SOFT DELETE ----------------
  async remove(id: string, shopId: string) {
    const supplier = await this.prisma.supplier.findUnique({ where: { id } });
    if (!supplier || supplier.deletedAt) {
      throw new NotFoundException('Supplier not found');
    }
    if (supplier.shopId !== shopId) {
      throw new ForbiddenException('Supplier belongs to another shop');
    }

    if (Number(supplier.totalOwed) > 0) {
      throw new BadRequestException(
        `Cannot delete: you still owe Rs. ${Number(supplier.totalOwed).toFixed(2)} to this supplier`,
      );
    }

    await this.prisma.supplier.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });

    return { message: 'Supplier deleted successfully' };
  }

  // ---------------- OUTSTANDING PAYABLES ----------------
  async outstanding(shopId: string) {
    const suppliers = await this.prisma.supplier.findMany({
      where: {
        shopId,
        deletedAt: null,
        totalOwed: { gt: 0 },
      },
      select: {
        id: true,
        name: true,
        companyName: true,
        phone: true,
        totalOwed: true,
        totalPaid: true,
      },
      orderBy: { totalOwed: 'desc' },
    });

    const totalOutstanding = suppliers.reduce(
      (sum, s) => sum + Number(s.totalOwed),
      0,
    );

    return {
      totalOutstanding,
      count: suppliers.length,
      suppliers,
    };
  }
}