import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './create-sale.dto';
import { QuerySaleDto } from './query-sale.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('sales')
export class SalesController {
  constructor(private sales: SalesService) {}

  // POST /api/sales — POS checkout
  @Post()
  create(@Body() dto: CreateSaleDto, @Req() req: any) {
    return this.sales.create(req.user.shopId, req.user.id, dto);
  }

  // GET /api/sales?from=&to=&customerId=&paymentStatus=&invoiceNumber=
  @Get()
  findAll(@Req() req: any, @Query() q: QuerySaleDto) {
    return this.sales.findAll(req.user.shopId, q);
  }

  // GET /api/sales/today-summary
  @Get('today-summary')
  todaySummary(@Req() req: any) {
    return this.sales.todaySummary(req.user.shopId);
  }

  // GET /api/sales/:id
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.sales.findOne(id, req.user.shopId);
  }

  // POST /api/sales/:id/cancel
  @Post(':id/cancel')
  @HttpCode(200)
  cancel(
    @Param('id') id: string,
    @Body() body: { reason?: string },
    @Req() req: any,
  ) {
    return this.sales.cancel(id, req.user.shopId, req.user.id, body?.reason);
  }
}