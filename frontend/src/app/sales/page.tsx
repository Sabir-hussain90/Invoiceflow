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

export default function SalesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [sales, setSales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [from, setFrom] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d.toISOString().slice(0, 10);
  });
  const [to, setTo] = useState(new Date().toISOString().slice(0, 10));
  const [paymentStatus, setPaymentStatus] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [selectedSale, setSelectedSale] = useState<any>(null);

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

  const loadSales = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const params = new URLSearchParams();
      if (from) params.set('from', from);
      if (to) params.set('to', to);
      if (paymentStatus) params.set('paymentStatus', paymentStatus);
      if (invoiceNumber) params.set('invoiceNumber', invoiceNumber);
      const res = await fetch(
        `${API}/sales${params.toString() ? `?${params}` : ''}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) setSales(await res.json());
      else if (res.status === 401) router.push('/login');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSales();
    // eslint-disable-next-line
  }, []);

  const loadSaleDetails = async (id: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/sales/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setSelectedSale(await res.json());
    } catch (err) {
      alert('Failed to load sale details');
    }
  };

  const handleCancelSale = async (sale: any) => {
    const reason = prompt(`Cancel sale ${sale.invoiceNumber}? Reason:`);
    if (reason === null) return;
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/sales/${sale.id}/cancel`, {
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
      alert('Sale cancelled — stock restored');
      setSelectedSale(null);
      loadSales();
    } catch (err) {
      alert('Network error');
    }
  };

  const handleDownloadInvoice = async (
    saleId: string,
    invoiceNumber: string
  ) => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/invoices/${saleId}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        alert('Failed to download PDF');
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${invoiceNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Download failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.push('/');
  };

  const clearFilters = () => {
    const d = new Date();
    d.setDate(1);
    setFrom(d.toISOString().slice(0, 10));
    setTo(new Date().toISOString().slice(0, 10));
    setPaymentStatus('');
    setInvoiceNumber('');
    setTimeout(loadSales, 0);
  };

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/pos', label: 'POS' },
    { href: '/products', label: 'Products' },
    { href: '/sales', label: 'Sales', active: true },
    { href: '/invoices', label: 'Invoices' },
    { href: '/reports', label: 'Reports' },
    { href: '/expenses', label: 'Expenses' },
    { href: '/settings', label: 'Settings' },
  ];

  const getPaymentBadge = (status: string) => {
    const styles: Record<string, { bg: string; color: string }> = {
      PAID: { bg: 'rgba(16, 185, 129, 0.15)', color: '#6EE7B7' },
      PARTIALLY_PAID: { bg: 'rgba(234, 179, 8, 0.15)', color: '#FDE047' },
      UNPAID: { bg: 'rgba(239, 68, 68, 0.15)', color: '#FCA5A5' },
      REFUNDED: { bg: 'rgba(100, 116, 139, 0.15)', color: '#94A3B8' },
    };
    const labels: Record<string, string> = {
      PAID: 'Paid',
      PARTIALLY_PAID: 'Partial',
      UNPAID: 'Unpaid',
      REFUNDED: 'Refunded',
    };
    const s = styles[status] || styles.REFUNDED;
    return (
      <span
        style={{
          display: 'inline-block',
          fontSize: '0.75rem',
          fontWeight: 600,
          padding: '0.25rem 0.625rem',
          borderRadius: '9999px',
          background: s.bg,
          color: s.color,
        }}
      >
        {labels[status] || status}
      </span>
    );
  };

  const totalSalesValue = sales.reduce(
    (sum, s) => sum + Number(s.totalAmount),
    0
  );
  const totalReceived = sales.reduce(
    (sum, s) => sum + Number(s.amountPaid),
    0
  );
  const totalDue = sales.reduce((sum, s) => sum + Number(s.amountDue), 0);

  // Shared input styles
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
    fontSize: '0.7rem',
    fontWeight: 600,
    color: THEME.textMuted,
    marginBottom: '0.375rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
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
              Sales History
            </h1>
            <p style={{ color: THEME.textMuted, fontSize: '0.875rem', marginTop: '0.25rem' }}>
              All completed sales in the selected period
            </p>
          </div>
          <Link
            href="/pos"
            style={{
              background: THEME.gradient,
              color: '#FFFFFF',
              fontWeight: 600,
              padding: '0.625rem 1.25rem',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
              transition: 'all 0.2s',
            }}
          >
            + New Sale
          </Link>
        </div>

        {/* ========== STATS CARDS ========== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
          className="stats-grid-4"
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
              Sales Count
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: THEME.text }}>
              {sales.length}
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
              Total Sales
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#C4B5FD' }}>
              Rs. {totalSalesValue.toLocaleString()}
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
              Received
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: THEME.green }}>
              Rs. {totalReceived.toLocaleString()}
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
              Due
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: THEME.red }}>
              Rs. {totalDue.toLocaleString()}
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
            className="filter-grid-4"
          >
            <div>
              <label style={labelStyle}>From</label>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <label style={labelStyle}>To</label>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <label style={labelStyle}>Payment</label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              >
                <option value="">All</option>
                <option value="PAID">Paid</option>
                <option value="PARTIALLY_PAID">Partial</option>
                <option value="UNPAID">Unpaid</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Invoice #</label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && loadSales()}
                style={inputStyle}
                placeholder="Search..."
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
            <button
              onClick={loadSales}
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

        {/* ========== SALES TABLE ========== */}
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
              Loading sales...
            </div>
          ) : sales.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧾</div>
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: THEME.text,
                  marginBottom: '0.5rem',
                }}
              >
                No sales found
              </h3>
              <p style={{ color: THEME.textMuted, fontSize: '0.875rem', marginBottom: '1rem' }}>
                No sales match your filters.
              </p>
              <Link
                href="/pos"
                style={{
                  display: 'inline-block',
                  background: THEME.gradient,
                  color: '#FFFFFF',
                  fontWeight: 600,
                  padding: '0.625rem 1.5rem',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)',
                }}
              >
                Make a Sale
              </Link>
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
                    {[
                      'Invoice #',
                      'Date',
                      'Customer',
                      'Payment',
                      'Total',
                      'Actions',
                    ].map((h, i) => (
                      <th
                        key={h}
                        style={{
                          textAlign:
                            i === 3
                              ? 'center'
                              : i === 4 || i === 5
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
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sales.map((s) => (
                    <tr
                      key={s.id}
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
                            fontFamily: 'monospace',
                            fontWeight: 600,
                            color: THEME.text,
                            fontSize: '0.875rem',
                          }}
                        >
                          {s.invoiceNumber}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: '1rem 1.5rem',
                          fontSize: '0.875rem',
                          color: THEME.textMuted,
                        }}
                      >
                        {new Date(s.saleDate).toLocaleDateString('en-PK', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td
                        style={{
                          padding: '1rem 1.5rem',
                          fontSize: '0.875rem',
                          color: s.customer?.name ? THEME.textMuted : THEME.textDim,
                        }}
                      >
                        {s.customer?.name || 'Walk-in'}
                      </td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                        {getPaymentBadge(s.paymentStatus)}
                      </td>
                      <td
                        style={{
                          padding: '1rem 1.5rem',
                          textAlign: 'right',
                          fontWeight: 600,
                          color: THEME.text,
                          fontSize: '0.875rem',
                        }}
                      >
                        Rs. {Number(s.totalAmount).toLocaleString()}
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
                            onClick={() => loadSaleDetails(s.id)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#C4B5FD',
                              fontSize: '0.875rem',
                              fontWeight: 500,
                              cursor: 'pointer',
                            }}
                          >
                            View
                          </button>
                          <button
                            onClick={() =>
                              handleDownloadInvoice(s.id, s.invoiceNumber)
                            }
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: THEME.textMuted,
                              fontSize: '0.875rem',
                              fontWeight: 500,
                              cursor: 'pointer',
                            }}
                          >
                            PDF
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

      {/* ========== SALE DETAILS MODAL ========== */}
      {selectedSale && (
        <div
          onClick={() => setSelectedSale(null)}
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
            overflowY: 'auto',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '42rem',
              background: THEME.glass,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${THEME.glassBorder}`,
              borderRadius: '1rem',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              margin: '2rem 0',
            }}
          >
            <div
              style={{
                padding: '1.5rem',
                borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    color: THEME.text,
                    margin: 0,
                  }}
                >
                  Sale Details
                </h3>
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    color: THEME.textMuted,
                    marginTop: '0.25rem',
                  }}
                >
                  {selectedSale.invoiceNumber}
                </div>
              </div>
              <button
                onClick={() => setSelectedSale(null)}
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

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', fontSize: '0.875rem' }}>
                <div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: THEME.textDim,
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      marginBottom: '0.25rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Date
                  </div>
                  <div style={{ color: THEME.text }}>
                    {new Date(selectedSale.saleDate).toLocaleString('en-PK')}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: THEME.textDim,
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      marginBottom: '0.25rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Customer
                  </div>
                  <div style={{ color: THEME.text }}>
                    {selectedSale.customer?.name || 'Walk-in'}
                  </div>
                </div>
              </div>

              {selectedSale.items && selectedSale.items.length > 0 && (
                <div>
                  <h4
                    style={{
                      fontWeight: 600,
                      color: THEME.text,
                      marginBottom: '0.75rem',
                      fontSize: '0.875rem',
                    }}
                  >
                    Items
                  </h4>
                  <div
                    style={{
                      border: `1px solid ${THEME.glassBorder}`,
                      borderRadius: '0.5rem',
                      overflow: 'hidden',
                    }}
                  >
                    <table style={{ width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse' }}>
                      <thead style={{ background: 'rgba(10, 14, 26, 0.6)' }}>
                        <tr>
                          <th
                            style={{
                              textAlign: 'left',
                              padding: '0.5rem 0.75rem',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              color: THEME.textMuted,
                            }}
                          >
                            Product
                          </th>
                          <th
                            style={{
                              textAlign: 'right',
                              padding: '0.5rem 0.75rem',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              color: THEME.textMuted,
                            }}
                          >
                            Qty
                          </th>
                          <th
                            style={{
                              textAlign: 'right',
                              padding: '0.5rem 0.75rem',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              color: THEME.textMuted,
                            }}
                          >
                            Price
                          </th>
                          <th
                            style={{
                              textAlign: 'right',
                              padding: '0.5rem 0.75rem',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              color: THEME.textMuted,
                            }}
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedSale.items.map((item: any) => (
                          <tr
                            key={item.id}
                            style={{
                              borderTop: '1px solid rgba(148, 163, 184, 0.08)',
                            }}
                          >
                            <td
                              style={{
                                padding: '0.5rem 0.75rem',
                                fontWeight: 500,
                                color: THEME.text,
                              }}
                            >
                              {item.productName}
                            </td>
                            <td
                              style={{
                                padding: '0.5rem 0.75rem',
                                textAlign: 'right',
                                color: THEME.textMuted,
                              }}
                            >
                              {Number(item.quantity)} {item.unit}
                            </td>
                            <td
                              style={{
                                padding: '0.5rem 0.75rem',
                                textAlign: 'right',
                                color: THEME.textMuted,
                              }}
                            >
                              Rs. {Number(item.unitPrice).toFixed(2)}
                            </td>
                            <td
                              style={{
                                padding: '0.5rem 0.75rem',
                                textAlign: 'right',
                                fontWeight: 600,
                                color: THEME.text,
                              }}
                            >
                              Rs. {Number(item.lineTotal).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div
                style={{
                  background: 'rgba(10, 14, 26, 0.6)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', color: THEME.textMuted }}>
                  <span>Subtotal</span>
                  <span>Rs. {Number(selectedSale.subtotal).toFixed(2)}</span>
                </div>
                {Number(selectedSale.discountAmount) > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: THEME.textMuted }}>Discount</span>
                    <span style={{ color: '#FCA5A5' }}>
                      −Rs. {Number(selectedSale.discountAmount).toFixed(2)}
                    </span>
                  </div>
                )}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    color: THEME.text,
                    borderTop: '1px solid rgba(148, 163, 184, 0.15)',
                    paddingTop: '0.5rem',
                    marginTop: '0.25rem',
                  }}
                >
                  <span>Total</span>
                  <span>Rs. {Number(selectedSale.totalAmount).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: THEME.textMuted }}>Paid</span>
                  <span style={{ color: THEME.green, fontWeight: 600 }}>
                    Rs. {Number(selectedSale.amountPaid).toFixed(2)}
                  </span>
                </div>
                {Number(selectedSale.amountDue) > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: THEME.textMuted }}>Due</span>
                    <span style={{ color: '#FCA5A5', fontWeight: 600 }}>
                      Rs. {Number(selectedSale.amountDue).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div
              style={{
                padding: '1.5rem',
                borderTop: '1px solid rgba(148, 163, 184, 0.15)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                justifyContent: 'flex-end',
              }}
            >
              <button
                onClick={() =>
                  handleDownloadInvoice(
                    selectedSale.id,
                    selectedSale.invoiceNumber
                  )
                }
                style={{
                  background: 'rgba(10, 14, 26, 0.6)',
                  color: THEME.textMuted,
                  fontWeight: 600,
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: `1px solid ${THEME.glassBorder}`,
                  cursor: 'pointer',
                }}
              >
                Download PDF
              </button>
              <button
                onClick={() => window.print()}
                style={{
                  background: 'rgba(10, 14, 26, 0.6)',
                  color: THEME.textMuted,
                  fontWeight: 600,
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: `1px solid ${THEME.glassBorder}`,
                  cursor: 'pointer',
                }}
              >
                Print
              </button>
              {selectedSale.status === 'COMPLETED' && (
                <button
                  onClick={() => handleCancelSale(selectedSale)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    color: '#FCA5A5',
                    fontWeight: 600,
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    cursor: 'pointer',
                  }}
                >
                  Cancel Sale
                </button>
              )}
              <button
                onClick={() => setSelectedSale(null)}
                style={{
                  background: THEME.gradient,
                  color: '#FFFFFF',
                  fontWeight: 600,
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)',
                }}
              >
                Close
              </button>
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
        .filter-grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
      }

      @media (min-width: 768px) {
        .stats-grid-4 { grid-template-columns: repeat(4, 1fr) !important; }
        .filter-grid-4 { grid-template-columns: repeat(4, 1fr) !important; }
      }

      @media (min-width: 1024px) {
        .nav-desktop { display: flex !important; }
        .menu-btn { display: none !important; }
      }

      /* Print */
      @media print {
        body { background: white; color: black; }
      }
    `}</style>
  );
}