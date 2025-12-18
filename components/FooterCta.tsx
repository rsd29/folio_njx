'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import ContactForm from './ContactForm'
import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

export default function FooterCta() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const panelId = useId()
  const innerRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [panelHeight, setPanelHeight] = useState(0)
  const [baseHeight, setBaseHeight] = useState(0)
  const [ctaState, setCtaState] = useState<'idle' | 'success'>('idle')
  const [formKey, setFormKey] = useState(0)
  const ctaContentRef = useRef<HTMLDivElement | null>(null)
  const ctaSuccessRef = useRef<HTMLDivElement | null>(null)
  const ctaTweenRef = useRef<gsap.core.Timeline | null>(null)
  const prevCtaStateRef = useRef<'idle' | 'success'>('idle')

  const resetCta = () => {
    setCtaState('idle')
    setFormKey((k) => k + 1)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(mql.matches)
    apply()
    // Safari < 14 uses addListener/removeListener.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyMql = mql as any
    if (anyMql.addEventListener) anyMql.addEventListener('change', apply)
    else anyMql.addListener(apply)
    return () => {
      if (anyMql.removeEventListener) anyMql.removeEventListener('change', apply)
      else anyMql.removeListener(apply)
    }
  }, [])

  // Reset CTA whenever navigation changes (FooterCta lives in the root layout).
  useEffect(() => {
    resetCta()
    setIsOpen(false)
  }, [pathname])

  // Allow other components (eg. Footer) to open + scroll to this CTA.
  useEffect(() => {
    if (typeof window === 'undefined') return

    const onOpen = () => {
      resetCta()
      setIsOpen(true)

      // Scroll after state updates/layout.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = containerRef.current
          if (!el) return

          const smoother = ScrollSmoother.get()
          if (smoother) {
            smoother.scrollTo(el, true, 'top top')
            return
          }
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      })
    }

    window.addEventListener('footer-cta:open', onOpen)
    return () => window.removeEventListener('footer-cta:open', onOpen)
  }, [])

  // Hero-style GSAP crossfade between CTA content and success state.
  useEffect(() => {
    if (typeof window === 'undefined') return

    const content = ctaContentRef.current
    const success = ctaSuccessRef.current
    if (!content || !success) return

    // If the panel isn't open, just snap to the correct state (avoid animating offscreen).
    if (!isOpen) {
      ctaTweenRef.current?.kill()
      ctaTweenRef.current = null
      if (ctaState === 'success') {
        gsap.set(content, { opacity: 0, filter: 'blur(22px)', y: -16, pointerEvents: 'none' })
        gsap.set(success, { opacity: 1, filter: 'blur(0px)', y: 0, pointerEvents: 'auto' })
      } else {
        gsap.set(content, { opacity: 1, filter: 'blur(0px)', y: 0, pointerEvents: 'auto' })
        gsap.set(success, { opacity: 0, filter: 'blur(22px)', y: 24, pointerEvents: 'none' })
      }
      prevCtaStateRef.current = ctaState
      return
    }

    if (reduceMotion) {
      ctaTweenRef.current?.kill()
      ctaTweenRef.current = null
      if (ctaState === 'success') {
        gsap.set(content, { opacity: 0, filter: 'blur(0px)', y: 0, pointerEvents: 'none' })
        gsap.set(success, { opacity: 1, filter: 'blur(0px)', y: 0, pointerEvents: 'auto' })
      } else {
        gsap.set(content, { opacity: 1, filter: 'blur(0px)', y: 0, pointerEvents: 'auto' })
        gsap.set(success, { opacity: 0, filter: 'blur(0px)', y: 0, pointerEvents: 'none' })
      }
      prevCtaStateRef.current = ctaState
      return
    }

    const prev = prevCtaStateRef.current
    if (prev === ctaState) return
    prevCtaStateRef.current = ctaState

    ctaTweenRef.current?.kill()
    ctaTweenRef.current = null

    // Establish "hero-like" baselines before animating.
    if (ctaState === 'success') {
      gsap.set(content, { opacity: 1, filter: 'blur(0px)', y: 0, pointerEvents: 'auto' })
      gsap.set(success, { opacity: 0, filter: 'blur(22px)', y: 24, pointerEvents: 'none' })
    } else {
      gsap.set(content, { opacity: 0, filter: 'blur(22px)', y: 24, pointerEvents: 'none' })
      gsap.set(success, { opacity: 1, filter: 'blur(0px)', y: 0, pointerEvents: 'auto' })
    }

    const tl = gsap.timeline({ defaults: { ease: 'none' } })
    ctaTweenRef.current = tl

    // Match hero: tiny hold, then smooth blur crossfade with a slight y-shift.
    tl.to({}, { duration: 0.12 })

    if (ctaState === 'success') {
      tl.to(content, { opacity: 0, filter: 'blur(34px)', y: -16, duration: 0.55 }, 0.12)
      tl.to(success, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.55 }, 0.12)
      tl.eventCallback('onComplete', () => {
        content.style.pointerEvents = 'none'
        success.style.pointerEvents = 'auto'
      })
    } else {
      tl.to(success, { opacity: 0, filter: 'blur(34px)', y: -16, duration: 0.55 }, 0.12)
      tl.to(content, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.55 }, 0.12)
      tl.eventCallback('onComplete', () => {
        content.style.pointerEvents = 'auto'
        success.style.pointerEvents = 'none'
      })
    }

    return () => {
      tl.kill()
    }
  }, [ctaState, isOpen, reduceMotion])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const clampBaseHeight = () => {
      // Matches the old "50vh, min 400, max 600" behavior.
      const h = Math.min(Math.max(window.innerHeight * 0.5, 400), 600)
      setBaseHeight(h)
    }

    const measurePanel = () => {
      if (!innerRef.current) return
      // Measure content height even when collapsed so we can offset the CTA button smoothly.
      setPanelHeight(innerRef.current.scrollHeight)
    }

    const update = () => {
      clampBaseHeight()
      measurePanel()
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // When opening, re-measure after render so the height animation gets the correct target.
  useEffect(() => {
    if (!isOpen) return
    if (typeof window === 'undefined') return
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        if (!innerRef.current) return
        setPanelHeight(innerRef.current.scrollHeight)
      })
      return () => cancelAnimationFrame(raf2)
    })
    return () => cancelAnimationFrame(raf1)
  }, [isOpen])

  const isActive = isHovering || isFocused
  const openPanelHeight = isOpen ? panelHeight : 0

  const containerHeight = useMemo(() => {
    // Avoid 0px on first render; fall back to old default until effects run.
    const base = baseHeight || 600
    return base + openPanelHeight
  }, [baseHeight, openPanelHeight])

  const headlineStyle = useMemo(
    () => ({
      color: '#ffffff',
      fontSize: 'var(--font-heading-xl)',
      fontWeight: 250,
      fontFamily: 'var(--font-body)',
      letterSpacing: '-0.05em',
      lineHeight: 1.1,
    }),
    [],
  )

  const panelInnerStyle = useMemo(() => {
    return {
      padding: '50px 10% 50px',
      width: '100%',
      margin: 0,
    } satisfies React.CSSProperties
  }, [])

  const contentGridStyle = useMemo(() => {
    const base: React.CSSProperties = {
      width: '100%',
      margin: 0,
      display: 'grid',
      gridTemplateColumns: 'minmax(320px, 1fr) minmax(420px, 1.2fr)',
      gap: '56px',
      // Vertically center the left copy relative to the (often taller) right-side form
      // so both sit centered within the panel area.
      alignItems: 'center',
    }

    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return { ...base, gridTemplateColumns: '1fr', gap: '28px' }
    }
    return base
  }, [])

  return (
    <div id="footer-cta" style={{ width: '100%', position: 'relative' }} ref={containerRef}>
      <div
        style={{
          width: '100%',
          height: `${containerHeight}px`,
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          contain: 'layout style paint',
          transition: reduceMotion ? 'none' : 'height 700ms cubic-bezier(0.2, 0.8, 0.2, 1)',
          willChange: 'height',
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundImage:
              'url("https://cdn.prod.website-files.com/6568e5c693ac2a6aade3ad99%2F66abd5153122bb677020b0c8_bg-landing-poster-00001.jpg")',
          }}
        >
          <source
            src="https://cdn.prod.website-files.com/6568e5c693ac2a6aade3ad99%2F66abd5153122bb677020b0c8_bg-landing-transcode.webm"
            type="video/webm"
          />
          <source
            src="https://cdn.prod.website-files.com/6568e5c693ac2a6aade3ad99%2F66abd5153122bb677020b0c8_bg-landing-transcode.mp4"
            type="video/mp4"
          />
        </video>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((v) => !v)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            position: 'absolute',
            // Center within the *base* hero video area (not the expanded container).
            top: `${(baseHeight || 600) / 2}px`,
            transform: 'translateY(-50%)',
            left: '10%',
            right: '10%',
            zIndex: 4,
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: '14px',
            textAlign: 'left',
            ...headlineStyle,
            background: 'transparent',
            border: 0,
            padding: 0,
            cursor: 'pointer',
            opacity: isActive ? 0.97 : 1,
            transition: 'opacity 200ms ease, transform 260ms ease',
          }}
        >
          <span style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <span style={{ opacity: 0.98 }}>Let&apos;s collaborate, </span>
              <span style={{ opacity: 0.72 }}>Drop us a line</span>
            </span>
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: '-10px',
                height: '2px',
                background: 'rgba(255, 255, 255, 0.55)',
                transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 260ms ease',
              }}
            />
          </span>
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              transform: isActive ? 'translateX(10px)' : 'translateX(0)',
              transition: 'transform 260ms ease, opacity 260ms ease',
              opacity: isActive ? 1 : 0.84,
            }}
          >
            →
          </span>
        </button>
      </div>

      <div
        id={panelId}
        aria-hidden={!isOpen}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: openPanelHeight,
          overflow: 'hidden',
          // Dark blurred overlay *over the video* for the CTA area.
          background: 'rgba(0, 0, 0, 0.78)',
          backdropFilter: 'blur(24px) saturate(1.1)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.1)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          transition: reduceMotion ? 'none' : 'height 700ms cubic-bezier(0.2, 0.8, 0.2, 1)',
          willChange: 'height',
          pointerEvents: isOpen ? 'auto' : 'none',
          zIndex: 3,
        }}
      >
        <div
          ref={innerRef}
          style={{
            ...panelInnerStyle,
            position: 'relative',
            opacity: isOpen ? 1 : 0,
            filter: isOpen ? 'blur(0px)' : 'blur(18px)',
            transition: reduceMotion ? 'none' : 'opacity 250ms ease, filter 700ms cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          {/* CTA content (blurs out on success) */}
          <div
            ref={ctaContentRef}
            style={{
              ...contentGridStyle,
              willChange: 'opacity, filter, transform',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'flex-start' }}>
              <div style={{ ...headlineStyle }}>
                <span style={{ opacity: 0.98 }}>Quick hello, </span>
                <span style={{ opacity: 0.72 }}>quicker reply.</span>
              </div>
              <div
                style={{
                  maxWidth: '46ch',
                  color: 'rgba(255,255,255,0.72)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-body-m)',
                  fontWeight: 400,
                  lineHeight: 'var(--line-height-normal)',
                  letterSpacing: 'var(--letter-spacing-normal)',
                }}
              >
                A couple of lines is perfect — what are you working on, what do you need, and when do you need it by?
              </div>
            </div>
            <div style={{ width: '100%' }}>
              <ContactForm
                key={formKey}
                showSuccessTag={false}
                onSuccess={() => setCtaState('success')}
              />
            </div>
          </div>

          {/* Success state (blurs in, acid green, resettable) */}
          <div
            ref={ctaSuccessRef}
            aria-hidden={ctaState !== 'success'}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '50px 10% 50px',
              willChange: 'opacity, filter, transform',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ ...headlineStyle, color: '#bcff4e' }}>
                Thanks! I&apos;ll be in touch soon.
              </div>
              <button
                type="button"
                onClick={resetCta}
                style={{
                  padding: '12px 22px',
                  borderRadius: '999px',
                  border: '1px solid rgba(188, 255, 78, 0.55)',
                  background: 'rgba(188, 255, 78, 0.08)',
                  color: '#bcff4e',
                  fontSize: '1rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-heading)',
                  cursor: 'pointer',
                  transition: 'transform 200ms ease, background 200ms ease, border-color 200ms ease',
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Responsive: stack on smaller screens


