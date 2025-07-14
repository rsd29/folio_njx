'use client'

import { useEffect, useRef } from 'react'

export default function NegativeCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0

    const updateCursor = () => {
      currentX += (mouseX - currentX) * 0.2
      currentY += (mouseY - currentY) * 0.2
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    document.addEventListener('mousemove', handleMouseMove)
    updateCursor()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <div ref={cursorRef} className="custom-cursor" />
}
