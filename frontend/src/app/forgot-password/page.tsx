'use client';

import { useState } from 'react';
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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch(`${API}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        setLoading(false);
        return;
      }

      setSuccess(
        data.message ||
          'If that email exists, a reset link has been sent. Check your inbox.'
      );
      setEmail('');
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
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
          maxWidth: '24rem',
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
            Forgot password?
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
            We&apos;ll send you a reset link
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

          {/* Email — REQUIRED */}
          <div>
            <label
              style={{
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
              }}
            >
              Email <span style={{ color: '#F87171' }}>*</span>
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                background: 'rgba(10, 14, 26, 0.6)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '0.5rem',
                color: THEME.text,
                fontSize: '0.875rem',
                outline: 'none',
                transition: 'all 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = THEME.purple;
                e.currentTarget.style.boxShadow =
                  '0 0 0 3px rgba(124, 58, 237, 0.2)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
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
                Sending reset link...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>

          {/* Back to Login link */}
          <div
            style={{
              textAlign: 'center',
              fontSize: '0.75rem',
              paddingTop: '0.5rem',
              color: THEME.textMuted,
            }}
          >
            Remember your password?{' '}
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
              Back to Login
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