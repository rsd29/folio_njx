'use client'

import { useEffect, useRef, useState } from 'react'

interface GuideLineProps {
  startElementId?: string
}

export default function GuideLine({ startElementId = 'story-text-1' }: GuideLineProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [centerX, setCenterX] = useState(0)
  const lineRef = useRef<HTMLDivElement>(null)
  const startMarkerRef = useRef<HTMLDivElement>(null)
  const endMarkerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const startYRef = useRef(0)
  const lineHeightRef = useRef(2000)
  const targetGreenEndRef = useRef(0)
  const currentGreenEndRef = useRef(0)

  // Client-side only - prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
    if (typeof window !== 'undefined') {
      setCenterX(window.innerWidth / 2)
      
      const handleResize = () => {
        setCenterX(window.innerWidth / 2)
      }
      
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Calculate start position and line height - only after mounted
  useEffect(() => {
    if (!isMounted) return

    const updatePositions = () => {
      // Get container (gallery section)
      let container: HTMLElement | null = containerRef.current?.parentElement || null
      
      if (!container) {
        const gallerySection = document.querySelector('.gallery-section')
        container = (gallerySection as HTMLElement) || null
      }
      
      if (!container) return
      
      const containerRect = container.getBoundingClientRect()
      const containerTop = containerRect.top + window.scrollY
      
      // Get start element (Early Days div) - use top of element
      const startElement = document.getElementById(startElementId)
      if (startElement) {
        const rect = startElement.getBoundingClientRect()
        const scrollY = window.scrollY
        const absoluteTop = rect.top + scrollY // Top of the element
        const relativeTop = absoluteTop - containerTop
        
        startYRef.current = relativeTop
        // Line goes to bottom of container
        lineHeightRef.current = containerRect.height - relativeTop
        
        // Update line container height
        if (containerRef.current) {
          containerRef.current.style.height = `${relativeTop + lineHeightRef.current}px`
        }
        
        // Update line position to start at top of Early Days div
        if (lineRef.current) {
          lineRef.current.style.top = `${relativeTop}px`
          lineRef.current.style.height = `${lineHeightRef.current}px`
        }
        
        // Update start marker position (at top of line)
        if (startMarkerRef.current) {
          startMarkerRef.current.style.top = `${relativeTop}px`
        }
        
        // Update end marker position (at bottom of line)
        if (endMarkerRef.current) {
          endMarkerRef.current.style.top = `${relativeTop + lineHeightRef.current}px`
        }
        
        // Initialize current value
        if (currentGreenEndRef.current === 0) {
          currentGreenEndRef.current = relativeTop
          targetGreenEndRef.current = relativeTop
        }
      }
    }

    const timeoutId = setTimeout(updatePositions, 100)
    window.addEventListener('resize', updatePositions)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', updatePositions)
    }
  }, [startElementId, isMounted])

  // Continuous smooth animation loop using requestAnimationFrame - only after mounted
  useEffect(() => {
    if (!isMounted || !lineRef.current) return

    let isRunning = true

    const updateProgress = () => {
      if (!isRunning || !lineRef.current) return

      const startY = startYRef.current
      const lineHeight = lineHeightRef.current
      
      if (startY === 0 || lineHeight === 0) {
        animationFrameRef.current = requestAnimationFrame(updateProgress)
        return
      }

      // Calculate target green end position
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const halfwayPoint = viewportHeight / 2
      
      const container = containerRef.current?.parentElement || document.querySelector('.gallery-section')
      if (container) {
        const containerRect = container.getBoundingClientRect()
        const containerTop = containerRect.top + scrollY
        
        // Calculate where the line is relative to viewport
        const lineStartAbsolute = containerTop + startY
        const lineStartRelativeToViewport = lineStartAbsolute - scrollY
        
        // Calculate target green end position
        let targetGreenEnd: number
        if (lineStartRelativeToViewport < halfwayPoint) {
          const greenEndRelative = Math.max(0, halfwayPoint - lineStartRelativeToViewport)
          targetGreenEnd = startY + greenEndRelative
        } else {
          targetGreenEnd = startY
        }
        
        targetGreenEndRef.current = targetGreenEnd
      }

      // Smooth spring animation toward target
      const target = targetGreenEndRef.current
      const current = currentGreenEndRef.current
      const diff = target - current
      
      if (Math.abs(diff) > 0.01) {
        // Laggy catch-up effect
        const damping = 0.25
        const newValue = current + diff * damping
        currentGreenEndRef.current = newValue
        
        // Calculate gradient stops
        // The line goes from startY to (startY + lineHeight)
        // Green should be from startY (0% of line) to newValue
        if (lineHeight > 0) {
          // Calculate percentage relative to the line itself (not container)
          const greenHeight = Math.max(0, newValue - startY)
          const greenPercent = (greenHeight / lineHeight) * 100
          
          // Update CSS gradient - smooth and GPU-accelerated
          if (newValue > startY) {
            lineRef.current.style.background = `linear-gradient(to bottom, 
              #bcff4e 0%, 
              #bcff4e ${greenPercent}%, 
              rgba(188, 255, 78, 0.2) ${greenPercent}%, 
              rgba(188, 255, 78, 0.2) 100%)`
          } else {
            // All grey when green end is at or below start
            lineRef.current.style.background = `linear-gradient(to bottom, 
              rgba(188, 255, 78, 0.2) 0%, 
              rgba(188, 255, 78, 0.2) 100%)`
          }
        }
      } else if (Math.abs(diff) > 0.001) {
        // Snap to target when very close
        currentGreenEndRef.current = target
        if (lineHeight > 0) {
          const greenHeight = Math.max(0, target - startY)
          const greenPercent = (greenHeight / lineHeight) * 100
          
          if (target > startY) {
            lineRef.current.style.background = `linear-gradient(to bottom, 
              #bcff4e 0%, 
              #bcff4e ${greenPercent}%, 
              rgba(188, 255, 78, 0.2) ${greenPercent}%, 
              rgba(188, 255, 78, 0.2) 100%)`
          } else {
            lineRef.current.style.background = `linear-gradient(to bottom, 
              rgba(188, 255, 78, 0.2) 0%, 
              rgba(188, 255, 78, 0.2) 100%)`
          }
        }
      }
      
      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(updateProgress)
    }

    // Start continuous animation loop
    animationFrameRef.current = requestAnimationFrame(updateProgress)

    return () => {
      isRunning = false
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isMounted])

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return null
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '2000px',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      <div
        ref={lineRef}
        style={{
          position: 'absolute',
          left: `${centerX}px`,
          top: 0,
          width: '2px',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(188, 255, 78, 0.2) 0%, rgba(188, 255, 78, 0.2) 100%)',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          borderRadius: '1px',
          willChange: 'background', // Optimize for GPU acceleration
        }}
      />
      {/* Start marker (circle at top of line - top of Early Days div) */}
      <div
        ref={startMarkerRef}
        style={{
          position: 'absolute',
          left: `${centerX}px`,
          top: 0,
          width: '10px',
          height: '10px',
          backgroundColor: '#bcff4e',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          boxShadow: '0 0 12px rgba(188, 255, 78, 0.8)',
          border: '2px solid rgba(188, 255, 78, 0.3)',
        }}
      />
      {/* End marker (circle at bottom of line) */}
      <div
        ref={endMarkerRef}
        style={{
          position: 'absolute',
          left: `${centerX}px`,
          top: '100%',
          width: '10px',
          height: '10px',
          backgroundColor: 'rgba(188, 255, 78, 0.2)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          border: '2px solid rgba(188, 255, 78, 0.1)',
        }}
      />
    </div>
  )
}

