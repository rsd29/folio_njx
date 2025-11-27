# OMIS ERP System

**Client:** Oriental Merchant  
**Role:** Lead UX Designer & Front-End Developer  
**Timeline:** 2023-2025  
**Regions:** Multiple regions & departments

---

## Introduction

### A unified internal platform for a global FMCG distributor

Before OMIS existed, Oriental Merchant was running a multi-country supply chain on tools that were never designed to handle that level of complexity. Staff were juggling enormous Excel files, hand-built VBA tools, paper-based workflows, and long email chains to complete even the simplest tasks. Delivery routes were planned on printed maps. Sales reps had to switch between six different spreadsheets to create an order. Procurement forecasting often meant inspecting dozens of tabs across multiple files. Every region had its own version of the truth, and no one had a complete view of operations.

The company was functioning through sheer experience and effort, not through systems. OMIS was created to change that. It became the first attempt to connect the entire organisation through a shared platform that digitised core workflows, reduced bottlenecks, and gave people the information they needed without waiting on others.

I led the UX design and front-end implementation from the very beginning, shaping how the platform looks, behaves, and supports more than thirty specialised modules used across several regions.

---

## The Starting Point

### Digitising known workflows

Oriental Merchant had no ERP. Every department built its own processes through Excel, email, and manual handovers. These tools were created by people who understood the business well, but their limitations were obvious:

- Each team maintained separate files and rules
- Reports took hours to prepare
- Forecasting meant cross-referencing many spreadsheets
- Delivery routes were drawn manually every morning
- Order history was stored in binders
- Input validation was inconsistent
- Regions developed their own habits and logic

OMIS was not designed to reinvent the company. It was designed to digitise known workflows, remove unnecessary friction, and give people immediate access to the information they relied on.

---

## Why OMIS Mattered

### The company had grown past what manual tools could support

Teams were spending more time finding information than using it.

- Sales reps needed live stock and pricing data.
- Procurement needed a single place to plan national replenishment.
- Logistics needed to eliminate hours of manual route planning.
- Managers needed transparency over operations instead of chasing files.

OMIS became the central platform that brought these needs together.

---

## My Role

### Lead UX designer and primary front-end developer

I served as the lead UX designer and one of the primary front-end developers on the project. My responsibilities included:

- Designing and wireframing every module in OMIS
- Creating the platform structure and navigation
- Building a design system to support dozens of internal applications
- Working directly with department heads to understand workflows deeply
- Translating their processes into clear digital interfaces
- Running discovery sessions and shadowing staff
- Collaborating with backend engineers to define feasible solutions
- Presenting modules to regional teams
- Creating training materials, onboarding guides, and stakeholder presentations

The development team had strong engineering expertise, but little exposure to UX. I introduced design principles such as hierarchy, contrast, spacing, and interaction patterns. This created a shared language that helped us work more effectively as a team.

---

## Who OMIS Serves

### OMIS needed to support nearly every operational team in the business

Each module had its own requirements, but everything needed to feel like it belonged in the same ecosystem.

**Sales**
Customer ordering, promotions and pricing, sales history, customer delivery information, SKU search, account data

**Procurement**
Stock forecasting, supplier planning, warehouse allocation, container planning, inventory visibility, inter-warehouse transfers

**Logistics**
Transport management, daily route planning, live driver tracking, signature capture, photo evidence, route history

**Warehouse**
Receiving, dispatch, adjustments, transfers

**Shipping**
Container registry, purchase order registry, best-before-date tracking

**Admin and IT**
User permissions, module access, image storage

---

## Problems We Needed to Solve

### Department-specific pain points

**Sales**
Order creation involved many spreadsheets and slow cross-checking. Customer history and stock data were difficult to find. Promotions varied by region.

**Logistics**
Drivers had no digital tools. There was no tracking, no proof of delivery, and no route history. Planning took hours.

**Procurement**
Forecasting required intense manual effort. Warehouse splits were inconsistent. Container plans relied heavily on individual experience and were not centralised.

