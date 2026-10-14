'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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

// ============================================================
// VERIFY EMAIL CONTENT
// ============================================================
function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') || '';

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage(
        'No verification token found. Please use the link from your email.'
      );
      return;
    }

    (async () => {
      try {
        const res = await fetch(
          `${API}/auth/verify-email?token=${encodeURIComponent(token)}`
        );

        const data = await res.json();

        if (res.ok) {
          setStatus('success');
          setMessage(
            data.message || 'Email verified successfully! You can now log in.'
          );

          setTimeout(() => router.push('/login'), 3000);
        } else {
          setStatus('error');
          setMessage(
            data.message ||
              'Verification failed. The link may have expired or already been used.'
          );
        }
      } catch (err: any) {
        setStatus('error');
        setMessage(err.message || 'Network error. Please try again.');
      }
    })();
  }, [token, router]);

  // ============================================================
  // LOADING STATE
  // ============================================================
  if (status === 'loading') {
    return (
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '4rem',
            height: '4rem',
            margin: '0 auto 1rem',
            borderRadius: '9999px',
            background: 'rgba(124, 58, 237, 0.15)',
            border: '1px solid rgba(124, 58, 237, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              width: '2rem',
              height: '2rem',
              border: `4px solid ${THEME.purple}`,
              borderTopColor: 'transparent',
              borderRadius: '9999px',
              animation: 'spin 1s linear infinite',
              display: 'inline-block',
            }}
          />
        </div>

        <h1
          style={{
            fontSize: '1.35rem',
            fontWeight: 'bold',
            background: THEME.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em',
          }}
        >
          Verifying your email...
        </h1>

        <p
          style={{
            fontSize: '0.85rem',
            color: THEME.textMuted,
            fontWeight: 500,
            margin: 0,
          }}
        >
          Please wait while we confirm your account.
        </p>
      </div>
    );
  }

  // ============================================================
  // SUCCESS STATE
  // ============================================================
  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '4rem',
            height: '4rem',
            margin: '0 auto 1rem',
            borderRadius: '9999px',
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid rgba(34, 197, 94, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#4ADE80"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1
          style={{
            fontSize: '1.35rem',
            fontWeight: 'bold',
            background: THEME.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em',
          }}
        >
          Email Verified!
        </h1>

        <p
          style={{
            fontSize: '0.85rem',
            color: THEME.textMuted,
            fontWeight: 500,
            marginBottom: '1.5rem',
          }}
        >
          {message}
        </p>

        <p
          style={{
            fontSize: '0.75rem',
            color: THEME.textDim,
            marginBottom: '1rem',
          }}
        >
          Redirecting to login in a few seconds...
        </p>

        <Link
          href="/login"
          style={{
            display: 'inline-block',
            width: '100%',
            padding: '0.85rem',
            borderRadius: '0.75rem',
            background: THEME.gradient,
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '0.9rem',
            textDecoration: 'none',
            boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
            transition: 'all 0.2s',
          }}
        >
          Go to Login
        </Link>
      </div>
    );
  }

  // ============================================================
  // ERROR STATE
  // ============================================================
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: '4rem',
          height: '4rem',
          margin: '0 auto 1rem',
          borderRadius: '9999px',
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#F87171"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <h1
        style={{
          fontSize: '1.35rem',
          fontWeight: 'bold',
          background: THEME.gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em',
        }}
      >
        Verification Failed
      </h1>

      <p
        style={{
          fontSize: '0.85rem',
          color: THEME.textMuted,
          fontWeight: 500,
          marginBottom: '1.5rem',
        }}
      >
        {message}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Link
          href="/login"
          style={{
            display: 'inline-block',
            width: '100%',
            padding: '0.85rem',
            borderRadius: '0.75rem',
            background: THEME.gradient,
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '0.9rem',
            textDecoration: 'none',
            boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
            transition: 'all 0.2s',
          }}
        >
          Go to Login
        </Link>

        <Link
          href="/register"
          style={{
            display: 'inline-block',
            width: '100%',
            padding: '0.85rem',
            borderRadius: '0.75rem',
            background: 'rgba(124, 58, 237, 0.15)',
            border: '1px solid rgba(124, 58, 237, 0.4)',
            color: '#C4B5FD',
            fontWeight: 700,
            fontSize: '0.9rem',
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}
        >
          Register Again
        </Link>
      </div>
    </div>
  );
}

// ============================================================
// PAGE
// ============================================================
export default function VerifyEmailPage() {
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
      {/* SINGLE CARD — LOGO + CONTENT + BACK LINK     */}
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
        {/* ========== LOGO ========== */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
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
        </div>

        {/* ========== CONTENT ========== */}
        <Suspense
          fallback={
            <div
              style={{
                textAlign: 'center',
                color: THEME.textMuted,
                fontSize: '0.85rem',
                padding: '1rem 0',
              }}
            >
              Loading...
            </div>
          }
        >
          <VerifyEmailContent />
        </Suspense>

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