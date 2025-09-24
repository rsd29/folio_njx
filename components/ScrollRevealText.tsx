'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollRevealTextProps {
  text: string
  fontSize?: string
  fontWeight?: number
  lineHeight?: number
  letterSpacing?: string
  className?: string
  isStrong?: boolean
}

export default function ScrollRevealText({
  text,
  fontSize = '2.5rem',
  fontWeight = 300,
  lineHeight = 1.2,
  letterSpacing = '-0.01em',
  className = '',
  isStrong = false
}: ScrollRevealTextProps) {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [countValue, setCountValue] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // More precise trigger logic
      const elementTop = rect.top
      const elementBottom = rect.bottom

      // Trigger when element enters viewport with small buffer
      const shouldBeVisible = elementTop < windowHeight * 0.95 && elementBottom > windowHeight * 0.05

      if (shouldBeVisible && !isVisible) {
        setIsVisible(true)
        setHasAnimated(true)
        
        // Start counting animation if text contains "Year 5"
        if (text.toLowerCase().includes('year 5')) {
          setCountValue(0)
          let currentCount = 0
          const delays = [100, 100, 150, 200, 250] // Faster start, slower end
          
          const countNext = () => {
            if (currentCount < 5) {
              setCountValue(currentCount + 1)
              currentCount++
              setTimeout(countNext, delays[currentCount - 1] || 250)
            }
          }
          
          setTimeout(countNext, 100)
        }
      } else if (!shouldBeVisible && isVisible) {
        setIsVisible(false)
        setCountValue(0) // Reset count when not visible
      }
    }

    // Initial check
    handleScroll()
    
    // Add scroll listener with passive for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isVisible])

  const chars = text.split('')

  return (
    <div 
      ref={containerRef}
      className={className}
      style={{
        fontSize,
        fontWeight,
        lineHeight,
        letterSpacing,
        fontFamily: 'Funnel Sans, sans-serif',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlign: 'left',
        maxWidth: '100%',
        padding: '0',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {chars.map((char, index) => {
        const delay = index * 0.015
        // Check if this character is part of "UX" (case insensitive)
        const isUXChar = text.toLowerCase().includes('ux') && 
          index >= text.toLowerCase().indexOf('ux') && 
          index < text.toLowerCase().indexOf('ux') + 2
        
        // Check if this is the "5" in "Year 5" and replace with count value
        const isYearNumber = text.toLowerCase().includes('year 5') && 
          index === text.toLowerCase().indexOf('year 5') + 5 // Position of "5" in "Year 5"
        
        const displayChar = isYearNumber ? countValue.toString() : char
        
        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.8)',
              fontWeight: isStrong || isUXChar ? 400 : fontWeight,
              color: '#ffffff',
              textShadow: isStrong || isUXChar ? '0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.4)' : '0 0 2px rgba(255, 255, 255, 0.3)',
              filter: isVisible ? 'blur(0px)' : 'blur(2px)',
              transition: hasAnimated 
                ? `opacity 0.3s ease ${delay}s, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s, filter 0.3s ease ${delay}s`
                : 'opacity 0s, transform 0s, filter 0s'
            }}
          >
            {displayChar === ' ' ? '\u00A0' : displayChar}
          </span>
        )
      })}
    </div>
  )
}