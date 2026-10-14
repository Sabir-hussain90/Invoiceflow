import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShopDto } from './create-shop.dto';
import { UpdateShopDto } from './update-shop.dto';

@Injectable()
export class ShopsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateShopDto) {
    return this.prisma.shop.create({
      data: {
        name: dto.name,
        legalName: dto.legalName,
        ntnNumber: dto.ntnNumber,
        strnNumber: dto.strnNumber,
        phone: dto.phone,
        email: dto.email,
        address: dto.address,
        city: dto.city,
        province: dto.province,
        postalCode: dto.postalCode,
        logoUrl: dto.logoUrl,
      },
    });
  }

  async findOne(id: string) {
    const shop = await this.prisma.shop.findUnique({ where: { id } });
    if (!shop || shop.deletedAt) {
      throw new NotFoundException('Shop not found');
    }
    return shop;
  }

  async findMine(shopId: string) {
    if (!shopId) {
      throw new NotFoundException('You are not attached to a shop');
    }
    return this.findOne(shopId);
  }

  async update(id: string, dto: UpdateShopDto, requester: any) {
    if (requester.role !== 'OWNER' && requester.role !== 'ADMIN') {
      throw new ForbiddenException('Only the shop owner can update settings');
    }

    if (requester.role !== 'ADMIN' && requester.shopId !== id) {
      throw new ForbiddenException('You can only update your own shop');
    }

    const shop = await this.prisma.shop.findUnique({ where: { id } });
    if (!shop || shop.deletedAt) {
      throw new NotFoundException('Shop not found');
    }

    return this.prisma.shop.update({ where: { id }, data: dto });
  }

  async remove(id: string, requester: any) {
    if (requester.role !== 'OWNER' && requester.role !== 'ADMIN') {
      throw new ForbiddenException('Only the shop owner can delete the shop');
    }

    if (requester.role !== 'ADMIN' && requester.shopId !== id) {
      throw new ForbiddenException('You can only delete your own shop');
    }

    await this.prisma.shop.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });

    return { message: 'Shop deleted successfully' };
  }

  async getStats(shopId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      productCount,
      customerCount,
      supplierCount,
      todaySales,
      todayExpenses,
    ] = await Promise.all([
      this.prisma.product.count({ where: { shopId, deletedAt: null } }),
      this.prisma.customer.count({ where: { shopId, deletedAt: null } }),
      this.prisma.supplier.count({ where: { shopId, deletedAt: null } }),
      this.prisma.sale.aggregate({
        where: { shopId, saleDate: { gte: today }, deletedAt: null },
        _sum: { totalAmount: true },
        _count: true,
      }),
      this.prisma.expense.aggregate({
        where: { shopId, expenseDate: { gte: today }, deletedAt: null },
        _sum: { amount: true },
      }),
    ]);

    return {
      productCount,
      customerCount,
      supplierCount,
      todaySalesTotal: Number(todaySales._sum.totalAmount || 0),
      todaySalesCount: todaySales._count,
      todayExpensesTotal: Number(todayExpenses._sum.amount || 0),
    };
  }
}