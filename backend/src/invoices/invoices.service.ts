import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import PDFDocument from 'pdfkit';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async generatePdf(saleId: string, shopId: string): Promise<Buffer> {
    const sale = await this.prisma.sale.findUnique({
      where: { id: saleId },
      include: {
        items: true,
        customer: true,
        cashier: { select: { fullName: true } },
        shop: true,
        invoice: true,
      },
    });

    if (!sale || sale.deletedAt) {
      throw new NotFoundException('Sale not found');
    }

    if (sale.shopId !== shopId) {
      throw new ForbiddenException('Sale belongs to another shop');
    }

    return this.buildPdf(sale);
  }

  private buildPdf(sale: any): Promise<Buffer> {
    return new Promise((resolve) => {
      const shop = sale.shop;

      const doc = new PDFDocument({ size: 'A4', margin: 40 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      const PRIMARY = '#1e40af';
      const DARK = '#111827';
      const MEDIUM = '#4b5563';
      const LIGHT = '#9ca3af';
      const BORDER = '#e5e7eb';
      const BG_SOFT = '#f9fafb';
      const SUCCESS = '#16a34a';
      const DANGER = '#dc2626';

      const leftMargin = 40;
      const rightMargin = 555;
      const pageWidth = 515;

      // ========== TOP BAR ==========
      doc.rect(leftMargin, 40, pageWidth, 4).fill(PRIMARY);

      let y = 60;

      // Logo circle
      doc.circle(leftMargin + 25, y + 25, 25).fill(PRIMARY);
      doc
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .fontSize(24)
        .text(
          (shop.name || 'S').charAt(0).toUpperCase(),
          leftMargin + 10,
          y + 12,
          { width: 30, align: 'center' },
        );

      // Shop name
      doc
        .fillColor(DARK)
        .font('Helvetica-Bold')
        .fontSize(22)
        .text(shop.name || 'Your Shop', leftMargin + 65, y, {
          width: 350,
        });

      if (shop.legalName) {
        doc
          .fillColor(MEDIUM)
          .font('Helvetica')
          .fontSize(9)
          .text(shop.legalName, leftMargin + 65, y + 28, { width: 350 });
      }

      // Address block
      let addrY = y + 44;
      if (shop.address) {
        doc
          .fillColor(MEDIUM)
          .font('Helvetica')
          .fontSize(9)
          .text(shop.address, leftMargin + 65, addrY, { width: 350 });
        addrY += 12;
      }
      const cityLine = [shop.city, shop.province, shop.postalCode]
        .filter(Boolean)
        .join(', ');
      if (cityLine) {
        doc.text(cityLine, leftMargin + 65, addrY, { width: 350 });
        addrY += 12;
      }
      if (shop.phone) {
        doc.text(`Phone: ${shop.phone}`, leftMargin + 65, addrY, {
          width: 350,
        });
        addrY += 12;
      }
      if (shop.email) {
        doc.text(`Email: ${shop.email}`, leftMargin + 65, addrY, {
          width: 350,
        });
        addrY += 12;
      }

      // INVOICE label (right)
      doc
        .fillColor(PRIMARY)
        .font('Helvetica-Bold')
        .fontSize(28)
        .text('INVOICE', 350, 60, { width: 205, align: 'right' });

      doc
        .fillColor(DARK)
        .font('Helvetica-Bold')
        .fontSize(11)
        .text(sale.invoiceNumber, 350, 95, { width: 205, align: 'right' });

      // Status pill
      const statusMap: Record<string, { bg: string; label: string }> = {
        PAID: { bg: SUCCESS, label: 'PAID' },
        PARTIALLY_PAID: { bg: '#f59e0b', label: 'PARTIAL' },
        UNPAID: { bg: DANGER, label: 'UNPAID' },
        REFUNDED: { bg: MEDIUM, label: 'REFUNDED' },
        PARTIALLY_REFUNDED: { bg: MEDIUM, label: 'PARTIAL REFUND' },
      };
      const status = statusMap[sale.paymentStatus] || {
        bg: MEDIUM,
        label: sale.paymentStatus,
      };

      const pillWidth = 90;
      const pillHeight = 22;
      const pillX = rightMargin - pillWidth;
      const pillY = 115;

      doc.roundedRect(pillX, pillY, pillWidth, pillHeight, 11).fill(status.bg);
      doc
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .fontSize(9)
        .text(status.label, pillX, pillY + 7, {
          width: pillWidth,
          align: 'center',
        });

      // Divider
      y = Math.max(addrY, pillY + pillHeight) + 15;
      doc
        .moveTo(leftMargin, y)
        .lineTo(rightMargin, y)
        .strokeColor(BORDER)
        .lineWidth(1)
        .stroke();
      y += 15;

      // ========== INFO ROW ==========
      const colWidth = pageWidth / 3;

      // Billed To
      doc
        .fillColor(LIGHT)
        .font('Helvetica-Bold')
        .fontSize(8)
        .text('BILLED TO', leftMargin, y, { width: colWidth });

      doc
        .fillColor(DARK)
        .font('Helvetica-Bold')
        .fontSize(11)
        .text(sale.customer?.name || 'Walk-in Customer', leftMargin, y + 14, {
          width: colWidth - 10,
        });

      if (sale.customer?.phone) {
        doc
          .fillColor(MEDIUM)
          .font('Helvetica')
          .fontSize(9)
          .text(sale.customer.phone, leftMargin, y + 30, {
            width: colWidth - 10,
          });
      }

      // Cashier
      doc
        .fillColor(LIGHT)
        .font('Helvetica-Bold')
        .fontSize(8)
        .text('SERVED BY', leftMargin + colWidth, y, { width: colWidth });

      doc
        .fillColor(DARK)
        .font('Helvetica-Bold')
        .fontSize(11)
        .text(
          sale.cashier?.fullName || 'Staff',
          leftMargin + colWidth,
          y + 14,
          { width: colWidth - 10 },
        );

      doc
        .fillColor(MEDIUM)
        .font('Helvetica')
        .fontSize(9)
        .text('Cashier', leftMargin + colWidth, y + 30, {
          width: colWidth - 10,
        });

      // Date
      doc
        .fillColor(LIGHT)
        .font('Helvetica-Bold')
        .fontSize(8)
        .text('INVOICE DATE', leftMargin + colWidth * 2, y, {
          width: colWidth,
          align: 'right',
        });

      doc
        .fillColor(DARK)
        .font('Helvetica-Bold')
        .fontSize(11)
        .text(
          new Date(sale.saleDate).toLocaleDateString('en-PK', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            timeZone: 'Asia/Karachi',
          }),
          leftMargin + colWidth * 2,
          y + 14,
          { width: colWidth, align: 'right' },
        );

      doc
        .fillColor(MEDIUM)
        .font('Helvetica')
        .fontSize(9)
        .text(
          new Date(sale.saleDate).toLocaleTimeString('en-PK', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Karachi',
          }),
          leftMargin + colWidth * 2,
          y + 30,
          { width: colWidth, align: 'right' },
        );

      y += 60;

      // ========== ITEMS TABLE ==========
      doc.rect(leftMargin, y, pageWidth, 26).fill(PRIMARY);

      const cols = {
        num: leftMargin + 5,
        item: leftMargin + 30,
        qty: leftMargin + 285,
        price: leftMargin + 350,
        disc: leftMargin + 415,
        total: leftMargin + 465,
      };

      doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(9);
      doc.text('#', cols.num, y + 8, { width: 20 });
      doc.text('ITEM DESCRIPTION', cols.item, y + 8, { width: 240 });
      doc.text('QTY', cols.qty, y + 8, { width: 60, align: 'right' });
      doc.text('PRICE', cols.price, y + 8, { width: 60, align: 'right' });
      doc.text('DISC', cols.disc, y + 8, { width: 45, align: 'right' });
      doc.text('TOTAL', cols.total, y + 8, { width: 60, align: 'right' });

      y += 26;

      let rowIndex = 0;
      doc.font('Helvetica').fontSize(10);

      sale.items.forEach((item: any) => {
        if (rowIndex % 2 === 1) {
          doc.rect(leftMargin, y, pageWidth, 24).fill(BG_SOFT);
        }

        if (y > 720) {
          doc.addPage();
          y = 60;
          doc.rect(leftMargin, y, pageWidth, 26).fill(PRIMARY);
          doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(9);
          doc.text('#', cols.num, y + 8, { width: 20 });
          doc.text('ITEM DESCRIPTION', cols.item, y + 8, { width: 240 });
          doc.text('QTY', cols.qty, y + 8, { width: 60, align: 'right' });
          doc.text('PRICE', cols.price, y + 8, { width: 60, align: 'right' });
          doc.text('DISC', cols.disc, y + 8, { width: 45, align: 'right' });
          doc.text('TOTAL', cols.total, y + 8, { width: 60, align: 'right' });
          y += 26;
          doc.font('Helvetica').fontSize(10);
        }

        doc.fillColor(DARK).font('Helvetica').fontSize(9);
        doc.text(String(rowIndex + 1), cols.num, y + 8, { width: 20 });

        doc.fillColor(DARK).font('Helvetica-Bold').fontSize(10);
        doc.text(item.productName || 'Item', cols.item, y + 7, {
          width: 240,
        });

        if (item.sku) {
          doc.fillColor(MEDIUM).font('Helvetica').fontSize(8);
          doc.text(`SKU: ${item.sku}`, cols.item, y + 19, { width: 240 });
        }

        doc.fillColor(DARK).font('Helvetica').fontSize(10);
        doc.text(
          `${Number(item.quantity)} ${item.unit || ''}`.trim(),
          cols.qty,
          y + 8,
          { width: 60, align: 'right' },
        );
        doc.text(
          `Rs. ${Number(item.unitPrice).toFixed(2)}`,
          cols.price,
          y + 8,
          { width: 60, align: 'right' },
        );

        doc.fillColor(Number(item.discountAmount) > 0 ? DANGER : LIGHT);
        doc.text(
          Number(item.discountAmount) > 0
            ? `−${Number(item.discountAmount).toFixed(2)}`
            : '—',
          cols.disc,
          y + 8,
          { width: 45, align: 'right' },
        );

        doc.fillColor(DARK).font('Helvetica-Bold').fontSize(10);
        doc.text(
          `Rs. ${Number(item.lineTotal).toFixed(2)}`,
          cols.total,
          y + 8,
          { width: 60, align: 'right' },
        );

        y += item.sku ? 28 : 24;
        rowIndex++;
      });

      doc
        .moveTo(leftMargin, y)
        .lineTo(rightMargin, y)
        .strokeColor(BORDER)
        .lineWidth(1)
        .stroke();

      y += 15;

      // ========== TOTALS ==========
      const totalsX = 320;
      const totalsWidth = 235;
      const lineH = 20;

      doc.fillColor(MEDIUM).font('Helvetica').fontSize(10);
      doc.text('Subtotal', totalsX, y, { width: 130 });
      doc
        .fillColor(DARK)
        .font('Helvetica-Bold')
        .text(`Rs. ${Number(sale.subtotal).toFixed(2)}`, totalsX + 130, y, {
          width: 105,
          align: 'right',
        });
      y += lineH;

      if (Number(sale.discountAmount) > 0) {
        doc.fillColor(MEDIUM).font('Helvetica').fontSize(10);
        doc.text('Discount', totalsX, y, { width: 130 });
        doc
          .fillColor(DANGER)
          .font('Helvetica-Bold')
          .text(
            `−Rs. ${Number(sale.discountAmount).toFixed(2)}`,
            totalsX + 130,
            y,
            { width: 105, align: 'right' },
          );
        y += lineH;
      }

      if (Number(sale.taxAmount) > 0) {
        doc.fillColor(MEDIUM).font('Helvetica').fontSize(10);
        doc.text('Tax', totalsX, y, { width: 130 });
        doc
          .fillColor(DARK)
          .font('Helvetica-Bold')
          .text(`Rs. ${Number(sale.taxAmount).toFixed(2)}`, totalsX + 130, y, {
            width: 105,
            align: 'right',
          });
        y += lineH;
      }

      // Total box
      const totalBoxY = y + 4;
      doc.roundedRect(totalsX, totalBoxY, totalsWidth, 32, 6).fill(PRIMARY);

      doc
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .fontSize(12)
        .text('TOTAL', totalsX + 12, totalBoxY + 9);
      doc
        .fillColor('#ffffff')
        .font('Helvetica-Bold')
        .fontSize(14)
        .text(
          `Rs. ${Number(sale.totalAmount).toFixed(2)}`,
          totalsX + 100,
          totalBoxY + 8,
          { width: 130, align: 'right' },
        );

      y = totalBoxY + 42;

      // Paid
      doc.fillColor(MEDIUM).font('Helvetica').fontSize(10);
      doc.text('Paid', totalsX, y, { width: 130 });
      doc
        .fillColor(SUCCESS)
        .font('Helvetica-Bold')
        .text(`Rs. ${Number(sale.amountPaid).toFixed(2)}`, totalsX + 130, y, {
          width: 105,
          align: 'right',
        });
      y += lineH;

      // Balance due
      if (Number(sale.amountDue) > 0) {
        doc.fillColor(MEDIUM).font('Helvetica').fontSize(10);
        doc.text('Balance Due', totalsX, y, { width: 130 });
        doc
          .fillColor(DANGER)
          .font('Helvetica-Bold')
          .text(
            `Rs. ${Number(sale.amountDue).toFixed(2)}`,
            totalsX + 130,
            y,
            { width: 105, align: 'right' },
          );
        y += lineH;
      }

      // Change
      if (Number(sale.changeGiven) > 0) {
        doc.fillColor(MEDIUM).font('Helvetica').fontSize(10);
        doc.text('Change Given', totalsX, y, { width: 130 });
        doc
          .fillColor(DARK)
          .font('Helvetica-Bold')
          .text(
            `Rs. ${Number(sale.changeGiven).toFixed(2)}`,
            totalsX + 130,
            y,
            { width: 105, align: 'right' },
          );
        y += lineH;
      }

      // ========== PAYMENT METHOD + JAZZCASH/EASYPAISA NUMBER ==========
      const payments = await_paymentInfo(sale);
      if (payments) {
        y += 6;
        doc.fillColor(LIGHT).font('Helvetica-Bold').fontSize(8);
        doc.text('PAYMENT METHOD', leftMargin, y);
        y += 12;

        doc.fillColor(DARK).font('Helvetica-Bold').fontSize(10);
        doc.text(payments.label, leftMargin, y);
        y += 14;

        if (payments.accountNumber) {
          doc.fillColor(MEDIUM).font('Helvetica').fontSize(9);
          doc.text(
            `${payments.accountLabel}: ${payments.accountNumber}`,
            leftMargin,
            y,
          );
          y += 12;
        }
      }

      // Notes
      if (sale.notes) {
        y += 8;
        doc
          .fillColor(LIGHT)
          .font('Helvetica-Bold')
          .fontSize(8)
          .text('NOTES', leftMargin, y);
        doc
          .fillColor(MEDIUM)
          .font('Helvetica')
          .fontSize(9)
          .text(sale.notes, leftMargin, y + 12, { width: 260 });
      }

      // ========== FOOTER ==========
      const footerY = 760;

      doc
        .moveTo(leftMargin, footerY)
        .lineTo(rightMargin, footerY)
        .strokeColor(BORDER)
        .stroke();

      doc
        .fillColor(PRIMARY)
        .font('Helvetica-Bold')
        .fontSize(11)
        .text(
          shop.invoiceFooter || 'Thank you for shopping with us!',
          leftMargin,
          footerY + 10,
          { width: pageWidth, align: 'center' },
        );

      doc
        .fillColor(LIGHT)
        .font('Helvetica')
        .fontSize(8)
        .text(
          `Generated by InvoiceFlow Pakistan • ${new Date().toLocaleString(
            'en-PK',
            { timeZone: 'Asia/Karachi' },
          )}`,
          leftMargin,
          footerY + 28,
          { width: pageWidth, align: 'center' },
        );

      doc
        .fillColor(LIGHT)
        .font('Helvetica')
        .fontSize(7)
        .text(
          'This is a computer-generated invoice and does not require a signature.',
          leftMargin,
          footerY + 42,
          { width: pageWidth, align: 'center' },
        );

      doc.rect(leftMargin, 800, pageWidth, 4).fill(PRIMARY);

      doc.end();
    });
  }

  async getMeta(saleId: string, shopId: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { saleId },
      include: {
        sale: {
          select: {
            id: true,
            invoiceNumber: true,
            totalAmount: true,
            saleDate: true,
            paymentStatus: true,
          },
        },
      },
    });

    if (!invoice) throw new NotFoundException('Invoice not found');
    if (invoice.shopId !== shopId) {
      throw new ForbiddenException('Invoice belongs to another shop');
    }

    return invoice;
  }

  async findAll(shopId: string, limit = 100) {
    return this.prisma.invoice.findMany({
      where: { shopId },
      include: {
        sale: {
          select: {
            id: true,
            invoiceNumber: true,
            totalAmount: true,
            saleDate: true,
            paymentStatus: true,
            customer: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: Math.min(limit, 500),
    });
  }

  async recordPrint(saleId: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { saleId },
    });
    if (!invoice) return;

    await this.prisma.invoice.update({
      where: { id: invoice.id },
      data: {
        printedCount: { increment: 1 },
        lastPrintedAt: new Date(),
      },
    });
  }
}

// ==================================================
// HELPER — returns payment method + account number
// ==================================================
function await_paymentInfo(sale: any) {
  const shop = sale.shop || {};
  const method = String(sale.paymentMethod || '').toUpperCase();

  if (!method) return null;

  const methodLabels: Record<string, string> = {
    CASH: 'Cash',
    JAZZCASH: 'JazzCash',
    EASYPAISA: 'EasyPaisa',
    BANK_TRANSFER: 'Bank Transfer',
    DIGITAL_WALLET: 'Digital Wallet',
    CARD: 'Card',
    CREDIT: 'Udhaar (Credit)',
    SPLIT: 'Split Payment',
    OTHER: 'Other',
  };

  let accountNumber: string | null = null;
  let accountLabel = '';

  if (method === 'JAZZCASH' && shop.jazzcashNumber) {
    accountNumber = shop.jazzcashNumber;
    accountLabel = 'Paid to JazzCash';
  } else if (method === 'EASYPAISA' && shop.easypaisaNumber) {
    accountNumber = shop.easypaisaNumber;
    accountLabel = 'Paid to EasyPaisa';
  }

  return {
    label: methodLabels[method] || method,
    accountNumber,
    accountLabel,
  };
}