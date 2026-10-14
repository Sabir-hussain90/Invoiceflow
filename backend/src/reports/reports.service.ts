import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  // ---------------- HELPERS ----------------
  private startOfDay(date: Date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private endOfDay(date: Date) {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d;
  }

  private rangeFromQuery(from?: string, to?: string) {
    const start = from ? new Date(from) : this.startOfDay(new Date());
    const end = to ? new Date(to) : this.endOfDay(new Date());
    return { start, end };
  }

  // ---------------- 1. DASHBOARD OVERVIEW ----------------
  // One call that powers the entire home page.
  async dashboard(shopId: string) {
    const todayStart = this.startOfDay(new Date());
    const todayEnd = this.endOfDay(new Date());

    const [
      salesAgg,
      expensesAgg,
      purchasesAgg,
      lowStockCount,
      outOfStockCount,
      customersOwedAgg,
      suppliersOwedAgg,
      productCount,
      customerCount,
      recentSales,
    ] = await Promise.all([
      // Today's sales
      this.prisma.sale.aggregate({
        where: {
          shopId,
          deletedAt: null,
          saleDate: { gte: todayStart, lte: todayEnd },
          status: { in: ['COMPLETED', 'PARTIALLY_RETURNED'] },
        },
        _sum: {
          totalAmount: true,
          amountPaid: true,
          amountDue: true,
          grossProfit: true,
          costOfGoodsSold: true,
          discountAmount: true,
        },
        _count: true,
      }),

      // Today's expenses
      this.prisma.expense.aggregate({
        where: {
          shopId,
          deletedAt: null,
          expenseDate: { gte: todayStart, lte: todayEnd },
        },
        _sum: { amount: true },
        _count: true,
      }),

      // Today's purchases (money spent on stock)
      this.prisma.purchase.aggregate({
        where: {
          shopId,
          deletedAt: null,
          purchaseDate: { gte: todayStart, lte: todayEnd },
        },
        _sum: { totalAmount: true, amountPaid: true, amountDue: true },
        _count: true,
      }),

      // Low stock count
      this.prisma.$queryRaw<[{ count: bigint }]>`
        SELECT COUNT(*)::bigint AS count
        FROM "Product"
        WHERE "shopId" = ${shopId}
          AND "deletedAt" IS NULL
          AND "isActive" = true
          AND "stockQty" <= "minStockLevel"
          AND "stockQty" > 0
      `,

      // Out of stock count
      this.prisma.$queryRaw<[{ count: bigint }]>`
        SELECT COUNT(*)::bigint AS count
        FROM "Product"
        WHERE "shopId" = ${shopId}
          AND "deletedAt" IS NULL
          AND "isActive" = true
          AND "stockQty" <= 0
      `,

      // Total owed by customers
      this.prisma.customer.aggregate({
        where: { shopId, deletedAt: null, totalOwed: { gt: 0 } },
        _sum: { totalOwed: true },
        _count: true,
      }),

      // Total we owe suppliers
      this.prisma.supplier.aggregate({
        where: { shopId, deletedAt: null, totalOwed: { gt: 0 } },
        _sum: { totalOwed: true },
        _count: true,
      }),

      // Total products
      this.prisma.product.count({
        where: { shopId, deletedAt: null, isActive: true },
      }),

      // Total customers
      this.prisma.customer.count({
        where: { shopId, deletedAt: null },
      }),

      // 5 most recent sales
      this.prisma.sale.findMany({
        where: { shopId, deletedAt: null },
        orderBy: { saleDate: 'desc' },
        take: 5,
        select: {
          id: true,
          invoiceNumber: true,
          totalAmount: true,
          paymentStatus: true,
          saleDate: true,
          customer: { select: { name: true } },
        },
      }),
    ]);

    const totalSales = Number(salesAgg._sum.totalAmount || 0);
    const totalReceived = Number(salesAgg._sum.amountPaid || 0);
    const totalDue = Number(salesAgg._sum.amountDue || 0);
    const grossProfit = Number(salesAgg._sum.grossProfit || 0);
    const totalExpenses = Number(expensesAgg._sum.amount || 0);
    const operatingProfit = grossProfit - totalExpenses;

    return {
      today: {
        salesCount: salesAgg._count,
        totalSales,
        totalReceived,
        totalDue,
        totalDiscount: Number(salesAgg._sum.discountAmount || 0),
        cogs: Number(salesAgg._sum.costOfGoodsSold || 0),
        grossProfit,
        expenses: totalExpenses,
        operatingProfit,
        expenseCount: expensesAgg._count,
      },
      purchasesToday: {
        count: purchasesAgg._count,
        totalPurchases: Number(purchasesAgg._sum.totalAmount || 0),
        totalPaid: Number(purchasesAgg._sum.amountPaid || 0),
        totalDue: Number(purchasesAgg._sum.amountDue || 0),
      },
      inventory: {
        totalProducts: productCount,
        lowStockCount: Number(lowStockCount[0]?.count || 0),
        outOfStockCount: Number(outOfStockCount[0]?.count || 0),
      },
      customers: {
        totalCustomers: customerCount,
        customersWithBalance: customersOwedAgg._count,
        totalReceivable: Number(customersOwedAgg._sum.totalOwed || 0),
      },
      suppliers: {
        suppliersWithBalance: suppliersOwedAgg._count,
        totalPayable: Number(suppliersOwedAgg._sum.totalOwed || 0),
      },
      recentSales,
    };
  }

  // ---------------- 2. DAILY SALES ----------------
  async dailySales(shopId: string, from?: string, to?: string) {
    const { start, end } = this.rangeFromQuery(from, to);

    // Fetch sales in range
    const sales = await this.prisma.sale.findMany({
      where: {
        shopId,
        deletedAt: null,
        saleDate: { gte: start, lte: end },
        status: { in: ['COMPLETED', 'PARTIALLY_RETURNED'] },
      },
      select: {
        saleDate: true,
        totalAmount: true,
        amountPaid: true,
        amountDue: true,
        grossProfit: true,
        costOfGoodsSold: true,
        discountAmount: true,
        paymentStatus: true,
      },
      orderBy: { saleDate: 'asc' },
    });

    // Group by date (YYYY-MM-DD)
    const grouped: Record<string, any> = {};

    for (const s of sales) {
      const dateKey = new Date(s.saleDate).toISOString().slice(0, 10);

      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          date: dateKey,
          salesCount: 0,
          totalSales: 0,
          totalReceived: 0,
          totalDue: 0,
          discount: 0,
          cogs: 0,
          grossProfit: 0,
        };
      }

      grouped[dateKey].salesCount += 1;
      grouped[dateKey].totalSales += Number(s.totalAmount);
      grouped[dateKey].totalReceived += Number(s.amountPaid);
      grouped[dateKey].totalDue += Number(s.amountDue);
      grouped[dateKey].discount += Number(s.discountAmount);
      grouped[dateKey].cogs += Number(s.costOfGoodsSold);
      grouped[dateKey].grossProfit += Number(s.grossProfit);
    }

    const dailyArray = Object.values(grouped);

    const totals = dailyArray.reduce(
      (acc: any, d: any) => ({
        salesCount: acc.salesCount + d.salesCount,
        totalSales: acc.totalSales + d.totalSales,
        totalReceived: acc.totalReceived + d.totalReceived,
        totalDue: acc.totalDue + d.totalDue,
        discount: acc.discount + d.discount,
        cogs: acc.cogs + d.cogs,
        grossProfit: acc.grossProfit + d.grossProfit,
      }),
      {
        salesCount: 0,
        totalSales: 0,
        totalReceived: 0,
        totalDue: 0,
        discount: 0,
        cogs: 0,
        grossProfit: 0,
      },
    );

    return {
      from: start.toISOString().slice(0, 10),
      to: end.toISOString().slice(0, 10),
      totals,
      days: dailyArray,
    };
  }

  // ---------------- 3. PROFIT REPORT ----------------
  async profit(shopId: string, from?: string, to?: string) {
    const { start, end } = this.rangeFromQuery(from, to);

    const [salesAgg, expensesAgg, purchasesAgg, expenseBreakdown] =
      await Promise.all([
        // Sales in period
        this.prisma.sale.aggregate({
          where: {
            shopId,
            deletedAt: null,
            saleDate: { gte: start, lte: end },
            status: { in: ['COMPLETED', 'PARTIALLY_RETURNED'] },
          },
          _sum: {
            subtotal: true,
            discountAmount: true,
            taxAmount: true,
            totalAmount: true,
            costOfGoodsSold: true,
            grossProfit: true,
          },
          _count: true,
        }),

        // Expenses in period
        this.prisma.expense.aggregate({
          where: {
            shopId,
            deletedAt: null,
            expenseDate: { gte: start, lte: end },
          },
          _sum: { amount: true },
          _count: true,
        }),

        // Purchases in period (for reference, not deducted from profit)
        this.prisma.purchase.aggregate({
          where: {
            shopId,
            deletedAt: null,
            purchaseDate: { gte: start, lte: end },
          },
          _sum: { totalAmount: true },
          _count: true,
        }),

        // Expense breakdown by category
        this.prisma.expense.groupBy({
          by: ['category'],
          where: {
            shopId,
            deletedAt: null,
            expenseDate: { gte: start, lte: end },
          },
          _sum: { amount: true },
          _count: true,
        }),
      ]);

    const netSales =
      Number(salesAgg._sum.subtotal || 0) -
      Number(salesAgg._sum.discountAmount || 0);
    const cogs = Number(salesAgg._sum.costOfGoodsSold || 0);
    const grossProfit = Number(salesAgg._sum.grossProfit || 0);
    const totalExpenses = Number(expensesAgg._sum.amount || 0);
    const operatingProfit = grossProfit - totalExpenses;

    return {
      period: {
        from: start.toISOString().slice(0, 10),
        to: end.toISOString().slice(0, 10),
      },
      sales: {
        count: salesAgg._count,
        subtotal: Number(salesAgg._sum.subtotal || 0),
        discount: Number(salesAgg._sum.discountAmount || 0),
        tax: Number(salesAgg._sum.taxAmount || 0),
        netSales,
        totalSales: Number(salesAgg._sum.totalAmount || 0),
      },
      profit: {
        cogs,
        grossProfit,
        totalExpenses,
        operatingProfit,
        grossMargin:
          netSales > 0
            ? Number(((grossProfit / netSales) * 100).toFixed(2))
            : 0,
        operatingMargin:
          netSales > 0
            ? Number(((operatingProfit / netSales) * 100).toFixed(2))
            : 0,
      },
      expenses: {
        total: totalExpenses,
        count: expensesAgg._count,
        breakdown: expenseBreakdown.map((e) => ({
          category: e.category,
          count: e._count,
          amount: Number(e._sum.amount || 0),
        })),
      },
      purchasesForPeriod: {
        count: purchasesAgg._count,
        totalAmount: Number(purchasesAgg._sum.totalAmount || 0),
      },
    };
  }

  // ---------------- 4. TOP PRODUCTS ----------------
  async topProducts(shopId: string, from?: string, to?: string, limit = 10) {
    const { start, end } = this.rangeFromQuery(from, to);

    const items = await this.prisma.saleItem.findMany({
      where: {
        sale: {
          shopId,
          deletedAt: null,
          saleDate: { gte: start, lte: end },
          status: { in: ['COMPLETED', 'PARTIALLY_RETURNED'] },
        },
      },
      select: {
        productId: true,
        productName: true,
        quantity: true,
        lineTotal: true,
        costPrice: true,
      },
    });

    const productMap: Record<string, any> = {};

    for (const item of items) {
      if (!productMap[item.productId]) {
        productMap[item.productId] = {
          productId: item.productId,
          productName: item.productName,
          totalQuantity: 0,
          totalRevenue: 0,
          totalCost: 0,
          totalProfit: 0,
          timesSold: 0,
        };
      }
      const qty = Number(item.quantity);
      const revenue = Number(item.lineTotal);
      const cost = Number(item.costPrice) * qty;

      productMap[item.productId].totalQuantity += qty;
      productMap[item.productId].totalRevenue += revenue;
      productMap[item.productId].totalCost += cost;
      productMap[item.productId].totalProfit += revenue - cost;
      productMap[item.productId].timesSold += 1;
    }

    return Object.values(productMap)
      .sort((a: any, b: any) => b.totalRevenue - a.totalRevenue)
      .slice(0, limit);
  }

  // ---------------- 5. TOP CUSTOMERS ----------------
  async topCustomers(shopId: string, from?: string, to?: string, limit = 10) {
    const { start, end } = this.rangeFromQuery(from, to);

    const sales = await this.prisma.sale.findMany({
      where: {
        shopId,
        deletedAt: null,
        customerId: { not: null },
        saleDate: { gte: start, lte: end },
        status: { in: ['COMPLETED', 'PARTIALLY_RETURNED'] },
      },
      select: {
        customerId: true,
        totalAmount: true,
        customer: { select: { id: true, name: true, phone: true } },
      },
    });

    const customerMap: Record<string, any> = {};

    for (const s of sales) {
      if (!s.customerId || !s.customer) continue;

      if (!customerMap[s.customerId]) {
        customerMap[s.customerId] = {
          customerId: s.customer.id,
          name: s.customer.name,
          phone: s.customer.phone,
          totalPurchases: 0,
          saleCount: 0,
        };
      }
      customerMap[s.customerId].totalPurchases += Number(s.totalAmount);
      customerMap[s.customerId].saleCount += 1;
    }

    return Object.values(customerMap)
      .sort((a: any, b: any) => b.totalPurchases - a.totalPurchases)
      .slice(0, limit);
  }

  // ---------------- 6. STOCK VALUE ----------------
  async stockValue(shopId: string) {
    const products = await this.prisma.product.findMany({
      where: { shopId, deletedAt: null, isActive: true },
      select: {
        id: true,
        name: true,
        sku: true,
        stockQty: true,
        costPrice: true,
        sellingPrice: true,
        unit: true,
        category: { select: { id: true, name: true } },
      },
    });

    let totalCostValue = 0;
    let totalRetailValue = 0;
    let totalItems = 0;

    const productsValue = products.map((p) => {
      const qty = Number(p.stockQty);
      const costValue = qty * Number(p.costPrice);
      const retailValue = qty * Number(p.sellingPrice);

      totalCostValue += costValue;
      totalRetailValue += retailValue;
      totalItems += qty;

      return {
        id: p.id,
        name: p.name,
        sku: p.sku,
        unit: p.unit,
        category: p.category?.name || null,
        stockQty: qty,
        costPrice: Number(p.costPrice),
        sellingPrice: Number(p.sellingPrice),
        costValue,
        retailValue,
        potentialProfit: retailValue - costValue,
      };
    });

    return {
      totalProducts: products.length,
      totalItems,
      totalCostValue,
      totalRetailValue,
      potentialProfit: totalRetailValue - totalCostValue,
      products: productsValue.sort((a, b) => b.costValue - a.costValue),
    };
  }

  // ---------------- 7. CASHIER PERFORMANCE ----------------
  async cashierPerformance(shopId: string, from?: string, to?: string) {
    const { start, end } = this.rangeFromQuery(from, to);

    const grouped = await this.prisma.sale.groupBy({
      by: ['cashierId'],
      where: {
        shopId,
        deletedAt: null,
        saleDate: { gte: start, lte: end },
        status: { in: ['COMPLETED', 'PARTIALLY_RETURNED'] },
      },
      _sum: { totalAmount: true, grossProfit: true },
      _count: true,
    });

    const cashierIds = grouped.map((g) => g.cashierId);
    const cashiers = await this.prisma.user.findMany({
      where: { id: { in: cashierIds } },
      select: { id: true, fullName: true, email: true },
    });
    const cashierMap = new Map(cashiers.map((c) => [c.id, c]));

    return grouped.map((g) => ({
      cashierId: g.cashierId,
      cashierName: cashierMap.get(g.cashierId)?.fullName || 'Unknown',
      cashierEmail: cashierMap.get(g.cashierId)?.email || null,
      saleCount: g._count,
      totalSales: Number(g._sum.totalAmount || 0),
      grossProfit: Number(g._sum.grossProfit || 0),
    }));
  }

  // ---------------- 8. PAYMENT METHOD BREAKDOWN ----------------
  async paymentBreakdown(shopId: string, from?: string, to?: string) {
    const { start, end } = this.rangeFromQuery(from, to);

    const grouped = await this.prisma.payment.groupBy({
      by: ['method'],
      where: {
        shopId,
        paidAt: { gte: start, lte: end },
        status: { in: ['PAID', 'PARTIALLY_PAID'] },
      },
      _sum: { amount: true },
      _count: true,
    });

    const total = grouped.reduce(
      (sum, g) => sum + Number(g._sum.amount || 0),
      0,
    );

    return {
      total,
      breakdown: grouped.map((g) => ({
        method: g.method,
        count: g._count,
        amount: Number(g._sum.amount || 0),
        percentage:
          total > 0
            ? Number(((Number(g._sum.amount || 0) / total) * 100).toFixed(2))
            : 0,
      })),
    };
  }

  // ---------------- 9. LOW STOCK REPORT ----------------
  async lowStock(shopId: string) {
    const products = await this.prisma.product.findMany({
      where: { shopId, deletedAt: null, isActive: true },
      include: {
        category: { select: { id: true, name: true } },
      },
      orderBy: { name: 'asc' },
    });

    const low = products
      .filter((p) => Number(p.stockQty) <= Number(p.minStockLevel))
      .map((p) => ({
        id: p.id,
        name: p.name,
        sku: p.sku,
        category: p.category?.name || null,
        stockQty: Number(p.stockQty),
        minStockLevel: Number(p.minStockLevel),
        unit: p.unit,
        isOutOfStock: Number(p.stockQty) <= 0,
      }));

    return {
      count: low.length,
      outOfStock: low.filter((p) => p.isOutOfStock).length,
      lowStock: low.filter((p) => !p.isOutOfStock).length,
      products: low,
    };
  }

  // ---------------- 10. OUTSTANDING RECEIVABLES (udhaar) ----------------
  async receivables(shopId: string) {
    const customers = await this.prisma.customer.findMany({
      where: { shopId, deletedAt: null, totalOwed: { gt: 0 } },
      select: {
        id: true,
        name: true,
        phone: true,
        totalOwed: true,
        totalPaid: true,
        creditLimit: true,
        createdAt: true,
      },
      orderBy: { totalOwed: 'desc' },
    });

    const total = customers.reduce((sum, c) => sum + Number(c.totalOwed), 0);

    return {
      totalReceivable: total,
      customerCount: customers.length,
      customers: customers.map((c) => ({
        ...c,
        totalOwed: Number(c.totalOwed),
        totalPaid: Number(c.totalPaid),
        creditLimit: Number(c.creditLimit),
        overLimit:
          Number(c.creditLimit) > 0 &&
          Number(c.totalOwed) > Number(c.creditLimit),
      })),
    };
  }

  // ---------------- 11. OUTSTANDING PAYABLES (to suppliers) ----------------
  async payables(shopId: string) {
    const suppliers = await this.prisma.supplier.findMany({
      where: { shopId, deletedAt: null, totalOwed: { gt: 0 } },
      select: {
        id: true,
        name: true,
        companyName: true,
        phone: true,
        totalOwed: true,
        totalPaid: true,
        createdAt: true,
      },
      orderBy: { totalOwed: 'desc' },
    });

    const total = suppliers.reduce((sum, s) => sum + Number(s.totalOwed), 0);

    return {
      totalPayable: total,
      supplierCount: suppliers.length,
      suppliers: suppliers.map((s) => ({
        ...s,
        totalOwed: Number(s.totalOwed),
        totalPaid: Number(s.totalPaid),
      })),
    };
  }

  // ---------------- 12. CATEGORY SALES BREAKDOWN ----------------
  async categorySales(shopId: string, from?: string, to?: string) {
    const { start, end } = this.rangeFromQuery(from, to);

    const items = await this.prisma.saleItem.findMany({
      where: {
        sale: {
          shopId,
          deletedAt: null,
          saleDate: { gte: start, lte: end },
          status: { in: ['COMPLETED', 'PARTIALLY_RETURNED'] },
        },
      },
      select: {
        productId: true,
        quantity: true,
        lineTotal: true,
      },
    });

    const productIds = [...new Set(items.map((i) => i.productId))];
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: {
        id: true,
        category: { select: { id: true, name: true } },
      },
    });
    const productMap = new Map(products.map((p) => [p.id, p]));

    const categoryMap: Record<string, any> = {};

    for (const item of items) {
      const product = productMap.get(item.productId);
      const categoryName = product?.category?.name || 'Uncategorized';

      if (!categoryMap[categoryName]) {
        categoryMap[categoryName] = {
          category: categoryName,
          totalQuantity: 0,
          totalRevenue: 0,
        };
      }
      categoryMap[categoryName].totalQuantity += Number(item.quantity);
      categoryMap[categoryName].totalRevenue += Number(item.lineTotal);
    }

    const total = Object.values(categoryMap).reduce(
      (sum: number, c: any) => sum + c.totalRevenue,
      0,
    );

    return {
      total,
      categories: Object.values(categoryMap)
        .map((c: any) => ({
          ...c,
          percentage:
            total > 0
              ? Number(((c.totalRevenue / total) * 100).toFixed(2))
              : 0,
        }))
        .sort((a: any, b: any) => b.totalRevenue - a.totalRevenue),
    };
  }
}