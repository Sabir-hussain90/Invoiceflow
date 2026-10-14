import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './create-category.dto';
import { UpdateCategoryDto } from './update-category.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('categories')
export class CategoriesController {
  constructor(private categories: CategoriesService) {}

  // GET /api/categories?search=dairy
  @Get()
  findAll(@Req() req: any, @Query('search') search?: string) {
    return this.categories.findAll(req.user.shopId, search);
  }

  // GET /api/categories/:id
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.categories.findOne(id, req.user.shopId);
  }

  // POST /api/categories
  @Post()
  create(@Body() dto: CreateCategoryDto, @Req() req: any) {
    return this.categories.create(req.user.shopId, dto);
  }

  // PATCH /api/categories/:id
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
    @Req() req: any,
  ) {
    return this.categories.update(id, req.user.shopId, dto);
  }

  // DELETE /api/categories/:id
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.categories.remove(id, req.user.shopId);
  }
}