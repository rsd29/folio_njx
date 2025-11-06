'use client'

import Link from 'next/link'
import styles from './ProjectLayout.module.css'

export default function ProjectOne() {
  return (
    <Link href="/projects/project-one" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className={styles.outerContainer}>
        <div className={styles.innerContainer} data-cursor-text="View Project">
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
                fontWeight: 400,
                fontFamily: 'Funnel Sans, sans-serif',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: '8px'
              }}>
                SalesIQ B2B Ordering Platform
              </div>
              <div style={{
                fontSize: '1rem',
                fontWeight: 300,
                fontFamily: 'Funnel Sans, sans-serif',
                letterSpacing: '0',
                lineHeight: 1.2,
                opacity: 0.7
              }}>
                UX Design • Oriental Merchant • 2023-2024
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
