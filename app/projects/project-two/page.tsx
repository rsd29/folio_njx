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
  { id: "at-a-glance", label: "At a Glance" },
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
                <span className={styles.metaValue}>2023–2025</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Scope</span>
                <span className={styles.metaValue}>Multi-region, multi-department ERP (30+ modules)</span>
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
          <section id="at-a-glance" className={styles.section}>
            <div className={styles.container}>
              <ScrollRevealText
                text="At a Glance (TL;DR)"
                fontSize="clamp(2rem, 4vw, 3rem)"
                fontWeight={400}
                className={styles.sectionTitle}
              />
              <div className={styles.sectionSubtext}>Quick overview</div>

              <div className={styles.contentBlock}>
                <ul className={styles.blockList}>
                  <li>Replaced a fragmented, spreadsheet-driven operation with a unified ERP</li>
                  <li>Digitised core workflows across sales, procurement, logistics, warehousing, and shipping</li>
                  <li>Designed and built 30+ modules used daily across multiple regions</li>
                  <li>Introduced UX foundations and a design system to a team with no prior UX practice</li>
                  <li>Reduced operational friction, improved data accuracy, and created a single source of truth</li>
                </ul>
              </div>
            </div>
          </section>

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
                <h3 className={styles.blockTitle}>Visual Callout 1 (Hero Context)</h3>
                <ul className={styles.blockList}>
                  <li>
                    <strong>Image suggestion:</strong> A single composite screenshot or blurred overview of OMIS showing
                    multiple modules (navigation + dense data table).
                  </li>
                  <li>
                    <strong>Purpose:</strong> Immediately signals scale and seriousness. This tells reviewers: “This is
                    not a toy app.”
                  </li>
                  <li>
                    <strong>Effort level:</strong> One stitched screenshot or even a tasteful blur with labels.
                  </li>
                </ul>
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  Before OMIS, Oriental Merchant operated a multi-country supply chain using tools never designed for
                  that scale. Teams relied on large Excel files, VBA macros, paper workflows, and email handovers to
                  complete everyday tasks. Delivery routes were planned on printed maps. Sales reps switched between
                  multiple spreadsheets to place orders. Forecasting required manually reconciling dozens of tabs
                  across files.
                </p>
                <p className={styles.blockText}>
                  The business functioned through experience and effort rather than systems.
                </p>
                <p className={styles.blockText}>
                  OMIS was created to change that. It became the first platform to connect the organisation through a
                  shared system that digitised known workflows, reduced bottlenecks, and gave teams immediate access
                  to reliable data.
                </p>
                <p className={styles.blockText}>
                  I led UX design and front-end implementation from the beginning, shaping how the platform looks,
                  behaves, and scales across regions and departments.
                </p>
              </div>

              <blockquote className={styles.quoteBlock}>
                <span className={styles.quoteBlockLabel}>Thinking Aloud</span>
                The fastest way to replace a spreadsheet is to respect why it existed. Shadowing teams before
                touching the UI kept every module grounded in real work.
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
              <div className={styles.sectionSubtext}>Digitising known workflows, not reinventing the business</div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  Oriental Merchant had no ERP. Each department built its own processes using Excel, email, and
                  manual handovers.
                </p>
                <h3 className={styles.blockTitle}>Key limitations:</h3>
                <ul className={styles.blockList}>
                  <li>Separate files and inconsistent rules by team</li>
                  <li>Time-consuming reporting and forecasting</li>
                  <li>Manual route planning</li>
                  <li>Paper-based order history</li>
                  <li>Inconsistent input validation</li>
                  <li>Region-specific logic and definitions</li>
                </ul>
                <p className={styles.blockText}>
                  OMIS was designed to digitise these existing workflows, remove unnecessary friction, and make
                  trusted information immediately accessible.
                </p>
              </div>

              <blockquote className={`${styles.quoteBlock} ${styles.quoteBlockHonest}`}>
                <span className={styles.quoteBlockLabel}>In Hindsight</span>
                Alignment mattered as much as tooling. When regions agreed on definitions, progress was fast. When
                they didn’t, reconciliation slowed everything down.
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
                The business had outgrown manual tools
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  Teams were spending more time finding information than using it.
                </p>
                <h3 className={styles.blockTitle}>Needs by function:</h3>
                <ul className={styles.blockList}>
                  <li>
                    <strong>Sales:</strong> Live stock, pricing, promotions, and customer history
                  </li>
                  <li>
                    <strong>Procurement:</strong> Centralised national replenishment planning
                  </li>
                  <li>
                    <strong>Logistics:</strong> Elimination of manual route planning and paper-based proof of delivery
                  </li>
                  <li>
                    <strong>Management:</strong> Real-time operational visibility without chasing files
                  </li>
                </ul>
                <p className={styles.blockText}>
                  OMIS became the central platform teams actually relied on instead of juggling files, emails, and
                  workarounds.
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
                  I owned UX design and front-end execution across the platform.
                </p>
                <h3 className={styles.blockTitle}>Key responsibilities:</h3>
                <ul className={styles.blockList}>
                  <li>Designed and wireframed every OMIS module</li>
                  <li>Defined platform structure and navigation</li>
                  <li>Built a scalable design system for internal tools</li>
                  <li>Led discovery sessions and shadowed staff across departments</li>
                  <li>Translated operational workflows into digital interfaces</li>
                  <li>Collaborated closely with backend engineers on feasibility and data models</li>
                  <li>Presented modules to regional teams and stakeholders</li>
                  <li>Created training materials and onboarding documentation</li>
                </ul>
                <p className={styles.blockText}>
                  The engineering team had strong technical capability but limited UX exposure. I introduced core
                  design principles, hierarchy, spacing, contrast, and interaction patterns, so we could stop
                  debating UI basics and move faster with more confidence.
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
                One platform, many operational roles
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  OMIS supports nearly every operational team. Each module had unique requirements, but all needed
                  to feel part of a cohesive system.
                </p>
              </div>

              <blockquote className={styles.quoteBlock}>
                <span className={styles.quoteBlockLabel}>Thinking Aloud</span>
                Shared foundations were the only way to scale. Once the basics were locked, new modules could ship
                without renegotiating design decisions.
              </blockquote>

              <div className={styles.contentGrid}>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Sales</h3>
                  <p className={styles.blockText}>
                    Ordering, pricing, promotions, customer history, SKU search
                  </p>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Procurement</h3>
                  <p className={styles.blockText}>
                    Forecasting, supplier planning, warehouse allocation, container planning
                  </p>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Logistics</h3>
                  <p className={styles.blockText}>
                    Route planning, driver tracking, proof of delivery, route history
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
                    Container registry, purchase orders, best-before tracking
                  </p>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Admin / IT</h3>
                  <p className={styles.blockText}>
                    User permissions, module access, asset management
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
                  <ul className={styles.blockList}>
                    <li>Slow, fragmented order creation</li>
                    <li>Poor visibility of stock and customer history</li>
                    <li>Region-specific promotions</li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Logistics</h3>
                  <ul className={styles.blockList}>
                    <li>No digital tools for drivers</li>
                    <li>No tracking or proof of delivery</li>
                    <li>Hours spent planning routes</li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Procurement</h3>
                  <ul className={styles.blockList}>
                    <li>Manual, error-prone forecasting</li>
                    <li>Inconsistent warehouse allocation</li>
                    <li>No centralised container planning</li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Shipping</h3>
                  <ul className={styles.blockList}>
                    <li>Container records spread across emails and files</li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Company-wide</h3>
                  <ul className={styles.blockList}>
                    <li>No single source of truth</li>
                    <li>Heavy duplication and validation errors</li>
                    <li>Slow communication between teams</li>
                  </ul>
                </div>
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  OMIS needed to solve these without overwhelming users or discarding trusted logic.
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
                Guardrails applied across every module
              </div>

              <div className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>Visual Callout 2 (Design System Foundations)</h3>
                <ul className={styles.blockList}>
                  <li>
                    <strong>Image suggestion:</strong> One clean frame showing typography scale, spacing, buttons,
                    form fields, and table styles side-by-side.
                  </li>
                  <li>
                    <strong>Purpose:</strong> Proves you didn’t just talk about consistency, you built it. This
                    reassures senior designers instantly.
                  </li>
                  <li>
                    <strong>Effort level:</strong> Export directly from Figma. No mock scenarios needed.
                  </li>
                </ul>
              </div>

              <div className={styles.contentBlock}>
                <ul className={styles.blockList}>
                  <li>
                    <strong>Respect existing mental models</strong>
                    <br />
                    Spreadsheet-like behaviour (via AG Grid) preserved speed and familiarity.
                  </li>
                  <li>
                    <strong>Gate user input</strong>
                    <br />
                    Dropdowns, selectors, and auto-search replaced free text to improve accuracy.
                  </li>
                  <li>
                    <strong>Break workflows into steps</strong>
                    <br />
                    Complex processes were staged to reduce cognitive load.
                  </li>
                  <li>
                    <strong>Use automation responsibly</strong>
                    <br />
                    Automation suggested values; users retained control. Tooltips explained logic.
                  </li>
                  <li>
                    <strong>Build consistency through foundations</strong>
                    <br />
                    Shared typography, spacing, and interaction patterns across modules.
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
                  The design system existed to solve real problems: shipping faster, avoiding rework, and keeping
                  modules feeling familiar as the system grew.
                </p>
              </div>

              <div className={styles.contentGrid}>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Foundations</h3>
                  <ul className={styles.blockList}>
                    <li>Typography scale and spacing rules</li>
                    <li>Standardised headers and layouts</li>
                    <li>Departmental colour coding</li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Components</h3>
                  <ul className={styles.blockList}>
                    <li>SKU search with advanced filtering</li>
                    <li>AG Grid table patterns</li>
                    <li>Forms, step flows, drawers, modals, validation</li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Interaction patterns</h3>
                  <ul className={styles.blockList}>
                    <li>Inline validation and feedback</li>
                    <li>Tooltips for complex logic</li>
                    <li>Expand/collapse for dense content</li>
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
                <h3 className={styles.blockTitle}>Visual Callout 3 (Complexity Management)</h3>
                <ul className={styles.blockList}>
                  <li>
                    <strong>Image suggestion:</strong> One screenshot of the PO workflow showing staged steps (or a
                    dense table with tooltips/overrides visible).
                  </li>
                  <li>
                    <strong>Purpose:</strong> Demonstrates how you handle complexity without hiding it. This is your
                    strongest “enterprise UX” proof.
                  </li>
                  <li>
                    <strong>Effort level:</strong> One real screen. Annotate lightly if needed.
                  </li>
                </ul>
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  The PO System coordinated replenishment across four national warehouses.
                </p>
              </div>

              <div className={styles.contentGrid}>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Challenges</h3>
                  <ul className={styles.blockList}>
                    <li>Large volumes of data</li>
                    <li>Dependent decisions</li>
                    <li>Complex forecasting logic</li>
                    <li>Warehouse splits and container planning</li>
                  </ul>
                </div>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Solution</h3>
                  <ul className={styles.blockList}>
                    <li>Clear, staged workflow</li>
                    <li>Automated suggestions with manual overrides</li>
                    <li>Tooltips explaining calculations</li>
                    <li>Expandable tables and layered validation</li>
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
                <h3 className={styles.blockTitle}>Visual Callout 4 (End-to-End Workflow)</h3>
                <ul className={styles.blockList}>
                  <li>
                    <strong>Image suggestion:</strong> Two-up image: logistics dashboard + driver app screen (route
                    list, signature/photo capture).
                  </li>
                  <li>
                    <strong>Purpose:</strong> Shows systems thinking across roles, devices, and constraints (offline,
                    field use). Very high signal.
                  </li>
                  <li>
                    <strong>Effort level:</strong> One dashboard screenshot + one mobile screen.
                  </li>
                </ul>
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  Before TMS, routes were planned using printed maps and paper manifests.
                </p>
              </div>

              <div className={styles.contentGrid}>
                <div className={styles.contentBlock}>
                  <h3 className={styles.blockTitle}>Constraints</h3>
                  <ul className={styles.blockList}>
                    <li>Offline capability</li>
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
                    <li>Local caching with sync on reconnect</li>
                    <li>Logistics dashboard and digital route history</li>
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
                  The Sales Ordering Program unified multiple spreadsheets into a single interface.
                </p>
              </div>

              <div className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>Improvements</h3>
                <ul className={styles.blockList}>
                  <li>High-speed SKU search</li>
                  <li>Consolidated customer information</li>
                  <li>Real-time stock visibility</li>
                  <li>Integrated promotions</li>
                  <li>Parallel and saved orders</li>
                  <li>Built-in validation</li>
                </ul>
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
                Adapting without fragmenting the platform
              </div>

              <div className={styles.contentBlock}>
                <p className={styles.blockText}>
                  Regions required different rules. For example, Australia used structured promotions, while the UK
                  and Netherlands required more flexibility.
                </p>
                <p className={styles.blockText}>
                  Modules were adapted without breaking overall structure. Feature requests were versioned so teams
                  could validate needs after real usage.
                </p>
              </div>

              <blockquote className={`${styles.quoteBlock} ${styles.quoteBlockHonest}`}>
                <span className={styles.quoteBlockLabel}>In Hindsight</span>
                Skipping versioning caused regional drift. Clear release cutoffs would have prevented rework.
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
              <div className={styles.sectionSubtext}>Measurable operational improvements</div>

              <div className={styles.contentBlock}>
                <h3 className={styles.blockTitle}>Visual Callout 5 (Outcome Proof)</h3>
                <ul className={styles.blockList}>
                  <li>
                    <strong>Image suggestion:</strong> Before/after comparison or a simple flow diagram showing
                    spreadsheet chaos → OMIS workflow.
                  </li>
                  <li>
                    <strong>Purpose:</strong> Visually reinforces impact without needing metrics. This helps
                    non-design hiring managers “get it” fast.
                  </li>
                  <li>
                    <strong>Effort level:</strong> Extremely low. Even a diagram or redacted spreadsheet vs OMIS
                    screen works.
                  </li>
                </ul>
              </div>

              <div className={styles.contentBlock}>
                <ul className={styles.blockList}>
                  <li>Order creation and route planning reduced from hours to minutes</li>
                  <li>Procurement planning centralised nationally</li>
                  <li>Validation significantly reduced input errors</li>
                  <li>Email dependency removed for operational data</li>
                  <li>Managers gained real-time visibility and historical insight</li>
                  <li>Proof of delivery became digital and searchable</li>
                  <li>Platform expanded from 7 to 30+ modules across regions</li>
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
              <div className={styles.sectionSubtext}>Key takeaways</div>

              <div className={styles.contentBlock}>
                <ul className={styles.blockList}>
                  <li>How to break complex workflows into manageable steps</li>
                  <li>How to design for users dependent on spreadsheet speed</li>
                  <li>How to scale systems through design foundations</li>
                  <li>How to manage scope using versioning</li>
                  <li>How to communicate across business, design, and engineering</li>
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
                  OMIS is now part of everyday work across the organisation. It continues to evolve as new modules
                  are added and existing ones refined.
                </p>
              </div>

              <blockquote className={styles.quoteBlock}>
                <span className={styles.quoteBlockLabel}>Thinking Aloud</span>
                The biggest win wasn’t any single module, it was creating a shared source of truth. Once that
                existed, teams shifted from chasing files to improving workflows.
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
