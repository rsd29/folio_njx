# SalesIQ B2B Ordering Platform

**Client:** Oriental Merchant  
**Role:** Lead UX Designer  
**Timeline:** 6-10 months initial build  
**Regions:** Australia, Netherlands, Canada, UK, Europe

## Project Description

SalesIQ is Oriental Merchant's end-to-end wholesale ordering platform, replacing phone and paper workflows with a live catalog that surfaces customer-specific pricing, stock, and promotions for thousands of grocers across every region.

---

## The Challenge

### From Phone Orders to Digital at Scale

Oriental Merchant, one of the world's largest Asian FMCG distributors, serves everyone from independent family grocers to major national chains like **Coles and Woolworths**. Despite this scale, their entire ordering process was offline: phone calls, paper catalogs, and field reps manually processing every order.

Store owners had no visibility into **real-time pricing or stock**. Promotions with complex tier structures required rep interpretation. Every order risked miscommunication and data entry errors, and customers had no way to save patterns or access history.

The business needed a **scalable digital platform** that could make complex promotional logic feel simple.

The platform also needed to serve two distinct use cases simultaneously. Sales reps required speed to process orders quickly on behalf of customers, while end users expected a polished commercial experience. Staff accounts operated with a second authorization tier, allowing them to log into any store and instantly access that customer's specific pricing, product catalog, and promotional structures.

---

## Project Overview

### What We Built

**SalesIQ** is a global B2B e-commerce platform that provides self-service ordering for wholesale customers. What started as a single-region pilot rapidly expanded to become the core ordering tool across all of Oriental Merchant's international operations.

The platform handles **region-specific catalogs, dynamic pricing, live stock visibility, tiered promotions, and multiple languages**, while maintaining familiar shopping patterns users already know.

### My Responsibilities

I owned UX from end to end:
- Research and stakeholder discovery
- Information architecture and flow planning
- Wireframing and high-fidelity UI design
- Design system and promotional asset design
- Interaction design and prototyping
- Front-end implementation
- Continuous iteration based on analytics and feedback

### The Team

- 3 front-end developers (including myself)
- 3 back-end developers
- Product manager
- Agile delivery model across multiple regions

---

## Business Objectives

### What Success Looked Like

- Enable **self-service ordering** across all customer segments
- Reduce field rep dependency for order entry
- Eliminate pricing and data entry errors
- Build **scalable infrastructure** for global expansion
- Automate complex promotional logic
- Increase promotional participation
- Improve order volume and accessibility

Transform Oriental Merchant from **high-touch analog** to **low-touch digital** ordering while maintaining service quality. Enable **customer independence** with pricing accuracy and promotional automation at **global scale**.

---

## Understanding the Users

### Who We Were Designing For

**Primary Users:**
- **Independent grocery store owners:** Time-poor, often ordering from the shop floor
- **National chain buyers:** High-volume orders, efficiency-focused
- **Specialty store operators:** Niche product needs, promotional sensitivity

**Secondary Users:**
- **Sales representatives:** Using the platform to assist key accounts and place orders on behalf of customers

### Key User Context

- Extremely **time-poor**, often multitasking on the shop floor
- High proportion of **repeat ordering behavior**
- Many English-as-a-second-language users
- Strong preference for **immediately familiar interfaces** over experimental designs
- Already comfortable with mainstream online grocery shopping (Coles, Woolworths)

---

## Research & Discovery

### Understanding the Real Workflow

To understand needs across regions and user types, I used:
- User interviews with store owners and operators
- Task shadowing in retail environments
- Stakeholder interviews with sales reps and regional managers
- Legacy workflow audits
- Surveys for broader feedback
- Sandbox testing with stakeholder groups pre-launch
- Usage analytics post-launch for continuous refinement

### What We Learned

One message emerged consistently: users didn't want beautiful visuals or innovative interactions. They wanted **speed, clarity, and access**.

