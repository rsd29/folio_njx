'use client'

// import { useEffect, useRef, useState, useCallback } from 'react'
import { useEffect, useRef, type MouseEvent } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowDownIcon, DownloadIcon } from '@radix-ui/react-icons'
import styles from './home.module.css'
import ProjectsSection from '../components/ProjectSection'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Tagline functionality commented out - keeping for potential future use
// const taglines = [
//   "live from a shoebox that costs $800 a week.",
//   "where house prices rise faster than frontend frameworks.",
//   "currently battling three types of weather and two kinds of impostor syndrome.",
//   "broadcasting from a laneway you've probably never heard of.",
//   "still saving for a place with natural light.",
//   "where the rent is high but brunch is higher.",
//   "where even the pigeons have a side hustle.",
//   "still debugging life and code.",
//   "home of coffee snobs and CSS bugs.",
//   "where freelancers are born and slowly caffeinated to death.",
//   "live from the world's most livable city (unless you're poor).",
// ]

export default function HomePage() {
  const pathname = usePathname()
  const heroSectionRef = useRef<HTMLElement | null>(null)
  const heroStageRef = useRef<HTMLDivElement | null>(null)
  const heroOverlayRef = useRef<HTMLDivElement | null>(null)
  const heroSignatureRef = useRef<HTMLDivElement | null>(null)
  const heroContentRef = useRef<HTMLDivElement | null>(null)

  const handleCaseStudiesClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const element = document.getElementById('case-studies')
    if (!element) return

    const smoother = ScrollSmoother.get()
    if (smoother) {
      smoother.scrollTo(element, true, 'top top')
    } else {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    // Keep URL in sync without triggering a jump.
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '#case-studies')
    }
  }

  useEffect(() => {
    // Reset scroll when navigating to this page
    const resetScroll = () => {
      if (typeof window !== 'undefined') {
        // First, reset window scroll immediately
        window.scrollTo({ top: 0, behavior: 'auto' })
        
        // Then handle ScrollSmoother if available
        const smootherInstance = ScrollSmoother.get()
        if (smootherInstance) {
          // Use multiple requestAnimationFrame to ensure it happens after render
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              smootherInstance.scrollTo(0, true)
            })
          })
        }
      }
    }

    // Reset immediately
    resetScroll()

    // Also reset after delays to catch any late scroll restoration
    const timeout1 = setTimeout(resetScroll, 50)
    const timeout2 = setTimeout(resetScroll, 150)
    
    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
    }
  }, [pathname])

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Respect reduced motion: keep content visible, no pin/scrub.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const section = heroSectionRef.current
    const stage = heroStageRef.current
    const overlay = heroOverlayRef.current
    const signature = heroSignatureRef.current
    const content = heroContentRef.current
    if (!section || !stage || !overlay || !signature || !content) return

    gsap.registerPlugin(ScrollTrigger)

    // Initial state: show signature, hide content until scroll reveal begins.
    gsap.set(content, { opacity: 0, filter: 'blur(22px)', y: 24, pointerEvents: 'none' })
    gsap.set(signature, { pointerEvents: 'auto' })
    gsap.set(stage, {
      scale: 1,
      borderRadius: 0,
      transformOrigin: '50% 50%',
    })
    gsap.set(section, { height: '100vh' })
    gsap.set(overlay, { opacity: 1, filter: 'blur(0px)' })

    let tl: gsap.core.Timeline | null = null
    const init = () => {
      const smoother = ScrollSmoother.get()
      const scroller = smoother ? (smoother.wrapper() as Element) : undefined
      let hasTakenOver = false

      tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=260%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
          scroller,
          onUpdate: (self) => {
            // Hand-off: once scrolling begins, stop the CSS entrance animations from overriding GSAP.
            if (!hasTakenOver && self.progress > 0) {
              hasTakenOver = true

              const animatedBits = signature.querySelectorAll(
                `.${styles.heroSignatureName}, .${styles.heroSignatureRoleWrapper}, .${styles.heroSignatureRole}, .${styles.heroSignatureRole2}`,
              )

              gsap.set([signature, ...Array.from(animatedBits)], {
                // Prevent keyframes from fighting the scroll-driven animation.
                animation: 'none',
                // Ensure a stable "fully revealed" baseline before we animate out.
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                clearProps: 'transform',
              })
            }

            // Enable interactions once content is mostly revealed.
            const allowContent = self.progress > 0.65
            content.style.pointerEvents = allowContent ? 'auto' : 'none'
            signature.style.pointerEvents = allowContent ? 'none' : 'auto'
          },
        },
      })

      // Slower, smoother reveal (original feel): short hold, then a longer crossfade/blur.
      tl.to({}, { duration: 0.12 })
      tl.to(
        signature,
        { opacity: 0, filter: 'blur(34px)', y: -16, duration: 0.55 },
        0.12,
      )
      tl.to(
        content,
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.55 },
        0.12,
      )

      // Phase 2: encapsulate + shrink (scroll-linked).
      // Corner radius grows to 30px while the whole hero "stage" shrinks and rounds.
      tl.to(stage, {
        scale: 0.88,
        borderRadius: 30,
        duration: 0.9,
      })

      // Phase 3: as we release the pin and allow normal scrolling, blur/fade out the hero content.
      // (Video/background remains; only foreground content disappears.)
      tl.to(overlay, {
        opacity: 0,
        filter: 'blur(18px)',
        duration: 0.5,
      })

      // Phase 4: collapse the entire hero (100vh → 0) for an unexpected transition into Projects.
      tl.to([section, stage], {
        height: 0,
        borderRadius: 0,
        duration: 0.8,
      })

      // Remove the post-collapse gap by collapsing ScrollTrigger's pin spacer alongside the hero.
      const st = tl.scrollTrigger as unknown as { pinSpacer?: HTMLElement }
      const spacer = st?.pinSpacer
      if (spacer) {
        gsap.set(spacer, { overflow: 'hidden', willChange: 'height' })
        tl.to(
          spacer,
          {
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            marginBottom: 0,
            duration: 0.8,
          },
          '<',
        )
      }

      ScrollTrigger.refresh()
    }

    // Wait a beat so ScrollSmoother (created in `components/SmoothScroll`) can initialize first.
    const initTimeout = window.setTimeout(init, 160)

    return () => {
      window.clearTimeout(initTimeout)
      tl?.scrollTrigger?.kill()
      tl?.kill()
    }
  }, [])

  // Tagline functionality commented out - keeping for potential future use
  // const [displayed, setDisplayed] = useState('')
  // const [fullTagline, setFullTagline] = useState('')
  // const [charIndex, setCharIndex] = useState(0)
  // const fullTaglineRef = useRef(fullTagline)

  // useEffect(() => {
  //   fullTaglineRef.current = fullTagline
  // }, [fullTagline])

  // useEffect(() => {
  //   if (charIndex < fullTagline.length) {
  //     const timeout = setTimeout(() => {
  //       setDisplayed((prev) => prev + fullTagline[charIndex])
  //       setCharIndex((prev) => prev + 1)
  //     }, 20)
  //     return () => clearTimeout(timeout)
  //   }
  // }, [charIndex, fullTagline])

  // const loadNewTagline = useCallback(() => {
  //   let newLine = ''
  //   do {
  //     newLine = taglines[Math.floor(Math.random() * taglines.length)]
  //   } while (newLine === fullTaglineRef.current)

  //   setFullTagline(newLine)
  //   setDisplayed('')
  //   setCharIndex(0)
  // }, [])

  // useEffect(() => {
  //   loadNewTagline()
  // }, [loadNewTagline])

  return (
    <main style={{ maxWidth: '100%' }}>
      <section
        ref={heroSectionRef}
        className={`${styles.fullWidthSection} ${styles.heroSection}`}
      >
        <div ref={heroStageRef} className={styles.heroStage}>
          <div className={styles.videoBackground}>
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className={styles.videoElement}
              style={{
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
          </div>

          <div ref={heroOverlayRef} className={styles.heroOverlay}>
            <div className={styles.heroSignatureWrapper}>
              <div ref={heroSignatureRef} className={styles.heroSignature}>
                <span className={styles.heroSignatureName}>Russell Saw </span>
                <span className={styles.heroSignatureDivider} />
                <div className={styles.heroSignatureRoleWrapper}>
                  <span className={styles.heroSignatureRole}>UI \ UX</span>
                  <span className={styles.heroSignatureRole2}>Designer</span>
                </div>
              </div>
            </div>

            <div className={styles.heroContentWrapper}>
              <div ref={heroContentRef} className={styles.heroContent}>
                <div className={styles.heroPrimary}>

                <div className={styles.heroIntroRow}>
                  <div className={styles.heroLeadGroup}>
                    <p
                      className={`${styles.heroLead} ${styles.heroLeadLine}`}
                      style={{ animationDelay: '0.1s' }}
                    >
                      Effortless experiences for users. Scalable systems for teams.
                    </p>
                    <p
                      className={`${styles.heroLead} ${styles.heroLeadLine2}`}
                      style={{ animationDelay: '0.25s' }}
                    >
                      Enterprise UX Designer at Oriental Merchant, blending design and code to drive meaningful
                      business outcomes.
                    </p>
                  </div>
                  <div className={styles.heroLogoMark} aria-hidden="true">
                    <Image
                      src="/logo.png"
                      alt=""
                      width={220}
                      height={220}
                      className={styles.heroLogoMarkImage}
                      priority
                    />
                  </div>
                </div>

     
              <div className={`${styles.heroLeadMeta} ${styles.heroLeadLine}`} style={{ animationDelay: '0.45s' }}>
       
              </div>

            {/* <div className={styles.heroTicker}>
              <span className={styles.heroTickerText}>Based in Melbourne — {displayed}</span>
              <button type="button" className={styles.heroTickerButton} onClick={loadNewTagline}>
                Shuffle line
              </button>
            </div> */}
                  <div className={styles.heroActions}>
              <Link
                href="#case-studies"
                scroll
                className={styles.heroButtonPrimary}
                onClick={handleCaseStudiesClick}
              >
                View Case Studies
                <ArrowDownIcon className={styles.heroButtonIcon} />
              </Link>
              <a
                href="/rs-resume-q3-2025-v2.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroButtonSecondary}
              >
                Download Resume
                <DownloadIcon className={styles.heroButtonIcon} />
              </a>
              <div className={styles.heroAvailabilityPill}>
  Open to New Opportunities
  <span className={styles.availabilityIndicator}></span>
</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProjectsSection />
    </main>
  )
}
