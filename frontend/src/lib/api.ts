import axios from 'axios';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach auth token to every request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle 401 — redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// ==================================================
// AUTH
// ==================================================
export const authApi = {
  register: (data: {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    shopName?: string;
  }) => api.post('/auth/register', data),

  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),

  logout: () => api.post('/auth/logout'),

  me: () => api.get('/auth/me'),

  verifyEmail: (token: string) =>
    api.get(`/auth/verify-email?token=${token}`),

  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),

  refresh: (refreshToken: string) =>
    api.post('/auth/refresh', { refreshToken }),
};

// ==================================================
// SHOPS
// ==================================================
export const shopsApi = {
  getMine: () => api.get('/shops/me'),
  getStats: () => api.get('/shops/me/stats'),
  update: (id: string, data: any) => api.patch(`/shops/${id}`, data),
};

// ==================================================
// USERS
// ==================================================
export const usersApi = {
  list: () => api.get('/users'),
  get: (id: string) => api.get(`/users/${id}`),
  create: (data: any) => api.post('/users', data),
  update: (id: string, data: any) => api.patch(`/users/${id}`, data),
  remove: (id: string) => api.delete(`/users/${id}`),
  changePassword: (data: {
    currentPassword: string;
    newPassword: string;
  }) => api.post('/users/change-password', data),
};

// ==================================================
// CATEGORIES
// ==================================================
export const categoriesApi = {
  list: (search?: string) => api.get('/categories', { params: { search } }),
  get: (id: string) => api.get(`/categories/${id}`),
  create: (data: { name: string; description?: string }) =>
    api.post('/categories', data),
  update: (id: string, data: any) => api.patch(`/categories/${id}`, data),
  remove: (id: string) => api.delete(`/categories/${id}`),
};

// ==================================================
// PRODUCTS
// ==================================================
export const productsApi = {
  list: (params?: {
    search?: string;
    categoryId?: string;
    lowStock?: string;
    activeOnly?: string;
  }) => api.get('/products', { params }),

  lowStock: () => api.get('/products/low-stock'),

  byBarcode: (barcode: string) =>
    api.get(`/products/barcode/${barcode}`),

  get: (id: string) => api.get(`/products/${id}`),

  movements: (id: string) => api.get(`/products/${id}/movements`),

  create: (data: any) => api.post('/products', data),

  update: (id: string, data: any) => api.patch(`/products/${id}`, data),

  adjustStock: (
    id: string,
    data: { quantity: number; reason: string }
  ) => api.post(`/products/${id}/adjust-stock`, data),

  remove: (id: string) => api.delete(`/products/${id}`),
};

// ==================================================
// SALES
// ==================================================
export const salesApi = {
  create: (data: {
    items: Array<{
      productId: string;
      quantity: number;
      discountAmount?: number;
    }>;
    discountAmount?: number;
    discountPercent?: number;
    customerId?: string;
    notes?: string;
    paymentMethod: string;
    amountReceived: number;
  }) => api.post('/sales', data),

  list: (params?: {
    from?: string;
    to?: string;
    customerId?: string;
    cashierId?: string;
    paymentStatus?: string;
    invoiceNumber?: string;
    status?: string;
    limit?: string;
  }) => api.get('/sales', { params }),

  get: (id: string) => api.get(`/sales/${id}`),

  todaySummary: () => api.get('/sales/today-summary'),

  cancel: (id: string, reason?: string) =>
    api.post(`/sales/${id}/cancel`, { reason }),
};

