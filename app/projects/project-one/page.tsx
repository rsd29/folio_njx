"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
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
  { id: "understanding-the-users", label: "Understanding the Users" },
  { id: "research-and-discovery", label: "Research & Discovery" },
  { id: "defining-the-experience", label: "Defining the Experience" },
  { id: "core-features", label: "Core Features" },
  { id: "visual-design-direction", label: "Visual Design" },
  { id: "technical-collaboration", label: "Technical Collaboration" },
  { id: "results-and-impact", label: "Results & Impact" },
  { id: "key-learnings", label: "Reflection & Next Steps" },
];

export default function ProjectOneCaseStudy() {
  const tocRef = useRef<HTMLElement>(null);
  const sectionsColumnRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(
    CASE_STUDY_SECTIONS[0]?.id ?? "",
  );
  const heroMetaRef = useRef<HTMLDivElement>(null);
  const [heroMetaVisible, setHeroMetaVisible] = useState(false);

  useEffect(() => {
    const smootherInstance = ScrollSmoother.get();
    if (smootherInstance) {
      requestAnimationFrame(() => {
        smootherInstance.scrollTo(0, true);
      });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  useEffect(() => {
    const toc = tocRef.current;
    const sectionsColumn = sectionsColumnRef.current;
    if (!toc || !sectionsColumn) return;

    const getPinEnd = () => {
      if (!toc || !sectionsColumn) return "+=0";
      const distance = sectionsColumn.offsetHeight - toc.offsetHeight;
      return "+=" + Math.max(0, distance);
    };

    const pinTrigger = ScrollTrigger.create({
      trigger: sectionsColumn,
      pin: toc,
      start: "top 100px",
      end: getPinEnd,
      pinSpacing: false,
    });

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

  useEffect(() => {
    const node = heroMetaRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setHeroMetaVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-20% 0px -35% 0px", threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleSectionClick =
    (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      const element = document.getElementById(id);
      if (!element) return;

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
              fontWeight={400}
              lineHeight={1.1}
              letterSpacing="-0.02em"
              className={styles.heroTitle}
            />
            <ScrollRevealText
              text="I led the UX and front-end implementation of SalesIQ, a wholesale ordering platform that replaced phone and paper workflows with a digital storefront for thousands of independent grocers and national chains."
              fontSize="var(--font-body-l)"
              fontWeight={300}
              lineHeight={1.6}
              letterSpacing="0"
              className={styles.heroDescription}
              style={{
                fontFamily: "var(--font-body)",
                color: "#c7c7c7",
                transitionDelay: "0.12s",
              }}
            />
            <div
              className={`${styles.heroMeta} ${
                heroMetaVisible ? styles.heroMetaVisible : ""
              }`}
              ref={heroMetaRef}
            >
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Client</span>
                <span className={styles.metaValue}>Oriental Merchant</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Role</span>
                <span className={styles.metaValue}>
                  Lead UX Designer, Front-end
                </span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Timeline</span>
                <span className={styles.metaValue}>6–10 months initial build</span>
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
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>
                From Offline Orders to a Global Platform
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  Oriental Merchant is one of the largest FMCG importers of Asian
                  groceries in the world, supplying independent stores and major chains like{" "}
                  <strong>Coles and Woolworths</strong>. Before SalesIQ, almost
                  all wholesale orders ran through phone calls, paper catalogues,
                  and email. Reps manually keyed in every order.
                </p>
                <p className={styles.blockText}>
                  Store owners had no real-time view of{" "}
                  <strong>stock, pricing, or promotions</strong>. Tiered
                  discounts depended on how well a rep could explain them. Every
                  order was a chance for miscommunication.
                </p>
                <p className={styles.blockText}>
                  I needed to help the business shift from a{" "}
                  <strong>high-touch, analogue process</strong> to a{" "}
                  <strong>self-serve digital platform</strong> that could grow
                  across regions without losing the relationships that made the
                  business successful.
                </p>
              </div>

              <div className={styles.contentBlock}>
                <h4 className={styles.blockTitle}>How I Framed the Problem</h4>
                <p
                  className={styles.blockText}
                  style={{ fontStyle: "italic", color: "#9f9f9f" }}
                >
                  I anchored the experience around two principles. First,
                  mirror mental models that store owners already trusted from
                  mainstream grocery sites. Second, hide the complexity of
                  pricing and promotions so the interface stayed simple while
                  the logic stayed powerful.
                </p>
              </div>

              <blockquote className={styles.quoteBlock}>
                <span className={styles.quoteBlockLabel}>Thinking Aloud</span>
                When I mapped how many steps a rep took to place a single
                order, it was obvious the first release had one job. Remove
                friction, not introduce a clever new pattern.
              </blockquote>

              <div className={styles.imagePlaceholder}>
                <div className={styles.placeholderIcon}>📞 → 💻</div>
                <h4 className={styles.placeholderTitle}>Before and After Flow</h4>
                <p className={styles.placeholderDescription}>
                  Side by side diagram. Left shows the old flow from phone call
                  and handwritten notes through to manual entry in back-office
                  systems. Right shows the new flow from customer login to
                  order confirmation in SalesIQ.
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
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>What I Built</div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  <strong>SalesIQ</strong> is a global B2B ordering platform
                  for wholesale customers. It exposes live stock, customer
                  specific pricing, and complex promotional tiers in a layout
                  that feels familiar to anyone who has shopped online.
                </p>
                <p className={styles.blockText}>
                  I led UX from discovery through to front-end delivery. That
                  included research, information architecture, interaction
                  design, UI design, and implementation of the key screens and
                  components.
                </p>
              </div>

              <div className={styles.contentGrid}>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>My Responsibilities</h3>
                  <ul className={styles.blockList}>
                    <li>Stakeholder and user interviews</li>
                    <li>Mapping current and future order workflows</li>
                    <li>Wireframes and high fidelity UI design</li>
                    <li>Designing the promotional UX and visuals</li>
                    <li>Responsive layouts for desktop, tablet, and mobile</li>
                    <li>Front-end implementation with the dev team</li>
                    <li>Ongoing iteration based on analytics and feedback</li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Who I Worked With</h3>
                  <ul className={styles.blockList}>
                    <li>3 front-end developers (including myself)</li>
                    <li>3 back-end developers</li>
                    <li>Product manager</li>
                    <li>Regional stakeholders across multiple countries</li>
                  </ul>
                </div>
              </div>

              <blockquote className={styles.quoteBlock}>
                <span className={styles.quoteBlockLabel}>Thinking Aloud</span>
                Owning both UX and front-end meant every design decision had to
                survive code. It kept me honest about what the team could
                actually ship.
              </blockquote>
            </div>
          </section>

          {/* Understanding the Users */}
          <section id="understanding-the-users" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Understanding the Users"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>Who I Designed For</div>

              <div className={styles.contentGrid}>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Primary Users</h3>
                  <ul className={styles.blockList}>
                    <li>
                      <strong>Independent grocery owners:</strong> often
                      ordering on the shop floor between customers.
                    </li>
                    <li>
                      <strong>Buyers for major chains:</strong> large baskets,
                      high expectations for speed and accuracy.
                    </li>
                    <li>
                      <strong>Specialty store operators:</strong> care about
                      niche products and promotions.
                    </li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Supporting Users</h3>
                  <ul className={styles.blockList}>
                    <li>
                      <strong>Sales reps:</strong> placing orders on behalf of
                      customers, often under time pressure.
                    </li>
                  </ul>
                </div>
              </div>

              <div className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>Key Context</h3>
                <ul className={styles.blockList}>
                  <li>Time poor and often multitasking on the shop floor.</li>
                  <li>Heavy repeat ordering rather than discovery.</li>
                  <li>Many users with English as a second language.</li>
                  <li>
                    Familiar with consumer grocery sites like Coles and
                    Woolworths.
                  </li>
                </ul>
              </div>

              <blockquote
                className={`${styles.quoteBlock} ${styles.quoteBlockHonest}`}
              >
                <span className={styles.quoteBlockLabel}>In Hindsight</span>
                The regions that treated SalesIQ as a focused ordering tool saw
                the fastest adoption. Where it drifted toward being a full
                marketing site, the extra visual work added noise without much
                value.
              </blockquote>

              <div className={styles.imagePlaceholder}>
                <div className={styles.placeholderIcon}>🧑‍🍳</div>
                <h4 className={styles.placeholderTitle}>User Types Snapshot</h4>
                <p className={styles.placeholderDescription}>
                  Simple personas or tiles for three key user groups. Each tile
                  shows a photo, a short description, and one primary need such
                  as speed, clarity, or promo visibility.
                </p>
              </div>
            </div>
          </section>

          {/* Research & Discovery */}
          <section id="research-and-discovery" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Research & Discovery"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>
                Seeing the Real Workflow
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  I combined interviews, store visits, and workflow audits to
                  understand how orders were really placed across regions.
                </p>
                <ul className={styles.blockList}>
                  <li>Interviews with store owners and operators</li>
                  <li>Shadowing orders placed on the shop floor</li>
                  <li>Sessions with sales reps and regional managers</li>
                  <li>Review of legacy order forms and spreadsheets</li>
                  <li>Sandbox testing with key customers pre-launch</li>
                </ul>
              </div>

              <div className={styles.insightsSection}>
                <h3 className={styles.insightsTitle}>What Stood Out</h3>
                <p className={styles.blockText}>
                  The strongest pattern was simple. Users did not want a
                  beautiful new way to shop. They wanted a tool that felt
                  familiar, loaded quickly, and made promotions obvious.
                </p>
              </div>

              <div className={styles.insightsSection}>
                <h3 className={styles.insightsTitle}>Key Insights</h3>
                <div className={styles.insightsList}>
                  <div className={styles.insight}>
                    <span className={styles.insightBullet}>•</span>
                    <p className={styles.insightText}>
                      <strong>Familiar flows reduce training.</strong> Users
                      expected patterns similar to consumer grocery sites.
                    </p>
                  </div>
                  <div className={styles.insight}>
                    <span className={styles.insightBullet}>•</span>
                    <p className={styles.insightText}>
                      <strong>Promotions drive behaviour.</strong> When users
                      could see how close they were to a discount, they added
                      more to the cart.
                    </p>
                  </div>
                  <div className={styles.insight}>
                    <span className={styles.insightBullet}>•</span>
                    <p className={styles.insightText}>
                      <strong>Speed beats polish.</strong> Dense layouts with
                      clear labels beat spacious designs that required scrolling.
                    </p>
                  </div>
                  <div className={styles.insight}>
                    <span className={styles.insightBullet}>•</span>
                    <p className={styles.insightText}>
                      <strong>Repeat orders dominate.</strong> Saved orders and
                      fast reordering were more valuable than advanced product
                      discovery.
                    </p>
                  </div>
                </div>

                <div className={styles.imagePlaceholder}>
                  <div className={styles.placeholderIcon}>🎯</div>
                  <h4 className={styles.placeholderTitle}>Research Highlights</h4>
                  <p className={styles.placeholderDescription}>
                    One visual panel showing 3–4 key insights with simple
                    icons. Each insight can be paired with a short quote from a
                    user to connect the research to real voices.
                  </p>
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
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>Two Core Pillars</div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  I used the research to shape two simple pillars for the
                  experience.
                </p>
              </div>

              <div className={styles.contentGrid}>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>
                    1. Follow Existing Mental Models
                  </h3>
                  <p className={styles.blockText}>
                    I based the navigation and page structure on common
                    e-commerce patterns. Home, browse, search, product,
                    cart, and checkout all follow a flow that feels obvious to
                    anyone who has shopped online before.
                  </p>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>
                    2. Hide the Complexity, Not the Value
                  </h3>
                  <p className={styles.blockText}>
                    Pricing rules, promotions, and regional variation sit
                    behind the scenes. On the surface, users see clear
                    promotional tags, progress toward discounts, and accurate
                    totals. The heavy logic stays in the background.
                  </p>
                </div>
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  This balance let me keep the interface simple and predictable
                  while still supporting complex business rules behind it.
                </p>
                <blockquote className={styles.quoteBlock}>
                  <span className={styles.quoteBlockLabel}>Thinking Aloud</span>
                  Once I watched store owners serve customers while placing
                  orders, it was clear that familiarity was a feature. My job
                  was not to reinvent shopping. It was to speed up something
                  they already knew how to do.
                </blockquote>
              </div>

              <div className={styles.imagePlaceholder}>
                <div className={styles.placeholderIcon}>🧩</div>
                <h4 className={styles.placeholderTitle}>Experience Pillars</h4>
                <p className={styles.placeholderDescription}>
                  Simple two column visual. Left column shows users moving
                  through familiar steps like browse and cart. Right column
                  reveals the hidden system layer such as dynamic pricing and
                  promotional rules.
                </p>
              </div>
            </div>
          </section>

          {/* Core Features */}
          <section id="core-features" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Core Features"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>
                What I Focused On
              </div>

              <div className={styles.contentGrid}>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>
                    Catalog and Product Experience
                  </h3>
                  <ul className={styles.blockList}>
                    <li>Region-specific product availability</li>
                    <li>Customer-specific pricing and discounts</li>
                    <li>Live stock visibility across warehouses</li>
                    <li>Support for multiple languages</li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Ordering Flows</h3>
                  <ul className={styles.blockList}>
                    <li>High-density cart to see many line items at once</li>
                    <li>Saved orders and repeat ordering from history</li>
                    <li>Clear edit and cancel flows for existing orders</li>
                    <li>Homepage shortcuts for favourites and promos</li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Promotional System</h3>
                  <ul className={styles.blockList}>
                    <li>
                      Custom selector that lets users mix SKUs in a promo
                      family to hit thresholds.
                    </li>
                    <li>
                      Visual progress indicators that show how close the user
                      is to the next discount tier.
                    </li>
                    <li>
                      Clear tags across the catalog so promo items stand out.
                    </li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Multi-device Support</h3>
                  <ul className={styles.blockList}>
                    <li>Responsive layouts for desktop, tablet, and mobile</li>
                    <li>
                      Flows optimised for on-the-floor ordering with one hand
                    </li>
                  </ul>
                </div>
              </div>

              <div className={styles.contentBlock}>
                <h4 className={styles.blockTitle}>Why I Prioritised Promos</h4>
                <p
                  className={styles.blockText}
                  style={{ fontStyle: "italic", color: "#9f9f9f" }}
                >
                  Promotions were the fastest lever for revenue. By making them
                  visible and interactive, I helped customers understand how to
                  build baskets that worked for them and the business without
                  needing a rep to step in.
                </p>
              </div>

              <div className={styles.imagePlaceholder}>
                <div className={styles.placeholderIcon}>🖥️</div>
                <h4 className={styles.placeholderTitle}>Key Screens</h4>
                <p className={styles.placeholderDescription}>
                  A small grid of 3–4 screens. For example, the catalog with
                  promo tags, the promo selector showing tier progress, the
                  dense cart view, and the order history with quick reorder.
                  Each screen can have a short annotation.
                </p>
              </div>
            </div>
          </section>

          {/* Visual Design Direction */}
          <section id="visual-design-direction" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Visual Design"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>Commercial and Clear</div>

              <div className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>Design Principles</h3>
                <p className={styles.blockText}>
                  I aimed for a visual style that felt like a commercial
                  storefront, not a back-office tool. It needed to look
                  professional for national buyers and still feel simple for
                  independent stores.
                </p>
                <p className={styles.blockText}>
                  I used <strong>Ng Zorro</strong> as a base library and
                  layered custom styles on top for promotional tags, dense cart
                  layouts, and key components.
                </p>
              </div>

              <div className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>Intentional Density</h3>
                <p className={styles.blockText}>
                  I chose a more compact layout than typical consumer
                  e-commerce. Buyers can see many SKUs in one view, which cuts
                  down on scrolling and makes it easier to compare products.
                </p>
                <p className={styles.blockText}>
                  This came directly from research. When I showed users early
                  spacious versions, they described them as slow, even when
                  performance was fine. Dense but clear screens felt faster.
                </p>
              </div>

              <blockquote className={styles.quoteBlock}>
                <span className={styles.quoteBlockLabel}>Thinking Aloud</span>
                The palette and components are simple on purpose. I let layout
                and spacing do most of the work so the interface stayed calm
                even when there were hundreds of SKUs on screen.
              </blockquote>

              <div className={styles.imagePlaceholder}>
                <div className={styles.placeholderIcon}>🎨</div>
                <h4 className={styles.placeholderTitle}>Design System Snapshot</h4>
                <p className={styles.placeholderDescription}>
                  A board that shows the core colours, typography, buttons,
                  tags, and cards used in SalesIQ. Include a zoom into the promo
                  tag and tier indicator to show how they stand out.
                </p>
              </div>
            </div>
          </section>

          {/* Technical Collaboration & Complexity */}
          <section id="technical-collaboration" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Technical Collaboration"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>Designing With Constraints</div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  SalesIQ needed to behave differently across regions but still
                  look and feel like one product. I worked closely with
                  back-end engineers to understand data structures, response
                  times, and what could be configured without breaking the
                  experience.
                </p>
              </div>

              <div className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>Key Challenges</h3>
                <ul className={styles.blockList}>
                  <li>Different promo rules and pricing models per region.</li>
                  <li>Evolving data structures as new requirements appeared.</li>
                  <li>Multiple languages and content needs.</li>
                  <li>Large catalogs that could easily impact performance.</li>
                </ul>
              </div>

              <div className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>How I Handled Them</h3>
                <ul className={styles.blockList}>
                  <li>
                    I treated shared components and data contracts as fixed
                    points so regions could configure within guardrails.
                  </li>
                  <li>
                    I designed patterns that could stretch for local needs
                    instead of building one-off screens.
                  </li>
                  <li>
                    I pushed for small performance wins such as loading
                    skeletons and tighter payloads for key views.
                  </li>
                </ul>
              </div>

              <blockquote
                className={`${styles.quoteBlock} ${styles.quoteBlockHonest}`}
              >
                <span className={styles.quoteBlockLabel}>In Hindsight</span>
                I learned that flexibility is only useful if I can maintain it.
                Next time I would lock regional guardrails earlier so edge
                cases do not slow every decision.
              </blockquote>

              <div className={styles.imagePlaceholder}>
                <div className={styles.placeholderIcon}>🧱</div>
                <h4 className={styles.placeholderTitle}>Shared vs Local</h4>
                <p className={styles.placeholderDescription}>
                  Diagram that shows which parts of the experience are shared
                  across all regions, such as core components, and which parts
                  are configurable, such as promotions or content.
                </p>
              </div>
            </div>
          </section>

          {/* Results & Impact */}
          <section id="results-and-impact" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Results & Impact"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>What Changed</div>

              <div className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>Business Outcomes</h3>
                <ul className={styles.blockList}>
                  <li>
                    <strong>Online revenue growth:</strong> for example, the
                    Netherlands grew from around 400k to 1.9m in one year
                    through SalesIQ orders.
                  </li>
                  <li>
                    <strong>Rep workload shifted:</strong> reps spent less time
                    keying orders and more time on relationships and growth.
                  </li>
                  <li>
                    <strong>Higher promo uptake:</strong> clear progress made
                    promotions easier to understand and use.
                  </li>
                  <li>
                    <strong>Improved accuracy:</strong> fewer manual steps
                    meant fewer mistakes and less rework.
                  </li>
                </ul>
              </div>

              <div className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>Team Confidence</h3>
                <p className={styles.blockText}>
                  External QA and stakeholder feedback highlighted the UI as
                  professional and reliable. For a young internal team, that
                  validation mattered. It gave us the confidence to take on
                  more ambitious internal products.
                </p>
              </div>

              <blockquote className={styles.quoteBlock}>
                <span className={styles.quoteBlockLabel}>Thinking Aloud</span>
                Watching online orders move from zero to multi-million revenue
                was a clear signal that the design decisions were working in
                the real world, not just on a Figma board.
              </blockquote>

              <div className={styles.imagePlaceholder}>
                <div className={styles.placeholderIcon}>📊</div>
                <h4 className={styles.placeholderTitle}>Impact Overview</h4>
                <p className={styles.placeholderDescription}>
                  A simple dashboard style visual showing revenue growth, share
                  of orders placed online, and a couple of key operational
                  metrics such as reduced rep entered orders.
                </p>
              </div>
            </div>
          </section>

          {/* Key Learnings / Reflection */}
          <section id="key-learnings" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Reflection & Next Steps"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>
                What I Took Forward
              </div>

              <div className={styles.contentGrid}>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>What Worked Well</h3>
                  <ul className={styles.blockList}>
                    <li>
                      Leaning on <strong>familiar shopping patterns</strong> cut
                      training time and made launch smoother.
                    </li>
                    <li>
                      Making <strong>promotions visible and interactive</strong>{" "}
                      directly influenced cart size and engagement.
                    </li>
                    <li>
                      Designing with{" "}
                      <strong>high density and clear hierarchy</strong> suited
                      wholesale buyers better than airy layouts.
                    </li>
                    <li>
                      Treating <strong>back-end constraints</strong> as part of
                      the UX brief stopped the design from drifting into
                      fantasy.
                    </li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>What I Would Change</h3>
                  <ul className={styles.blockList}>
                    <li>
                      Lock <strong>promo data structures</strong> earlier to
                      avoid long term maintenance debt.
                    </li>
                    <li>
                      Cut <strong>low usage features</strong> faster based on
                      analytics rather than gut feel or loud requests.
                    </li>
                    <li>
                      Bias even harder toward{" "}
                      <strong>repeat order workflows</strong> since that is
                      where most value sits.
                    </li>
                    <li>
                      Build <strong>design documentation</strong> earlier so
                      future regions can scale with less hands-on support.
                    </li>
                  </ul>
                </div>
              </div>

              <blockquote
                className={`${styles.quoteBlock} ${styles.quoteBlockHonest}`}
              >
                <span className={styles.quoteBlockLabel}>In Hindsight</span>
                I spent time polishing a few features that users barely touched.
                The data was clear, but I was more interested in the design
                problem than the impact. Now I treat analytics as the source of
                truth, not a nice to have.
              </blockquote>

              <div className={styles.imagePlaceholder}>
                <div className={styles.placeholderIcon}>🧠</div>
                <h4 className={styles.placeholderTitle}>Lessons at a Glance</h4>
                <p className={styles.placeholderDescription}>
                  A simple two column list graphic. Left shows what worked, such
                  as mental models and promo visibility. Right shows what I
                  would do differently, such as cutting features sooner and
                  standardising data earlier.
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
              I am open to new roles, collaborations, and projects where I can
              bring both UX thinking and front-end delivery.
            </p>
            <div className={styles.ctaButtons}>
              <a
                href="https://linkedin.com/in/russellsaw"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButton}
              >
                Get in Touch
              </a>
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
