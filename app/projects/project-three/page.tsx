'use client'

import { useRef } from 'react'
import Link from 'next/link'
import ScrollRevealText from '../../../components/ScrollRevealText'
import styles from './case-study.module.css'

export default function ProjectThreeCaseStudy() {
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
              text="SaaS Design System & Component Library"
              fontSize="clamp(2.5rem, 5vw, 4.5rem)"
              fontWeight={300}
              lineHeight={1.1}
              letterSpacing="-0.02em"
              className={styles.heroTitle}
            />
            <div className={styles.heroMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Client</span>
                <span className={styles.metaValue}>B2B SaaS Platform</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Role</span>
                <span className={styles.metaValue}>Lead Design Systems Designer</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Timeline</span>
                <span className={styles.metaValue}>8 months</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Year</span>
                <span className={styles.metaValue}>2023-2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Context Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Context"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />
          <div className={styles.contentGrid}>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>Who is this for</h3>
              <p className={styles.blockText}>
                12+ product teams building features in parallel. Frontend developers who need 
                reusable components. Designers who need consistency. End users who deserve 
                cohesive experiences across products.
              </p>
            </div>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>What was broken</h3>
              <p className={styles.blockText}>
                Rapid growth led to inconsistent UI patterns across teams. Designers reinvented 
                components. Developers duplicated code. 47 unique button variants existed for 
                8 actual use cases. Accessibility standards varied wildly.
              </p>
            </div>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>Why I was asked</h3>
              <p className={styles.blockText}>
                Development velocity was slowing. Teams spent 30% of sprint time rebuilding 
                components that existed elsewhere. Design-to-dev handoff was inefficient. 
                Design debt was accumulating faster than feature velocity.
              </p>
            </div>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>Constraints</h3>
              <p className={styles.blockText}>
                Needed to work with existing tech stack (React/TypeScript). Couldn&apos;t break 
                production features during migration. Limited design system team (2 people). 
                8-month timeline with ongoing feature work. Needed to gain buy-in from 12 teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Definition */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Business + User Problem"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />
          
          <div className={styles.problemGrid}>
            <div className={styles.problemCard}>
              <h3 className={styles.problemTitle}>Business Problem</h3>
              <p className={styles.problemText}>
                Development velocity declining. Teams spending 15-20 hours per sprint rebuilding 
                components. Design debt accumulating. Unable to scale design efficiently.
              </p>
            </div>
            <div className={styles.problemCard}>
              <h3 className={styles.problemTitle}>User Problem</h3>
              <p className={styles.problemText}>
                Inconsistent experiences across products. Users noticed variability and questioned 
                product quality. Some features accessible, others not. No predictability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hypothesis */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Hypothesis"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />
          
          <div className={styles.hypothesisCard}>
            <p className={styles.hypothesisText}>
              <strong>Creating a comprehensive design system with reusable components + 
              clear documentation + developer-friendly APIs will increase development velocity 
              by 50% and reduce design debt by 80% within 6 months.</strong>
            </p>
            <p className={styles.hypothesisSubtext}>
              Our bet: Make using the system easier than building custom components. 
              Consistency comes from shared tools, not shared meetings.
            </p>
          </div>
        </div>
      </section>

      {/* Research */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Research"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />
          
          <div className={styles.researchContent}>
            <div className={styles.researchMethods}>
              <div className={styles.methodCard}>
                <h4 className={styles.methodTitle}>Design Audit</h4>
                <p className={styles.methodDetails}>200+ screens analyzed</p>
                <p className={styles.methodDescription}>
                  Cataloged all UI patterns. Found 47 button variants, 23 input styles, 
                  inconsistent spacing systems.
                </p>
              </div>
              <div className={styles.methodCard}>
                <h4 className={styles.methodTitle}>Developer Interviews</h4>
                <p className={styles.methodDetails}>15 sessions • 8 teams</p>
                <p className={styles.methodDescription}>
                  Understood component usage patterns, pain points with current implementations, 
                  ideal API structures.
                </p>
              </div>
              <div className={styles.methodCard}>
                <h4 className={styles.methodTitle}>Designer Workshops</h4>
                <p className={styles.methodDetails}>6 workshops • 24 designers</p>
                <p className={styles.methodDescription}>
                  Aligned on visual language, established design principles, created shared 
                  understanding of component behaviors.
                </p>
              </div>
              <div className={styles.methodCard}>
                <h4 className={styles.methodTitle}>Competitive Analysis</h4>
                <p className={styles.methodDetails}>12 design systems studied</p>
                <p className={styles.methodDescription}>
                  Analyzed Material Design, Ant Design, Carbon, others. Learned best practices 
                  for documentation, component architecture, tooling.
                </p>
              </div>
            </div>

            <div className={styles.insightsSection}>
              <h3 className={styles.insightsTitle}>Key Insights</h3>
              <div className={styles.insightsList}>
                <div className={styles.insight}>
                  <span className={styles.insightBullet}>•</span>
                  <p className={styles.insightText}>
                    <strong>47 unique button variants</strong> existed, but only 8 distinct 
                    use cases were needed. Teams were reinventing instead of reusing.
                  </p>
                </div>
                <div className={styles.insight}>
                  <span className={styles.insightBullet}>•</span>
                  <p className={styles.insightText}>
                    Developers spent <strong>15-20 hours per sprint</strong> building components 
                    that already existed elsewhere because they couldn&apos;t find them.
                  </p>
                </div>
                <div className={styles.insight}>
                  <span className={styles.insightBullet}>•</span>
                  <p className={styles.insightText}>
                    <strong>89% of designers</strong> wanted centralized components but lacked 
                    time to maintain them. Need for system was clear, adoption was the challenge.
                  </p>
                </div>
                <div className={styles.insight}>
                  <span className={styles.insightBullet}>•</span>
                  <p className={styles.insightText}>
                    Component complexity varied by <strong>300%</strong> for similar patterns. 
                    No shared standards meant inconsistent quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Reframing */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Problem Reframing"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />
          
          <div className={styles.reframeCard}>
            <p className={styles.reframeText}>
              <strong>Original assumption:</strong> Teams needed better design guidelines 
              and more design reviews to enforce consistency.
            </p>
            <p className={styles.reframeText}>
              <strong>Reality:</strong> Teams needed tools that made consistency easier than 
              inconsistency. Guidelines weren&apos;t enough—they needed components they could use 
              immediately. Documentation was critical for discoverability.
            </p>
            <p className={styles.reframeText}>
              <strong>Pivot:</strong> Focused on building developer-friendly components with 
              excellent documentation rather than just design guidelines. Made the system 
              easier to use than building custom components.
            </p>
          </div>
        </div>
      </section>

      {/* Design Options + Rationale */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Design Options + Decision Rationale"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />

          <div className={styles.decisionGrid}>
            <div className={styles.decisionCard}>
              <h3 className={styles.decisionTitle}>Component Architecture: Atomic vs Composed</h3>
              <div className={styles.decisionOptions}>
                <div className={styles.option}>
                  <span className={styles.optionLabel}>Option A:</span>
                  <span className={styles.optionText}>Start with complex composed components</span>
                </div>
                <div className={styles.option}>
                  <span className={styles.optionLabel}>Option B:</span>
                  <span className={styles.optionText}>Build atomic components first, then compose</span>
                </div>
              </div>
              <p className={styles.decisionRationale}>
                <strong>Chose B.</strong> Atomic approach allowed teams to adopt incrementally. 
                Could use Button while we built Form. Testing showed faster adoption (6 weeks vs 
                12 weeks) with atomic-first approach. Trade-off: More components to maintain, 
                but greater flexibility.
              </p>
            </div>

            <div className={styles.decisionCard}>
              <h3 className={styles.decisionTitle}>Documentation: Static Site vs Interactive</h3>
              <div className={styles.decisionOptions}>
                <div className={styles.option}>
                  <span className={styles.optionLabel}>Option A:</span>
                  <span className={styles.optionText}>Static documentation site</span>
                </div>
                <div className={styles.option}>
                  <span className={styles.optionLabel}>Option B:</span>
                  <span className={styles.optionText}>Interactive Storybook-style documentation</span>
                </div>
              </div>
              <p className={styles.decisionRationale}>
                <strong>Chose B.</strong> Interactive documentation with live examples reduced 
                questions by 85%. Developers could see components in action before implementing. 
                Trade-off: Higher initial build cost, but massive time savings in support.
              </p>
            </div>

            <div className={styles.decisionCard}>
              <h3 className={styles.decisionTitle}>Design Tokens: Hard-Coded vs Semantic</h3>
              <div className={styles.decisionOptions}>
                <div className={styles.option}>
                  <span className={styles.optionLabel}>Option A:</span>
                  <span className={styles.optionText}>Direct color/spacing values</span>
                </div>
                <div className={styles.option}>
                  <span className={styles.optionLabel}>Option B:</span>
                  <span className={styles.optionText}>Semantic tokens (primary, secondary, etc.)</span>
                </div>
              </div>
              <p className={styles.decisionRationale}>
                <strong>Chose B.</strong> Semantic tokens enabled theming and future flexibility. 
                Could change primary color globally without touching components. Testing showed 
                semantic tokens reduced maintenance by 60%. Trade-off: More abstraction, but 
                better scalability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Solution */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Final Solution"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />

          <div className={styles.solutionsGrid}>
            <div className={styles.solutionCard}>
              <div className={styles.solutionVisual}>
                <div className={styles.visualPlaceholder}>
                  <span className={styles.visualLabel}>Design Tokens System</span>
                </div>
              </div>
              <div className={styles.solutionContent}>
                <h3 className={styles.solutionTitle}>Unified Design Tokens</h3>
                <p className={styles.solutionText}>
                  Comprehensive token system covering colors, typography, spacing, shadows, motion. 
                  Semantic tokens support theming and accessibility. Changes propagate automatically.
                </p>
                <p className={styles.solutionCaption}>
                  <strong>Function:</strong> Standardize values → enable consistency → 
                  reduce design debt
                </p>
              </div>
            </div>

            <div className={styles.solutionCard}>
              <div className={styles.solutionVisual}>
                <div className={styles.visualPlaceholder}>
                  <span className={styles.visualLabel}>Component Library</span>
                </div>
              </div>
              <div className={styles.solutionContent}>
                <h3 className={styles.solutionTitle}>Reusable Component Library</h3>
                <p className={styles.solutionText}>
                  Built 60+ reusable components from atoms to complex patterns. Each includes 
                  variants, states, accessibility features. Implemented in React with TypeScript.
                </p>
                <p className={styles.solutionCaption}>
                  <strong>Function:</strong> Provide building blocks → reduce duplication → 
                  accelerate development
                </p>
              </div>
            </div>

            <div className={styles.solutionCard}>
              <div className={styles.solutionVisual}>
                <div className={styles.visualPlaceholder}>
                  <span className={styles.visualLabel}>Documentation Site</span>
                </div>
              </div>
              <div className={styles.solutionContent}>
                <h3 className={styles.solutionTitle}>Comprehensive Documentation</h3>
                <p className={styles.solutionText}>
                  Interactive documentation site with live component examples, code snippets, 
                  usage guidelines, best practices. Easy discovery and implementation.
                </p>
                <p className={styles.solutionCaption}>
                  <strong>Function:</strong> Enable discovery → reduce questions → 
                  improve adoption
                </p>
              </div>
            </div>

            <div className={styles.solutionCard}>
              <div className={styles.solutionVisual}>
                <div className={styles.visualPlaceholder}>
                  <span className={styles.visualLabel}>Figma Integration</span>
                </div>
              </div>
              <div className={styles.solutionContent}>
                <h3 className={styles.solutionTitle}>Design-Dev Handoff</h3>
                <p className={styles.solutionText}>
                  Built Figma plugins and workflows ensuring design specs match code. Established 
                  clear handoff processes reducing back-and-forth.
                </p>
                <p className={styles.solutionCaption}>
                  <strong>Function:</strong> Align design and code → reduce handoff friction → 
                  improve quality
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Validation */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Validation"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />

          <div className={styles.validationGrid}>
            <div className={styles.validationCard}>
              <h3 className={styles.validationTitle}>Quantitative</h3>
              <div className={styles.validationList}>
                <div className={styles.validationItem}>
                  <span className={styles.validationMetric}>52%</span>
                  <span className={styles.validationLabel}>faster development velocity</span>
                </div>
                <div className={styles.validationItem}>
                  <span className={styles.validationMetric}>18 hrs</span>
                  <span className={styles.validationLabel}>saved per sprint per team</span>
                </div>
                <div className={styles.validationItem}>
                  <span className={styles.validationMetric}>95%</span>
                  <span className={styles.validationLabel}>WCAG AA compliance</span>
                </div>
                <div className={styles.validationItem}>
                  <span className={styles.validationMetric}>12 teams</span>
                  <span className={styles.validationLabel}>adopted within 6 months</span>
                </div>
              </div>
            </div>
            <div className={styles.validationCard}>
              <h3 className={styles.validationTitle}>Qualitative</h3>
              <div className={styles.validationQuotes}>
                <p className={styles.quote}>
                  &quot;I can ship features faster now. No more rebuilding buttons.&quot;
                </p>
                <p className={styles.quote}>
                  &quot;Documentation is actually useful. I can find what I need in seconds.&quot;
                </p>
                <p className={styles.quote}>
                  &quot;Finally, consistent experiences across all our products.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Outcome"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />

          <div className={styles.outcomeCard}>
            <p className={styles.outcomeText}>
              <strong>Original problem:</strong> Development velocity declining, teams spending 
              15-20 hours per sprint rebuilding components, design debt accumulating, inconsistent 
              user experiences.
            </p>
            <p className={styles.outcomeText}>
              <strong>Result:</strong> Development velocity increased 52%. Teams saved 18 hours 
              per sprint. All 12 teams adopted system within 6 months. 95% WCAG AA compliance 
              across all products. Design-to-dev handoff reduced by 50%.
            </p>
            <p className={styles.outcomeText}>
              <strong>Business impact:</strong> Enabled scale without proportional design/engineering 
              growth. Reduced maintenance burden. Improved product quality through consistency.
            </p>
          </div>
        </div>
      </section>

      {/* Reflection */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ScrollRevealText
            text="Reflection"
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={300}
            className={styles.sectionTitle}
          />

          <div className={styles.reflectionContent}>
            <div className={styles.reflectionCard}>
              <h3 className={styles.reflectionTitle}>What Worked</h3>
              <p className={styles.reflectionText}>
                Making the system easier to use than building custom components drove adoption. 
                Excellent documentation was essential—good components with bad docs don&apos;t get used. 
                Starting with atomic components allowed incremental adoption.
              </p>
            </div>
            <div className={styles.reflectionCard}>
              <h3 className={styles.reflectionTitle}>What I&apos;d Change</h3>
              <p className={styles.reflectionText}>
                Should have involved engineering earlier in token system design. Some API decisions 
                required refactoring later. Would have saved 3 weeks with better collaboration upfront. 
                Also should have created migration tooling to accelerate adoption.
              </p>
            </div>
            <div className={styles.reflectionCard}>
              <h3 className={styles.reflectionTitle}>What&apos;s Next</h3>
              <p className={styles.reflectionText}>
                Analytics show some components are underutilized. Need to improve discoverability 
                and add more examples. Also evaluating automated accessibility testing in CI/CD 
                pipeline to catch regressions early.
              </p>
            </div>
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
