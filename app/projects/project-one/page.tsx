'use client'

import { useRef } from 'react'
import Link from 'next/link'
import ScrollRevealText from '../../../components/ScrollRevealText'
import styles from './case-study.module.css'

export default function ProjectOneCaseStudy() {
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <main className={styles.caseStudy}>
      {/* Hero Section */}
      <section className={styles.heroSection} ref={heroRef}>
        <div className={styles.heroContent}>
          <div className={styles.backLink}>
            <Link href="/" className={styles.backButton}>
              ← Back to Projects
            </Link>
          </div>
          
          <div className={styles.heroText}>
            <ScrollRevealText
              text="SalesIQ B2B Ordering Platform"
              fontSize="clamp(2.5rem, 5vw, 4.5rem)"
              fontWeight={300}
              lineHeight={1.1}
              letterSpacing="-0.02em"
              className={styles.heroTitle}
            />
            <div className={styles.heroMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Client</span>
                <span className={styles.metaValue}>Oriental Merchant</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Role</span>
                <span className={styles.metaValue}>Lead UX Designer</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Timeline</span>
                <span className={styles.metaValue}>6-10 months initial build</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Regions</span>
                <span className={styles.metaValue}>Australia, Netherlands, Canada, UK, Europe</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="The Challenge"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />
          
          <div className={styles.contentBlock}>
            <p className={styles.blockText}>
              Oriental Merchant, one of the world&apos;s largest Asian grocery importers, serves everyone from independent family grocers to major national chains like <strong>Coles and Woolworths</strong>. Despite this scale, their entire ordering process was offline—phone calls, paper catalogs, and field reps manually processing orders.
            </p>
            <p className={styles.blockText}>
              Store owners had no visibility into <strong>real-time pricing or stock</strong>. Promotions were confusing, often with complex tier structures that required rep interpretation. Every order risked miscommunication and data entry errors. For customers ordering weekly, there was no way to save patterns or access purchase history.
            </p>
            <p className={styles.blockText}>
              The business needed a <strong>digital transformation that could scale globally</strong> while making complex promotional logic feel simple at the interface.
            </p>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Project Overview"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />
          
          <div className={styles.contentBlock}>
            <p className={styles.blockText}>
              <strong>SalesIQ</strong> is a global B2B e-commerce platform that provides a modern self-service ordering experience for wholesale customers. What started as a single-region pilot rapidly expanded to become the core ordering tool across all of Oriental Merchant&apos;s international operations.
            </p>
            <p className={styles.blockText}>
              The platform handles <strong>region-specific product catalogs, dynamic pricing, live stock visibility, sophisticated promotional structures, and multiple languages</strong>—all while maintaining the familiar shopping patterns users already know from mainstream platforms.
            </p>
          </div>

          <div className={styles.contentGrid}>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>My Responsibilities</h3>
              <p className={styles.blockText}>
                I owned UX from end to end:
              </p>
              <ul className={styles.blockList}>
                <li>Research and stakeholder discovery</li>
                <li>Information architecture and flow planning</li>
                <li>Wireframing and high-fidelity UI design</li>
                <li>Design system and promotional asset design</li>
                <li>Interaction design and prototyping</li>
                <li>Front-end implementation</li>
                <li>Continuous iteration based on analytics and feedback</li>
              </ul>
            </div>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>The Team</h3>
              <ul className={styles.blockList}>
                <li>3 front-end developers (including myself)</li>
                <li>3 back-end developers</li>
                <li>Product manager</li>
                <li>Agile delivery model across multiple regions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Business Objectives */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Business Objectives"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />
          
          <div className={styles.contentBlock}>
            <p className={styles.blockText}>
              The transformation from offline to digital ordering represented a major operational leap. Success meant:
            </p>
            <ul className={styles.blockList}>
              <li>Enable <strong>self-service digital ordering</strong> for all customer segments</li>
              <li>Reduce dependency on field reps for order entry</li>
              <li>Eliminate pricing and data entry errors</li>
              <li>Create <strong>scalable infrastructure</strong> across all regions</li>
              <li>Support complex promotional logic without manual intervention</li>
              <li>Drive promotional participation and uptake</li>
              <li>Improve overall order volume and platform accessibility</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Understanding the Users */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Understanding the Users"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />
          
          <div className={styles.contentGrid}>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>Primary Users</h3>
              <ul className={styles.blockList}>
                <li><strong>Independent grocery store owners:</strong> Time-poor, often ordering from the shop floor</li>
                <li><strong>National chain buyers:</strong> High-volume orders, efficiency-focused</li>
                <li><strong>Specialty store operators:</strong> Niche product needs, promotional sensitivity</li>
              </ul>
            </div>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>Secondary Users</h3>
              <ul className={styles.blockList}>
                <li><strong>Sales representatives:</strong> Using the platform to assist key accounts and place orders on behalf of customers</li>
              </ul>
            </div>
          </div>

          <div className={styles.contentBlock}>
            <h3 className={styles.blockTitle}>Key User Context</h3>
            <ul className={styles.blockList}>
              <li>Extremely <strong>time-poor</strong>, often multitasking on the shop floor</li>
              <li>High proportion of <strong>repeat ordering behavior</strong></li>
              <li>Many English-as-a-second-language users</li>
              <li>Strong preference for <strong>immediately familiar interfaces</strong> over experimental designs</li>
              <li>Already comfortable with mainstream online grocery shopping (Coles, Woolworths)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Research & Discovery */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Research & Discovery"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />
          
          <div className={styles.contentBlock}>
            <p className={styles.blockText}>
              To understand realities across different regions and user types, I employed multiple research methods:
            </p>
            <ul className={styles.blockList}>
              <li><strong>User interviews</strong> with store owners and operators</li>
              <li><strong>Task shadowing</strong> in retail environments</li>
              <li><strong>Internal stakeholder interviews</strong> with sales reps and regional managers</li>
              <li><strong>Legacy workflow audits</strong> to map existing processes</li>
              <li><strong>Surveys</strong> to gather broader feedback</li>
              <li><strong>Sandbox testing</strong> with stakeholder groups pre-launch</li>
              <li><strong>Usage analytics and logging</strong> post-launch for continuous refinement</li>
            </ul>
          </div>

          <div className={styles.insightsSection}>
            <h3 className={styles.insightsTitle}>What We Learned</h3>
            <p className={styles.blockText}>
              A consistent message surfaced across all research: users were not concerned about beautiful visuals or innovative interactions. They cared about <strong>speed, clarity, and access</strong>.
            </p>
            <p className={styles.blockText} style={{ fontStyle: 'italic', fontSize: '1.1rem', color: '#ccc' }}>
              &quot;Let me place accurate orders quickly, and show me what discounts or promos I qualify for.&quot;
            </p>
          </div>

          <div className={styles.insightsSection}>
            <h3 className={styles.insightsTitle}>Key Insights</h3>
            <div className={styles.insightsList}>
              <div className={styles.insight}>
                <span className={styles.insightBullet}>•</span>
                <p className={styles.insightText}>
                  <strong>Familiarity matters:</strong> Users already shop on mainstream grocer platforms—leverage those mental models
                </p>
              </div>
              <div className={styles.insight}>
                <span className={styles.insightBullet}>•</span>
                <p className={styles.insightText}>
                  <strong>Promotional visibility drives behavior:</strong> Seeing discounts and tier progress directly influenced purchasing decisions
                </p>
              </div>
              <div className={styles.insight}>
                <span className={styles.insightBullet}>•</span>
                <p className={styles.insightText}>
                  <strong>Time efficiency over ornamentation:</strong> Workflow speed was valued far above aesthetic polish
                </p>
              </div>
              <div className={styles.insight}>
                <span className={styles.insightBullet}>•</span>
                <p className={styles.insightText}>
                  <strong>Repeat patterns are consistent:</strong> Order templates would save significant time for the majority of users
                </p>
              </div>
              <div className={styles.insight}>
                <span className={styles.insightBullet}>•</span>
                <p className={styles.insightText}>
                  <strong>Mobile and tablet are critical:</strong> Many customers order while physically in their store
                </p>
              </div>
              <div className={styles.insight}>
                <span className={styles.insightBullet}>•</span>
                <p className={styles.insightText}>
                  <strong>Multilingual support enables adoption:</strong> Reduced training friction and increased confidence
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Defining the Experience */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Defining the Experience"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />
          
          <div className={styles.contentBlock}>
            <p className={styles.blockText}>
              The UX strategy was built around two core pillars:
            </p>
          </div>

          <div className={styles.contentGrid}>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>1. Follow Mental Models Users Already Know</h3>
              <p className={styles.blockText}>
                We intentionally designed flows that resembled <strong>Coles and Woolworths online shopping experiences</strong>. This meant users could focus on accomplishing tasks rather than learning new patterns or interface conventions.
              </p>
            </div>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>2. Make Complex Business Logic Feel Simple</h3>
              <p className={styles.blockText}>
                Behind the familiar interface sat sophisticated multi-region catalog management, dynamic promotional tiers, and complex pricing structures. The UX needed to <strong>expose only what users needed, when they needed it</strong>.
              </p>
            </div>
          </div>

          <div className={styles.contentBlock}>
            <p className={styles.blockText}>
              The result: navigation models, page structures, and product layouts that felt immediately familiar, but supported far more sophisticated back-end logic than typical consumer platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features & Functionality */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Core Features & Functionality"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />
          
          <div className={styles.contentGrid}>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>Catalog & Product Management</h3>
              <ul className={styles.blockList}>
                <li>Multi-region product catalogs with region-specific availability</li>
                <li>Region-based pricing and promotional logic</li>
                <li>Live stock visibility across warehouses</li>
                <li>Multi-language support for product information</li>
              </ul>
            </div>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>Ordering Experience</h3>
              <ul className={styles.blockList}>
                <li>High-density cart UI to view more line items at once</li>
                <li>Saved orders and comprehensive order history</li>
                <li>Edit and cancel flows for existing orders</li>
                <li>Dynamic homepage promotions tailored to user segments</li>
              </ul>
            </div>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>Promotional System</h3>
              <ul className={styles.blockList}>
                <li><strong>Custom promotional selector:</strong> One of the most impactful features—users could combine multiple SKUs within a promo family to hit thresholds without rep intervention</li>
                <li>Promotional tier visual system showing progress toward discounts</li>
                <li>Mix-and-match promotional selection components</li>
                <li>Clear promotional tagging throughout the catalog</li>
              </ul>
            </div>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>Multi-Device Support</h3>
              <ul className={styles.blockList}>
                <li>Fully responsive desktop, tablet, and mobile layouts</li>
                <li>Optimized for on-the-floor ordering scenarios</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Information Architecture */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Information Architecture"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />
          
          <div className={styles.contentBlock}>
            <h3 className={styles.blockTitle}>Core User Flows</h3>
            <ul className={styles.blockList}>
              <li><strong>Home:</strong> Dynamic promotions and quick reorder access</li>
              <li><strong>Browse:</strong> Category navigation with filtering</li>
              <li><strong>Search:</strong> Fast product lookup</li>
              <li><strong>Product Pages:</strong> Detailed information with promotional context</li>
              <li><strong>Cart:</strong> High-density view with inline editing</li>
              <li><strong>Checkout:</strong> Streamlined order completion</li>
              <li><strong>Order History:</strong> Full order archive with reorder functionality</li>
              <li><strong>Saved Orders:</strong> Template-based repeat ordering</li>
              <li><strong>Account:</strong> Profile and preferences</li>
              <li><strong>Language Settings:</strong> Seamless language switching</li>
            </ul>
          </div>

          <div className={styles.contentBlock}>
            <h3 className={styles.blockTitle}>Supporting Pages</h3>
            <ul className={styles.blockList}>
              <li>New arrivals</li>
              <li>Brand browsing</li>
              <li>Promotional banners</li>
            </ul>
            <p className={styles.blockText} style={{ marginTop: '16px', fontStyle: 'italic', color: '#aaa' }}>
              These were nice-to-have features but not critical to the core ordering workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Design Direction */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Visual Design Direction"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />
          
          <div className={styles.contentBlock}>
            <h3 className={styles.blockTitle}>Design Principles</h3>
            <p className={styles.blockText}>
              The visual goal was <strong>commercial and clean</strong>—professional enough for enterprise buyers, but familiar enough to feel approachable.
            </p>
            <p className={styles.blockText}>
              We used <strong>Ng Zorro</strong> as a component foundation but created custom styling and UX patterns where necessary, particularly around:
            </p>
            <ul className={styles.blockList}>
              <li>Promotional tags and tier indicators</li>
              <li>Cart density and line item display</li>
              <li>Multi-select promotional components</li>
            </ul>
          </div>

          <div className={styles.contentBlock}>
            <h3 className={styles.blockTitle}>Intentional Density</h3>
            <p className={styles.blockText}>
              The UI is intentionally more compact than typical consumer e-commerce. Users can see significantly more line items at once, which helps large wholesale buyers build orders quickly without excessive scrolling.
            </p>
            <p className={styles.blockText}>
              This decision came directly from research: <strong>time-poor users valued information density over whitespace</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Collaboration & Complexity */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Technical Collaboration & Complexity"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />
          
          <div className={styles.contentBlock}>
            <p className={styles.blockText}>
              SalesIQ required tight collaboration between design and engineering. The platform needed to function differently across regions while maintaining a unified experience.
            </p>
          </div>

          <div className={styles.contentBlock}>
            <h3 className={styles.blockTitle}>Technical Challenges</h3>
            <ul className={styles.blockList}>
              <li><strong>Regional variation:</strong> Each region had different promotional rules, pricing structures, and product availability</li>
              <li><strong>Evolving requirements:</strong> Data structures evolved while business requirements were still being discovered</li>
              <li><strong>Multi-language complexity:</strong> Interface translation plus right-to-left considerations</li>
              <li><strong>Performance:</strong> Heavy data payloads from comprehensive product catalogs</li>
              <li><strong>Distributed architecture:</strong> Backend services were region-hosted, but master data lived in Australia</li>
            </ul>
          </div>

          <div className={styles.contentBlock}>
            <h3 className={styles.blockTitle}>Our Approach</h3>
            <ul className={styles.blockList}>
              <li>Dynamic data handling to support regional variation without code duplication</li>
              <li>Global yet flexible design patterns that could adapt to local needs</li>
              <li>Reusable visual components that maintained consistency across regions</li>
              <li>Ongoing performance optimization to handle large catalogs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Overcoming Challenges */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Overcoming Challenges"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />
          
          <div className={styles.contentGrid}>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>Promotional rule diversity</h3>
              <p className={styles.blockText}>
                Each region operated different promotional structures. We created a <strong>flexible visual system</strong> that could represent various tier types and discount models without requiring region-specific UI.
              </p>
            </div>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>Data structure evolution</h3>
              <p className={styles.blockText}>
                Requirements were discovered during development. We stayed agile, iterating on both backend and frontend simultaneously rather than following rigid waterfall phases.
              </p>
            </div>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>Unexpected global rollout</h3>
              <p className={styles.blockText}>
                What started as a single-region pilot became a global platform faster than anticipated. This increased maintenance load but validated our architectural decisions.
              </p>
            </div>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>Small team, global support</h3>
              <p className={styles.blockText}>
                We handled internal support and training across multiple time zones with a lean team, requiring clear documentation and intuitive design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results & Impact */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Results & Impact"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />
          
          <div className={styles.contentBlock}>
            <p className={styles.blockText}>
              SalesIQ became the core ordering tool for Oriental Merchant&apos;s global operations, delivering measurable value across multiple dimensions:
            </p>
          </div>

          <div className={styles.contentBlock}>
            <h3 className={styles.blockTitle}>Business Outcomes</h3>
            <ul className={styles.blockList}>
              <li><strong>Significant online revenue growth</strong><br />
                <span style={{ fontStyle: 'italic', color: '#aaa', fontSize: '0.95rem' }}>
                  Example: Netherlands grew from approximately $400K to $1.9M in one year following adoption
                </span>
              </li>
              <li><strong>Reduced rep workload:</strong> Field reps freed from order entry to focus on relationship building and sales expansion</li>
              <li><strong>Higher promotional participation:</strong> Clear visibility drove increased engagement with promotional offers</li>
              <li><strong>Increased order accuracy:</strong> Eliminated miscommunication and manual entry errors</li>
              <li><strong>Faster ordering cycles:</strong> Saved orders and history dramatically reduced repeat order time</li>
              <li><strong>Improved customer satisfaction:</strong> Positive feedback from both independent grocers and major chains</li>
            </ul>
          </div>

          <div className={styles.contentBlock}>
            <h3 className={styles.blockTitle}>External Validation</h3>
            <p className={styles.blockText}>
              External QA feedback specifically noted that the new UI was <strong>professional and polished</strong>. This was deeply validating because we were a young internal team building an enterprise-level product that competed with established B2B platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Key Learnings */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Key Learnings"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />
          
          <div className={styles.contentBlock}>
            <p className={styles.blockText}>
              Looking back, the team made strong decisions with limited future context. The platform scaled far beyond original expectations, which validated our early architectural and UX choices.
            </p>
          </div>

          <div className={styles.contentGrid}>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>What Worked</h3>
              <ul className={styles.blockList}>
                <li><strong>Familiar mental models:</strong> Leveraging existing shopping patterns accelerated adoption and reduced training needs</li>
                <li><strong>Promotional visibility:</strong> Making discounts and tier progress clear directly influenced purchasing behavior</li>
                <li><strong>High-density UI:</strong> Information-rich layouts served wholesale buyers better than spacious consumer designs</li>
                <li><strong>Multi-device support:</strong> Tablet and mobile ordering from the shop floor became heavily used scenarios</li>
              </ul>
            </div>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>What Could Have Been Better</h3>
              <ul className={styles.blockList}>
                <li><strong>Promotional data standardization:</strong> Standardizing promotional data structures earlier would have prevented downstream maintenance complexity</li>
                <li><strong>Feature prioritization:</strong> Some features saw little use (promotional banners, bulk upload). More ruthless prioritization would have been valuable</li>
                <li><strong>Visual restraint:</strong> A more utilitarian visual direction might have been sufficient, since users valued workflow speed above aesthetic polish</li>
                <li><strong>Backend performance:</strong> Pushing harder for faster backend responses would have improved perceived platform performance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What I Would Do Differently */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="What I Would Do Differently"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />
          
          <div className={styles.contentBlock}>
            <p className={styles.blockText}>
              Given another opportunity, I would:
            </p>
            <ol className={styles.blockList} style={{ listStyleType: 'decimal', paddingLeft: '24px' }}>
              <li><strong>Define strict promotional data structures before development</strong> to avoid technical debt</li>
              <li><strong>Reduce scope of low-value features</strong> identified through early analytics</li>
              <li><strong>Bias even harder toward repeat-order workflows</strong> since they represented the majority use case</li>
              <li><strong>Push for faster backend response times</strong> to improve perceived performance</li>
              <li><strong>Build more comprehensive design documentation</strong> to support the unexpected global rollout</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Future Opportunities */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Future Opportunities"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />
          
          <div className={styles.contentBlock}>
            <p className={styles.blockText}>
              Potential directions for continued platform evolution:
            </p>
            <ul className={styles.blockList}>
              <li><strong>Streamlined onboarding:</strong> Reduce dependency on development team for new customer setup</li>
              <li><strong>Continued performance optimization:</strong> Particularly for large catalog loading</li>
              <li><strong>Intelligent reorder suggestions:</strong> Machine learning-based recommendations from order history</li>
              <li><strong>Simplified promotional management:</strong> Self-service tools for regional teams to configure promotions</li>
              <li><strong>Region-level configuration:</strong> Enable regional customization without engineering involvement</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Conclusion"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />
          
          <div className={styles.contentBlock}>
            <p className={styles.blockText}>
              SalesIQ transformed Oriental Merchant&apos;s global ordering operations from an entirely offline process to a scalable digital platform serving customers across five countries. By prioritizing <strong>familiar patterns, clear promotional visibility, and workflow efficiency</strong> over visual experimentation, we created a tool that served both small independent grocers and major national chains.
            </p>
            <p className={styles.blockText}>
              The project reinforced a fundamental UX principle: <strong>understanding user context and mental models matters far more than interface innovation for its own sake</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Interested in working together?</h2>
            <p className={styles.ctaText}>
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/contact" className={styles.ctaButton}>
                Get in Touch
              </Link>
              <Link href="/" className={styles.ctaButtonSecondary}>
                View Other Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
