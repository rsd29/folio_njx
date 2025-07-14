'use client'

import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logoColumn}>
                  <Link href="/" className={styles.logoDiv}>
          <img src="/RSD.png" alt="Logo" className={styles.logo} />
        </Link>     <nav className={styles.nav}>
          <Link href="/projects" className={styles.navLink}><span>Projects</span></Link>
          <Link href="/about" className={styles.navLink}><span>About</span></Link>
          <Link href="/contact" className={styles.navLink}><span>Contact</span></Link>
          <Link href="/off-the-clock" className={styles.navLink}><span>Off the Clock</span></Link>
        </nav>
        </div>
  

   

        <div className={styles.rights}>
          © {new Date().getFullYear()} Russell Saw Design
        </div>
      </div>
    </footer>
  )
}
