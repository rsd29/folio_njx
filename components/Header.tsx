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
  { label: 'LinkedIn', href: '/contact' },
  { label: 'Off the Clock', href: '/off-the-clock' },
  { label: 'Resume', href: '/rs-resume-q3-2025-v2.pdf' },
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const videoHeight = window.innerHeight * 0.5
      
      setIsOverVideo(scrollY < videoHeight)
    }

    if (pathname !== '/') {
      setIsOverVideo(false)
      return
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const getNavItemStyle = (itemHref: string) => {
    const isActive = pathname === itemHref
    const isHovered = hoveredItem === itemHref
    const baseColor = isOverVideo ? '#333333' : '#808080'
    
    if (isActive) {
      return {
        color: isOverVideo ? '#000000' : '#ffffff',
        fontWeight: 400,
        textShadow: isOverVideo 
          ? '0 0 8px rgba(0, 0, 0, 0.5), 0 0 16px rgba(0, 0, 0, 0.3)' 
          : '0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.5), 0 0 24px rgba(255, 255, 255, 0.3)',
        filter: 'brightness(1.2)',
        transition: 'all 0.2s ease'
      }
    }
    
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
          <Image src="/RSD.png" alt="Logo" width={40} height={40} className={styles.logo} />
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
