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
import { ProductsService } from './products.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { QueryProductDto } from './query-product.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductsController {
  constructor(private products: ProductsService) {}

  // GET /api/products?search=oil&categoryId=...&lowStock=true&activeOnly=true
  @Get()
  findAll(@Req() req: any, @Query() q: QueryProductDto) {
    return this.products.findAll(req.user.shopId, q);
  }

  // GET /api/products/low-stock
  @Get('low-stock')
  lowStock(@Req() req: any) {
    return this.products.lowStock(req.user.shopId);
  }

  // GET /api/products/barcode/1234567890 — used by POS scanner
  @Get('barcode/:barcode')
  findByBarcode(@Param('barcode') barcode: string, @Req() req: any) {
    return this.products.findByBarcode(barcode, req.user.shopId);
  }

  // GET /api/products/:id
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.products.findOne(id, req.user.shopId);
  }

  // GET /api/products/:id/movements
  @Get(':id/movements')
  movements(@Param('id') id: string, @Req() req: any) {
    return this.products.movements(id, req.user.shopId);
  }

  // POST /api/products
  @Post()
  create(@Body() dto: CreateProductDto, @Req() req: any) {
    return this.products.create(req.user.shopId, req.user.id, dto);
  }

  // PATCH /api/products/:id
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @Req() req: any,
  ) {
    return this.products.update(id, req.user.shopId, dto);
  }

  // POST /api/products/:id/adjust-stock
  @Post(':id/adjust-stock')
  adjustStock(
    @Param('id') id: string,
    @Body() body: { quantity: number; reason: string },
    @Req() req: any,
  ) {
    return this.products.adjustStock(
      id,
      req.user.shopId,
      req.user.id,
      body.quantity,
      body.reason,
    );
  }

  // DELETE /api/products/:id
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.products.remove(id, req.user.shopId);
  }
}