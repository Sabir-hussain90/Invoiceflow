"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.NullableJsonNullValueInput = exports.SortOrder = exports.AuditLogScalarFieldEnum = exports.EmailLogScalarFieldEnum = exports.NotificationScalarFieldEnum = exports.ReturnItemScalarFieldEnum = exports.ReturnScalarFieldEnum = exports.StockMovementScalarFieldEnum = exports.ExpenseScalarFieldEnum = exports.PurchaseItemScalarFieldEnum = exports.PurchaseScalarFieldEnum = exports.PaymentScalarFieldEnum = exports.InvoiceScalarFieldEnum = exports.SaleItemScalarFieldEnum = exports.SaleScalarFieldEnum = exports.SupplierScalarFieldEnum = exports.CustomerScalarFieldEnum = exports.ProductScalarFieldEnum = exports.CategoryScalarFieldEnum = exports.InvoiceCounterScalarFieldEnum = exports.ShopScalarFieldEnum = exports.EmailVerificationScalarFieldEnum = exports.PasswordResetScalarFieldEnum = exports.RefreshTokenScalarFieldEnum = exports.SessionScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.10.0",
    engine: "0edf323efd1d98336f3f0a68684b56f689b900d3"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Session: 'Session',
    RefreshToken: 'RefreshToken',
    PasswordReset: 'PasswordReset',
    EmailVerification: 'EmailVerification',
    Shop: 'Shop',
    InvoiceCounter: 'InvoiceCounter',
    Category: 'Category',
    Product: 'Product',
    Customer: 'Customer',
    Supplier: 'Supplier',
    Sale: 'Sale',
    SaleItem: 'SaleItem',
    Invoice: 'Invoice',
    Payment: 'Payment',
    Purchase: 'Purchase',
    PurchaseItem: 'PurchaseItem',
    Expense: 'Expense',
    StockMovement: 'StockMovement',
    Return: 'Return',
    ReturnItem: 'ReturnItem',
    Notification: 'Notification',
    EmailLog: 'EmailLog',
    AuditLog: 'AuditLog'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    fullName: 'fullName',
    phone: 'phone',
    role: 'role',
    status: 'status',
    emailVerified: 'emailVerified',
    emailVerifiedAt: 'emailVerifiedAt',
    avatarUrl: 'avatarUrl',
    lastLoginAt: 'lastLoginAt',
    lastLoginIp: 'lastLoginIp',
    failedLoginAttempts: 'failedLoginAttempts',
    lockedUntil: 'lockedUntil',
    twoFactorEnabled: 'twoFactorEnabled',
    twoFactorSecret: 'twoFactorSecret',
    shopId: 'shopId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
