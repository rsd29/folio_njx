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

  // Typing animation
  useEffect(() => {
    if (charIndex < fullTagline.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + fullTagline[charIndex])
        setCharIndex((prev) => prev + 1)
      }, 15)
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

  // Mouse-following radial gradient
  useEffect(() => {
    const el = breakRef.current
    if (!el) return

    let targetX = 50
    let currentX = 50

    const animate = () => {
      currentX += (targetX - currentX) * 0.08
      el.style.backgroundImage = `radial-gradient(circle at ${currentX}% 100%, white 0%, rgba(175, 175, 175, 0.1) 90%, rgba(255, 255, 255, 0.05) 100%, transparent 95%)`
      requestAnimationFrame(animate)
    }

    const handleMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const relX = ((e.clientX - rect.left) / rect.width) * 100
      targetX = relX
    }

    window.addEventListener('mousemove', handleMouse)
    animate()

    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <main style={{ maxWidth: '100%' }}>
      <section className={`${styles.fullWidthSection} ${styles.heroSection}`}>
        {/* Background Video */}
        <div className={styles.videoBackground}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className={styles.videoElement}
            style={{
              backgroundImage: 'url("https://cdn.prod.website-files.com/6568e5c693ac2a6aade3ad99%2F66abd5153122bb677020b0c8_bg-landing-poster-00001.jpg")'
            }}
          >
            <source src="https://cdn.prod.website-files.com/6568e5c693ac2a6aade3ad99%2F66abd5153122bb677020b0c8_bg-landing-transcode.mp4" />
            <source src="https://cdn.prod.website-files.com/6568e5c693ac2a6aade3ad99%2F66abd5153122bb677020b0c8_bg-landing-transcode.webm" />
          </video>
          
          {/* Text inside video frame */}
          <div className={styles.heroTextTop}>
            <AnimatedRichText
              className="heroSubtext"
              segments={[
                { text: "Hi, I'm ", color: "#ffffff", opacity: 1 },
                { text: "Russell", color: "#ffffff", opacity: 1, isStrong: true }
              ]}
              useFlickerEffect={false}
              fontSize="10rem"
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
              { text: 'A designer ', isStrong: true },
              { text: 'who builds, and a ' },
              { text: 'developer ', isStrong: true },
              { text: 'who thinks like a user. ' },
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