> **Thinking Aloud**  
> The biggest insight wasn't in the interviews. It was watching store owners order while handling customers. That's when I realized we weren't building a shopping experience, we were building a tool for people who don't have time to think about shopping.

### Key Insights

- **Familiarity matters:** Users already shop on mainstream platforms, so leverage those mental models
- **Promotional visibility drives behavior:** Seeing tier progress directly influenced purchasing
- **Speed over polish:** Workflow efficiency was valued far above aesthetic refinement
- **Repeat patterns dominate:** Order templates would save time for most users
- **Mobile and tablet are critical:** Many customers order while on the shop floor
- **Multilingual support enables adoption:** Reduced training friction and increased confidence

---

## Defining the Experience

### The Two-Pillar Strategy

The UX strategy was built around two core pillars:

**1. Follow Mental Models Users Already Know**

We designed flows that resembled **Coles and Woolworths online shopping**, allowing users to focus on tasks rather than learning new patterns.

**2. Make Complex Business Logic Feel Simple**

Behind the familiar interface: multi-region catalog management, dynamic promotional tiers, and complex pricing. The UX **exposed only what users needed, when they needed it**.

The result: navigation, page structures, and layouts that felt immediately familiar but supported far more sophisticated logic than typical consumer platforms.

> **Thinking Aloud**  
> Choosing familiarity over innovation felt like a compromise at first, but it was the right call. Users didn't need to learn our platform. They needed to trust it immediately. The sophistication lives in the backend, not the interface.

---

## Core Features & Functionality

### Platform Capabilities

**Catalog & Product Management**
- Multi-region product catalogs with region-specific availability
- Region-based pricing and promotional logic
- Live stock visibility across warehouses
- Multi-language support for product information

**Ordering Experience**
- High-density cart UI to view more line items at once
- Saved orders and comprehensive order history
- Edit and cancel flows for existing orders
- Dynamic homepage promotions tailored to user segments

**Promotional System**
- **Custom promotional selector:** One of the most impactful features. Users could combine multiple SKUs within a promo family to hit thresholds without rep intervention
- Promotional tier visual system showing progress toward discounts
- Mix-and-match promotional selection components
- Clear promotional tagging throughout the catalog

**Multi-Device Support**
- Fully responsive desktop, tablet, and mobile layouts
- Optimized for on-the-floor ordering scenarios

---

## Information Architecture

### Structuring the Experience

**Core User Flows:**
- **Home:** Dynamic promotions and quick reorder access
- **Browse:** Category navigation with filtering
- **Search:** Fast product lookup
- **Product Pages:** Detailed information with promotional context
- **Cart:** High-density view with inline editing
- **Checkout:** Streamlined order completion
- **Order History:** Full order archive with reorder functionality
- **Saved Orders:** Template-based repeat ordering
- **Account:** Profile and preferences
- **Language Settings:** Seamless language switching

**Supporting Pages:**
- New arrivals
- Brand browsing
- Promotional banners

*These were nice-to-have features but not critical to the core ordering workflow.*

---

## Visual Design Direction

### Commercial and Clean

**Design Principles**

The visual goal was **commercial and clean**: professional enough for enterprise buyers, familiar enough to feel approachable.

We used **Ng Zorro** as a foundation but created custom styling for:
- Promotional tags and tier indicators
- Cart density and line item display
- Multi-select promotional components

**Intentional Density**

The UI is more compact than typical consumer e-commerce. Users see more line items at once, helping wholesale buyers build orders quickly without excessive scrolling.

This came directly from research: **time-poor users valued information density over whitespace**.

---

## Technical Collaboration & Complexity

### Building at Scale

The platform needed to function differently across regions while maintaining a unified experience.

**Technical Challenges:**
- **Regional variation:** Each region had different promotional rules, pricing, and product availability
- **Evolving requirements:** Data structures evolved as business requirements were discovered
- **Multi-language complexity:** Interface translation and right-to-left considerations
- **Performance:** Heavy data payloads from comprehensive catalogs
- **Distributed architecture:** Region-hosted backend services with master data in Australia