exports.SessionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    token: 'token',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    deviceName: 'deviceName',
    isActive: 'isActive',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    lastActiveAt: 'lastActiveAt',
    revokedAt: 'revokedAt'
};
exports.RefreshTokenScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    token: 'token',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    replacedBy: 'replacedBy',
    createdAt: 'createdAt'
};
exports.PasswordResetScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    token: 'token',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt'
};
exports.EmailVerificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    token: 'token',
    expiresAt: 'expiresAt',
    verifiedAt: 'verifiedAt',
    createdAt: 'createdAt'
};
exports.ShopScalarFieldEnum = {
    id: 'id',
    name: 'name',
    legalName: 'legalName',
    ntnNumber: 'ntnNumber',
    strnNumber: 'strnNumber',
    phone: 'phone',
    email: 'email',
    address: 'address',
    city: 'city',
    province: 'province',
    country: 'country',
    postalCode: 'postalCode',
    logoUrl: 'logoUrl',
    currency: 'currency',
    timezone: 'timezone',
    invoicePrefix: 'invoicePrefix',
    invoiceFooter: 'invoiceFooter',
    taxEnabled: 'taxEnabled',
    taxPercentage: 'taxPercentage',
    lowStockThreshold: 'lowStockThreshold',
    allowNegativeStock: 'allowNegativeStock',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
exports.InvoiceCounterScalarFieldEnum = {
    id: 'id',
    shopId: 'shopId',
    year: 'year',
    prefix: 'prefix',
    lastNumber: 'lastNumber',
    updatedAt: 'updatedAt'
};
exports.CategoryScalarFieldEnum = {
    id: 'id',
    shopId: 'shopId',
    name: 'name',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
exports.ProductScalarFieldEnum = {
    id: 'id',
    shopId: 'shopId',
    categoryId: 'categoryId',
    name: 'name',
    description: 'description',
    sku: 'sku',
    barcode: 'barcode',
    unit: 'unit',
    costPrice: 'costPrice',
    sellingPrice: 'sellingPrice',
    wholesalePrice: 'wholesalePrice',
    stockQty: 'stockQty',
    minStockLevel: 'minStockLevel',
    maxStockLevel: 'maxStockLevel',
    hasExpiry: 'hasExpiry',
    expiryDate: 'expiryDate',
    batchNumber: 'batchNumber',
    imageUrl: 'imageUrl',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
exports.CustomerScalarFieldEnum = {
    id: 'id',
    shopId: 'shopId',
    name: 'name',
    phone: 'phone',
    email: 'email',
    address: 'address',
    city: 'city',
    cnic: 'cnic',
    notes: 'notes',
    openingBalance: 'openingBalance',
    creditLimit: 'creditLimit',
    totalOwed: 'totalOwed',
    totalPaid: 'totalPaid',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
exports.SupplierScalarFieldEnum = {
    id: 'id',
    shopId: 'shopId',
    name: 'name',
    companyName: 'companyName',
    phone: 'phone',
    email: 'email',
    address: 'address',
    city: 'city',
    ntnNumber: 'ntnNumber',
    openingBalance: 'openingBalance',
    totalOwed: 'totalOwed',
    totalPaid: 'totalPaid',
    notes: 'notes',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
exports.SaleScalarFieldEnum = {
    id: 'id',
    shopId: 'shopId',
    invoiceNumber: 'invoiceNumber',
    customerId: 'customerId',
    cashierId: 'cashierId',
    status: 'status',
    paymentStatus: 'paymentStatus',
    subtotal: 'subtotal',
    discountAmount: 'discountAmount',
    discountPercent: 'discountPercent',
    taxAmount: 'taxAmount',
    totalAmount: 'totalAmount',
    costOfGoodsSold: 'costOfGoodsSold',
    grossProfit: 'grossProfit',
    amountPaid: 'amountPaid',
    amountDue: 'amountDue',
    changeGiven: 'changeGiven',
    notes: 'notes',
    saleDate: 'saleDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
exports.SaleItemScalarFieldEnum = {
    id: 'id',
    saleId: 'saleId',
    productId: 'productId',
    productName: 'productName',
    sku: 'sku',
    quantity: 'quantity',
    unit: 'unit',
    unitPrice: 'unitPrice',
    costPrice: 'costPrice',
    discountAmount: 'discountAmount',
    lineTotal: 'lineTotal',
    returnQty: 'returnQty',
    createdAt: 'createdAt'
};
exports.InvoiceScalarFieldEnum = {
    id: 'id',
    saleId: 'saleId',
    shopId: 'shopId',
    invoiceNumber: 'invoiceNumber',
    pdfUrl: 'pdfUrl',
    pdfGeneratedAt: 'pdfGeneratedAt',
    printedCount: 'printedCount',
    lastPrintedAt: 'lastPrintedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PaymentScalarFieldEnum = {
    id: 'id',
    shopId: 'shopId',
    saleId: 'saleId',
    customerId: 'customerId',
    receivedById: 'receivedById',
    amount: 'amount',
    method: 'method',
    status: 'status',
    reference: 'reference',
    notes: 'notes',
    paidAt: 'paidAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PurchaseScalarFieldEnum = {
    id: 'id',
    shopId: 'shopId',
    purchaseNumber: 'purchaseNumber',
    supplierId: 'supplierId',
    purchasedById: 'purchasedById',
    status: 'status',
    subtotal: 'subtotal',
    discountAmount: 'discountAmount',
    taxAmount: 'taxAmount',
    totalAmount: 'totalAmount',
    amountPaid: 'amountPaid',
    amountDue: 'amountDue',
    paymentMethod: 'paymentMethod',
    notes: 'notes',
    purchaseDate: 'purchaseDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
exports.PurchaseItemScalarFieldEnum = {
    id: 'id',
    purchaseId: 'purchaseId',
    productId: 'productId',
    productName: 'productName',
    quantity: 'quantity',
    unit: 'unit',
    unitCost: 'unitCost',
    lineTotal: 'lineTotal',
    returnQty: 'returnQty',
    createdAt: 'createdAt'
};
exports.ExpenseScalarFieldEnum = {
    id: 'id',
    shopId: 'shopId',
    category: 'category',
    title: 'title',
    description: 'description',
    amount: 'amount',
    paymentMethod: 'paymentMethod',
    expenseDate: 'expenseDate',
    createdById: 'createdById',
    receiptUrl: 'receiptUrl',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
exports.StockMovementScalarFieldEnum = {
    id: 'id',
    shopId: 'shopId',
    productId: 'productId',
    type: 'type',
    quantity: 'quantity',
    balanceAfter: 'balanceAfter',
    referenceType: 'referenceType',
    referenceId: 'referenceId',
    reason: 'reason',
    unitCost: 'unitCost',
    createdById: 'createdById',
    createdAt: 'createdAt'
};
exports.ReturnScalarFieldEnum = {
    id: 'id',
    shopId: 'shopId',
    returnNumber: 'returnNumber',
    saleId: 'saleId',
    customerId: 'customerId',
    processedById: 'processedById',
    reason: 'reason',
    notes: 'notes',
    refundAmount: 'refundAmount',
    refundMethod: 'refundMethod',
    restockItems: 'restockItems',
    returnDate: 'returnDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ReturnItemScalarFieldEnum = {
    id: 'id',
    returnId: 'returnId',
    saleItemId: 'saleItemId',
    productId: 'productId',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    lineTotal: 'lineTotal',
    restocked: 'restocked',
    createdAt: 'createdAt'
};
exports.NotificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    shopId: 'shopId',
    type: 'type',
    channel: 'channel',
    title: 'title',
    message: 'message',
    actionUrl: 'actionUrl',
    metadata: 'metadata',
    isRead: 'isRead',
    readAt: 'readAt',
    sentAt: 'sentAt',
    createdAt: 'createdAt'
};
exports.EmailLogScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    status: 'status',
    toEmail: 'toEmail',
    fromEmail: 'fromEmail',
    subject: 'subject',
    bodyPreview: 'bodyPreview',
    messageId: 'messageId',
    error: 'error',
    sentAt: 'sentAt',
    createdAt: 'createdAt'
};
exports.AuditLogScalarFieldEnum = {
    id: 'id',
    shopId: 'shopId',
    userId: 'userId',
    action: 'action',
    entity: 'entity',
    entityId: 'entityId',
    description: 'description',
    before: 'before',
    after: 'after',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map