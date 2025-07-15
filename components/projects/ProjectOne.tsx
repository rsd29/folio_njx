import styles from './ProjectLayout.module.css'
import { HTMLAttributes } from 'react'



export default function ProjectOne() {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.innerContentDiv}>
          <div className={styles.projectDesc}>Project Desc</div>
          <div className={styles.imagePlaceholder}>Project 1</div>
        </div>
      </div>
    </div>
  )
}
