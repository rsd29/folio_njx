'use client'

import Link from 'next/link'
import styles from './ProjectLayout.module.css'

export default function ProjectTwo() {
  return (
    <Link href="/projects/project-two" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className={styles.outerContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.innerContentDiv}>
            {/* Text Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              zIndex: 3,
              color: '#ffffff'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 600,
                fontFamily: 'var(--font-heading)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: '8px'
              }}>
                Fitness Tracker Mobile App
              </div>
              <div style={{
                fontSize: '1rem',
                fontWeight: 400,
                fontFamily: 'var(--font-body)',
                letterSpacing: '0',
                lineHeight: 1.2,
                opacity: 0.7
              }}>
                Mobile UX Design • 2024
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
