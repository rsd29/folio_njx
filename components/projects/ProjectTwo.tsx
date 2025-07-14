// components/projects/ProjectTwo.tsx
import styles from './ProjectLayout.module.css'
export default function ProjectTwo() {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
                       <div className={styles.innerContentDiv}>
                                       <div className={styles.projectDesc}>Project Desc</div>
        <div className={styles.imagePlaceholder}>Project 2</div>
                       </div>

      </div>
    </div>
  )
}
