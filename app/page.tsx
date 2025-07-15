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
  segments={[{ text: 'Human-Centered' }]}
  fontSize="5rem"
  fontWeight={500}
  lineHeight={.9}
  maxWidth="100%"
  useFlickerEffect={false}
/>
<AnimatedRichText 
  className="heroTitle"
  segments={[{ text: 'System-Minded' }]}
  fontSize="5rem"
  fontWeight={500}
  lineHeight={.9}
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
    { text: ' who thinks like a user' },
 
  ]}
  useFlickerEffect={false}
  fontSize="2rem"
  fontWeight={300}
/>


<h3 className='heroSubtext2'>UX Designer based in Melbourne</h3>

</section>


      <ProjectsSection />


    </main>
  )
}