**Shipping**
Container records were scattered across files and emails.

**Company-wide**
There was no centralised data, slow communication, and constant duplication. Mistakes were common because validation varied across spreadsheets.

OMIS had to solve each of these issues without overwhelming users or removing the logic they trusted.

---

## Design Principles

### Guardrails for every module

- **Respect existing mental models**  
  Many staff were experienced with spreadsheets. AG Grid preserved familiar behaviour such as multi-row copy, drag-to-fill, and rapid filtering.

- **Gate user input**  
  Open text fields were replaced with dropdowns, selectors, and auto-search wherever possible. This improved accuracy and reduced support requests.

- **Break workflows into steps**  
  Complex modules like PO planning were divided into clear stages to reduce cognitive load.

- **Use automation responsibly**  
  Automation handled suggestions and repetitive calculations, but users retained the ability to override values. Tooltips explained the logic behind automated fields.

- **Build consistency through foundations**  
  Typography, spacing, interaction patterns, and page headers were consistent across modules. Layouts were tailored to each workflow.

---

## The Design System

### Structure without restriction

The design system provided structure without restricting functionality. It included:

**Shared foundations**
- Typography scale, spacing rules, standardised headers
- Departmental colour coding
- Consistent icons

**Components**
- SKU search with advanced filtering
- AG Grid table variations
- Forms, step flows, drawers and modals, validation patterns

**Interaction patterns**
- Inline validation and clear success feedback
- Tooltip explanations
- Expand and collapse behaviour for dense content

---

## Key Module: Purchase Order System

### Procurement's most complex workflow

The PO System was the most complex part of OMIS. Procurement needed to manage replenishment across four national warehouses and align with vendor schedules.

**Challenges:**
- Large volumes of data
- Dependent decisions
- Complex forecasting logic
- Warehouse splits
- Container planning
- Validation at every step

**Solution:**
- Structured workflow into stages
- Automated suggestions with manual overrides
- Tooltips explaining calculations
- Expandable tables
- Multi-layer validation
- Clear success flow

---

## Key Module: Transport Management System

### Digitising delivery operations

Before TMS, delivery routes were planned manually with printed maps. Drivers had no digital tools or proof-of-delivery workflow.

**Constraints:**
- Offline mode
- Simple driver interactions
- Manager visibility
- Signature and photo capture

**Solution:**
- Automated route generation
- Offline-capable driver app
- Local caching and sync on reconnect
- Logistics dashboard
- Digital route history

---

## Key Module: Sales Ordering Program

### Replacing a scattered workflow

The Sales Ordering Program replaced a scattered workflow involving many spreadsheets.

**Improvements:**
High-speed SKU search, consolidated customer information, real-time stock visibility, integrated promotions, parallel and saved orders, built-in validation.

---

## Regional & Departmental Challenges

### Adapting without fragmenting the system

Different regions required different rules. For example, Australia used a structured promotional system while the Netherlands and the UK were more flexible. Modules were adapted without breaking overall structure. Feature requests were versioned so teams could validate needs after using the module.

---

## Impact

### Efficiency across departments

- Efficiency improved significantly across all departments.
- Order creation and route planning became faster.
- Procurement gained a unified system for replenishment.
- Staff no longer relied on email for data.
- Accuracy increased due to consistent validation.
- Managers gained instant access to history and analytics.
- Delivery proof became digital and searchable.
- Modules expanded from seven to more than thirty and now support multiple regions.

---

## What I Learned

### Personal takeaways

- How to break down complex workflows into smaller steps
- How to design for users who rely on familiar spreadsheet behaviour
- How to use a design system as a foundation, not a limitation
- How to manage scope through versioning
- How to communicate clearly with stakeholders and engineers
- How to design confidently within complex constraints

---

## Reflection

### Looking forward

Seeing staff rely on OMIS every day is rewarding. The platform has made daily work faster, clearer, and more consistent across the organisation. It continues to grow as new modules are added and existing ones are refined. I am proud to have contributed to a system that supports so many people across multiple regions and departments.

