import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';
import { InvoicesService } from './invoices.service';

@UseGuards(AuthGuard('jwt'))
@Controller('invoices')
export class InvoicesController {
  constructor(private invoices: InvoicesService) {}

  @Get()
  findAll(@Req() req: any, @Query('limit') limit?: string) {
    return this.invoices.findAll(req.user.shopId, Number(limit) || 100);
  }

  @Get(':saleId/meta')
  getMeta(@Param('saleId') saleId: string, @Req() req: any) {
    return this.invoices.getMeta(saleId, req.user.shopId);
  }

  @Get(':saleId/pdf')
  async download(
    @Param('saleId') saleId: string,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const pdf = await this.invoices.generatePdf(saleId, req.user.shopId);
    this.invoices.recordPrint(saleId).catch(() => undefined);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', pdf.length);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="invoice-${saleId}.pdf"`,
    );
    res.end(pdf);
  }

  @Get(':saleId/preview')
  async preview(
    @Param('saleId') saleId: string,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const pdf = await this.invoices.generatePdf(saleId, req.user.shopId);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', pdf.length);
    res.setHeader(
      'Content-Disposition',
      `inline; filename="invoice-${saleId}.pdf"`,
    );
    res.end(pdf);
  }
}