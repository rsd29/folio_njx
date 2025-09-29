'use client'

import { useState, useEffect, useRef } from 'react'

// Obfuscated password logic - harder to scrape
const getPassword = () => {
  const chars = ['u', 'x', 'd', 'e', 's', 'i', 'g', 'n']
  const indices = [0, 1, 2, 3, 4, 5, 6, 7]
  return indices.map(i => chars[i]).join('')
}

const getHash = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Check if already authenticated (stored in sessionStorage)
  useEffect(() => {
    const stored = sessionStorage.getItem('auth_token')
    if (stored) {
      const expectedHash = getHash(getPassword())
      if (parseInt(stored) === expectedHash) {
        setIsAuthenticated(true)
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Rate limiting
    if (attempts >= 3) {
      setError('Too many attempts. Please refresh the page.')
      return
    }

    const correctPassword = getPassword()
    const inputHash = getHash(password)
    const correctHash = getHash(correctPassword)

    if (inputHash === correctHash) {
      // Store authentication token
      sessionStorage.setItem('auth_token', correctHash.toString())
      setIsAuthenticated(true)
      setError('')
    } else {
      setAttempts(prev => prev + 1)
      setError(`Incorrect password. ${3 - attempts} attempts remaining.`)
      setPassword('')
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div 
      className="fixed inset-0 z-[99999] bg-black flex items-center justify-center"
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      
      {/* Password form */}
      <div className="relative z-20 text-center px-8 py-12 mx-auto w-full flex-shrink-0" style={{ zIndex: 20, maxWidth: '600px', padding: '48px 32px' }}>
        <div className="mb-12">
          <h1 className="text-6xl font-light text-white mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
            Portfolio
          </h1>
          <p className="text-gray-300 text-xl mb-2" style={{ color: '#d1d5db' }}>
            Enter password to access
          </p>
          <p className="text-gray-500 text-sm" style={{ color: '#6b7280' }}>
            Professional UX Design Portfolio
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-6 py-4 bg-transparent border-2 border-gray-600 rounded-none text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all duration-300 text-lg"
              style={{ 
                fontFamily: 'var(--font-body)',
                color: 'white',
                backgroundColor: 'transparent',
                border: '2px solid #4b5563',
                padding: '16px 24px',
                fontSize: '18px'
              }}
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500/30 px-4 py-3 rounded">
              <p className="text-red-300 text-sm">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-white text-black font-medium hover:bg-gray-200 transition-all duration-300 text-lg"
            style={{ 
              fontFamily: 'var(--font-body)',
              backgroundColor: 'white',
              color: 'black',
              padding: '16px',
              fontSize: '18px',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              marginTop: '20px',
              borderRadius: '10px'
            }}
          >
            Access Portfolio
          </button>
        </form>

        {/* Hint */}
        <div className="mt-12 text-gray-600 text-sm" style={{ color: '#6b7280', marginTop: '48px' }}>
          <p>Hint: My profession in two words</p>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        <div 
          className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            animation: 'float 10s ease-in-out infinite reverse',
          }}
        />
        <div 
          className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            animation: 'float 12s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  )
}
