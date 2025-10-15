'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTransition() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const previousPathRef = useRef(pathname)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Detect pathname change
    if (previousPathRef.current !== pathname) {
      console.log('PATH CHANGED - Showing loader')
      
      // Show loading screen immediately
      setIsLoading(true)
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      // Keep loading screen visible for minimum 2 seconds
      timeoutRef.current = setTimeout(() => {
        console.log('Hiding loader after 2 seconds')
        setIsLoading(false)
      }, 2000)
      
      // Update previous path
      previousPathRef.current = pathname
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [pathname])

  console.log('PageTransition render - isLoading:', isLoading)

  if (!isLoading) return null

  return (
    <div
      className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        opacity: 1,
      }}
    >
      {/* Simple white loading bar */}
      <div
        style={{
          width: '120px',
          height: '6px',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '3px',
          overflow: 'hidden',
        }}
      >
        <div
          className="loading-bar-fill"
          style={{
            height: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '3px',
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.8)',
          }}
        />
      </div>
      <style jsx>{`
        @keyframes loadingBar {
          0% { 
            width: 0%; 
          }
          50% {
            width: 70%;
          }
          100% { 
            width: 100%; 
          }
        }
        .loading-bar-fill {
          animation: loadingBar 2s ease-in-out;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  )
}