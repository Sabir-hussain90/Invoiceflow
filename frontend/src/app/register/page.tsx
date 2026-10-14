'use client';

import { useState } from 'react';
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
};

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: '',
    shopName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          shopName: form.shopName || undefined,
          email: form.email,
          phone: form.phone || undefined,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
        setLoading(false);
        return;
      }

      setSuccess(
        data.message || 'Registered! Check your email to verify, then log in.'
      );

      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.');
      setLoading(false);
    }
  };

  // Reusable input style
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.65rem 0.85rem',
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
    fontWeight: 700,
    marginBottom: '0.4rem',
    background: THEME.gradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: THEME.pageBg,
        color: THEME.text,
        padding: '2rem 1rem',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      <GlobalStyles />

      {/* ============================================ */}
      {/* SINGLE CARD — WELCOME + FORM + BACK LINK     */}
      {/* ============================================ */}
      <div
        style={{
          width: '100%',
          maxWidth: '26rem',
          background: THEME.glass,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${THEME.glassBorder}`,
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* ========== WELCOME HEADER ========== */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.75rem',
                background: THEME.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1.25rem',
                boxShadow: '0 4px 20px rgba(124, 58, 237, 0.5)',
              }}
            >
              ◈
            </div>
          </Link>

          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: 'bold',
              background: THEME.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.35rem',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            Create your account
          </h1>

          <p
            style={{
              fontSize: '0.85rem',
              background: THEME.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 500,
              margin: 0,
            }}
          >
            Start managing your shop in minutes
          </p>
        </div>

        {/* ========== FORM ========== */}
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {error && (
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#FCA5A5',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.8rem',
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
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                color: '#86EFAC',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
              }}
            >
              <span>✓</span>
              <span>{success}</span>
            </div>
          )}

          {/* Full Name — REQUIRED */}
          <div>
            <label style={labelStyle}>
              Full Name <span style={{ color: '#F87171' }}>*</span>
            </label>
            <input
              type="text"
              required
              autoComplete="name"
              value={form.fullName}
              onChange={(e) =>
                setForm({ ...form, fullName: e.target.value })
              }
              placeholder="Enter your full name"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* Shop Name — OPTIONAL */}
          <div>
            <label style={labelStyle}>
              Shop Name{' '}
              <span style={{ color: THEME.textDim, fontWeight: 500 }}>
                (optional)
              </span>
            </label>
            <input
              type="text"
              autoComplete="organization"
              value={form.shopName}
              onChange={(e) =>
                setForm({ ...form, shopName: e.target.value })
              }
              placeholder="Enter your shop name"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <p
              style={{
                fontSize: '0.7rem',
                marginTop: '0.35rem',
                background: THEME.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 500,
              }}
            >
              Leave empty to join as a cashier
            </p>
          </div>

          {/* Email — REQUIRED */}
          <div>
            <label style={labelStyle}>
              Email <span style={{ color: '#F87171' }}>*</span>
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email address"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* Phone — OPTIONAL */}
          <div>
            <label style={labelStyle}>
              Phone{' '}
              <span style={{ color: THEME.textDim, fontWeight: 500 }}>
                (optional)
              </span>
            </label>
            <input
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Enter your phone number"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* Password — REQUIRED */}
          <div>
            <label style={labelStyle}>
              Password <span style={{ color: '#F87171' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                minLength={6}
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                placeholder="Enter password (min 6 characters)"
                style={{ ...inputStyle, paddingRight: '2.5rem' }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.65rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: THEME.textMuted,
                  cursor: 'pointer',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Confirm Password — REQUIRED */}
          <div>
            <label style={labelStyle}>
              Confirm Password <span style={{ color: '#F87171' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirm ? 'text' : 'password'}
                required
                autoComplete="new-password"
                minLength={6}
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                placeholder="Re-enter your password"
                style={{
                  ...inputStyle,
                  paddingRight: '2.5rem',
                  borderColor:
                    form.confirmPassword &&
                    form.password !== form.confirmPassword
                      ? 'rgba(239, 68, 68, 0.6)'
                      : 'rgba(148, 163, 184, 0.2)',
                }}
                onFocus={(e) => {
                  if (
                    form.confirmPassword &&
                    form.password !== form.confirmPassword
                  ) {
                    e.currentTarget.style.borderColor =
                      'rgba(239, 68, 68, 0.8)';
                    e.currentTarget.style.boxShadow =
                      '0 0 0 3px rgba(239, 68, 68, 0.2)';
                  } else {
                    handleFocus(e);
                  }
                }}
                onBlur={(e) => {
                  if (
                    form.confirmPassword &&
                    form.password !== form.confirmPassword
                  ) {
                    e.currentTarget.style.borderColor =
                      'rgba(239, 68, 68, 0.6)';
                    e.currentTarget.style.boxShadow = 'none';
                  } else {
                    handleBlur(e);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                style={{
                  position: 'absolute',
                  right: '0.65rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: THEME.textMuted,
                  cursor: 'pointer',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
                tabIndex={-1}
                aria-label={
                  showConfirm ? 'Hide confirm password' : 'Show confirm password'
                }
              >
                {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {form.confirmPassword &&
              form.password !== form.confirmPassword && (
                <p
                  style={{
                    fontSize: '0.7rem',
                    color: '#FCA5A5',
                    marginTop: '0.35rem',
                  }}
                >
                  Passwords do not match
                </p>
              )}
          </div>

          {/* Required note */}
          <p
            style={{
              fontSize: '0.7rem',
              color: THEME.textDim,
              margin: 0,
            }}
          >
            Fields marked with <span style={{ color: '#F87171' }}>*</span> are
            required
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: '0.75rem',
              border: 'none',
              background: THEME.gradient,
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
              boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
              transition: 'all 0.2s',
              marginTop: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            {loading ? (
              <>
                <span
                  style={{
                    width: '1rem',
                    height: '1rem',
                    border: '2px solid #FFFFFF',
                    borderTopColor: 'transparent',
                    borderRadius: '9999px',
                    animation: 'spin 1s linear infinite',
                    display: 'inline-block',
                  }}
                />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>

          {/* Login link */}
          <div
            style={{
              textAlign: 'center',
              fontSize: '0.75rem',
              paddingTop: '0.5rem',
              color: THEME.textMuted,
            }}
          >
            Already have an account?{' '}
            <Link
              href="/login"
              style={{
                fontWeight: 700,
                background: THEME.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textDecoration: 'none',
              }}
            >
              Login
            </Link>
          </div>
        </form>

        {/* ============================================ */}
        {/* BACK TO HOME — INSIDE THE CARD              */}
        {/* ============================================ */}
        <div
          style={{
            marginTop: '1.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(148, 163, 184, 0.15)',
            textAlign: 'center',
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: '0.8rem',
              color: THEME.textMuted,
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            ← Back to home
          </Link>
        </div>
      </div>
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
      width="16"
      height="16"
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
      width="16"
      height="16"
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
    `}</style>
  );
}