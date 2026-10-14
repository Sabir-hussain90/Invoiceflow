import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePurchaseDto } from './create-purchase.dto';
import { QueryPurchaseDto } from './query-purchase.dto';

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  // ---------------- PURCHASE NUMBER GENERATOR ----------------
  // Format: PUR-YYYY-NNNNN (per shop, per year)
  private async generatePurchaseNumber(shopId: string): Promise<string> {
    const year = new Date().getFullYear();
    const prefix = 'PUR';

    // Count existing purchases this year for this shop
    const count = await this.prisma.purchase.count({
      where: {
        shopId,
        purchaseNumber: { startsWith: `${prefix}-${year}-` },
      },
    });

    const nextNumber = count + 1;
    const seq = String(nextNumber).padStart(5, '0');

    // Edge case: if the count-derived number already exists (e.g., after deletions), bump until unique
    let candidate = `${prefix}-${year}-${seq}`;
    let attempt = nextNumber;

    // Small safety loop in case of unique collision
    for (let i = 0; i < 50; i++) {
      const exists = await this.prisma.purchase.findFirst({
        where: { shopId, purchaseNumber: candidate },
        select: { id: true },
      });
      if (!exists) return candidate;
      attempt += 1;
      candidate = `${prefix}-${year}-${String(attempt).padStart(5, '0')}`;
    }

    // Extremely unlikely fallback — append timestamp
    return `${prefix}-${year}-${Date.now()}`;
  }

  // ---------------- CREATE PURCHASE ----------------
  async create(shopId: string, userId: string, dto: CreatePurchaseDto) {
    if (!dto.items?.length) {
      throw new BadRequestException('Purchase has no items');
    }

    // 1. Validate supplier
    const supplier = await this.prisma.supplier.findUnique({
      where: { id: dto.supplierId },
    });
    if (!supplier || supplier.deletedAt) {
      throw new NotFoundException('Supplier not found');
    }
    if (supplier.shopId !== shopId) {
      throw new ForbiddenException('Supplier belongs to another shop');
    }

    // 2. Load all referenced products
    const productIds = dto.items.map((i) => i.productId);
    const products = await this.prisma.product.findMany({
      where: {
        id: { in: productIds },
        shopId,
        deletedAt: null,
      },
    });

    if (products.length !== productIds.length) {
      throw new BadRequestException('Some products not found or inactive');
    }

    const productMap = new Map(products.map((p) => [p.id, p]));

    // 3. Compute totals and build item snapshots
    let subtotal = 0;
    const purchaseItemsData: any[] = [];

    for (const item of dto.items) {
      const product = productMap.get(item.productId)!;
      const lineGross = item.unitCost * item.quantity;
      const lineDiscount = item.discountAmount || 0;
      const lineTotal = lineGross - lineDiscount;

      if (lineTotal < 0) {
        throw new BadRequestException(
          `Discount exceeds line total for "${product.name}"`,
        );
      }

      subtotal += lineGross;

      purchaseItemsData.push({
        productId: product.id,
        productName: product.name,
        quantity: item.quantity,
        unit: product.unit,
        unitCost: item.unitCost,
        lineTotal,
      });
    }

    const discountAmount = dto.discountAmount || 0;
    const taxAmount = dto.taxAmount || 0;

    if (discountAmount > subtotal) {
      throw new BadRequestException('Discount exceeds subtotal');
    }

    const totalAmount = subtotal - discountAmount + taxAmount;

    // 4. Payment math
    const amountPaid = Math.min(dto.amountPaid, totalAmount);
    const amountDue = Math.max(0, totalAmount - amountPaid);

    // 5. Generate purchase number
    const purchaseNumber = await this.generatePurchaseNumber(shopId);

    // 6. Atomic transaction
    return this.prisma.$transaction(async (tx) => {
      // Create purchase header + items
      const purchase = await tx.purchase.create({
        data: {
          shopId,
          purchaseNumber,
          supplierId: supplier.id,
          purchasedById: userId,
          status: 'RECEIVED',
          subtotal,
          discountAmount,
          taxAmount,
          totalAmount,
          amountPaid,
          amountDue,
          paymentMethod: dto.paymentMethod,
          notes: dto.notes,
          items: {
            create: purchaseItemsData,
          },
        },
        include: { items: true },
      });

      // Increase stock + record movements
      for (const item of purchaseItemsData) {
        const product = productMap.get(item.productId)!;
        const newQty = Number(product.stockQty) + item.quantity;

        await tx.product.update({
          where: { id: item.productId },
          data: {
            stockQty: newQty,
            // Update the product's cost price to the latest purchase cost
            costPrice: item.unitCost,
          },
        });

        await tx.stockMovement.create({
          data: {
            shopId,
            productId: item.productId,
            type: 'PURCHASE',
            quantity: item.quantity,
            balanceAfter: newQty,
            referenceType: 'PURCHASE',
            referenceId: purchase.id,
            createdById: userId,
            unitCost: item.unitCost,
          },
        });
      }

      // Update supplier balance
      await tx.supplier.update({
        where: { id: supplier.id },
        data: {
          totalPaid: { increment: amountPaid },
          totalOwed: { increment: amountDue },
        },
      });

      return purchase;
    });
  }

  // ---------------- LIST ----------------
  async findAll(shopId: string, q: QueryPurchaseDto) {
    const where: any = {
      shopId,
      deletedAt: null,
    };

    if (q.supplierId) where.supplierId = q.supplierId;
    if (q.status) where.status = q.status;
    if (q.purchaseNumber) {
      where.purchaseNumber = { contains: q.purchaseNumber, mode: 'insensitive' };
    }

    if (q.from || q.to) {
      where.purchaseDate = {};
      if (q.from) where.purchaseDate.gte = new Date(q.from);
      if (q.to) where.purchaseDate.lte = new Date(q.to);
    }

    const limit = Math.min(Number(q.limit) || 100, 500);

    return this.prisma.purchase.findMany({
      where,
      include: {
        supplier: { select: { id: true, name: true, phone: true } },
        purchasedBy: { select: { id: true, fullName: true } },
        _count: { select: { items: true } },
      },
      orderBy: { purchaseDate: 'desc' },
      take: limit,
    });
  }

  // ---------------- FIND ONE ----------------
  async findOne(id: string, shopId: string) {
    const purchase = await this.prisma.purchase.findUnique({
      where: { id },
      include: {
        items: true,
        supplier: true,
        purchasedBy: { select: { id: true, fullName: true } },
        shop: {
          select: { id: true, name: true, address: true, phone: true },
        },
      },
    });

    if (!purchase || purchase.deletedAt) {
      throw new NotFoundException('Purchase not found');
    }

    if (purchase.shopId !== shopId) {
      throw new ForbiddenException('Purchase belongs to another shop');
    }

    return purchase;
  }

  // ---------------- TODAY'S SUMMARY ----------------
  async todaySummary(shopId: string) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const agg = await this.prisma.purchase.aggregate({
      where: {
        shopId,
        deletedAt: null,
        purchaseDate: { gte: startOfDay, lte: endOfDay },
      },
      _sum: { totalAmount: true, amountPaid: true, amountDue: true },
      _count: true,
    });

    return {
      count: agg._count,
      totalPurchases: Number(agg._sum.totalAmount || 0),
      totalPaid: Number(agg._sum.amountPaid || 0),
      totalDue: Number(agg._sum.amountDue || 0),
    };
  }

  // ---------------- CANCEL PURCHASE ----------------
  // Reverses stock and supplier balance. Does not delete records.
  async cancel(id: string, shopId: string, userId: string, reason?: string) {
    const purchase = await this.prisma.purchase.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!purchase || purchase.deletedAt) {
      throw new NotFoundException('Purchase not found');
    }
    if (purchase.shopId !== shopId) {
      throw new ForbiddenException('Purchase belongs to another shop');
    }
    if (purchase.status === 'CANCELLED') {
      throw new BadRequestException('Purchase is already cancelled');
    }

    return this.prisma.$transaction(async (tx) => {
      // Mark cancelled
      const updated = await tx.purchase.update({
        where: { id },
        data: {
          status: 'CANCELLED',
          notes: purchase.notes
            ? `${purchase.notes}\n[CANCELLED] ${reason || ''}`
            : `[CANCELLED] ${reason || ''}`,
        },
      });

      // Reverse stock for each item
      for (const item of purchase.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });
        if (!product) continue;

        const newQty = Number(product.stockQty) - Number(item.quantity);

        if (newQty < 0) {
          throw new BadRequestException(
            `Cannot cancel: product "${product.name}" has already been sold. Stock would go negative.`,
          );
        }

        await tx.product.update({
          where: { id: item.productId },
          data: { stockQty: newQty },
        });

        await tx.stockMovement.create({
          data: {
            shopId,
            productId: item.productId,
            type: 'ADJUSTMENT_OUT',
            quantity: -Number(item.quantity),
            balanceAfter: newQty,
            referenceType: 'PURCHASE_CANCEL',
            referenceId: purchase.id,
            reason: reason || 'Purchase cancelled',
            createdById: userId,
          },
        });
      }

      // Reverse supplier balance
      await tx.supplier.update({
        where: { id: purchase.supplierId },
        data: {
          totalPaid: { decrement: Number(purchase.amountPaid) },
          totalOwed: { decrement: Number(purchase.amountDue) },
        },
      });

      return updated;
    });
  }
}