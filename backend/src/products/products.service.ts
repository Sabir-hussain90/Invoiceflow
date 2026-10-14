import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { QueryProductDto } from './query-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // ---------------- LIST ----------------
  async findAll(shopId: string, q: QueryProductDto) {
    const where: any = {
      shopId,
      deletedAt: null,
    };

    if (q.categoryId) where.categoryId = q.categoryId;

    if (q.activeOnly === 'true') where.isActive = true;

    if (q.search) {
      where.OR = [
        { name: { contains: q.search, mode: 'insensitive' } },
        { sku: { contains: q.search, mode: 'insensitive' } },
        { barcode: { contains: q.search } },
      ];
    }

    let products = await this.prisma.product.findMany({
      where,
      include: {
        category: { select: { id: true, name: true } },
      },
      orderBy: { name: 'asc' },
    });

    // Low stock filter is applied after because Prisma can't compare two columns directly here
    if (q.lowStock === 'true') {
      products = products.filter(
        (p) => Number(p.stockQty) <= Number(p.minStockLevel),
      );
    }

    return products;
  }

  // ---------------- FIND ONE ----------------
  async findOne(id: string, shopId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: { select: { id: true, name: true } },
      },
    });

    if (!product || product.deletedAt) {
      throw new NotFoundException('Product not found');
    }

    if (product.shopId !== shopId) {
      throw new ForbiddenException('Product belongs to another shop');
    }

    return product;
  }

  // ---------------- FIND BY BARCODE (for POS scanner) ----------------
  async findByBarcode(barcode: string, shopId: string) {
    const product = await this.prisma.product.findFirst({
      where: { barcode, shopId, deletedAt: null },
      include: {
        category: { select: { id: true, name: true } },
      },
    });
    if (!product) throw new NotFoundException('No product matches this barcode');
    return product;
  }

  // ---------------- CREATE ----------------
  async create(shopId: string, userId: string, dto: CreateProductDto) {
    // Validate category belongs to same shop
    if (dto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: dto.categoryId },
      });
      if (!category || category.shopId !== shopId) {
        throw new BadRequestException('Invalid category');
      }
    }

    // Prevent duplicate SKU within the same shop
    if (dto.sku) {
      const dupSku = await this.prisma.product.findFirst({
        where: { shopId, sku: dto.sku, deletedAt: null },
      });
      if (dupSku) throw new BadRequestException('SKU already exists');
    }

    // Prevent duplicate barcode within the same shop
    if (dto.barcode) {
      const dupBar = await this.prisma.product.findFirst({
        where: { shopId, barcode: dto.barcode, deletedAt: null },
      });
      if (dupBar) throw new BadRequestException('Barcode already exists');
    }

    const openingStock = Number(dto.stockQty || 0);

    const product = await this.prisma.product.create({
      data: {
        shopId,
        name: dto.name.trim(),
        description: dto.description,
        sku: dto.sku,
        barcode: dto.barcode,
        unit: dto.unit || 'piece',
        categoryId: dto.categoryId,
        costPrice: dto.costPrice,
        sellingPrice: dto.sellingPrice,
        wholesalePrice: dto.wholesalePrice,
        stockQty: openingStock,
        minStockLevel: dto.minStockLevel ?? 0,
        maxStockLevel: dto.maxStockLevel,
        hasExpiry: dto.hasExpiry ?? false,
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : null,
        batchNumber: dto.batchNumber,
        imageUrl: dto.imageUrl,
      },
    });

    // Record opening stock movement
    if (openingStock > 0) {
      await this.prisma.stockMovement.create({
        data: {
          shopId,
          productId: product.id,
          type: 'OPENING_STOCK',
          quantity: openingStock,
          balanceAfter: openingStock,
          reason: 'Initial stock entry',
          createdById: userId,
        },
      });
    }

    return product;
  }

  // ---------------- UPDATE ----------------
  async update(
    id: string,
    shopId: string,
    dto: UpdateProductDto,
  ) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product || product.deletedAt) {
      throw new NotFoundException('Product not found');
    }
    if (product.shopId !== shopId) {
      throw new ForbiddenException('Product belongs to another shop');
    }

    // Validate category if provided
    if (dto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: dto.categoryId },
      });
      if (!category || category.shopId !== shopId) {
        throw new BadRequestException('Invalid category');
      }
    }

    // Prevent duplicate SKU/barcode on rename
    if (dto.sku && dto.sku !== product.sku) {
      const dup = await this.prisma.product.findFirst({
        where: { shopId, sku: dto.sku, deletedAt: null, id: { not: id } },
      });
      if (dup) throw new BadRequestException('SKU already exists');
    }
    if (dto.barcode && dto.barcode !== product.barcode) {
      const dup = await this.prisma.product.findFirst({
        where: { shopId, barcode: dto.barcode, deletedAt: null, id: { not: id } },
      });
      if (dup) throw new BadRequestException('Barcode already exists');
    }

    const data: any = { ...dto };
    if (dto.expiryDate) data.expiryDate = new Date(dto.expiryDate);

    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  // ---------------- ADJUST STOCK (manual correction) ----------------
  async adjustStock(
    id: string,
    shopId: string,
    userId: string,
    quantity: number,
    reason: string,
  ) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product || product.deletedAt) {
      throw new NotFoundException('Product not found');
    }
    if (product.shopId !== shopId) {
      throw new ForbiddenException('Product belongs to another shop');
    }

    const currentQty = Number(product.stockQty);
    const newQty = currentQty + quantity;

    if (newQty < 0) {
      throw new BadRequestException('Adjustment would result in negative stock');
    }

    const movementType =
      quantity >= 0 ? 'ADJUSTMENT_IN' : 'ADJUSTMENT_OUT';

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.product.update({
        where: { id },
        data: { stockQty: newQty },
      });

      await tx.stockMovement.create({
        data: {
          shopId,
          productId: id,
          type: movementType,
          quantity,
          balanceAfter: newQty,
          reason,
          createdById: userId,
        },
      });

      return updated;
    });
  }

  // ---------------- SOFT DELETE ----------------
  async remove(id: string, shopId: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product || product.deletedAt) {
      throw new NotFoundException('Product not found');
    }
    if (product.shopId !== shopId) {
      throw new ForbiddenException('Product belongs to another shop');
    }

    await this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });

    return { message: 'Product deleted successfully' };
  }

  // ---------------- LOW STOCK LIST ----------------
  async lowStock(shopId: string) {
    const products = await this.prisma.product.findMany({
      where: { shopId, deletedAt: null, isActive: true },
      orderBy: { name: 'asc' },
    });

    return products.filter(
      (p) => Number(p.stockQty) <= Number(p.minStockLevel),
    );
  }

  // ---------------- STOCK MOVEMENTS FOR A PRODUCT ----------------
  async movements(productId: string, shopId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product || product.shopId !== shopId) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.stockMovement.findMany({
      where: { productId, shopId },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }
}