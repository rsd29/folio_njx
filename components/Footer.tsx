'use client'

import Image from 'next/image'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import TransitionLink from './TransitionLink'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  const handleEmailMe = () => {
    if (typeof window === 'undefined') return
    window.dispatchEvent(new CustomEvent('footer-cta:open'))
  }

  const handleBackToTop = () => {
    const smoother = ScrollSmoother.get()
    if (smoother) {
      smoother.scrollTo(0, true)
      return
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topSection}>
          <div className={styles.brandBlock}>
            <TransitionLink href="/" className={styles.logoDiv} aria-label="Go to home">
              <Image src="/logo.png" alt="" width={58} height={58} className={styles.logo} />
            </TransitionLink>
            <div className={styles.brandInfo}>
              <h3 className={styles.brandName}>Russell Saw</h3>
              <p className={styles.brandTagline}>UX Designer / Front-End Dev</p>
              <p className={styles.brandBlurb}>
                Designing enterprise-grade UX, then jumping into code to make it feel real.
              </p>
            </div>
          </div>

          <div className={styles.columns}>
            <div className={styles.column}>
              <div className={styles.columnTitle}>Explore</div>
              <nav className={styles.links} aria-label="Footer navigation">
                <TransitionLink href="/" className={styles.link}>
                  Projects
                </TransitionLink>
                <TransitionLink href="/about" className={styles.link}>
                  About
                </TransitionLink>
                <TransitionLink href="/off-the-clock" className={styles.link}>
                  Off the Clock
                </TransitionLink>
              </nav>
            </div>

            <div className={styles.column}>
              <div className={styles.columnTitle}>Contact</div>
              <div className={styles.links}>
                <button type="button" className={styles.linkButton} onClick={handleEmailMe}>
                  Email Me
                </button>
                <a
                  className={styles.link}
                  href="https://www.linkedin.com/in/russellsawux/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a className={styles.link} href="/rs-resume-q3-2025-v2.pdf" target="_blank" rel="noopener noreferrer">
                  Resume (PDF)
                </a>
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.columnTitle}>If you're wondering..</div>
              <div className={styles.metaList}>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Built with</span>
                  <span className={styles.metaValue}>Next.js + GSAP</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Hosted on</span>
                  <span className={styles.metaValue}>Vercel</span>
                </div>
                <button type="button" className={styles.toTopButton} onClick={handleBackToTop}>
                  Back to top
                  <span className={styles.toTopArrow} aria-hidden="true">
                    ↑
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.bottomLeft}>© {year} Russell Saw</div>
          <div className={styles.bottomRight}>
            <span className={styles.bottomNote}>Thanks for stopping by.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
