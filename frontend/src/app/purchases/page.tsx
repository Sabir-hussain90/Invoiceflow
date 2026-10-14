'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface Supplier {
  id: string;
  name: string;
  companyName?: string;
  phone?: string;
  totalOwed: string | number;
}

interface Product {
  id: string;
  name: string;
  sku?: string;
  unit: string;
  costPrice: string | number;
  stockQty: string | number;
}

interface PurchaseItem {
  productId: string;
  productName: string;
  unit: string;
  quantity: number;
  unitCost: number;
  discountAmount: number;
  lineTotal: number;
  available: number;
}

interface Purchase {
  id: string;
  purchaseNumber: string;
  supplierId: string;
  supplier: { id: string; name: string; phone?: string };
  purchasedBy?: { id: string; fullName: string };
  status: string;
  subtotal: string | number;
  discountAmount: string | number;
  taxAmount: string | number;
  totalAmount: string | number;
  amountPaid: string | number;
  amountDue: string | number;
  paymentMethod: string;
  purchaseDate: string;
  _count?: { items: number };
}

export default function PurchasesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  // Filters
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [filterSupplier, setFilterSupplier] = useState('');
  const [search, setSearch] = useState('');

  // New purchase form
  const [selectedSupplierId, setSelectedSupplierId] = useState('');
  const [items, setItems] = useState<PurchaseItem[]>([]);
  const [discountAmount, setDiscountAmount] = useState('');
  const [taxAmount, setTaxAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [amountPaid, setAmountPaid] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Product picker
  const [productSearch, setProductSearch] = useState('');

  // Auth
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');
    if (!token) {
      router.push('/login');
      return;
    }
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {}
    }
  }, [router]);

  const loadData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const params = new URLSearchParams();
      if (filterFrom) params.set('from', filterFrom);
      if (filterTo) params.set('to', filterTo);
      if (filterSupplier) params.set('supplierId', filterSupplier);
      if (search) params.set('purchaseNumber', search);

      const [pRes, sRes, prodRes] = await Promise.all([
        fetch(
          `${API}/purchases${params.toString() ? `?${params}` : ''}`,
          { headers: { Authorization: `Bearer ${token}` } }
        ),
        fetch(`${API}/suppliers`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API}/products?activeOnly=true`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (pRes.ok) setPurchases(await pRes.json());
      if (sRes.ok) setSuppliers(await sRes.json());
      if (prodRes.ok) setProducts(await prodRes.json());
      if (pRes.status === 401) router.push('/login');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtered products for the picker
  const filteredProducts = useMemo(() => {
    if (!productSearch.trim()) return products;
    const s = productSearch.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.sku?.toLowerCase().includes(s)
    );
  }, [products, productSearch]);

  // Add product to purchase items
  const addProductToPurchase = (product: Product) => {
    const existing = items.find((i) => i.productId === product.id);
    if (existing) {
      setItems(
        items.map((i) =>
          i.productId === product.id
            ? {
                ...i,
                quantity: i.quantity + 1,
                lineTotal:
                  (i.quantity + 1) * i.unitCost - i.discountAmount,
              }
            : i
        )
      );
    } else {
      setItems([
        ...items,
        {
          productId: product.id,
          productName: product.name,
          unit: product.unit,
          quantity: 1,
          unitCost: Number(product.costPrice),
          discountAmount: 0,
          lineTotal: Number(product.costPrice),
          available: Number(product.stockQty),
        },
      ]);
    }
    setProductSearch('');
  };

  const updateItem = (
    productId: string,
    field: 'quantity' | 'unitCost' | 'discountAmount',
    value: number
  ) => {
    setItems(
      items.map((i) => {
        if (i.productId !== productId) return i;
        const updated = { ...i, [field]: value };
        updated.lineTotal =
          updated.quantity * updated.unitCost - (updated.discountAmount || 0);
        return updated;
      })
    );
  };

  const removeItem = (productId: string) => {
    setItems(items.filter((i) => i.productId !== productId));
  };

  // Calculations
  const subtotal = items.reduce(
    (sum, i) => sum + i.quantity * i.unitCost,
    0
  );
  const itemDiscounts = items.reduce(
    (sum, i) => sum + (i.discountAmount || 0),
    0
  );
  const flatDiscount = Number(discountAmount) || 0;
  const tax = Number(taxAmount) || 0;
  const totalDiscount = itemDiscounts + flatDiscount;
  const total = Math.max(0, subtotal - totalDiscount + tax);
  const paid = Number(amountPaid) || 0;
  const due = Math.max(0, total - paid);

  const resetForm = () => {
    setSelectedSupplierId('');
    setItems([]);
    setDiscountAmount('');
    setTaxAmount('');
    setPaymentMethod('CASH');
    setAmountPaid('');
    setNotes('');
    setProductSearch('');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedSupplierId) {
      setError('Please select a supplier');
      return;
    }

    if (items.length === 0) {
      setError('Add at least one product');
      return;
    }

    if (paid > total) {
      setError('Amount paid cannot exceed total');
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem('accessToken');
      const payload = {
        supplierId: selectedSupplierId,
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          unitCost: i.unitCost,
          discountAmount: i.discountAmount || undefined,
        })),
        discountAmount: flatDiscount || undefined,
        taxAmount: tax || undefined,
        paymentMethod,
        amountPaid: paid,
        notes: notes || undefined,
      };

      const res = await fetch(`${API}/purchases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Purchase failed');
        setSubmitting(false);
        return;
      }

      alert(`Purchase recorded! Number: ${data.purchaseNumber}`);
      resetForm();
      setShowForm(false);
      loadData();
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async (purchase: Purchase) => {
    const reason = prompt(
      `Cancel purchase ${purchase.purchaseNumber}? Reason:`
    );
    if (reason === null) return;

    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/purchases/${purchase.id}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason: reason || undefined }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Cancel failed');
        return;
      }

      alert('Purchase cancelled — stock and supplier balance reversed');
      loadData();
    } catch (err) {
      alert('Network error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.push('/');
  };

  const clearFilters = () => {
    setFilterFrom('');
    setFilterTo('');
    setFilterSupplier('');
    setSearch('');
    setTimeout(loadData, 0);
  };

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/products', label: 'Products' },
    { href: '/categories', label: 'Categories' },
    { href: '/pos', label: 'POS' },
    { href: '/sales', label: 'Sales' },
    { href: '/invoices', label: 'Invoices' },
    { href: '/customers', label: 'Customers' },
    { href: '/suppliers', label: 'Suppliers' },
    { href: '/purchases', label: 'Purchases', active: true },
    { href: '/expenses', label: 'Expenses' },
    { href: '/reports', label: 'Reports' },
    { href: '/settings', label: 'Settings' },
  ];

  const totalPurchasesValue = purchases.reduce(
    (sum, p) => sum + Number(p.totalAmount),
    0
  );
  const totalDue = purchases.reduce(
    (sum, p) => sum + Number(p.amountDue),
    0
  );

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      RECEIVED: 'bg-green-50 text-green-700',
      PENDING: 'bg-yellow-50 text-yellow-700',
      PARTIALLY_RETURNED: 'bg-orange-50 text-orange-700',
      RETURNED: 'bg-red-50 text-red-700',
      CANCELLED: 'bg-gray-100 text-gray-700',
    };
    const labels: Record<string, string> = {
      RECEIVED: 'Received',
      PENDING: 'Pending',
      PARTIALLY_RETURNED: 'Partial Return',
      RETURNED: 'Returned',
      CANCELLED: 'Cancelled',
    };
    return (
      <span
        className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
          styles[status] || 'bg-gray-100 text-gray-700'
        }`}
      >
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                IF
              </div>
              <span className="text-lg font-bold text-gray-900 hidden sm:inline">
                InvoiceFlow
              </span>
            </Link>

            <div className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    item.active
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {user && (
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    {user.fullName}
                  </div>
                  <div className="text-xs text-gray-500">{user.role}</div>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="hidden sm:inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold py-2 px-4 rounded-lg"
              >
                Logout
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="xl:hidden p-2 rounded-lg hover:bg-gray-100"
                aria-label="Menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      menuOpen
                        ? 'M6 18L18 6M6 6l12 12'
                        : 'M4 6h16M4 12h16M4 18h16'
                    }
                  />
                </svg>
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="xl:hidden pb-4 grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium text-center ${
                    item.active
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-50 text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="col-span-2 bg-red-50 text-red-700 py-2 rounded-lg text-sm font-semibold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Purchases</h1>
            <p className="text-gray-600 text-sm mt-1">
              Record stock purchased from suppliers
            </p>
          </div>
          <button
            onClick={() => {
              if (showForm) {
                resetForm();
                setShowForm(false);
              } else {
                resetForm();
                setShowForm(true);
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            {showForm ? 'Cancel' : '+ New Purchase'}
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
              Total Purchases
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {purchases.length}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
              Total Value
            </div>
            <div className="text-2xl font-bold text-blue-600">
              Rs. {totalPurchasesValue.toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
              Payable to Suppliers
            </div>
            <div className="text-2xl font-bold text-red-600">
              Rs. {totalDue.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Search purchase number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && loadData()}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={filterSupplier}
              onChange={(e) => setFilterSupplier(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Suppliers</option>
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={filterFrom}
              onChange={(e) => setFilterFrom(e.target.value)}
              placeholder="From"
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={filterTo}
              onChange={(e) => setFilterTo(e.target.value)}
              placeholder="To"
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={loadData}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg"
            >
              Apply Filters
            </button>
            {(search || filterSupplier || filterFrom || filterTo) && (
              <button
                onClick={clearFilters}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold py-2 px-4 rounded-lg"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* NEW PURCHASE FORM */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl border border-gray-100 p-6 mb-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              New Purchase
            </h3>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}

            {/* Supplier */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier *
              </label>
              <select
                required
                value={selectedSupplierId}
                onChange={(e) => setSelectedSupplierId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select Supplier --</option>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                    {s.companyName ? ` (${s.companyName})` : ''}
                  </option>
                ))}
              </select>
              {suppliers.length === 0 && (
                <p className="text-xs text-orange-600 mt-1">
                  No suppliers yet. Add one first from the Suppliers page.
                </p>
              )}
            </div>

            {/* Product picker */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add Products
              </label>
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products to add..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {productSearch && filteredProducts.length > 0 && (
                <div className="mt-2 max-h-50 overflow-y-auto border border-gray-200 rounded-lg bg-white shadow-sm">
                  {filteredProducts.slice(0, 20).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => addProductToPurchase(p)}
                      className="w-full text-left px-3 py-2 hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium text-sm text-gray-900">
                            {p.name}
                          </div>
                          {p.sku && (
                            <div className="text-xs text-gray-500">
                              SKU: {p.sku}
                            </div>
                          )}
                        </div>
                        <div className="text-right text-xs">
                          <div className="text-gray-500">
                            Cost: Rs. {Number(p.costPrice).toFixed(2)}
                          </div>
                          <div className="text-gray-400">
                            Stock: {Number(p.stockQty)} {p.unit}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {productSearch && filteredProducts.length === 0 && (
                <div className="mt-2 text-sm text-gray-500 p-3 text-center">
                  No products match your search
                </div>
              )}
            </div>

            {/* Cart items */}
            {items.length > 0 && (
              <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">
                        Product
                      </th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-gray-600">
                        Qty
                      </th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-gray-600">
                        Unit Cost
                      </th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-gray-600">
                        Discount
                      </th>
                      <th className="text-right px-3 py-2 text-xs font-semibold text-gray-600">
                        Total
                      </th>
                      <th className="px-3 py-2"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {items.map((item) => (
                      <tr key={item.productId}>
                        <td className="px-3 py-2">
                          <div className="font-medium text-sm text-gray-900">
                            {item.productName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.unit}
                          </div>
                        </td>
                        <td className="px-3 py-2 text-right">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateItem(
                                item.productId,
                                'quantity',
                                Number(e.target.value) || 1
                              )
                            }
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-right text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-3 py-2 text-right">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.unitCost}
                            onChange={(e) =>
                              updateItem(
                                item.productId,
                                'unitCost',
                                Number(e.target.value) || 0
                              )
                            }
                            className="w-24 px-2 py-1 border border-gray-300 rounded text-right text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-3 py-2 text-right">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.discountAmount}
                            onChange={(e) =>
                              updateItem(
                                item.productId,
                                'discountAmount',
                                Number(e.target.value) || 0
                              )
                            }
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-right text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-3 py-2 text-right font-semibold text-sm text-gray-900">
                          Rs. {item.lineTotal.toFixed(2)}
                        </td>
                        <td className="px-3 py-2 text-right">
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            className="text-red-600 hover:text-red-800 text-lg leading-none"
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {items.length === 0 && (
              <div className="mb-6 p-8 text-center border-2 border-dashed border-gray-200 rounded-lg">
                <div className="text-4xl mb-2">📦</div>
                <p className="text-gray-500 text-sm">
                  Search and add products above to start this purchase
                </p>
              </div>
            )}

            {/* Totals + Payment */}
            {items.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Method
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="CASH">Cash</option>
                      <option value="BANK_TRANSFER">Bank Transfer</option>
                      <option value="DIGITAL_WALLET">Digital Wallet</option>
                      <option value="CARD">Card</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount Paid (Rs.)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={amountPaid}
                      onChange={(e) => setAmountPaid(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Leave 0 if fully on credit (payable later)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Extra Discount (Rs.)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={discountAmount}
                        onChange={(e) => setDiscountAmount(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Tax (Rs.)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={taxAmount}
                        onChange={(e) => setTaxAmount(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                      />
                    </div>

                    <div className="border-t border-gray-200 pt-3 space-y-1.5 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>Rs. {subtotal.toFixed(2)}</span>
                      </div>
                      {totalDiscount > 0 && (
                        <div className="flex justify-between text-red-600">
                          <span>Discount</span>
                          <span>−Rs. {totalDiscount.toFixed(2)}</span>
                        </div>
                      )}
                      {tax > 0 && (
                        <div className="flex justify-between text-gray-600">
                          <span>Tax</span>
                          <span>Rs. {tax.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-lg text-gray-900 border-t border-gray-200 pt-2">
                        <span>Total</span>
                        <span>Rs. {total.toFixed(2)}</span>
                      </div>
                      {due > 0 && (
                        <div className="flex justify-between text-orange-600 font-semibold">
                          <span>Payable Later</span>
                          <span>Rs. {due.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {items.length > 0 && (
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-6 rounded-lg"
                >
                  {submitting ? 'Recording purchase...' : `Save Purchase — Rs. ${total.toFixed(2)}`}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2.5 px-6 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        )}

        {/* Purchases List */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">
              Loading purchases...
            </div>
          ) : purchases.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No purchases yet
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Record stock purchases from your suppliers here
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
              >
                + New Purchase
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Purchase #
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Supplier
                    </th>
                    <th className="text-center px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Paid
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Due
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {purchases.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-mono font-semibold text-gray-900">
                          {p.purchaseNumber}
                        </div>
                        <div className="text-xs text-gray-500">
                          {p._count?.items || 0} items
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(p.purchaseDate).toLocaleDateString('en-PK', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {p.supplier?.name}
                        {p.supplier?.phone && (
                          <div className="text-xs text-gray-500">
                            {p.supplier.phone}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {getStatusBadge(p.status)}
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-gray-900">
                        Rs. {Number(p.totalAmount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-green-600">
                        Rs. {Number(p.amountPaid).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right text-sm">
                        <span
                          className={
                            Number(p.amountDue) > 0
                              ? 'text-red-600 font-semibold'
                              : 'text-gray-500'
                          }
                        >
                          Rs. {Number(p.amountDue).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {p.status !== 'CANCELLED' && (
                          <button
                            onClick={() => handleCancel(p)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {!loading && purchases.length > 0 && (
          <div className="mt-6 text-sm text-gray-600">
            Showing {purchases.length} purchase
            {purchases.length === 1 ? '' : 's'} · Total:{' '}
            <span className="font-semibold text-gray-900">
              Rs. {totalPurchasesValue.toLocaleString()}
            </span>
          </div>
        )}
      </main>
    </div>
  );
}