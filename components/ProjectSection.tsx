import ProjectOne from './projects/ProjectOne'
import ProjectTwo from './projects/ProjectTwo'
import ProjectThree from './projects/ProjectThree'
import styles from './ProjectSection.module.css'

export default function ProjectsSection() {
  return (
    <section style={{ width: '100%', gap: 120, display: 'flex', flexDirection: 'column', padding: '150px 20px'}}>
      <div className={styles.projectsHeader}>
        <h2 className={styles.projectsTitle}>Projects</h2>
      </div>
      <ProjectOne />
      <ProjectTwo  />
      <ProjectThree  />
    </section>
  )
}
