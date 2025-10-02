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
  const glareRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!frameRef.current) return

      // Cancel previous animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      // Use requestAnimationFrame for smoother updates
      animationFrameRef.current = requestAnimationFrame(() => {
        if (!frameRef.current) return

        const rect = frameRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Calculate distance from center
        const deltaX = e.clientX - centerX
        const deltaY = e.clientY - centerY

        // Calculate rotation (increased for more noticeable effect)
        const maxRotation = 2
        const rotateY = (deltaX / (rect.width / 2)) * maxRotation
        const rotateX = -(deltaY / (rect.height / 2)) * maxRotation

        // Calculate glare position (light reflection effect)
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        
        // Check if mouse is within frame bounds
        const isWithinBounds = 
          e.clientX >= rect.left && 
          e.clientX <= rect.right && 
          e.clientY >= rect.top && 
          e.clientY <= rect.bottom

        // Apply transform directly to DOM with smooth transitions
        const scale = isWithinBounds ? 1.02 : 1
        const shadowIntensity = isWithinBounds ? 0.4 : 0.2
        const shadowBlur = 20 + Math.abs(rotateX) + Math.abs(rotateY)
        
        frameRef.current.style.transform = `translateY(0) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
        frameRef.current.style.filter = `drop-shadow(${rotateY * -2}px ${rotateX * 2}px ${shadowBlur}px rgba(0, 0, 0, ${shadowIntensity}))`

        // Apply glare directly to DOM with smooth transitions
        if (glareRef.current) {
          const glareOpacity = isWithinBounds ? 0.12 : 0
          glareRef.current.style.background = `radial-gradient(circle 400px at ${Math.max(0, Math.min(100, x))}% ${Math.max(0, Math.min(100, y))}%, rgba(255, 255, 255, ${glareOpacity}), transparent 80%)`
        }
        
        // Update hover state for text box
        setIsHovered(isWithinBounds)
      })
    }

    const handleMouseLeave = () => {
      // Cancel any pending animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      // Reset transforms directly to DOM with smooth transition
      if (frameRef.current) {
        frameRef.current.style.transform = 'translateY(0) perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
        frameRef.current.style.filter = 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.2))'
      }
      if (glareRef.current) {
        glareRef.current.style.background = 'radial-gradient(circle 400px at 50% 50%, rgba(255, 255, 255, 0), transparent 80%)'
      }
      setIsHovered(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      // Clean up animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // No more state-based calculations - using direct DOM manipulation

  return (
    <div
      ref={frameRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: isVisible 
          ? 'opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out' 
          : `opacity 0.8s ease-out ${delay}s, transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)`,
        transformStyle: 'preserve-3d',
        filter: 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.2))',
        willChange: 'transform, filter', // Optimize for animations
        position: 'relative',
        ...style
      }}
    >
      {/* Cursor-following glare effect */}
      <div
        ref={glareRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle 400px at 50% 50%, rgba(255, 255, 255, 0), transparent 80%)',
          pointerEvents: 'none',
          borderRadius: 'inherit',
          zIndex: 10,
          transition: 'opacity 0.4s ease-out, background 0.2s ease-out',
          mixBlendMode: 'soft-light',
          willChange: 'background, opacity' // Optimize for animations
        }}
      />
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
            transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
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

