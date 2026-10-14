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
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './create-expense.dto';
import { UpdateExpenseDto } from './update-expense.dto';
import { QueryExpenseDto } from './query-expense.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('expenses')
export class ExpensesController {
  constructor(private expenses: ExpensesService) {}

  @Get()
  findAll(@Req() req: any, @Query() q: QueryExpenseDto) {
    return this.expenses.findAll(req.user.shopId, q);
  }

  @Get('today-summary')
  todaySummary(@Req() req: any) {
    return this.expenses.todaySummary(req.user.shopId);
  }

  @Get('month-summary')
  monthSummary(
    @Req() req: any,
    @Query('year') year?: string,
    @Query('month') month?: string,
  ) {
    const y = Number(year) || new Date().getFullYear();
    const m = Number(month) || new Date().getMonth() + 1;
    return this.expenses.monthSummary(req.user.shopId, y, m);
  }

  @Get('by-category')
  byCategory(
    @Req() req: any,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.expenses.byCategory(req.user.shopId, from, to);
  }

  @Get('recent')
  recent(@Req() req: any, @Query('limit') limit?: string) {
    return this.expenses.recent(req.user.shopId, Number(limit) || 5);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.expenses.findOne(id, req.user.shopId);
  }

  @Post()
  create(@Body() dto: CreateExpenseDto, @Req() req: any) {
    return this.expenses.create(req.user.shopId, req.user.id, dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateExpenseDto,
    @Req() req: any,
  ) {
    return this.expenses.update(id, req.user.shopId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.expenses.remove(id, req.user.shopId);
  }
}