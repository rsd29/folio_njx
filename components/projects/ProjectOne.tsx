import styles from './ProjectLayout.module.css'

export default function ProjectOne() {
  return (
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
              fontWeight: 400,
              fontFamily: 'Funnel Sans, sans-serif',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '8px'
            }}>
              Project Alpha
            </div>
            <div style={{
              fontSize: '1rem',
              fontWeight: 300,
              fontFamily: 'Funnel Sans, sans-serif',
              letterSpacing: '0',
              lineHeight: 1.2,
              opacity: 0.7
            }}>
              Enterprise UX Design
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
