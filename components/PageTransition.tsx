'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTransition() {
  const [isVisible, setIsVisible] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'blur-in' | 'blur-out'>('idle')
  const pathname = usePathname()
  const previousPathRef = useRef(pathname)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Only trigger transition if path actually changed
    if (previousPathRef.current !== pathname) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Start transition
      setIsVisible(true)
      setPhase('blur-in')

      // Phase 1: Blur in (200ms)
      timeoutRef.current = setTimeout(() => {
        setPhase('blur-out')
        
        // Phase 2: Blur out (200ms)
        timeoutRef.current = setTimeout(() => {
          setIsVisible(false)
          setPhase('idle')
        }, 200)
      }, 200)

      // Update previous path
      previousPathRef.current = pathname
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [pathname])

  if (!isVisible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.1s ease-in-out',
      }}
    >
      {/* Main blur overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: phase === 'blur-in' 
            ? 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%)'
            : 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%)',
          backdropFilter: phase === 'blur-in' ? 'blur(40px)' : 'blur(0px)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'backdrop-filter, background',
        }}
      />
      
      {/* Animated center element */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: phase === 'blur-in'
            ? 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
          opacity: phase === 'blur-in' ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${phase === 'blur-in' ? 1 : 0.6})`,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      
      {/* Additional blur layers for more dramatic effect */}
      <div
        className="absolute inset-0"
        style={{
          background: phase === 'blur-in'
            ? 'radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, transparent 60%)'
            : 'radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, transparent 60%)',
          backdropFilter: phase === 'blur-in' ? 'blur(20px)' : 'blur(0px)',
          transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      
      {/* Subtle particle effects */}
      <div
        className="absolute inset-0"
        style={{
          background: phase === 'blur-in'
            ? 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.06) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.01) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.01) 0%, transparent 50%)',
          opacity: phase === 'blur-in' ? 1 : 0,
          transition: 'opacity 0.1s ease-in-out',
        }}
      />
    </div>
  )
}