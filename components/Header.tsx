'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import styles from './Header.module.css'
import { Link2Icon } from '@radix-ui/react-icons'
const navItems = [
  { label: 'Projects', href: '/' },
  { label: 'About', href: '/about' },
]

const rightNavItems = [
  { label: 'Off the Clock', href: '/off-the-clock' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/russellsaw', external: true, isIcon: true },
  { label: 'Resume', href: '/rs-resume-q3-2025-v2.pdf', external: true, download: true },
]

export default function Header() {
  const pathname = usePathname()
  const navRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const [dotStyle, setDotStyle] = useState<{ left: number | null }>({ left: null })
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

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

  const getNavItemStyle = (itemHref: string) => {
    const isActive = pathname === itemHref
    const isHovered = hoveredItem === itemHref
    const baseColor = 'rgba(255, 255, 255, 0.65)'
    const baseWeight = 400
    const emphasisWeight = 500
    
    if (isActive) {
      return {
        color: '#ffffff',
        fontWeight: emphasisWeight,
        textShadow: '0 0 8px rgba(255, 255, 255, 0.6), 0 0 16px rgba(255, 255, 255, 0.4)',
        filter: 'brightness(1.2)',
        transition: 'all 0.2s ease'
      }
    }
    
    if (isHovered) {
      return {
        color: '#ffffff',
        fontWeight: emphasisWeight,
        filter: 'brightness(1.4)',
        transition: 'all 0.2s ease'
      }
    }
    
    return {
      color: baseColor,
      fontWeight: baseWeight,
      filter: 'none',
      opacity: 0.85,
      transition: 'all 0.2s ease'
    }
  }

  return (
    <header className={styles.headerBar}>
      <div className={styles.sideLeft}>
        <Link href="/" className={styles.logoDiv}>
          <Image src="/RSD.png" alt="Logo" width={40} height={40} className={styles.logo} />
        </Link>
        <div className={styles.logoDescDiv}>
          <span 
            className={styles.logoDesc}
          >
            Russell Saw
          </span>
          <span 
            className={styles.logoDescSub}
          >
            UX Designer / Front-End Dev
          </span>
        </div>
      </div>

      <div className={styles.headerWrapper}>
        <div className={styles.headerInner}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              scroll={item.href === '/' ? false : true}
              ref={(el) => {
                navRefs.current[item.href] = el
              }}
              className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
              style={getNavItemStyle(item.href)}
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
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
          item.external ? (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navItem}
              style={getNavItemStyle(item.href)}
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
              download={item.download}
              aria-label={item.label}
            >
              {item.isIcon ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ display: 'block' }}
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              ) : (
                <>
                  {item.label}
                  {item.download && <Link2Icon style={{ marginLeft: 4, verticalAlign: 'middle' }} />}
                </>
              )}
            </a>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
              style={getNavItemStyle(item.href)}
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.label}
            </Link>
          )
        )}
      </div>
    </header>
  )
}
