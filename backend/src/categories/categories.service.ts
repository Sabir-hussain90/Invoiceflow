import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './create-category.dto';
import { UpdateCategoryDto } from './update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  // ---------------- LIST (with optional search) ----------------
  async findAll(shopId: string, search?: string) {
    return this.prisma.category.findMany({
      where: {
        shopId,
        deletedAt: null,
        ...(search
          ? {
              name: { contains: search, mode: 'insensitive' as const },
            }
          : {}),
      },
      include: {
        _count: { select: { products: true } },
      },
      orderBy: { name: 'asc' },
    });
  }

  // ---------------- FIND ONE ----------------
  async findOne(id: string, shopId: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        _count: { select: { products: true } },
      },
    });

    if (!category || category.deletedAt) {
      throw new NotFoundException('Category not found');
    }

    // Enforce shop isolation — a shop can only view its own categories
    if (category.shopId !== shopId) {
      throw new ForbiddenException('Category belongs to another shop');
    }

    return category;
  }

  // ---------------- CREATE ----------------
  async create(shopId: string, dto: CreateCategoryDto) {
    const trimmedName = dto.name.trim();

    // Prevent duplicate names within the same shop
    const existing = await this.prisma.category.findFirst({
      where: {
        shopId,
        name: { equals: trimmedName, mode: 'insensitive' },
        deletedAt: null,
      },
    });

    if (existing) {
      throw new BadRequestException('A category with this name already exists');
    }

    return this.prisma.category.create({
      data: {
        shopId,
        name: trimmedName,
        description: dto.description,
      },
    });
  }

  // ---------------- UPDATE ----------------
  async update(id: string, shopId: string, dto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category || category.deletedAt) {
      throw new NotFoundException('Category not found');
    }

    if (category.shopId !== shopId) {
      throw new ForbiddenException('Category belongs to another shop');
    }

    // If renaming, ensure the new name isn't already taken in this shop
    if (dto.name) {
      const trimmed = dto.name.trim();
      const duplicate = await this.prisma.category.findFirst({
        where: {
          shopId,
          id: { not: id },
          name: { equals: trimmed, mode: 'insensitive' },
          deletedAt: null,
        },
      });

      if (duplicate) {
        throw new BadRequestException('A category with this name already exists');
      }

      dto.name = trimmed;
    }

    return this.prisma.category.update({
      where: { id },
      data: dto,
    });
  }

  // ---------------- SOFT DELETE ----------------
  async remove(id: string, shopId: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        _count: { select: { products: true } },
      },
    });

    if (!category || category.deletedAt) {
      throw new NotFoundException('Category not found');
    }

    if (category.shopId !== shopId) {
      throw new ForbiddenException('Category belongs to another shop');
    }

    // Don't allow deletion if products still use this category
    if (category._count.products > 0) {
      throw new BadRequestException(
        `Cannot delete: ${category._count.products} product(s) still use this category`,
      );
    }

    await this.prisma.category.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });

    return { message: 'Category deleted successfully' };
  }
}