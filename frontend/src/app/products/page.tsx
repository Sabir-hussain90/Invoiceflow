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
};

export default function ProductsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterLowStock, setFilterLowStock] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    description: '',
    sku: '',
    barcode: '',
    unit: 'piece',
    categoryId: '',
    costPrice: '',
    sellingPrice: '',
    stockQty: '',
    minStockLevel: '5',
  });
  const [adjustingProduct, setAdjustingProduct] = useState<any>(null);
  const [adjustForm, setAdjustForm] = useState({ quantity: '', reason: '' });

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
      if (search) params.set('search', search);
      if (filterCategory) params.set('categoryId', filterCategory);
      if (filterLowStock) params.set('lowStock', 'true');
      const [pRes, cRes] = await Promise.all([
        fetch(`${API}/products${params.toString() ? `?${params}` : ''}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API}/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      if (pRes.ok) setProducts(await pRes.json());
      if (cRes.ok) setCategories(await cRes.json());
      if (pRes.status === 401) router.push('/login');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [filterCategory, filterLowStock]);

  const resetForm = () => {
    setForm({
      name: '',
      description: '',
      sku: '',
      barcode: '',
      unit: 'piece',
      categoryId: '',
      costPrice: '',
      sellingPrice: '',
      stockQty: '',
      minStockLevel: '5',
    });
    setEditingId(null);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) {
      setError('Product name is required');
      return;
    }
    try {
      const token = localStorage.getItem('accessToken');
      const method = editingId ? 'PATCH' : 'POST';
      const url = editingId ? `${API}/products/${editingId}` : `${API}/products`;
      const payload: any = {
        name: form.name.trim(),
        description: form.description.trim() || undefined,
        sku: form.sku.trim() || undefined,
        barcode: form.barcode.trim() || undefined,
        unit: form.unit,
        categoryId: form.categoryId || undefined,
        costPrice: Number(form.costPrice),
        sellingPrice: Number(form.sellingPrice),
        minStockLevel: Number(form.minStockLevel) || 0,
      };
      if (!editingId && form.stockQty) payload.stockQty = Number(form.stockQty);
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
        setError(data.message || 'Failed to save product');
        return;
      }
      resetForm();
      setShowForm(false);
      loadData();
    } catch (err: any) {
      setError(err.message || 'Network error');
    }
  };

  const handleEdit = (p: any) => {
    setForm({
      name: p.name,
      description: p.description || '',
      sku: p.sku || '',
      barcode: p.barcode || '',
      unit: p.unit,
      categoryId: p.categoryId || '',
      costPrice: String(p.costPrice),
      sellingPrice: String(p.sellingPrice),
      stockQty: String(p.stockQty),
      minStockLevel: String(p.minStockLevel),
    });
    setEditingId(p.id);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (p: any) => {
    if (!confirm(`Delete product "${p.name}"?`)) return;
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/products/${p.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        alert('Failed to delete');
        return;
      }
      loadData();
    } catch (err) {
      alert('Network error');
    }
  };

  const handleAdjustStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustingProduct) return;
    const qty = Number(adjustForm.quantity);
    if (!qty || qty === 0) {
      alert('Enter a non-zero quantity');
      return;
    }
    if (!adjustForm.reason.trim()) {
      alert('Reason is required');
      return;
    }
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(
        `${API}/products/${adjustingProduct.id}/adjust-stock`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            quantity: qty,
            reason: adjustForm.reason.trim(),
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Adjustment failed');
        return;
      }
      alert('Stock adjusted successfully');
      setAdjustingProduct(null);
      setAdjustForm({ quantity: '', reason: '' });
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

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/pos', label: 'POS' },
    { href: '/products', label: 'Products', active: true },
    { href: '/sales', label: 'Sales' },
    { href: '/invoices', label: 'Invoices' },
    { href: '/reports', label: 'Reports' },
    { href: '/expenses', label: 'Expenses' },
    { href: '/settings', label: 'Settings' },
  ];

  const lowStockCount = products.filter(
    (p) => Number(p.stockQty) <= Number(p.minStockLevel)
  ).length;
  const totalStockValue = products.reduce(
    (sum, p) => sum + Number(p.stockQty) * Number(p.costPrice),
    0
  );

  // Shared styles
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
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: THEME.textMuted,
    marginBottom: '0.375rem',
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.currentTarget.style.borderColor = THEME.purple;
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.2)';
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
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
              Products
            </h1>
            <p style={{ color: THEME.textMuted, fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Manage your shop&apos;s product catalog
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
            {showForm ? 'Cancel' : '+ Add Product'}
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
          className="stats-grid"
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
              Total Products
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: THEME.text }}>
              {products.length}
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
              Low Stock
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: THEME.orange }}>
              {lowStockCount}
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
              Stock Value
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#C4B5FD' }}>
              Rs. {totalStockValue.toLocaleString()}
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
            className="filter-grid"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && loadData()}
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{ ...inputStyle, cursor: 'pointer' }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => setFilterLowStock(!filterLowStock)}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: filterLowStock
                  ? 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)'
                  : 'rgba(10, 14, 26, 0.6)',
                color: filterLowStock ? '#FFFFFF' : THEME.textMuted,
                border: filterLowStock
                  ? '1px solid #F97316'
                  : '1px solid rgba(148, 163, 184, 0.2)',
                boxShadow: filterLowStock
                  ? '0 0 20px rgba(249, 115, 22, 0.4)'
                  : 'none',
                transition: 'all 0.2s',
              }}
            >
              {filterLowStock ? '✓ ' : ''}Low Stock Only
            </button>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
            <button
              onClick={loadData}
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
              Search
            </button>
            {(search || filterCategory || filterLowStock) && (
              <button
                onClick={() => {
                  setSearch('');
                  setFilterCategory('');
                  setFilterLowStock(false);
                  setTimeout(loadData, 0);
                }}
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
            )}
          </div>
        </div>

        {/* ========== PRODUCT FORM ========== */}
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
              {editingId ? 'Edit Product' : 'Add New Product'}
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
              className="form-grid"
            >
              <div style={{ gridColumn: '1 / -1' }} className="form-full">
                <label style={labelStyle}>Product Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  placeholder="Cooking Oil 1L"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              <div>
                <label style={labelStyle}>SKU</label>
                <input
                  type="text"
                  value={form.sku}
                  onChange={(e) => setForm({ ...form, sku: e.target.value })}
                  style={inputStyle}
                  placeholder="OIL-001"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              <div>
                <label style={labelStyle}>Barcode</label>
                <input
                  type="text"
                  value={form.barcode}
                  onChange={(e) => setForm({ ...form, barcode: e.target.value })}
                  style={inputStyle}
                  placeholder="8901234567890"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              <div>
                <label style={labelStyle}>Category</label>
                <select
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  <option value="">-- None --</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Unit</label>
                <select
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  {['piece', 'kg', 'gram', 'litre', 'ml', 'packet', 'dozen', 'box', 'bottle', 'bag'].map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Cost Price (Rs.) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={form.costPrice}
                  onChange={(e) => setForm({ ...form, costPrice: e.target.value })}
                  style={inputStyle}
                  placeholder="480"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              <div>
                <label style={labelStyle}>Selling Price (Rs.) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={form.sellingPrice}
                  onChange={(e) => setForm({ ...form, sellingPrice: e.target.value })}
                  style={inputStyle}
                  placeholder="550"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              {!editingId && (
                <div>
                  <label style={labelStyle}>Opening Stock</label>
                  <input
                    type="number"
                    min="0"
                    value={form.stockQty}
                    onChange={(e) => setForm({ ...form, stockQty: e.target.value })}
                    style={inputStyle}
                    placeholder="0"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              )}
              <div>
                <label style={labelStyle}>Min Stock Alert</label>
                <input
                  type="number"
                  min="0"
                  value={form.minStockLevel}
                  onChange={(e) => setForm({ ...form, minStockLevel: e.target.value })}
                  style={inputStyle}
                  placeholder="5"
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
                {editingId ? 'Update Product' : 'Save Product'}
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

        {/* ========== PRODUCTS TABLE ========== */}
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
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: THEME.text,
                  marginBottom: '0.5rem',
                }}
              >
                No products yet
              </h3>
              <p style={{ color: THEME.textMuted, fontSize: '0.875rem', marginBottom: '1rem' }}>
                Add your first product to start selling.
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
                + Add Your First Product
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
                    {['Product', 'Category', 'Cost', 'Selling', 'Stock', 'Actions'].map(
                      (h, i) => (
                        <th
                          key={h}
                          style={{
                            textAlign:
                              i === 2 || i === 3
                                ? 'right'
                                : i === 4
                                  ? 'center'
                                  : i === 5
                                    ? 'right'
                                    : 'left',
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
                  {products.map((p) => {
                    const stock = Number(p.stockQty);
                    const minStock = Number(p.minStockLevel);
                    const low = stock <= minStock;
                    const out = stock <= 0;
                    return (
                      <tr
                        key={p.id}
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
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <div
                            style={{
                              fontWeight: 500,
                              color: THEME.text,
                              fontSize: '0.875rem',
                            }}
                          >
                            {p.name}
                          </div>
                          {p.sku && (
                            <div style={{ fontSize: '0.75rem', color: THEME.textDim }}>
                              SKU: {p.sku}
                            </div>
                          )}
                        </td>
                        <td
                          style={{
                            padding: '1rem 1.5rem',
                            fontSize: '0.875rem',
                            color: THEME.textMuted,
                          }}
                        >
                          {p.category?.name || '—'}
                        </td>
                        <td
                          style={{
                            padding: '1rem 1.5rem',
                            fontSize: '0.875rem',
                            textAlign: 'right',
                            color: THEME.textMuted,
                          }}
                        >
                          Rs. {Number(p.costPrice).toFixed(2)}
                        </td>
                        <td
                          style={{
                            padding: '1rem 1.5rem',
                            fontSize: '0.875rem',
                            textAlign: 'right',
                            fontWeight: 500,
                            color: '#C4B5FD',
                          }}
                        >
                          Rs. {Number(p.sellingPrice).toFixed(2)}
                        </td>
                        <td
                          style={{
                            padding: '1rem 1.5rem',
                            textAlign: 'center',
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 600,
                              fontSize: '0.875rem',
                              color: out
                                ? THEME.red
                                : low
                                  ? THEME.orange
                                  : THEME.green,
                            }}
                          >
                            {stock} {p.unit}
                          </span>
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
                              onClick={() => setAdjustingProduct(p)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: THEME.orange,
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                              }}
                            >
                              Stock
                            </button>
                            <button
                              onClick={() => handleEdit(p)}
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
                              onClick={() => handleDelete(p)}
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* ========== ADJUST STOCK MODAL ========== */}
      {adjustingProduct && (
        <div
          onClick={() => setAdjustingProduct(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '1rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '28rem',
              background: THEME.glass,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${THEME.glassBorder}`,
              borderRadius: '1rem',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div style={{ padding: '1.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    color: THEME.text,
                    margin: 0,
                  }}
                >
                  Adjust Stock
                </h3>
                <button
                  onClick={() => setAdjustingProduct(null)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: THEME.textMuted,
                    fontSize: '1.5rem',
                    lineHeight: 1,
                    cursor: 'pointer',
                  }}
                >
                  ×
                </button>
              </div>

              <div
                style={{
                  background: 'rgba(124, 58, 237, 0.15)',
                  border: '1px solid rgba(124, 58, 237, 0.3)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  marginBottom: '1rem',
                }}
              >
                <div
                  style={{
                    fontSize: '0.7rem',
                    color: '#C4B5FD',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Current Stock
                </div>
                <div
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#C4B5FD',
                  }}
                >
                  {Number(adjustingProduct.stockQty)} {adjustingProduct.unit}
                </div>
                <div style={{ fontSize: '0.875rem', color: THEME.textMuted, marginTop: '0.25rem' }}>
                  {adjustingProduct.name}
                </div>
              </div>

              <form
                onSubmit={handleAdjustStock}
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                <div>
                  <label style={labelStyle}>Adjustment Quantity</label>
                  <input
                    type="number"
                    required
                    step="0.001"
                    value={adjustForm.quantity}
                    onChange={(e) =>
                      setAdjustForm({ ...adjustForm, quantity: e.target.value })
                    }
                    style={inputStyle}
                    placeholder="e.g., 10 to add, -5 to remove"
                    autoFocus
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  <p style={{ fontSize: '0.75rem', color: THEME.textDim, marginTop: '0.25rem' }}>
                    Positive to add, negative to remove
                  </p>
                </div>
                <div>
                  <label style={labelStyle}>Reason *</label>
                  <input
                    type="text"
                    required
                    value={adjustForm.reason}
                    onChange={(e) =>
                      setAdjustForm({ ...adjustForm, reason: e.target.value })
                    }
                    style={inputStyle}
                    placeholder="e.g., New delivery, damaged goods"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      background: THEME.gradient,
                      color: '#FFFFFF',
                      fontWeight: 600,
                      padding: '0.625rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)',
                    }}
                  >
                    Apply
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdjustingProduct(null)}
                    style={{
                      flex: 1,
                      background: 'rgba(10, 14, 26, 0.6)',
                      color: THEME.textMuted,
                      fontWeight: 600,
                      padding: '0.625rem',
                      borderRadius: '0.5rem',
                      border: `1px solid ${THEME.glassBorder}`,
                      cursor: 'pointer',
                    }}
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
      input::placeholder { color: #64748B; }
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

      @media (min-width: 640px) {
        .user-info { display: block !important; }
        .logout-btn { display: inline-block !important; }
        .stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
        .filter-grid { grid-template-columns: repeat(3, 1fr) !important; }
        .form-grid { grid-template-columns: repeat(2, 1fr) !important; }
      }

      @media (min-width: 1024px) {
        .nav-desktop { display: flex !important; }
        .menu-btn { display: none !important; }
      }
    `}</style>
  );
}