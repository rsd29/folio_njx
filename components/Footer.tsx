'use client'

import TransitionLink from './TransitionLink'
import Image from 'next/image'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topSection}>
          <div className={styles.leftGroup}>
            <TransitionLink href="/" className={styles.logoDiv}>
              <Image src="/RSD.png" alt="Logo" width={35} height={35} className={styles.logo} />
            </TransitionLink>
            <div className={styles.brandInfo}>
              <h3 className={styles.brandName}>Russell Saw</h3>
              <p className={styles.brandTagline}>UX Designer / Front-End Dev</p>
            </div>
          </div>

          <nav className={styles.nav}>
            <TransitionLink href="/" className={styles.navLink}>Projects</TransitionLink>
            <TransitionLink href="/about" className={styles.navLink}>About</TransitionLink>
            <a
              href="https://linkedin.com/in/russellsaw"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navLink}
            >
              LinkedIn
            </a>
            <TransitionLink href="/off-the-clock" className={styles.navLink}>Off the Clock</TransitionLink>
          </nav>

          <div className={styles.socialLinks}>
            <a href="mailto:hello@russellsaw.design" className={styles.socialLink}>
              Email
            </a>
            <a href="https://linkedin.com/in/russellsaw" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              LinkedIn
            </a>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            © 2025 Russell Saw Design UX Portfolio
          </div>
        </div>
      </div>
    </footer>
  )
}
