'use client'

import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'


interface NavigationContextType {
  startTransition: (href: string) => void
  isTransitioning: boolean
}

const NavigationContext = createContext<NavigationContextType | null>(null)

/**
 * ANIMATION CONFIGURATION
 * 
 * All variables that control the blur/unblur transition animation.
 * Adjust these values to change the feel and timing of the animation.
 * 
 * ═══════════════════════════════════════════════════════════════
 * QUICK GUIDE TO TUNING THE ANIMATION
 * ═══════════════════════════════════════════════════════════════
 * 
 * 🎯 SPEED & TIMING:
 *   - Lower values = faster/snappier animation
 *   - Higher values = slower/smoother animation
 *   - Total duration = steps × stepDuration (in milliseconds)
 * 
 * 📈 EASING POWER (how the animation accelerates/decelerates):
 *   - 1 = linear (constant speed, no acceleration)
 *   - 2 = quadratic (gentle curve)
 *   - 3 = cubic (more dramatic curve) ← DEFAULT
 *   - 4 = quartic (very dramatic curve)
 *   - Higher = more dramatic acceleration/deceleration
 * 
 * 💡 PRO TIPS:
 *   - For snappier feel: Reduce steps, reduce stepDuration, increase easingPower
 *   - For smoother feel: Increase steps, increase stepDuration, decrease easingPower
 *   - For dramatic blur: Increase maxBlur, increase blurEasingPower
 *   - For subtle blur: Decrease maxBlur, decrease blurEasingPower
 *   - For faster transitions: Reduce all delay values
 *   - For more dramatic page effects: Increase scaleDown, brightnessReduction, opacityFade
 * 
 * 🎨 VISUAL EFFECTS:
 *   - maxBlur: How abstracted the page becomes (60-200px range works well)
 *   - scaleDown: How much the page shrinks (0-0.1 range, 0.05 = 5% shrink)
 *   - brightnessReduction: How dark the page gets (0-0.5 range, 0.3 = 30% darker)
 *   - opacityFade: How transparent the page becomes (0.5-1 range, 0.8 = fades to 20% opacity)
 * 
 * ⚡ PERFORMANCE:
 *   - More steps = smoother but more CPU intensive
 *   - 50-100 steps is usually a good balance
 *   - Step duration of 5-15ms works well for most cases
 */
