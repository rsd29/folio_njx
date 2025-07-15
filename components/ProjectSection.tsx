import ProjectOne from './projects/ProjectOne'
import ProjectTwo from './projects/ProjectTwo'
import ProjectThree from './projects/ProjectThree'

export default function ProjectsSection() {
  return (
    <section style={{ width: '100%', gap: 50, display: 'flex', flexDirection: 'column', paddingBottom: 150, paddingTop: 150}}>
      <ProjectOne />
      <ProjectTwo  />
      <ProjectThree  />
    </section>
  )
}
