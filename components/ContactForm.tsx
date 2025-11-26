'use client'

import { useState } from 'react'

interface StatusState {
  type: 'idle' | 'loading' | 'success' | 'error'
  message?: string
}

export default function ContactForm() {
  const [status, setStatus] = useState<StatusState>({ type: 'idle' })
  const [isHoveringSend, setIsHoveringSend] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus({ type: 'loading' })

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      email: String(formData.get('email') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    }

    if (!payload.email || !payload.message) {
      setStatus({ type: 'error', message: 'Both fields are required.' })
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error?.message || 'Unable to send message.')
      }

      setStatus({ type: 'success', message: 'Thanks! I’ll be in touch soon.' })
      form.reset()
    } catch (error) {
      setStatus({ type: 'error', message: (error as Error).message })
    }
  }

  const isSubmitting = status.type === 'loading'

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <input
        type="email"
        name="email"
        placeholder="you@email.com"
        required
        disabled={isSubmitting}
        style={{
          width: '100%',
          padding: '14px 18px',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.04)',
          color: '#f4f4f4',
          fontSize: '1.1rem',
          fontFamily: 'var(--font-body)',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          outline: 'none',
        }}
        onFocus={(event) => {
          event.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'
          event.currentTarget.style.boxShadow = '0 0 0 6px rgba(255,255,255,0.06)'
        }}
        onBlur={(event) => {
          event.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
          event.currentTarget.style.boxShadow = 'none'
        }}
      />
      <textarea
        name="message"
        placeholder="Short note or context…"
        required
        rows={3}
        disabled={isSubmitting}
        style={{
          width: '100%',
          padding: '14px 18px',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.04)',
          color: '#f4f4f4',
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          resize: 'vertical',
          minHeight: '140px',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          outline: 'none',
        }}
        onFocus={(event) => {
          event.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'
          event.currentTarget.style.boxShadow = '0 0 0 6px rgba(255,255,255,0.06)'
        }}
        onBlur={(event) => {
          event.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
          event.currentTarget.style.boxShadow = 'none'
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
        <button
          type="submit"
          disabled={isSubmitting}
          onMouseEnter={() => setIsHoveringSend(true)}
          onMouseLeave={() => setIsHoveringSend(false)}
          style={{
            padding: '14px 36px',
            borderRadius: '999px',
            border: '1px solid #bcff4e',
            background: isSubmitting
              ? 'transparent'
              : isHoveringSend
              ? 'rgba(188, 255, 78, 0.1)'
              : 'transparent',
            boxShadow: isHoveringSend
              ? '0 0 35px rgba(188, 255, 78, 0.4)'
              : '0 0 25px rgba(188, 255, 78, 0.25)',
            color: '#bcff4e',
            fontSize: '1rem',
            fontWeight: 600,
            fontFamily: 'var(--font-heading)',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease, background 0.2s ease',
            opacity: isSubmitting ? 0.7 : 1,
            transform: isSubmitting ? 'translateY(0)' : 'translateY(-1px)',
            alignSelf: 'flex-start',
          }}
        >
          {isSubmitting ? 'Sending…' : 'Send'}
        </button>
        {status.type !== 'idle' && status.message && (
          <span
            style={{
              fontSize: '0.85rem',
              color: status.type === 'error' ? '#ffb3b3' : '#bcff4e',
              fontFamily: 'var(--font-body)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '999px',
              border: status.type === 'error'
                ? '1px solid rgba(255, 179, 179, 0.4)'
                : '1px solid rgba(188, 255, 78, 0.4)',
              background: status.type === 'error'
                ? 'rgba(255, 179, 179, 0.08)'
                : 'rgba(188, 255, 78, 0.08)',
              transition: 'opacity 0.2s ease',
            }}
          >
            {status.type === 'success' ? '✓' : '⚠'} {status.message}
          </span>
        )}
      </div>
    </form>
  )
}

