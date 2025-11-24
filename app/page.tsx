'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import styles from './home.module.css'
import AnimatedRichText from '../components/AnimatedRichText'
import ScrollRevealText from '../components/ScrollRevealText'
import ProjectsSection from '../components/ProjectSection'

const taglines = [
  "live from a shoebox that costs $800 a week.",
  "where house prices rise faster than frontend frameworks.",
  "currently battling three types of weather and two kinds of impostor syndrome.",
  "broadcasting from a laneway you've probably never heard of.",
  "still saving for a place with natural light.",
  "where the rent is high but brunch is higher.",
  "where even the pigeons have a side hustle.",
  "still debugging life and code.",
  "home of coffee snobs and CSS bugs.",
  "where freelancers are born and slowly caffeinated to death.",
  "live from the world's most livable city (unless you're poor).",
]

export default function HomePage() {
  const [displayed, setDisplayed] = useState('')
  const [fullTagline, setFullTagline] = useState('')
  const [charIndex, setCharIndex] = useState(0)
  const fullTaglineRef = useRef(fullTagline)

  useEffect(() => {
    fullTaglineRef.current = fullTagline
  }, [fullTagline])

  useEffect(() => {
    if (charIndex < fullTagline.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + fullTagline[charIndex])
        setCharIndex((prev) => prev + 1)
      }, 20)
      return () => clearTimeout(timeout)
    }
  }, [charIndex, fullTagline])

  const loadNewTagline = useCallback(() => {
    let newLine = ''
    do {
      newLine = taglines[Math.floor(Math.random() * taglines.length)]
    } while (newLine === fullTaglineRef.current)

    setFullTagline(newLine)
    setDisplayed('')
    setCharIndex(0)
  }, [])

  useEffect(() => {
    loadNewTagline()
  }, [loadNewTagline])

  return (
    <main style={{ maxWidth: '100%' }}>
      <section className={`${styles.fullWidthSection} ${styles.heroSection}`}>
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
        </div>

        <div className={styles.heroSignatureWrapper}>
          <div className={styles.heroSignature}>
            <span className={styles.heroSignatureName}>Russell Saw</span>
            <span className={styles.heroSignatureDivider} />
            <span className={styles.heroSignatureRole}>UX</span>
          </div>
        </div>

        <div className={styles.heroContentWrapper}>
        <div className={styles.heroContent}>
          <div className={styles.heroPrimary}>

            <AnimatedRichText
              className={styles.heroLead}
              segments={[
                { text: 'Designing calm, credible product experiences ' },
                { text: 'for teams that can’t afford to break things.', isStrong: true }
              ]}
              useFlickerEffect={false}
              fontSize="clamp(2.2rem, 4vw, 3.5rem)"
              fontWeight={400}
              lineHeight={1.1}
              letterSpacing="-0.02em"
            />
            <p className={styles.heroDescription}>
              I lead UX and front-end delivery for enterprise platforms—translating messy requirements into systems,
              rituals, and UI that feel intentional, premium, and scalable.
            </p>
            <div className={styles.heroTagList}>
              {['Enterprise UX', 'Design Systems', 'Frontend Dev', 'Research Ops'].map((tag) => (
                <span key={tag} className={styles.heroTag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className={styles.heroTicker}>
              <span className={styles.heroTickerText}>Based in Melbourne — {displayed}</span>
              <button type="button" className={styles.heroTickerButton} onClick={loadNewTagline}>
                Shuffle line
              </button>
            </div>
            <div className={styles.heroActions}>
              <Link href="/projects/project-one" className={styles.heroButtonPrimary}>
                View case studies
              </Link>
              <a
                href="/rs-resume-q3-2025-v2.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroButtonSecondary}
              >
                Download resume
              </a>
            </div>
          </div>
        </div>

        <div className={styles.heroGlowRail} />
        </div>
      </section>

      {/* Animated Text Section */}
      <section className={styles.animatedTextSection}>
        <div className={styles.animatedTextContainer}>
          <div className={styles.contentGrid}>
            <div className={styles.mainTitle}>
            <ScrollRevealText
              text="Year 5 of UX."
              fontSize="var(--font-display)"
              fontWeight={400}
              lineHeight={1.1}
              letterSpacing="var(--letter-spacing-tight)"
              className="scrollRevealText"
            />
              <div className={styles.disclaimer}>
                Currently seeking new opportunities.
                <span className={styles.availabilityIndicator}></span>
              </div>
            </div>
            <div className={styles.descriptionBlock}>
              <div className={styles.roleLabel}>Current Role</div>
              <ScrollRevealText
                text="Leading product design across enterprise platforms at Oriental Merchant, while building front-end experiences."
                fontSize="var(--font-heading-m)"
                fontWeight={400}
                lineHeight={1.4}
                letterSpacing="var(--letter-spacing-normal)"
                className="scrollRevealText"
              />
            </div>
          </div>
        </div>
      </section>

      <ProjectsSection />
    </main>
  )
}
