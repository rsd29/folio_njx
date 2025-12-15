"use client"

import { useEffect, useState } from "react"
import Image from 'next/image'
import AnimatedRichText from '../../components/AnimatedRichText'
import ScrollRevealText from '../../components/ScrollRevealText'
import AnimatedFrame from '../../components/AnimatedFrame'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

export default function Page() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [overlayVisible, setOverlayVisible] = useState(false)

  useEffect(() => {
    const smootherInstance = ScrollSmoother.get()
    if (smootherInstance) {
      requestAnimationFrame(() => {
        smootherInstance.scrollTo(0, true)
      })
    } else if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [])
  
  const skillDescriptions: { [key: string]: string } = {
    'Adobe Creative Suite': 'Industry-standard design tools including Photoshop, Illustrator, and InDesign for creating compelling visual content and brand assets.',
    'React': 'Modern JavaScript library for building interactive user interfaces with component-based architecture and efficient state management.',
    'Wireframing': 'Creating low-fidelity blueprints and structural layouts to visualize user flows and interface hierarchy before development.',
    'CSS': 'Styling language that brings designs to life with animations, responsive layouts, and pixel-perfect visual implementations.',
    'Usability Testing': 'Observing real users interact with products to identify pain points and optimize user experience through data-driven insights.',
    'Angular': 'Robust TypeScript framework for building scalable web applications with powerful features like dependency injection and routing.',
    'Figma': 'Collaborative design platform for creating interactive prototypes, design systems, and seamless designer-developer handoffs.',
    'Journey Mapping': 'Visualizing the complete user experience across touchpoints to identify opportunities for improvement and innovation.',
    'TypeScript': 'Statically typed JavaScript that catches errors early and enables more maintainable, scalable code for complex applications.',
    'Git': 'Version control system for tracking changes, collaborating with teams, and managing code repositories efficiently.',
    'Interaction Design': 'Crafting intuitive and engaging user interactions through thoughtful micro-animations, transitions, and feedback systems.',
    'Python': 'Versatile programming language used for automation, data analysis, and backend development with clean, readable syntax.',
    'QA Testing': 'Systematic testing processes to ensure product quality, functionality, and reliability before deployment.',
    'Canva': 'User-friendly design tool for creating marketing materials, presentations, and quick visual content with professional templates.',
    'Design Systems': 'Comprehensive libraries of reusable components, patterns, and guidelines that ensure consistency across products.',
    'Node.js': 'JavaScript runtime that enables server-side development, allowing full-stack development with a unified language.',
    'User Research': 'Discovering user needs, behaviors, and motivations through interviews, surveys, and observational studies.',
    'SASS': 'CSS preprocessor that adds powerful features like variables, mixins, and nesting for more efficient stylesheet development.',
    'Accessibility': 'Ensuring digital products are usable by people with disabilities through inclusive design practices and WCAG compliance.',
    'JavaScript': 'Core web programming language that adds interactivity, dynamic content, and modern user experience features.',
    'Framer Motion': 'Advanced animation library for React that creates smooth, performant animations and gesture-based interactions.',
    'Personas': 'Research-based user archetypes that help teams make design decisions by keeping target users at the center of development.',
    'User Interviews': 'One-on-one conversations with users to gather deep insights about their needs, frustrations, and goals.',
    'Next.js': 'React framework with built-in optimization, server-side rendering, and routing for high-performance web applications.',
    'A/B Testing': 'Comparing two versions of a design to determine which performs better through controlled experimentation.',
    'Bitbucket': 'Git repository hosting service with integrated CI/CD pipelines, code review tools, and team collaboration features.',
    'Visual Design': 'Creating aesthetically pleasing and functional interfaces through typography, color, layout, and visual hierarchy.',
    'Atlassian': 'Suite of collaboration tools including Jira, Confluence, and Trello for project management and team productivity.',
    'Prototyping': 'Building interactive mockups and proof-of-concepts to test ideas, validate concepts, and communicate design intent.',
    'Design Thinking': 'Human-centered problem-solving methodology that emphasizes empathy, ideation, and iterative testing.'
  }

  const personalUsage: { [key: string]: string } = {
    'Adobe Creative Suite': 'Honestly, I have a love-hate relationship with Photoshop. It\'s <em>incredibly</em> powerful but can feel like overkill for web work. I mainly use it when I need precise control over image optimization or when designers hand me PSDs that need surgery. Illustrator is my go-to for creating custom icons and vector assets that scale perfectly across devices. There\'s something satisfying about crafting <em>pixel-perfect</em> UI elements that look crisp at any size.',
    'React': 'React changed how I approach design because it forced me to think in <em>components</em> from the start. I love that I can prototype real, functional interfaces instead of static mockups. It means stakeholders interact with something that <em>actually works</em>, not just looks pretty. The component mindset has made me a better designer because I\'m constantly thinking about reusability, states, and how things break down into atomic pieces. Plus, being able to ship my own designs feels <em>incredibly empowering</em>.',
    'Wireframing': 'I\'m a big believer in starting ugly. Low-fidelity wireframes keep stakeholders focused on structure and flow instead of debating button colors for an hour. I sketch on paper first, then move to digital wireframes to test different approaches quickly. The best part? When a wireframe fails in testing, I haven\'t wasted days on high-fidelity work. It\'s saved me countless hours and helped me stay <em>detached</em> from ideas that don\'t work.',
    'CSS': 'CSS is where design <em>comes alive</em> for me. I get genuinely excited about modern CSS features like Grid, Flexbox, and custom properties. They\'ve transformed how we build responsive layouts. I obsess over micro-interactions and subtle animations that make interfaces feel polished and intentional. There\'s a <em>huge difference</em> between a designer who understands CSS constraints and one who doesn\'t, and I think that knowledge makes my designs more feasible and elegant.',
    'Usability Testing': 'Watching real people struggle with something you designed is <em>humbling</em>, but it\'s the fastest way to get better. I try to test early and often, even with rough prototypes, because you learn so much more from observation than opinions. The best insights usually come from what users <em>don\'t say</em>. The hesitations, the confused mouse movements, the moments they go silent trying to figure something out. It\'s uncomfortable but invaluable.',
    'Angular': 'Working with Angular taught me to respect developer workflows and constraints. I don\'t love its verbosity compared to React, but understanding how it handles state, routing, and dependency injection has made me design smarter component architectures. When I know the development team is using Angular, I can anticipate technical challenges and design solutions that work <em>with</em> the framework instead of fighting against it.',
    'Figma': 'Figma <em>fundamentally changed</em> how I collaborate with teams. The fact that everyone can jump into the same file, leave comments, and see changes in real-time eliminates so much friction. I use it for everything: wireframes, high-fidelity designs, prototypes, design systems, even presentations. Auto Layout feels like CSS Flexbox for designers, and once you master it, you can\'t imagine working any other way. Honestly, it\'s the tool I\'d be <em>most lost without</em>.',
    'Journey Mapping': 'Journey maps help me see beyond individual screens to understand the complete experience. I like mapping emotional states alongside actions because it reveals where we\'re creating frustration or delight. The process often exposes gaps we never considered, like what happens between someone signing up and actually using the product for the first time. Those <em>in-between moments</em> are where experiences often break down.',
    'TypeScript': 'TypeScript has made me a more <em>disciplined</em> developer. The type safety catches so many bugs before they happen, and it makes codebases way more maintainable as they grow. I especially love it for design systems because it enforces consistency. You can\'t accidentally pass the wrong prop type to a component. It has a learning curve, but once you get it, going back to plain JavaScript feels <em>reckless</em>.',
    'Git': 'Version control isn\'t just for code. I use Git for design systems, documentation, even my personal portfolio. Being able to track changes, revert mistakes, and collaborate without overwriting each other\'s work is essential. I\'ve seen too many "design_final_v2_ACTUAL_FINAL.fig" files in my career. Git brings <em>sanity</em> to creative work, and more designers should embrace it.',
    'Interaction Design': 'Good interaction design is <em>invisible</em>. Users don\'t notice it, they just feel like the interface "gets them." I spend way too much time perfecting timing curves and transition durations because those details matter. A 150ms transition feels completely different from 300ms, and most people can\'t articulate why but they definitely feel it. Motion should always serve a purpose: guide attention, provide feedback, or maintain context.',
    'Python': 'Python is my secret weapon for automating boring tasks. I\'ve written scripts to process hundreds of user survey responses, extract patterns from analytics data, batch process images, and generate design documentation. It\'s not glamorous, but it frees up time for <em>actual design work</em>. Plus, understanding programming logic makes me better at designing complex systems and flows.',
    'QA Testing': 'I learned early that sitting with QA during testing sessions is invaluable. They find edge cases and scenarios I never considered, and their perspective helps me design more robust solutions. I see QA as <em>partners</em>, not gatekeepers. They\'re protecting the user experience just as much as I am. Plus, when designs break in weird ways, it usually reveals assumptions I made that need to be reconsidered.',
    'Canva': 'Canva gets a bad rap from designers, but it\'s perfect for quick social media graphics or when I need to empower non-designers to create content without breaking brand guidelines. I\'ve built Canva templates for marketing teams that keep our visual identity consistent while letting them work independently. It\'s not replacing Figma for serious design work, but it has its place in the toolkit.',
    'Design Systems': 'Building design systems is one of my favorite challenges because it\'s designing for <em>designers and developers</em>. A good system speeds up everyone\'s work and ensures consistency, but it requires deep thinking about flexibility vs. constraints. I document not just what components do, but <em>when to use them and why</em>. The hardest part is keeping systems alive. They need constant maintenance and evolution or they become outdated artifacts nobody uses.',
    'Node.js': 'Node.js lets me build the tools I wish existed. I\'ve created custom APIs for design demos, automation scripts that run on servers, and even simple backend services for prototypes that need real data. Understanding how the backend works makes me a better designer because I can have <em>informed conversations</em> with engineers about what\'s feasible and design APIs that make sense.',
    'User Research': 'Research is where great design starts. I\'m a firm believer that you can\'t design effective solutions without understanding the problem <em>deeply</em> first. I push back when stakeholders want to skip research and jump to solutions. That\'s how you end up building features nobody needs. The best projects I\'ve worked on all started with thorough research that gave the team <em>conviction</em> about what to build.',
    'SASS': 'SASS makes CSS actually maintainable at scale. Variables, mixins, nesting. They all help organize styles in ways that make sense. I use it to build design token systems that keep colors, spacing, and typography consistent across large applications. The ability to do calculations and loops in stylesheets opens up possibilities pure CSS can\'t match, though modern CSS is slowly catching up.',
    'Accessibility': 'Accessibility isn\'t optional, it\'s <em>fundamental</em>. I\'m passionate about this because good accessible design is just good design: semantic HTML, clear hierarchies, sufficient contrast, keyboard navigation. These things benefit <em>everyone</em>, not just people using assistive technologies. I audit my work with screen readers regularly because it reveals how your interface actually communicates, not just how it looks. We have a responsibility to design for everyone.',
    'JavaScript': 'JavaScript is how I bring interactivity to life. I use it to prototype complex interactions, validate design concepts, and sometimes just to see if an idea actually works before handing it off. Understanding JavaScript has made me a more effective designer because I know what\'s easy to build versus what\'s complex. I can have technical conversations with developers and design solutions that are both <em>ambitious and realistic</em>.',
    'Framer Motion': 'Framer Motion is <em>hands down</em> my favorite animation library. The declarative API makes complex animations feel intuitive, and the gesture controls open up interaction possibilities that feel magical. I use it to prototype sophisticated UI behaviors: shared element transitions, scroll-linked animations, drag interactions. Seeing designs move exactly how I imagined them is incredibly satisfying, and it helps stakeholders understand the vision in ways static mocks never could.',
    'Personas': 'I only create personas grounded in <em>real research data</em>. Fictional personas are worse than useless because they give teams false confidence. Good personas synthesize patterns from actual users and keep everyone aligned on who we\'re designing for. I reference them constantly in design critiques: "Would Sarah, our operations manager persona, understand this?" They\'re most valuable when they <em>challenge</em> our assumptions and biases.',
    'User Interviews': 'One-on-one interviews are where I learn the most about users. The key is asking open-ended questions and shutting up to let people talk. I\'ve learned to embrace awkward silences. That\'s often when people share the most honest insights. The goal isn\'t to validate my ideas but to understand their world, their frustrations, their workarounds. Every interview makes me a little <em>less confident</em> in my assumptions, which is exactly the point.',
    'Next.js': 'Next.js is my framework of choice for building high-fidelity prototypes that feel real. The performance optimizations, image handling, and routing are built-in, so I can focus on the design. I love that I can start with static pages and progressively add dynamic features. When a prototype is this polished, stakeholder feedback is way more meaningful because they\'re reacting to something that feels <em>production-ready</em>.',
    'A/B Testing': 'A/B testing keeps design decisions <em>honest</em>. I\'ve been humbled by tests that proved my "obviously better" design actually performed worse. The key is testing one variable at a time and having enough traffic to reach statistical significance. I also think qualitative data matters. Sometimes a design wins the metric but loses user trust in ways that take longer to manifest. Data informs decisions, but shouldn\'t make them blindly.',
    'Bitbucket': 'I work with Bitbucket because that\'s what our team uses, though honestly I prefer GitHub\'s interface. Still, it does the job: pull requests, code reviews, CI/CD integration. Being able to review code implementation of my designs helps ensure quality and catch issues early. I leave comments when implementations don\'t match the specs or when I notice accessibility issues in the code.',
    'Visual Design': 'Visual design is where I get to express creativity within constraints. I love the challenge of making interfaces beautiful <em>without sacrificing usability</em>. Typography, color, spacing, hierarchy. These fundamentals matter more than trendy effects. I\'m drawn to clean, modern aesthetics with thoughtful details that reward attention. Good visual design should <em>enhance</em> the experience, not distract from it, and finding that balance is what makes it interesting.',
    'Atlassian': 'Jira and Confluence are <em>necessary evils</em> in enterprise work. I use them to document design decisions, maintain a single source of truth, and keep stakeholders updated. Are they my favorite tools? No. Are they where the rest of the organization lives? Yes. So I embrace them, build good documentation habits, and try to make our Confluence spaces actually useful instead of design graveyards. Organization is part of the craft.',
    'Prototyping': 'I prototype obsessively because it\'s how I <em>think through problems</em>. Low-fidelity for structure, high-fidelity for polish, and everything in between. Interactive prototypes force you to consider states, transitions, and edge cases that static designs gloss over. The fidelity should match what you\'re trying to learn. Don\'t waste time on pixel perfection when you\'re still validating basic concepts. Prototype to think, to test, to communicate.',
    'Design Thinking': 'Design thinking gets criticized for being buzzwordy, and sometimes it is. But the core principles (empathize, define, ideate, prototype, test) are genuinely valuable when applied authentically. The framework gives teams permission to explore problems deeply before jumping to solutions. I use it to facilitate workshops and align stakeholders around user needs. The key is not treating it like a rigid process but as a <em>mindset</em> that values iteration and learning over being right.'
  }

  // All available skills
  const allSkills = [
    'Design Thinking', 'User Research', 'User Interviews', 'Personas', 'A/B Testing', 'Usability Testing', 'Wireframing', 'Journey Mapping', 'Interaction Design', 'Prototyping', 'Design Systems', 'Accessibility', 'Visual Design',
    'Figma', 'Adobe Creative Suite', 'Canva',
    'React', 'Next.js', 'Angular', 'JavaScript', 'TypeScript', 'CSS', 'SASS', 'Framer Motion',
    'Node.js', 'Python',
    'Git', 'Bitbucket',
    'QA Testing', 'Atlassian'
  ]

  // Helper function to render a skill element
  const renderSkill = (skill: string) => {
    // During transition, keep all skills visible
    // After transition, only show selected skill or all skills if none selected
    const shouldShow = isTransitioning || !selectedSkill || selectedSkill === skill
    
    if (!shouldShow) return null
    
    const isSelected = selectedSkill === skill
    
    
    // Use acid green color (same as footer CTA)
    const colorScheme = {
      color: '#bcff4e',
      shadow: '188, 255, 78'
    }
    
    return (
      <div 
        key={skill}
        data-skill={skill}
        className={`skill-word ${isSelected ? 'selected' : ''}`}
        onClick={() => handleSkillClick(skill)}
        style={{
          cursor: 'pointer',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform, color, text-shadow'
        }}>
        {isSelected ? (
          <div style={{
            width: '100%'
          }}>
            {/* Title and Back Button Row */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
              width: '100%'
            }}>
              <span style={{
                fontSize: '2.8rem',
                fontWeight: 300,
                color: '#ffffff',
                fontFamily: 'var(--font-body)',
                lineHeight: '1.2',
                width: '100%',
                flex: '1'
              }}>
                {skill}
              </span>
              <span 
                onClick={() => handleSkillClick(skill)}
                style={{
                  fontSize: 'var(--font-heading-l)',
                  fontWeight: 300,
                  color: '#aaa',
                  fontFamily: 'var(--font-body)',
                  lineHeight: '1.2',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  flexShrink: 0,
                  marginLeft: '20px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#aaa'
                }}>
                ← Back
              </span>
            </div>
            {/* Description */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              width: '100%'
            }}>
              <div style={{
                fontSize: '2.8rem',
                lineHeight: '1.2',
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                color: '#999',
                textAlign: 'left',
                fontStyle: 'italic'
              }}>
                {skillDescriptions[skill]}
              </div>
              <div 
                style={{
                  fontSize: 'var(--font-heading-l)',
                  lineHeight: '1.2',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                  color: '#bcff4e',
                  textAlign: 'left'
                }}
                dangerouslySetInnerHTML={{ __html: personalUsage[skill] }}
              />
            </div>
          </div>
        ) : (
          <span
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colorScheme.color
              e.currentTarget.style.textShadow = `
                0 0 8px rgba(${colorScheme.shadow}, 0.5),
                0 0 15px rgba(${colorScheme.shadow}, 0.3),
                0 0 20px rgba(${colorScheme.shadow}, 0.2)
              `
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = ''
              e.currentTarget.style.textShadow = ''
              e.currentTarget.style.transform = ''
            }}
            style={{
              transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform, color, text-shadow'
            }}>
            {skill}
          </span>
        )}
      </div>
    )
  }

  const handleSkillClick = (skill: string) => {
    if (selectedSkill === skill) {
      setOverlayVisible(true)
      
      setTimeout(() => {
        setSelectedSkill(null)
        setIsTransitioning(true)
        
        setTimeout(() => {
          setOverlayVisible(false)
          
          setTimeout(() => {
            setIsTransitioning(false)
          }, 450)
        }, 50)
      }, 400)
    } else {
      setIsTransitioning(true)
      setOverlayVisible(true)
      
      setTimeout(() => {
        setSelectedSkill(skill)
        setIsTransitioning(false)
        
        setTimeout(() => {
          setOverlayVisible(false)
        }, 50)
      }, 400)
    }
  }

  // Section IDs for the guide line (in order of appearance)
  const gallerySectionIds = [
    'story-text-1',      // Right column, first
    'gallery-frame-1',   // Left column, first
    'gallery-frame-2',   // Right column, second
    'story-text-2',      // Left column, second
    'story-text-3',      // Right column, third
    'gallery-frame-3',   // Left column, third
    'gallery-frame-4',   // Right column, fourth
    'story-text-4',      // Left column, fourth
  ]

  return (
    <>
        <style jsx>{`
          .story-text-card:hover {
            transform: perspective(1000px) rotateX(0deg) translateZ(30px) !important;
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
          }
          
          em {
            font-style: italic;
          }

          /* About hero */
          .about-hero {
            position: relative;
            overflow: hidden;
            padding: clamp(96px, 10vh, 140px) 8%;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: left;
            contain: layout style;
          }

          .about-hero-bg {
            position: absolute;
            inset: 0;
            z-index: 0;
            pointer-events: none;
          }

          .about-hero-video {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: brightness(0.55) saturate(1.05) contrast(1.05);
          }

          .about-hero-bgOverlay {
            position: absolute;
            inset: 0;
            background:
              radial-gradient(1200px 700px at 25% 20%, rgba(0, 0, 0, 0.35), transparent 60%),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.65));
          }

          .about-hero-inner {
            width: 100%;
            max-width: none;
            margin: 0 auto;
            contain: layout;
            position: relative;
            z-index: 1;
          }

          .about-hero-copy {
            display: flex;
            flex-direction: column;
            gap: 20px;
            font-family: var(--font-body);
            max-width: 100%;
            contain: layout style;
          }

          .about-hero-kicker {
            font-size: 0.9rem;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.55);
            margin: 0 0 6px;
          }

          .about-hero-heading {
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: none;
            text-wrap: balance;
          }

          .about-hero-lede {
            font-size: var(--font-body-l);
            color: rgba(255, 255, 255, 0.82);
            line-height: 1.75;
            margin: 6px 0 0;
            max-width: none;
            word-wrap: break-word;
            overflow-wrap: break-word;
          }

          .about-hero-pills {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
            margin-top: 14px;
            min-height: 48px;
            contain: layout style;
          }

          .about-hero-pill {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            border-radius: 999px;
            border: 1px solid rgba(188, 255, 78, 0.78);
            padding: 10px 18px;
            font-size: 0.92rem;
            letter-spacing: 0;
            line-height: 1.15;
            color: #bcff4e;
            background: rgba(188, 255, 78, 0.06);
            transition:
              transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1),
              background 180ms ease,
              border-color 180ms ease,
              box-shadow 180ms ease,
              color 180ms ease,
              border-width 180ms ease,
              padding 180ms ease;
            user-select: none;
          }

          .about-hero-pill:hover {
            border-color: rgba(230, 255, 155, 0.95);
            border-width: 2px;
            padding: 9px 17px; /* compensate for border-width to avoid layout shift */
            color: #e6ff9b;
            background: rgba(188, 255, 78, 0.12);
            box-shadow:
              0 0 0 1px rgba(188, 255, 78, 0.22),
              0 16px 40px rgba(0, 0, 0, 0.45);
            transform: translateY(-2px);
          }

          /* Experience timeline */
          .experience-list {
            display: flex;
            flex-direction: column;
            gap: 80px;
          }

          .experience-item {
            --experience-dot-center: 15px; /* distance from top of row to dot center */
            display: grid;
            grid-template-columns: minmax(0, 1fr) 56px minmax(0, 2fr);
            gap: 60px;
            align-items: start;
          }

          .experience-mid {
            position: relative;
            display: flex;
            justify-content: center;
            align-self: stretch;
          }

          .experience-mid::before {
            content: '';
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 1px;
            top: -40px;   /* half of the 80px gap */
            bottom: -40px;/* half of the 80px gap */
            background: rgba(255, 255, 255, 0.18);
          }

          .experience-item--first .experience-mid::before {
            top: var(--experience-dot-center); /* start at dot center */
          }

          .experience-item--last .experience-mid::before {
            bottom: calc(100% - var(--experience-dot-center)); /* end at dot center */
          }

          .experience-dot {
            position: absolute;
            left: 50%;
            top: calc(var(--experience-dot-center) - 5px); /* dot size is 10px */
            transform: translateX(-50%);
            width: 10px;
            height: 10px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.28);
            box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.04);
            z-index: 1;
          }

          .experience-dot--current {
            background: #bcff4e;
            box-shadow:
              0 0 0 6px rgba(188, 255, 78, 0.10),
              0 0 18px rgba(188, 255, 78, 0.35);
          }

          @media (max-width: 860px) {
            .experience-item {
              grid-template-columns: 1fr;
              gap: 18px;
            }
            .experience-mid {
              display: none;
            }
          }

          @media (max-width: 900px) {
            .about-hero-heading {
              max-width: none;
            }
          }

          @media (max-width: 640px) {
            .about-hero {
              padding: 92px 6%;
            }

            .about-hero-heading {
              max-width: 100%;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .about-hero-video {
              display: none;
            }

            .about-hero-bgOverlay {
              background: linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.75));
            }
          }

          .skill-word.selected {
            opacity: 1 !important;
            color: #ffffff !important;
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.4);
            filter: none !important;
          }

          .blur-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0);
            backdrop-filter: blur(0px);
            opacity: 0;
            pointer-events: none;
            transition: all 0.4s ease-in-out;
            z-index: 10;
          }

          .blur-overlay.active {
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(10px);
            opacity: 1;
          }

          .skills-container {
            transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
            min-height: 200px;
          }

          .skills-container.selected-mode {
            justify-content: flex-start;
            align-items: flex-start;
            gap: 20px 20px;
          }

        `}</style>
      <main style={{ maxWidth: '100%', minHeight: '100vh', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-bg" aria-hidden="true">
          <video
            className="about-hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src="https://cdn.pixabay.com/video/2024/10/08/235285_large.mp4" type="video/mp4" />
          </video>
          <div className="about-hero-bgOverlay" />
        </div>
        <div className="about-hero-inner">
          <div className="about-hero-copy">
            <p className="about-hero-kicker">About</p>

            <div className="about-hero-heading">
              <div style={{ 
                minHeight: 'clamp(3.4rem, 6.2vw, 5.2rem)',
                contain: 'layout style paint',
                width: '100%',
              }}>
                <AnimatedRichText
                  className="heroSubtext"
                  segments={[
                    {
                      text: 'I like solving messy problems and turning them into something people actually enjoy using.',
                    },
                  ]}
                  useFlickerEffect={false}
                  fontSize="clamp(1.9rem, 3.2vw, 2.8rem)"
                  fontWeight={400}
                  lineHeight={1.18}
                  letterSpacing="-0.03em"
                  animationSpeed={4}
                  marginBottom="0"
                  maxWidth="none"
                />
              </div>

    
            </div>

            <p className="about-hero-lede">
              Hello, my name’s Russell. I’m a UX designer who works across research, design, and development to make products functional, scalable, and easy to use.
            </p>

            <div className="about-hero-pills">
              {[
                'Based in Melbourne',
                '5+ yrs Designing Enterprise Products',
                'Loves to Code and Build',
                'Open to New Opportunities',
              ].map((pill) => (
                <span key={pill} className="about-hero-pill">
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

        {/* Scrollable Gallery Section */}
        <section className="gallery-section" style={{
          width: '100%',
          padding: '0 8%',
          marginBottom: '100px',
          position: 'relative', // For absolute positioning of guide line
        }}>
          <div style={{
            textAlign: 'left',
            marginBottom: '80px',
            height: '180px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            transform: 'scale(0.95)',
            transformOrigin: 'center',
          }}>
            <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <ScrollRevealText
              text="A bit more personal.."
              fontSize="var(--font-heading-l)"
              fontWeight={500}
              lineHeight={1}
              letterSpacing="var(--letter-spacing-normal)"
              className="scrollRevealText"
            />
            </div>
            <p 
              id="behind-the-work-text"
              style={{
                fontSize: 'var(--font-body-l)',
                fontWeight: 300,
                lineHeight: 'var(--line-height-relaxed)',
                color: 'white',
                marginTop: '24px',
                maxWidth: '72ch',
                fontFamily: 'var(--font-body)',
                textAlign: 'left',
                marginLeft: 0,
                marginRight: 'auto',
              }}>
              What you build comes from where you’ve been. Here’s a bit of that — and some photos from my time wandering through Asia.
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'start',
            transform: 'scale(0.95)',
            transformOrigin: 'center'
          }}>
          {/* Left Column - Alternating Pattern */}
          <div className="gallery-left" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '100px',
            transform: 'translateY(0px)'
          }}>
            {/* Frame 1 */}
            <AnimatedFrame delay={0.1} comment="A quiet moment of tranquility, taking in the sights in Hoi Ann.">
              <div id="gallery-frame-1" style={{
                width: '100%',
                aspectRatio: '4/5',
                padding: '8px',
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
                  <Image 
                    src="/portrait1-min.jpg" 
                    alt="Portrait 1"
                    fill
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
              </div>
            </AnimatedFrame>

            {/* Story Text 2 - Left side */}
            <div id="story-text-2" className="story-text-card" style={{
              fontSize: 'var(--font-body-l)',
              color: '#ccc',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              lineHeight: '1.7',
              margin: '0',
              padding: '32px',
              backgroundColor: 'rgba(17, 17, 17, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(30px) saturate(180%)',
              WebkitBackdropFilter: 'blur(30px) saturate(180%)',
              opacity: 0.75,
              transform: 'perspective(1000px) rotateX(2deg) translateZ(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
              cursor: 'pointer'
            }}>
              <h3 style={{
                fontSize: 'var(--font-body-l)',
                fontWeight: 300,
                color: '#ffffff',
                fontFamily: 'var(--font-body)',
                margin: '0 0 16px 0',
                lineHeight: 'var(--line-height-tight)'
              }}>Digital Environments</h3>
              Much like physical environments, digital environments are a reflection of the people using them. At Oriental Merchant,  I&apos;ve been able to shape how these environments feel and function. I love to set precendent for how things should be done and how they should look, crafting a culture of design that is both functional and beautiful.
            </div>
            
            {/* Frame 3 */}
            <AnimatedFrame delay={0.3} comment="Inspired by the beauty and precision of Japanese design philosophy, finding new perspectives.">
              <div id="gallery-frame-3" style={{
                width: '100%',
                aspectRatio: '4/5',
                padding: '8px',
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
                  <Image 
                    src="/portrait3-min.jpg" 
                    alt="Portrait 3"
                    fill
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
              </div>
            </AnimatedFrame>
                      {/* Story Text 4 - Left side */}
                      <div id="story-text-4" className="story-text-card" style={{
              fontSize: 'var(--font-body-l)',
              color: '#ccc',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              lineHeight: '1.7',
              margin: '0',
              padding: '32px',
              backgroundColor: 'rgba(17, 17, 17, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(30px) saturate(180%)',
              WebkitBackdropFilter: 'blur(30px) saturate(180%)',
              opacity: 0.75,
              transform: 'perspective(1000px) rotateX(2deg) translateZ(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
              cursor: 'pointer'
            }}>
              <h3 style={{
              fontSize: 'var(--font-body-l)',
                fontWeight: 300,
                color: '#ffffff',
                fontFamily: 'var(--font-body)',
                margin: '0 0 16px 0',
                lineHeight: '1.2'
              }}>My Passion</h3>
              I&apos;m passionate about design systems that scale, accessibility that&apos;s built-in rather than 
              bolted-on, and user research that drives real change in how we build digital experiences. Oh, and I love things that are visually stunning and make you go &quot;wow&quot;. Probably explains why I love Japanese design so much.
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
            <div id="story-text-1" className="story-text-card" style={{
              fontSize: 'var(--font-body-l)',
              color: '#ccc',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              lineHeight: '1.7',
              margin: '0',
              padding: '32px',
              backgroundColor: 'rgba(17, 17, 17, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(30px) saturate(180%)',
              WebkitBackdropFilter: 'blur(30px) saturate(180%)',
              opacity: 0.75,
              transform: 'perspective(1000px) rotateX(-2deg) translateZ(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
              cursor: 'pointer'
            }}>
              <h3 style={{
                   fontSize: 'var(--font-body-l)',
                fontWeight: 300,
                color: '#ffffff',
                fontFamily: 'var(--font-body)',
                margin: '0 0 16px 0',
                lineHeight: '1.2'
              }}>Early Days</h3>
              My journey in design began with curiosity about how things work, why they&apos;re built the way they are, 
              and how design can make technology feel human. Having roots in architectural design, I&apos;ve always had a facination with the environments humans surround themselves in.
            </div>

            {/* Frame 2 */}
            <AnimatedFrame delay={0.2} comment="Lost in the flow of creative work, where ideas take shape and innovation happens naturally.">
              <div id="gallery-frame-2" style={{
                width: '100%',
                aspectRatio: '4/5',
                padding: '8px',
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
                  <Image 
                    src="/portrait2-min.jpg" 
                    alt="Portrait 2"
                    fill
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
              </div>
            </AnimatedFrame>
            
                    {/* Story Text 3 */}
                    <div id="story-text-3" className="story-text-card" style={{
              fontSize: 'var(--font-body-l)',
              color: '#ccc',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              lineHeight: '1.7',
              margin: '0',
              padding: '32px',
              backgroundColor: 'rgba(17, 17, 17, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(30px) saturate(180%)',
              WebkitBackdropFilter: 'blur(30px) saturate(180%)',
              opacity: 0.75,
              transform: 'perspective(1000px) rotateX(-2deg) translateZ(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
              cursor: 'pointer'
            }}>
              <h3 style={{
              fontSize: 'var(--font-body-l)',                fontWeight: 300,
                color: '#ffffff',
                fontFamily: 'var(--font-body)',
                margin: '0 0 16px 0',
                lineHeight: '1.2'
              }}>My Approach</h3>
              My approach combines deep user empathy with strategic thinking, ensuring every design 
              decision serves both user needs and business objectives. With every decision made, the goal is always to create a product that feels just &quot;sweet&quot; for the user. I believe great design isn&apos;t always loud or avant-garde. It lives where usability meets personality, where something simply feels right.
            </div>
            {/* Frame 4 */}
            <AnimatedFrame delay={0.4} comment="Embracing the journey of continuous learning and the art of thoughtful craftsmanship.">
              <div id="gallery-frame-4" style={{
                width: '100%',
                aspectRatio: '4/5',
                padding: '8px',
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
                  <Image 
                    src="/portrait4-min.jpg" 
                    alt="Portrait 4"
                    fill
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
              </div>
            </AnimatedFrame>

  
            
        
          </div>
        </div>
        </section>
        {/* Final Story Text */}
        <section
          style={{
            width: '100%',
            padding: '0 20px',
            marginBottom: '120px',
          }}
        >
          <div
            id="my-path-to-enterprise"
            style={{
              width: '80%',
              fontSize: 'var(--font-body-l)',
              lineHeight: '1.7',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              color: '#ccc',
              textAlign: 'left',
              marginLeft: 'auto',
              marginRight: 'auto',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
My path to enterprise design started with curiosity about how creativity and technology connect. That early mix still influences how I design: practical, human, and quietly expressive.
<br /><br />
        
            Whether sketching in Figma or prototyping in code, I believe great design happens 
            at the intersection of craft and strategy.
            <br /><br />
             The result? Interfaces people actually 
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
            color: 'var(--foreground)',
            height: '80px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <ScrollRevealText
              text="Experience"
              fontSize="var(--font-heading-xl)"
              fontWeight={400}
              lineHeight={1.1}
              letterSpacing="var(--letter-spacing-normal)"
              className="scrollRevealText"
            />
          </div>
          
          <div className="experience-list">
            {/* Oriental Merchant */}
            <div className="experience-item experience-item--first">
              <div>
                <div style={{
                  fontSize: 'var(--font-heading-m)',
                  fontWeight: 300,
                  color: 'var(--foreground)',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-heading)'
                }}>
                  UX Designer 
                </div>
                <div style={{
                    fontSize: 'var(--font-body-l)',
                  color: '#aaa',
                  fontWeight: 300,
                  marginBottom: '8px'
                }}>
                  Oriental Merchant
                </div>
                <div style={{
                              fontSize: 'var(--font-body-l)',
                  color: '#888',
                  fontWeight: 300
                }}>
                  2022 - Present
                </div>
              </div>
              <div className="experience-mid" aria-hidden="true">
                <div className="experience-dot experience-dot--current" />
              </div>
              <div style={{
              fontSize: 'var(--font-body-l)',
                color: '#ccc',
                lineHeight: 1.6,
                fontWeight: 300
              }}>
                At Oriental Merchant, leading UX/UI design across enterprise platforms, transforming complex workflows 
                into intuitive interfaces that users actually want to use.
              </div>
            </div>

            {/* Freelance */}
            <div className="experience-item">
              <div>
                <div style={{
                  fontSize: 'var(--font-heading-m)',
                  fontWeight: 300,
                  color: 'var(--foreground)',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-heading)'
                }}>
                  Freelance 
                </div>
                <div style={{
                     fontSize: 'var(--font-body-l)',
                  color: '#aaa',
                  fontWeight: 300,
                  marginBottom: '8px'
                }}>
                  Self-Employed
                </div>
                <div style={{
                        fontSize: 'var(--font-body-l)',
                  color: '#888',
                  fontWeight: 300
                }}>
                  2025
                </div>
              </div>
              <div className="experience-mid" aria-hidden="true">
                <div className="experience-dot" />
              </div>
              <div style={{
                  fontSize: 'var(--font-body-l)',
                color: '#ccc',
                lineHeight: 1.6,
                fontWeight: 300
              }}>
                Expanding into freelance work, helping small businesses establish their digital presence 
                and create meaningful connections with their customers through thoughtful design.
              </div>
            </div>
            {/* Previous Role */}
            <div className="experience-item experience-item--last">
              <div>
                <div style={{
                  fontSize: 'var(--font-heading-m)',
                  fontWeight: 300,
                  color: 'var(--foreground)',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-heading)'
                }}>
                  Junior Programmer
                </div>
                <div style={{
                         fontSize: 'var(--font-body-l)',
                  color: '#aaa',
                  fontWeight: 300,
                  marginBottom: '8px'
                }}>
                  Oriental Merchant
                </div>
                <div style={{
                          fontSize: 'var(--font-body-l)',
                  color: '#888',
                  fontWeight: 300
                }}>
                  2021 - 2022
                </div>
              </div>
              <div className="experience-mid" aria-hidden="true">
                <div className="experience-dot" />
              </div>
              <div style={{
                   fontSize: 'var(--font-body-l)',
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

 

      {/* Skills Section */}
      <section style={{ 
        padding: '200px 10% 400px 10%',
        backgroundColor: '#111111'
      }}>
        <div style={{ maxWidth: '100%', margin: '0 auto' }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            marginBottom: '80px',
            color: 'var(--foreground)',
            height: '80px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <ScrollRevealText
              text="Behind the Interface"
              fontSize="var(--font-heading-xl)"
              fontWeight={400}
              lineHeight={1.1}
              letterSpacing="var(--letter-spacing-normal)"
              className="scrollRevealText"
            />
          </div>
          
          {/* Skills Paragraph */}
          <div 
            className={`skills-container ${selectedSkill ? 'selected-mode' : ''}`}
            style={{
              maxWidth: '100%',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '40px',
              fontSize: '2.8rem',
              lineHeight: '1.2',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              color: '#ccc',
              letterSpacing: '-0.01em',
              minHeight: selectedSkill ? '100px' : 'auto',
              position: 'relative' // Enable positioning for overlay
            }}>
            
            {/* Blur Overlay */}
            <div className={`blur-overlay ${overlayVisible ? 'active' : ''}`} />
            
            {/* UX & Design Category */}
            {(isTransitioning || !selectedSkill || ['Design Thinking', 'User Research', 'User Interviews', 'Personas', 'A/B Testing', 'Usability Testing', 'Wireframing', 'Journey Mapping', 'Interaction Design', 'Prototyping', 'Design Systems', 'Accessibility', 'Visual Design'].includes(selectedSkill)) && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: selectedSkill ? '0' : '12px'
              }}>
                {(!selectedSkill || isTransitioning) && (
                  <h3 style={{
                    fontSize: 'var(--font-body-l)',
                    fontWeight: 400,
                    color: '#888',
                    margin: '0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>UX & Design</h3>
                )}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px 24px',
                  alignItems: 'center'
                }}>
                  {['Design Thinking', 'User Research', 'User Interviews', 'Personas', 'A/B Testing', 'Usability Testing', 'Wireframing', 'Journey Mapping', 'Interaction Design', 'Prototyping', 'Design Systems', 'Accessibility', 'Visual Design'].map(skill => renderSkill(skill))}
              </div>
              </div>
            )}

            {/* Design Tools Category */}
            {(isTransitioning || !selectedSkill || ['Figma', 'Adobe Creative Suite', 'Canva'].includes(selectedSkill)) && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: selectedSkill ? '0' : '12px'
              }}>
                {(!selectedSkill || isTransitioning) && (
                  <h3 style={{
                    fontSize: 'var(--font-body-l)',
                    fontWeight: 400,
                    color: '#888',
                    margin: '0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>Design Tools</h3>
                )}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px 24px',
                  alignItems: 'center'
                }}>
                  {['Figma', 'Adobe Creative Suite', 'Canva'].map(skill => renderSkill(skill))}
                </div>
              </div>
            )}

            {/* Frontend Development Category */}
            {(isTransitioning || !selectedSkill || ['React', 'Next.js', 'Angular', 'JavaScript', 'TypeScript', 'CSS', 'SASS', 'Framer Motion'].includes(selectedSkill)) && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: selectedSkill ? '0' : '12px'
              }}>
                {(!selectedSkill || isTransitioning) && (
                  <h3 style={{
                    fontSize: 'var(--font-body-l)',
                    fontWeight: 400,
                    color: '#888',
                    margin: '0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>Frontend Development</h3>
                )}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px 24px',
                  alignItems: 'center'
                }}>
                  {['React', 'Next.js', 'Angular', 'JavaScript', 'TypeScript', 'CSS', 'SASS', 'Framer Motion'].map(skill => renderSkill(skill))}
                </div>
              </div>
            )}

            {/* Backend Development Category */}
            {(isTransitioning || !selectedSkill || ['Node.js', 'Python'].includes(selectedSkill)) && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: selectedSkill ? '0' : '12px'
              }}>
                {(!selectedSkill || isTransitioning) && (
                  <h3 style={{
                    fontSize: 'var(--font-body-l)',
                    fontWeight: 400,
                    color: '#888',
                    margin: '0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>Backend Development</h3>
                )}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px 24px',
                  alignItems: 'center'
                }}>
                  {['Node.js', 'Python'].map(skill => renderSkill(skill))}
                </div>
              </div>
            )}

            {/* Development Tools Category */}
            {(isTransitioning || !selectedSkill || ['Git', 'Bitbucket'].includes(selectedSkill)) && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: selectedSkill ? '0' : '12px'
              }}>
                {(!selectedSkill || isTransitioning) && (
                  <h3 style={{
                    fontSize: 'var(--font-body-l)',
                    fontWeight: 400,
                    color: '#888',
                    margin: '0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>Development Tools</h3>
                )}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px 24px',
                  alignItems: 'center'
                }}>
                  {['Git', 'Bitbucket'].map(skill => renderSkill(skill))}
                </div>
              </div>
            )}

            {/* Other Tools Category */}
            {(isTransitioning || !selectedSkill || ['QA Testing', 'Atlassian'].includes(selectedSkill)) && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: selectedSkill ? '0' : '12px'
              }}>
                {(!selectedSkill || isTransitioning) && (
                  <h3 style={{
                    fontSize: 'var(--font-body-l)',
                    fontWeight: 400,
                    color: '#888',
                    margin: '0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>Other Tools</h3>
                )}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px 24px',
                  alignItems: 'center'
                }}>
                  {['QA Testing', 'Atlassian'].map(skill => renderSkill(skill))}
                </div>
              </div>
            )}
          </div>

        </div>
      </section>
    </main>
    </>
  )
}
