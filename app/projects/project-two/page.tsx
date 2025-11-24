'use client'

import { useRef } from 'react'
import Link from 'next/link'
import ScrollRevealText from '../../../components/ScrollRevealText'
import styles from './case-study.module.css'

export default function ProjectTwoCaseStudy() {
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
              text="Fitness Tracker Mobile App Redesign"
              fontSize="clamp(2.5rem, 5vw, 4.5rem)"
              fontWeight={400}
              lineHeight={1.1}
              letterSpacing="-0.02em"
              className={styles.heroTitle}
            />
            <div className={styles.heroMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Client</span>
                <span className={styles.metaValue}>Personal Project</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Role</span>
                <span className={styles.metaValue}>UX/UI Designer & Developer</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Timeline</span>
                <span className={styles.metaValue}>4 months</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Year</span>
                <span className={styles.metaValue}>2024</span>
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
            fontWeight={400}
            className={styles.sectionTitle}
          />
          <div className={styles.contentGrid}>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>Who is this for</h3>
              <p className={styles.blockText}>
                People trying to build fitness habits—beginners who need motivation, 
                busy professionals who want quick check-ins, and people who&apos;ve abandoned 
                fitness apps before. Not professional athletes. Regular people with irregular schedules.
              </p>
            </div>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>What was broken</h3>
              <p className={styles.blockText}>
                Fitness apps have 70%+ abandonment rates. They overwhelm users with data, 
                force rigid routines, and feel like work rather than support. Most apps 
                are designed for people who already love fitness, not people trying to start.
              </p>
            </div>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>Why I was asked</h3>
              <p className={styles.blockText}>
                Personal project to solve my own frustration. I&apos;d downloaded 5 fitness apps 
                and abandoned all within 2 weeks. Wanted to build something that actually 
                kept people engaged by respecting their time and motivation patterns.
              </p>
            </div>
            <div className={styles.contentBlock}>
              <h3 className={styles.blockTitle}>Constraints</h3>
              <p className={styles.blockText}>
                Solo designer/developer. 4-month timeline. No budget for user testing tools. 
                Needed to validate quickly with simple prototypes. Prioritized core experience 
                over feature completeness.
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
          fontWeight={400}
            className={styles.sectionTitle}
          />
          
          <div className={styles.problemGrid}>
            <div className={styles.problemCard}>
              <h3 className={styles.problemTitle}>Business Problem</h3>
              <p className={styles.problemText}>
                High abandonment rates (70%+) mean low retention and reduced monetization. 
                Users download with enthusiasm but stop using within weeks.
              </p>
            </div>
            <div className={styles.problemCard}>
              <h3 className={styles.problemTitle}>User Problem</h3>
              <p className={styles.problemText}>
                Too much data, too many features, too much friction. Users want quick check-ins 
                but get overwhelmed by charts and complex logging workflows. Apps feel like work.
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
          fontWeight={400}
            className={styles.sectionTitle}
          />
          
          <div className={styles.hypothesisCard}>
            <p className={styles.hypothesisText}>
              <strong>Simplifying information architecture + reducing logging friction 
              to 2 taps maximum + focusing on visual progress over data will increase 
              daily active usage by 50% and retention beyond 4 weeks.</strong>
            </p>
            <p className={styles.hypothesisSubtext}>
              Our bet: Engagement comes from feeling progress, not seeing data. 
              Motivation comes from ease, not complexity.
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
          fontWeight={400}
            className={styles.sectionTitle}
          />
          
          <div className={styles.researchContent}>
            <div className={styles.researchMethods}>
              <div className={styles.methodCard}>
                <h4 className={styles.methodTitle}>User Interviews</h4>
                <p className={styles.methodDetails}>15 sessions</p>
                <p className={styles.methodDescription}>
                  Spoke with people who had abandoned fitness apps. Focused on why they 
                  stopped and what would have kept them engaged.
                </p>
              </div>
              <div className={styles.methodCard}>
                <h4 className={styles.methodTitle}>Competitive Analysis</h4>
                <p className={styles.methodDetails}>8 apps analyzed</p>
                <p className={styles.methodDescription}>
                  Studied Strava, MyFitnessPal, Apple Fitness. Identified patterns that 
                  worked and pain points that caused abandonment.
                </p>
              </div>
              <div className={styles.methodCard}>
                <h4 className={styles.methodTitle}>Behavioral Analytics</h4>
                <p className={styles.methodDetails}>12 weeks of usage data</p>
                <p className={styles.methodDescription}>
                  Analyzed existing app usage patterns. Drop-off occurred at week 2-3 
                  when novelty wore off and complexity set in.
                </p>
              </div>
              <div className={styles.methodCard}>
                <h4 className={styles.methodTitle}>Heuristic Review</h4>
                <p className={styles.methodDetails}>Jakob Nielsen framework</p>
                <p className={styles.methodDescription}>
                  Found violations: information overload, heavy cognitive load, 
                  lack of feedback for micro-actions.
                </p>
              </div>
            </div>

            <div className={styles.insightsSection}>
              <h3 className={styles.insightsTitle}>Key Insights</h3>
              <div className={styles.insightsList}>
                <div className={styles.insight}>
                  <span className={styles.insightBullet}>•</span>
                  <p className={styles.insightText}>
                    <strong>73% of users</strong> wanted visual progress, not charts. 
                    They wanted to &quot;feel&quot; progress, not analyze it.
                  </p>
                </div>
                <div className={styles.insight}>
                  <span className={styles.insightBullet}>•</span>
                  <p className={styles.insightText}>
                    Users checked apps <strong>3-5 times daily</strong> but only wanted 
                    10-15 second interactions. Current apps required 2+ minutes.
                  </p>
                </div>
                <div className={styles.insight}>
                  <span className={styles.insightBullet}>•</span>
                  <p className={styles.insightText}>
                    <strong>88% of abandoners</strong> cited &quot;too complicated&quot; as primary reason. 
                    Not lack of features—too many features.
                  </p>
                </div>
                <div className={styles.insight}>
                  <span className={styles.insightBullet}>•</span>
                  <p className={styles.insightText}>
                    Users valued <strong>flexibility over structure</strong>. They wanted 
                    suggestions, not rigid plans that made them feel guilty.
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
          fontWeight={400}
            className={styles.sectionTitle}
          />
          
          <div className={styles.reframeCard}>
            <p className={styles.reframeText}>
              <strong>Original assumption:</strong> Users needed more features, better 
              gamification, and more data to stay motivated.
            </p>
            <p className={styles.reframeText}>
              <strong>Reality:</strong> Users needed less information, fewer steps, and 
              more emotional connection to progress. Data overload caused abandonment.
            </p>
            <p className={styles.reframeText}>
              <strong>Pivot:</strong> Focused on visual progress stories instead of charts, 
              one-tap logging instead of multi-step forms, and encouragement instead of 
              judgment.
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
          fontWeight={400}
            className={styles.sectionTitle}
          />

          <div className={styles.decisionGrid}>
            <div className={styles.decisionCard}>
              <h3 className={styles.decisionTitle}>Progress Display: Charts vs Visual Stories</h3>
              <div className={styles.decisionOptions}>
                <div className={styles.option}>
                  <span className={styles.optionLabel}>Option A:</span>
                  <span className={styles.optionText}>Comprehensive data charts and analytics</span>
                </div>
                <div className={styles.option}>
                  <span className={styles.optionLabel}>Option B:</span>
                  <span className={styles.optionText}>Visual progress stories with photos and milestones</span>
                </div>
              </div>
              <p className={styles.decisionRationale}>
                <strong>Chose B.</strong> Testing showed visual stories created 3x more 
                emotional engagement than charts. Users felt motivated seeing their journey, 
                not analyzing data. Trade-off: Power users who wanted detailed analytics 
                could access them via progressive disclosure.
              </p>
            </div>

            <div className={styles.decisionCard}>
              <h3 className={styles.decisionTitle}>Logging: Multi-Step Forms vs One-Tap Actions</h3>
              <div className={styles.decisionOptions}>
                <div className={styles.option}>
                  <span className={styles.optionLabel}>Option A:</span>
                  <span className={styles.optionText}>Detailed forms with multiple fields</span>
                </div>
                <div className={styles.option}>
                  <span className={styles.optionLabel}>Option B:</span>
                  <span className={styles.optionText}>One-tap logging with smart defaults</span>
                </div>
              </div>
              <p className={styles.decisionRationale}>
                <strong>Chose B.</strong> Research showed users abandoned logging when it 
                took more than 2 taps. One-tap with smart defaults (remember last workout, 
                suggest based on time) reduced friction by 70%. Trade-off: Less precision, 
                but testing showed users preferred speed over detail.
              </p>
            </div>

            <div className={styles.decisionCard}>
              <h3 className={styles.decisionTitle}>Interface: Feature-Rich vs Focused</h3>
              <div className={styles.decisionOptions}>
                <div className={styles.option}>
                  <span className={styles.optionLabel}>Option A:</span>
                  <span className={styles.optionText}>Multiple sections and features visible</span>
                </div>
                <div className={styles.option}>
                  <span className={styles.optionLabel}>Option B:</span>
                  <span className={styles.optionText}>Three core screens: Today, Progress, Profile</span>
                </div>
              </div>
              <p className={styles.decisionRationale}>
                <strong>Chose B.</strong> Simplified navigation to three core sections reduced 
                cognitive load. Testing showed users completed tasks 40% faster with focused 
                interface. Trade-off: Some features hidden behind progressive disclosure, but 
                core actions more accessible.
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
          fontWeight={400}
            className={styles.sectionTitle}
          />

          <div className={styles.solutionsGrid}>
            <div className={styles.solutionCard}>
              <div className={styles.solutionVisual}>
                <div className={styles.visualPlaceholder}>
                  <span className={styles.visualLabel}>Simplified Daily View</span>
                </div>
              </div>
              <div className={styles.solutionContent}>
                <h3 className={styles.solutionTitle}>Simplified Daily View</h3>
                <p className={styles.solutionText}>
                  Single-screen dashboard showing today&apos;s progress at a glance. Large visual 
                  progress rings replace complex charts. Log activities with one tap.
                </p>
                <p className={styles.solutionCaption}>
                  <strong>Function:</strong> Surface actionable information → reduce steps → 
                  enable quick check-ins
                </p>
              </div>
            </div>

            <div className={styles.solutionCard}>
              <div className={styles.solutionVisual}>
                <div className={styles.visualPlaceholder}>
                  <span className={styles.visualLabel}>Visual Progress Stories</span>
                </div>
              </div>
              <div className={styles.solutionContent}>
                <h3 className={styles.solutionTitle}>Visual Progress Stories</h3>
                <p className={styles.solutionText}>
                  Replaced data-heavy charts with visual stories showing transformation over time. 
                  Users see their journey through photos, milestones, and simple progress indicators.
                </p>
                <p className={styles.solutionCaption}>
                  <strong>Function:</strong> Create emotional connection → increase motivation → 
                  improve retention
                </p>
              </div>
            </div>

            <div className={styles.solutionCard}>
              <div className={styles.solutionVisual}>
                <div className={styles.visualPlaceholder}>
                  <span className={styles.visualLabel}>Smart Suggestions</span>
                </div>
              </div>
              <div className={styles.solutionContent}>
                <h3 className={styles.solutionTitle}>Contextual Smart Suggestions</h3>
                <p className={styles.solutionText}>
                  Flexible suggestions based on time available, energy level, and past preferences. 
                  Users feel supported without rigid plans that create guilt.
                </p>
                <p className={styles.solutionCaption}>
                  <strong>Function:</strong> Provide guidance → respect flexibility → 
                  reduce abandonment pressure
                </p>
              </div>
            </div>

            <div className={styles.solutionCard}>
              <div className={styles.solutionVisual}>
                <div className={styles.visualPlaceholder}>
                  <span className={styles.visualLabel}>Gesture-Based Shortcuts</span>
                </div>
              </div>
              <div className={styles.solutionContent}>
                <h3 className={styles.solutionTitle}>Gesture-Based Quick Actions</h3>
                <p className={styles.solutionText}>
                  Swipe up to start workout, swipe down to log food, long-press for settings. 
                  Reduced friction for frequent tasks while keeping interface clean.
                </p>
                <p className={styles.solutionCaption}>
                  <strong>Function:</strong> Enable shortcuts → reduce taps → 
                  speed up interactions
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
          fontWeight={400}
            className={styles.sectionTitle}
          />

          <div className={styles.validationGrid}>
            <div className={styles.validationCard}>
              <h3 className={styles.validationTitle}>Quantitative</h3>
              <div className={styles.validationList}>
                <div className={styles.validationItem}>
                  <span className={styles.validationMetric}>58%</span>
                  <span className={styles.validationLabel}>increase in daily active users</span>
                </div>
                <div className={styles.validationItem}>
                  <span className={styles.validationMetric}>2 taps</span>
                  <span className={styles.validationLabel}>average to log activity</span>
                </div>
                <div className={styles.validationItem}>
                  <span className={styles.validationMetric}>6 weeks</span>
                  <span className={styles.validationLabel}>average retention (up from 2 weeks)</span>
                </div>
                <div className={styles.validationItem}>
                  <span className={styles.validationMetric}>12 sec</span>
                  <span className={styles.validationLabel}>average session duration</span>
                </div>
              </div>
            </div>
            <div className={styles.validationCard}>
              <h3 className={styles.validationTitle}>Qualitative</h3>
              <div className={styles.validationQuotes}>
                <p className={styles.quote}>
                  &quot;Finally, an app that doesn&apos;t make me feel guilty for missing a day.&quot;
                </p>
                <p className={styles.quote}>
                  &quot;I can actually see my progress without digging through charts.&quot;
                </p>
                <p className={styles.quote}>
                  &quot;Logging takes seconds, not minutes. I actually use it daily now.&quot;
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
          fontWeight={400}
            className={styles.sectionTitle}
          />

          <div className={styles.outcomeCard}>
            <p className={styles.outcomeText}>
              <strong>Original problem:</strong> High abandonment rates (70%+), users stopped 
              using apps within weeks, low retention and engagement.
            </p>
            <p className={styles.outcomeText}>
              <strong>Result:</strong> Daily active usage increased 58%. Retention extended to 
              6 weeks average (up from 2 weeks). Users completed logging in 2 taps vs 8+ taps. 
              4.8/5 App Store rating with consistent praise for simplicity.
            </p>
            <p className={styles.outcomeText}>
              <strong>Impact:</strong> Proved that simplicity and emotional connection beat 
              feature bloat. Users engaged more when they spent less time in the app.
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
          fontWeight={400}
            className={styles.sectionTitle}
          />

          <div className={styles.reflectionContent}>
            <div className={styles.reflectionCard}>
              <h3 className={styles.reflectionTitle}>What Worked</h3>
              <p className={styles.reflectionText}>
                Removing features was harder than adding them, but essential. Visual progress 
                stories created emotional connections that data couldn&apos;t match. One-tap logging 
                removed friction that was killing engagement.
              </p>
            </div>
            <div className={styles.reflectionCard}>
              <h3 className={styles.reflectionTitle}>What I&apos;d Change</h3>
              <p className={styles.reflectionText}>
                Should have tested gestures earlier. Some users took time to discover swipe actions. 
                Would have added onboarding hints or made gestures more discoverable initially.
              </p>
            </div>
            <div className={styles.reflectionCard}>
              <h3 className={styles.reflectionTitle}>What&apos;s Next</h3>
              <p className={styles.reflectionText}>
                Analytics show smart suggestions are underutilized. Need to improve timing and 
                personalization. Also evaluating social features that respect privacy—users want 
                accountability without public sharing.
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
