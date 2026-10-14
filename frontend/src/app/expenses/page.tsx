'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// ============================================================
// THEME — Matches Dashboard dark color scheme
// ============================================================
const THEME = {
  pageBg: 'radial-gradient(ellipse at top, #1a1f3a 0%, #0A0E1A 60%)',
  text: '#F8FAFC',
  textMuted: '#94A3B8',
  textDim: '#64748B',
  glass: 'rgba(20, 27, 45, 0.85)',
  glassBorder: 'rgba(124, 58, 237, 0.3)',
  purple: '#7C3AED',
  cyan: '#06B6D4',
  gradient: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
  green: '#10B981',
  red: '#EF4444',
  orange: '#F97316',
  yellow: '#EAB308',
};

const CATEGORIES = [
  'ELECTRICITY',
  'RENT',
  'WAGES',
  'TRANSPORT',
  'PACKAGING',
  'REPAIRS',
  'INTERNET',
  'WATER',
  'GAS',
  'OFFICE',
  'MARKETING',
  'OTHER',
];

const PAYMENT_METHODS = ['CASH', 'BANK_TRANSFER', 'DIGITAL_WALLET', 'CARD', 'OTHER'];

export default function ExpensesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    category: 'OTHER',
    title: '',
    description: '',
    amount: '',
    paymentMethod: 'CASH',
    expenseDate: new Date().toISOString().slice(0, 10),
    notes: '',
  });

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

  const loadExpenses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const params = new URLSearchParams();
      if (filterCategory) params.set('category', filterCategory);
      if (filterFrom) params.set('from', filterFrom);
      if (filterTo) params.set('to', filterTo);
      if (search) params.set('search', search);
      const res = await fetch(
        `${API}/expenses${params.toString() ? `?${params}` : ''}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) setExpenses(await res.json());
      else if (res.status === 401) router.push('/login');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
    // eslint-disable-next-line
  }, []);

  const resetForm = () => {
    setForm({
      category: 'OTHER',
      title: '',
      description: '',
      amount: '',
      paymentMethod: 'CASH',
      expenseDate: new Date().toISOString().slice(0, 10),
      notes: '',
    });
    setEditingId(null);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!form.amount || Number(form.amount) <= 0) {
      setError('Amount must be greater than zero');
      return;
    }
    try {
      const token = localStorage.getItem('accessToken');
      const method = editingId ? 'PATCH' : 'POST';
      const url = editingId ? `${API}/expenses/${editingId}` : `${API}/expenses`;
      const payload = {
        category: form.category,
        title: form.title.trim(),
        description: form.description || undefined,
        amount: Number(form.amount),
        paymentMethod: form.paymentMethod,
        expenseDate: form.expenseDate,
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
        setError(data.message || 'Failed to save expense');
        return;
      }
      resetForm();
      setShowForm(false);
      loadExpenses();
    } catch (err: any) {
      setError(err.message || 'Network error');
    }
  };

  const handleEdit = (ex: any) => {
    setForm({
      category: ex.category,
      title: ex.title,
      description: ex.description || '',
      amount: String(ex.amount),
      paymentMethod: ex.paymentMethod,
      expenseDate: new Date(ex.expenseDate).toISOString().slice(0, 10),
      notes: ex.notes || '',
    });
    setEditingId(ex.id);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (ex: any) => {
    if (!confirm(`Delete expense "${ex.title}"?`)) return;
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/expenses/${ex.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        alert('Failed to delete');
        return;
      }
      loadExpenses();
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
    setFilterCategory('');
    setFilterFrom('');
    setFilterTo('');
    setSearch('');
    setTimeout(loadExpenses, 0);
  };

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/pos', label: 'POS' },
    { href: '/products', label: 'Products' },
    { href: '/sales', label: 'Sales' },
    { href: '/invoices', label: 'Invoices' },
    { href: '/reports', label: 'Reports' },
    { href: '/expenses', label: 'Expenses', active: true },
    { href: '/settings', label: 'Settings' },
  ];

  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const today = new Date().toISOString().slice(0, 10);
  const todayTotal = expenses
    .filter(
      (e) => new Date(e.expenseDate).toISOString().slice(0, 10) === today
    )
    .reduce((sum, e) => sum + Number(e.amount), 0);
  const monthTotal = expenses
    .filter((e) => {
      const d = new Date(e.expenseDate);
      const now = new Date();
      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, e) => sum + Number(e.amount), 0);

  // Shared input style
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.5rem 0.75rem',
    background: 'rgba(10, 14, 26, 0.6)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '0.5rem',
    color: THEME.text,
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'all 0.2s',
    colorScheme: 'dark',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: THEME.textMuted,
    marginBottom: '0.375rem',
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    e.currentTarget.style.borderColor = THEME.purple;
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.2)';
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: THEME.pageBg,
        color: THEME.text,
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      <GlobalStyles />

      {/* ============ NAVBAR ============ */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(10, 14, 26, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${THEME.glassBorder}`,
        }}
      >
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '4rem',
            }}
          >
            <Link
              href="/dashboard"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: '0.5rem',
                  background: THEME.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 20px rgba(124, 58, 237, 0.5)',
                }}
              >
                ◈
              </div>
              <span
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: THEME.text,
                }}
              >
                InvoiceFlow
              </span>
            </Link>

            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              className="nav-desktop"
            >
              {navItems.map((item: any) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    background: item.active
                      ? 'rgba(124, 58, 237, 0.2)'
                      : 'transparent',
                    color: item.active ? '#C4B5FD' : THEME.textMuted,
                    border: item.active
                      ? '1px solid rgba(124, 58, 237, 0.4)'
                      : '1px solid transparent',
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {user && (
                <div style={{ textAlign: 'right' }} className="user-info">
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: THEME.text }}>
                    {user.fullName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: THEME.textDim }}>
                    {user.role}
                  </div>
                </div>
              )}
              <button
                onClick={handleLogout}
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#FCA5A5',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                }}
                className="logout-btn"
              >
                Logout
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  background: 'transparent',
                  border: 'none',
                  color: THEME.text,
                  cursor: 'pointer',
                }}
                className="menu-btn"
                aria-label="Menu"
              >
                <svg
                  width="24"
                  height="24"
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
            <div
              style={{
                paddingBottom: '1rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.5rem',
              }}
              className="mobile-menu"
            >
              {navItems.map((item: any) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textAlign: 'center',
                    textDecoration: 'none',
                    background: item.active
                      ? 'rgba(124, 58, 237, 0.2)'
                      : 'rgba(20, 27, 45, 0.6)',
                    color: item.active ? '#C4B5FD' : THEME.textMuted,
                    border: item.active
                      ? '1px solid rgba(124, 58, 237, 0.4)'
                      : `1px solid ${THEME.glassBorder}`,
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                style={{
                  gridColumn: 'span 2',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#FCA5A5',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <main style={{ maxWidth: '80rem', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* ========== PAGE HEADER ========== */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: THEME.text,
                margin: 0,
              }}
            >
              Expenses
            </h1>
            <p style={{ color: THEME.textMuted, fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Track all your shop&apos;s daily expenses
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
            style={{
              background: showForm ? 'rgba(239, 68, 68, 0.15)' : THEME.gradient,
              border: showForm ? '1px solid rgba(239, 68, 68, 0.4)' : 'none',
              color: showForm ? '#FCA5A5' : '#FFFFFF',
              fontWeight: 600,
              padding: '0.625rem 1.25rem',
              borderRadius: '0.75rem',
              cursor: 'pointer',
              boxShadow: showForm ? 'none' : '0 0 20px rgba(124, 58, 237, 0.4)',
              transition: 'all 0.2s',
            }}
          >
            {showForm ? 'Cancel' : '+ Add Expense'}
          </button>
        </div>

        {/* ========== STATS CARDS ========== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
          className="stats-grid-3"
        >
          <div
            style={{
              background: THEME.glass,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${THEME.glassBorder}`,
              borderRadius: '0.75rem',
              padding: '1.25rem',
            }}
          >
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                color: THEME.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.25rem',
              }}
            >
              Today&apos;s Expenses
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FDBA74' }}>
              Rs. {todayTotal.toLocaleString()}
            </div>
          </div>
          <div
            style={{
              background: THEME.glass,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${THEME.glassBorder}`,
              borderRadius: '0.75rem',
              padding: '1.25rem',
            }}
          >
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                color: THEME.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.25rem',
              }}
            >
              This Month
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#C4B5FD' }}>
              Rs. {monthTotal.toLocaleString()}
            </div>
          </div>
          <div
            style={{
              background: THEME.glass,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${THEME.glassBorder}`,
              borderRadius: '0.75rem',
              padding: '1.25rem',
            }}
          >
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                color: THEME.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.25rem',
              }}
            >
              Total (filtered)
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FCA5A5' }}>
              Rs. {totalExpenses.toLocaleString()}
            </div>
          </div>
        </div>

        {/* ========== FILTERS ========== */}
        <div
          style={{
            background: THEME.glass,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${THEME.glassBorder}`,
            borderRadius: '0.75rem',
            padding: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: '0.75rem',
            }}
            className="filter-grid-5"
          >
            <div className="filter-search">
              <input
                type="text"
                placeholder="Search expenses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && loadExpenses()}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{ ...inputStyle, cursor: 'pointer' }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c.charAt(0) + c.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={filterFrom}
              onChange={(e) => setFilterFrom(e.target.value)}
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <input
              type="date"
              value={filterTo}
              onChange={(e) => setFilterTo(e.target.value)}
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
            <button
              onClick={loadExpenses}
              style={{
                background: THEME.gradient,
                color: '#FFFFFF',
                fontSize: '0.875rem',
                fontWeight: 600,
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)',
              }}
            >
              Apply
            </button>
            <button
              onClick={clearFilters}
              style={{
                background: 'rgba(10, 14, 26, 0.6)',
                color: THEME.textMuted,
                fontSize: '0.875rem',
                fontWeight: 600,
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: `1px solid ${THEME.glassBorder}`,
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* ========== EXPENSE FORM ========== */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            style={{
              background: THEME.glass,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${THEME.glassBorder}`,
              borderRadius: '0.75rem',
              padding: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: 'bold',
                color: THEME.text,
                marginBottom: '1rem',
              }}
            >
              {editingId ? 'Edit Expense' : 'Add New Expense'}
            </h3>

            {error && (
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#FCA5A5',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  marginBottom: '1rem',
                }}
              >
                {error}
              </div>
            )}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(1, 1fr)',
                gap: '1rem',
              }}
              className="form-grid-2"
            >
              <div>
                <label style={labelStyle}>Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  style={inputStyle}
                  placeholder="LESCO Bill October"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              <div>
                <label style={labelStyle}>Amount (Rs.) *</label>
                <input
                  type="number"
                  required
                  min="0.01"
                  step="0.01"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  style={inputStyle}
                  placeholder="0.00"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              <div>
                <label style={labelStyle}>Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c.charAt(0) + c.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Payment Method</label>
                <select
                  value={form.paymentMethod}
                  onChange={(e) =>
                    setForm({ ...form, paymentMethod: e.target.value })
                  }
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  {PAYMENT_METHODS.map((p) => (
                    <option key={p} value={p}>
                      {p.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Date *</label>
                <input
                  type="date"
                  required
                  value={form.expenseDate}
                  onChange={(e) =>
                    setForm({ ...form, expenseDate: e.target.value })
                  }
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              <div className="form-full">
                <label style={labelStyle}>Description</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  style={inputStyle}
                  placeholder="Optional"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              <div className="form-full">
                <label style={labelStyle}>Notes</label>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  placeholder="Optional"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button
                type="submit"
                style={{
                  background: THEME.gradient,
                  color: '#FFFFFF',
                  fontWeight: 600,
                  padding: '0.625rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)',
                }}
              >
                {editingId ? 'Update' : 'Save Expense'}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                style={{
                  background: 'rgba(10, 14, 26, 0.6)',
                  color: THEME.textMuted,
                  fontWeight: 600,
                  padding: '0.625rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: `1px solid ${THEME.glassBorder}`,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* ========== EXPENSES TABLE ========== */}
        <div
          style={{
            background: THEME.glass,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${THEME.glassBorder}`,
            borderRadius: '0.75rem',
            overflow: 'hidden',
          }}
        >
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: THEME.textMuted }}>
              Loading expenses...
            </div>
          ) : expenses.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: THEME.text,
                  marginBottom: '0.5rem',
                }}
              >
                No expenses yet
              </h3>
              <p style={{ color: THEME.textMuted, fontSize: '0.875rem', marginBottom: '1rem' }}>
                Track your shop expenses like rent, electricity, wages.
              </p>
              <button
                onClick={() => setShowForm(true)}
                style={{
                  background: THEME.gradient,
                  color: '#FFFFFF',
                  fontWeight: 600,
                  padding: '0.625rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)',
                }}
              >
                + Add Expense
              </button>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead
                  style={{
                    background: 'rgba(10, 14, 26, 0.6)',
                    borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
                  }}
                >
                  <tr>
                    {['Date', 'Title', 'Category', 'Amount', 'Actions'].map(
                      (h, i) => (
                        <th
                          key={h}
                          style={{
                            textAlign:
                              i === 3 || i === 4 ? 'right' : 'left',
                            padding: '0.75rem 1.5rem',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            color: THEME.textMuted,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                          }}
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((ex) => (
                    <tr
                      key={ex.id}
                      style={{
                        borderBottom: '1px solid rgba(148, 163, 184, 0.08)',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          'rgba(124, 58, 237, 0.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <td
                        style={{
                          padding: '1rem 1.5rem',
                          fontSize: '0.875rem',
                          color: THEME.textMuted,
                        }}
                      >
                        {new Date(ex.expenseDate).toLocaleDateString('en-PK', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td
                        style={{
                          padding: '1rem 1.5rem',
                          fontWeight: 500,
                          color: THEME.text,
                          fontSize: '0.875rem',
                        }}
                      >
                        {ex.title}
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            background: 'rgba(124, 58, 237, 0.15)',
                            color: '#C4B5FD',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            padding: '0.25rem 0.625rem',
                            borderRadius: '9999px',
                          }}
                        >
                          {ex.category.charAt(0) + ex.category.slice(1).toLowerCase()}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: '1rem 1.5rem',
                          textAlign: 'right',
                          fontWeight: 600,
                          color: '#FCA5A5',
                          fontSize: '0.875rem',
                        }}
                      >
                        Rs. {Number(ex.amount).toLocaleString()}
                      </td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: '0.75rem',
                          }}
                        >
                          <button
                            onClick={() => handleEdit(ex)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#C4B5FD',
                              fontSize: '0.875rem',
                              fontWeight: 500,
                              cursor: 'pointer',
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(ex)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#FCA5A5',
                              fontSize: '0.875rem',
                              fontWeight: 500,
                              cursor: 'pointer',
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ============================================================
// GLOBAL STYLES
// ============================================================

function GlobalStyles() {
  return (
    <style>{`
      * { box-sizing: border-box; }
      body {
        margin: 0;
        padding: 0;
        background: #0A0E1A;
        color: #F8FAFC;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
      }
      input::placeholder, textarea::placeholder { color: #64748B; }
      a { text-decoration: none; }
      button { font-family: inherit; cursor: pointer; }
      select option { background: #0A0E1A; color: #F8FAFC; }

      ::-webkit-scrollbar { width: 8px; height: 8px; }
      ::-webkit-scrollbar-track { background: rgba(10, 14, 26, 0.5); }
      ::-webkit-scrollbar-thumb {
        background: rgba(124, 58, 237, 0.4);
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(124, 58, 237, 0.6);
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      /* Responsive */
      .nav-desktop { display: none !important; }
      .user-info { display: none !important; }
      .logout-btn { display: none !important; }
      .form-full { grid-column: 1 / -1; }

      @media (min-width: 640px) {
        .user-info { display: block !important; }
        .logout-btn { display: inline-block !important; }
      }

      @media (min-width: 768px) {
        .stats-grid-3 { grid-template-columns: repeat(3, 1fr) !important; }
        .filter-grid-5 { grid-template-columns: repeat(4, 1fr) !important; }
        .filter-search { grid-column: span 2 !important; }
        .form-grid-2 { grid-template-columns: repeat(2, 1fr) !important; }
      }

      @media (min-width: 1024px) {
        .nav-desktop { display: flex !important; }
        .menu-btn { display: none !important; }
      }
    `}</style>
  );
}