**Our Approach:**
- Dynamic data handling to support regional variation without code duplication
- Flexible design patterns that adapted to local needs
- Reusable components that maintained consistency across regions
- Ongoing performance optimization for large catalogs

> **In Hindsight**  
> We built flexibility into everything, which was smart for global rollout, but it also meant we were solving problems we didn't know we'd have. Sometimes the best architecture is the one you don't need to think about.

---

## Overcoming Challenges

### Navigating Complexity

**Promotional rule diversity**

Each region operated different promotional structures. We created a **flexible visual system** that represented various tier types and discount models without region-specific UI.

**Data structure evolution**

Requirements were discovered during development. We stayed agile, iterating on backend and frontend simultaneously rather than following rigid phases.

**Unexpected global rollout**

What started as a single-region pilot became global faster than anticipated. This increased maintenance load but validated our architectural decisions.

**Small team, global support**

We handled support and training across multiple time zones with a lean team, requiring clear documentation and intuitive design.

> **In Hindsight**  
> The rapid global expansion caught us off guard. We should have planned for success from day one: better documentation, clearer onboarding flows, and more robust error handling. Success is great, but it amplifies every weakness you didn't fix.

---

## Results & Impact

### Measurable Outcomes

**Business Outcomes:**
- **Significant online revenue growth**  
  *Example: Netherlands grew from ~$400K to $1.9M in one year*
- **Reduced rep workload:** Field reps freed from order entry to focus on relationships and sales
- **Higher promotional participation:** Clear visibility drove increased engagement
- **Increased order accuracy:** Eliminated miscommunication and manual errors
- **Faster ordering cycles:** Saved orders and history dramatically reduced repeat order time
- **Improved customer satisfaction:** Positive feedback from independent grocers and major chains

**External Validation**

External QA feedback noted the UI was **professional and polished**. This was validating for a young internal team building an enterprise product competing with established B2B platforms.

---

## Key Learnings

### What Worked and What Didn't

**What Worked:**
- **Familiar mental models:** Leveraging existing shopping patterns accelerated adoption
- **Promotional visibility:** Clear discounts and tier progress directly influenced purchasing
- **High-density UI:** Information-rich layouts served wholesale buyers better than spacious designs
- **Multi-device support:** Tablet and mobile ordering became heavily used scenarios

**What Could Have Been Better:**
- **Promotional data standardization:** Earlier standardization would have prevented maintenance complexity
- **Feature prioritization:** Some features saw little use. More ruthless prioritization would have been valuable
- **Visual restraint:** A more utilitarian direction might have been sufficient
- **Backend performance:** Faster responses would have improved perceived performance

> **In Hindsight**  
> I spent too much time polishing features that barely got used. The analytics told us early on which features mattered, but I kept iterating on the wrong things because they were more interesting to design. Lesson learned: data beats intuition, even when intuition feels right.

---

## What I Would Do Differently

### In Hindsight

1. **Define strict promotional data structures early** to avoid technical debt
2. **Cut low-value features sooner** based on early analytics
3. **Bias harder toward repeat-order workflows** (the majority use case)
4. **Push for faster backend response times** to improve perceived performance
5. **Build comprehensive design documentation earlier** to support global rollout

---

## Future Opportunities

### Where This Could Go Next

- **Streamlined onboarding:** Reduce development dependency for new customer setup
- **Performance optimization:** Faster catalog loading
- **Intelligent reorder suggestions:** ML-based recommendations from order history
- **Simplified promotional management:** Self-service tools for regional teams
- **Region-level configuration:** Enable customization without engineering involvement

---

## Conclusion

### The Bigger Picture

SalesIQ transformed Oriental Merchant's global ordering from an entirely offline process to a scalable digital platform serving five countries. By prioritizing **familiar patterns, promotional visibility, and workflow efficiency** over visual experimentation, we created a tool that served both independent grocers and national chains.

The project reinforced a principle: **understanding user context and mental models matters more than interface innovation for its own sake**.

