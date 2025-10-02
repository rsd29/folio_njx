'use client'

import AnimatedRichText from '../../components/AnimatedRichText'
import ScrollRevealText from '../../components/ScrollRevealText'
import AnimatedFrame from '../../components/AnimatedFrame'

export default function Page() {
  return (
    <>
        <style jsx>{`
          .story-text-card:hover {
            transform: perspective(1000px) rotateX(0deg) translateZ(30px) !important;
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
          }
        `}</style>
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
              { text: 'I create interfaces that make complex business challenges feel simple, so people can focus on ' },
              { text: 'what matters most.', color: '#ffffff', isStrong: true, fontFamily: 'var(--font-unifraktur)', fontSize: '3.6rem', glow: true }
            ]}
            useFlickerEffect={false}
            fontSize="3.3rem"
            fontWeight={300}
            lineHeight={1.2}
            letterSpacing="-0.01em"
            animationSpeed={4}
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
          marginBottom: '100px',
         
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <ScrollRevealText
              text="Behind the work"
              fontSize="2.6rem"
              fontWeight={300}
              lineHeight={1.1}
              letterSpacing="-0.01em"
              className="scrollRevealText"
            />
            <p style={{
              fontSize: '1.2rem',
              fontWeight: 300,
              lineHeight: 1.6,
              color: 'white',
              marginTop: '24px',
              maxWidth: '100%',
         
              marginRight: 'auto',
              fontFamily: 'var(--font-body)',
              textAlign: 'left'
            }}>
              Not just the projects, but the person behind them. Here&apos;s a bit of my story and some moments from my recent trip to Japan.
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'start'
          }}>
          {/* Left Column - Alternating Pattern */}
          <div className="gallery-left" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '100px',
            transform: 'translateY(0px)'
          }}>
            {/* Frame 1 */}
            <AnimatedFrame delay={0.1} comment="A quiet moment of contemplation, capturing the essence of thoughtful design and personal growth.">
              <div style={{
                width: '100%',
                aspectRatio: '4/5',
                padding: '10px',
                border: '1px solid #282828',
                borderRadius: '12px',
                backgroundImage: 'linear-gradient(to bottom, rgba(155, 155, 155, 0.12) 0%, rgba(77, 77, 77, 0.222) 12%, transparent 50%)',
                backgroundColor: 'rgba(77, 77, 77, 0.222)',
                backgroundRepeat: 'no-repeat',
                boxShadow: '0 0 12px rgba(0, 0, 0, 0.4), inset 0 -2px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.06)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '2px',
                  width: '100%',
                  pointerEvents: 'none',
                  background: 'linear-gradient(to right, transparent, rgba(251, 251, 251, 0.641) 50%, transparent)',
                  zIndex: 1
                }} />
                <div className="gallery-frame" style={{
                  width: '100%',
                  height: '100%',
                  border: '1px solid #383838',
                  borderRadius: '8px',
                  background: 'linear-gradient(to top, #0b0b0b 0%, #101010 40%, #181818 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  color: '#888',
                  fontFamily: 'var(--font-body)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '1px',
                    width: '100%',
                    pointerEvents: 'none',
                    background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2) 50%, transparent)',
                    zIndex: 1
                  }} />
                  <img 
                    src="/portrait1-min.jpg" 
                    alt="Portrait 1"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
              </div>
            </AnimatedFrame>

            {/* Story Text 2 - Left side */}
            <div className="story-text-card" style={{
              fontSize: '1.2rem',
              color: '#ccc',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              lineHeight: '1.7',
              margin: '0',
              padding: '40px',
              backgroundColor: 'rgba(17, 17, 17, 0.8)',
              border: '1px solid #333',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              transform: 'perspective(1000px) rotateX(2deg) translateZ(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}>
              At Oriental Merchant, I lead UX/UI design across enterprise platforms, transforming 
              intricate workflows into intuitive interfaces that people actually want to use.
            </div>
            
            {/* Frame 3 */}
            <AnimatedFrame delay={0.3} comment="Inspired by the beauty and precision of Japanese design philosophy, finding new perspectives.">
              <div style={{
                width: '100%',
                aspectRatio: '4/5',
                padding: '10px',
                border: '1px solid #282828',
                borderRadius: '12px',
                backgroundImage: 'linear-gradient(to bottom, rgba(155, 155, 155, 0.12) 0%, rgba(77, 77, 77, 0.222) 12%, transparent 50%)',
                backgroundColor: 'rgba(77, 77, 77, 0.222)',
                backgroundRepeat: 'no-repeat',
                boxShadow: '0 0 12px rgba(0, 0, 0, 0.4), inset 0 -2px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.06)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '2px',
                  width: '100%',
                  pointerEvents: 'none',
                  background: 'linear-gradient(to right, transparent, rgba(251, 251, 251, 0.641) 50%, transparent)',
                  zIndex: 1
                }} />
                <div className="gallery-frame" style={{
                  width: '100%',
                  height: '100%',
                  border: '1px solid #383838',
                  borderRadius: '8px',
                  background: 'linear-gradient(to top, #0b0b0b 0%, #101010 40%, #181818 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  color: '#888',
                  fontFamily: 'var(--font-body)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '1px',
                    width: '100%',
                    pointerEvents: 'none',
                    background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2) 50%, transparent)',
                    zIndex: 1
                  }} />
                  <img 
                    src="/portrait3-min.jpg" 
                    alt="Portrait 3"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
              </div>
            </AnimatedFrame>
                      {/* Story Text 4 - Left side */}
                      <div className="story-text-card" style={{
              fontSize: '1.2rem',
              color: '#ccc',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              lineHeight: '1.7',
              margin: '0',
              padding: '40px',
              backgroundColor: 'rgba(17, 17, 17, 0.8)',
              border: '1px solid #333',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              transform: 'perspective(1000px) rotateX(2deg) translateZ(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}>
              I&apos;m passionate about design systems that scale, accessibility that&apos;s built-in rather than 
              bolted-on, and user research that drives real change in how we build digital experiences.
            </div>
          </div>

          {/* Right Column - Alternating Pattern */}
          <div className="gallery-right" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '100px',
            transform: 'translateY(0px)'
          }}>
            {/* Story Text 1 - Starting at top right */}
            <div className="story-text-card" style={{
              fontSize: '1.2rem',
              color: '#ccc',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              lineHeight: '1.7',
              margin: '0',
              padding: '40px',
              backgroundColor: 'rgba(17, 17, 17, 0.8)',
              border: '1px solid #333',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              transform: 'perspective(1000px) rotateX(-2deg) translateZ(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}>
              My journey began with curiosity—about how things work, why they&apos;re built the way they are, 
              and how design can make technology feel human.
            </div>

            {/* Frame 2 */}
            <AnimatedFrame delay={0.2} comment="Lost in the flow of creative work, where ideas take shape and innovation happens naturally.">
              <div style={{
                width: '100%',
                aspectRatio: '4/5',
                padding: '10px',
                border: '1px solid #282828',
                borderRadius: '12px',
                backgroundImage: 'linear-gradient(to bottom, rgba(155, 155, 155, 0.12) 0%, rgba(77, 77, 77, 0.222) 12%, transparent 50%)',
                backgroundColor: 'rgba(77, 77, 77, 0.222)',
                backgroundRepeat: 'no-repeat',
                boxShadow: '0 0 12px rgba(0, 0, 0, 0.4), inset 0 -2px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.06)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '2px',
                  width: '100%',
                  pointerEvents: 'none',
                  background: 'linear-gradient(to right, transparent, rgba(251, 251, 251, 0.641) 50%, transparent)',
                  zIndex: 1
                }} />
                <div className="gallery-frame" style={{
                  width: '100%',
                  height: '100%',
                  border: '1px solid #383838',
                  borderRadius: '8px',
                  background: 'linear-gradient(to top, #0b0b0b 0%, #101010 40%, #181818 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  color: '#888',
                  fontFamily: 'var(--font-body)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '1px',
                    width: '100%',
                    pointerEvents: 'none',
                    background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2) 50%, transparent)',
                    zIndex: 1
                  }} />
                  <img 
                    src="/portrait2-min.jpg" 
                    alt="Portrait 2"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
              </div>
            </AnimatedFrame>
            
                    {/* Story Text 3 */}
                    <div className="story-text-card" style={{
              fontSize: '1.2rem',
              color: '#ccc',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              lineHeight: '1.7',
              margin: '0',
              padding: '40px',
              backgroundColor: 'rgba(17, 17, 17, 0.8)',
              border: '1px solid #333',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              transform: 'perspective(1000px) rotateX(-2deg) translateZ(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}>
              My approach combines deep user empathy with strategic thinking, ensuring every design 
              decision serves both user needs and business objectives.
            </div>
            {/* Frame 4 */}
            <AnimatedFrame delay={0.4} comment="Embracing the journey of continuous learning and the art of thoughtful craftsmanship.">
              <div style={{
                width: '100%',
                aspectRatio: '4/5',
                padding: '10px',
                border: '1px solid #282828',
                borderRadius: '12px',
                backgroundImage: 'linear-gradient(to bottom, rgba(155, 155, 155, 0.12) 0%, rgba(77, 77, 77, 0.222) 12%, transparent 50%)',
                backgroundColor: 'rgba(77, 77, 77, 0.222)',
                backgroundRepeat: 'no-repeat',
                boxShadow: '0 0 12px rgba(0, 0, 0, 0.4), inset 0 -2px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.06)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '2px',
                  width: '100%',
                  pointerEvents: 'none',
                  background: 'linear-gradient(to right, transparent, rgba(251, 251, 251, 0.641) 50%, transparent)',
                  zIndex: 1
                }} />
                <div className="gallery-frame" style={{
                  width: '100%',
                  height: '100%',
                  border: '1px solid #383838',
                  borderRadius: '8px',
                  background: 'linear-gradient(to top, #0b0b0b 0%, #101010 40%, #181818 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  color: '#888',
                  fontFamily: 'var(--font-body)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '1px',
                    width: '100%',
                    pointerEvents: 'none',
                    background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2) 50%, transparent)',
                    zIndex: 1
                  }} />
                  <img 
                    src="/portrait4-min.jpg" 
                    alt="Portrait 4"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
              </div>
            </AnimatedFrame>

  
            
        
          </div>
        </div>
        </div>
        {/* Final Story Text */}
        <div style={{
          maxWidth: '100%',
          fontSize: '1.2rem',
          lineHeight: '1.7',
          fontFamily: 'var(--font-body)',
          fontWeight: 300,
          color: '#ccc',
          textAlign: 'left',
          marginBottom: '120px',
          marginLeft: 'auto',
          marginRight: 'auto',



          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}>

            Before diving into enterprise design, I spent years exploring the intersection of 
            art and technology. This background gives me a unique perspective on creating 
            interfaces that don&apos;t just function—they communicate, delight, and guide users 
            effortlessly through complex digital landscapes.
<br /><br />
        
            Whether sketching in Figma or prototyping in code, I believe great design happens 
            at the intersection of craft and strategy. The result? Interfaces people actually 
            want to use, not just tolerate.
      
        </div>
   
      </section>

      {/* Story Section */}
      <section style={{ 
        padding: '0 10% 120px 10%',
        backgroundColor: '#111111'
      }}>
        <div style={{ maxWidth: '100%', margin: '0 auto', paddingTop: '100px' }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            marginBottom: '80px',
            color: 'var(--foreground)'
          }}>
            <ScrollRevealText
              text="Experience"
              fontSize="3.5rem"
              fontWeight={300}
              lineHeight={1.1}
              letterSpacing="-0.01em"
              className="scrollRevealText"
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            {/* Oriental Merchant */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '60px', alignItems: 'start' }}>
              <div>
                <div style={{
                  fontSize: '2.2rem',
                  fontWeight: 300,
                  color: 'var(--foreground)',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-heading)'
                }}>
                  UX Designer 
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: '#aaa',
                  fontWeight: 300,
                  marginBottom: '8px'
                }}>
                  Oriental Merchant
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  color: '#888',
                  fontWeight: 300
                }}>
                  2022 - Present
                </div>
              </div>
              <div style={{
                fontSize: '1.2rem',
                color: '#ccc',
                lineHeight: 1.6,
                fontWeight: 300
              }}>
                At Oriental Merchant, leading UX/UI design across enterprise platforms, transforming complex workflows 
                into intuitive interfaces that users actually want to use.
              </div>
            </div>

            {/* Freelance */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '60px', alignItems: 'start' }}>
              <div>
                <div style={{
                  fontSize: '2.2rem',
                  fontWeight: 300,
                  color: 'var(--foreground)',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-heading)'
                }}>
                  Freelance 
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: '#aaa',
                  fontWeight: 300,
                  marginBottom: '8px'
                }}>
                  Self-Employed
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  color: '#888',
                  fontWeight: 300
                }}>
                  2025
                </div>
              </div>
              <div style={{
                fontSize: '1.2rem',
                color: '#ccc',
                lineHeight: 1.6,
                fontWeight: 300
              }}>
                Expanding into freelance work, helping small businesses establish their digital presence 
                and create meaningful connections with their customers through thoughtful design.
              </div>
            </div>
            {/* Previous Role */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '60px', alignItems: 'start' }}>
              <div>
                <div style={{
                  fontSize: '2.2rem',
                  fontWeight: 300,
                  color: 'var(--foreground)',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-heading)'
                }}>
                  Junior Programmer
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: '#aaa',
                  fontWeight: 300,
                  marginBottom: '8px'
                }}>
                  Oriental Merchant
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  color: '#888',
                  fontWeight: 300
                }}>
                  2021 - 2022
                </div>
              </div>
              <div style={{
                fontSize: '1.2rem',
                color: '#ccc',
                lineHeight: 1.6,
                fontWeight: 300
              }}>
                At Oriental Merchant, started as a junior programmer developing foundational skills in software development 
                and learning the fundamentals of building robust digital solutions.
              </div>
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
            <div style={{ fontFamily: 'var(--font-body)' }}>
              <ScrollRevealText
                text="What I Believe"
                fontSize="3.5rem"
                fontWeight={300}
                lineHeight={1.1}
                letterSpacing="-0.01em"
                className="scrollRevealText"
              />
            </div>
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
                  lineHeight: 1.1,
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
            lineHeight: 1.1,
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
                lineHeight: 1.1,
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
    </main>
    </>
  )
}
