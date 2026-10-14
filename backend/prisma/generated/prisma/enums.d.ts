export declare const UserRole: {
    readonly OWNER: "OWNER";
    readonly CASHIER: "CASHIER";
    readonly STOCK_MANAGER: "STOCK_MANAGER";
    readonly ADMIN: "ADMIN";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
    readonly SUSPENDED: "SUSPENDED";
    readonly PENDING_VERIFICATION: "PENDING_VERIFICATION";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const PaymentMethod: {
    readonly CASH: "CASH";
    readonly BANK_TRANSFER: "BANK_TRANSFER";
    readonly DIGITAL_WALLET: "DIGITAL_WALLET";
    readonly CARD: "CARD";
    readonly CREDIT: "CREDIT";
    readonly SPLIT: "SPLIT";
    readonly OTHER: "OTHER";
};
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
export declare const PaymentStatus: {
    readonly PAID: "PAID";
    readonly PARTIALLY_PAID: "PARTIALLY_PAID";
    readonly UNPAID: "UNPAID";
    readonly REFUNDED: "REFUNDED";
    readonly PARTIALLY_REFUNDED: "PARTIALLY_REFUNDED";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const SaleStatus: {
    readonly COMPLETED: "COMPLETED";
    readonly RETURNED: "RETURNED";
    readonly PARTIALLY_RETURNED: "PARTIALLY_RETURNED";
    readonly CANCELLED: "CANCELLED";
    readonly DRAFT: "DRAFT";
};
export type SaleStatus = (typeof SaleStatus)[keyof typeof SaleStatus];
export declare const PurchaseStatus: {
    readonly RECEIVED: "RECEIVED";
    readonly PENDING: "PENDING";
    readonly PARTIALLY_RETURNED: "PARTIALLY_RETURNED";
    readonly RETURNED: "RETURNED";
    readonly CANCELLED: "CANCELLED";
};
export type PurchaseStatus = (typeof PurchaseStatus)[keyof typeof PurchaseStatus];
export declare const StockMovementType: {
    readonly OPENING_STOCK: "OPENING_STOCK";
    readonly PURCHASE: "PURCHASE";
    readonly SALE: "SALE";
    readonly RETURN_IN: "RETURN_IN";
    readonly RETURN_OUT: "RETURN_OUT";
    readonly DAMAGE: "DAMAGE";
    readonly EXPIRY: "EXPIRY";
    readonly ADJUSTMENT_IN: "ADJUSTMENT_IN";
    readonly ADJUSTMENT_OUT: "ADJUSTMENT_OUT";
    readonly TRANSFER_IN: "TRANSFER_IN";
    readonly TRANSFER_OUT: "TRANSFER_OUT";
};
export type StockMovementType = (typeof StockMovementType)[keyof typeof StockMovementType];
export declare const ExpenseCategory: {
    readonly ELECTRICITY: "ELECTRICITY";
    readonly RENT: "RENT";
    readonly WAGES: "WAGES";
    readonly TRANSPORT: "TRANSPORT";
    readonly PACKAGING: "PACKAGING";
    readonly REPAIRS: "REPAIRS";
    readonly INTERNET: "INTERNET";
    readonly WATER: "WATER";
    readonly GAS: "GAS";
    readonly OFFICE: "OFFICE";
    readonly MARKETING: "MARKETING";
    readonly OTHER: "OTHER";
};
export type ExpenseCategory = (typeof ExpenseCategory)[keyof typeof ExpenseCategory];
export declare const NotificationType: {
    readonly LOW_STOCK: "LOW_STOCK";
    readonly OUT_OF_STOCK: "OUT_OF_STOCK";
    readonly PAYMENT_DUE: "PAYMENT_DUE";
    readonly NEW_SALE: "NEW_SALE";
    readonly NEW_PURCHASE: "NEW_PURCHASE";
    readonly NEW_CUSTOMER: "NEW_CUSTOMER";
    readonly RETURN_REQUEST: "RETURN_REQUEST";
    readonly PASSWORD_CHANGED: "PASSWORD_CHANGED";
    readonly LOGIN_NEW_DEVICE: "LOGIN_NEW_DEVICE";
    readonly SYSTEM: "SYSTEM";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export declare const NotificationChannel: {
    readonly IN_APP: "IN_APP";
    readonly EMAIL: "EMAIL";
    readonly SMS: "SMS";
    readonly PUSH: "PUSH";
};
export type NotificationChannel = (typeof NotificationChannel)[keyof typeof NotificationChannel];
export declare const EmailType: {
    readonly EMAIL_VERIFICATION: "EMAIL_VERIFICATION";
    readonly PASSWORD_RESET: "PASSWORD_RESET";
    readonly WELCOME: "WELCOME";
    readonly INVOICE: "INVOICE";
    readonly LOW_STOCK_ALERT: "LOW_STOCK_ALERT";
    readonly DAILY_REPORT: "DAILY_REPORT";
    readonly PAYMENT_REMINDER: "PAYMENT_REMINDER";
};
export type EmailType = (typeof EmailType)[keyof typeof EmailType];
export declare const EmailStatus: {
    readonly PENDING: "PENDING";
    readonly SENT: "SENT";
    readonly FAILED: "FAILED";
    readonly BOUNCED: "BOUNCED";
};
export type EmailStatus = (typeof EmailStatus)[keyof typeof EmailStatus];
export declare const AuditAction: {
    readonly CREATE: "CREATE";
    readonly UPDATE: "UPDATE";
    readonly DELETE: "DELETE";
    readonly LOGIN: "LOGIN";
    readonly LOGOUT: "LOGOUT";
    readonly LOGIN_FAILED: "LOGIN_FAILED";
    readonly PASSWORD_CHANGE: "PASSWORD_CHANGE";
    readonly PASSWORD_RESET: "PASSWORD_RESET";
    readonly EMAIL_VERIFY: "EMAIL_VERIFY";
    readonly ROLE_CHANGE: "ROLE_CHANGE";
    readonly SALE_CREATE: "SALE_CREATE";
    readonly SALE_CANCEL: "SALE_CANCEL";
    readonly SALE_RETURN: "SALE_RETURN";
    readonly STOCK_ADJUST: "STOCK_ADJUST";
    readonly SETTINGS_UPDATE: "SETTINGS_UPDATE";
};
export type AuditAction = (typeof AuditAction)[keyof typeof AuditAction];
