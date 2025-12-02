'use client'

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Header from './Header'
import NegativeCursor from './NegativeCursor'
import SmoothScroll from './SmoothScroll'

interface NavigationContextType {
  startTransition: (href: string) => void
  isTransitioning: boolean
}

const NavigationContext = createContext<NavigationContextType | null>(null)

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider')
  }
  return context
}

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [blurOpacity, setBlurOpacity] = useState(0)
  const [counterBarOpacity, setCounterBarOpacity] = useState(0)
  const [leftTextOpacity, setLeftTextOpacity] = useState(0)
  const [rightTextOpacity, setRightTextOpacity] = useState(0)
  const [counter, setCounter] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  
  // Ensure client-side only rendering to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])
  const pathname = usePathname()
  const router = useRouter()
  const pendingHrefRef = useRef<string | null>(null)
  const previousPathRef = useRef<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const fadeOutTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const blurFadeInTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const blurFadeOutTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const blurIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const counterBarFadeInTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const leftTextFadeInTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const rightTextFadeInTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const counterBarFadeOutTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const leftTextFadeOutTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const rightTextFadeOutTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const counterIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const isManualTransitionRef = useRef(false)

  const startTransition = (href: string) => {
    // Don't transition if already on that page
    if (href === pathname) return

    isManualTransitionRef.current = true
    pendingHrefRef.current = href
    setIsTransitioning(true)
    setCounter(0)
    setCounterBarOpacity(0)
    setLeftTextOpacity(0)
    setRightTextOpacity(0)
    setBlurOpacity(0)
    
    // Clear any existing timeouts
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (fadeOutTimeoutRef.current) clearTimeout(fadeOutTimeoutRef.current)
    if (counterBarFadeInTimeoutRef.current) clearTimeout(counterBarFadeInTimeoutRef.current)
    if (leftTextFadeInTimeoutRef.current) clearTimeout(leftTextFadeInTimeoutRef.current)
    if (rightTextFadeInTimeoutRef.current) clearTimeout(rightTextFadeInTimeoutRef.current)
    if (counterBarFadeOutTimeoutRef.current) clearTimeout(counterBarFadeOutTimeoutRef.current)
    if (leftTextFadeOutTimeoutRef.current) clearTimeout(leftTextFadeOutTimeoutRef.current)
    if (rightTextFadeOutTimeoutRef.current) clearTimeout(rightTextFadeOutTimeoutRef.current)
    if (counterIntervalRef.current) clearInterval(counterIntervalRef.current)
    
    // Hide page content immediately to prevent flash
    // Use requestAnimationFrame to ensure state updates before render
    requestAnimationFrame(() => {
      // Start blur immediately - will increase to extreme levels
      setBlurOpacity(0)
      blurFadeInTimeoutRef.current = setTimeout(() => {
        setBlurOpacity(1) // Blur reaches full strength (creates solid color effect)
      }, 10)
      
      // Navigate after blur starts (no black overlay needed)
      setTimeout(() => {
        router.push(href)
      }, 100)
    })
    
    // Staggered fade-in for loading elements
    // 1. Counter and bar fade in first (100ms delay)
    counterBarFadeInTimeoutRef.current = setTimeout(() => {
      setCounterBarOpacity(1)
    }, 100)
    
    // 2. Left text "Russell Saw" fades in after counter/bar (300ms delay)
    leftTextFadeInTimeoutRef.current = setTimeout(() => {
      setLeftTextOpacity(1)
    }, 300)
    
    // 3. Right text "UI / UX" fades in last (500ms delay)
    rightTextFadeInTimeoutRef.current = setTimeout(() => {
      setRightTextOpacity(1)
    }, 500)
    
    // Fade out after minimum display time
    const minDisplayTime = 2000 // 2 seconds total
    const fadeInDuration = 600
    const fadeOutDuration = 600
    const holdTime = minDisplayTime - fadeInDuration - fadeOutDuration // 800ms hold
    
    // Animate counter from 0 to 100 - when it reaches 100, start fade out immediately
    const counterDuration = 1200 // 1.2 seconds
    const counterSteps = 100
    const counterInterval = counterDuration / counterSteps
    
    let currentStep = 0
    counterIntervalRef.current = setInterval(() => {
      currentStep++
      const progress = Math.min(currentStep / counterSteps, 1)
      // Use easing function for smooth animation
      const easedProgress = 1 - Math.pow(1 - progress, 3) // Ease out cubic
      const counterValue = Math.floor(easedProgress * 100)
      // Ensure it reaches 100
      setCounter(currentStep >= counterSteps ? 100 : counterValue)
      
      if (currentStep >= counterSteps) {
        setCounter(100) // Force to 100
        if (counterIntervalRef.current) {
          clearInterval(counterIntervalRef.current)
        }
        // Start fade out immediately when counter reaches 100
        const baseFadeOutDelay = 0 // No delay after 100
        // Counter and bar fade out first
        counterBarFadeOutTimeoutRef.current = setTimeout(() => {
          setCounterBarOpacity(0)
        }, baseFadeOutDelay)
        // Left text fades out second (200ms after counter/bar)
        leftTextFadeOutTimeoutRef.current = setTimeout(() => {
          setLeftTextOpacity(0)
        }, baseFadeOutDelay + 200)
        // Right text fades out last (400ms after counter/bar)
        rightTextFadeOutTimeoutRef.current = setTimeout(() => {
          setRightTextOpacity(0)
        }, baseFadeOutDelay + 400)
        
        // Fade out black overlay and blur after text fade out completes
        const textFadeOutComplete = baseFadeOutDelay + 400 + 300 // Wait for text fade out + transition
        timeoutRef.current = setTimeout(() => {
          // Fade out blur first
          blurFadeOutTimeoutRef.current = setTimeout(() => {
            setBlurOpacity(0)
          }, 0)
          fadeOutTimeoutRef.current = setTimeout(() => {
            setIsTransitioning(false)
            setCounter(0)
            setCounterBarOpacity(0)
            setLeftTextOpacity(0)
            setRightTextOpacity(0)
            setBlurOpacity(0)
            pendingHrefRef.current = null
            isManualTransitionRef.current = false
          }, fadeOutDuration)
        }, textFadeOutComplete)
      }
    }, counterInterval)
    
    // Fallback: if counter somehow doesn't reach 100 within expected time, trigger fade out
    // This is a safety mechanism (shouldn't normally be needed)
    const fallbackTimeout = setTimeout(() => {
      // Only trigger if fade out hasn't started yet (check if timeoutRef is still null)
      if (!timeoutRef.current) {
        const baseFadeOutDelay = 0
        counterBarFadeOutTimeoutRef.current = setTimeout(() => {
          setCounterBarOpacity(0)
        }, baseFadeOutDelay)
        leftTextFadeOutTimeoutRef.current = setTimeout(() => {
          setLeftTextOpacity(0)
        }, baseFadeOutDelay + 200)
        rightTextFadeOutTimeoutRef.current = setTimeout(() => {
          setRightTextOpacity(0)
        }, baseFadeOutDelay + 400)
        
        const textFadeOutComplete = baseFadeOutDelay + 400 + 300
        timeoutRef.current = setTimeout(() => {
          blurFadeOutTimeoutRef.current = setTimeout(() => {
            setBlurOpacity(0)
          }, 0)
          fadeOutTimeoutRef.current = setTimeout(() => {
            setIsTransitioning(false)
            setCounter(0)
            setCounterBarOpacity(0)
            setLeftTextOpacity(0)
            setRightTextOpacity(0)
            setBlurOpacity(0)
            pendingHrefRef.current = null
            isManualTransitionRef.current = false
          }, fadeOutDuration)
        }, textFadeOutComplete)
      }
    }, counterDuration + 200) // Safety timeout: counter duration + buffer
  }

  // Handle browser navigation (back/forward) and direct URL entry
  useEffect(() => {
    if (previousPathRef.current !== null && previousPathRef.current !== pathname && !isManualTransitionRef.current) {
      // Browser navigation detected - trigger transition
      setIsTransitioning(true)
      setBlurOpacity(0)
      setCounter(0)
      setCounterBarOpacity(0)
      setLeftTextOpacity(0)
      setRightTextOpacity(0)
      
      // Clear any existing timeouts
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (fadeOutTimeoutRef.current) clearTimeout(fadeOutTimeoutRef.current)
      if (counterBarFadeInTimeoutRef.current) clearTimeout(counterBarFadeInTimeoutRef.current)
      if (leftTextFadeInTimeoutRef.current) clearTimeout(leftTextFadeInTimeoutRef.current)
      if (rightTextFadeInTimeoutRef.current) clearTimeout(rightTextFadeInTimeoutRef.current)
      if (counterBarFadeOutTimeoutRef.current) clearTimeout(counterBarFadeOutTimeoutRef.current)
      if (leftTextFadeOutTimeoutRef.current) clearTimeout(leftTextFadeOutTimeoutRef.current)
      if (rightTextFadeOutTimeoutRef.current) clearTimeout(rightTextFadeOutTimeoutRef.current)
      if (blurFadeInTimeoutRef.current) clearTimeout(blurFadeInTimeoutRef.current)
      if (blurFadeOutTimeoutRef.current) clearTimeout(blurFadeOutTimeoutRef.current)
      if (counterIntervalRef.current) clearInterval(counterIntervalRef.current)
      
      // Start blur immediately - will increase to extreme levels with smooth easing
      setBlurOpacity(0)
      blurFadeInTimeoutRef.current = setTimeout(() => {
        let blurProgress = 0
        const blurSteps = 60
        const blurStepDuration = 12
        blurIntervalRef.current = setInterval(() => {
          blurProgress += 1 / blurSteps
          if (blurProgress >= 1) {
            setBlurOpacity(1)
            if (blurIntervalRef.current) {
              clearInterval(blurIntervalRef.current)
              blurIntervalRef.current = null
            }
          } else {
            const eased = blurProgress < 0.5
              ? 2 * blurProgress * blurProgress
              : 1 - Math.pow(-2 * blurProgress + 2, 2) / 2
            setBlurOpacity(eased)
          }
        }, blurStepDuration)
      }, 10)
      
      // Staggered fade-in for loading elements
      counterBarFadeInTimeoutRef.current = setTimeout(() => {
        setCounterBarOpacity(1)
      }, 100)
      
      leftTextFadeInTimeoutRef.current = setTimeout(() => {
        setLeftTextOpacity(1)
      }, 300)
      
      rightTextFadeInTimeoutRef.current = setTimeout(() => {
        setRightTextOpacity(1)
      }, 500)
      
      const minDisplayTime = 2000 // 2 seconds total
      const fadeInDuration = 600
      const fadeOutDuration = 600
      const holdTime = minDisplayTime - fadeInDuration - fadeOutDuration // 800ms hold
      
      // Animate counter from 0 to 100 (finishes before fade out starts)
      const counterDuration = 1200 // 1.2 seconds - finishes before fade out
      const counterSteps = 100
      const counterInterval = counterDuration / counterSteps
      
      let currentStep = 0
      counterIntervalRef.current = setInterval(() => {
        currentStep++
        const progress = Math.min(currentStep / counterSteps, 1)
        const easedProgress = 1 - Math.pow(1 - progress, 3) // Ease out cubic
        const counterValue = Math.floor(easedProgress * 100)
        // Ensure it reaches 100
        setCounter(currentStep >= counterSteps ? 100 : counterValue)
        
        if (currentStep >= counterSteps) {
          setCounter(100) // Force to 100
          if (counterIntervalRef.current) {
            clearInterval(counterIntervalRef.current)
          }
        }
      }, counterInterval)
      
      // Fade out loading elements before black overlay fades out (staggered in reverse order)
      const baseFadeOutDelay = fadeInDuration + holdTime - 300
      // Counter and bar fade out first
      counterBarFadeOutTimeoutRef.current = setTimeout(() => {
        setCounterBarOpacity(0)
      }, baseFadeOutDelay)
      // Left text fades out second (200ms after counter/bar)
      leftTextFadeOutTimeoutRef.current = setTimeout(() => {
        setLeftTextOpacity(0)
      }, baseFadeOutDelay + 200)
      // Right text fades out last (400ms after counter/bar)
      rightTextFadeOutTimeoutRef.current = setTimeout(() => {
        setRightTextOpacity(0)
      }, baseFadeOutDelay + 400)
      
      timeoutRef.current = setTimeout(() => {
        // Fade out blur first
        blurFadeOutTimeoutRef.current = setTimeout(() => {
          setBlurOpacity(0)
        }, 0)
        fadeOutTimeoutRef.current = setTimeout(() => {
          setIsTransitioning(false)
          setCounter(0)
          setCounterBarOpacity(0)
          setLeftTextOpacity(0)
          setRightTextOpacity(0)
          setBlurOpacity(0)
        }, fadeOutDuration)
      }, fadeInDuration + holdTime)
    }
    
    previousPathRef.current = pathname
  }, [pathname])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (fadeOutTimeoutRef.current) clearTimeout(fadeOutTimeoutRef.current)
      if (counterBarFadeInTimeoutRef.current) clearTimeout(counterBarFadeInTimeoutRef.current)
      if (leftTextFadeInTimeoutRef.current) clearTimeout(leftTextFadeInTimeoutRef.current)
      if (rightTextFadeInTimeoutRef.current) clearTimeout(rightTextFadeInTimeoutRef.current)
      if (counterBarFadeOutTimeoutRef.current) clearTimeout(counterBarFadeOutTimeoutRef.current)
      if (leftTextFadeOutTimeoutRef.current) clearTimeout(leftTextFadeOutTimeoutRef.current)
      if (rightTextFadeOutTimeoutRef.current) clearTimeout(rightTextFadeOutTimeoutRef.current)
      if (blurFadeInTimeoutRef.current) clearTimeout(blurFadeInTimeoutRef.current)
      if (blurFadeOutTimeoutRef.current) clearTimeout(blurFadeOutTimeoutRef.current)
      if (blurIntervalRef.current) clearInterval(blurIntervalRef.current)
      if (counterIntervalRef.current) clearInterval(counterIntervalRef.current)
    }
  }, [])

  // Blur amount increases dramatically to create "fade to color" effect
  // At max blur, the page should become a single color
  // Use easing curve for more dramatic blur progression
  // Only calculate blur effects when actually transitioning
  const easedBlurOpacity = isMounted && isTransitioning && blurOpacity > 0 ? 1 - Math.pow(1 - blurOpacity, 2) : 0 // Ease-in for dramatic blur
  const blurAmount = easedBlurOpacity * 120 // Increased to 120px for even more extreme effect
  
  // Scale effect - page slightly shrinks as it blurs (creates depth)
  const scaleAmount = isMounted && isTransitioning ? 1 - (blurOpacity * 0.05) : 1 // Slight scale down (5% max)
  
  // Brightness adjustment - slightly darken as blur increases
  const brightnessAmount = isMounted && isTransitioning ? 1 - (blurOpacity * 0.3) : 1 // Darken by 30% max
  
  // Calculate opacity - ensure consistent numeric values
  const pageOpacity = isMounted && isTransitioning ? 1 - (blurOpacity * 0.8) : 1

  // Separate persistent components from page content
  const persistentComponents: React.ReactNode[] = []
  const pageContent: React.ReactNode[] = []

  React.Children.forEach(children, (child, index) => {
    // First 3 children are always: NegativeCursor, Header, SmoothScroll (in that order)
    // This is more reliable than component type comparison
    if (index < 3) {
      persistentComponents.push(child)
    } else {
      pageContent.push(child)
    }
  })
  
  // Always use pageContent if it exists, otherwise fallback to all children after index 3
  const allChildren = React.Children.toArray(children)
  const finalPageContent = pageContent.length > 0 
    ? pageContent 
    : (allChildren.length > 3 ? allChildren.slice(3) : allChildren.slice(3))
  
  // Ensure we always have content to render
  const contentToRender = finalPageContent.length > 0 ? finalPageContent : allChildren

  return (
    <NavigationContext.Provider value={{ startTransition, isTransitioning }}>
      {/* Header and other persistent components stay visible - not wrapped in fade */}
      <div
        style={{
          opacity: 1,
          visibility: 'visible',
          position: 'relative',
          zIndex: 100001, // Above everything including transition overlays
          pointerEvents: 'auto',
        }}
      >
        {persistentComponents}
      </div>
      {/* Page content wrapper - fades out, scales, and blurs during transition */}
      <div
        style={{
          opacity: isMounted ? pageOpacity : 1,
          transform: isMounted && isTransitioning ? `scale(${scaleAmount})` : 'scale(1)',
          filter: isMounted && isTransitioning ? `brightness(${brightnessAmount})` : 'brightness(1)',
          visibility: 'visible',
          position: 'relative',
          zIndex: 10,
          transition: isMounted && isTransitioning 
            ? 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), filter 0.7s cubic-bezier(0.4, 0, 0.2, 1)' 
            : isMounted ? 'opacity 0.3s ease-in, transform 0.3s ease-in, filter 0.3s ease-in' : 'none',
          transformOrigin: 'center center',
          pointerEvents: isTransitioning ? 'none' : 'auto',
        }}
      >
        {contentToRender}
      </div>
      {isTransitioning && blurAmount > 0 && (
        <>
          {/* Extreme blur overlay - creates "fade to color" effect */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              backdropFilter: `blur(${blurAmount}px) saturate(${1 + (blurOpacity * 0.5)})`,
              WebkitBackdropFilter: `blur(${blurAmount}px) saturate(${1 + (blurOpacity * 0.5)})`,
              pointerEvents: 'none',
              zIndex: 99998,
              transition: 'backdrop-filter 0.7s cubic-bezier(0.4, 0, 0.2, 1), -webkit-backdrop-filter 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          {/* Loading counter and bar - above black overlay */}
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              zIndex: 100000,
              pointerEvents: 'none',
              opacity: counterBarOpacity,
              transition: 'opacity 0.3s ease-in-out',
            }}
          >
            <div
              style={{
                color: '#bcff4e',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
              }}
            >
              {counter}
            </div>
            {/* Loading bar */}
            <div
              style={{
                width: '120px',
                height: '2px',
                backgroundColor: 'rgba(188, 255, 78, 0.2)',
                borderRadius: '1px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${counter}%`,
                  height: '100%',
                  backgroundColor: '#bcff4e',
                  borderRadius: '1px',
                }}
              />
            </div>
          </div>
          {/* Bottom right corner text - above black overlay */}
          <div
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              color: '#bcff4e',
              fontSize: '3rem',
              fontFamily: "'Stack Sans Notch', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              fontWeight: 300,
              letterSpacing: '-0.05em',
              lineHeight: 0.5,
              zIndex: 100000,
              pointerEvents: 'none',
              opacity: rightTextOpacity,
              transition: 'opacity 0.3s ease-in-out',
            }}
          >
            UI / UX 
          </div>

          <div
            style={{
              position: 'fixed',
              bottom: '24px',
              left: '24px',
              color: '#bcff4e',
              fontSize: '3rem',
              fontFamily: "'Stack Sans Notch', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              fontWeight: 300,
              letterSpacing: '-0.05em',
              lineHeight: 0.5,
              zIndex: 100000,
              pointerEvents: 'none',
              opacity: leftTextOpacity,
              transition: 'opacity 0.3s ease-in-out',
            }}
          >
            Russell Saw 
          </div>
        </>
      )}
    </NavigationContext.Provider>
  )
}

