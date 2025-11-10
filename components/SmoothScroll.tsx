'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollSmoother, ScrollTrigger)
}

export default function SmoothScroll() {
  useEffect(() => {
    // Skip on reduced motion or touch devices
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      'ontouchstart' in window
    ) {
      return
    }

    // Wait for DOM to be ready
    const initSmoother = () => {
      const wrapper = document.getElementById('smooth-wrapper')
      const content = document.getElementById('smooth-content')
      
      if (!wrapper || !content) {
        console.warn('ScrollSmoother: wrapper or content element not found')
        return null
      }

      // Create smooth scroller
      const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
      })

      return smoother
    }

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const smoother = initSmoother()
      
      return () => {
        smoother?.kill()
      }
    }, 100)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return null
}
