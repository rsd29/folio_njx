'use client'

import Link from 'next/link'
import styles from './ProjectLayout.module.css'

export default function ProjectTwo() {
  return (
    <Link href="/projects/project-two" className={styles.projectLink}>
      <div className={styles.outerContainer}>
        <div className={styles.innerContainer} data-cursor="view-project">
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
                OMIS ERP System
              </div>
              <div style={{
                fontSize: '1rem',
                fontWeight: 400,
                fontFamily: 'var(--font-body)',
                letterSpacing: '0',
                lineHeight: 1.2,
                opacity: 0.85
              }}>
                Unified internal platform • Oriental Merchant • Multi-region rollout
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
