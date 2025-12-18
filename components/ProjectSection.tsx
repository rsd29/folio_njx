import ProjectOne from './projects/ProjectOne'
import ProjectTwo from './projects/ProjectTwo'
import styles from './ProjectSection.module.css'

export default function ProjectsSection() {
  return (
    <section
      id="case-studies"
      style={{
        width: '100%',
        gap: 120,
        display: 'flex',
        flexDirection: 'column',
        // Reduce the post-hero gap: smaller top padding, keep roomy bottom padding.
        padding: '24px 20px 150px',
      }}
    >
      <div className={styles.projectsHeader}>
        <h2 className={styles.projectsTitle}>Projects</h2>
        <p className={styles.projectsIntro}>
        Designing and building enterprise products that work beautifully for users, teams, and the bottom line.
        Here are some of my projects from my time at Oriental Merchant.
        </p>
      </div>
      <ProjectOne />
      <ProjectTwo  />
    </section>
  )
}
