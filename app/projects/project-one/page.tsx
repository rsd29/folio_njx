"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollRevealText from "../../../components/ScrollRevealText";
import styles from "./case-study.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

const CASE_STUDY_SECTIONS = [
  { id: "the-challenge", label: "The Challenge" },
  { id: "project-overview", label: "Project Overview" },
  { id: "business-objectives", label: "Business Objectives" },
  { id: "understanding-the-users", label: "Understanding the Users" },
  { id: "research-and-discovery", label: "Research & Discovery" },
  { id: "defining-the-experience", label: "Defining the Experience" },
  { id: "core-features", label: "Core Features & Functionality" },
  { id: "information-architecture", label: "Information Architecture" },
  { id: "visual-design-direction", label: "Visual Design Direction" },
  {
    id: "technical-collaboration",
    label: "Technical Collaboration & Complexity",
  },
  { id: "overcoming-challenges", label: "Overcoming Challenges" },
  { id: "results-and-impact", label: "Results & Impact" },
  { id: "key-learnings", label: "Key Learnings" },
  { id: "what-id-do-differently", label: "What I Would Do Differently" },
  { id: "future-opportunities", label: "Future Opportunities" },
  { id: "conclusion", label: "Conclusion" },
];

export default function ProjectOneCaseStudy() {
  const tocRef = useRef<HTMLElement>(null);
  const sectionsColumnRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(
    CASE_STUDY_SECTIONS[0]?.id ?? "",
  );

  useEffect(() => {
    const toc = tocRef.current;
    const sectionsColumn = sectionsColumnRef.current;
    if (!toc || !sectionsColumn) return;

    // Use GSAP pin to affix the TOC
    const pinTrigger = ScrollTrigger.create({
      trigger: sectionsColumn,
      pin: toc,
      start: "top 40px",
      end: "bottom bottom",
      pinSpacing: false,
    });

    // Track active section with ScrollTrigger
    const sectionTriggers: ScrollTrigger[] = [];
    CASE_STUDY_SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        const st = ScrollTrigger.create({
          trigger: element,
          start: "top 33%",
          end: "bottom 33%",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveSection(id);
            }
          },
        });
        sectionTriggers.push(st);
      }
    });

    return () => {
      pinTrigger.kill();
      sectionTriggers.forEach((st) => st.kill());
    };
  }, []);

  const handleSectionClick =
    (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      const element = document.getElementById(id);
      if (!element) return;

      // Use GSAP ScrollSmoother if available, otherwise fallback to native
      const smoother = ScrollSmoother.get();
      if (smoother) {
        smoother.scrollTo(element, true, "top top");
      } else {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setActiveSection(id);
    };

  return (
    <main className={styles.caseStudy}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
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
                <span className={styles.metaValue}>
                  6-10 months initial build
                </span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Regions</span>
                <span className={styles.metaValue}>
                  Australia, Netherlands, Canada, UK, Europe
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className={styles.heroImageSection}>
        <div className={styles.heroImageContainer}>
          <Image
            src="/case_study_1/cs1_productpage2.jpeg"
            alt="SalesIQ Product Page Interface"
            width={1920}
            height={1080}
            className={styles.heroImage}
            priority
          />
        </div>
      </section>

      <div className={styles.contentShell}>
        <nav
          ref={tocRef}
          className={styles.tableOfContents}
          aria-label="Case study sections"
        >
          <ul className={styles.tocList}>
            {CASE_STUDY_SECTIONS.map(({ id, label }) => (
              <li key={id} className={styles.tocItem}>
                <a
                  href={`#${id}`}
                  onClick={handleSectionClick(id)}
                  className={`${styles.tocLink} ${
                    activeSection === id ? styles.tocLinkActive : ""
                  }`}
                  aria-current={activeSection === id ? "true" : undefined}
                >
                  {label}
                </a>
              </li> 
            ))}
          </ul>
        </nav>

        <div className={styles.sectionsColumn} ref={sectionsColumnRef}>
          {/* The Challenge */}
          <section id="the-challenge" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="The Challenge"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={300}
                className={styles.sectionTitle}
              />
              <p
                className={styles.blockText}
                style={{
                  fontSize: "1.4rem",
                  color: "#999",
                  marginTop: "-1.5rem",
                  marginBottom: "3rem",
                  fontStyle: "italic",
                  fontFamily: "'Space Grotesk', 'DM Sans', 'Outfit', system-ui, -apple-system, sans-serif",
                  fontWeight: 400,
                }}
              >
                From Phone Orders to Digital at Scale
              </p>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  Oriental Merchant, one of the world&apos;s largest Asian
                  grocery importers, serves everyone from independent family
                  grocers to major national chains like{" "}
                  <strong>Coles and Woolworths</strong>. Despite this scale,
                  their entire ordering process was offline: phone calls, paper
                  catalogs, and field reps manually processing every order.
                </p>
                <p className={styles.blockText}>
                  Store owners had no visibility into{" "}
                  <strong>real-time pricing or stock</strong>. Promotions with
                  complex tier structures required rep interpretation. Every
                  order risked miscommunication and data entry errors, and
                  customers had no way to save patterns or access history.
                </p>
                <p className={styles.blockText}>
                  The business needed a{" "}
                  <strong>
                    scalable digital platform
                  </strong>{" "}
                  that could make complex promotional logic feel simple.
                </p>
                <p className={styles.blockText}>
                  The platform also needed to serve two distinct use cases
                  simultaneously. Sales reps required speed to process orders
                  quickly on behalf of customers, while end users expected a
                  polished commercial experience. Staff accounts operated with a
                  second authorization tier, allowing them to log into any store
                  and instantly access that customer&apos;s specific pricing,
                  product catalog, and promotional structures.
                </p>
              </div>
            </div>
          </section>

          {/* Project Overview */}
          <section id="project-overview" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Project Overview"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={300}
                className={styles.sectionTitle}
              />
              <p
                className={styles.blockText}
                style={{
                  fontSize: "1.4rem",
                  color: "#999",
                  marginTop: "-1.5rem",
                  marginBottom: "3rem",
                  fontStyle: "italic",
                  fontFamily: "'Space Grotesk', 'DM Sans', 'Outfit', system-ui, -apple-system, sans-serif",
                  fontWeight: 400,
                }}
              >
                What We Built
              </p>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  <strong>SalesIQ</strong> is a global B2B e-commerce platform
                  that provides self-service ordering for wholesale customers.
                  What started as a single-region pilot rapidly expanded to
                  become the core ordering tool across all of Oriental
                  Merchant&apos;s international operations.
                </p>
                <p className={styles.blockText}>
                  The platform handles{" "}
                  <strong>
                    region-specific catalogs, dynamic pricing, live stock
                    visibility, tiered promotions, and multiple languages
                  </strong>
                  , while maintaining familiar shopping patterns users already
                  know.
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
                    <li>
                      Continuous iteration based on analytics and feedback
                    </li>
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
          <section id="business-objectives" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Business Objectives"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={300}
                className={styles.sectionTitle}
              />
              <p
                className={styles.blockText}
                style={{
                  fontSize: "1.4rem",
                  color: "#999",
                  marginTop: "-1.5rem",
                  marginBottom: "3rem",
                  fontStyle: "italic",
                  fontFamily: "'Space Grotesk', 'DM Sans', 'Outfit', system-ui, -apple-system, sans-serif",
                  fontWeight: 400,
                }}
              >
                What Success Looked Like
              </p>

              <div className={styles.contentBlock}>
                <ul className={styles.blockList}>
                  <li>
                    Enable <strong>self-service ordering</strong> across all
                    customer segments
                  </li>
                  <li>Reduce field rep dependency for order entry</li>
                  <li>Eliminate pricing and data entry errors</li>
                  <li>
                    Build <strong>scalable infrastructure</strong> for global
                    expansion
                  </li>
                  <li>
                    Automate complex promotional logic
                  </li>
                  <li>Increase promotional participation</li>
                  <li>
                    Improve order volume and accessibility
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Understanding the Users */}
          <section id="understanding-the-users" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Understanding the Users"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={300}
                className={styles.sectionTitle}
              />
              <p
                className={styles.blockText}
                style={{
                  fontSize: "1.4rem",
                  color: "#999",
                  marginTop: "-1.5rem",
                  marginBottom: "3rem",
                  fontStyle: "italic",
                  fontFamily: "'Space Grotesk', 'DM Sans', 'Outfit', system-ui, -apple-system, sans-serif",
                  fontWeight: 400,
                }}
              >
                Who We Were Designing For
              </p>

              <div className={styles.contentGrid}>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Primary Users</h3>
                  <ul className={styles.blockList}>
                    <li>
                      <strong>Independent grocery store owners:</strong>{" "}
                      Time-poor, often ordering from the shop floor
                    </li>
                    <li>
                      <strong>National chain buyers:</strong> High-volume
                      orders, efficiency-focused
                    </li>
                    <li>
                      <strong>Specialty store operators:</strong> Niche product
                      needs, promotional sensitivity
                    </li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Secondary Users</h3>
                  <ul className={styles.blockList}>
                    <li>
                      <strong>Sales representatives:</strong> Using the platform
                      to assist key accounts and place orders on behalf of
                      customers
                    </li>
                  </ul>
                </div>
              </div>

              <div className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>Key User Context</h3>
                <ul className={styles.blockList}>
                  <li>
                    Extremely <strong>time-poor</strong>, often multitasking on
                    the shop floor
                  </li>
                  <li>
                    High proportion of <strong>repeat ordering behavior</strong>
                  </li>
                  <li>Many English-as-a-second-language users</li>
                  <li>
                    Strong preference for{" "}
                    <strong>immediately familiar interfaces</strong> over
                    experimental designs
                  </li>
                  <li>
                    Already comfortable with mainstream online grocery shopping
                    (Coles, Woolworths)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Research & Discovery */}
          <section id="research-and-discovery" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Research & Discovery"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={300}
                className={styles.sectionTitle}
              />
              <p
                className={styles.blockText}
                style={{
                  fontSize: "1.4rem",
                  color: "#999",
                  marginTop: "-1.5rem",
                  marginBottom: "3rem",
                  fontStyle: "italic",
                  fontFamily: "'Space Grotesk', 'DM Sans', 'Outfit', system-ui, -apple-system, sans-serif",
                  fontWeight: 400,
                }}
              >
                Understanding the Real Workflow
              </p>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  To understand needs across regions and user types, I used:
                </p>
                <ul className={styles.blockList}>
                  <li>
                    User interviews with store owners and operators
                  </li>
                  <li>
                    Task shadowing in retail environments
                  </li>
                  <li>
                    Stakeholder interviews with sales reps and regional managers
                  </li>
                  <li>
                    Legacy workflow audits
                  </li>
                  <li>
                    Surveys for broader feedback
                  </li>
                  <li>
                    Sandbox testing with stakeholder groups pre-launch
                  </li>
                  <li>
                    Usage analytics post-launch for continuous refinement
                  </li>
                </ul>
              </div>

              <div className={styles.insightsSection}>
                <h3 className={styles.insightsTitle}>What We Learned</h3>
                <p className={styles.blockText}>
                  One message emerged consistently: users didn&apos;t want
                  beautiful visuals or innovative interactions. They wanted{" "}
                  <strong>speed, clarity, and access</strong>.
                </p>
                <p
                  className={styles.blockText}
                  style={{
                    fontStyle: "italic",
                    fontSize: "1.1rem",
                    color: "#ccc",
                  }}
                >
                  &quot;Let me place accurate orders quickly, and show me what
                  discounts I qualify for.&quot;
                </p>
              </div>

              <div className={styles.insightsSection}>
                <h3 className={styles.insightsTitle}>Key Insights</h3>
                <div className={styles.insightsList}>
                  <div className={styles.insight}>
                    <span className={styles.insightBullet}>•</span>
                    <p className={styles.insightText}>
                      <strong>Familiarity matters:</strong> Users already shop
                      on mainstream platforms, so leverage those mental models
                    </p>
                  </div>
                  <div className={styles.insight}>
                    <span className={styles.insightBullet}>•</span>
                    <p className={styles.insightText}>
                      <strong>Promotional visibility drives behavior:</strong>{" "}
                      Seeing tier progress directly influenced purchasing
                    </p>
                  </div>
                  <div className={styles.insight}>
                    <span className={styles.insightBullet}>•</span>
                    <p className={styles.insightText}>
                      <strong>Speed over polish:</strong> Workflow efficiency
                      was valued far above aesthetic refinement
                    </p>
                  </div>
                  <div className={styles.insight}>
                    <span className={styles.insightBullet}>•</span>
                    <p className={styles.insightText}>
                      <strong>Repeat patterns dominate:</strong> Order templates
                      would save time for most users
                    </p>
                  </div>
                  <div className={styles.insight}>
                    <span className={styles.insightBullet}>•</span>
                    <p className={styles.insightText}>
                      <strong>Mobile and tablet are critical:</strong> Many
                      customers order while on the shop floor
                    </p>
                  </div>
                  <div className={styles.insight}>
                    <span className={styles.insightBullet}>•</span>
                    <p className={styles.insightText}>
                      <strong>Multilingual support enables adoption:</strong>{" "}
                      Reduced training friction and increased confidence
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Defining the Experience */}
          <section id="defining-the-experience" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Defining the Experience"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={300}
                className={styles.sectionTitle}
              />
              <p
                className={styles.blockText}
                style={{
                  fontSize: "1.4rem",
                  color: "#999",
                  marginTop: "-1.5rem",
                  marginBottom: "3rem",
                  fontStyle: "italic",
                  fontFamily: "'Space Grotesk', 'DM Sans', 'Outfit', system-ui, -apple-system, sans-serif",
                  fontWeight: 400,
                }}
              >
                The Two-Pillar Strategy
              </p>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  The UX strategy was built around two core pillars:
                </p>
              </div>

              <div className={styles.contentGrid}>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>
                    1. Follow Mental Models Users Already Know
                  </h3>
                  <p className={styles.blockText}>
                    We designed flows that resembled{" "}
                    <strong>
                      Coles and Woolworths online shopping
                    </strong>
                    , allowing users to focus on tasks rather than learning new
                    patterns.
                  </p>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>
                    2. Make Complex Business Logic Feel Simple
                  </h3>
                  <p className={styles.blockText}>
                    Behind the familiar interface: multi-region catalog
                    management, dynamic promotional tiers, and complex pricing.
                    The UX{" "}
                    <strong>
                      exposed only what users needed, when they needed it
                    </strong>
                    .
                  </p>
                </div>
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  The result: navigation, page structures, and layouts that felt
                  immediately familiar but supported far more sophisticated
                  logic than typical consumer platforms.
                </p>
              </div>
            </div>
          </section>

          {/* Core Features & Functionality */}
          <section id="core-features" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Core Features & Functionality"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={300}
                className={styles.sectionTitle}
              />
              <p
                className={styles.blockText}
                style={{
                  fontSize: "1.4rem",
                  color: "#999",
                  marginTop: "-1.5rem",
                  marginBottom: "3rem",
                  fontStyle: "italic",
                  fontFamily: "'Space Grotesk', 'DM Sans', 'Outfit', system-ui, -apple-system, sans-serif",
                  fontWeight: 400,
                }}
              >
                Platform Capabilities
              </p>

              <div className={styles.contentGrid}>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>
                    Catalog & Product Management
                  </h3>
                  <ul className={styles.blockList}>
                    <li>
                      Multi-region product catalogs with region-specific
                      availability
                    </li>
                    <li>Region-based pricing and promotional logic</li>
                    <li>Live stock visibility across warehouses</li>
                    <li>Multi-language support for product information</li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Ordering Experience</h3>
                  <ul className={styles.blockList}>
                    <li>
                      High-density cart UI to view more line items at once
                    </li>
                    <li>Saved orders and comprehensive order history</li>
                    <li>Edit and cancel flows for existing orders</li>
                    <li>
                      Dynamic homepage promotions tailored to user segments
                    </li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Promotional System</h3>
                  <ul className={styles.blockList}>
                  <li>
                    <strong>Custom promotional selector:</strong> One of the
                    most impactful features. Users could combine multiple SKUs
                    within a promo family to hit thresholds without rep
                    intervention
                  </li>
                    <li>
                      Promotional tier visual system showing progress toward
                      discounts
                    </li>
                    <li>Mix-and-match promotional selection components</li>
                    <li>Clear promotional tagging throughout the catalog</li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Multi-Device Support</h3>
                  <ul className={styles.blockList}>
                    <li>
                      Fully responsive desktop, tablet, and mobile layouts
                    </li>
                    <li>Optimized for on-the-floor ordering scenarios</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Information Architecture */}
          <section id="information-architecture" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Information Architecture"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={300}
                className={styles.sectionTitle}
              />
              <p
                className={styles.blockText}
                style={{
                  fontSize: "1.4rem",
                  color: "#999",
                  marginTop: "-1.5rem",
                  marginBottom: "3rem",
                  fontStyle: "italic",
                  fontFamily: "'Space Grotesk', 'DM Sans', 'Outfit', system-ui, -apple-system, sans-serif",
                  fontWeight: 400,
                }}
              >
                Structuring the Experience
              </p>

              <div className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>Core User Flows</h3>
                <ul className={styles.blockList}>
                  <li>
                    <strong>Home:</strong> Dynamic promotions and quick reorder
                    access
                  </li>
                  <li>
                    <strong>Browse:</strong> Category navigation with filtering
                  </li>
                  <li>
                    <strong>Search:</strong> Fast product lookup
                  </li>
                  <li>
                    <strong>Product Pages:</strong> Detailed information with
                    promotional context
                  </li>
                  <li>
                    <strong>Cart:</strong> High-density view with inline editing
                  </li>
                  <li>
                    <strong>Checkout:</strong> Streamlined order completion
                  </li>
                  <li>
                    <strong>Order History:</strong> Full order archive with
                    reorder functionality
                  </li>
                  <li>
                    <strong>Saved Orders:</strong> Template-based repeat
                    ordering
                  </li>
                  <li>
                    <strong>Account:</strong> Profile and preferences
                  </li>
                  <li>
                    <strong>Language Settings:</strong> Seamless language
                    switching
                  </li>
                </ul>
              </div>

              <div className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>Supporting Pages</h3>
                <ul className={styles.blockList}>
                  <li>New arrivals</li>
                  <li>Brand browsing</li>
                  <li>Promotional banners</li>
                </ul>
                <p
                  className={styles.blockText}
                  style={{
                    marginTop: "16px",
                    fontStyle: "italic",
                    color: "#aaa",
                  }}
                >
                  These were nice-to-have features but not critical to the core
                  ordering workflow.
                </p>
              </div>
            </div>
          </section>

          {/* Visual Design Direction */}
          <section id="visual-design-direction" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Visual Design Direction"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={300}
                className={styles.sectionTitle}
              />
              <p
                className={styles.blockText}
                style={{
                  fontSize: "1.4rem",
                  color: "#999",
                  marginTop: "-1.5rem",
                  marginBottom: "3rem",
                  fontStyle: "italic",
                  fontFamily: "'Space Grotesk', 'DM Sans', 'Outfit', system-ui, -apple-system, sans-serif",
                  fontWeight: 400,
                }}
              >
                Commercial and Clean
              </p>

              <div className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>Design Principles</h3>
                <p className={styles.blockText}>
                  The visual goal was <strong>commercial and clean</strong>:
                  professional enough for enterprise buyers, familiar enough to
                  feel approachable.
                </p>
                <p className={styles.blockText}>
                  We used <strong>Ng Zorro</strong> as a foundation but created
                  custom styling for:
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
                  The UI is more compact than typical consumer e-commerce. Users
                  see more line items at once, helping wholesale buyers build
                  orders quickly without excessive scrolling.
                </p>
                <p className={styles.blockText}>
                  This came directly from research:{" "}
                  <strong>
                    time-poor users valued information density over whitespace
                  </strong>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Technical Collaboration & Complexity */}
          <section id="technical-collaboration" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Technical Collaboration & Complexity"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={300}
                className={styles.sectionTitle}
              />
              <p
                className={styles.blockText}
                style={{
                  fontSize: "1.4rem",
                  color: "#999",
                  marginTop: "-1.5rem",
                  marginBottom: "3rem",
                  fontStyle: "italic",
                  fontFamily: "'Space Grotesk', 'DM Sans', 'Outfit', system-ui, -apple-system, sans-serif",
                  fontWeight: 400,
                }}
              >
                Building at Scale
              </p>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  The platform needed to function differently across regions
                  while maintaining a unified experience.
                </p>
              </div>

              <div className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>Technical Challenges</h3>
                <ul className={styles.blockList}>
                  <li>
                    <strong>Regional variation:</strong> Each region had
                    different promotional rules, pricing, and product
                    availability
                  </li>
                  <li>
                    <strong>Evolving requirements:</strong> Data structures
                    evolved as business requirements were discovered
                  </li>
                  <li>
                    <strong>Multi-language complexity:</strong> Interface
                    translation and right-to-left considerations
                  </li>
                  <li>
                    <strong>Performance:</strong> Heavy data payloads from
                    comprehensive catalogs
                  </li>
                  <li>
                    <strong>Distributed architecture:</strong> Region-hosted
                    backend services with master data in Australia
                  </li>
                </ul>
              </div>

              <div className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>Our Approach</h3>
                <ul className={styles.blockList}>
                  <li>
                    Dynamic data handling to support regional variation without
                    code duplication
                  </li>
                  <li>
                    Flexible design patterns that adapted to local needs
                  </li>
                  <li>
                    Reusable components that maintained consistency across
                    regions
                  </li>
                  <li>
                    Ongoing performance optimization for large catalogs
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Overcoming Challenges */}
          <section id="overcoming-challenges" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Overcoming Challenges"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={300}
                className={styles.sectionTitle}
              />
              <p
                className={styles.blockText}
                style={{
                  fontSize: "1.4rem",
                  color: "#999",
                  marginTop: "-1.5rem",
                  marginBottom: "3rem",
                  fontStyle: "italic",
                  fontFamily: "'Space Grotesk', 'DM Sans', 'Outfit', system-ui, -apple-system, sans-serif",
                  fontWeight: 400,
                }}
              >
                Navigating Complexity
              </p>

              <div className={styles.contentGrid}>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>
                    Promotional rule diversity
                  </h3>
                  <p className={styles.blockText}>
                    Each region operated different promotional structures. We
                    created a <strong>flexible visual system</strong> that
                    represented various tier types and discount models without
                    region-specific UI.
                  </p>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>
                    Data structure evolution
                  </h3>
                  <p className={styles.blockText}>
                    Requirements were discovered during development. We stayed
                    agile, iterating on backend and frontend simultaneously
                    rather than following rigid phases.
                  </p>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>
                    Unexpected global rollout
                  </h3>
                  <p className={styles.blockText}>
                    What started as a single-region pilot became global faster
                    than anticipated. This increased maintenance load but
                    validated our architectural decisions.
                  </p>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>
                    Small team, global support
                  </h3>
                  <p className={styles.blockText}>
                    We handled support and training across multiple time zones
                    with a lean team, requiring clear documentation and
                    intuitive design.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Results & Impact */}
          <section id="results-and-impact" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Results & Impact"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={300}
                className={styles.sectionTitle}
              />
              <p
                className={styles.blockText}
                style={{
                  fontSize: "1.4rem",
                  color: "#999",
                  marginTop: "-1.5rem",
                  marginBottom: "3rem",
                  fontStyle: "italic",
                  fontFamily: "'Space Grotesk', 'DM Sans', 'Outfit', system-ui, -apple-system, sans-serif",
                  fontWeight: 400,
                }}
              >
                Measurable Outcomes
              </p>

              <div className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>Business Outcomes</h3>
                <ul className={styles.blockList}>
                  <li>
                    <strong>Significant online revenue growth</strong>
                    <br />
                    <span
                      style={{
                        fontStyle: "italic",
                        color: "#aaa",
                        fontSize: "0.95rem",
                      }}
                    >
                      Example: Netherlands grew from ~$400K to $1.9M in one
                      year
                    </span>
                  </li>
                  <li>
                    <strong>Reduced rep workload:</strong> Field reps freed from
                    order entry to focus on relationships and sales
                  </li>
                  <li>
                    <strong>Higher promotional participation:</strong> Clear
                    visibility drove increased engagement
                  </li>
                  <li>
                    <strong>Increased order accuracy:</strong> Eliminated
                    miscommunication and manual errors
                  </li>
                  <li>
                    <strong>Faster ordering cycles:</strong> Saved orders and
                    history dramatically reduced repeat order time
                  </li>
                  <li>
                    <strong>Improved customer satisfaction:</strong> Positive
                    feedback from independent grocers and major chains
                  </li>
                </ul>
              </div>

              <div className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>External Validation</h3>
                <p className={styles.blockText}>
                  External QA feedback noted the UI was{" "}
                  <strong>professional and polished</strong>. This was
                  validating for a young internal team building an enterprise
                  product competing with established B2B platforms.
                </p>
              </div>
            </div>
          </section>

          {/* Key Learnings */}
          <section id="key-learnings" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Key Learnings"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={300}
                className={styles.sectionTitle}
              />
              <p
                className={styles.blockText}
                style={{
                  fontSize: "1.4rem",
                  color: "#999",
                  marginTop: "-1.5rem",
                  marginBottom: "3rem",
                  fontStyle: "italic",
                  fontFamily: "'Space Grotesk', 'DM Sans', 'Outfit', system-ui, -apple-system, sans-serif",
                  fontWeight: 400,
                }}
              >
                What Worked and What Didn&apos;t
              </p>

              <div className={styles.contentGrid}>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>What Worked</h3>
                  <ul className={styles.blockList}>
                    <li>
                      <strong>Familiar mental models:</strong> Leveraging
                      existing shopping patterns accelerated adoption
                    </li>
                    <li>
                      <strong>Promotional visibility:</strong> Clear discounts
                      and tier progress directly influenced purchasing
                    </li>
                    <li>
                      <strong>High-density UI:</strong> Information-rich layouts
                      served wholesale buyers better than spacious designs
                    </li>
                    <li>
                      <strong>Multi-device support:</strong> Tablet and mobile
                      ordering became heavily used scenarios
                    </li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>
                    What Could Have Been Better
                  </h3>
                  <ul className={styles.blockList}>
                    <li>
                      <strong>Promotional data standardization:</strong>{" "}
                      Earlier standardization would have prevented maintenance
                      complexity
                    </li>
                    <li>
                      <strong>Feature prioritization:</strong> Some features saw
                      little use. More ruthless prioritization would have been
                      valuable
                    </li>
                    <li>
                      <strong>Visual restraint:</strong> A more utilitarian
                      direction might have been sufficient
                    </li>
                    <li>
                      <strong>Backend performance:</strong> Faster responses
                      would have improved perceived performance
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* What I Would Do Differently */}
          <section id="what-id-do-differently" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="What I Would Do Differently"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={300}
                className={styles.sectionTitle}
              />
              <p
                className={styles.blockText}
                style={{
                  fontSize: "1.4rem",
                  color: "#999",
                  marginTop: "-1.5rem",
                  marginBottom: "3rem",
                  fontStyle: "italic",
                  fontFamily: "'Space Grotesk', 'DM Sans', 'Outfit', system-ui, -apple-system, sans-serif",
                  fontWeight: 400,
                }}
              >
                In Hindsight
              </p>

              <div className={styles.contentBlock}>
                <ol
                  className={styles.blockList}
                  style={{ listStyleType: "decimal", paddingLeft: "24px" }}
                >
                  <li>
                    <strong>
                      Define strict promotional data structures early
                    </strong>{" "}
                    to avoid technical debt
                  </li>
                  <li>
                    <strong>Cut low-value features sooner</strong> based on
                    early analytics
                  </li>
                  <li>
                    <strong>
                      Bias harder toward repeat-order workflows
                    </strong>{" "}
                    (the majority use case)
                  </li>
                  <li>
                    <strong>Push for faster backend response times</strong> to
                    improve perceived performance
                  </li>
                  <li>
                    <strong>
                      Build comprehensive design documentation earlier
                    </strong>{" "}
                    to support global rollout
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* Future Opportunities */}
          <section id="future-opportunities" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Future Opportunities"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={300}
                className={styles.sectionTitle}
              />
              <p
                className={styles.blockText}
                style={{
                  fontSize: "1.4rem",
                  color: "#999",
                  marginTop: "-1.5rem",
                  marginBottom: "3rem",
                  fontStyle: "italic",
                  fontFamily: "'Space Grotesk', 'DM Sans', 'Outfit', system-ui, -apple-system, sans-serif",
                  fontWeight: 400,
                }}
              >
                Where This Could Go Next
              </p>

              <div className={styles.contentBlock}>
                <ul className={styles.blockList}>
                  <li>
                    <strong>Streamlined onboarding:</strong> Reduce development
                    dependency for new customer setup
                  </li>
                  <li>
                    <strong>Performance optimization:</strong> Faster catalog
                    loading
                  </li>
                  <li>
                    <strong>Intelligent reorder suggestions:</strong> ML-based
                    recommendations from order history
                  </li>
                  <li>
                    <strong>Simplified promotional management:</strong>{" "}
                    Self-service tools for regional teams
                  </li>
                  <li>
                    <strong>Region-level configuration:</strong> Enable
                    customization without engineering involvement
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section id="conclusion" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Conclusion"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={300}
                className={styles.sectionTitle}
              />
              <p
                className={styles.blockText}
                style={{
                  fontSize: "1.4rem",
                  color: "#999",
                  marginTop: "-1.5rem",
                  marginBottom: "3rem",
                  fontStyle: "italic",
                  fontFamily: "'Space Grotesk', 'DM Sans', 'Outfit', system-ui, -apple-system, sans-serif",
                  fontWeight: 400,
                }}
              >
                The Bigger Picture
              </p>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  SalesIQ transformed Oriental Merchant&apos;s global ordering
                  from an entirely offline process to a scalable digital
                  platform serving five countries. By prioritizing{" "}
                  <strong>
                    familiar patterns, promotional visibility, and workflow
                    efficiency
                  </strong>{" "}
                  over visual experimentation, we created a tool that served
                  both independent grocers and national chains.
                </p>
                <p className={styles.blockText}>
                  The project reinforced a principle:{" "}
                  <strong>
                    understanding user context and mental models matters more
                    than interface innovation for its own sake
                  </strong>
                  .
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Interested in working together?</h2>
            <p className={styles.ctaText}>
              I&apos;m always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
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
  );
}
