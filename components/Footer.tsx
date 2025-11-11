'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topSection}>
          <div className={styles.leftGroup}>
            <Link href="/" className={styles.logoDiv}>
              <Image src="/RSD.png" alt="Logo" width={35} height={35} className={styles.logo} />
            </Link>
            <div className={styles.brandInfo}>
              <h3 className={styles.brandName}>Russell Saw</h3>
              <p className={styles.brandTagline}>UX Designer / Front-End Dev</p>
            </div>
          </div>

          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>Projects</Link>
            <Link href="/about" className={styles.navLink}>About</Link>
            <Link href="/contact" className={styles.navLink}>Contact</Link>
            <Link href="/off-the-clock" className={styles.navLink}>Off the Clock</Link>
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
            © 2025 Russell Saw Design
          </div>
        </div>
      </div>
    </footer>
  )
}
