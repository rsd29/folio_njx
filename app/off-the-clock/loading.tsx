'use client'

import { useEffect, useState, useRef } from 'react'

export default function Loading() {
  const [visible, setVisible] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    // Reset start time on every mount
    startTimeRef.current = Date.now()
    setVisible(true)

    // Always wait at least 1 second
    const minDisplayTime = 1000 // 1 second in milliseconds

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setVisible(false)
    }, minDisplayTime)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          color: '#ffffff',
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          fontWeight: 400,
        }}
      >
        loading
      </div>
    </div>
  )
}
