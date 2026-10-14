import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto } from './create-expense.dto';
import { UpdateExpenseDto } from './update-expense.dto';
import { QueryExpenseDto } from './query-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async findAll(shopId: string, q: QueryExpenseDto) {
    const where: any = { shopId, deletedAt: null };

    if (q.category) where.category = q.category;

    if (q.search) {
      where.OR = [
        { title: { contains: q.search, mode: 'insensitive' } },
        { description: { contains: q.search, mode: 'insensitive' } },
      ];
    }

    if (q.from || q.to) {
      where.expenseDate = {};
      if (q.from) where.expenseDate.gte = new Date(q.from);
      if (q.to) where.expenseDate.lte = new Date(q.to);
    }

    const limit = Math.min(Number(q.limit) || 200, 500);

    return this.prisma.expense.findMany({
      where,
      include: { createdBy: { select: { id: true, fullName: true } } },
      orderBy: { expenseDate: 'desc' },
      take: limit,
    });
  }

  async findOne(id: string, shopId: string) {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
      include: { createdBy: { select: { id: true, fullName: true } } },
    });

    if (!expense || expense.deletedAt) {
      throw new NotFoundException('Expense not found');
    }
    if (expense.shopId !== shopId) {
      throw new ForbiddenException('Expense belongs to another shop');
    }

    return expense;
  }

  async create(shopId: string, userId: string, dto: CreateExpenseDto) {
    if (!dto.amount || dto.amount <= 0) {
      throw new BadRequestException('Amount must be greater than zero');
    }

    return this.prisma.expense.create({
      data: {
        shopId,
        category: dto.category,
        title: dto.title.trim(),
        description: dto.description,
        amount: dto.amount,
        paymentMethod: dto.paymentMethod || 'CASH',
        expenseDate: dto.expenseDate ? new Date(dto.expenseDate) : new Date(),
        receiptUrl: dto.receiptUrl,
        notes: dto.notes,
        createdById: userId,
      },
    });
  }

  async update(id: string, shopId: string, dto: UpdateExpenseDto) {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    if (!expense || expense.deletedAt) {
      throw new NotFoundException('Expense not found');
    }
    if (expense.shopId !== shopId) {
      throw new ForbiddenException('Expense belongs to another shop');
    }

    const data: any = { ...dto };
    if (dto.expenseDate) data.expenseDate = new Date(dto.expenseDate);

    return this.prisma.expense.update({ where: { id }, data });
  }

  async remove(id: string, shopId: string) {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    if (!expense || expense.deletedAt) {
      throw new NotFoundException('Expense not found');
    }
    if (expense.shopId !== shopId) {
      throw new ForbiddenException('Expense belongs to another shop');
    }

    await this.prisma.expense.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Expense deleted successfully' };
  }

  async todaySummary(shopId: string) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const agg = await this.prisma.expense.aggregate({
      where: {
        shopId,
        deletedAt: null,
        expenseDate: { gte: startOfDay, lte: endOfDay },
      },
      _sum: { amount: true },
      _count: true,
    });

    return {
      count: agg._count,
      totalExpenses: Number(agg._sum.amount || 0),
    };
  }

  async monthSummary(shopId: string, year: number, month: number) {
    const start = new Date(year, month - 1, 1, 0, 0, 0, 0);
    const end = new Date(year, month, 0, 23, 59, 59, 999);

    const agg = await this.prisma.expense.aggregate({
      where: {
        shopId,
        deletedAt: null,
        expenseDate: { gte: start, lte: end },
      },
      _sum: { amount: true },
      _count: true,
    });

    return {
      year,
      month,
      count: agg._count,
      totalExpenses: Number(agg._sum.amount || 0),
    };
  }

  async byCategory(shopId: string, from?: string, to?: string) {
    const where: any = { shopId, deletedAt: null };

    if (from || to) {
      where.expenseDate = {};
      if (from) where.expenseDate.gte = new Date(from);
      if (to) where.expenseDate.lte = new Date(to);
    }

    const grouped = await this.prisma.expense.groupBy({
      by: ['category'],
      where,
      _sum: { amount: true },
      _count: true,
    });

    const total = grouped.reduce(
      (sum, g) => sum + Number(g._sum.amount || 0),
      0,
    );

    return {
      total,
      breakdown: grouped.map((g) => ({
        category: g.category,
        count: g._count,
        amount: Number(g._sum.amount || 0),
        percentage:
          total > 0
            ? Number(((Number(g._sum.amount || 0) / total) * 100).toFixed(2))
            : 0,
      })),
    };
  }

  async recent(shopId: string, limit = 5) {
    return this.prisma.expense.findMany({
      where: { shopId, deletedAt: null },
      orderBy: { expenseDate: 'desc' },
      take: limit,
      select: {
        id: true,
        category: true,
        title: true,
        amount: true,
        paymentMethod: true,
        expenseDate: true,
      },
    });
  }
}