// ==================================================
// INVOICES
// ==================================================
export const invoicesApi = {
  list: (limit?: number) => api.get('/invoices', { params: { limit } }),

  getMeta: (saleId: string) => api.get(`/invoices/${saleId}/meta`),

  // Downloads PDF as a file
  downloadPdf: async (saleId: string, invoiceNumber?: string) => {
    const response = await api.get(`/invoices/${saleId}/pdf`, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = invoiceNumber
      ? `invoice-${invoiceNumber}.pdf`
      : `invoice-${saleId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },

  // Opens PDF preview in a new tab
  previewPdf: async (saleId: string) => {
    const response = await api.get(`/invoices/${saleId}/preview`, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => window.URL.revokeObjectURL(url), 60000);
  },
};

// ==================================================
// CUSTOMERS
// ==================================================
export const customersApi = {
  list: (params?: { search?: string; withBalance?: string }) =>
    api.get('/customers', { params }),

  outstanding: () => api.get('/customers/outstanding'),

  top: (limit?: number) =>
    api.get('/customers/top', { params: { limit } }),

  get: (id: string) => api.get(`/customers/${id}`),

  create: (data: any) => api.post('/customers', data),

  update: (id: string, data: any) => api.patch(`/customers/${id}`, data),

  recordPayment: (
    id: string,
    data: {
      amount: number;
      method: string;
      reference?: string;
      notes?: string;
    }
  ) => api.post(`/customers/${id}/payment`, data),

  remove: (id: string) => api.delete(`/customers/${id}`),
};

// ==================================================
// SUPPLIERS
// ==================================================
export const suppliersApi = {
  list: (params?: { search?: string; withBalance?: string }) =>
    api.get('/suppliers', { params }),

  outstanding: () => api.get('/suppliers/outstanding'),

  get: (id: string) => api.get(`/suppliers/${id}`),

  create: (data: any) => api.post('/suppliers', data),

  update: (id: string, data: any) => api.patch(`/suppliers/${id}`, data),

  recordPayment: (
    id: string,
    data: {
      amount: number;
      method: string;
      reference?: string;
      notes?: string;
    }
  ) => api.post(`/suppliers/${id}/payment`, data),

  remove: (id: string) => api.delete(`/suppliers/${id}`),
};

// ==================================================
// PURCHASES
// ==================================================
export const purchasesApi = {
  create: (data: {
    supplierId: string;
    items: Array<{
      productId: string;
      quantity: number;
      unitCost: number;
      discountAmount?: number;
    }>;
    discountAmount?: number;
    taxAmount?: number;
    paymentMethod: string;
    amountPaid: number;
    notes?: string;
  }) => api.post('/purchases', data),

  list: (params?: {
    from?: string;
    to?: string;
    supplierId?: string;
    status?: string;
    purchaseNumber?: string;
    limit?: string;
  }) => api.get('/purchases', { params }),

  todaySummary: () => api.get('/purchases/today-summary'),

  get: (id: string) => api.get(`/purchases/${id}`),

  cancel: (id: string, reason?: string) =>
    api.post(`/purchases/${id}/cancel`, { reason }),
};

// ==================================================
// EXPENSES
// ==================================================
export const expensesApi = {
  list: (params?: {
    from?: string;
    to?: string;
    category?: string;
    search?: string;
    limit?: string;
  }) => api.get('/expenses', { params }),

  todaySummary: () => api.get('/expenses/today-summary'),

  monthSummary: (year: number, month: number) =>
    api.get('/expenses/month-summary', { params: { year, month } }),

  byCategory: (params?: { from?: string; to?: string }) =>
    api.get('/expenses/by-category', { params }),

  recent: (limit?: number) =>
    api.get('/expenses/recent', { params: { limit } }),

  get: (id: string) => api.get(`/expenses/${id}`),

  create: (data: {
    category: string;
    title: string;
    description?: string;
    amount: number;
    paymentMethod?: string;
    expenseDate?: string;
    receiptUrl?: string;
    notes?: string;
  }) => api.post('/expenses', data),

  update: (id: string, data: any) => api.patch(`/expenses/${id}`, data),

  remove: (id: string) => api.delete(`/expenses/${id}`),
};

// ==================================================
// REPORTS
// ==================================================
export const reportsApi = {
  dashboard: () => api.get('/reports/dashboard'),

  dailySales: (params?: { from?: string; to?: string }) =>
    api.get('/reports/daily-sales', { params }),

  profit: (params?: { from?: string; to?: string }) =>
    api.get('/reports/profit', { params }),

  topProducts: (params?: {
    from?: string;
    to?: string;
    limit?: number;
  }) => api.get('/reports/top-products', { params }),

  topCustomers: (params?: {
    from?: string;
    to?: string;
    limit?: number;
  }) => api.get('/reports/top-customers', { params }),

  stockValue: () => api.get('/reports/stock-value'),

  cashierPerformance: (params?: { from?: string; to?: string }) =>
    api.get('/reports/cashier-performance', { params }),

  paymentBreakdown: (params?: { from?: string; to?: string }) =>
    api.get('/reports/payment-breakdown', { params }),

  lowStock: () => api.get('/reports/low-stock'),

  receivables: () => api.get('/reports/receivables'),

  payables: () => api.get('/reports/payables'),

  categorySales: (params?: { from?: string; to?: string }) =>
    api.get('/reports/category-sales', { params }),
};