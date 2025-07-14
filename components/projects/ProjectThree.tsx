// components/projects/ProjectThree.tsx
import styles from './ProjectLayout.module.css'
export default function ProjectThree() {
   return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
                       <div className={styles.innerContentDiv}>
                                       <div className={styles.projectDesc}>Project Desc</div>
        <div className={styles.imagePlaceholder}>Project 3</div>
                       </div>

      </div>
    </div>
  )
}
