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

type Tab = 'overview' | 'profit' | 'products' | 'customers' | 'receivables' | 'payables';

export default function ReportsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState<Tab>('overview');

  const today = new Date().toISOString().slice(0, 10);
  const firstOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    .toISOString()
    .slice(0, 10);
  const [from, setFrom] = useState(firstOfMonth);
  const [to, setTo] = useState(today);

  const [overview, setOverview] = useState<any>(null);
  const [profit, setProfit] = useState<any>(null);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [topCustomers, setTopCustomers] = useState<any[]>([]);
  const [receivables, setReceivables] = useState<any>(null);
  const [payables, setPayables] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      const params = new URLSearchParams({ from, to });

      const [overviewRes, profitRes, topProdRes, topCustRes, recRes, payRes] =
        await Promise.all([
          fetch(`${API}/reports/dashboard`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API}/reports/profit?${params}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API}/reports/top-products?${params}&limit=10`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API}/reports/top-customers?${params}&limit=10`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API}/reports/receivables`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API}/reports/payables`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

      if (overviewRes.ok) setOverview(await overviewRes.json());
      if (profitRes.ok) setProfit(await profitRes.json());
      if (topProdRes.ok) setTopProducts(await topProdRes.json());
      if (topCustRes.ok) setTopCustomers(await topCustRes.json());
      if (recRes.ok) setReceivables(await recRes.json());
      if (payRes.ok) setPayables(await payRes.json());

      if (overviewRes.status === 401) router.push('/login');
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
    { href: '/reports', label: 'Reports', active: true },
    { href: '/expenses', label: 'Expenses' },
    { href: '/settings', label: 'Settings' },
  ];

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'profit', label: 'Profit & Loss', icon: '💰' },
    { id: 'products', label: 'Top Products', icon: '📦' },
    { id: 'customers', label: 'Top Customers', icon: '👥' },
    { id: 'receivables', label: 'Receivables', icon: '📥' },
    { id: 'payables', label: 'Payables', icon: '📤' },
  ];

  // Shared input style
  const inputStyle: React.CSSProperties = {
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
            Reports
          </h1>
          <p style={{ color: THEME.textMuted, fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Business insights, profit analysis, and outstanding balances
          </p>
        </div>

        {/* ========== DATE FILTERS ========== */}
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
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: '0.75rem' }}>
            <div>
              <label style={labelStyle}>From</label>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>To</label>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                style={inputStyle}
              />
            </div>
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
              Apply
            </button>
            <button
              onClick={() => {
                setFrom(firstOfMonth);
                setTo(today);
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
              This Month
            </button>
            <button
              onClick={() => {
                const d = new Date();
                d.setDate(d.getDate() - 6);
                setFrom(d.toISOString().slice(0, 10));
                setTo(today);
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
              Last 7 Days
            </button>
          </div>
        </div>

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
                background:
                  tab === t.id ? THEME.gradient : 'transparent',
                color: tab === t.id ? '#FFFFFF' : THEME.textMuted,
                border: tab === t.id
                  ? '1px solid rgba(124, 58, 237, 0.4)'
                  : '1px solid transparent',
                boxShadow:
                  tab === t.id
                    ? '0 0 20px rgba(124, 58, 237, 0.3)'
                    : 'none',
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
            Loading reports...
          </div>
        ) : (
          <>
            {/* ============ OVERVIEW TAB ============ */}
            {tab === 'overview' && overview && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    gap: '1rem',
                  }}
                  className="grid-4"
                >
                  <KPICard
                    label="Today's Sales"
                    value={`Rs. ${Number(overview.today?.totalSales || 0).toLocaleString()}`}
                    sub={`${overview.today?.salesCount || 0} transactions`}
                    color="purple"
                  />
                  <KPICard
                    label="Cash Received"
                    value={`Rs. ${Number(overview.today?.totalReceived || 0).toLocaleString()}`}
                    sub={`Due: Rs. ${Number(overview.today?.totalDue || 0).toLocaleString()}`}
                    color="green"
                  />
                  <KPICard
                    label="Gross Profit"
                    value={`Rs. ${Number(overview.today?.grossProfit || 0).toLocaleString()}`}
                    sub={`Expenses: Rs. ${Number(overview.today?.expenses || 0).toLocaleString()}`}
                    color="cyan"
                  />
                  <KPICard
                    label="Operating Profit"
                    value={`Rs. ${Number(overview.today?.operatingProfit || 0).toLocaleString()}`}
                    sub="Profit − expenses"
                    color="orange"
                  />
                </div>

                {/* ============ KPI BAR CHART ============ */}
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
                  <h3 style={{ fontWeight: 'bold', color: THEME.text, marginBottom: '1.25rem', fontSize: '1rem' }}>
                    Today&apos;s Financial Snapshot
                  </h3>
                  <BarChart
                    data={[
                      {
                        label: 'Sales',
                        value: Number(overview.today?.totalSales || 0),
                        color: '#7C3AED',
                      },
                      {
                        label: 'Received',
                        value: Number(overview.today?.totalReceived || 0),
                        color: '#10B981',
                      },
                      {
                        label: 'Gross Profit',
                        value: Number(overview.today?.grossProfit || 0),
                        color: '#06B6D4',
                      },
                      {
                        label: 'Expenses',
                        value: Number(overview.today?.expenses || 0),
                        color: '#EF4444',
                      },
                      {
                        label: 'Op. Profit',
                        value: Math.max(0, Number(overview.today?.operatingProfit || 0)),
                        color: '#F97316',
                      },
                    ]}
                  />
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    gap: '1rem',
                  }}
                  className="grid-4"
                >
                  <KPICard
                    label="Total Products"
                    value={`${overview.inventory?.totalProducts || 0}`}
                    sub={`${overview.inventory?.lowStockCount || 0} low · ${overview.inventory?.outOfStockCount || 0} out`}
                    color="purple"
                  />
                  <KPICard
                    label="Total Customers"
                    value={`${overview.customers?.totalCustomers || 0}`}
                    sub={`${overview.customers?.customersWithBalance || 0} with balance`}
                    color="green"
                  />
                  <KPICard
                    label="Receivable"
                    value={`Rs. ${Number(overview.customers?.totalReceivable || 0).toLocaleString()}`}
                    sub="Owed by customers"
                    color="red"
                  />
                  <KPICard
                    label="Payable"
                    value={`Rs. ${Number(overview.suppliers?.totalPayable || 0).toLocaleString()}`}
                    sub="Owed to suppliers"
                    color="orange"
                  />
                </div>

                {/* ============ INVENTORY DONUT ============ */}
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
                  <h3 style={{ fontWeight: 'bold', color: THEME.text, marginBottom: '1.25rem', fontSize: '1rem' }}>
                    Inventory Status
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    <DonutChart
                      segments={[
                        {
                          label: 'In Stock',
                          value: Math.max(
                            0,
                            Number(overview.inventory?.totalProducts || 0) -
                              Number(overview.inventory?.lowStockCount || 0) -
                              Number(overview.inventory?.outOfStockCount || 0)
                          ),
                          color: '#10B981',
                        },
                        {
                          label: 'Low Stock',
                          value: Number(overview.inventory?.lowStockCount || 0),
                          color: '#F97316',
                        },
                        {
                          label: 'Out of Stock',
                          value: Number(overview.inventory?.outOfStockCount || 0),
                          color: '#EF4444',
                        },
                      ]}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <LegendItem color="#10B981" label="In Stock" />
                      <LegendItem color="#F97316" label="Low Stock" />
                      <LegendItem color="#EF4444" label="Out of Stock" />
                    </div>
                  </div>
                </div>

                {overview.recentSales && overview.recentSales.length > 0 && (
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
                    <h3 style={{ fontWeight: 'bold', color: THEME.text, marginBottom: '1rem' }}>
                      Recent Sales
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {overview.recentSales.map((s: any) => (
                        <div
                          key={s.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.5rem 0',
                            borderBottom: '1px solid rgba(148, 163, 184, 0.08)',
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontFamily: 'monospace',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: THEME.text,
                              }}
                            >
                              {s.invoiceNumber}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: THEME.textDim }}>
                              {new Date(s.saleDate).toLocaleString('en-PK')}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: 600, color: '#C4B5FD' }}>
                              Rs. {Number(s.totalAmount).toLocaleString()}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: THEME.textDim }}>
                              {s.customer?.name || 'Walk-in'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============ PROFIT TAB ============ */}
            {tab === 'profit' && profit && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    gap: '1rem',
                  }}
                  className="grid-3"
                >
                  <KPICard
                    label="Net Sales"
                    value={`Rs. ${Number(profit.sales?.netSales || 0).toLocaleString()}`}
                    sub={`${profit.sales?.count || 0} sales`}
                    color="purple"
                  />
                  <KPICard
                    label="Cost of Goods Sold"
                    value={`Rs. ${Number(profit.profit?.cogs || 0).toLocaleString()}`}
                    sub="What you paid for sold stock"
                    color="orange"
                  />
                  <KPICard
                    label="Gross Profit"
                    value={`Rs. ${Number(profit.profit?.grossProfit || 0).toLocaleString()}`}
                    sub={`${profit.profit?.grossMargin || 0}% margin`}
                    color="green"
                  />
                </div>

                {/* ============ PROFIT WATERFALL BAR CHART ============ */}
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
                  <h3 style={{ fontWeight: 'bold', color: THEME.text, marginBottom: '1.25rem', fontSize: '1rem' }}>
                    Profit Breakdown
                  </h3>
                  <BarChart
                    data={[
                      {
                        label: 'Net Sales',
                        value: Number(profit.sales?.netSales || 0),
                        color: '#7C3AED',
                      },
                      {
                        label: 'COGS',
                        value: Number(profit.profit?.cogs || 0),
                        color: '#EF4444',
                      },
                      {
                        label: 'Gross Profit',
                        value: Number(profit.profit?.grossProfit || 0),
                        color: '#10B981',
                      },
                      {
                        label: 'Expenses',
                        value: Number(profit.expenses?.total || 0),
                        color: '#F97316',
                      },
                      {
                        label: 'Op. Profit',
                        value: Math.max(0, Number(profit.profit?.operatingProfit || 0)),
                        color: '#06B6D4',
                      },
                    ]}
                  />
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    gap: '1rem',
                  }}
                  className="grid-3"
                >
                  <KPICard
                    label="Total Discount"
                    value={`Rs. ${Number(profit.sales?.discount || 0).toLocaleString()}`}
                    sub="Given to customers"
                    color="purple"
                  />
                  <KPICard
                    label="Operating Expenses"
                    value={`Rs. ${Number(profit.expenses?.total || 0).toLocaleString()}`}
                    sub={`${profit.expenses?.count || 0} expenses`}
                    color="orange"
                  />
                  <KPICard
                    label="Operating Profit"
                    value={`Rs. ${Number(profit.profit?.operatingProfit || 0).toLocaleString()}`}
                    sub={`${profit.profit?.operatingMargin || 0}% margin`}
                    color="green"
                  />
                </div>

                {profit.expenses?.breakdown && profit.expenses.breakdown.length > 0 && (
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
                    <h3 style={{ fontWeight: 'bold', color: THEME.text, marginBottom: '1rem' }}>
                      Expenses by Category
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {profit.expenses.breakdown.map((e: any) => {
                        const pct =
                          profit.expenses.total > 0
                            ? (e.amount / profit.expenses.total) * 100
                            : 0;
                        return (
                          <div key={e.category}>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '0.875rem',
                                marginBottom: '0.25rem',
                              }}
                            >
                              <span style={{ fontWeight: 500, color: THEME.textMuted }}>
                                {e.category.charAt(0) +
                                  e.category.slice(1).toLowerCase()}
                              </span>
                              <span style={{ fontWeight: 600, color: THEME.text }}>
                                Rs. {Number(e.amount).toLocaleString()}
                              </span>
                            </div>
                            <div
                              style={{
                                width: '100%',
                                background: 'rgba(10, 14, 26, 0.6)',
                                borderRadius: '9999px',
                                height: '0.5rem',
                                overflow: 'hidden',
                              }}
                            >
                              <div
                                style={{
                                  width: `${pct}%`,
                                  height: '100%',
                                  background: THEME.gradient,
                                  borderRadius: '9999px',
                                  transition: 'width 0.5s ease',
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============ TOP PRODUCTS TAB ============ */}
            {tab === 'products' && (
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
                <div
                  style={{
                    padding: '1rem 1.5rem',
                    borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
                  }}
                >
                  <h3 style={{ fontWeight: 'bold', color: THEME.text, margin: 0 }}>
                    Top Selling Products
                  </h3>
                </div>

                {topProducts.length === 0 ? (
                  <div style={{ padding: '3rem', textAlign: 'center', color: THEME.textMuted }}>
                    No sales in this period
                  </div>
                ) : (
                  <>
                    {/* Horizontal bar chart */}
                    <div style={{ padding: '1.5rem' }}>
                      <HBarChart
                        data={topProducts.slice(0, 6).map((p: any) => ({
                          label: p.productName,
                          value: Number(p.totalRevenue),
                          sub: `${Number(p.totalQuantity).toLocaleString()} sold`,
                        }))}
                      />
                    </div>

                    <div style={{ overflowX: 'auto', borderTop: '1px solid rgba(148, 163, 184, 0.15)' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead
                          style={{
                            background: 'rgba(10, 14, 26, 0.6)',
                            borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
                          }}
                        >
                          <tr>
                            {['#', 'Product', 'Qty Sold', 'Revenue', 'Profit'].map(
                              (h, i) => (
                                <th
                                  key={h}
                                  style={{
                                    textAlign:
                                      i === 0
                                        ? 'center'
                                        : i === 1
                                          ? 'left'
                                          : 'right',
                                    padding: '0.75rem 1rem',
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
                          {topProducts.map((p: any, i: number) => (
                            <tr
                              key={p.productId}
                              style={{
                                borderBottom: '1px solid rgba(148, 163, 184, 0.08)',
                              }}
                            >
                              <td
                                style={{
                                  padding: '0.75rem 1rem',
                                  textAlign: 'center',
                                  fontSize: '0.875rem',
                                  color: THEME.textDim,
                                }}
                              >
                                {i + 1}
                              </td>
                              <td
                                style={{
                                  padding: '0.75rem 1rem',
                                  fontWeight: 500,
                                  color: THEME.text,
                                  fontSize: '0.875rem',
                                }}
                              >
                                {p.productName}
                              </td>
                              <td
                                style={{
                                  padding: '0.75rem 1rem',
                                  textAlign: 'right',
                                  fontSize: '0.875rem',
                                  color: THEME.textMuted,
                                }}
                              >
                                {Number(p.totalQuantity).toLocaleString()}
                              </td>
                              <td
                                style={{
                                  padding: '0.75rem 1rem',
                                  textAlign: 'right',
                                  fontWeight: 600,
                                  color: '#C4B5FD',
                                  fontSize: '0.875rem',
                                }}
                              >
                                Rs. {Number(p.totalRevenue).toLocaleString()}
                              </td>
                              <td
                                style={{
                                  padding: '0.75rem 1rem',
                                  textAlign: 'right',
                                  fontWeight: 600,
                                  color: THEME.green,
                                  fontSize: '0.875rem',
                                }}
                              >
                                Rs. {Number(p.totalProfit).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ============ TOP CUSTOMERS TAB ============ */}
            {tab === 'customers' && (
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
                <div
                  style={{
                    padding: '1rem 1.5rem',
                    borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
                  }}
                >
                  <h3 style={{ fontWeight: 'bold', color: THEME.text, margin: 0 }}>
                    Top Customers
                  </h3>
                </div>

                {topCustomers.length === 0 ? (
                  <div style={{ padding: '3rem', textAlign: 'center', color: THEME.textMuted }}>
                    No customer sales in this period
                  </div>
                ) : (
                  <>
                    <div style={{ padding: '1.5rem' }}>
                      <HBarChart
                        data={topCustomers.slice(0, 6).map((c: any) => ({
                          label: c.name,
                          value: Number(c.totalPurchases),
                          sub: `${c.saleCount} purchases`,
                        }))}
                      />
                    </div>

                    <div style={{ overflowX: 'auto', borderTop: '1px solid rgba(148, 163, 184, 0.15)' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead
                          style={{
                            background: 'rgba(10, 14, 26, 0.6)',
                            borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
                          }}
                        >
                          <tr>
                            {['#', 'Customer', 'Phone', 'Sales', 'Total Purchases'].map(
                              (h, i) => (
                                <th
                                  key={h}
                                  style={{
                                    textAlign:
                                      i === 0
                                        ? 'center'
                                        : i === 1 || i === 2
                                          ? 'left'
                                          : 'right',
                                    padding: '0.75rem 1rem',
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
                          {topCustomers.map((c: any, i: number) => (
                            <tr
                              key={c.customerId}
                              style={{
                                borderBottom: '1px solid rgba(148, 163, 184, 0.08)',
                              }}
                            >
                              <td
                                style={{
                                  padding: '0.75rem 1rem',
                                  textAlign: 'center',
                                  fontSize: '0.875rem',
                                  color: THEME.textDim,
                                }}
                              >
                                {i + 1}
                              </td>
                              <td
                                style={{
                                  padding: '0.75rem 1rem',
                                  fontWeight: 500,
                                  color: THEME.text,
                                  fontSize: '0.875rem',
                                }}
                              >
                                {c.name}
                              </td>
                              <td
                                style={{
                                  padding: '0.75rem 1rem',
                                  fontSize: '0.875rem',
                                  color: THEME.textMuted,
                                }}
                              >
                                {c.phone || '—'}
                              </td>
                              <td
                                style={{
                                  padding: '0.75rem 1rem',
                                  textAlign: 'right',
                                  fontSize: '0.875rem',
                                  color: THEME.textMuted,
                                }}
                              >
                                {c.saleCount}
                              </td>
                              <td
                                style={{
                                  padding: '0.75rem 1rem',
                                  textAlign: 'right',
                                  fontWeight: 600,
                                  color: '#C4B5FD',
                                  fontSize: '0.875rem',
                                }}
                              >
                                Rs. {Number(c.totalPurchases).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ============ RECEIVABLES TAB ============ */}
            {tab === 'receivables' && receivables && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    gap: '1rem',
                  }}
                  className="grid-3"
                >
                  <KPICard
                    label="Total Receivable"
                    value={`Rs. ${Number(receivables.totalReceivable || 0).toLocaleString()}`}
                    sub="Owed by customers"
                    color="red"
                  />
                  <KPICard
                    label="Customers with Balance"
                    value={`${receivables.customerCount || 0}`}
                    sub="Need follow-up"
                    color="orange"
                  />
                  <KPICard
                    label="Average Owed"
                    value={`Rs. ${
                      receivables.customerCount > 0
                        ? Math.round(
                            Number(receivables.totalReceivable) /
                              receivables.customerCount
                          ).toLocaleString()
                        : 0
                    }`}
                    sub="Per customer"
                    color="purple"
                  />
                </div>

                {receivables.customers?.length > 0 && (
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
                    <h3 style={{ fontWeight: 'bold', color: THEME.text, marginBottom: '1rem' }}>
                      Top Outstanding Balances
                    </h3>
                    <HBarChart
                      data={receivables.customers
                        .slice(0, 6)
                        .map((c: any) => ({
                          label: c.name,
                          value: Number(c.totalOwed),
                          sub: c.phone || '—',
                        }))}
                      color="#EF4444"
                    />
                  </div>
                )}

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
                  <div
                    style={{
                      padding: '1rem 1.5rem',
                      borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
                    }}
                  >
                    <h3 style={{ fontWeight: 'bold', color: THEME.text, margin: 0 }}>
                      Customer Balances (Udhaar)
                    </h3>
                  </div>
                  {receivables.customers?.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: THEME.textMuted }}>
                      No outstanding balances — all clear! 🎉
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
                            {['Customer', 'Phone', 'Credit Limit', 'Total Owed'].map(
                              (h, i) => (
                                <th
                                  key={h}
                                  style={{
                                    textAlign: i < 2 ? 'left' : 'right',
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
                          {receivables.customers.map((c: any) => (
                            <tr
                              key={c.id}
                              style={{
                                borderBottom: '1px solid rgba(148, 163, 184, 0.08)',
                              }}
                            >
                              <td
                                style={{
                                  padding: '1rem 1.5rem',
                                  fontWeight: 500,
                                  color: THEME.text,
                                }}
                              >
                                {c.name}
                              </td>
                              <td
                                style={{
                                  padding: '1rem 1.5rem',
                                  fontSize: '0.875rem',
                                  color: THEME.textMuted,
                                }}
                              >
                                {c.phone || '—'}
                              </td>
                              <td
                                style={{
                                  padding: '1rem 1.5rem',
                                  textAlign: 'right',
                                  fontSize: '0.875rem',
                                  color: THEME.textMuted,
                                }}
                              >
                                {Number(c.creditLimit) > 0
                                  ? `Rs. ${Number(c.creditLimit).toLocaleString()}`
                                  : '—'}
                              </td>
                              <td
                                style={{
                                  padding: '1rem 1.5rem',
                                  textAlign: 'right',
                                  fontWeight: 600,
                                  color: '#FCA5A5',
                                }}
                              >
                                Rs. {Number(c.totalOwed).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ============ PAYABLES TAB ============ */}
            {tab === 'payables' && payables && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    gap: '1rem',
                  }}
                  className="grid-3"
                >
                  <KPICard
                    label="Total Payable"
                    value={`Rs. ${Number(payables.totalPayable || 0).toLocaleString()}`}
                    sub="You owe suppliers"
                    color="orange"
                  />
                  <KPICard
                    label="Suppliers with Balance"
                    value={`${payables.supplierCount || 0}`}
                    sub="Need payment"
                    color="red"
                  />
                  <KPICard
                    label="Average Payable"
                    value={`Rs. ${
                      payables.supplierCount > 0
                        ? Math.round(
                            Number(payables.totalPayable) / payables.supplierCount
                          ).toLocaleString()
                        : 0
                    }`}
                    sub="Per supplier"
                    color="purple"
                  />
                </div>

                {payables.suppliers?.length > 0 && (
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
                    <h3 style={{ fontWeight: 'bold', color: THEME.text, marginBottom: '1rem' }}>
                      Top Outstanding Payables
                    </h3>
                    <HBarChart
                      data={payables.suppliers.slice(0, 6).map((s: any) => ({
                        label: s.name,
                        value: Number(s.totalOwed),
                        sub: s.companyName || '—',
                      }))}
                      color="#F97316"
                    />
                  </div>
                )}

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
                  <div
                    style={{
                      padding: '1rem 1.5rem',
                      borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
                    }}
                  >
                    <h3 style={{ fontWeight: 'bold', color: THEME.text, margin: 0 }}>
                      Supplier Balances
                    </h3>
                  </div>
                  {payables.suppliers?.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: THEME.textMuted }}>
                      No outstanding payables — you&apos;re all paid up! 🎉
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
                            {['Supplier', 'Company', 'Phone', 'Total Owed'].map(
                              (h, i) => (
                                <th
                                  key={h}
                                  style={{
                                    textAlign: i < 3 ? 'left' : 'right',
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
                          {payables.suppliers.map((s: any) => (
                            <tr
                              key={s.id}
                              style={{
                                borderBottom: '1px solid rgba(148, 163, 184, 0.08)',
                              }}
                            >
                              <td
                                style={{
                                  padding: '1rem 1.5rem',
                                  fontWeight: 500,
                                  color: THEME.text,
                                }}
                              >
                                {s.name}
                              </td>
                              <td
                                style={{
                                  padding: '1rem 1.5rem',
                                  fontSize: '0.875rem',
                                  color: THEME.textMuted,
                                }}
                              >
                                {s.companyName || '—'}
                              </td>
                              <td
                                style={{
                                  padding: '1rem 1.5rem',
                                  fontSize: '0.875rem',
                                  color: THEME.textMuted,
                                }}
                              >
                                {s.phone || '—'}
                              </td>
                              <td
                                style={{
                                  padding: '1rem 1.5rem',
                                  textAlign: 'right',
                                  fontWeight: 600,
                                  color: '#FDBA74',
                                }}
                              >
                                Rs. {Number(s.totalOwed).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

// ============================================================
// KPI CARD
// ============================================================
function KPICard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: 'purple' | 'green' | 'cyan' | 'orange' | 'red';
}) {
  const colors: Record<string, { bg: string; color: string }> = {
    purple: { bg: 'rgba(124, 58, 237, 0.15)', color: '#C4B5FD' },
    green: { bg: 'rgba(16, 185, 129, 0.15)', color: '#6EE7B7' },
    cyan: { bg: 'rgba(6, 182, 212, 0.15)', color: '#67E8F9' },
    orange: { bg: 'rgba(249, 115, 22, 0.15)', color: '#FDBA74' },
    red: { bg: 'rgba(239, 68, 68, 0.15)', color: '#FCA5A5' },
  };
  const c = colors[color];
  return (
    <div
      style={{
        background: THEME.glass,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${THEME.glassBorder}`,
        borderRadius: '0.75rem',
        padding: '1.25rem',
        transition: 'all 0.2s',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          padding: '0.25rem 0.625rem',
          borderRadius: '0.375rem',
          fontSize: '0.7rem',
          fontWeight: 600,
          marginBottom: '0.75rem',
          background: c.bg,
          color: c.color,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: THEME.text }}>
        {value}
      </div>
      <div style={{ fontSize: '0.75rem', color: THEME.textDim, marginTop: '0.25rem' }}>
        {sub}
      </div>
    </div>
  );
}

// ============================================================
// VERTICAL BAR CHART
// ============================================================
function BarChart({
  data,
}: {
  data: { label: string; value: number; color: string }[];
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        gap: '0.75rem',
        height: '14rem',
        padding: '0 0.5rem',
      }}
    >
      {data.map((d, i) => {
        const heightPct = (d.value / max) * 100;
        return (
          <div
            key={i}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              height: '100%',
              justifyContent: 'flex-end',
            }}
          >
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                color: THEME.text,
                whiteSpace: 'nowrap',
              }}
            >
              Rs. {Math.round(d.value).toLocaleString()}
            </div>
            <div
              style={{
                width: '100%',
                maxWidth: '4rem',
                height: `${Math.max(heightPct, 2)}%`,
                background: `linear-gradient(to top, ${d.color}, ${d.color}CC)`,
                borderRadius: '0.5rem 0.5rem 0 0',
                boxShadow: `0 0 20px ${d.color}40`,
                transition: 'height 0.5s ease',
                minHeight: '0.25rem',
              }}
            />
            <div
              style={{
                fontSize: '0.7rem',
                color: THEME.textMuted,
                fontWeight: 500,
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              {d.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// HORIZONTAL BAR CHART
// ============================================================
function HBarChart({
  data,
  color = '#7C3AED',
}: {
  data: { label: string; value: number; sub?: string }[];
  color?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {data.map((d, i) => {
        const pct = (d.value / max) * 100;
        return (
          <div key={i}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '0.375rem',
                gap: '0.75rem',
              }}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: THEME.text,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {d.label}
                </div>
                {d.sub && (
                  <div style={{ fontSize: '0.7rem', color: THEME.textDim }}>
                    {d.sub}
                  </div>
                )}
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#C4B5FD',
                  whiteSpace: 'nowrap',
                }}
              >
                Rs. {Math.round(d.value).toLocaleString()}
              </div>
            </div>
            <div
              style={{
                width: '100%',
                background: 'rgba(10, 14, 26, 0.6)',
                borderRadius: '9999px',
                height: '0.625rem',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: '100%',
                  background: `linear-gradient(to right, ${color}, ${color}99)`,
                  borderRadius: '9999px',
                  boxShadow: `0 0 12px ${color}60`,
                  transition: 'width 0.5s ease',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// DONUT CHART
// ============================================================
function DonutChart({
  segments,
}: {
  segments: { label: string; value: number; color: string }[];
}) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  const size = 160;
  const stroke = 22;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  if (total === 0) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '9999px',
          border: `${stroke}px solid rgba(148, 163, 184, 0.2)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: THEME.textDim,
          fontSize: '0.875rem',
        }}
      >
        No data
      </div>
    );
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(10, 14, 26, 0.6)"
        strokeWidth={stroke}
      />
      {segments.map((seg, i) => {
        const pct = seg.value / total;
        const dash = pct * circumference;
        const el = (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={stroke}
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: 'stroke-dasharray 0.5s ease' }}
          />
        );
        offset += dash;
        return el;
      })}
      <text
        x="50%"
        y="46%"
        textAnchor="middle"
        fill={THEME.text}
        fontSize="1.5rem"
        fontWeight="bold"
      >
        {total}
      </text>
      <text
        x="50%"
        y="60%"
        textAnchor="middle"
        fill={THEME.textMuted}
        fontSize="0.7rem"
        fontWeight="500"
      >
        Products
      </text>
    </svg>
  );
}

// ============================================================
// LEGEND ITEM
// ============================================================
function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span
        style={{
          width: '0.75rem',
          height: '0.75rem',
          borderRadius: '0.25rem',
          background: color,
          boxShadow: `0 0 12px ${color}80`,
        }}
      />
      <span style={{ fontSize: '0.875rem', color: THEME.textMuted }}>{label}</span>
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
        .grid-3 { grid-template-columns: repeat(3, 1fr) !important; }
        .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
      }

      @media (min-width: 1024px) {
        .nav-desktop { display: flex !important; }
        .menu-btn { display: none !important; }
        .grid-4 { grid-template-columns: repeat(4, 1fr) !important; }
      }
    `}</style>
  );
}