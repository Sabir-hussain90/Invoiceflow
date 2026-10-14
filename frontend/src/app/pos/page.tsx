'use client';

import { useEffect, useState, useMemo } from 'react';
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

interface CartItem {
  productId: string;
  name: string;
  sku?: string;
  unit: string;
  unitPrice: number;
  quantity: number;
  available: number;
  discountAmount: number;
}

export default function PosPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [shop, setShop] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [barcodeInput, setBarcodeInput] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [amountReceived, setAmountReceived] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [lastSale, setLastSale] = useState<any>(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

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

  // Load products + customers + shop
  const loadData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const [pRes, cRes, sRes] = await Promise.all([
        fetch(`${API}/products?activeOnly=true`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API}/customers`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API}/shops/me`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (pRes.ok) setProducts(await pRes.json());
      if (cRes.ok) setCustomers(await cRes.json());
      if (sRes.ok) setShop(await sRes.json());
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

  // Reset payment confirmation when method changes
  useEffect(() => {
    setPaymentConfirmed(false);
  }, [paymentMethod]);

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const s = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.sku?.toLowerCase().includes(s) ||
        p.barcode?.includes(s)
    );
  }, [products, search]);

  const addToCart = (product: any) => {
    const available = Number(product.stockQty);
    const existing = cart.find((c) => c.productId === product.id);

    if (existing) {
      if (existing.quantity + 1 > available) {
        setError(
          `Only ${available} ${product.unit} available for "${product.name}"`
        );
        setTimeout(() => setError(''), 3000);
        return;
      }
      setCart(
        cart.map((c) =>
          c.productId === product.id
            ? { ...c, quantity: c.quantity + 1 }
            : c
        )
      );
    } else {
      if (available < 1) {
        setError(`"${product.name}" is out of stock`);
        setTimeout(() => setError(''), 3000);
        return;
      }
      setCart([
        ...cart,
        {
          productId: product.id,
          name: product.name,
          sku: product.sku,
          unit: product.unit,
          unitPrice: Number(product.sellingPrice),
          quantity: 1,
          available,
          discountAmount: 0,
        },
      ]);
    }
  };

  const updateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      setCart(cart.filter((c) => c.productId !== productId));
      return;
    }
    const item = cart.find((c) => c.productId === productId);
    if (!item) return;
    if (qty > item.available) {
      setError(`Only ${item.available} ${item.unit} available`);
      setTimeout(() => setError(''), 3000);
      return;
    }
    setCart(
      cart.map((c) => (c.productId === productId ? { ...c, quantity: qty } : c))
    );
  };

  const updateItemDiscount = (productId: string, discount: number) => {
    setCart(
      cart.map((c) =>
        c.productId === productId ? { ...c, discountAmount: discount } : c
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((c) => c.productId !== productId));
  };

  const clearCart = () => {
    if (cart.length === 0) return;
    if (!confirm('Clear the cart?')) return;
    setCart([]);
    setDiscountAmount('');
    setDiscountPercent('');
    setAmountReceived('');
    setSelectedCustomerId('');
    setNotes('');
    setPaymentMethod('CASH');
    setPaymentConfirmed(false);
  };

  const handleBarcodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeInput.trim()) return;

    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(
        `${API}/products/barcode/${encodeURIComponent(barcodeInput.trim())}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) {
        setError('No product matches this barcode');
        setTimeout(() => setError(''), 3000);
        setBarcodeInput('');
        return;
      }

      const product = await res.json();
      addToCart(product);
      setBarcodeInput('');
    } catch (err) {
      setError('Barcode lookup failed');
      setTimeout(() => setError(''), 3000);
      setBarcodeInput('');
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const itemDiscounts = cart.reduce(
    (sum, item) => sum + item.discountAmount,
    0
  );
  const flatDiscount = Number(discountAmount) || 0;
  const percentDiscountValue =
    (subtotal * (Number(discountPercent) || 0)) / 100;
  const totalDiscount = itemDiscounts + flatDiscount + percentDiscountValue;
  const total = Math.max(0, subtotal - totalDiscount);
  const received = Number(amountReceived) || 0;
  const change = Math.max(0, received - total);
  const due = Math.max(0, total - received);

  const isOnlinePayment =
    paymentMethod === 'JAZZCASH' || paymentMethod === 'EASYPAISA';

  const accountNumber =
    paymentMethod === 'JAZZCASH'
      ? shop?.jazzcashNumber
      : paymentMethod === 'EASYPAISA'
        ? shop?.easypaisaNumber
        : null;

  const methodLabel =
    paymentMethod === 'JAZZCASH'
      ? 'JazzCash'
      : paymentMethod === 'EASYPAISA'
        ? 'EasyPaisa'
        : 'Cash';

  const handleCompleteSale = async () => {
    setError('');
    setSuccess('');

    if (cart.length === 0) {
      setError('Cart is empty');
      return;
    }

    if (isOnlinePayment && !paymentConfirmed) {
      setError(
        `Please confirm the customer has sent Rs. ${total.toFixed(2)} to your ${methodLabel} account`
      );
      return;
    }

    if (paymentMethod === 'CASH' && received <= 0) {
      setError('Enter amount received');
      return;
    }

    const finalAmountReceived = isOnlinePayment ? total : received;

    setSubmitting(true);

    try {
      const token = localStorage.getItem('accessToken');
      const payload = {
        items: cart.map((c) => ({
          productId: c.productId,
          quantity: c.quantity,
          discountAmount: c.discountAmount || undefined,
        })),
        discountAmount: flatDiscount || undefined,
        discountPercent: Number(discountPercent) || undefined,
        customerId: selectedCustomerId || undefined,
        notes: notes || undefined,
        paymentMethod,
        amountReceived: finalAmountReceived,
      };

      const res = await fetch(`${API}/sales`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Sale failed');
        setSubmitting(false);
        return;
      }

      setLastSale(data);
      setSuccess(`Sale completed! Invoice ${data.invoiceNumber}`);
      setCart([]);
      setDiscountAmount('');
      setDiscountPercent('');
      setAmountReceived('');
      setSelectedCustomerId('');
      setNotes('');
      setPaymentMethod('CASH');
      setPaymentConfirmed(false);
      loadData();

      setTimeout(() => setSuccess(''), 10000);
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setSubmitting(false);
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

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/pos', label: 'POS', active: true },
    { href: '/products', label: 'Products' },
    { href: '/sales', label: 'Sales' },
    { href: '/invoices', label: 'Invoices' },
    { href: '/reports', label: 'Reports' },
    { href: '/expenses', label: 'Expenses' },
    { href: '/settings', label: 'Settings' },
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
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.7rem',
    fontWeight: 600,
    color: THEME.textMuted,
    marginBottom: '0.25rem',
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

      <main style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.5rem 1rem' }}>
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
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
            }}
          >
            <span>⚠</span>
            <span>{error}</span>
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
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>✓</span>
              {success}
            </span>
            {lastSale && (
              <button
                onClick={() =>
                  handleDownloadInvoice(lastSale.id, lastSale.invoiceNumber)
                }
                style={{
                  background: THEME.green,
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.375rem 0.75rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Download Receipt
              </button>
            )}
          </div>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1.5rem',
          }}
          className="pos-grid"
        >
          {/* LEFT: Products */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="pos-left">
            <div
              style={{
                background: THEME.glass,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: `1px solid ${THEME.glassBorder}`,
                borderRadius: '0.75rem',
                padding: '1rem',
              }}
            >
              <form onSubmit={handleBarcodeSubmit} style={{ marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  placeholder="📷 Scan barcode and press Enter"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(10, 14, 26, 0.8)',
                    border: `2px solid ${THEME.purple}`,
                    borderRadius: '0.5rem',
                    color: THEME.text,
                    fontSize: '1.125rem',
                    outline: 'none',
                    fontFamily: 'monospace',
                    boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.15)',
                  }}
                  autoFocus
                />
              </form>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products by name or SKU..."
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = THEME.purple;
                  e.currentTarget.style.boxShadow =
                    '0 0 0 3px rgba(124, 58, 237, 0.2)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor =
                    'rgba(148, 163, 184, 0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <div
              style={{
                background: THEME.glass,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: `1px solid ${THEME.glassBorder}`,
                borderRadius: '0.75rem',
                padding: '1rem',
              }}
            >
              {loading ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: THEME.textMuted }}>
                  Loading products...
                </div>
              ) : filteredProducts.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📦</div>
                  <div style={{ color: THEME.textMuted, fontSize: '0.875rem' }}>
                    {search
                      ? 'No products match your search'
                      : 'No products yet. Add products first.'}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0.75rem',
                    maxHeight: 'calc(100vh - 320px)',
                    overflowY: 'auto',
                  }}
                  className="product-grid"
                >
                  {filteredProducts.map((p) => {
                    const stock = Number(p.stockQty);
                    const low = stock <= Number(p.minStockLevel);
                    const out = stock <= 0;

                    return (
                      <button
                        key={p.id}
                        onClick={() => addToCart(p)}
                        disabled={out}
                        style={{
                          textAlign: 'left',
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          border: out
                            ? '1px solid rgba(100, 116, 139, 0.3)'
                            : `1px solid ${THEME.glassBorder}`,
                          background: out
                            ? 'rgba(30, 41, 59, 0.4)'
                            : 'rgba(20, 27, 45, 0.7)',
                          cursor: out ? 'not-allowed' : 'pointer',
                          opacity: out ? 0.5 : 1,
                          transition: 'all 0.2s',
                          color: THEME.text,
                        }}
                        onMouseEnter={(e) => {
                          if (!out) {
                            e.currentTarget.style.borderColor = THEME.purple;
                            e.currentTarget.style.boxShadow =
                              '0 0 0 2px rgba(124, 58, 237, 0.3)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!out) {
                            e.currentTarget.style.borderColor =
                              THEME.glassBorder;
                            e.currentTarget.style.boxShadow = 'none';
                          }
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            marginBottom: '0.25rem',
                            color: THEME.text,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {p.name}
                        </div>
                        {p.sku && (
                          <div
                            style={{
                              fontSize: '0.75rem',
                              color: THEME.textDim,
                              marginBottom: '0.25rem',
                            }}
                          >
                            {p.sku}
                          </div>
                        )}
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                          }}
                        >
                          <div
                            style={{
                              color: '#C4B5FD',
                              fontWeight: 'bold',
                              fontSize: '0.875rem',
                            }}
                          >
                            Rs. {Number(p.sellingPrice).toFixed(0)}
                          </div>
                          <div
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              color: out
                                ? THEME.red
                                : low
                                  ? THEME.orange
                                  : THEME.green,
                            }}
                          >
                            {out ? 'OUT' : `${stock}`}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Cart */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="pos-right">
            <div
              style={{
                background: THEME.glass,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: `1px solid ${THEME.glassBorder}`,
                borderRadius: '0.75rem',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
                position: 'sticky',
                top: '5rem',
              }}
            >
              <div
                style={{
                  borderBottom: `1px solid rgba(148, 163, 184, 0.15)`,
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h2 style={{ fontWeight: 'bold', color: THEME.text, margin: 0, fontSize: '1rem' }}>
                  Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                </h2>
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#FCA5A5',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>

              <div style={{ maxHeight: '18rem', overflowY: 'auto' }}>
                {cart.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🛒</div>
                    <div style={{ color: THEME.textMuted, fontSize: '0.875rem' }}>
                      Cart is empty
                    </div>
                    <div style={{ fontSize: '0.75rem', color: THEME.textDim, marginTop: '0.25rem' }}>
                      Click a product or scan barcode
                    </div>
                  </div>
                ) : (
                  <div>
                    {cart.map((item) => {
                      const lineTotal =
                        item.unitPrice * item.quantity - item.discountAmount;
                      return (
                        <div
                          key={item.productId}
                          style={{
                            padding: '0.75rem',
                            borderBottom: `1px solid rgba(148, 163, 184, 0.1)`,
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              marginBottom: '0.5rem',
                            }}
                          >
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div
                                style={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem',
                                  color: THEME.text,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {item.name}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: THEME.textDim }}>
                                Rs. {item.unitPrice.toFixed(2)} / {item.unit}
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.productId)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#FCA5A5',
                                fontSize: '1.125rem',
                                lineHeight: 1,
                                marginLeft: '0.5rem',
                                cursor: 'pointer',
                              }}
                              aria-label="Remove"
                            >
                              ×
                            </button>
                          </div>

                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '0.5rem',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                border: `1px solid rgba(148, 163, 184, 0.3)`,
                                borderRadius: '0.5rem',
                                overflow: 'hidden',
                              }}
                            >
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.quantity - 1
                                  )
                                }
                                style={{
                                  padding: '0.25rem 0.5rem',
                                  background: 'rgba(10, 14, 26, 0.6)',
                                  border: 'none',
                                  color: THEME.textMuted,
                                  cursor: 'pointer',
                                }}
                              >
                                −
                              </button>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(
                                    item.productId,
                                    Number(e.target.value)
                                  )
                                }
                                style={{
                                  width: '3rem',
                                  textAlign: 'center',
                                  fontSize: '0.875rem',
                                  padding: '0.25rem 0',
                                  background: 'rgba(10, 14, 26, 0.6)',
                                  border: 'none',
                                  borderLeft: '1px solid rgba(148, 163, 184, 0.3)',
                                  borderRight: '1px solid rgba(148, 163, 184, 0.3)',
                                  color: THEME.text,
                                  outline: 'none',
                                }}
                                min="1"
                                max={item.available}
                              />
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.quantity + 1
                                  )
                                }
                                style={{
                                  padding: '0.25rem 0.5rem',
                                  background: 'rgba(10, 14, 26, 0.6)',
                                  border: 'none',
                                  color: THEME.textMuted,
                                  cursor: 'pointer',
                                }}
                              >
                                +
                              </button>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                              <div
                                style={{
                                  fontWeight: 600,
                                  fontSize: '0.875rem',
                                  color: THEME.text,
                                }}
                              >
                                Rs. {lineTotal.toFixed(2)}
                              </div>
                              {item.discountAmount > 0 && (
                                <div style={{ fontSize: '0.75rem', color: '#FCA5A5' }}>
                                  −Rs. {item.discountAmount.toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>

                          <div
                            style={{
                              marginTop: '0.5rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                            }}
                          >
                            <label style={{ fontSize: '0.75rem', color: THEME.textDim }}>
                              Disc:
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.discountAmount || ''}
                              onChange={(e) =>
                                updateItemDiscount(
                                  item.productId,
                                  Number(e.target.value) || 0
                                )
                              }
                              style={{
                                width: '5rem',
                                padding: '0.25rem 0.5rem',
                                background: 'rgba(10, 14, 26, 0.6)',
                                border: '1px solid rgba(148, 163, 184, 0.2)',
                                borderRadius: '0.375rem',
                                color: THEME.text,
                                fontSize: '0.75rem',
                                outline: 'none',
                              }}
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div
                  style={{
                    borderTop: `1px solid rgba(148, 163, 184, 0.15)`,
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  <div>
                    <label style={labelStyle}>Customer</label>
                    <select
                      value={selectedCustomerId}
                      onChange={(e) => setSelectedCustomerId(e.target.value)}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      <option value="" style={{ background: '#0A0E1A' }}>
                        Walk-in Customer
                      </option>
                      {customers.map((c) => (
                        <option key={c.id} value={c.id} style={{ background: '#0A0E1A' }}>
                          {c.name}
                          {c.phone ? ` (${c.phone})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <label style={labelStyle}>Discount (Rs.)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={discountAmount}
                        onChange={(e) => setDiscountAmount(e.target.value)}
                        style={inputStyle}
                        placeholder="0"
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = THEME.purple;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor =
                            'rgba(148, 163, 184, 0.2)';
                        }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Discount (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(e.target.value)}
                        style={inputStyle}
                        placeholder="0"
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = THEME.purple;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor =
                            'rgba(148, 163, 184, 0.2)';
                        }}
                      />
                    </div>
                  </div>

                  {/* PAYMENT METHOD */}
                  <div>
                    <label style={labelStyle}>Payment Method</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('CASH')}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          background:
                            paymentMethod === 'CASH'
                              ? THEME.gradient
                              : 'rgba(10, 14, 26, 0.6)',
                          color:
                            paymentMethod === 'CASH' ? '#FFFFFF' : THEME.textMuted,
                          border: `2px solid ${
                            paymentMethod === 'CASH'
                              ? THEME.purple
                              : 'rgba(148, 163, 184, 0.2)'
                          }`,
                          boxShadow:
                            paymentMethod === 'CASH'
                              ? '0 0 20px rgba(124, 58, 237, 0.4)'
                              : 'none',
                        }}
                      >
                        <span style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>💵</span>
                        Cash
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('JAZZCASH')}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          background:
                            paymentMethod === 'JAZZCASH'
                              ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
                              : 'rgba(10, 14, 26, 0.6)',
                          color:
                            paymentMethod === 'JAZZCASH'
                              ? '#FFFFFF'
                              : THEME.textMuted,
                          border: `2px solid ${
                            paymentMethod === 'JAZZCASH'
                              ? '#EF4444'
                              : 'rgba(148, 163, 184, 0.2)'
                          }`,
                          boxShadow:
                            paymentMethod === 'JAZZCASH'
                              ? '0 0 20px rgba(239, 68, 68, 0.4)'
                              : 'none',
                        }}
                      >
                        <span style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>📱</span>
                        JazzCash
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('EASYPAISA')}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          background:
                            paymentMethod === 'EASYPAISA'
                              ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                              : 'rgba(10, 14, 26, 0.6)',
                          color:
                            paymentMethod === 'EASYPAISA'
                              ? '#FFFFFF'
                              : THEME.textMuted,
                          border: `2px solid ${
                            paymentMethod === 'EASYPAISA'
                              ? '#10B981'
                              : 'rgba(148, 163, 184, 0.2)'
                          }`,
                          boxShadow:
                            paymentMethod === 'EASYPAISA'
                              ? '0 0 20px rgba(16, 185, 129, 0.4)'
                              : 'none',
                        }}
                      >
                        <span style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>📱</span>
                        EasyPaisa
                      </button>
                    </div>
                  </div>

                  {/* ONLINE PAYMENT PANEL */}
                  {isOnlinePayment && (
                    <div
                      style={{
                        borderRadius: '0.5rem',
                        padding: '1rem',
                        border: `2px solid ${
                          paymentMethod === 'JAZZCASH'
                            ? 'rgba(239, 68, 68, 0.5)'
                            : 'rgba(16, 185, 129, 0.5)'
                        }`,
                        background:
                          paymentMethod === 'JAZZCASH'
                            ? 'rgba(239, 68, 68, 0.1)'
                            : 'rgba(16, 185, 129, 0.1)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>📱</span>
                        <div>
                          <div
                            style={{
                              fontWeight: 'bold',
                              fontSize: '0.875rem',
                              color:
                                paymentMethod === 'JAZZCASH'
                                  ? '#FCA5A5'
                                  : '#6EE7B7',
                            }}
                          >
                            {methodLabel} Payment
                          </div>
                          <div style={{ fontSize: '0.75rem', color: THEME.textMuted }}>
                            Show this number to the customer
                          </div>
                        </div>
                      </div>

                      {accountNumber ? (
                        <>
                          <div
                            style={{
                              borderRadius: '0.5rem',
                              padding: '0.75rem',
                              textAlign: 'center',
                              marginBottom: '0.75rem',
                              background: 'rgba(10, 14, 26, 0.8)',
                              border: `2px solid ${
                                paymentMethod === 'JAZZCASH'
                                  ? 'rgba(239, 68, 68, 0.3)'
                                  : 'rgba(16, 185, 129, 0.3)'
                              }`,
                            }}
                          >
                            <div
                              style={{
                                fontSize: '0.7rem',
                                textTransform: 'uppercase',
                                fontWeight: 600,
                                color: THEME.textDim,
                                marginBottom: '0.25rem',
                              }}
                            >
                              {methodLabel} Account Number
                            </div>
                            <div
                              style={{
                                fontFamily: 'monospace',
                                fontWeight: 'bold',
                                fontSize: '1.5rem',
                                letterSpacing: '0.05em',
                                color:
                                  paymentMethod === 'JAZZCASH'
                                    ? '#FCA5A5'
                                    : '#6EE7B7',
                              }}
                            >
                              {accountNumber}
                            </div>
                          </div>

                          <div
                            style={{
                              background: 'rgba(10, 14, 26, 0.8)',
                              borderRadius: '0.5rem',
                              padding: '0.75rem',
                              marginBottom: '0.75rem',
                            }}
                          >
                            <div style={{ fontSize: '0.75rem', color: THEME.textMuted, marginBottom: '0.25rem' }}>
                              Amount to send:
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: THEME.text }}>
                              Rs. {total.toFixed(2)}
                            </div>
                          </div>

                          <div
                            style={{
                              fontSize: '0.75rem',
                              color: THEME.textMuted,
                              marginBottom: '0.75rem',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.25rem',
                            }}
                          >
                            <div>1. Ask customer to open {methodLabel} app</div>
                            <div>
                              2. Send <strong style={{ color: THEME.text }}>Rs. {total.toFixed(2)}</strong> to{' '}
                              <strong style={{ color: THEME.text }}>{accountNumber}</strong>
                            </div>
                            <div>3. Verify the payment in your {methodLabel} app</div>
                          </div>

                          <label
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.5rem',
                              cursor: 'pointer',
                              background: 'rgba(10, 14, 26, 0.8)',
                              borderRadius: '0.5rem',
                              padding: '0.75rem',
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={paymentConfirmed}
                              onChange={(e) =>
                                setPaymentConfirmed(e.target.checked)
                              }
                              style={{
                                marginTop: '0.125rem',
                                width: '1rem',
                                height: '1rem',
                                accentColor: THEME.purple,
                              }}
                            />
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: THEME.text }}>
                              ✓ I confirm the customer has sent Rs.{' '}
                              {total.toFixed(2)} to my {methodLabel} account
                            </span>
                          </label>
                        </>
                      ) : (
                        <div
                          style={{
                            background: 'rgba(249, 115, 22, 0.15)',
                            border: '1px solid rgba(249, 115, 22, 0.4)',
                            borderRadius: '0.5rem',
                            padding: '0.75rem',
                            fontSize: '0.75rem',
                            color: '#FDBA74',
                          }}
                        >
                          <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                            ⚠ No {methodLabel} number set
                          </div>
                          <div>
                            Go to{' '}
                            <Link
                              href="/settings"
                              style={{ color: '#FDBA74', textDecoration: 'underline', fontWeight: 600 }}
                            >
                              Settings → Shop Profile
                            </Link>{' '}
                            to add your {methodLabel} number.
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CASH AMOUNT RECEIVED */}
                  {paymentMethod === 'CASH' && (
                    <div>
                      <label style={labelStyle}>Amount Received (Rs.)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={amountReceived}
                        onChange={(e) => setAmountReceived(e.target.value)}
                        style={{
                          ...inputStyle,
                          fontSize: '1.125rem',
                          fontWeight: 600,
                          padding: '0.65rem 0.85rem',
                        }}
                        placeholder="0"
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = THEME.purple;
                          e.currentTarget.style.boxShadow =
                            '0 0 0 3px rgba(124, 58, 237, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor =
                            'rgba(148, 163, 184, 0.2)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  )}

                  {/* TOTALS */}
                  <div
                    style={{
                      background: 'rgba(10, 14, 26, 0.6)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.375rem',
                      fontSize: '0.875rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: THEME.textMuted }}>
                      <span>Subtotal</span>
                      <span>Rs. {subtotal.toFixed(2)}</span>
                    </div>
                    {totalDiscount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FCA5A5' }}>
                        <span>Discount</span>
                        <span>−Rs. {totalDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: 'bold',
                        fontSize: '1.125rem',
                        color: THEME.text,
                        borderTop: '1px solid rgba(148, 163, 184, 0.2)',
                        paddingTop: '0.5rem',
                        marginTop: '0.25rem',
                      }}
                    >
                      <span>Total</span>
                      <span>Rs. {total.toFixed(2)}</span>
                    </div>
                    {paymentMethod === 'CASH' && received > 0 && (
                      <>
                        {change > 0 && (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              color: THEME.green,
                              fontWeight: 600,
                            }}
                          >
                            <span>Change</span>
                            <span>Rs. {change.toFixed(2)}</span>
                          </div>
                        )}
                        {due > 0 && (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              color: THEME.orange,
                              fontWeight: 600,
                            }}
                          >
                            <span>Due</span>
                            <span>Rs. {due.toFixed(2)}</span>
                          </div>
                        )}
                      </>
                    )}
                    {isOnlinePayment && (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontWeight: 600,
                          color:
                            paymentMethod === 'JAZZCASH' ? '#FCA5A5' : '#6EE7B7',
                        }}
                      >
                        <span>Via {methodLabel}</span>
                        <span>Rs. {total.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={inputStyle}
                    placeholder="Notes (optional)"
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = THEME.purple;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        'rgba(148, 163, 184, 0.2)';
                    }}
                  />

                  {/* COMPLETE SALE BUTTON */}
                  <button
                    onClick={handleCompleteSale}
                    disabled={
                      submitting ||
                      (isOnlinePayment && (!accountNumber || !paymentConfirmed))
                    }
                    style={{
                      width: '100%',
                      fontWeight: 'bold',
                      padding: '0.75rem',
                      borderRadius: '0.75rem',
                      border: 'none',
                      fontSize: '1rem',
                      cursor:
                        submitting ||
                        (isOnlinePayment && (!accountNumber || !paymentConfirmed))
                          ? 'not-allowed'
                          : 'pointer',
                      opacity:
                        submitting ||
                        (isOnlinePayment && (!accountNumber || !paymentConfirmed))
                          ? 0.5
                          : 1,
                      background:
                        isOnlinePayment && paymentConfirmed
                          ? paymentMethod === 'JAZZCASH'
                            ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
                            : 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                          : THEME.gradient,
                      color: '#FFFFFF',
                      boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    {submitting ? (
                      <>
                        <span
                          style={{
                            width: '1.25rem',
                            height: '1.25rem',
                            border: '2px solid #FFFFFF',
                            borderTopColor: 'transparent',
                            borderRadius: '9999px',
                            animation: 'spin 1s linear infinite',
                            display: 'inline-block',
                          }}
                        />
                        Processing...
                      </>
                    ) : isOnlinePayment && !paymentConfirmed ? (
                      `Confirm ${methodLabel} payment first`
                    ) : (
                      `Complete Sale — Rs. ${total.toFixed(2)}`
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
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
      input::placeholder { color: #64748B; }
      a { text-decoration: none; }
      button { font-family: inherit; cursor: pointer; }
      select option { background: #0A0E1A; color: #F8FAFC; }

      /* Scrollbar styling */
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

      @media (min-width: 1024px) {
        .nav-desktop { display: flex !important; }
        .menu-btn { display: none !important; }
        .pos-grid { grid-template-columns: 3fr 2fr !important; }
        .product-grid { grid-template-columns: repeat(4, 1fr) !important; }
      }

      @media (min-width: 640px) {
        .product-grid { grid-template-columns: repeat(3, 1fr) !important; }
      }
    `}</style>
  );
}