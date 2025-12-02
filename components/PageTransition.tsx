'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTransition() {
  const [isLoading, setIsLoading] = useState(false)
  const [opacity, setOpacity] = useState(0)
  const pathname = usePathname()
  const previousPathRef = useRef<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const fadeInTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const fadeOutTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    // Trigger on any pathname change (including initial navigation)
    if (previousPathRef.current !== pathname) {
      setIsLoading(true)
      startTimeRef.current = Date.now()
      
      // Clear any existing timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (fadeInTimeoutRef.current) {
        clearTimeout(fadeInTimeoutRef.current)
      }
      if (fadeOutTimeoutRef.current) {
        clearTimeout(fadeOutTimeoutRef.current)
      }
      
      // Fade in: 0 to 1 over 300ms
      setOpacity(0)
      fadeInTimeoutRef.current = setTimeout(() => {
        setOpacity(1)
      }, 10)
      
      // Always show for at least 1 second total
      const minDisplayTime = 1000
      const fadeInDuration = 300
      const fadeOutDuration = 300
      const holdTime = minDisplayTime - fadeInDuration - fadeOutDuration
      
      // Fade out after hold time
      timeoutRef.current = setTimeout(() => {
        setOpacity(0)
        fadeOutTimeoutRef.current = setTimeout(() => {
          setIsLoading(false)
          startTimeRef.current = null
        }, fadeOutDuration)
      }, fadeInDuration + holdTime)
      
      previousPathRef.current = pathname
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (fadeInTimeoutRef.current) {
        clearTimeout(fadeInTimeoutRef.current)
      }
      if (fadeOutTimeoutRef.current) {
        clearTimeout(fadeOutTimeoutRef.current)
      }
    }
  }, [pathname])

  if (!isLoading) return null

  // Blur amount is inversely related to opacity - when black screen is fully visible (opacity 1), blur is max
  // When black screen fades out (opacity 0), blur is 0
  const blurAmount = opacity * 20 // Max blur of 20px when fully opaque

  return (
    <>
      {/* Black overlay with fade */}
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
          opacity: opacity,
          zIndex: 99999,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
      {/* Blur overlay for the page content */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'backdrop-filter 0.3s ease-in-out, -webkit-backdrop-filter 0.3s ease-in-out',
        }}
      />
    </>
  )
}