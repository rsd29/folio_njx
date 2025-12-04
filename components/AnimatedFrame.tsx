'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedFrameProps {
  children: React.ReactNode
  delay?: number
  style?: React.CSSProperties
  comment?: string
}

export default function AnimatedFrame({ children, delay = 0, style, comment }: AnimatedFrameProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentRef = frameRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <div
      ref={frameRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? (isHovered ? 'translateY(0) scale(1.03)' : 'translateY(0) scale(1)')
          : 'translateY(40px) scale(1)',
        transition: isVisible 
          ? 'opacity 0.15s ease-out, transform 0.15s ease-out, filter 0.15s ease-out' 
          : `opacity 0.3s ease-out ${delay}s, transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)`,
        filter: 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.2))',
        willChange: 'transform', // Optimize for animations
        position: 'relative',
        ...style
      }}
    >
      {children}
      
      {/* Hover text box */}
      {comment && (
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '12px',
            right: '12px',
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6))',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '0.75rem',
            color: '#ccc',
            fontFamily: 'var(--font-body)',
            lineHeight: '1.3',
            transform: isHovered ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.95)',
            opacity: isHovered ? 1 : 0,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
            pointerEvents: 'none',
            zIndex: 20,
            maxHeight: '60px',
            overflow: 'hidden'
          }}
        >
          {comment}
        </div>
      )}
    </div>
  )
}

