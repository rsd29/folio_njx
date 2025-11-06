'use client'

import { useEffect, useRef, useState, useMemo } from 'react'

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

  const textLower = useMemo(() => text.toLowerCase(), [text])
  const chars = useMemo(() => text.split(''), [text])
  const uxIndex = useMemo(() => textLower.indexOf('ux'), [textLower])
  const hasUX = useMemo(() => uxIndex !== -1, [uxIndex])
  const year5Index = useMemo(() => textLower.indexOf('year 5'), [textLower])
  const hasYear5 = useMemo(() => year5Index !== -1, [year5Index])

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!containerRef.current) return

          const rect = containerRef.current.getBoundingClientRect()
          const windowHeight = window.innerHeight
          
          const elementTop = rect.top
          const elementBottom = rect.bottom

          const shouldBeVisible = elementTop < windowHeight * 0.95 && elementBottom > windowHeight * 0.05

          if (shouldBeVisible && !isVisible) {
            setIsVisible(true)
            setHasAnimated(true)
            
            if (hasYear5) {
              setCountValue(0)
              let currentCount = 0
              const delays = [120, 120, 180, 220, 280]
              
              const countNext = () => {
                if (currentCount < 5) {
                  setCountValue(currentCount + 1)
                  currentCount++
                  setTimeout(countNext, delays[currentCount - 1] || 280)
                }
              }
              
              setTimeout(countNext, 120)
            }
          } else if (!shouldBeVisible && isVisible) {
            setIsVisible(false)
            setCountValue(0)
          }
          ticking = false
        })
        ticking = true
      }
    }

    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isVisible, hasYear5])

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
        const isUXChar = hasUX && index >= uxIndex && index < uxIndex + 2
        const isYearNumber = hasYear5 && index === year5Index + 5
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