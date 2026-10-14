'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// ============================================================
// THEME — Dark gradient background matching auth pages
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
  gradientHover: 'linear-gradient(135deg, #6D28D9 0%, #0891B2 100%)',
  green: '#10B981',
  red: '#EF4444',
  orange: '#F97316',
  pink: '#EC4899',
};

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main
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
          transition: 'all 0.3s ease',
          background: scrolled
            ? 'rgba(10, 14, 26, 0.9)'
            : 'rgba(10, 14, 26, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(124, 58, 237, 0.3)'
            : '1px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '0 1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '4rem',
            }}
          >
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '0.75rem',
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
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: THEME.text,
                  letterSpacing: '-0.02em',
                }}
              >
                InvoiceFlow{' '}
                <span
                  style={{
                    background: THEME.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Pakistan
                </span>
              </span>
            </Link>

            <div
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '2rem',
              }}
              className="nav-links"
            >
              <a
                href="#features"
                style={{
                  color: THEME.textMuted,
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                Features
              </a>
              <a
                href="#shops"
                style={{
                  color: THEME.textMuted,
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                For Shops
              </a>
              <a
                href="#products"
                style={{
                  color: THEME.textMuted,
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                Products
              </a>
              <a
                href="#about"
                style={{
                  color: THEME.textMuted,
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                About
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link
                href="/login"
                style={{
                  color: THEME.textMuted,
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                Login
              </Link>
              <Link
                href="/register"
                style={{
                  background: THEME.gradient,
                  color: '#FFFFFF',
                  fontWeight: 600,
                  padding: '0.625rem 1.25rem',
                  borderRadius: '0.75rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(124, 58, 237, 0.4)',
                  transition: 'all 0.2s',
                }}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Background glow effects */}
        <div
          style={{
            position: 'absolute',
            top: '5rem',
            left: '-5rem',
            width: '24rem',
            height: '24rem',
            background: 'rgba(124, 58, 237, 0.2)',
            borderRadius: '9999px',
            filter: 'blur(80px)',
            animation: 'pulse 4s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '10rem',
            right: '-5rem',
            width: '24rem',
            height: '24rem',
            background: 'rgba(6, 182, 212, 0.2)',
            borderRadius: '9999px',
            filter: 'blur(80px)',
            animation: 'pulse 4s ease-in-out infinite',
            animationDelay: '0.5s',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '5rem',
            left: '33%',
            width: '24rem',
            height: '24rem',
            background: 'rgba(236, 72, 153, 0.15)',
            borderRadius: '9999px',
            filter: 'blur(80px)',
            animation: 'pulse 4s ease-in-out infinite',
            animationDelay: '1.5s',
          }}
        />

        <div
          style={{
            position: 'relative',
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '5rem 1rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '4rem',
              alignItems: 'center',
            }}
            className="hero-grid"
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.375rem 1rem',
                  borderRadius: '9999px',
                  background: 'rgba(124, 58, 237, 0.15)',
                  border: '1px solid rgba(124, 58, 237, 0.4)',
                  color: '#C4B5FD',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                }}
              >
                <span
                  style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    borderRadius: '9999px',
                    background: THEME.green,
                    animation: 'pulse 2s ease-in-out infinite',
                  }}
                />
                🇵🇰 Made for Pakistani Shops
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2rem, 6vw, 3.75rem)',
                  fontWeight: 800,
                  color: THEME.text,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  marginBottom: '1.5rem',
                }}
              >
                Run your shop
                <br />
                <span
                  style={{
                    background: THEME.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  smarter
                </span>
                , not harder.
              </h1>

              <p
                style={{
                  fontSize: '1.125rem',
                  color: THEME.textMuted,
                  lineHeight: 1.7,
                  maxWidth: '32rem',
                  marginBottom: '2rem',
                }}
              >
                Complete POS, inventory, PDF invoices, udhaar ledger, and
                daily reports — all in PKR. Everything your shop needs in
                one modern system.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '2.5rem',
                }}
              >
                <Link
                  href="/register"
                  style={{
                    background: THEME.gradient,
                    color: '#FFFFFF',
                    fontWeight: 600,
                    padding: '0.875rem 1.75rem',
                    borderRadius: '0.75rem',
                    textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(124, 58, 237, 0.5)',
                    fontSize: '1.125rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s',
                  }}
                >
                  Start Free Trial
                  <span style={{ fontSize: '1.25rem' }}>→</span>
                </Link>
                <a
                  href="#features"
                  style={{
                    background: 'rgba(20, 27, 45, 0.8)',
                    color: THEME.text,
                    fontWeight: 600,
                    padding: '0.875rem 1.75rem',
                    borderRadius: '0.75rem',
                    textDecoration: 'none',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    fontSize: '1.125rem',
                    transition: 'all 0.2s',
                  }}
                >
                  See Features
                </a>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  fontSize: '0.875rem',
                  color: THEME.textMuted,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      borderRadius: '9999px',
                      background: 'rgba(16, 185, 129, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: THEME.green,
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                    }}
                  >
                    ✓
                  </span>
                  No credit card
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      borderRadius: '9999px',
                      background: 'rgba(16, 185, 129, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: THEME.green,
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                    }}
                  >
                    ✓
                  </span>
                  14-day free trial
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      borderRadius: '9999px',
                      background: 'rgba(16, 185, 129, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: THEME.green,
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                    }}
                  >
                    ✓
                  </span>
                  PKR currency
                </div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  border: '8px solid rgba(20, 27, 45, 0.9)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                  transition: 'transform 0.5s ease',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
                  alt="Shop owner using POS"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '-1.5rem',
                  left: '-1.5rem',
                  background: THEME.glass,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: `1px solid ${THEME.glassBorder}`,
                  borderRadius: '1rem',
                  padding: '1.25rem',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                  animation: 'float 3s ease-in-out infinite',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: THEME.textMuted, fontWeight: 500, marginBottom: '0.25rem' }}>
                  Today&apos;s Sales
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: THEME.green }}>
                  Rs. 45,300
                </div>
                <div style={{ fontSize: '0.75rem', color: THEME.green, marginTop: '0.25rem', fontWeight: 600 }}>
                  ↑ +12% vs yesterday
                </div>
              </div>

              <div
                style={{
                  position: 'absolute',
                  top: '-1rem',
                  right: '-1rem',
                  background: THEME.gradient,
                  color: '#FFFFFF',
                  borderRadius: '1rem',
                  padding: '1rem',
                  boxShadow: '0 20px 40px rgba(124, 58, 237, 0.5)',
                  animation: 'float 3s ease-in-out infinite',
                  animationDelay: '1s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '2.25rem',
                      height: '2.25rem',
                      borderRadius: '0.5rem',
                      background: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                    }}
                  >
                    ✓
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
                      PDF Invoice
                    </div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#FFFFFF' }}>
                      Ready
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '-1.5rem',
                  background: 'linear-gradient(135deg, #EF4444 0%, #F97316 100%)',
                  color: '#FFFFFF',
                  borderRadius: '0.75rem',
                  padding: '0.75rem',
                  boxShadow: '0 20px 40px rgba(239, 68, 68, 0.4)',
                  animation: 'float 3s ease-in-out infinite',
                  animationDelay: '2s',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>JazzCash</div>
                <div style={{ fontSize: '0.625rem', opacity: 0.9 }}>Received</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST BAR ============ */}
      <section
        style={{
          padding: '3rem 1rem',
          background: 'rgba(20, 27, 45, 0.5)',
          borderTop: '1px solid rgba(124, 58, 237, 0.2)',
          borderBottom: '1px solid rgba(124, 58, 237, 0.2)',
        }}
      >
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2rem',
              textAlign: 'center',
            }}
            className="trust-grid"
          >
            <Stat number="10,000+" label="Invoices Generated" color="blue" />
            <Stat number="500+" label="Active Shops" color="purple" />
            <Stat number="Rs. 50M+" label="Sales Tracked" color="green" />
            <Stat number="4.9/5" label="User Rating" color="orange" />
          </div>
        </div>
      </section>

      {/* ============ SHOP TYPES ============ */}
      <section
        id="shops"
        style={{
          padding: '5rem 1rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40rem',
            height: '40rem',
            background: 'rgba(124, 58, 237, 0.08)',
            borderRadius: '9999px',
            filter: 'blur(120px)',
          }}
        />
        <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto 4rem' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                background: 'rgba(124, 58, 237, 0.15)',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                color: '#C4B5FD',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
              }}
            >
              Built For Your Shop
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                fontWeight: 'bold',
                color: THEME.text,
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}
            >
              Every kind of shop, one perfect system
            </h2>
            <p style={{ fontSize: '1.125rem', color: THEME.textMuted, lineHeight: 1.7 }}>
              From small kiryana stores to modern retail boutiques —
              InvoiceFlow adapts to your business.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: '1.5rem',
              marginBottom: '1.5rem',
            }}
            className="shop-grid"
          >
            <ShopCard
              image="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80"
              title="General Store / Kiryana"
              description="Everyday billing for groceries, snacks, and household items with fast POS checkout."
              tag="Most Popular"
              tagColor="blue"
              stat="500+ shops"
            />
            <ShopCard
              image="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80"
              title="Retail Boutique"
              description="Fashion, cosmetics, and specialty shops with product variants and custom pricing."
              tag="Premium"
              tagColor="purple"
              stat="200+ shops"
            />
            <ShopCard
              image="https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=80"
              title="Pharmacy / Medical"
              description="Batch tracking and expiry management for medicines with supplier purchases."
              tag="Advanced"
              tagColor="green"
              stat="80+ shops"
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: '1.5rem',
            }}
            className="shop-grid"
          >
            <ShopCard
              image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
              title="Fashion & Apparel"
              description="Track sizes, colors, and seasonal collections with product variants."
              tag="Fashion"
              tagColor="pink"
              stat="120+ shops"
            />
            <ShopCard
              image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
              title="Wholesale & Distribution"
              description="Bulk pricing, supplier payables, and customer credit accounts."
              tag="Business"
              tagColor="orange"
              stat="60+ shops"
            />
            <ShopCard
              image="https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=80"
              title="Restaurants & Cafes"
              description="Quick counter billing with modifiers, discounts, and daily reports."
              tag="Food"
              tagColor="red"
              stat="150+ shops"
            />
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section
        id="features"
        style={{
          padding: '5rem 1rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40rem',
            height: '40rem',
            background: 'rgba(6, 182, 212, 0.08)',
            borderRadius: '9999px',
            filter: 'blur(120px)',
          }}
        />
        <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto 4rem' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#6EE7B7',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
              }}
            >
              All Features
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                fontWeight: 'bold',
                color: THEME.text,
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}
            >
              Everything your shop needs
            </h2>
            <p style={{ fontSize: '1.125rem', color: THEME.textMuted, lineHeight: 1.7 }}>
              One system. Every feature. Built specifically for Pakistani
              retail shops.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: '1.5rem',
              marginBottom: '1.5rem',
            }}
            className="feature-grid"
          >
            <ImageFeatureCard
              image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80"
              title="Point of Sale"
              description="Fast counter billing with barcode scanning, instant totals, and automatic change calculation."
              gradient="from-blue-500 to-blue-700"
            />
            <ImageFeatureCard
              image="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&q=80"
              title="Inventory Management"
              description="Track every product in real time, receive low-stock alerts, and never oversell again."
              gradient="from-purple-500 to-purple-700"
            />
            <ImageFeatureCard
              image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80"
              title="PDF Invoices"
              description="Professional receipts with your shop logo and details. Print or download instantly."
              gradient="from-green-500 to-green-700"
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: '1.5rem',
              marginBottom: '1.5rem',
            }}
            className="feature-grid"
          >
            <ImageFeatureCard
              image="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=600&q=80"
              title="Udhaar Ledger"
              description="Track customer credit, record payments, and see exactly who owes you what."
              gradient="from-orange-500 to-orange-700"
            />
            <ImageFeatureCard
              image="https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=600&q=80"
              title="Reports & Analytics"
              description="Know your exact sales, profit, expenses, and stock value — updated daily."
              gradient="from-blue-500 to-indigo-700"
            />
            <ImageFeatureCard
              image="https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&q=80"
              title="Cash & Currency in PKR"
              description="Handle Pakistani Rupees with exact precision. Denominations from Rs. 10 to Rs. 5,000 tracked accurately."
              gradient="from-green-600 to-emerald-700"
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: '1.5rem',
            }}
            className="feature-grid"
          >
            <ImageFeatureCard
              image="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=600&q=80"
              title="Supplier Purchases"
              description="Record stock purchases, track supplier payments, and manage payables easily."
              gradient="from-purple-500 to-pink-700"
            />
            <ImageFeatureCard
              image="https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?w=600&q=80"
              title="JazzCash & EasyPaisa"
              description="Accept mobile payments with automatic receipt generation and audit trail."
              gradient="from-red-500 to-orange-600"
            />
            <ImageFeatureCard
              image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
              title="Multi-User Access"
              description="Owner, cashier, and stock manager roles with separate permissions and audit logs."
              gradient="from-teal-500 to-cyan-700"
            />
          </div>
        </div>
      </section>

      {/* ============ PAKISTANI CURRENCY HIGHLIGHT ============ */}
      <section
        style={{
          padding: '5rem 1rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '24rem',
            height: '24rem',
            background: 'rgba(16, 185, 129, 0.15)',
            borderRadius: '9999px',
            filter: 'blur(100px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '24rem',
            height: '24rem',
            background: 'rgba(6, 182, 212, 0.15)',
            borderRadius: '9999px',
            filter: 'blur(100px)',
          }}
        />

        <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '4rem',
              alignItems: 'center',
            }}
            className="currency-grid"
          >
            <div style={{ position: 'relative', order: 2 }}>
              <div
                style={{
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  border: '8px solid rgba(20, 27, 45, 0.9)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80"
                  alt="Pakistani Rupees currency notes"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              <div
                style={{
                  position: 'absolute',
                  top: '-1rem',
                  right: '-1rem',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  color: '#FFFFFF',
                  borderRadius: '1rem',
                  padding: '1rem',
                  boxShadow: '0 20px 40px rgba(16, 185, 129, 0.5)',
                  animation: 'float 3s ease-in-out infinite',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500, marginBottom: '0.25rem' }}>
                  Currency
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>PKR ₨</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)', marginTop: '0.25rem', fontWeight: 600 }}>
                  Pakistani Rupee
                </div>
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '-1.5rem',
                  left: '-1.5rem',
                  background: THEME.gradient,
                  color: '#FFFFFF',
                  borderRadius: '1rem',
                  padding: '1rem',
                  boxShadow: '0 20px 40px rgba(124, 58, 237, 0.5)',
                  animation: 'float 3s ease-in-out infinite',
                  animationDelay: '1s',
                }}
              >
                <div style={{ fontSize: '0.75rem', opacity: 0.9, marginBottom: '0.25rem', fontWeight: 500 }}>
                  Denominations
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Rs. 10, 20, 50</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Rs. 100, 500</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Rs. 1,000, 5,000</div>
              </div>
            </div>

            <div style={{ order: 1 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.375rem 1rem',
                  borderRadius: '9999px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#6EE7B7',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                }}
              >
                🇵🇰 PKR Native
              </div>
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                  fontWeight: 'bold',
                  color: THEME.text,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  marginBottom: '1.5rem',
                }}
              >
                Built for Pakistani Rupees
              </h2>
              <p style={{ fontSize: '1.125rem', color: THEME.textMuted, lineHeight: 1.7, marginBottom: '2rem' }}>
                All amounts displayed in PKR. Handle every denomination from
                Rs. 10 to Rs. 5,000 with exact precision. No confusing
                decimal points, no foreign currency — just Pakistani Rupees
                the way your shop works.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  'Exact PKR formatting (Rs. 1,500.00)',
                  'All denominations Rs. 10 – 5,000',
                  'Automatic change calculation in Rupees',
                  'Cash drawer reconciliation',
                  'Daily cash reports in PKR',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: THEME.text }}>
                    <span
                      style={{
                        width: '1.5rem',
                        height: '1.5rem',
                        borderRadius: '9999px',
                        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    <span style={{ fontWeight: 500 }}>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                style={{
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  padding: '0.875rem 1.75rem',
                  borderRadius: '0.75rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s',
                }}
              >
                Get Started with PKR
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ POPULAR PRODUCTS ============ */}
      <section
        id="products"
        style={{
          padding: '5rem 1rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40rem',
            height: '40rem',
            background: 'rgba(249, 115, 22, 0.08)',
            borderRadius: '9999px',
            filter: 'blur(120px)',
          }}
        />
        <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto 4rem' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                background: 'rgba(249, 115, 22, 0.15)',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                color: '#FDBA74',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
              }}
            >
              Popular Products
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                fontWeight: 'bold',
                color: THEME.text,
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}
            >
              Track every product in your shop
            </h2>
            <p style={{ fontSize: '1.125rem', color: THEME.textMuted, lineHeight: 1.7 }}>
              From cooking oil to soap — InvoiceFlow handles all your products
              with prices, stock, and barcodes.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: '1.5rem',
            }}
            className="product-grid"
          >
            <ProductCard
              image="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80"
              name="Cooking Oil 1L"
              sku="OIL-001"
              price="Rs. 550"
              stock="20 bottles"
              gradient="from-yellow-500 to-orange-600"
            />
            <ProductCard
              image="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80"
              name="Soap Bar"
              sku="SOAP-001"
              price="Rs. 120"
              stock="50 pieces"
              gradient="from-blue-500 to-cyan-600"
            />
            <ProductCard
              image="https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=80"
              name="Tea Pack 950g"
              sku="TEA-001"
              price="Rs. 1250"
              stock="30 packs"
              gradient="from-green-500 to-emerald-600"
            />
            <ProductCard
              image="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80"
              name="Basmati Rice 5kg"
              sku="RICE-001"
              price="Rs. 1500"
              stock="40 bags"
              gradient="from-purple-500 to-pink-600"
            />
          </div>

          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <Link
              href="/register"
              style={{
                background: 'linear-gradient(135deg, #F97316 0%, #EC4899 50%, #7C3AED 100%)',
                color: '#FFFFFF',
                fontWeight: 600,
                padding: '0.875rem 2rem',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(249, 115, 22, 0.4)',
                fontSize: '1.125rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
              }}
            >
              Start Managing Your Products
              <span style={{ fontSize: '1.25rem' }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section style={{ padding: '5rem 1rem', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40rem',
            height: '40rem',
            background: 'rgba(124, 58, 237, 0.08)',
            borderRadius: '9999px',
            filter: 'blur(120px)',
          }}
        />
        <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto 4rem' }}>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                fontWeight: 'bold',
                color: THEME.text,
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}
            >
              Loved by shop owners
            </h2>
            <p style={{ fontSize: '1.125rem', color: THEME.textMuted, lineHeight: 1.7 }}>
              Real feedback from Pakistani shop owners using InvoiceFlow
              daily.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: '1.5rem',
            }}
            className="testimonial-grid"
          >
            <TestimonialCard
              quote="Meri dukan ka pura hisaab ab isi system mein hai. Udhaar ka hisaab rakhna ab bilkul asaan ho gaya hai."
              name="Muhammad Aslam"
              role="Kiryana Store Owner, Lahore"
              initials="MA"
              color="blue"
            />
            <TestimonialCard
              quote="The PDF invoices look very professional. Customers trust us more now. JazzCash integration is a game-changer."
              name="Fatima Khan"
              role="Boutique Owner, Karachi"
              initials="FK"
              color="purple"
            />
            <TestimonialCard
              quote="Pehle roz ka hisaab likhne mein 1 ghanta lagta tha. Ab 5 minute mein sab kuch ho jata hai."
              name="Ahmed Raza"
              role="General Store, Faisalabad"
              initials="AR"
              color="green"
            />
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: THEME.gradient,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1,
            backgroundImage:
              'radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div
          style={{
            position: 'relative',
            maxWidth: '56rem',
            margin: '0 auto',
            padding: '6rem 1rem',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 3rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}
          >
            Ready to modernise your shop?
          </h2>
          <p
            style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '42rem',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
            }}
          >
            Join hundreds of Pakistani shops already using InvoiceFlow to
            manage their sales, stock, and reports.
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <Link
              href="/register"
              style={{
                background: '#FFFFFF',
                color: THEME.purple,
                fontWeight: 600,
                padding: '1rem 2rem',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
              }}
            >
              Start Free Trial
              <span>→</span>
            </Link>
            <Link
              href="/login"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#FFFFFF',
                fontWeight: 600,
                padding: '1rem 2rem',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              Log In
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer
        id="about"
        style={{
          background: 'rgba(5, 8, 16, 0.95)',
          color: THEME.textMuted,
          padding: '4rem 1rem',
          borderTop: '1px solid rgba(124, 58, 237, 0.2)',
        }}
      >
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2rem',
              marginBottom: '3rem',
            }}
            className="footer-grid"
          >
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
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
                  }}
                >
                  ◈
                </div>
                <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.125rem' }}>
                  InvoiceFlow
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                Modern retail POS & billing system for Pakistani shops.
              </p>
            </div>

            <div>
              <h4 style={{ color: '#FFFFFF', fontWeight: 600, marginBottom: '1rem' }}>Product</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                <li>
                  <a href="#features" style={{ color: THEME.textMuted, textDecoration: 'none', transition: 'color 0.2s' }}>
                    Features
                  </a>
                </li>
                <li>
                  <a href="#products" style={{ color: THEME.textMuted, textDecoration: 'none', transition: 'color 0.2s' }}>
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: THEME.textMuted, textDecoration: 'none', transition: 'color 0.2s' }}>
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#FFFFFF', fontWeight: 600, marginBottom: '1rem' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                <li>
                  <a href="#" style={{ color: THEME.textMuted, textDecoration: 'none', transition: 'color 0.2s' }}>
                    About
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: THEME.textMuted, textDecoration: 'none', transition: 'color 0.2s' }}>
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: THEME.textMuted, textDecoration: 'none', transition: 'color 0.2s' }}>
                    Privacy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#FFFFFF', fontWeight: 600, marginBottom: '1rem' }}>Support</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                <li>
                  <a href="#" style={{ color: THEME.textMuted, textDecoration: 'none', transition: 'color 0.2s' }}>
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: THEME.textMuted, textDecoration: 'none', transition: 'color 0.2s' }}>
                    WhatsApp: 0300-1234567
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: THEME.textMuted, textDecoration: 'none', transition: 'color 0.2s' }}>
                    support@invoiceflow.pk
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            style={{
              paddingTop: '2rem',
              borderTop: '1px solid rgba(148, 163, 184, 0.15)',
              textAlign: 'center',
              fontSize: '0.875rem',
            }}
          >
            © 2026 InvoiceFlow Pakistan. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

