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
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './create-purchase.dto';
import { QueryPurchaseDto } from './query-purchase.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('purchases')
export class PurchasesController {
  constructor(private purchases: PurchasesService) {}

  // POST /api/purchases — record a new stock purchase
  @Post()
  create(@Body() dto: CreatePurchaseDto, @Req() req: any) {
    return this.purchases.create(req.user.shopId, req.user.id, dto);
  }

  // GET /api/purchases?from=&to=&supplierId=&status=
  @Get()
  findAll(@Req() req: any, @Query() q: QueryPurchaseDto) {
    return this.purchases.findAll(req.user.shopId, q);
  }

  // GET /api/purchases/today-summary
  @Get('today-summary')
  todaySummary(@Req() req: any) {
    return this.purchases.todaySummary(req.user.shopId);
  }

  // GET /api/purchases/:id
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.purchases.findOne(id, req.user.shopId);
  }

  // POST /api/purchases/:id/cancel
  @Post(':id/cancel')
  @HttpCode(200)
  cancel(
    @Param('id') id: string,
    @Body() body: { reason?: string },
    @Req() req: any,
  ) {
    return this.purchases.cancel(id, req.user.shopId, req.user.id, body?.reason);
  }
}