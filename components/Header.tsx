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
  const [isOverVideo, setIsOverVideo] = useState(true)
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

  // Simple scroll detection for Russell Saw text color
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const videoHeight = window.innerHeight * 0.5 // 50vh - video height
      
      // When scrolled past video, change text color
      setIsOverVideo(scrollY < videoHeight)
    }

    // On non-home pages, always use light theme
    if (pathname !== '/') {
      setIsOverVideo(false)
      return
    }

    handleScroll() // Initial check
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  // Helper function to get nav item styles
  const getNavItemStyle = (itemHref: string) => {
    const isHovered = hoveredItem === itemHref
    const baseColor = isOverVideo ? '#333333' : '#808080'
    
    if (isHovered) {
      return {
        color: isOverVideo ? '#000000' : '#ffffff',
        fontWeight: 400,
        filter: 'brightness(1.4)',
        transition: 'all 0.2s ease'
      }
    }
    
    return {
      color: baseColor,
      fontWeight: 200,
      filter: 'brightness(1)',
      transition: 'all 0.2s ease'
    }
  }

  return (
    <header className={styles.headerBar}>
      <div className={styles.sideLeft}>
        <Link href="/" className={styles.logoDiv}>
          <img src="/RSD.png" alt="Logo" className={styles.logo} />
        </Link>
        <div className={styles.logoDescDiv}>
          <span 
            className={styles.logoDesc}
            style={{ color: isOverVideo ? '#000000' : '#ffffff' }}
          >
            Russell Saw
          </span>
          <span 
            className={styles.logoDescSub}
            style={{ color: isOverVideo ? '#333333' : '#cccccc' }}
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
          item.label === 'Resume' ? (
            <a
              key={item.href}
              href={item.href}
              download
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navItem}
              style={getNavItemStyle(item.href)}
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.label} <Link2Icon style={{ marginLeft: 4, verticalAlign: 'middle' }} />
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