// ==================================================
// ============== SUB COMPONENTS ====================
// ==================================================

function Stat({
  number,
  label,
  color,
}: {
  number: string;
  label: string;
  color: 'blue' | 'purple' | 'green' | 'orange';
}) {
  const colorMap: Record<string, string> = {
    blue: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
    purple: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
    green: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    orange: 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
  };

  return (
    <div>
      <div
        style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 'bold',
          background: colorMap[color],
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {number}
      </div>
      <div style={{ fontSize: '0.875rem', color: THEME.textMuted, marginTop: '0.25rem', fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
}

function ShopCard({
  image,
  title,
  description,
  tag,
  tagColor,
  stat,
}: {
  image: string;
  title: string;
  description: string;
  tag: string;
  tagColor: 'blue' | 'purple' | 'green' | 'pink' | 'orange' | 'red';
  stat: string;
}) {
  const tagColors: Record<string, string> = {
    blue: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
    purple: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
    green: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    pink: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)',
    orange: 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
    red: 'linear-gradient(135deg, #EF4444 0%, #F43F5E 100%)',
  };

  return (
    <div
      style={{
        background: THEME.glass,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${THEME.glassBorder}`,
        borderRadius: '1rem',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div style={{ position: 'relative', height: '14rem', width: '100%', overflow: 'hidden' }}>
        <img
          src={image}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10, 14, 26, 0.9) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              color: '#FFFFFF',
              background: tagColors[tagColor],
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            }}
          >
            {tag}
          </span>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            background: 'rgba(20, 27, 45, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '0.5rem',
            padding: '0.25rem 0.75rem',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            color: THEME.text,
            border: `1px solid ${THEME.glassBorder}`,
          }}
        >
          {stat}
        </div>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: THEME.text, marginBottom: '0.5rem' }}>
          {title}
        </h3>
        <p style={{ color: THEME.textMuted, fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
          {description}
        </p>
      </div>
    </div>
  );
}

function ImageFeatureCard({
  image,
  title,
  description,
  gradient,
}: {
  image: string;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div
      style={{
        background: THEME.glass,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${THEME.glassBorder}`,
        borderRadius: '1rem',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div style={{ position: 'relative', height: '13rem', width: '100%', overflow: 'hidden', background: 'rgba(10, 14, 26, 0.5)' }}>
        <img
          src={image}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10, 14, 26, 0.8) 0%, transparent 60%)' }} />
      </div>
      <div style={{ padding: '1.5rem' }}>
        <div
          style={{
            display: 'inline-block',
            height: '0.25rem',
            width: '3rem',
            borderRadius: '9999px',
            background: THEME.gradient,
            marginBottom: '0.75rem',
          }}
        />
        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: THEME.text, marginBottom: '0.5rem' }}>
          {title}
        </h3>
        <p style={{ color: THEME.textMuted, fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
          {description}
        </p>
      </div>
    </div>
  );
}

function ProductCard({
  image,
  name,
  sku,
  price,
  stock,
  gradient,
}: {
  image: string;
  name: string;
  sku: string;
  price: string;
  stock: string;
  gradient: string;
}) {
  return (
    <div
      style={{
        background: THEME.glass,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${THEME.glassBorder}`,
        borderRadius: '1rem',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div style={{ position: 'relative', height: '12rem', width: '100%', overflow: 'hidden', background: 'rgba(10, 14, 26, 0.5)' }}>
        <img
          src={image}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10, 14, 26, 0.7) 0%, transparent 60%)' }} />
        <div
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            color: '#FFFFFF',
            background: THEME.gradient,
            boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)',
          }}
        >
          {price}
        </div>
      </div>
      <div style={{ padding: '1.25rem' }}>
        <h3 style={{ fontWeight: 'bold', color: THEME.text, marginBottom: '0.25rem' }}>{name}</h3>
        <div style={{ fontSize: '0.75rem', color: THEME.textDim, fontFamily: 'monospace', marginBottom: '0.75rem' }}>
          {sku}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.75rem', color: THEME.textMuted }}>In stock</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: THEME.green }}>{stock}</span>
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({
  quote,
  name,
  role,
  initials,
  color,
}: {
  quote: string;
  name: string;
  role: string;
  initials: string;
  color: 'blue' | 'purple' | 'green';
}) {
  const colors: Record<string, string> = {
    blue: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
    purple: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
    green: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  };

  return (
    <div
      style={{
        background: THEME.glass,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${THEME.glassBorder}`,
        borderRadius: '1rem',
        padding: '1.5rem',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', color: '#FBBF24', fontSize: '1.125rem' }}>
        ★★★★★
      </div>
      <p style={{ color: THEME.textMuted, lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>
        &ldquo;{quote}&rdquo;
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div
          style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '9999px',
            background: colors[color],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          {initials}
        </div>
        <div>
          <div style={{ fontWeight: 'bold', color: THEME.text, fontSize: '0.875rem' }}>{name}</div>
          <div style={{ fontSize: '0.75rem', color: THEME.textDim }}>{role}</div>
        </div>
      </div>
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
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }

      /* Responsive grids */
      @media (min-width: 768px) {
        .trust-grid { grid-template-columns: repeat(4, 1fr) !important; }
        .shop-grid { grid-template-columns: repeat(3, 1fr) !important; }
        .feature-grid { grid-template-columns: repeat(3, 1fr) !important; }
        .product-grid { grid-template-columns: repeat(2, 1fr) !important; }
        .testimonial-grid { grid-template-columns: repeat(3, 1fr) !important; }
        .footer-grid { grid-template-columns: repeat(4, 1fr) !important; }
        .footer-grid > div:first-child { grid-column: span 1 !important; }
        .hero-grid { grid-template-columns: repeat(2, 1fr) !important; }
        .currency-grid { grid-template-columns: repeat(2, 1fr) !important; }
        .nav-links { display: flex !important; }
      }
      @media (min-width: 1024px) {
        .product-grid { grid-template-columns: repeat(4, 1fr) !important; }
      }
    `}</style>
  );
}