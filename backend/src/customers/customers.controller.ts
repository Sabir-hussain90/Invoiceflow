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
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './create-customer.dto';
import { UpdateCustomerDto } from './update-customer.dto';
import { QueryCustomerDto } from './query-customer.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('customers')
export class CustomersController {
  constructor(private customers: CustomersService) {}

  // GET /api/customers?search=ali&withBalance=true
  @Get()
  findAll(@Req() req: any, @Query() q: QueryCustomerDto) {
    return this.customers.findAll(req.user.shopId, q);
  }

  // GET /api/customers/outstanding — customers who owe money
  @Get('outstanding')
  outstanding(@Req() req: any) {
    return this.customers.outstanding(req.user.shopId);
  }

  // GET /api/customers/top — top 10 by purchase value
  @Get('top')
  topCustomers(@Req() req: any, @Query('limit') limit?: string) {
    return this.customers.topCustomers(req.user.shopId, Number(limit) || 10);
  }

  // GET /api/customers/:id — full detail with history
  @Get(':id')
  detail(@Param('id') id: string, @Req() req: any) {
    return this.customers.detail(id, req.user.shopId);
  }

  // POST /api/customers
  @Post()
  create(@Body() dto: CreateCustomerDto, @Req() req: any) {
    return this.customers.create(req.user.shopId, dto);
  }

  // PATCH /api/customers/:id
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDto,
    @Req() req: any,
  ) {
    return this.customers.update(id, req.user.shopId, dto);
  }

  // POST /api/customers/:id/payment — record a udhaar collection
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
    return this.customers.recordPayment(
      id,
      req.user.shopId,
      req.user.id,
      Number(body.amount),
      body.method || 'CASH',
      body.reference,
      body.notes,
    );
  }

  // DELETE /api/customers/:id
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.customers.remove(id, req.user.shopId);
  }
}