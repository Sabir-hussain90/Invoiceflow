import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSaleDto } from './create-sale.dto';
import { QuerySaleDto } from './query-sale.dto';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  // ---------------- INVOICE NUMBER GENERATOR ----------------
  private async generateInvoiceNumber(shopId: string): Promise<string> {
    const year = new Date().getFullYear();
    const shop = await this.prisma.shop.findUnique({ where: { id: shopId } });
    const prefix = shop?.invoicePrefix || 'INV';

    const counter = await this.prisma.invoiceCounter.upsert({
      where: {
        shopId_year_prefix: { shopId, year, prefix },
      },
      create: {
        shopId,
        year,
        prefix,
        lastNumber: 1,
      },
      update: {
        lastNumber: { increment: 1 },
      },
    });

    const seq = String(counter.lastNumber).padStart(5, '0');
    return `${prefix}-${year}-${seq}`;
  }

  // ---------------- CREATE SALE (POS) ----------------
  async create(shopId: string, cashierId: string, dto: CreateSaleDto) {
    if (!dto.items?.length) {
      throw new BadRequestException('Cart is empty');
    }

    // 1. Load all products in one query
    const productIds = dto.items.map((i) => i.productId);
    const products = await this.prisma.product.findMany({
      where: {
        id: { in: productIds },
        shopId,
        deletedAt: null,
        isActive: true,
      },
    });

    if (products.length !== productIds.length) {
      throw new BadRequestException('Some products not found or inactive');
    }

    const productMap = new Map(products.map((p) => [p.id, p]));

    // 2. Validate stock, calculate totals, build sale items
    let subtotal = 0;
    let totalCogs = 0;
    const saleItemsData: any[] = [];

    for (const item of dto.items) {
      const product = productMap.get(item.productId)!;
      const available = Number(product.stockQty);

      if (available < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for "${product.name}". Available: ${available}, requested: ${item.quantity}`,
        );
      }

      const unitPrice = Number(product.sellingPrice);
      const costPrice = Number(product.costPrice);
      const lineDiscount = item.discountAmount || 0;
      const grossLine = unitPrice * item.quantity;
      const lineTotal = grossLine - lineDiscount;

      if (lineTotal < 0) {
        throw new BadRequestException(
          `Discount exceeds line total for "${product.name}"`,
        );
      }

      subtotal += grossLine;
      totalCogs += costPrice * item.quantity;

      saleItemsData.push({
        productId: product.id,
        productName: product.name,
        sku: product.sku,
        quantity: item.quantity,
        unit: product.unit,
        unitPrice,
        costPrice,
        discountAmount: lineDiscount,
        lineTotal,
      });
    }

    // 3. Apply sale-level discounts
    const flatDiscount = dto.discountAmount || 0;
    const discountPercent = dto.discountPercent || 0;
    const percentAmount = (subtotal * discountPercent) / 100;
    const totalDiscount = flatDiscount + percentAmount;

    if (totalDiscount > subtotal) {
      throw new BadRequestException('Total discount exceeds subtotal');
    }

    // 4. Tax (optional)
    const shop = await this.prisma.shop.findUnique({ where: { id: shopId } });
    const taxAmount = shop?.taxEnabled
      ? ((subtotal - totalDiscount) * Number(shop.taxPercentage)) / 100
      : 0;

    const totalAmount = subtotal - totalDiscount + taxAmount;

    // 5. Payment math
    const amountReceived = dto.amountReceived;
    const amountPaid = Math.min(amountReceived, totalAmount);
    const amountDue = Math.max(0, totalAmount - amountReceived);
    const changeGiven = Math.max(0, amountReceived - totalAmount);

    const paymentStatus: 'PAID' | 'PARTIALLY_PAID' | 'UNPAID' =
      amountDue === 0 ? 'PAID' : amountPaid > 0 ? 'PARTIALLY_PAID' : 'UNPAID';

    const grossProfit = subtotal - totalDiscount - totalCogs;

    // 6. Generate invoice number
    const invoiceNumber = await this.generateInvoiceNumber(shopId);

    // 7. Execute everything inside one transaction
    return this.prisma.$transaction(async (tx) => {
      const sale = await tx.sale.create({
        data: {
          shopId,
          invoiceNumber,
          customerId: dto.customerId,
          cashierId,
          status: 'COMPLETED',
          paymentStatus,
          subtotal,
          discountAmount: totalDiscount,
          discountPercent,
          taxAmount,
          totalAmount,
          costOfGoodsSold: totalCogs,
          grossProfit,
          amountPaid,
          amountDue,
          changeGiven,
          notes: dto.notes,
          items: {
            create: saleItemsData,
          },
        },
        include: { items: true },
      });

      if (amountPaid > 0) {
        await tx.payment.create({
          data: {
            shopId,
            saleId: sale.id,
            customerId: dto.customerId,
            receivedById: cashierId,
            amount: amountPaid,
            method: dto.paymentMethod,
            status: paymentStatus,
          },
        });
      }

      for (const item of saleItemsData) {
        const product = productMap.get(item.productId)!;
        const newQty = Number(product.stockQty) - item.quantity;

        await tx.product.update({
          where: { id: item.productId },
          data: { stockQty: newQty },
        });

        await tx.stockMovement.create({
          data: {
            shopId,
            productId: item.productId,
            type: 'SALE',
            quantity: -item.quantity,
            balanceAfter: newQty,
            referenceType: 'SALE',
            referenceId: sale.id,
            createdById: cashierId,
            unitCost: item.costPrice,
          },
        });
      }

      await tx.invoice.create({
        data: {
          saleId: sale.id,
          shopId,
          invoiceNumber,
        },
      });

      if (dto.customerId && amountDue > 0) {
        await tx.customer.update({
          where: { id: dto.customerId },
          data: {
            totalOwed: { increment: amountDue },
            totalPaid: { increment: amountPaid },
          },
        });
      } else if (dto.customerId) {
        await tx.customer.update({
          where: { id: dto.customerId },
          data: { totalPaid: { increment: amountPaid } },
        });
      }

      return sale;
    });
  }

  // ---------------- LIST ----------------
  async findAll(shopId: string, q: QuerySaleDto) {
    const where: any = {
      shopId,
      deletedAt: null,
    };

    if (q.customerId) where.customerId = q.customerId;
    if (q.cashierId) where.cashierId = q.cashierId;
    if (q.paymentStatus) where.paymentStatus = q.paymentStatus;
    if (q.status) where.status = q.status;
    if (q.invoiceNumber) {
      where.invoiceNumber = { contains: q.invoiceNumber, mode: 'insensitive' };
    }

    if (q.from || q.to) {
      where.saleDate = {};
      if (q.from) where.saleDate.gte = new Date(q.from);
      if (q.to) where.saleDate.lte = new Date(q.to);
    }

    const limit = Math.min(Number(q.limit) || 100, 500);

    return this.prisma.sale.findMany({
      where,
      include: {
        customer: { select: { id: true, name: true, phone: true } },
        cashier: { select: { id: true, fullName: true } },
        _count: { select: { items: true } },
      },
      orderBy: { saleDate: 'desc' },
      take: limit,
    });
  }

  // ---------------- FIND ONE ----------------
  async findOne(id: string, shopId: string) {
    const sale = await this.prisma.sale.findUnique({
      where: { id },
      include: {
        items: true,
        payments: true,
        returns: true,
        invoice: true,
        customer: true,
        cashier: { select: { id: true, fullName: true } },
        shop: {
          select: {
            id: true,
            name: true,
            address: true,
            phone: true,
            logoUrl: true,
          },
        },
      },
    });

    if (!sale || sale.deletedAt) {
      throw new NotFoundException('Sale not found');
    }

    if (sale.shopId !== shopId) {
      throw new ForbiddenException('Sale belongs to another shop');
    }

    return sale;
  }

  // ---------------- TODAY'S SUMMARY ----------------
  async todaySummary(shopId: string) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const agg = await this.prisma.sale.aggregate({
      where: {
        shopId,
        deletedAt: null,
        saleDate: { gte: startOfDay, lte: endOfDay },
        status: { in: ['COMPLETED', 'PARTIALLY_RETURNED'] },
      },
      _sum: {
        totalAmount: true,
        amountPaid: true,
        amountDue: true,
        grossProfit: true,
      },
      _count: true,
    });

    return {
      count: agg._count,
      totalSales: Number(agg._sum.totalAmount || 0),
      totalReceived: Number(agg._sum.amountPaid || 0),
      totalOutstanding: Number(agg._sum.amountDue || 0),
      grossProfit: Number(agg._sum.grossProfit || 0),
    };
  }

  // ---------------- CANCEL SALE ----------------
  async cancel(id: string, shopId: string, userId: string, reason?: string) {
    const sale = await this.prisma.sale.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!sale || sale.deletedAt) {
      throw new NotFoundException('Sale not found');
    }
    if (sale.shopId !== shopId) {
      throw new ForbiddenException('Sale belongs to another shop');
    }
    if (sale.status === 'CANCELLED') {
      throw new BadRequestException('Sale is already cancelled');
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.sale.update({
        where: { id },
        data: {
          status: 'CANCELLED',
          notes: sale.notes
            ? `${sale.notes}\n[CANCELLED] ${reason || ''}`
            : `[CANCELLED] ${reason || ''}`,
        },
      });

      for (const item of sale.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });
        if (!product) continue;

        const newQty = Number(product.stockQty) + Number(item.quantity);

        await tx.product.update({
          where: { id: item.productId },
          data: { stockQty: newQty },
        });

        await tx.stockMovement.create({
          data: {
            shopId,
            productId: item.productId,
            type: 'ADJUSTMENT_IN',
            quantity: Number(item.quantity),
            balanceAfter: newQty,
            referenceType: 'SALE_CANCEL',
            referenceId: sale.id,
            reason: reason || 'Sale cancelled',
            createdById: userId,
          },
        });
      }

      return updated;
    });
  }
}