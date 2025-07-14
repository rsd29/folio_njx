'use client'
import AnimatedNavItem from './AnimatedNavItem'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import styles from './Header.module.css'
import { div } from 'framer-motion/client'

const navItems = [
  { label: 'Projects', href: '/' },
  { label: 'About', href: '/about' }
 ,
]

export default function Header() {
  const pathname = usePathname()
  const navRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const [dotStyle, setDotStyle] = useState({ left: 0 })

useEffect(() => {
  const current = navRefs.current[pathname]
  if (current) {
    const rect = current.getBoundingClientRect()
    const parentRect = current.parentElement!.getBoundingClientRect()
    const center = rect.left - parentRect.left + rect.width / 2

    setDotStyle({
      left: center,
    })
  }
}, [pathname])

  return (

<header className={styles.headerBar}>
  <div className={styles.sideLeft}>

<Link href="/" className={styles.logoDiv}>
  <img src="/RSD.png" alt="Logo" className={styles.logo}/>
</Link>

    <div className={styles.logoDescDiv}><span className={styles.logoDesc}>Russell Saw</span><span className={styles.logoDescSub}>UX Designer / Front-End Dev</span>
      </div>
  </div>

  <div className={styles.headerWrapper}>
    <div className={styles.headerInner}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          ref={(el) => {
            navRefs.current[item.href] = el
          }}
          className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
        >
          {item.label}
        </Link>
      ))}
      <span className={styles.dot} style={{ left: dotStyle.left }} />
    </div>
  </div>

<div className={styles.sideRight}>
  <AnimatedNavItem href="/contact" label="Contact" className={styles.navItem} />
  <AnimatedNavItem href="/resume" label="Resume" className={styles.navItem} />
  <AnimatedNavItem href="/off-the-clock" label="Off the Clock" className={styles.navItem} />
</div>
</header>

  )
}
