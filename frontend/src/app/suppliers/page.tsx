'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface Supplier {
  id: string;
  name: string;
  companyName?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  ntnNumber?: string;
  notes?: string;
  totalOwed: string | number;
  totalPaid: string | number;
  isActive: boolean;
  _count?: { purchases: number };
}

export default function SuppliersPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showBalanceOnly, setShowBalanceOnly] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState<Supplier | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    ntnNumber: '',
    notes: '',
  });

  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    method: 'CASH',
    reference: '',
    notes: '',
  });

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

  const loadSuppliers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (showBalanceOnly) params.set('withBalance', 'true');

      const url = `${API}/suppliers${params.toString() ? `?${params}` : ''}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setSuppliers(await res.json());
      } else if (res.status === 401) {
        router.push('/login');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showBalanceOnly]);

  const handleSearch = () => {
    loadSuppliers();
  };

  const resetForm = () => {
    setForm({
      name: '',
      companyName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      ntnNumber: '',
      notes: '',
    });
    setEditingId(null);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) {
      setError('Supplier name is required');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const method = editingId ? 'PATCH' : 'POST';
      const url = editingId
        ? `${API}/suppliers/${editingId}`
        : `${API}/suppliers`;

      const payload = {
        name: form.name.trim(),
        companyName: form.companyName || undefined,
        phone: form.phone || undefined,
        email: form.email || undefined,
        address: form.address || undefined,
        city: form.city || undefined,
        ntnNumber: form.ntnNumber || undefined,
        notes: form.notes || undefined,
      };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to save supplier');
        return;
      }

      resetForm();
      setShowForm(false);
      loadSuppliers();
    } catch (err: any) {
      setError(err.message || 'Network error');
    }
  };

  const handleEdit = (s: Supplier) => {
    setForm({
      name: s.name,
      companyName: s.companyName || '',
      phone: s.phone || '',
      email: s.email || '',
      address: s.address || '',
      city: s.city || '',
      ntnNumber: s.ntnNumber || '',
      notes: s.notes || '',
    });
    setEditingId(s.id);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (s: Supplier) => {
    if (Number(s.totalOwed) > 0) {
      alert(
        `Cannot delete: you still owe Rs. ${Number(s.totalOwed).toFixed(2)} to this supplier`
      );
      return;
    }
    if (!confirm(`Delete supplier "${s.name}"?`)) return;

    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/suppliers/${s.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Failed to delete');
        return;
      }

      loadSuppliers();
    } catch (err) {
      alert('Network error');
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showPayment) return;

    const amount = Number(paymentForm.amount);
    const owed = Number(showPayment.totalOwed);

    if (!amount || amount <= 0) {
      alert('Amount must be greater than zero');
      return;
    }

    if (amount > owed) {
      alert(`Amount exceeds balance (Rs. ${owed.toFixed(2)})`);
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/suppliers/${showPayment.id}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          method: paymentForm.method,
          reference: paymentForm.reference || undefined,
          notes: paymentForm.notes || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Payment failed');
        return;
      }

      alert(
        `Payment recorded! New balance: Rs. ${Number(data.newBalance).toFixed(2)}`
      );
      setShowPayment(null);
      setPaymentForm({
        amount: '',
        method: 'CASH',
        reference: '',
        notes: '',
      });
      loadSuppliers();
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

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/products', label: 'Products' },
    { href: '/categories', label: 'Categories' },
    { href: '/pos', label: 'POS' },
    { href: '/sales', label: 'Sales' },
    { href: '/invoices', label: 'Invoices' },
    { href: '/customers', label: 'Customers' },
    { href: '/suppliers', label: 'Suppliers', active: true },
    { href: '/purchases', label: 'Purchases' },
    { href: '/expenses', label: 'Expenses' },
    { href: '/reports', label: 'Reports' },
    { href: '/settings', label: 'Settings' },
  ];

  const totalPayable = suppliers.reduce(
    (sum, s) => sum + Number(s.totalOwed),
    0
  );

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
            <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
            <p className="text-gray-600 text-sm mt-1">
              Manage suppliers and track payables
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
            {showForm ? 'Cancel' : '+ Add Supplier'}
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
              Total Suppliers
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {suppliers.length}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
              Total Payable
            </div>
            <div className="text-2xl font-bold text-red-600">
              Rs. {totalPayable.toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
              With Balance
            </div>
            <div className="text-2xl font-bold text-orange-600">
              {suppliers.filter((s) => Number(s.totalOwed) > 0).length}
            </div>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="mb-6 flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search by name, company, phone, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 min-w-50 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg"
          >
            Search
          </button>
          <button
            onClick={() => setShowBalanceOnly(!showBalanceOnly)}
            className={`font-semibold py-2 px-4 rounded-lg transition-colors ${
              showBalanceOnly
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            {showBalanceOnly ? '✓ ' : ''}With Balance Only
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl border border-gray-100 p-6 mb-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {editingId ? 'Edit Supplier' : 'Add New Supplier'}
            </h3>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supplier Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ahmed Traders"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) =>
                    setForm({ ...form, companyName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ahmed Traders Pvt Ltd"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="03211234567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ahmed@traders.pk"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Akbari Mandi, Lahore"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) =>
                    setForm({ ...form, city: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Lahore"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  NTN Number
                </label>
                <input
                  type="text"
                  value={form.ntnNumber}
                  onChange={(e) =>
                    setForm({ ...form, ntnNumber: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1234567-8"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) =>
                    setForm({ ...form, notes: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Optional notes about this supplier"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
              >
                {editingId ? 'Update Supplier' : 'Save Supplier'}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* List */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">
              Loading suppliers...
            </div>
          ) : suppliers.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-5xl mb-4">🏭</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No suppliers yet
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {search
                  ? 'No suppliers match your search.'
                  : 'Add your first supplier to start recording purchases.'}
              </p>
              {!search && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
                >
                  + Add Your First Supplier
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Supplier
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total Paid
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Payable
                    </th>
                    <th className="text-center px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Purchases
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {suppliers.map((s) => {
                    const owed = Number(s.totalOwed);
                    const paid = Number(s.totalPaid);

                    return (
                      <tr key={s.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {s.name}
                          </div>
                          {s.companyName && (
                            <div className="text-xs text-gray-500 mt-0.5">
                              {s.companyName}
                            </div>
                          )}
                          {s.city && (
                            <div className="text-xs text-gray-400">
                              {s.city}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {s.phone && <div>{s.phone}</div>}
                          {s.email && (
                            <div className="text-xs text-gray-500">
                              {s.email}
                            </div>
                          )}
                          {!s.phone && !s.email && (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-green-600">
                          Rs. {paid.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span
                            className={`font-semibold ${
                              owed > 0 ? 'text-red-600' : 'text-gray-400'
                            }`}
                          >
                            Rs. {owed.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                            {s._count?.purchases || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            {owed > 0 && (
                              <button
                                onClick={() => setShowPayment(s)}
                                className="text-green-600 hover:text-green-800 text-sm font-medium"
                              >
                                Pay
                              </button>
                            )}
                            <button
                              onClick={() => handleEdit(s)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(s)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {!loading && suppliers.length > 0 && (
          <div className="mt-6 text-sm text-gray-600">
            Showing {suppliers.length} supplier
            {suppliers.length === 1 ? '' : 's'}
            {search && ` matching "${search}"`} · Total payable:{' '}
            <span className="font-semibold text-gray-900">
              Rs. {totalPayable.toLocaleString()}
            </span>
          </div>
        )}
      </main>

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setShowPayment(null)}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Record Payment to Supplier
                </h3>
                <button
                  onClick={() => setShowPayment(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="bg-red-50 rounded-lg p-4 mb-4">
                <div className="text-xs text-red-600 font-semibold uppercase">
                  Outstanding Payable
                </div>
                <div className="text-2xl font-bold text-red-700">
                  Rs. {Number(showPayment.totalOwed).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {showPayment.name}
                </div>
              </div>

              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (Rs.) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0.01"
                    step="0.01"
                    value={paymentForm.amount}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        amount: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <select
                    value={paymentForm.method}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        method: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    Reference (optional)
                  </label>
                  <input
                    type="text"
                    value={paymentForm.reference}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        reference: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., HBL-20261012-001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (optional)
                  </label>
                  <input
                    type="text"
                    value={paymentForm.notes}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        notes: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Optional"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg"
                  >
                    Record Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPayment(null)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}