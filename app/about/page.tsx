import AnimatedRichText from '../../components/AnimatedRichText'
import ScrollRevealText from '../../components/ScrollRevealText'

export default function Page() {
  return (
    <main style={{ maxWidth: '100%', minHeight: '100vh', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Hero Section */}
      <section style={{ 
        padding: '100px 10%', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'flex-start', 
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'left'
      }}>
        


        <div style={{
          fontFamily: 'var(--font-body)',
          maxWidth: '1200px',
          marginBottom: '60px',
          paddingTop: '100px',
          paddingBottom: '100px'
        }}>
          <AnimatedRichText
            className="heroSubtext"
            segments={[
              { text: 'I turn complex business problems into ' },
              { text: 'simple interfaces', isStrong: true },
              { text: ' people actually want to use.' }
            ]}
            useFlickerEffect={false}
            fontSize="3rem"
            fontWeight={300}
            lineHeight={1}
            letterSpacing="-0.01em"
          />
        </div>

        <div style={{
          fontFamily: 'var(--font-body)',
          maxWidth: '600px',
          marginBottom: '80px'
        }}>
          <AnimatedRichText
            className="heroSubtext"
            segments={[
              { text: 'Based in Melbourne.', color: '#808080', opacity: 1 }
            ]}
            useFlickerEffect={false}
            fontSize="1.5rem"
            fontWeight={300}
            lineHeight={1.6}
          />
        </div>

        {/* Separator Line */}
        <div style={{
          width: '100%',
          height: '1px',
          backgroundColor: '#333',
          margin: '80px 0',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '-1px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '200px',
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, #555 50%, transparent 100%)',
            borderRadius: '2px'
          }} />
        </div>

        {/* Scrollable Gallery Section */}
        <div className="gallery-section" style={{
          width: '100%',
          marginBottom: '120px',
          marginTop: '120px',
          minHeight: '1400px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1.8fr 1.2fr',
          gap: '80px',
          alignItems: 'start'
        }}>
          {/* Left Column - Staggered Frames */}
          <div className="gallery-left" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '120px',
            transform: 'translateY(-60px)'
          }}>
            {/* Frame 1 */}
            <div className="gallery-frame" style={{
              width: '100%',
              aspectRatio: '3/4',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
              borderRadius: '16px',
              border: '1px solid #333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem',
              color: '#888',
              fontFamily: 'var(--font-body)',
              boxShadow: '0 20px 40px rgba rgba(0, 0, 0, 0.3)',
              position: 'relative'
            }}>
              <span>Portrait Image</span>
            </div>
            
            <p style={{
              fontSize: '1rem',
              color: '#666',
              fontFamily: 'var(--font-body)',
              lineHeight: '1.4',
              margin: '0',
              paddingTop: '20px'
            }}>
              Early design exploration sketches
            </p>
            
            {/* Frame 3 */}
            <div className="gallery-frame" style={{
              width: '100%',
              aspectRatio: '3/4',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
              borderRadius: '16px',
              border: '1px solid #333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem',
              color: '#888',
              fontFamily: 'var(--font-body)',
              boxShadow: '0 20px 40px rgba rgba(0, 0, 0, 0.3)',
              marginTop: '60px'
            }}>
              <span>Portrait Image</span>
            </div>
            
            <p style={{
              fontSize: '1rem',
              color: '#666',
              fontFamily: 'var(--font-body)',
              lineHeight: '1.4',
              margin: '0',
              paddingTop: '20px'
            }}>
              Client collaboration session
            </p>
          </div>

          {/* Center Column - Story Text */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            transform: 'translateY(-60px)'
          }}>
            <div className="story-text" style={{
              maxWidth: '650px',
              fontSize: '1.3rem',
              lineHeight: '1.8',
              fontFamily: 'var(--font-body)',
              color: 'var(--foreground)',
              textAlign: 'left'
            }}>
              <p style={{ marginBottom: '50px' }}>
                My journey began with curiosity—about how things work, why they&apos;re built the way they are, 
                and how design can make technology feel human. Today, I bridge the gap between complex 
                business problems and elegant user experiences.
              </p>
              
              <p style={{ marginBottom: '50px' }}>
                At Oriental Merchant, I lead UX/UI design across enterprise platforms, transforming 
                intricate workflows into intuitive interfaces. My approach combines deep user empathy 
                with strategic thinking, ensuring every design decision serves both user needs and 
                business objectives.
              </p>

              <p style={{ marginBottom: '50px' }}>
                Before diving into enterprise design, I spent years exploring the intersection of 
                art and technology. This background gives me a unique perspective on creating 
                interfaces that don&apos;t just function—they communicate, delight, and guide users 
                effortlessly through complex digital landscapes.
              </p>
              
              <p style={{ marginBottom: '50px' }}>
                I&apos;m passionate about design systems that scale, accessibility that&apos;s 
                built-in rather than bolted-on, and user research that drives real change. Whether 
                working with stakeholders on requirement gathering or collaborating with developers 
                on implementation, I believe the best solutions emerge from diverse perspectives 
                working toward common goals.
              </p>
              
              <p style={{ marginBottom: '0' }}>
                Whether sketching in Figma or prototyping in code, I believe great design happens 
                at the intersection of craft and strategy. The result? Interfaces people actually 
                want to use, not just tolerate.
              </p>
            </div>
          </div>

          {/* Right Column - Staggered Frames */}
          <div className="gallery-right" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '120px',
            transform: 'translateY(60px)'
          }}>
            {/* Frame 2 */}
            <div className="gallery-frame" style={{
              width: '100%',
              aspectRatio: '3/4',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
              borderRadius: '16px',
              border: '1px solid #333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem',
              color: '#888',
              fontFamily: 'var(--font-body)',
              boxShadow: '0 20px 40px rgba rgba(0, 0, 0, 0.3)',
              marginTop: '40px'
            }}>
              <span>Portrait Image</span>
            </div>
            
            <p style={{
              fontSize: '1rem',
              color: '#666',
              fontFamily: 'var(--font-body)',
              lineHeight: '1.4',
              margin: '0',
              paddingTop: '20px'
            }}>
              Melbourne workspace vibes
            </p>
            
            {/* Frame 4 */}
            <div className="gallery-frame" style={{
              width: '100%',
              aspectRatio: '3/4',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
              borderRadius: '16px',
              border: '1px solid #333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem',
              color: '#888',
              fontFamily: 'var(--font-body)',
              boxShadow: '0 20px 40px rgba rgba(0, 0, 0, 0.3)',
              marginTop: '20px'
            }}>
              <span>Portrait Image</span>
            </div>
            
            <p style={{
              fontSize: '1rem',
              color: '#666',
              fontFamily: 'var(--font-body)',
              lineHeight: '1.4',
              margin: '0',
              paddingTop: '20px'
            }}>
              Design thinking process
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section style={{ 
        padding: '120px 10%',
        backgroundColor: '#111111'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            marginBottom: '60px',
            color: 'var(--foreground)'
          }}>
            <ScrollRevealText
              text="My Story"
              fontSize="3.5rem"
              fontWeight={300}
              lineHeight={1.2}
              letterSpacing="-0.01em"
              className="scrollRevealText"
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            {/* Image Placeholder */}
            <div style={{
              width: '100%',
              height: '400px',
              backgroundColor: '#2a2a2a',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              color: '#666',
              fontFamily: 'var(--font-body)',
              border: '2px dashed #444'
            }}>
              Story Image Placeholder
            </div>
            
            {/* Content */}
            <div>
              <h3 style={{
                fontSize: '2.5rem',
                fontWeight: 300,
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                fontFamily: 'var(--font-body)',
                marginBottom: '30px',
                color: 'var(--foreground)'
              }}>
                Year 5 of UX
              </h3>
              <p style={{
                fontSize: '1.2rem',
                fontWeight: 300,
                lineHeight: 1.6,
                color: '#ccc',
                marginBottom: '20px'
              }}>
                Currently leading ux/ui design across enterprise platforms at Oriental Merchant. 
                I believe great design happens at the intersection of user needs and business goals.
              </p>
              <p style={{
                fontSize: '1.2rem',
                fontWeight: 300,
                lineHeight: 1.6,
                color: '#ccc'
              }}>
                From wireframes to production code, I bridge the gap between design and development 
                to create experiences that are both beautiful and functional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ 
        padding: '120px 10%',
        backgroundColor: 'var(--background)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            marginBottom: '80px',
            color: 'var(--foreground)'
          }}>
            <ScrollRevealText
              text="What I Believe"
              fontSize="3.5rem"
              fontWeight={300}
              lineHeight={1.2}
              letterSpacing="-0.01em"
              className="scrollRevealText"
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '60px' }}>
            {/* Statement Cards */}
            {[
              {
                title: 'User-Centered',
                statement: 'Every decision starts with understanding the human behind the screen.',
                detail: 'I conduct user research, create personas, and validate assumptions through testing.'
              },
              {
                title: 'Data-Driven',
                statement: 'Design should be informed by both qualitative insights and quantitative metrics.',
                detail: 'I analyze user behavior patterns and iterate based on real performance data.'
              },
              {
                title: 'Technical Excellence',
                statement: 'Great design requires understanding the constraints and possibilities of code.',
                detail: 'I advocate for design decisions that are both beautiful and implementable.'
              }
            ].map((item, index) => (
              <div key={index} style={{
                padding: '40px',
                borderRadius: '20px',
                backgroundColor: '#111111',
                border: '1px solid #333'
              }}>
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: 400,
                  lineHeight: 1.2,
                  fontFamily: 'var(--font-heading)',
                  marginBottom: '20px',
                  color: 'var(--foreground)'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '1.2rem',
                  fontWeight: 300,
                  lineHeight: 1.4,
                  color: '#ccc',
                  marginBottom: '16px'
                }}>
                  {item.statement}
                </p>
                <p style={{
                  fontSize: '1rem',
                  fontWeight: 300,
                  lineHeight: 1.5,
                  color: '#888'
                }}>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section style={{ 
        padding: '120px 10%',
        backgroundColor: '#111111'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3.5rem',
            fontWeight: 300,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            fontFamily: 'var(--font-heading)',
            marginBottom: '60px',
            color: 'var(--foreground)',
            textAlign: 'center'
          }}>
            Tools & Skills
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            {/* Skills Content */}
            <div>
              <h3 style={{
                fontSize: '2.5rem',
                fontWeight: 300,
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                fontFamily: 'var(--font-body)',
                marginBottom: '40px',
                color: 'var(--foreground)'
              }}>
                Design + Development
              </h3>
              
              <div style={{ marginBottom: '40px' }}>
                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: 400,
                  marginBottom: '15px',
                  color: 'var(--foreground)',
                  fontFamily: 'var(--font-body)'
                }}>
                  Design Tools
                </h4>
                <p style={{
                  fontSize: '1.1rem',
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: '#ccc',
                  fontFamily: 'var(--font-body)'
                }}>
                  Figma, Sketch, Adobe Creative Suite, Principle, InVision
                </p>
              </div>
              
              <div>
                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: 400,
                  marginBottom: '15px',
                  color: 'var(--foreground)',
                  fontFamily: 'var(--font-body)'
                }}>
                  Development
                </h4>
                <p style={{
                  fontSize: '1.1rem',
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: '#ccc',
                  fontFamily: 'var(--font-body)'
                }}>
                  React, Next.js, TypeScript, CSS/SASS, Framer Motion, Three.js
                </p>
              </div>
            </div>
            
            {/* Skills Image Placeholder */}
            <div style={{
              width: '100%',
              height: '400px',
              backgroundColor: '#2a2a2a',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              color: '#666',
              fontFamily: 'var(--font-body)',
              border: '2px dashed #444'
            }}>
              Skills Visualization Placeholder
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{ 
        padding: '120px 10%',
        backgroundColor: 'var(--background)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '3.5rem',
            fontWeight: 300,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            fontFamily: 'var(--font-heading)',
            marginBottom: '40px',
            color: 'var(--foreground)'
          }}>
            Let&apos;s Collaborate
          </h2>
          
          <p style={{
            fontSize: '1.5rem',
            fontWeight: 300,
            lineHeight: 1.6,
            color: '#ccc',
            marginBottom: '60px'
          }}>
            Drop us a line →
          </p>
          
          {/* Image Placeholder */}
          <div style={{
            width: '100%',
            height: '300px',
            backgroundColor: '#2a2a2a',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            color: '#666',
            fontFamily: 'var(--font-body)',
            border: '2px dashed #444',
            marginBottom: '80px'
          }}>
            Collaborative Work Image Placeholder
          </div>
        </div>
      </section>
    </main>
  )
}
