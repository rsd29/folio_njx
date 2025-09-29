'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './home.module.css'
import AnimatedRichText from '../components/AnimatedRichText'
import ScrollRevealText from '../components/ScrollRevealText'
import ProjectsSection from '../components/ProjectSection'

const taglines = [
  "live from a shoebox that costs $800 a week.",
  "where house prices rise faster than frontend frameworks.",
  "currently battling three types of weather and two kinds of impostor syndrome.",
  "broadcasting from a laneway you’ve probably never heard of.",
  "still saving for a place with natural light.",
  "where the rent is high but brunch is higher.",
  "where even the pigeons have a side hustle.",
  "still debugging life and code.",
  "home of coffee snobs and CSS bugs.",
  "where freelancers are born and slowly caffeinated to death.",
  "live from the world’s most livable city (unless you're poor).",
]

export default function HomePage() {
  const breakRef = useRef<HTMLDivElement>(null)

  const [displayed, setDisplayed] = useState('')
  const [fullTagline, setFullTagline] = useState('')
  const [charIndex, setCharIndex] = useState(0)

  // Typing animation - Optimized
  useEffect(() => {
    if (charIndex < fullTagline.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + fullTagline[charIndex])
        setCharIndex((prev) => prev + 1)
      }, 20) // Slightly slower for better performance
      return () => clearTimeout(timeout)
    }
  }, [charIndex, fullTagline])

  // Function to pick a new tagline
  const loadNewTagline = () => {
    let newLine = ''
    do {
      newLine = taglines[Math.floor(Math.random() * taglines.length)]
    } while (newLine === fullTagline)

    setFullTagline(newLine)
    setDisplayed('')
    setCharIndex(0)
  }

  // Load one tagline on boot
  useEffect(() => {
    loadNewTagline()
  }, [])

  // Mouse-following radial gradient - Optimized
  useEffect(() => {
    const el = breakRef.current
    if (!el) return

    let targetX = 50
    let currentX = 50
    let animationId: number | null = null
    let lastUpdate = 0
    const throttleMs = 16 // ~60fps

    const animate = (timestamp: number) => {
      if (timestamp - lastUpdate >= throttleMs) {
        currentX += (targetX - currentX) * 0.12 // Faster convergence
        el.style.backgroundImage = `radial-gradient(circle at ${currentX}% 100%, white 0%, rgba(175, 175, 175, 0.1) 90%, rgba(255, 255, 255, 0.05) 100%, transparent 95%)`
        lastUpdate = timestamp
      }
      animationId = requestAnimationFrame(animate)
    }

    const handleMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const relX = ((e.clientX - rect.left) / rect.width) * 100
      targetX = relX
    }

    window.addEventListener('mousemove', handleMouse, { passive: true })
    animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouse)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <main style={{ maxWidth: '100%' }}>
      <section className={`${styles.fullWidthSection} ${styles.heroSection}`}>
        {/* Background Video - Optimized */}
        <div className={styles.videoBackground}>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className={styles.videoElement}
            style={{
              backgroundImage: 'url("https://cdn.prod.website-files.com/6568e5c693ac2a6aade3ad99%2F66abd5153122bb677020b0c8_bg-landing-poster-00001.jpg")'
            }}
          >
            <source src="https://cdn.prod.website-files.com/6568e5c693ac2a6aade3ad99%2F66abd5153122bb677020b0c8_bg-landing-transcode.webm" type="video/webm" />
            <source src="https://cdn.prod.website-files.com/6568e5c693ac2a6aade3ad99%2F66abd5153122bb677020b0c8_bg-landing-transcode.mp4" type="video/mp4" />
          </video>
          
          {/* Text inside video frame */}
          <div className={styles.heroTextTop}>
            <AnimatedRichText
              className="heroSubtext"
              segments={[

                { text: "Russell Saw", color: "#ffffff", opacity: 1, isStrong: true }
              ]}
              useFlickerEffect={false}
              fontSize="8rem"
              fontWeight={300}
              lineHeight={0.9}
              letterSpacing="-0.06em"
            />
          </div>
        </div>

        {/* Text below video frame */}
        <div className={styles.heroTextBottom}>
          <AnimatedRichText
            className="heroSubtext"
            segments={[
              { text: 'A developer', isStrong: true },
              { text: ' fluent in design,' },
              { text: 'and a designer ', isStrong: true },
              { text: 'fluent in code.' },
            ]}
            useFlickerEffect={false}
            fontSize="4rem"
            fontWeight={300}
            lineHeight={0.9}
          />
        </div>

        <div className={styles.heroBreakDivContainer}>
          <div className={styles.heroBreakDiv} ref={breakRef}>
            <h4 className="heroSubtext2">Based in Melbourne, {displayed}</h4>
            <h4 className="heroSubtext3" onClick={loadNewTagline}>Want another?</h4>
          </div>
        </div>
      </section>

      {/* Animated Text Section */}
      <section className={styles.animatedTextSection}>
        <div className={styles.animatedTextContainer}>
          <ScrollRevealText
            text="Year 5 of UX."
            fontSize="3.5rem"
            fontWeight={300}
            lineHeight={1.2}
            letterSpacing="-0.01em"
            className="scrollRevealText"
          />
          <ScrollRevealText
            text="Currently leading product design across enterprise platforms at Oriental Merchant."
            fontSize="2.5rem"
            fontWeight={300}
            lineHeight={1.2}
            letterSpacing="-0.01em"
            className="scrollRevealText"
          />
        </div>
      </section>

      <ProjectsSection />
    </main>
  )
}
