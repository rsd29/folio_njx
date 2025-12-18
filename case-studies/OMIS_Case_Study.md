# OMIS ERP System

**Client:** Oriental Merchant
**Role:** Lead UX Designer & Front-End Developer
**Timeline:** 2023–2025
**Scope:** Multi-region, multi-department ERP (30+ modules)

---

## At a Glance (TL;DR)

* Replaced a fragmented, spreadsheet-driven operation with a unified ERP
* Digitised core workflows across sales, procurement, logistics, warehousing, and shipping
* Designed and built 30+ modules used daily across multiple regions
* Introduced UX foundations and a design system to a team with no prior UX practice
* Reduced operational friction, improved data accuracy, and created a single source of truth

---

## Introduction

**Visual Callout 1 (Hero Context)**
*Image suggestion:* A single composite screenshot or blurred overview of OMIS showing multiple modules (navigation + dense data table).
*Purpose:* Immediately signals scale and seriousness. This tells reviewers: “This is not a toy app.”
*Effort level:* One stitched screenshot or even a tasteful blur with labels.

### A unified internal platform for a global FMCG distributor

Before OMIS, Oriental Merchant operated a multi-country supply chain using tools never designed for that scale. Teams relied on large Excel files, VBA macros, paper workflows, and email handovers to complete everyday tasks. Delivery routes were planned on printed maps. Sales reps switched between multiple spreadsheets to place orders. Forecasting required manually reconciling dozens of tabs across files.

The business functioned through experience and effort rather than systems.

OMIS was created to change that. It became the first platform to connect the organisation through a shared system that digitised known workflows, reduced bottlenecks, and gave teams immediate access to reliable data.

I led UX design and front-end implementation from the beginning, shaping how the platform looks, behaves, and scales across regions and departments.

> **Thinking Aloud**
> The fastest way to replace a spreadsheet is to respect why it existed. Shadowing teams before touching the UI kept every module grounded in real work.

---

## The Starting Point

### Digitising known workflows, not reinventing the business

Oriental Merchant had no ERP. Each department built its own processes using Excel, email, and manual handovers.

**Key limitations:**

* Separate files and inconsistent rules by team
* Time-consuming reporting and forecasting
* Manual route planning
* Paper-based order history
* Inconsistent input validation
* Region-specific logic and definitions

OMIS was designed to digitise these existing workflows, remove unnecessary friction, and make trusted information immediately accessible.

> **In Hindsight**
> Alignment mattered as much as tooling. When regions agreed on definitions, progress was fast. When they didn’t, reconciliation slowed everything down.

---

## Why OMIS Mattered

### The business had outgrown manual tools

Teams were spending more time finding information than using it.

**Needs by function:**

* **Sales:** Live stock, pricing, promotions, and customer history
* **Procurement:** Centralised national replenishment planning
* **Logistics:** Elimination of manual route planning and paper-based proof of delivery
* **Management:** Real-time operational visibility without chasing files

OMIS became the central platform teams actually relied on instead of juggling files, emails, and workarounds.

---

## My Role

### Lead UX designer and primary front-end developer

I owned UX design and front-end execution across the platform.

**Key responsibilities:**

* Designed and wireframed every OMIS module
* Defined platform structure and navigation
* Built a scalable design system for internal tools
* Led discovery sessions and shadowed staff across departments
* Translated operational workflows into digital interfaces
* Collaborated closely with backend engineers on feasibility and data models
* Presented modules to regional teams and stakeholders
* Created training materials and onboarding documentation

The engineering team had strong technical capability but limited UX exposure. I introduced core design principles,hierarchy, spacing, contrast, and interaction patterns,so we could stop debating UI basics and move faster with more confidence.

---

## Who OMIS Serves

### One platform, many operational roles

OMIS supports nearly every operational team. Each module had unique requirements, but all needed to feel part of a cohesive system.

> **Thinking Aloud**
> Shared foundations were the only way to scale. Once the basics were locked, new modules could ship without renegotiating design decisions.

**Primary users:**

* **Sales:** Ordering, pricing, promotions, customer history, SKU search
* **Procurement:** Forecasting, supplier planning, warehouse allocation, container planning
* **Logistics:** Route planning, driver tracking, proof of delivery, route history
* **Warehouse:** Receiving, dispatch, adjustments, transfers
* **Shipping:** Container registry, purchase orders, best-before tracking
* **Admin / IT:** User permissions, module access, asset management

---

## Problems We Needed to Solve

### Department-specific pain points

**Sales**

* Slow, fragmented order creation
* Poor visibility of stock and customer history
* Region-specific promotions

**Logistics**

* No digital tools for drivers
* No tracking or proof of delivery
* Hours spent planning routes

**Procurement**

* Manual, error-prone forecasting
* Inconsistent warehouse allocation
* No centralised container planning

**Shipping**

* Container records spread across emails and files

**Company-wide**

