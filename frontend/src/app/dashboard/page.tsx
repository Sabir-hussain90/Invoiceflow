'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// ============================================================
// THEME — Matches RAGChat dark color scheme
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
  gradientPurple: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
  gradientGreen: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
  gradientOrange: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
  gradientPink: 'linear-gradient(135deg, #EC4899 0%, #7C3AED 100%)',
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

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
        const res = await fetch(`${API}/reports/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) setStats(await res.json());
        if (res.status === 401) router.push('/login');
      } catch {}
      setLoading(false);
    })();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.push('/');
  };

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', active: true },
    { href: '/pos', label: 'POS' },
    { href: '/products', label: 'Products' },
    { href: '/sales', label: 'Sales' },
    { href: '/invoices', label: 'Invoices' },
    { href: '/reports', label: 'Reports' },
    { href: '/expenses', label: 'Expenses' },
    { href: '/settings', label: 'Settings' },
  ];

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: THEME.pageBg,
          color: THEME.text,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '3rem',
              height: '3rem',
              margin: '0 auto 1rem',
              borderRadius: '9999px',
              background: THEME.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 30px rgba(124, 58, 237, 0.5)',
            }}
          >
            <span
              style={{
                width: '1.5rem',
                height: '1.5rem',
                border: '3px solid #FFFFFF',
                borderTopColor: 'transparent',
                borderRadius: '9999px',
                animation: 'spin 1s linear infinite',
                display: 'inline-block',
              }}
            />
          </div>
          <p style={{ color: THEME.textMuted, fontSize: '0.875rem' }}>
            Loading dashboard...
          </p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: THEME.pageBg,
        color: THEME.text,
        position: 'relative',
      }}
    >
      <GlobalStyles />

      {/* NAVBAR */}
      <nav
        style={{
          width: '100%',
          borderBottom: '1px solid rgba(30, 41, 59, 0.5)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          background: 'rgba(2, 6, 23, 0.4)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '0.9rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link
            href="/dashboard"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
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
                fontSize: '1.125rem',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)',
              }}
            >
              ◈
            </div>
            <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#FFFFFF' }}>
              InvoiceFlow
            </span>
          </Link>

          {/* Desktop nav */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.25rem',
            }}
            className="lg-nav"
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
                  color: item.active ? '#FFFFFF' : THEME.textMuted,
                  background: item.active
                    ? 'rgba(124, 58, 237, 0.2)'
                    : 'transparent',
                  border: item.active
                    ? '1px solid rgba(124, 58, 237, 0.4)'
                    : '1px solid transparent',
                  transition: 'all 0.2s',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {user && (
              <div
                style={{ textAlign: 'right', display: 'none' }}
                className="sm-show"
              >
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>
                  {user.fullName}
                </div>
                <div
                  style={{
                    fontSize: '0.7rem',
                    background: THEME.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: 600,
                  }}
                >
                  {user.role}
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              style={{
                display: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid #334155',
                background: 'transparent',
                color: '#CBD5E1',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'all 0.2s',
              }}
              className="sm-show-btn"
            >
              Logout
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #334155',
                background: 'transparent',
                color: '#CBD5E1',
                cursor: 'pointer',
              }}
              className="lg-hide"
              aria-label="Menu"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              padding: '1rem 1.5rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem',
            }}
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
                  textDecoration: 'none',
                  textAlign: 'center',
                  color: item.active ? '#FFFFFF' : THEME.textMuted,
                  background: item.active
                    ? 'rgba(124, 58, 237, 0.2)'
                    : 'rgba(20, 27, 45, 0.6)',
                  border: '1px solid rgba(124, 58, 237, 0.2)',
                }}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              style={{
                gridColumn: 'span 2',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#FCA5A5',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* MAIN */}
      <main
        style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '2rem 1.5rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Welcome header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h1
            style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              background: THEME.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.25rem',
              lineHeight: 1.2,
            }}
          >
            Welcome back, {user?.fullName?.split(' ')[0] || 'Owner'}!
          </h1>
          <p style={{ color: THEME.textMuted, fontSize: '0.9rem', margin: 0 }}>
            Here is your shop&apos;s snapshot for today
          </p>
        </div>

        {/* Today's KPIs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <KPICard
            label="Today's Sales"
            value={`Rs. ${Number(stats?.today?.totalSales || 0).toLocaleString()}`}
            sub={`${stats?.today?.salesCount || 0} transactions`}
            gradient={THEME.gradient}
            icon="💰"
          />
          <KPICard
            label="Cash Received"
            value={`Rs. ${Number(stats?.today?.totalReceived || 0).toLocaleString()}`}
            sub={`Due: Rs. ${Number(stats?.today?.totalDue || 0).toLocaleString()}`}
            gradient={THEME.gradientGreen}
            icon="💵"
          />
          <KPICard
            label="Gross Profit"
            value={`Rs. ${Number(stats?.today?.grossProfit || 0).toLocaleString()}`}
            sub={`Expenses: Rs. ${Number(stats?.today?.expenses || 0).toLocaleString()}`}
            gradient={THEME.gradientPurple}
            icon="📈"
          />
          <KPICard
            label="Operating Profit"
            value={`Rs. ${Number(stats?.today?.operatingProfit || 0).toLocaleString()}`}
            sub="Profit − expenses"
            gradient={THEME.gradientOrange}
            icon="🎯"
          />
        </div>

        {/* Inventory + Balances */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <KPICard
            label="Total Products"
            value={`${stats?.inventory?.totalProducts || 0}`}
            sub={`${stats?.inventory?.lowStockCount || 0} low · ${stats?.inventory?.outOfStockCount || 0} out`}
            gradient={THEME.gradient}
            icon="📦"
          />
          <KPICard
            label="Total Customers"
            value={`${stats?.customers?.totalCustomers || 0}`}
            sub={`${stats?.customers?.customersWithBalance || 0} with udhaar`}
            gradient={THEME.gradientGreen}
            icon="👥"
          />
          <KPICard
            label="Receivable"
            value={`Rs. ${Number(stats?.customers?.totalReceivable || 0).toLocaleString()}`}
            sub="Owed by customers"
            gradient={THEME.gradientPink}
            icon="📥"
          />
          <KPICard
            label="Payable"
            value={`Rs. ${Number(stats?.suppliers?.totalPayable || 0).toLocaleString()}`}
            sub="Owed to suppliers"
            gradient={THEME.gradientOrange}
            icon="📤"
          />
        </div>

        {/* Quick Actions + Shop Overview */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            marginBottom: '1.5rem',
          }}
        >
          <GlassCard>
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: 'bold',
                background: THEME.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '1rem',
              }}
            >
              Quick Actions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <ActionLink
                href="/pos"
                emoji="🛒"
                title="Start a POS sale"
                subtitle="Fast counter billing"
                accent="rgba(124, 58, 237, 0.15)"
                accentBorder="rgba(124, 58, 237, 0.3)"
              />
              <ActionLink
                href="/products"
                emoji="📦"
                title="Add or manage products"
                subtitle="Update your catalog"
                accent="rgba(16, 185, 129, 0.15)"
                accentBorder="rgba(16, 185, 129, 0.3)"
              />
              <ActionLink
                href="/reports"
                emoji="📊"
                title="View reports"
                subtitle="Sales, profit, stock"
                accent="rgba(6, 182, 212, 0.15)"
                accentBorder="rgba(6, 182, 212, 0.3)"
              />
            </div>
          </GlassCard>

          <GlassCard>
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: 'bold',
                background: THEME.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '1rem',
              }}
            >
              Shop Overview
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <OverviewRow
                label="Products"
                value={`${stats?.inventory?.totalProducts || 0}`}
                valueColor="#67E8F9"
              />
              <OverviewRow
                label="Customers"
                value={`${stats?.customers?.totalCustomers || 0}`}
                valueColor="#4ADE80"
              />
              <OverviewRow
                label="Low Stock Items"
                value={`${stats?.inventory?.lowStockCount || 0}`}
                valueColor="#FCD34D"
              />
              <OverviewRow
                label="Out of Stock"
                value={`${stats?.inventory?.outOfStockCount || 0}`}
                valueColor="#FCA5A5"
                last
              />
            </div>
          </GlassCard>
        </div>

        {/* Recent Sales */}
        {stats?.recentSales && stats.recentSales.length > 0 && (
          <GlassCard>
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
                  background: THEME.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  margin: 0,
                }}
              >
                Recent Sales
              </h3>
              <Link
                href="/sales"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  background: THEME.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textDecoration: 'none',
                }}
              >
                View all →
              </Link>
            </div>
            <div>
              {stats.recentSales.map((sale: any, idx: number) => (
                <div
                  key={sale.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem 0',
                    borderBottom:
                      idx < stats.recentSales.length - 1
                        ? '1px solid rgba(148, 163, 184, 0.15)'
                        : 'none',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#FFFFFF',
                      }}
                    >
                      {sale.invoiceNumber}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: THEME.textDim }}>
                      {new Date(sale.saleDate).toLocaleString('en-PK', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 600, color: '#FFFFFF' }}>
                      Rs. {Number(sale.totalAmount).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: THEME.textDim }}>
                      {sale.customer?.name || 'Walk-in'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Empty state */}
        {(!stats?.recentSales || stats.recentSales.length === 0) && (
          <GlassCard style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                background: THEME.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '0.5rem',
              }}
            >
              Welcome to InvoiceFlow Pakistan!
            </h3>
            <p
              style={{
                color: THEME.textMuted,
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
                maxWidth: '28rem',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Get started by adding your first products and making a sale.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
              <Link
                href="/products"
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  background: THEME.gradient,
                  color: '#FFFFFF',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
                  fontSize: '0.9rem',
                }}
              >
                Add Products
              </Link>
              <Link
                href="/pos"
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  background: 'rgba(124, 58, 237, 0.15)',
                  border: '1px solid rgba(124, 58, 237, 0.3)',
                  color: '#C4B5FD',
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                }}
              >
                Open POS
              </Link>
            </div>
          </GlassCard>
        )}
      </main>
    </div>
  );
}

// ============================================================
// SUB COMPONENTS
// ============================================================

function KPICard({
  label,
  value,
  sub,
  gradient,
  icon,
}: {
  label: string;
  value: string;
  sub: string;
  gradient: string;
  icon: string;
}) {
  return (
    <div
      style={{
        background: THEME.glass,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${THEME.glassBorder}`,
        borderRadius: '1rem',
        padding: '1.25rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: gradient,
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '0.75rem',
        }}
      >
        <div
          style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '0.75rem',
            background: gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          {icon}
        </div>
        <div
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            color: THEME.textMuted,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {label}
        </div>
      </div>
      <div
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#FFFFFF',
          marginBottom: '0.25rem',
          lineHeight: 1.2,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: '0.75rem', color: THEME.textDim }}>{sub}</div>
    </div>
  );
}

