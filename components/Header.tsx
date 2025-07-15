'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import styles from './Header.module.css'
import { Link2Icon } from '@radix-ui/react-icons'


const navItems = [
  { label: 'Projects', href: '/' },
  { label: 'About', href: '/about' },
]

const rightNavItems = [
  { label: 'LinkedIn', href: '/contact' },
  { label: 'Off the Clock', href: '/off-the-clock' },
  { label: 'Resume', href: '/rs-resume-q3-2025-v2.pdf' }, // Direct path to file
]

export default function Header() {
  const pathname = usePathname()
  const navRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const [dotStyle, setDotStyle] = useState<{ left: number | null }>({ left: null })

  useEffect(() => {
    const current = navRefs.current[pathname]
    if (current) {
      const rect = current.getBoundingClientRect()
      const parentRect = current.parentElement!.getBoundingClientRect()
      const center = rect.left - parentRect.left + rect.width / 2
      setDotStyle({ left: center })
    } else {
      setDotStyle({ left: null })
    }
  }, [pathname])

  return (
    <header className={styles.headerBar}>
      <div className={styles.sideLeft}>
        <Link href="/" className={styles.logoDiv}>
          <img src="/RSD.png" alt="Logo" className={styles.logo} />
        </Link>
        <div className={styles.logoDescDiv}>
          <span className={styles.logoDesc}>Russell Saw</span>
          <span className={styles.logoDescSub}>UX Designer / Front-End Dev</span>
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
          {dotStyle.left !== null && (
            <span className={styles.dot} style={{ left: dotStyle.left }} />
          )}
        </div>
      </div>

      <div className={styles.sideRight}>
        {rightNavItems.map((item) =>
          item.label === 'Resume' ? (
            <a
              key={item.href}
              href={item.href}
              download
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navItem}
            >
              {item.label} <Link2Icon style={{ marginLeft: 4, verticalAlign: 'middle' }} />
            </a>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
            >
              {item.label}
            </Link>
          )
        )}
      </div>
    </header>
  )
}
