'use client'

import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.leftSection}>
          <Link href="/" className={styles.logoDiv}>
            <img src="/RSD.png" alt="Logo" className={styles.logo} />
          </Link>
          <div className={styles.brandInfo}>
            <h3 className={styles.brandName}>Russell Saw Design</h3>
            <p className={styles.brandTagline}>UX Designer & Developer</p>
          </div>
        </div>

        <div className={styles.centerSection}>
          <nav className={styles.nav}>
            <Link href="/projects" className={styles.navLink}>
              <span>Projects</span>
            </Link>
            <Link href="/about" className={styles.navLink}>
              <span>About</span>
            </Link>
            <Link href="/contact" className={styles.navLink}>
              <span>Contact</span>
            </Link>
            <Link href="/off-the-clock" className={styles.navLink}>
              <span>Off the Clock</span>
            </Link>
          </nav>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.socialLinks}>
            <a href="mailto:hello@russellsaw.design" className={styles.socialLink}>
              Email
            </a>
            <a href="https://linkedin.com/in/russellsaw" className={styles.socialLink}>
              LinkedIn
            </a>
          </div>
          <div className={styles.rights}>
            Copyright Russell Saw Designs 2025 ©
          </div>
        </div>
      </div>
    </footer>
  )
}