function GlassCard({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: THEME.glass,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${THEME.glassBorder}`,
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function ActionLink({
  href,
  emoji,
  title,
  subtitle,
  accent,
  accentBorder,
}: {
  href: string;
  emoji: string;
  title: string;
  subtitle: string;
  accent: string;
  accentBorder: string;
}) {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem',
        borderRadius: '0.75rem',
        background: accent,
        border: `1px solid ${accentBorder}`,
        textDecoration: 'none',
        transition: 'all 0.2s',
      }}
    >
      <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#FFFFFF' }}>
          {title}
        </div>
        <div style={{ fontSize: '0.75rem', color: THEME.textMuted }}>
          {subtitle}
        </div>
      </div>
      <span style={{ color: THEME.textMuted, fontSize: '1rem' }}>→</span>
    </Link>
  );
}

function OverviewRow({
  label,
  value,
  valueColor,
  last,
}: {
  label: string;
  value: string;
  valueColor: string;
  last?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.6rem 0',
        borderBottom: !last ? '1px solid rgba(148, 163, 184, 0.15)' : 'none',
      }}
    >
      <span style={{ color: THEME.textMuted, fontSize: '0.875rem', fontWeight: 500 }}>
        {label}
      </span>
      <span style={{ color: valueColor, fontSize: '0.875rem', fontWeight: 700 }}>
        {value}
      </span>
    </div>
  );
}

function GlobalStyles() {
  return (
    <style>{`
      @media (min-width: 1024px) {
        .lg-nav { display: flex !important; }
        .lg-hide { display: none !important; }
      }
      @media (min-width: 640px) {
        .sm-show { display: block !important; }
        .sm-show-btn { display: inline-block !important; }
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        padding: 0;
        background: #0A0E1A;
        color: #F8FAFC;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
      }
      a { text-decoration: none; }
      button { font-family: inherit; cursor: pointer; }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  );
}