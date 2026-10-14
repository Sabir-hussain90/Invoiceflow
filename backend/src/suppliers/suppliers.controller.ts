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
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './create-supplier.dto';
import { UpdateSupplierDto } from './update-supplier.dto';
import { QuerySupplierDto } from './query-supplier.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('suppliers')
export class SuppliersController {
  constructor(private suppliers: SuppliersService) {}

  // GET /api/suppliers?search=&withBalance=
  @Get()
  findAll(@Req() req: any, @Query() q: QuerySupplierDto) {
    return this.suppliers.findAll(req.user.shopId, q);
  }

  // GET /api/suppliers/outstanding
  @Get('outstanding')
  outstanding(@Req() req: any) {
    return this.suppliers.outstanding(req.user.shopId);
  }

  // GET /api/suppliers/:id — full detail with purchase history
  @Get(':id')
  detail(@Param('id') id: string, @Req() req: any) {
    return this.suppliers.detail(id, req.user.shopId);
  }

  // POST /api/suppliers
  @Post()
  create(@Body() dto: CreateSupplierDto, @Req() req: any) {
    return this.suppliers.create(req.user.shopId, dto);
  }

  // PATCH /api/suppliers/:id
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSupplierDto,
    @Req() req: any,
  ) {
    return this.suppliers.update(id, req.user.shopId, dto);
  }

  // POST /api/suppliers/:id/payment — record payment to supplier
  @Post(':id/payment')
  @HttpCode(200)
  recordPayment(
    @Param('id') id: string,
    @Body()
    body: {
      amount: number;
      method:
        | 'CASH'
        | 'BANK_TRANSFER'
        | 'DIGITAL_WALLET'
        | 'CARD'
        | 'OTHER';
      reference?: string;
      notes?: string;
    },
    @Req() req: any,
  ) {
    return this.suppliers.recordPayment(
      id,
      req.user.shopId,
      req.user.id,
      Number(body.amount),
      body.method || 'CASH',
      body.reference,
      body.notes,
    );
  }

  // DELETE /api/suppliers/:id
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.suppliers.remove(id, req.user.shopId);
  }
}