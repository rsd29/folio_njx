'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './ScrollRevealText.module.css'

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
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.1
      }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Simple text shadow for strong text
  const textShadow = isStrong
    ? '0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.4)'
    : undefined

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${isVisible ? styles.visible : ''} ${className}`}
      style={{
        fontSize,
        fontWeight: isStrong ? 400 : fontWeight,
        lineHeight,
        letterSpacing,
        textShadow
      }}
    >
      {text}
    </div>
  )
}