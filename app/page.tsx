import styles from './home.module.css';
import AnimatedRichText from '../components/AnimatedRichText'
import ProjectsSection from '../components/ProjectSection'

export default function HomePage() {
  return (
    <main style={{ maxWidth: '100%' }}>
      {/* Hero Section */}

<section className={`${styles.fullWidthSection} ${styles.heroSection}`}>
<AnimatedRichText 
  className="heroTitle"
  segments={[{ text: 'Russell Saw' }]}
  fontSize="10rem"
  fontWeight={300}
  lineHeight={1}
  maxWidth="100%"
  useFlickerEffect={false}
/>

<AnimatedRichText
  className="heroSubtext"
  segments={[
    { text: 'I’m a ' },
    { text: 'designer', isStrong: true },
    { text: ' who builds, and a ' },
    { text: 'developer', isStrong: true },
    { text: ' who thinks like a user.' },
 
  ]}
  useFlickerEffect={false}
  fontSize="2rem"
  fontWeight={300}
/>

<h3 className='heroSubtext2'>UX Designer. Based in Melbourne.</h3>

</section>

      {/* Featured Projects Placeholder */}
      <ProjectsSection />

      {/* Call-to-Action */}
      <section className={styles.fullWidthSection}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '12px' }}>More About Me</h2>
        <p style={{ fontSize: '16px', maxWidth: '600px' }}>
          Outside of work, I explore ideas through writing, design experiments, and side projects.
        </p>
      </section>
    </main>
  )
}