const ANIMATION_CONFIG = {
  // ===== BLUR-IN ANIMATION (when transition starts) =====
  blurIn: {
    // Number of animation steps (more steps = smoother but more CPU intensive)
    // Recommended: 50-150 (default: 100)
    steps: 100,
    
    // Duration of each step in milliseconds
    // Total blur-in duration = steps * stepDuration
    // Example: 100 steps * 10ms = 1000ms (1 second)
    // Recommended: 5-20ms (default: 10ms)
    stepDuration: 10,
    
    // Easing function power for blur-in
    // Higher = more dramatic acceleration (starts slow, ends fast)
    // 1 = linear, 2 = quadratic, 3 = cubic, 4 = quartic
    // Recommended: 2-4 (default: 3 for ease-out cubic)
    easingPower: 2,
  },

  // ===== BLUR-OUT/UNBLUR ANIMATION (when transition ends) =====
  blurOut: {
    // Number of animation steps for unblur
    // Recommended: 50-150 (default: 100)
    steps: 100,
    
    // Duration of each step in milliseconds
    // Total blur-out duration = steps * stepDuration
    // Example: 100 steps * 10ms = 1000ms (1 second)
    // Recommended: 5-20ms (default: 10ms)
    stepDuration: 5,
    
    // Easing function power for blur-out
    // Higher = more dramatic deceleration (starts fast, ends slow)
    // 1 = linear, 2 = quadratic, 3 = cubic, 4 = quartic
    // Recommended: 2-4 (default: 3 for ease-in cubic)
    easingPower: 2,
  },

  // ===== VISUAL BLUR EFFECT INTENSITY =====
  blurEffect: {
    // Maximum blur amount in pixels
    // Higher = more blur (page becomes more abstracted)
    // Recommended: 60-200px (default: 120px)
    maxBlur: 120,
    
    // Additional easing multiplier for blur amount
    // Makes blur increase more dramatically than opacity
    // Higher = blur ramps up faster
    // Recommended: 1-3 (default: 2)
    blurEasingPower: 2,
    
    // Saturation boost as blur increases (0-1 range)
    // Higher = more color saturation during blur
    // Recommended: 0-1 (default: 0.5)
    saturationBoost: 0.5,
  },

  // ===== PAGE TRANSFORM EFFECTS =====
  pageTransform: {
    // Scale down amount (0-1 range)
    // Higher = page shrinks more during blur
    // Example: 0.05 = 5% shrink, 0.1 = 10% shrink
    // Recommended: 0-0.1 (default: 0.05)
    scaleDown: 0.05,
    
    // Brightness reduction (0-1 range)
    // Higher = page gets darker during blur
    // Example: 0.3 = 30% darker, 0.5 = 50% darker
    // Recommended: 0-0.5 (default: 0.3)
    brightnessReduction: 0.3,
    
    // Opacity fade amount (0-1 range)
    // Higher = page fades more during blur
    // Example: 0.8 = fades to 20% opacity, 0.5 = fades to 50% opacity
    // Note: Minimum opacity is always 0.2 to prevent complete invisibility
    // Recommended: 0.5-1 (default: 0.8)
    opacityFade: 0.8,
    
    // Minimum opacity during transition (prevents page from disappearing completely)
    // Recommended: 0.1-0.3 (default: 0.2)
    minOpacity: 0.2,
  },

  // ===== LOADING ELEMENTS FADE-IN TIMING =====
  fadeIn: {
    // Delay before counter/bar appears (in milliseconds)
    // Higher = longer wait before showing loading elements
    // Recommended: 200-800ms (default: 400ms)
    counterBarDelay: 400,
    
    // Delay before left text appears (in milliseconds)
    // Recommended: 400-1000ms (default: 600ms)
    leftTextDelay: 600,
    
    // Delay before right text appears (in milliseconds)
    // Recommended: 600-1200ms (default: 800ms)
    rightTextDelay: 800,
    
    // Transition duration for fade-in (CSS transition)
    // Recommended: 200-500ms (default: 300ms)
    transitionDuration: 300,
  },

  // ===== COUNTER ANIMATION =====
  counter: {
    // Total duration for counter to go from 0 to 100 (in milliseconds)
    // Higher = counter animates slower
    // Recommended: 1000-2000ms (default: 1400ms)
    duration: 1400,
    
    // Number of steps for counter animation
    // More steps = smoother counter animation
    // Recommended: 50-200 (default: 100)
    steps: 100,
    
    // Easing function power for counter
    // Higher = counter starts slow, speeds up at end
    // Recommended: 2-4 (default: 3)
    easingPower: 3,
  },

  // ===== LOADING ELEMENTS FADE-OUT TIMING =====
  fadeOut: {
    // Base delay before fade-out starts (in milliseconds)
    // Usually 0, but can add delay if needed
    // Recommended: 0-200ms (default: 0ms)
    baseDelay: 0,
    
    // Stagger delay between counter/bar and left text (in milliseconds)
    // Higher = more time between each element fading out
    // Recommended: 100-400ms (default: 200ms)
    staggerDelay: 200,
    
    // Stagger delay between left text and right text (in milliseconds)
    // Recommended: 100-400ms (default: 200ms)
    staggerDelay2: 200,
    
    // Transition duration for fade-out (CSS transition)
    // Recommended: 200-500ms (default: 300ms)
    transitionDuration: 300,
  },

  // ===== NAVIGATION TIMING =====
  navigation: {
    // Delay before navigating to new page (in milliseconds)
    // Happens at peak blur (when blur is at maximum)
    // Higher = longer wait at peak blur before navigation
    // Recommended: 0-300ms (default: 100ms)
    delayAtPeak: 0,
    
    // Delay after text fade-out before starting unblur (in milliseconds)
    // Higher = longer pause before revealing new page
    // Recommended: 200-600ms (default: 300ms)
    delayBeforeUnblur: 300,
    
    // Delay after unblur completes before cleaning up (in milliseconds)
    // Recommended: 50-200ms (default: 100ms)
    cleanupDelay: 100,
  },

  // ===== BROWSER NAVIGATION (back/forward button) =====
  browserNav: {
    // Blur steps for browser navigation (can be different from manual transition)
    // Recommended: 50-100 (default: 60)
    blurSteps: 60,
    
    // Blur step duration for browser navigation
    // Recommended: 8-15ms (default: 12ms)
    blurStepDuration: 12,
    
    // Fade-in delays for browser navigation
    counterBarDelay: 100,
    leftTextDelay: 300,
    rightTextDelay: 500,
    
    // Counter duration for browser navigation
    // Recommended: 1000-1500ms (default: 1200ms)
    counterDuration: 1200,
    
    // Minimum display time for loading screen (in milliseconds)
    // Recommended: 1500-3000ms (default: 2000ms)
    minDisplayTime: 2000,
    
    // Fade-in duration for browser navigation (in milliseconds)
    // Recommended: 400-800ms (default: 600ms)
    fadeInDuration: 600,
    
    // Fade-out duration for browser navigation (in milliseconds)
    // Recommended: 400-800ms (default: 600ms)
    fadeOutDuration: 600,
  },
} as const

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
  const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null)
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
    if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current)
    
    // Hide page content immediately to prevent flash
    // Use requestAnimationFrame to ensure state updates before render
    requestAnimationFrame(() => {
      // Start blur at 0 and gradually increase to create smooth blur-in effect
      setBlurOpacity(0)
      
      // Animate blur opacity smoothly from 0 to 1
      const blurSteps = ANIMATION_CONFIG.blurIn.steps
      const blurStepDuration = ANIMATION_CONFIG.blurIn.stepDuration
      let blurStep = 0
      
      blurFadeInTimeoutRef.current = setTimeout(() => {
        const blurInterval = setInterval(() => {
          blurStep++
          const progress = blurStep / blurSteps
          // Use easing function for smooth acceleration
          const easedProgress = 1 - Math.pow(1 - progress, ANIMATION_CONFIG.blurIn.easingPower)
          setBlurOpacity(easedProgress)
          
          if (blurStep >= blurSteps) {
            setBlurOpacity(1) // Ensure it reaches exactly 1
            clearInterval(blurInterval)
            if (blurIntervalRef.current) {
              blurIntervalRef.current = null
            }
            
            // Navigate at the apex of the blur (when blur is at maximum)
            // This happens after blur has fully completed on current page
            setTimeout(() => {
              router.push(href)
            }, ANIMATION_CONFIG.navigation.delayAtPeak)
          }
        }, blurStepDuration)
        
        // Store interval ref for cleanup
        blurIntervalRef.current = blurInterval as unknown as NodeJS.Timeout
      }, 0) // Start immediately
    })
    
    // Staggered fade-in for loading elements
    // Wait for blur to start before showing loading elements
    // 1. Counter and bar fade in after blur has started
    counterBarFadeInTimeoutRef.current = setTimeout(() => {
      setCounterBarOpacity(1)
    }, ANIMATION_CONFIG.fadeIn.counterBarDelay)
    
    // 2. Left text "Russell Saw" fades in after counter/bar
    leftTextFadeInTimeoutRef.current = setTimeout(() => {
      setLeftTextOpacity(1)
    }, ANIMATION_CONFIG.fadeIn.leftTextDelay)
    
    // 3. Right text "UI / UX" fades in last
    rightTextFadeInTimeoutRef.current = setTimeout(() => {
      setRightTextOpacity(1)
    }, ANIMATION_CONFIG.fadeIn.rightTextDelay)
    
    // Animate counter from 0 to 100 - when it reaches 100, start fade out immediately
    const counterDuration = ANIMATION_CONFIG.counter.duration
    const counterSteps = ANIMATION_CONFIG.counter.steps
    const counterInterval = counterDuration / counterSteps
    
    let currentStep = 0
    counterIntervalRef.current = setInterval(() => {
      currentStep++
      const progress = Math.min(currentStep / counterSteps, 1)
      // Use easing function for smooth animation
      const easedProgress = 1 - Math.pow(1 - progress, ANIMATION_CONFIG.counter.easingPower)
      const counterValue = Math.floor(easedProgress * 100)
      // Ensure it reaches 100
      setCounter(currentStep >= counterSteps ? 100 : counterValue)
      
      if (currentStep >= counterSteps) {
        setCounter(100) // Force to 100
        if (counterIntervalRef.current) {
          clearInterval(counterIntervalRef.current)
        }
        // Start fade out immediately when counter reaches 100
        const baseFadeOutDelay = ANIMATION_CONFIG.fadeOut.baseDelay
        // Counter and bar fade out first
        counterBarFadeOutTimeoutRef.current = setTimeout(() => {
          setCounterBarOpacity(0)
        }, baseFadeOutDelay)
        // Left text fades out second
        leftTextFadeOutTimeoutRef.current = setTimeout(() => {
          setLeftTextOpacity(0)
        }, baseFadeOutDelay + ANIMATION_CONFIG.fadeOut.staggerDelay)
        // Right text fades out last
        rightTextFadeOutTimeoutRef.current = setTimeout(() => {
          setRightTextOpacity(0)
        }, baseFadeOutDelay + ANIMATION_CONFIG.fadeOut.staggerDelay + ANIMATION_CONFIG.fadeOut.staggerDelay2)
        
        // Unblur the new page after text fade out completes
        const textFadeOutComplete = baseFadeOutDelay + ANIMATION_CONFIG.fadeOut.staggerDelay + ANIMATION_CONFIG.fadeOut.staggerDelay2 + ANIMATION_CONFIG.navigation.delayBeforeUnblur
        timeoutRef.current = setTimeout(() => {
          // Animate blur opacity smoothly from 1 to 0 (unblur)
          const unblurSteps = ANIMATION_CONFIG.blurOut.steps
          const unblurStepDuration = ANIMATION_CONFIG.blurOut.stepDuration
          let unblurStep = 0
          
          blurFadeOutTimeoutRef.current = setTimeout(() => {
            const unblurInterval = setInterval(() => {
              unblurStep++
              const progress = unblurStep / unblurSteps
              // Use easing function for smooth deceleration
              const easedProgress = Math.pow(progress, ANIMATION_CONFIG.blurOut.easingPower)
              setBlurOpacity(1 - easedProgress) // Go from 1 to 0
              
              if (unblurStep >= unblurSteps) {
                setBlurOpacity(0) // Ensure it reaches exactly 0
                clearInterval(unblurInterval)
                
                // Clean up transition state after unblur completes
                fadeOutTimeoutRef.current = setTimeout(() => {
                  setIsTransitioning(false)
                  setCounter(0)
                  setCounterBarOpacity(0)
                  setLeftTextOpacity(0)
                  setRightTextOpacity(0)
                  setBlurOpacity(0)
                  pendingHrefRef.current = null
                  isManualTransitionRef.current = false
                }, ANIMATION_CONFIG.navigation.cleanupDelay)
              }
            }, unblurStepDuration)
          }, 0)
        }, textFadeOutComplete)
      }
    }, counterInterval)
    
    // Fallback: if counter somehow doesn't reach 100 within expected time, trigger fade out
    // This is a safety mechanism (shouldn't normally be needed)
    fallbackTimeoutRef.current = setTimeout(() => {
      // Only trigger if fade out hasn't started yet (check if timeoutRef is still null)
      if (!timeoutRef.current) {
        const baseFadeOutDelay = ANIMATION_CONFIG.fadeOut.baseDelay
        counterBarFadeOutTimeoutRef.current = setTimeout(() => {
          setCounterBarOpacity(0)
        }, baseFadeOutDelay)
        leftTextFadeOutTimeoutRef.current = setTimeout(() => {
          setLeftTextOpacity(0)
        }, baseFadeOutDelay + ANIMATION_CONFIG.fadeOut.staggerDelay)
        rightTextFadeOutTimeoutRef.current = setTimeout(() => {
          setRightTextOpacity(0)
        }, baseFadeOutDelay + ANIMATION_CONFIG.fadeOut.staggerDelay + ANIMATION_CONFIG.fadeOut.staggerDelay2)
        
        const textFadeOutComplete = baseFadeOutDelay + ANIMATION_CONFIG.fadeOut.staggerDelay + ANIMATION_CONFIG.fadeOut.staggerDelay2 + ANIMATION_CONFIG.navigation.delayBeforeUnblur
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
          }, ANIMATION_CONFIG.fadeOut.transitionDuration)
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
      if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current)
      
      // Start blur immediately - will increase to extreme levels with smooth easing
      setBlurOpacity(0)
      blurFadeInTimeoutRef.current = setTimeout(() => {
        let blurProgress = 0
        const blurSteps = ANIMATION_CONFIG.browserNav.blurSteps
        const blurStepDuration = ANIMATION_CONFIG.browserNav.blurStepDuration
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
      }, ANIMATION_CONFIG.browserNav.counterBarDelay)
      
      leftTextFadeInTimeoutRef.current = setTimeout(() => {
        setLeftTextOpacity(1)
      }, ANIMATION_CONFIG.browserNav.leftTextDelay)
      
      rightTextFadeInTimeoutRef.current = setTimeout(() => {
        setRightTextOpacity(1)
      }, ANIMATION_CONFIG.browserNav.rightTextDelay)
      
      const minDisplayTime = ANIMATION_CONFIG.browserNav.minDisplayTime
      const fadeInDuration = ANIMATION_CONFIG.browserNav.fadeInDuration
      const fadeOutDuration = ANIMATION_CONFIG.browserNav.fadeOutDuration
      const holdTime = minDisplayTime - fadeInDuration - fadeOutDuration
      
      // Animate counter from 0 to 100 (finishes before fade out starts)
      const counterDuration = ANIMATION_CONFIG.browserNav.counterDuration
      const counterSteps = ANIMATION_CONFIG.counter.steps
      const counterInterval = counterDuration / counterSteps
      
      let currentStep = 0
      counterIntervalRef.current = setInterval(() => {
        currentStep++
        const progress = Math.min(currentStep / counterSteps, 1)
        const easedProgress = 1 - Math.pow(1 - progress, ANIMATION_CONFIG.counter.easingPower)
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
        // Left text fades out second
        leftTextFadeOutTimeoutRef.current = setTimeout(() => {
          setLeftTextOpacity(0)
        }, baseFadeOutDelay + ANIMATION_CONFIG.fadeOut.staggerDelay)
        // Right text fades out last
        rightTextFadeOutTimeoutRef.current = setTimeout(() => {
          setRightTextOpacity(0)
        }, baseFadeOutDelay + ANIMATION_CONFIG.fadeOut.staggerDelay + ANIMATION_CONFIG.fadeOut.staggerDelay2)
      
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
      if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current)
    }
  }, [])

  // Blur amount increases dramatically to create "fade to color" effect
  // At max blur, the page should become a single color
  // Use easing curve for more dramatic blur progression
  // Only calculate blur effects when actually transitioning AND blurOpacity is active
  const easedBlurOpacity = (isTransitioning && blurOpacity > 0) 
    ? 1 - Math.pow(1 - blurOpacity, ANIMATION_CONFIG.blurEffect.blurEasingPower) 
    : 0
  const blurAmount = easedBlurOpacity * ANIMATION_CONFIG.blurEffect.maxBlur
  
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
      {/* Page content wrapper - always visible, blur overlay handles the transition effect */}
      <div
        style={{
          opacity: 1, // Always fully visible
          visibility: 'visible',
          position: 'relative',
          zIndex: 1,
          width: '100%',
          pointerEvents: isTransitioning ? 'none' : 'auto',
        }}
      >
        {contentToRender}
      </div>
      {isTransitioning && blurOpacity > 0 && (
        <>
          {/* Blur overlay - blurs current page out, then unblurs new page in */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
              backdropFilter: `blur(${blurAmount}px) saturate(${1 + (blurOpacity * ANIMATION_CONFIG.blurEffect.saturationBoost)})`,
              WebkitBackdropFilter: `blur(${blurAmount}px) saturate(${1 + (blurOpacity * ANIMATION_CONFIG.blurEffect.saturationBoost)})`,
              pointerEvents: 'none',
              zIndex: 99998,
              opacity: 1, // Always fully opaque - blur amount controls the effect
            }}
          />
          {/* Loading counter and bar - above blur overlay */}
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
              transition: `opacity ${ANIMATION_CONFIG.fadeIn.transitionDuration}ms ease-in-out`,
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
          {/* Bottom right corner text - above blur overlay */}
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
              transition: `opacity ${ANIMATION_CONFIG.fadeIn.transitionDuration}ms ease-in-out`,
            }}
          >
            UI / UX 
          </div>
          {/* Bottom left corner text - above blur overlay */}
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
              transition: `opacity ${ANIMATION_CONFIG.fadeIn.transitionDuration}ms ease-in-out`,
            }}
          >
            Russell Saw 
          </div>
        </>
      )}
    </NavigationContext.Provider>
  )
}

