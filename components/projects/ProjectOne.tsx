'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from './ProjectLayout.module.css'

export default function ProjectOne() {
  return (
    <Link href="/projects/project-one" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className={styles.outerContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.innerContentDiv}>
            {/* Background Image */}
            <Image
              src="/case_study_1/cs1_productpage2.jpeg"
              alt="SalesIQ Product Page Interface"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                zIndex: 1
              }}
            />
            
            {/* Dark Overlay for better text readability */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)',
              zIndex: 2
            }} />
            
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
                opacity: 0.9
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
