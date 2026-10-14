import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReportsService } from './reports.service';
import { DailySalesQueryDto } from './daily-sales-query.dto';
import { ProfitQueryDto } from './profit-query.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('reports')
export class ReportsController {
  constructor(private reports: ReportsService) {}

  // GET /api/reports/dashboard
  @Get('dashboard')
  dashboard(@Req() req: any) {
    return this.reports.dashboard(req.user.shopId);
  }

  // GET /api/reports/daily-sales?from=&to=
  @Get('daily-sales')
  dailySales(@Req() req: any, @Query() q: DailySalesQueryDto) {
    return this.reports.dailySales(
      req.user.shopId,
      q.from,
      q.to,
    );
  }

  // GET /api/reports/profit?from=&to=
  @Get('profit')
  profit(@Req() req: any, @Query() q: ProfitQueryDto) {
    return this.reports.profit(req.user.shopId, q.from, q.to);
  }

  // GET /api/reports/top-products?from=&to=&limit=10
  @Get('top-products')
  topProducts(
    @Req() req: any,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('limit') limit?: string,
  ) {
    return this.reports.topProducts(
      req.user.shopId,
      from,
      to,
      Number(limit) || 10,
    );
  }

  // GET /api/reports/top-customers?from=&to=&limit=10
  @Get('top-customers')
  topCustomers(
    @Req() req: any,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('limit') limit?: string,
  ) {
    return this.reports.topCustomers(
      req.user.shopId,
      from,
      to,
      Number(limit) || 10,
    );
  }

  // GET /api/reports/stock-value
  @Get('stock-value')
  stockValue(@Req() req: any) {
    return this.reports.stockValue(req.user.shopId);
  }

  // GET /api/reports/cashier-performance?from=&to=
  @Get('cashier-performance')
  cashierPerformance(
    @Req() req: any,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.reports.cashierPerformance(req.user.shopId, from, to);
  }

  // GET /api/reports/payment-breakdown?from=&to=
  @Get('payment-breakdown')
  paymentBreakdown(
    @Req() req: any,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.reports.paymentBreakdown(req.user.shopId, from, to);
  }

  // GET /api/reports/low-stock
  @Get('low-stock')
  lowStock(@Req() req: any) {
    return this.reports.lowStock(req.user.shopId);
  }

  // GET /api/reports/receivables
  @Get('receivables')
  receivables(@Req() req: any) {
    return this.reports.receivables(req.user.shopId);
  }

  // GET /api/reports/payables
  @Get('payables')
  payables(@Req() req: any) {
    return this.reports.payables(req.user.shopId);
  }

  // GET /api/reports/category-sales?from=&to=
  @Get('category-sales')
  categorySales(
    @Req() req: any,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.reports.categorySales(req.user.shopId, from, to);
  }
}