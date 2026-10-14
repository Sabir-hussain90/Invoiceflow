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

export default function InvoicesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [shop, setShop] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [downloading, setDownloading] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

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
    (async () => {
      try {
        const res = await fetch(`${API}/shops/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) setShop(await res.json());
      } catch {}
    })();
  }, [router]);

  const loadInvoices = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/invoices`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setInvoices(await res.json());
      else if (res.status === 401) router.push('/login');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownloadPdf = async (saleId: string, invoiceNumber: string) => {
    setDownloading(saleId);
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
      setTimeout(loadInvoices, 500);
    } catch (err) {
      alert('Download failed');
    } finally {
      setDownloading(null);
    }
  };

  const handlePreview = async (saleId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/invoices/${saleId}/preview`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        alert('Failed to preview');
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      setTimeout(() => window.URL.revokeObjectURL(url), 60000);
    } catch (err) {
      alert('Preview failed');
    }
  };

  const handleViewDetails = async (inv: any) => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API}/sales/${inv.sale.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const full = await res.json();
        setSelectedInvoice({ ...inv, sale: { ...inv.sale, ...full } });
      } else {
        setSelectedInvoice(inv);
      }
    } catch {
      setSelectedInvoice(inv);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.push('/');
  };

  const clearFilters = () => {
    setSearch('');
    setFilterFrom('');
    setFilterTo('');
  };

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/pos', label: 'POS' },
    { href: '/products', label: 'Products' },
    { href: '/sales', label: 'Sales' },
    { href: '/invoices', label: 'Invoices', active: true },
    { href: '/reports', label: 'Reports' },
    { href: '/expenses', label: 'Expenses' },
    { href: '/settings', label: 'Settings' },
  ];

  const filteredInvoices = invoices.filter((inv) => {
    if (search) {
      const s = search.toLowerCase();
      const matchesNumber = inv.invoiceNumber.toLowerCase().includes(s);
      const matchesCustomer =
        inv.sale?.customer?.name?.toLowerCase().includes(s) || false;
      if (!matchesNumber && !matchesCustomer) return false;
    }
    const saleDate = new Date(inv.sale?.saleDate || inv.createdAt);
    if (filterFrom) {
      const from = new Date(filterFrom);
      if (saleDate < from) return false;
    }
    if (filterTo) {
      const to = new Date(filterTo);
      to.setHours(23, 59, 59, 999);
      if (saleDate > to) return false;
    }
    return true;
  });

  const totalValue = filteredInvoices.reduce(
    (sum, inv) => sum + Number(inv.sale?.totalAmount || 0),
    0
  );

  const getStatusBadge = (status: string) => {
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

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = THEME.purple;
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.2)';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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
        <div style={{ marginBottom: '1.5rem' }}>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: THEME.text,
              margin: 0,
            }}
          >
            Invoices
          </h1>
          <p style={{ color: THEME.textMuted, fontSize: '0.875rem', marginTop: '0.25rem' }}>
            View and download all your shop invoices as PDF
          </p>
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
              Total Invoices
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: THEME.text }}>
              {filteredInvoices.length}
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
              Total Value
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#C4B5FD' }}>
              Rs. {totalValue.toLocaleString()}
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
              Paid Invoices
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: THEME.green }}>
              {filteredInvoices.filter((i) => i.sale?.paymentStatus === 'PAID').length}
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
            className="filter-grid-3"
          >
            <input
              type="text"
              placeholder="Search by invoice # or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
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
          {(search || filterFrom || filterTo) && (
            <button
              onClick={clearFilters}
              style={{
                marginTop: '0.75rem',
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
              Clear Filters
            </button>
          )}
        </div>

        {/* ========== INVOICES TABLE ========== */}
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
              Loading invoices...
            </div>
          ) : filteredInvoices.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: THEME.text,
                  marginBottom: '0.5rem',
                }}
              >
                No invoices yet
              </h3>
              <p style={{ color: THEME.textMuted, fontSize: '0.875rem', marginBottom: '1rem' }}>
                {search || filterFrom || filterTo
                  ? 'No invoices match your filters.'
                  : 'Complete a sale in the POS to generate your first invoice.'}
              </p>
              {!search && !filterFrom && !filterTo && (
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
                  Go to POS
                </Link>
              )}
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
                      'Status',
                      'Amount',
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
                  {filteredInvoices.map((inv) => (
                    <tr
                      key={inv.id}
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
                          {inv.invoiceNumber}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: '1rem 1.5rem',
                          fontSize: '0.875rem',
                          color: THEME.textMuted,
                        }}
                      >
                        {new Date(inv.sale?.saleDate || inv.createdAt).toLocaleDateString(
                          'en-PK',
                          { day: '2-digit', month: 'short', year: 'numeric' }
                        )}
                      </td>
                      <td
                        style={{
                          padding: '1rem 1.5rem',
                          fontSize: '0.875rem',
                          color: inv.sale?.customer?.name ? THEME.textMuted : THEME.textDim,
                        }}
                      >
                        {inv.sale?.customer?.name || 'Walk-in'}
                      </td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                        {getStatusBadge(inv.sale?.paymentStatus || '')}
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
                        Rs. {Number(inv.sale?.totalAmount || 0).toLocaleString()}
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
                            onClick={() => handleViewDetails(inv)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: THEME.textMuted,
                              fontSize: '0.875rem',
                              fontWeight: 500,
                              cursor: 'pointer',
                            }}
                          >
                            View
                          </button>
                          <button
                            onClick={() =>
                              handleDownloadPdf(inv.sale.id, inv.invoiceNumber)
                            }
                            disabled={downloading === inv.sale.id}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#C4B5FD',
                              fontSize: '0.875rem',
                              fontWeight: 500,
                              cursor:
                                downloading === inv.sale.id
                                  ? 'not-allowed'
                                  : 'pointer',
                              opacity: downloading === inv.sale.id ? 0.5 : 1,
                            }}
                          >
                            {downloading === inv.sale.id
                              ? 'Downloading...'
                              : 'Download PDF'}
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

      {/* ========== INVOICE PREVIEW MODAL ========== */}
      {selectedInvoice && (
        <div
          onClick={() => setSelectedInvoice(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'flex-start',
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
              maxWidth: '48rem',
              background: THEME.glass,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${THEME.glassBorder}`,
              borderRadius: '1rem',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              margin: '2rem 0',
            }}
          >
            {/* Modal header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 1.5rem',
                borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
                background: 'rgba(10, 14, 26, 0.6)',
                borderTopLeftRadius: '1rem',
                borderTopRightRadius: '1rem',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: THEME.text }}>
                Invoice Preview
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() =>
                    handleDownloadPdf(
                      selectedInvoice.sale.id,
                      selectedInvoice.invoiceNumber
                    )
                  }
                  style={{
                    background: THEME.gradient,
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)',
                  }}
                >
                  Download PDF
                </button>
                <button
                  onClick={() => handlePreview(selectedInvoice.sale.id)}
                  style={{
                    background: 'rgba(10, 14, 26, 0.6)',
                    color: THEME.textMuted,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.5rem',
                    border: `1px solid ${THEME.glassBorder}`,
                    cursor: 'pointer',
                  }}
                >
                  Open in new tab
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: THEME.textMuted,
                    fontSize: '1.5rem',
                    lineHeight: 1,
                    cursor: 'pointer',
                    marginLeft: '0.5rem',
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Invoice paper — stays white for readability */}
            <div style={{ padding: '2.5rem', background: '#FFFFFF', color: '#0F172A', borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}>
              <div style={{ textAlign: 'center', borderBottom: '2px solid #F1F5F9', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '1rem',
                    background: THEME.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    margin: '0 auto 0.75rem',
                  }}
                >
                  {shop?.name?.charAt(0)?.toUpperCase() || 'S'}
                </div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0F172A', margin: 0 }}>
                  {shop?.name || 'Your Shop Name'}
                </h1>
                {shop?.legalName && (
                  <div style={{ fontSize: '0.875rem', color: '#64748B', marginTop: '0.25rem' }}>
                    {shop.legalName}
                  </div>
                )}
                <div style={{ fontSize: '0.875rem', color: '#475569', marginTop: '0.5rem' }}>
                  {shop?.address && <div>{shop.address}</div>}
                  {shop?.city && (
                    <div>
                      {shop.city}
                      {shop.province ? `, ${shop.province}` : ''}
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.25rem' }}>
                    {shop?.phone && <span>📞 {shop.phone}</span>}
                    {shop?.email && <span>✉️ {shop.email}</span>}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
                    INVOICE
                  </h2>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#475569', marginTop: '0.25rem' }}>
                    {selectedInvoice.invoiceNumber}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#64748B', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Status
                  </div>
                  {getStatusBadge(selectedInvoice.sale.paymentStatus)}
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1.5rem',
                  padding: '1.5rem 0',
                  borderTop: '1px solid #F1F5F9',
                  borderBottom: '1px solid #F1F5F9',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#64748B', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Billed To
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A' }}>
                    {selectedInvoice.sale.customer?.name || 'Walk-in Customer'}
                  </div>
                  {selectedInvoice.sale.customer?.phone && (
                    <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.125rem' }}>
                      {selectedInvoice.sale.customer.phone}
                    </div>
                  )}
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#64748B', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Served By
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A' }}>
                    {selectedInvoice.sale.cashier?.fullName || 'N/A'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.125rem' }}>
                    Cashier
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#64748B', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Invoice Date
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A' }}>
                    {new Date(selectedInvoice.sale.saleDate).toLocaleDateString('en-PK', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.125rem' }}>
                    {new Date(selectedInvoice.sale.saleDate).toLocaleTimeString('en-PK', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>

              {selectedInvoice.sale.items && selectedInvoice.sale.items.length > 0 && (
                <div style={{ margin: '1.5rem 0' }}>
                  <table style={{ width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#F8FAFC' }}>
                        <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.7rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', borderRadius: '0.5rem 0 0 0.5rem' }}>
                          Item
                        </th>
                        <th style={{ textAlign: 'right', padding: '0.75rem 1rem', fontSize: '0.7rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>
                          Qty
                        </th>
                        <th style={{ textAlign: 'right', padding: '0.75rem 1rem', fontSize: '0.7rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>
                          Price
                        </th>
                        <th style={{ textAlign: 'right', padding: '0.75rem 1rem', fontSize: '0.7rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>
                          Disc
                        </th>
                        <th style={{ textAlign: 'right', padding: '0.75rem 1rem', fontSize: '0.7rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', borderRadius: '0 0.5rem 0.5rem 0' }}>
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.sale.items.map((item: any) => (
                        <tr key={item.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 500, color: '#0F172A' }}>
                            {item.productName}
                          </td>
                          <td style={{ padding: '0.75rem 1rem', textAlign: 'right', color: '#475569' }}>
                            {Number(item.quantity)} {item.unit}
                          </td>
                          <td style={{ padding: '0.75rem 1rem', textAlign: 'right', color: '#475569' }}>
                            Rs. {Number(item.unitPrice).toFixed(2)}
                          </td>
                          <td style={{ padding: '0.75rem 1rem', textAlign: 'right', color: '#94A3B8' }}>
                            {Number(item.discountAmount) > 0
                              ? `−Rs. ${Number(item.discountAmount).toFixed(2)}`
                              : '—'}
                          </td>
                          <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>
                            Rs. {Number(item.lineTotal).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <div style={{ width: '100%', maxWidth: '20rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#475569' }}>Subtotal</span>
                    <span style={{ color: '#0F172A', fontWeight: 500 }}>
                      Rs. {Number(selectedInvoice.sale.subtotal || 0).toFixed(2)}
                    </span>
                  </div>
                  {Number(selectedInvoice.sale.discountAmount) > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#475569' }}>Discount</span>
                      <span style={{ color: '#DC2626', fontWeight: 500 }}>
                        −Rs. {Number(selectedInvoice.sale.discountAmount).toFixed(2)}
                      </span>
                    </div>
                  )}
                  {Number(selectedInvoice.sale.taxAmount) > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#475569' }}>Tax</span>
                      <span style={{ color: '#0F172A', fontWeight: 500 }}>
                        Rs. {Number(selectedInvoice.sale.taxAmount).toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderTop: '2px solid #E2E8F0',
                      paddingTop: '0.5rem',
                      marginTop: '0.5rem',
                    }}
                  >
                    <span style={{ fontWeight: 'bold', color: '#0F172A', fontSize: '1.125rem' }}>Total</span>
                    <span style={{ fontWeight: 'bold', color: '#0F172A', fontSize: '1.125rem' }}>
                      Rs. {Number(selectedInvoice.sale.totalAmount).toFixed(2)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#475569' }}>Paid</span>
                    <span style={{ color: '#16A34A', fontWeight: 600 }}>
                      Rs. {Number(selectedInvoice.sale.amountPaid || 0).toFixed(2)}
                    </span>
                  </div>
                  {Number(selectedInvoice.sale.amountDue) > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#475569' }}>Balance Due</span>
                      <span style={{ color: '#DC2626', fontWeight: 600 }}>
                        Rs. {Number(selectedInvoice.sale.amountDue).toFixed(2)}
                      </span>
                    </div>
                  )}
                  {Number(selectedInvoice.sale.changeGiven) > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#475569' }}>Change Given</span>
                      <span style={{ color: '#0F172A', fontWeight: 500 }}>
                        Rs. {Number(selectedInvoice.sale.changeGiven).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
                <div style={{ fontSize: '0.875rem', color: '#475569' }}>
                  {shop?.invoiceFooter || 'Thank you for shopping with us!'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.75rem' }}>
                  This invoice was generated by InvoiceFlow Pakistan. Retain for your records.
                </div>
              </div>
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
      }

      @media (min-width: 768px) {
        .stats-grid-3 { grid-template-columns: repeat(3, 1fr) !important; }
        .filter-grid-3 { grid-template-columns: repeat(3, 1fr) !important; }
      }

      @media (min-width: 1024px) {
        .nav-desktop { display: flex !important; }
        .menu-btn { display: none !important; }
      }
    `}</style>
  );
}