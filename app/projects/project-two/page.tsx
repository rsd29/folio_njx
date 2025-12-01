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
  { id: "introduction", label: "Introduction" },
  { id: "starting-point", label: "The Starting Point" },
  { id: "why-omis-mattered", label: "Why OMIS Mattered" },
  { id: "my-role", label: "My Role" },
  { id: "who-omis-serves", label: "Who OMIS Serves" },
  { id: "problems-we-needed-to-solve", label: "Problems We Needed to Solve" },
  { id: "design-principles", label: "Design Principles" },
  { id: "design-system", label: "The Design System" },
  { id: "purchase-order-system", label: "Key Module: Purchase Order System" },
  { id: "transport-management-system", label: "Key Module: Transport Management System" },
  { id: "sales-ordering-program", label: "Key Module: Sales Ordering Program" },
  { id: "regional-challenges", label: "Regional & Departmental Challenges" },
  { id: "impact", label: "Impact" },
  { id: "what-i-learned", label: "What I Learned" },
  { id: "reflection", label: "Reflection" },
];

export default function ProjectTwoCaseStudy() {
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
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.backLink}>
            <Link href="/" className={styles.backButton}>
              ← Back to Projects
            </Link>
          </div>

          <div className={styles.heroText}>
            <ScrollRevealText
              text="OMIS ERP System"
              fontSize="clamp(2.5rem, 5vw, 4.5rem)"
              fontWeight={400}
              lineHeight={1.1}
              letterSpacing="-0.02em"
              className={styles.heroTitle}
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
                  Lead UX Designer & Front-End Developer
                </span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Timeline</span>
                <span className={styles.metaValue}>2023-2025</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Regions</span>
                <span className={styles.metaValue}>Multiple regions & departments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.heroImageSection}>
        <div className={styles.heroImageContainer}>
          <Image
            src="/case_study_1/cs1_productpage2.jpeg"
            alt="OMIS ERP interface preview"
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
          <section id="introduction" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Introduction"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>
                A unified internal platform for a global FMCG distributor
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  Before OMIS existed, Oriental Merchant was running a multi-country
                  supply chain on tools that were never designed to handle that
                  level of complexity. Staff were juggling enormous Excel files,
                  hand-built VBA tools, paper-based workflows, and long email
                  chains to complete even the simplest tasks. Delivery routes were
                  planned on printed maps. Sales reps had to switch between six
                  different spreadsheets to create an order. Procurement
                  forecasting often meant inspecting dozens of tabs across multiple
                  files. Every region had its own version of the truth, and no one
                  had a complete view of operations.
                </p>
                <p className={styles.blockText}>
                  The company was functioning through sheer experience and effort,
                  not through systems. OMIS was created to change that. It became
                  the first attempt to connect the entire organisation through a
                  shared platform that digitised core workflows, reduced
                  bottlenecks, and gave people the information they needed without
                  waiting on others.
                </p>
                <p className={styles.blockText}>
                  I led the UX design and front-end implementation from the very
                  beginning, shaping how the platform looks, behaves, and supports
                  more than thirty specialised modules used across several regions.
                </p>
              </div>

              <blockquote className={styles.quoteBlock}>
                <span className={styles.quoteBlockLabel}>Thinking Aloud</span>
                The surest way to retire a spreadsheet is to respect why it
                existed. Shadowing each team before we touched the UI kept every
                module grounded in how people already worked.
              </blockquote>
            </div>
          </section>

          <section id="starting-point" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="The Starting Point"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>Digitising known workflows</div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  Oriental Merchant had no ERP. Every department built its own
                  processes through Excel, email, and manual handovers. These tools
                  were created by people who understood the business well, but
                  their limitations were obvious:
                </p>
                <ul className={styles.blockList}>
                  <li>Each team maintained separate files and rules</li>
                  <li>Reports took hours to prepare</li>
                  <li>Forecasting meant cross-referencing many spreadsheets</li>
                  <li>Delivery routes were drawn manually every morning</li>
                  <li>Order history was stored in binders</li>
                  <li>Input validation was inconsistent</li>
                  <li>Regions developed their own habits and logic</li>
                </ul>
                <p className={styles.blockText}>
                  OMIS was not designed to reinvent the company. It was designed to
                  digitise known workflows, remove unnecessary friction, and give
                  people immediate access to the information they relied on.
                </p>
              </div>

              <blockquote className={`${styles.quoteBlock} ${styles.quoteBlockHonest}`}>
                <span className={styles.quoteBlockLabel}>In Hindsight</span>
                Alignment mattered as much as tooling. When regions synced on the
                same definitions we moved fast; when they didn&apos;t, we spent
                days reconciling what “done” meant.
              </blockquote>
            </div>
          </section>

          <section id="why-omis-mattered" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Why OMIS Mattered"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>
                The company had grown past what manual tools could support
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  Teams were spending more time finding information than using it.
                </p>
                <ul className={styles.blockList}>
                  <li>Sales reps needed live stock and pricing data.</li>
                  <li>Procurement needed a single place to plan national replenishment.</li>
                  <li>Logistics needed to eliminate hours of manual route planning.</li>
                  <li>Managers needed transparency over operations instead of chasing files.</li>
                </ul>
                <p className={styles.blockText}>
                  OMIS became the central platform that brought these needs together.
                </p>
              </div>
            </div>
          </section>

          <section id="my-role" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="My Role"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>
                Lead UX designer and primary front-end developer
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  I served as the lead UX designer and one of the primary front-end
                  developers on the project. My responsibilities included:
                </p>
                <ul className={styles.blockList}>
                  <li>Designing and wireframing every module in OMIS</li>
                  <li>Creating the platform structure and navigation</li>
                  <li>Building a design system to support dozens of internal applications</li>
                  <li>Working directly with department heads to understand workflows deeply</li>
                  <li>Translating their processes into clear digital interfaces</li>
                  <li>Running discovery sessions and shadowing staff</li>
                  <li>Collaborating with backend engineers to define feasible solutions</li>
                  <li>Presenting modules to regional teams</li>
                  <li>Creating training materials, onboarding guides, and stakeholder presentations</li>
                </ul>
                <p className={styles.blockText}>
                  The development team had strong engineering expertise, but little
                  exposure to UX. I introduced design principles such as
                  hierarchy, contrast, spacing, and interaction patterns. This
                  created a shared language that helped us work more effectively as
                  a team.
                </p>
              </div>
            </div>
          </section>

          <section id="who-omis-serves" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Who OMIS Serves"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>
                OMIS needed to support nearly every operational team in the business
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  Each module had its own requirements, but everything needed to
                  feel like it belonged in the same ecosystem.
                </p>
              </div>

              <blockquote className={styles.quoteBlock}>
                <span className={styles.quoteBlockLabel}>Thinking Aloud</span>
                Shared foundations were the only way to balance speed with
                quality. Once typography, spacing, and interaction patterns were
                locked, we could ship new modules without renegotiating the
                basics.
              </blockquote>

              <div className={styles.contentGrid}>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Sales</h3>
                  <p className={styles.blockText}>
                    Customer ordering, promotions and pricing, sales history,
                    customer delivery information, SKU search, account data
                  </p>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Procurement</h3>
                  <p className={styles.blockText}>
                    Stock forecasting, supplier planning, warehouse allocation,
                    container planning, inventory visibility, inter-warehouse transfers
                  </p>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Logistics</h3>
                  <p className={styles.blockText}>
                    Transport management, daily route planning, live driver tracking,
                    signature capture, photo evidence, route history
                  </p>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Warehouse</h3>
                  <p className={styles.blockText}>
                    Receiving, dispatch, adjustments, transfers
                  </p>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Shipping</h3>
                  <p className={styles.blockText}>
                    Container registry, purchase order registry, best-before-date tracking
                  </p>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Admin and IT</h3>
                  <p className={styles.blockText}>
                    User permissions, module access, image storage
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="problems-we-needed-to-solve" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Problems We Needed to Solve"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>
                Department-specific pain points
              </div>

              <div className={styles.contentGrid}>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Sales</h3>
                  <p className={styles.blockText}>
                    Order creation involved many spreadsheets and slow
                    cross-checking. Customer history and stock data were difficult
                    to find. Promotions varied by region.
                  </p>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Logistics</h3>
                  <p className={styles.blockText}>
                    Drivers had no digital tools. There was no tracking, no proof of
                    delivery, and no route history. Planning took hours.
                  </p>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Procurement</h3>
                  <p className={styles.blockText}>
                    Forecasting required intense manual effort. Warehouse splits
                    were inconsistent. Container plans relied heavily on
                    individual experience and were not centralised.
                  </p>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Shipping</h3>
                  <p className={styles.blockText}>
                    Container records were scattered across files and emails.
                  </p>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Company-wide</h3>
                  <p className={styles.blockText}>
                    There was no centralised data, slow communication, and
                    constant duplication. Mistakes were common because validation
                    varied across spreadsheets.
                  </p>
                </div>
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  OMIS had to solve each of these issues without overwhelming users
                  or removing the logic they trusted.
                </p>
              </div>
            </div>
          </section>

          <section id="design-principles" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Design Principles"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>
                Guardrails for every module
              </div>

              <div className={styles.contentBlock}>
                <ul className={styles.blockList}>
                  <li>
                    <strong>Respect existing mental models</strong>
                    <br />
                    Many staff were experienced with spreadsheets. AG Grid
                    preserved familiar behaviour such as multi-row copy,
                    drag-to-fill, and rapid filtering.
                  </li>
                  <li>
                    <strong>Gate user input</strong>
                    <br />
                    Open text fields were replaced with dropdowns, selectors, and
                    auto-search wherever possible. This improved accuracy and
                    reduced support requests.
                  </li>
                  <li>
                    <strong>Break workflows into steps</strong>
                    <br />
                    Complex modules like PO planning were divided into clear stages
                    to reduce cognitive load.
                  </li>
                  <li>
                    <strong>Use automation responsibly</strong>
                    <br />
                    Automation handled suggestions and repetitive calculations, but
                    users retained the ability to override values. Tooltips
                    explained the logic behind automated fields.
                  </li>
                  <li>
                    <strong>Build consistency through foundations</strong>
                    <br />
                    Typography, spacing, interaction patterns, and page headers
                    were consistent across modules. Layouts were tailored to each
                    workflow.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section id="design-system" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="The Design System"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>
                Structure without restriction
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  The design system provided structure without restricting functionality.
                  It included:
                </p>
              </div>

              <div className={styles.contentGrid}>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Shared foundations</h3>
                  <ul className={styles.blockList}>
                    <li>Typography scale, spacing rules, standardised headers</li>
                    <li>Departmental colour coding</li>
                    <li>Consistent icons</li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Components</h3>
                  <ul className={styles.blockList}>
                    <li>SKU search with advanced filtering</li>
                    <li>AG Grid table variations</li>
                    <li>Forms, step flows, drawers and modals, validation patterns</li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Interaction patterns</h3>
                  <ul className={styles.blockList}>
                    <li>Inline validation and clear success feedback</li>
                    <li>Tooltip explanations</li>
                    <li>Expand and collapse behaviour for dense content</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="purchase-order-system" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Key Module: Purchase Order System"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>
                Procurement&apos;s most complex workflow
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  The PO System was the most complex part of OMIS. Procurement
                  needed to manage replenishment across four national warehouses
                  and align with vendor schedules.
                </p>
              </div>

              <div className={styles.contentGrid}>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Challenges</h3>
                  <ul className={styles.blockList}>
                    <li>Large volumes of data</li>
                    <li>Dependent decisions</li>
                    <li>Complex forecasting logic</li>
                    <li>Warehouse splits</li>
                    <li>Container planning</li>
                    <li>Validation at every step</li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Solution</h3>
                  <ul className={styles.blockList}>
                    <li>Structured workflow into stages</li>
                    <li>Automated suggestions with manual overrides</li>
                    <li>Tooltips explaining calculations</li>
                    <li>Expandable tables</li>
                    <li>Multi-layer validation</li>
                    <li>Clear success flow</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="transport-management-system" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Key Module: Transport Management System"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>
                Digitising delivery operations
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  Before TMS, delivery routes were planned manually with printed
                  maps. Drivers had no digital tools or proof-of-delivery workflow.
                </p>
              </div>

              <div className={styles.contentGrid}>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Constraints</h3>
                  <ul className={styles.blockList}>
                    <li>Offline mode</li>
                    <li>Simple driver interactions</li>
                    <li>Manager visibility</li>
                    <li>Signature and photo capture</li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Solution</h3>
                  <ul className={styles.blockList}>
                    <li>Automated route generation</li>
                    <li>Offline-capable driver app</li>
                    <li>Local caching and sync on reconnect</li>
                    <li>Logistics dashboard</li>
                    <li>Digital route history</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="sales-ordering-program" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Key Module: Sales Ordering Program"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>
                Replacing a scattered workflow
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  The Sales Ordering Program replaced a scattered workflow
                  involving many spreadsheets.
                </p>
              </div>

              <div className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>Improvements</h3>
                <p className={styles.blockText}>
                  High-speed SKU search, consolidated customer information,
                  real-time stock visibility, integrated promotions, parallel and
                  saved orders, built-in validation.
                </p>
              </div>
            </div>
          </section>

          <section id="regional-challenges" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Regional & Departmental Challenges"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>
                Adapting without fragmenting the system
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  Different regions required different rules. For example, Australia
                  used a structured promotional system while the Netherlands and the
                  UK were more flexible. Modules were adapted without breaking
                  overall structure. Feature requests were versioned so teams could
                  validate needs after using the module.
                </p>
              </div>

              <blockquote className={`${styles.quoteBlock} ${styles.quoteBlockHonest}`}>
                <span className={styles.quoteBlockLabel}>In Hindsight</span>
                Every time we skipped versioning, regional builds drifted. Clear
                release notes and stricter cutoffs would have saved us a lot of
                backtracking.
              </blockquote>
            </div>
          </section>

          <section id="impact" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Impact"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>Efficiency across departments</div>

              <div className={styles.contentBlock}>
                <ul className={styles.blockList}>
                  <li>Efficiency improved significantly across all departments.</li>
                  <li>Order creation and route planning became faster.</li>
                  <li>Procurement gained a unified system for replenishment.</li>
                  <li>Staff no longer relied on email for data.</li>
                  <li>Accuracy increased due to consistent validation.</li>
                  <li>Managers gained instant access to history and analytics.</li>
                  <li>Delivery proof became digital and searchable.</li>
                  <li>
                    Modules expanded from seven to more than thirty and now support
                    multiple regions.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section id="what-i-learned" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="What I Learned"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>Personal takeaways</div>

              <div className={styles.contentBlock}>
                <ul className={styles.blockList}>
                  <li>How to break down complex workflows into smaller steps</li>
                  <li>How to design for users who rely on familiar spreadsheet behaviour</li>
                  <li>How to use a design system as a foundation, not a limitation</li>
                  <li>How to manage scope through versioning</li>
                  <li>How to communicate clearly with stakeholders and engineers</li>
                  <li>How to design confidently within complex constraints</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="reflection" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="Reflection"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>Looking forward</div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  Seeing staff rely on OMIS every day is rewarding. The platform
                  has made daily work faster, clearer, and more consistent across
                  the organisation. It continues to grow as new modules are added
                  and existing ones are refined. I am proud to have contributed to
                  a system that supports so many people across multiple regions and
                  departments.
                </p>
              </div>

              <blockquote className={styles.quoteBlock}>
                <span className={styles.quoteBlockLabel}>Thinking Aloud</span>
                The biggest win wasn&apos;t any single module; it was giving
                every team the same source of truth. Once that clicked, requests
                shifted from “Can you find this file?” to “Can we automate this
                step?”
              </blockquote>
            </div>
          </section>
        </div>
      </div>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Interested in working together?</h2>
            <p className={styles.ctaText}>
              I&apos;m always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
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
