'use client'

import { useEffect, useRef, useState } from 'react'

export default function NegativeCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [cursorVariant, setCursorVariant] = useState<'default' | 'view-project'>('default')

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0

    let animationId: number | null = null
    let lastUpdate = 0
    const throttleMs = 16 // ~60fps

    const updateCursor = (timestamp: number) => {
      if (timestamp - lastUpdate >= throttleMs) {
        currentX += (mouseX - currentX) * 0.25 // Slightly faster convergence
        currentY += (mouseY - currentY) * 0.25
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
        lastUpdate = timestamp
      }
      animationId = requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    animationId = requestAnimationFrame(updateCursor)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  useEffect(() => {
    const handlePointerOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest('[data-cursor]')
      const variant = target?.getAttribute('data-cursor') === 'view-project' ? 'view-project' : 'default'
      setCursorVariant(variant)
    }

    const handlePointerLeave = () => {
      setCursorVariant('default')
    }

    document.addEventListener('pointerover', handlePointerOver)
    document.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor${cursorVariant === 'view-project' ? ' custom-cursor--pill' : ''}`}
      aria-hidden="true"
    >
      <span className="custom-cursor__label">
        <span className="custom-cursor__text">View Project</span>
        <span className="custom-cursor__arrow" aria-hidden="true">
          →
        </span>
      </span>
    </div>
  )
}
