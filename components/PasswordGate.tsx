'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

interface PasswordGateProps {
  children: React.ReactNode
  correctPassword?: string
  title?: string
  description?: string
  submitLabel?: string
  storageKey?: string
  requestPasswordLabel?: string
}

const MAX_ATTEMPTS = 3
const FOOTER_CTA_REQUEST_KEY = 'footer_cta_open_request'

const getHash = (value: string) => {
  let hash = 0

  for (let i = 0; i < value.length; i++) {
    const character = value.charCodeAt(i)
    hash = ((hash << 5) - hash) + character
    hash = hash & hash
  }

  return Math.abs(hash)
}

export default function PasswordGate({
  children,
  correctPassword = 'design2026',
  title = 'Case Studies',
  description = 'Request a password to view my case studies!',
  submitLabel = 'View case studies',
  storageKey = 'case_study_auth_token',
  requestPasswordLabel = 'Request password',
}: PasswordGateProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const storedToken = sessionStorage.getItem(storageKey)
    const expectedToken = getHash(correctPassword).toString()

    if (storedToken === expectedToken) {
      setIsAuthenticated(true)
    }
  }, [correctPassword, storageKey])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (attempts >= MAX_ATTEMPTS) {
      setError('Too many attempts. Please refresh the page.')
      return
    }

    const inputHash = getHash(password).toString()
    const expectedHash = getHash(correctPassword).toString()

    if (inputHash === expectedHash) {
      sessionStorage.setItem(storageKey, expectedHash)
      setIsAuthenticated(true)
      setError('')
      return
    }

    const nextAttempts = attempts + 1
    const attemptsRemaining = MAX_ATTEMPTS - nextAttempts

    setAttempts(nextAttempts)
    setPassword('')
    setError(
      attemptsRemaining > 0
        ? `Incorrect password. ${attemptsRemaining} attempt${attemptsRemaining === 1 ? '' : 's'} remaining.`
        : 'Too many attempts. Please refresh the page.',
    )

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleRequestPassword = () => {
    if (typeof window === 'undefined') return

    sessionStorage.setItem(FOOTER_CTA_REQUEST_KEY, 'true')
    router.push('/')
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(circle at top, rgba(64, 64, 64, 0.35), transparent 40%), #000000',
        padding: '32px',
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          width: '100%',
          maxWidth: '560px',
          padding: '48px 32px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          background: 'rgba(12, 12, 12, 0.92)',
          backdropFilter: 'blur(16px)',
          textAlign: 'center',
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.45)',
        }}
      >
        <div style={{ marginBottom: '32px' }}>
          <h1
            style={{
              margin: '0 0 12px',
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 400,
              color: '#ffffff',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              margin: 0,
              color: '#c7c7c7',
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            autoComplete="current-password"
            autoFocus
            aria-label="Case study password"
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              color: '#ffffff',
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              outline: 'none',
            }}
          />

          {error && (
            <div
              style={{
                marginTop: '16px',
                border: '1px solid rgba(255, 107, 107, 0.35)',
                borderRadius: '14px',
                background: 'rgba(120, 20, 20, 0.18)',
                padding: '12px 14px',
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: '#ffb4b4',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                }}
              >
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={attempts >= MAX_ATTEMPTS}
            style={{
              width: '100%',
              marginTop: '18px',
              padding: '16px',
              border: 'none',
              borderRadius: '14px',
              backgroundColor: attempts >= MAX_ATTEMPTS ? '#6b6b6b' : '#ffffff',
              color: '#000000',
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: 600,
              opacity: attempts >= MAX_ATTEMPTS ? 0.6 : 1,
            }}
          >
            {submitLabel}
          </button>
        </form>

        <button
          type="button"
          onClick={handleRequestPassword}
          style={{
            marginTop: '18px',
            border: 'none',
            background: 'transparent',
            color: 'rgba(255, 255, 255, 0.72)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
          }}
        >
          {requestPasswordLabel}
        </button>
      </div>
    </div>
  )
}
