'use client'

// import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { ArrowDownIcon, DownloadIcon } from '@radix-ui/react-icons'
import styles from './home.module.css'
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
            <span className={styles.heroSignatureName}>Russell Saw </span>
            <span className={styles.heroSignatureDivider} />
            <div className={styles.heroSignatureRoleWrapper}>
            <span className={styles.heroSignatureRole}>UI \ UX</span>
            <span className={styles.heroSignatureRole2}>Designer</span>
            </div>

          </div>
        </div>

        <div className={styles.heroContentWrapper}>
        <div className={styles.heroContent}>
          <div className={styles.heroPrimary}>

            <div className={styles.heroLeadGroup}>
            <p className={`${styles.heroLead} ${styles.heroLeadLine}`} style={{ animationDelay: '0.1s' }}>
  I craft experiences that feel effortless for users and scalable for teams.
</p>
            <p className={`${styles.heroLead} ${styles.heroLeadLine2}`} style={{ animationDelay: '0.25s' }}>
  Currently a enterprise UX designer at Oriental Merchant, blending design and code to shape meaningful business outcomes.
</p>

     
              <div className={`${styles.heroLeadMeta} ${styles.heroLeadLine}`} style={{ animationDelay: '0.45s' }}>
       
              </div>
            </div>

            {/* <div className={styles.heroTicker}>
              <span className={styles.heroTickerText}>Based in Melbourne — {displayed}</span>
              <button type="button" className={styles.heroTickerButton} onClick={loadNewTagline}>
                Shuffle line
              </button>
            </div> */}
            <div className={styles.heroActions}>
              <Link href="#case-studies" scroll className={styles.heroButtonPrimary}>
                View case studies
                <ArrowDownIcon className={styles.heroButtonIcon} />
              </Link>
              <a
                href="/rs-resume-q3-2025-v2.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroButtonSecondary}
              >
                Download resume
                <DownloadIcon className={styles.heroButtonIcon} />
              </a>
              <div className={styles.heroAvailabilityPill}>
  Open to new opportunities (always)
  <span className={styles.availabilityIndicator}></span>
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