* No single source of truth
* Heavy duplication and validation errors
* Slow communication between teams

OMIS needed to solve these without overwhelming users or discarding trusted logic.

---

## Design Principles

**Visual Callout 2 (Design System Foundations)**
*Image suggestion:* One clean frame showing typography scale, spacing, buttons, form fields, and table styles side-by-side.
*Purpose:* Proves you didn’t just talk about consistency,you built it. This reassures senior designers instantly.
*Effort level:* Export directly from Figma. No mock scenarios needed.

### Guardrails applied across every module

* **Respect existing mental models**
  Spreadsheet-like behaviour (via AG Grid) preserved speed and familiarity.

* **Gate user input**
  Dropdowns, selectors, and auto-search replaced free text to improve accuracy.

* **Break workflows into steps**
  Complex processes were staged to reduce cognitive load.

* **Use automation responsibly**
  Automation suggested values; users retained control. Tooltips explained logic.

* **Build consistency through foundations**
  Shared typography, spacing, and interaction patterns across modules.

---

## The Design System

### Structure without restriction

The design system existed to solve real problems: shipping faster, avoiding rework, and keeping modules feeling familiar as the system grew.

**Foundations**

* Typography scale and spacing rules
* Standardised headers and layouts
* Departmental colour coding

**Components**

* SKU search with advanced filtering
* AG Grid table patterns
* Forms, step flows, drawers, modals, validation

**Interaction patterns**

* Inline validation and feedback
* Tooltips for complex logic
* Expand/collapse for dense content

---

## Key Module: Purchase Order System

**Visual Callout 3 (Complexity Management)**
*Image suggestion:* One screenshot of the PO workflow showing staged steps (or a dense table with tooltips/overrides visible).
*Purpose:* Demonstrates how you handle complexity without hiding it. This is your strongest “enterprise UX” proof.
*Effort level:* One real screen. Annotate lightly if needed.

### Procurement’s most complex workflow

The PO System coordinated replenishment across four national warehouses.

**Challenges:**

* Large data volumes
* Dependent decisions
* Complex forecasting logic
* Warehouse splits and container planning

**Solution:**

* Clear, staged workflow
* Automated suggestions with manual overrides
* Tooltips explaining calculations
* Expandable tables and layered validation

---

## Key Module: Transport Management System

**Visual Callout 4 (End-to-End Workflow)**
*Image suggestion:* Two-up image: logistics dashboard + driver app screen (route list, signature/photo capture).
*Purpose:* Shows systems thinking across roles, devices, and constraints (offline, field use). Very high signal.
*Effort level:* One dashboard screenshot + one mobile screen.

### Digitising delivery operations

Before TMS, routes were planned using printed maps and paper manifests.

**Constraints:**

* Offline capability
* Simple driver interactions
* Manager visibility
* Signature and photo capture

**Solution:**

* Automated route generation
* Offline-capable driver app
* Local caching with sync on reconnect
* Logistics dashboard and digital route history

---

## Key Module: Sales Ordering Program

### Replacing a scattered workflow

The Sales Ordering Program unified multiple spreadsheets into a single interface.

**Improvements:**

* High-speed SKU search
* Consolidated customer information
* Real-time stock visibility
* Integrated promotions
* Parallel and saved orders
* Built-in validation

---

## Regional & Departmental Challenges

### Adapting without fragmenting the platform

Regions required different rules. For example, Australia used structured promotions, while the UK and Netherlands required more flexibility.

Modules were adapted without breaking overall structure. Feature requests were versioned so teams could validate needs after real usage.

> **In Hindsight**
> Skipping versioning caused regional drift. Clear release cutoffs would have prevented rework.

---

## Impact

**Visual Callout 5 (Outcome Proof)**
*Image suggestion:* Before/after comparison or a simple flow diagram showing spreadsheet chaos → OMIS workflow.
*Purpose:* Visually reinforces impact without needing metrics. This helps non-design hiring managers “get it” fast.
*Effort level:* Extremely low. Even a diagram or redacted spreadsheet vs OMIS screen works.

### Measurable operational improvements

* Order creation and route planning reduced from hours to minutes
* Procurement planning centralised nationally
* Validation significantly reduced input errors
* Email dependency removed for operational data
* Managers gained real-time visibility and historical insight
* Proof of delivery became digital and searchable
* Platform expanded from 7 to 30+ modules across regions

---

## What I Learned

### Key takeaways

* How to break complex workflows into manageable steps
* How to design for users dependent on spreadsheet speed
* How to scale systems through design foundations
* How to manage scope using versioning
* How to communicate across business, design, and engineering

---

## Reflection

### Looking forward

OMIS is now part of everyday work across the organisation. It continues to evolve as new modules are added and existing ones refined.

> **Thinking Aloud**
> The biggest win wasn’t any single module,it was creating a shared source of truth. Once that existed, teams shifted from chasing files to improving workflows.
