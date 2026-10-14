"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditAction = exports.EmailStatus = exports.EmailType = exports.NotificationChannel = exports.NotificationType = exports.ExpenseCategory = exports.StockMovementType = exports.PurchaseStatus = exports.SaleStatus = exports.PaymentStatus = exports.PaymentMethod = exports.UserStatus = exports.UserRole = void 0;
exports.UserRole = {
    OWNER: 'OWNER',
    CASHIER: 'CASHIER',
    STOCK_MANAGER: 'STOCK_MANAGER',
    ADMIN: 'ADMIN'
};
exports.UserStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    SUSPENDED: 'SUSPENDED',
    PENDING_VERIFICATION: 'PENDING_VERIFICATION'
};
exports.PaymentMethod = {
    CASH: 'CASH',
    BANK_TRANSFER: 'BANK_TRANSFER',
    DIGITAL_WALLET: 'DIGITAL_WALLET',
    CARD: 'CARD',
    CREDIT: 'CREDIT',
    SPLIT: 'SPLIT',
    OTHER: 'OTHER'
};
exports.PaymentStatus = {
    PAID: 'PAID',
    PARTIALLY_PAID: 'PARTIALLY_PAID',
    UNPAID: 'UNPAID',
    REFUNDED: 'REFUNDED',
    PARTIALLY_REFUNDED: 'PARTIALLY_REFUNDED'
};
exports.SaleStatus = {
    COMPLETED: 'COMPLETED',
    RETURNED: 'RETURNED',
    PARTIALLY_RETURNED: 'PARTIALLY_RETURNED',
    CANCELLED: 'CANCELLED',
    DRAFT: 'DRAFT'
};
exports.PurchaseStatus = {
    RECEIVED: 'RECEIVED',
    PENDING: 'PENDING',
    PARTIALLY_RETURNED: 'PARTIALLY_RETURNED',
    RETURNED: 'RETURNED',
    CANCELLED: 'CANCELLED'
};
exports.StockMovementType = {
    OPENING_STOCK: 'OPENING_STOCK',
    PURCHASE: 'PURCHASE',
    SALE: 'SALE',
    RETURN_IN: 'RETURN_IN',
    RETURN_OUT: 'RETURN_OUT',
    DAMAGE: 'DAMAGE',
    EXPIRY: 'EXPIRY',
    ADJUSTMENT_IN: 'ADJUSTMENT_IN',
    ADJUSTMENT_OUT: 'ADJUSTMENT_OUT',
    TRANSFER_IN: 'TRANSFER_IN',
    TRANSFER_OUT: 'TRANSFER_OUT'
};
exports.ExpenseCategory = {
    ELECTRICITY: 'ELECTRICITY',
    RENT: 'RENT',
    WAGES: 'WAGES',
    TRANSPORT: 'TRANSPORT',
    PACKAGING: 'PACKAGING',
    REPAIRS: 'REPAIRS',
    INTERNET: 'INTERNET',
    WATER: 'WATER',
    GAS: 'GAS',
    OFFICE: 'OFFICE',
    MARKETING: 'MARKETING',
    OTHER: 'OTHER'
};
exports.NotificationType = {
    LOW_STOCK: 'LOW_STOCK',
    OUT_OF_STOCK: 'OUT_OF_STOCK',
    PAYMENT_DUE: 'PAYMENT_DUE',
    NEW_SALE: 'NEW_SALE',
    NEW_PURCHASE: 'NEW_PURCHASE',
    NEW_CUSTOMER: 'NEW_CUSTOMER',
    RETURN_REQUEST: 'RETURN_REQUEST',
    PASSWORD_CHANGED: 'PASSWORD_CHANGED',
    LOGIN_NEW_DEVICE: 'LOGIN_NEW_DEVICE',
    SYSTEM: 'SYSTEM'
};
exports.NotificationChannel = {
    IN_APP: 'IN_APP',
    EMAIL: 'EMAIL',
    SMS: 'SMS',
    PUSH: 'PUSH'
};
exports.EmailType = {
    EMAIL_VERIFICATION: 'EMAIL_VERIFICATION',
    PASSWORD_RESET: 'PASSWORD_RESET',
    WELCOME: 'WELCOME',
    INVOICE: 'INVOICE',
    LOW_STOCK_ALERT: 'LOW_STOCK_ALERT',
    DAILY_REPORT: 'DAILY_REPORT',
    PAYMENT_REMINDER: 'PAYMENT_REMINDER'
};
exports.EmailStatus = {
    PENDING: 'PENDING',
    SENT: 'SENT',
    FAILED: 'FAILED',
    BOUNCED: 'BOUNCED'
};
exports.AuditAction = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    LOGIN_FAILED: 'LOGIN_FAILED',
    PASSWORD_CHANGE: 'PASSWORD_CHANGE',
    PASSWORD_RESET: 'PASSWORD_RESET',
    EMAIL_VERIFY: 'EMAIL_VERIFY',
    ROLE_CHANGE: 'ROLE_CHANGE',
    SALE_CREATE: 'SALE_CREATE',
    SALE_CANCEL: 'SALE_CANCEL',
    SALE_RETURN: 'SALE_RETURN',
    STOCK_ADJUST: 'STOCK_ADJUST',
    SETTINGS_UPDATE: 'SETTINGS_UPDATE'
};
//# sourceMappingURL=enums.js.map