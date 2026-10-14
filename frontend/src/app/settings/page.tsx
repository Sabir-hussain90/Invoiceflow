'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

function SettingsInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab =
    (searchParams.get('tab') as 'shop' | 'invoice' | 'account' | 'password') ||
    'shop';

  const [user, setUser] = useState<any>(null);
  const [shop, setShop] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<'shop' | 'invoice' | 'account' | 'password'>(
    initialTab
  );

  const [shopForm, setShopForm] = useState({
    name: '',
    legalName: '',
    ntnNumber: '',
    strnNumber: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    logoUrl: '',
    jazzcashNumber: '',
    easypaisaNumber: '',
  });

  const [invoiceForm, setInvoiceForm] = useState({
    invoicePrefix: 'INV',
    invoiceFooter: '',
    taxEnabled: false,
    taxPercentage: '0',
    lowStockThreshold: '5',
    allowNegativeStock: false,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  // Load shop
  const loadShop = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/shops/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setShop(data);
        setShopForm({
          name: data.name || '',
          legalName: data.legalName || '',
          ntnNumber: data.ntnNumber || '',
          strnNumber: data.strnNumber || '',
          phone: data.phone || '',
          email: data.email || '',
          address: data.address || '',
          city: data.city || '',
          province: data.province || '',
          postalCode: data.postalCode || '',
          logoUrl: data.logoUrl || '',
          jazzcashNumber: data.jazzcashNumber || '',
          easypaisaNumber: data.easypaisaNumber || '',
        });
        setInvoiceForm({
          invoicePrefix: data.invoicePrefix || 'INV',
          invoiceFooter: data.invoiceFooter || '',
          taxEnabled: data.taxEnabled || false,
          taxPercentage: String(data.taxPercentage || '0'),
          lowStockThreshold: String(data.lowStockThreshold || 5),
          allowNegativeStock: data.allowNegativeStock || false,
        });
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
    loadShop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showMessage = (msg: string, isError = false) => {
    if (isError) {
      setError(msg);
      setSuccess('');
    } else {
      setSuccess(msg);
      setError('');
    }
    setTimeout(() => {
      setError('');
      setSuccess('');
    }, 4000);
  };

  const handleSaveShop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shop) return;

    if (!shopForm.name.trim()) {
      showMessage('Shop name is required', true);
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/shops/${shop.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: shopForm.name.trim(),
          legalName: shopForm.legalName || undefined,
          ntnNumber: shopForm.ntnNumber || undefined,
          strnNumber: shopForm.strnNumber || undefined,
          phone: shopForm.phone || undefined,
          email: shopForm.email || undefined,
          address: shopForm.address || undefined,
          city: shopForm.city || undefined,
          province: shopForm.province || undefined,
          postalCode: shopForm.postalCode || undefined,
          logoUrl: shopForm.logoUrl || undefined,
          jazzcashNumber: shopForm.jazzcashNumber || undefined,
          easypaisaNumber: shopForm.easypaisaNumber || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showMessage(data.message || 'Failed to save', true);
        return;
      }

      showMessage('Shop profile updated successfully');
      loadShop();
    } catch (err: any) {
      showMessage(err.message || 'Network error', true);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shop) return;

    setSaving(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/shops/${shop.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          invoicePrefix: invoiceForm.invoicePrefix || 'INV',
          invoiceFooter: invoiceForm.invoiceFooter || undefined,
          taxEnabled: invoiceForm.taxEnabled,
          taxPercentage: Number(invoiceForm.taxPercentage) || 0,
          lowStockThreshold: Number(invoiceForm.lowStockThreshold) || 5,
          allowNegativeStock: invoiceForm.allowNegativeStock,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showMessage(data.message || 'Failed to save', true);
        return;
      }

      showMessage('Invoice settings updated successfully');
      loadShop();
    } catch (err: any) {
      showMessage(err.message || 'Network error', true);
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showMessage('Passwords do not match', true);
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      showMessage('Password must be at least 6 characters', true);
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/users/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showMessage(data.message || 'Password change failed', true);
        return;
      }

      showMessage('Password changed successfully');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err: any) {
      showMessage(err.message || 'Network error', true);
    } finally {
      setSaving(false);
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
    { href: '/products', label: 'Products' },
    { href: '/sales', label: 'Sales' },
    { href: '/invoices', label: 'Invoices' },
    { href: '/reports', label: 'Reports' },
    { href: '/expenses', label: 'Expenses' },
    { href: '/settings', label: 'Settings', active: true },
  ];

  const tabs = [
    { id: 'shop' as const, label: 'Shop Profile', icon: '🏪' },
    { id: 'invoice' as const, label: 'Invoice & Preferences', icon: '🧾' },
    { id: 'account' as const, label: 'Account', icon: '👤' },
    { id: 'password' as const, label: 'Password', icon: '🔒' },
  ];

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
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    e.currentTarget.style.borderColor = THEME.purple;
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.2)';
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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

      <main style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* ========== PAGE HEADER ========== */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: THEME.text,
              margin: 0,
            }}
          >
            Settings
          </h1>
          <p style={{ color: THEME.textMuted, fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Manage your shop profile, invoices, and account
          </p>
        </div>

        {/* ========== MESSAGES ========== */}
        {error && (
          <div
            style={{
              marginBottom: '1rem',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#FCA5A5',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            style={{
              marginBottom: '1rem',
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.4)',
              color: '#86EFAC',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
            }}
          >
            ✓ {success}
          </div>
        )}

        {/* ========== TABS ========== */}
        <div
          style={{
            background: THEME.glass,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${THEME.glassBorder}`,
            borderRadius: '0.75rem',
            padding: '0.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.25rem',
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: tab === t.id ? THEME.gradient : 'transparent',
                color: tab === t.id ? '#FFFFFF' : THEME.textMuted,
                border:
                  tab === t.id
                    ? '1px solid rgba(124, 58, 237, 0.4)'
                    : '1px solid transparent',
                boxShadow:
                  tab === t.id ? '0 0 20px rgba(124, 58, 237, 0.3)' : 'none',
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div
            style={{
              background: THEME.glass,
              border: `1px solid ${THEME.glassBorder}`,
              borderRadius: '0.75rem',
              padding: '3rem',
              textAlign: 'center',
              color: THEME.textMuted,
            }}
          >
            Loading settings...
          </div>
        ) : (
          <>
            {/* ========== SHOP PROFILE TAB ========== */}
            {tab === 'shop' && (
              <form
                onSubmit={handleSaveShop}
                style={{
                  background: THEME.glass,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: `1px solid ${THEME.glassBorder}`,
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    color: THEME.text,
                    marginBottom: '0.25rem',
                  }}
                >
                  Shop Profile
                </h3>
                <p style={{ fontSize: '0.875rem', color: THEME.textMuted, marginBottom: '1.5rem' }}>
                  This information appears on your invoices
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    gap: '1rem',
                  }}
                  className="form-grid-2"
                >
                  <div className="form-full">
                    <label style={labelStyle}>Shop Name *</label>
                    <input
                      type="text"
                      required
                      value={shopForm.name}
                      onChange={(e) =>
                        setShopForm({ ...shopForm, name: e.target.value })
                      }
                      style={inputStyle}
                      placeholder="My General Store"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Legal Name</label>
                    <input
                      type="text"
                      value={shopForm.legalName}
                      onChange={(e) =>
                        setShopForm({ ...shopForm, legalName: e.target.value })
                      }
                      style={inputStyle}
                      placeholder="Traders (Pvt) Ltd"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input
                      type="tel"
                      value={shopForm.phone}
                      onChange={(e) =>
                        setShopForm({ ...shopForm, phone: e.target.value })
                      }
                      style={inputStyle}
                      placeholder="03001234567"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>JazzCash Number</label>
                    <input
                      type="tel"
                      value={shopForm.jazzcashNumber}
                      onChange={(e) =>
                        setShopForm({
                          ...shopForm,
                          jazzcashNumber: e.target.value,
                        })
                      }
                      style={inputStyle}
                      placeholder="03001234567"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    <p style={{ fontSize: '0.7rem', color: THEME.textDim, marginTop: '0.25rem' }}>
                      Shown on POS when customer pays via JazzCash
                    </p>
                  </div>

                  <div>
                    <label style={labelStyle}>EasyPaisa Number</label>
                    <input
                      type="tel"
                      value={shopForm.easypaisaNumber}
                      onChange={(e) =>
                        setShopForm({
                          ...shopForm,
                          easypaisaNumber: e.target.value,
                        })
                      }
                      style={inputStyle}
                      placeholder="03451234567"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    <p style={{ fontSize: '0.7rem', color: THEME.textDim, marginTop: '0.25rem' }}>
                      Shown on POS when customer pays via EasyPaisa
                    </p>
                  </div>

                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      value={shopForm.email}
                      onChange={(e) =>
                        setShopForm({ ...shopForm, email: e.target.value })
                      }
                      style={inputStyle}
                      placeholder="shop@example.pk"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>NTN Number</label>
                    <input
                      type="text"
                      value={shopForm.ntnNumber}
                      onChange={(e) =>
                        setShopForm({ ...shopForm, ntnNumber: e.target.value })
                      }
                      style={inputStyle}
                      placeholder="1234567-8"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>STRN Number</label>
                    <input
                      type="text"
                      value={shopForm.strnNumber}
                      onChange={(e) =>
                        setShopForm({ ...shopForm, strnNumber: e.target.value })
                      }
                      style={inputStyle}
                      placeholder="1234567890123"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div className="form-full">
                    <label style={labelStyle}>Address</label>
                    <input
                      type="text"
                      value={shopForm.address}
                      onChange={(e) =>
                        setShopForm({ ...shopForm, address: e.target.value })
                      }
                      style={inputStyle}
                      placeholder="Main Bazaar, Model Town"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>City</label>
                    <input
                      type="text"
                      value={shopForm.city}
                      onChange={(e) =>
                        setShopForm({ ...shopForm, city: e.target.value })
                      }
                      style={inputStyle}
                      placeholder="Lahore"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Province</label>
                    <input
                      type="text"
                      value={shopForm.province}
                      onChange={(e) =>
                        setShopForm({ ...shopForm, province: e.target.value })
                      }
                      style={inputStyle}
                      placeholder="Punjab"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Postal Code</label>
                    <input
                      type="text"
                      value={shopForm.postalCode}
                      onChange={(e) =>
                        setShopForm({ ...shopForm, postalCode: e.target.value })
                      }
                      style={inputStyle}
                      placeholder="54000"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Logo URL</label>
                    <input
                      type="url"
                      value={shopForm.logoUrl}
                      onChange={(e) =>
                        setShopForm({ ...shopForm, logoUrl: e.target.value })
                      }
                      style={inputStyle}
                      placeholder="https://example.com/logo.png"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button
                    type="submit"
                    disabled={saving}
                    style={{
                      background: THEME.gradient,
                      color: '#FFFFFF',
                      fontWeight: 600,
                      padding: '0.625rem 1.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: saving ? 'not-allowed' : 'pointer',
                      opacity: saving ? 0.5 : 1,
                      boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)',
                    }}
                  >
                    {saving ? 'Saving...' : 'Save Shop Profile'}
                  </button>
                </div>
              </form>
            )}

            {/* ========== INVOICE TAB ========== */}
            {tab === 'invoice' && (
              <form
                onSubmit={handleSaveInvoice}
                style={{
                  background: THEME.glass,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: `1px solid ${THEME.glassBorder}`,
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    color: THEME.text,
                    marginBottom: '0.25rem',
                  }}
                >
                  Invoice & Preferences
                </h3>
                <p style={{ fontSize: '0.875rem', color: THEME.textMuted, marginBottom: '1.5rem' }}>
                  Configure invoice numbering, tax, and stock behavior
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    gap: '1rem',
                  }}
                  className="form-grid-2"
                >
                  <div>
                    <label style={labelStyle}>Invoice Prefix</label>
                    <input
                      type="text"
                      value={invoiceForm.invoicePrefix}
                      onChange={(e) =>
                        setInvoiceForm({
                          ...invoiceForm,
                          invoicePrefix: e.target.value.toUpperCase(),
                        })
                      }
                      style={{ ...inputStyle, fontFamily: 'monospace' }}
                      placeholder="INV"
                      maxLength={10}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    <p style={{ fontSize: '0.7rem', color: THEME.textDim, marginTop: '0.25rem' }}>
                      Example: INV-2026-00001
                    </p>
                  </div>

                  <div>
                    <label style={labelStyle}>Low Stock Threshold</label>
                    <input
                      type="number"
                      min="0"
                      value={invoiceForm.lowStockThreshold}
                      onChange={(e) =>
                        setInvoiceForm({
                          ...invoiceForm,
                          lowStockThreshold: e.target.value,
                        })
                      }
                      style={inputStyle}
                      placeholder="5"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div className="form-full">
                    <label style={labelStyle}>Invoice Footer Text</label>
                    <textarea
                      rows={2}
                      value={invoiceForm.invoiceFooter}
                      onChange={(e) =>
                        setInvoiceForm({
                          ...invoiceForm,
                          invoiceFooter: e.target.value,
                        })
                      }
                      style={{ ...inputStyle, resize: 'vertical' }}
                      placeholder="Thank you for shopping with us!"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div
                    className="form-full"
                    style={{
                      borderTop: '1px solid rgba(148, 163, 184, 0.15)',
                      paddingTop: '1rem',
                    }}
                  >
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={invoiceForm.taxEnabled}
                        onChange={(e) =>
                          setInvoiceForm({
                            ...invoiceForm,
                            taxEnabled: e.target.checked,
                          })
                        }
                        style={{
                          width: '1rem',
                          height: '1rem',
                          accentColor: THEME.purple,
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 500, color: THEME.text, fontSize: '0.875rem' }}>
                          Enable Tax
                        </div>
                        <div style={{ fontSize: '0.75rem', color: THEME.textDim }}>
                          Apply tax on all sales
                        </div>
                      </div>
                    </label>
                  </div>

                  {invoiceForm.taxEnabled && (
                    <div>
                      <label style={labelStyle}>Tax Percentage (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={invoiceForm.taxPercentage}
                        onChange={(e) =>
                          setInvoiceForm({
                            ...invoiceForm,
                            taxPercentage: e.target.value,
                          })
                        }
                        style={inputStyle}
                        placeholder="0"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>
                  )}

                  <div
                    className="form-full"
                    style={{
                      borderTop: '1px solid rgba(148, 163, 184, 0.15)',
                      paddingTop: '1rem',
                    }}
                  >
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={invoiceForm.allowNegativeStock}
                        onChange={(e) =>
                          setInvoiceForm({
                            ...invoiceForm,
                            allowNegativeStock: e.target.checked,
                          })
                        }
                        style={{
                          width: '1rem',
                          height: '1rem',
                          accentColor: THEME.purple,
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 500, color: THEME.text, fontSize: '0.875rem' }}>
                          Allow Negative Stock
                        </div>
                        <div style={{ fontSize: '0.75rem', color: THEME.textDim }}>
                          Let cashiers sell products even when stock reaches 0
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button
                    type="submit"
                    disabled={saving}
                    style={{
                      background: THEME.gradient,
                      color: '#FFFFFF',
                      fontWeight: 600,
                      padding: '0.625rem 1.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: saving ? 'not-allowed' : 'pointer',
                      opacity: saving ? 0.5 : 1,
                      boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)',
                    }}
                  >
                    {saving ? 'Saving...' : 'Save Invoice Settings'}
                  </button>
                </div>
              </form>
            )}

            {/* ========== ACCOUNT TAB ========== */}
            {tab === 'account' && user && (
              <div
                style={{
                  background: THEME.glass,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: `1px solid ${THEME.glassBorder}`,
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    color: THEME.text,
                    marginBottom: '0.25rem',
                  }}
                >
                  Account
                </h3>
                <p style={{ fontSize: '0.875rem', color: THEME.textMuted, marginBottom: '1.5rem' }}>
                  Your account information
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '42rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div
                      style={{
                        width: '4rem',
                        height: '4rem',
                        borderRadius: '9999px',
                        background: THEME.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 20px rgba(124, 58, 237, 0.5)',
                      }}
                    >
                      {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold', color: THEME.text, fontSize: '1.125rem' }}>
                        {user.fullName}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: THEME.textMuted }}>
                        {user.email}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      borderTop: '1px solid rgba(148, 163, 184, 0.15)',
                      paddingTop: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      fontSize: '0.875rem',
                    }}
                  >
                    {[
                      { label: 'Name', value: user.fullName },
                      { label: 'Email', value: user.email },
                    ].map((row) => (
                      <div
                        key={row.label}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '0.5rem 0',
                          borderBottom: '1px solid rgba(148, 163, 184, 0.08)',
                        }}
                      >
                        <span style={{ color: THEME.textMuted }}>{row.label}</span>
                        <span style={{ fontWeight: 500, color: THEME.text }}>{row.value}</span>
                      </div>
                    ))}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0',
                      }}
                    >
                      <span style={{ color: THEME.textMuted }}>Role</span>
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
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========== PASSWORD TAB ========== */}
            {tab === 'password' && (
              <form
                onSubmit={handleChangePassword}
                style={{
                  background: THEME.glass,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: `1px solid ${THEME.glassBorder}`,
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  maxWidth: '42rem',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    color: THEME.text,
                    marginBottom: '0.25rem',
                  }}
                >
                  Change Password
                </h3>
                <p style={{ fontSize: '0.875rem', color: THEME.textMuted, marginBottom: '1.5rem' }}>
                  Choose a strong password to protect your account
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Current Password */}
                  <div>
                    <label style={labelStyle}>Current Password *</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showCurrent ? 'text' : 'password'}
                        required
                        value={passwordForm.currentPassword}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            currentPassword: e.target.value,
                          })
                        }
                        style={{ ...inputStyle, paddingRight: '3rem' }}
                        placeholder="Enter current password"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        style={{
                          position: 'absolute',
                          right: '0.75rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'transparent',
                          border: 'none',
                          color: THEME.textMuted,
                          cursor: 'pointer',
                          padding: '0.25rem',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        tabIndex={-1}
                      >
                        {showCurrent ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label style={labelStyle}>New Password *</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showNew ? 'text' : 'password'}
                        required
                        minLength={6}
                        value={passwordForm.newPassword}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            newPassword: e.target.value,
                          })
                        }
                        style={{ ...inputStyle, paddingRight: '3rem' }}
                        placeholder="At least 6 characters"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        style={{
                          position: 'absolute',
                          right: '0.75rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'transparent',
                          border: 'none',
                          color: THEME.textMuted,
                          cursor: 'pointer',
                          padding: '0.25rem',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        tabIndex={-1}
                      >
                        {showNew ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label style={labelStyle}>Confirm New Password *</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        required
                        minLength={6}
                        value={passwordForm.confirmPassword}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            confirmPassword: e.target.value,
                          })
                        }
                        style={{
                          ...inputStyle,
                          paddingRight: '3rem',
                          borderColor:
                            passwordForm.confirmPassword &&
                            passwordForm.newPassword !==
                              passwordForm.confirmPassword
                              ? 'rgba(239, 68, 68, 0.6)'
                              : 'rgba(148, 163, 184, 0.2)',
                        }}
                        placeholder="Re-enter new password"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        style={{
                          position: 'absolute',
                          right: '0.75rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'transparent',
                          border: 'none',
                          color: THEME.textMuted,
                          cursor: 'pointer',
                          padding: '0.25rem',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        tabIndex={-1}
                      >
                        {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                    {passwordForm.confirmPassword &&
                      passwordForm.newPassword !==
                        passwordForm.confirmPassword && (
                        <p
                          style={{
                            fontSize: '0.75rem',
                            color: '#FCA5A5',
                            marginTop: '0.375rem',
                          }}
                        >
                          Passwords do not match
                        </p>
                      )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
                    <button
                      type="submit"
                      disabled={saving}
                      style={{
                        background: THEME.gradient,
                        color: '#FFFFFF',
                        fontWeight: 600,
                        padding: '0.625rem 1.5rem',
                        borderRadius: '0.5rem',
                        border: 'none',
                        cursor: saving ? 'not-allowed' : 'pointer',
                        opacity: saving ? 0.5 : 1,
                        boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)',
                      }}
                    >
                      {saving ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </>
        )}
      </main>
    </div>
  );
}

// ============================================================
// EYE ICONS
// ============================================================

function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 1 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );
}

// ============================================================
// WRAPPER WITH SUSPENSE
// ============================================================

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: THEME.pageBg,
            color: THEME.textMuted,
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          }}
        >
          Loading settings...
        </div>
      }
    >
      <SettingsInner />
    </Suspense>
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
        .form-grid-2 { grid-template-columns: repeat(2, 1fr) !important; }
      }

      @media (min-width: 1024px) {
        .nav-desktop { display: flex !important; }
        .menu-btn { display: none !important; }
      }
    `}</style>
  );
}