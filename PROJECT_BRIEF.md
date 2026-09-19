# Dhyana Stays — Website Project Brief

**Purpose of this file:** this is the handoff bridge from Jira planning into local development. Open this repo in VS Code, point Claude Code (or any coding agent) at this file first, and it has everything needed to start scaffolding without re-asking the client for context that already exists.

- **Jira project:** DHN — "dhyanastayswebsite" — https://dhyanaarccreation.atlassian.net/browse/DHN
- **This repo:** https://github.com/dhyanaarccreation/dhyanastayswebsite09.git (empty at time of writing — this brief plus the initial scaffold will be the first commit)
- **Client:** Dhyana Arc Creation
- **Two separate codebases to keep straight:**
  1. **The promotional website** (this repo) — the marketing/storytelling site described in this brief. Discover → Understand → Explore → Trust → Convert to app download. No booking, no payments, no live AI happen here.
  2. **The Dhyana Stays Application** — a separate Next.js front-end prototype (mock-data-driven, no backend yet) that the website's "Explore the App" CTAs point to. Its tech stack is documented in the Tech Stack section below (DHN-32–37) because the website should likely reuse the same stack for consistency, but it is a different codebase and DHN-36 (Context providers / localStorage hooks / route map) describes THAT app, not this website — it still needs the actual application codebase to be verified/completed.

---

## 1. Guiding Principle

> **The Website Explains. The Application Executes.**

| Website (this repo) | Application (separate repo) |
|---|---|
| Discover | Plan |
| Understand | Personalise |
| Trust | Book |
| Desire | Travel |
| — | Manage |

The website is a **brand, promotional and conversion** site. It showcases curated stays, experiences, the AI planner, and the host/curator ecosystem — but every feature demo must be honestly labeled as **available now**, **showcase/demo (not live)**, or **coming soon**, so the site never implies booking, payments, or live AI planning are functional when they aren't. This labeling rule applies to every single content topic below — carry it into every section's copy and UI.

---

## 2. Recommended Tech Stack for the Website

No tech-stack decision has been formally locked for the **website** codebase specifically (DHN-30 exists in Jira as "Create the tech stack for the website based on the web app" and is still open). The client-supplied stack below (DHN-32–37) is documented for **the separate Application prototype**. Recommendation: mirror it for the website for consistency (shared design tokens, same component conventions, same team familiarity), unless the developer starting this repo has a reason to diverge — flag that decision back in DHN-30 once made.

### Application stack (client-confirmed, DHN-32–37) — mirror this for the website unless decided otherwise

**Architecture at a glance** (DHN-33): layered stack — Presentation (Next.js App Router pages/components) → Styling (Tailwind v4) → Interaction (Framer Motion, Lucide icons) → State/Data (React Context + localStorage-backed hooks) → Tooling (ESLint, Playwright, npm scripts, Turbopack/webpack).

**Core framework** (DHN-34):
- Next.js 16.2.10
- React 19.2.4
- TypeScript 5
- Turbopack vs. webpack — confirm per npm script against the actual `package.json` (pending verification against real codebase)

**Styling, UI & motion** (DHN-35):
- Tailwind CSS v4 (config + design tokens)
- Framer Motion (animation)
- Lucide (icon set)
- next-themes (dark/light mode)
- next/font (font loading)

**Data, state & routing** (DHN-36 — ⚠️ not yet verified, needs the actual Application codebase):
- React Context providers + localStorage-backed hooks for: wishlist, itinerary, prebook
- Full App Router route-group map
- **This task is blocked until someone supplies the actual Application repo/zip/folder** — do not fabricate file paths; document only what's confirmed from real source.

**Tooling & honest gaps** (DHN-37):
- ESLint config, Playwright test setup, npm scripts — to be documented from the real repo
- **Explicitly NOT yet in the stack:** no database, no API routes, no real authentication, no payment gateway, no deployment configuration. The Application is currently a **mock-data-driven front-end prototype only.**

**Action needed:** if you have access to the Application's GitHub repo, share it (or its zip) so DHN-36/DHN-37 can be completed accurately instead of left as gaps.

---

## 3. Information Architecture / Sitemap

```
/                          HOME (full storytelling journey lives here)
├── /about
├── /experience-beyond-stay
├── /curated-stays
├── /experiences
├── /travel-guides         ← chapter exists in Master Content Doc; add as its own route (see §5 gap note)
├── /why-dhyana
├── /services
│   ├── /services/travellers
│   ├── /services/hosts
│   └── /services/travel-curators
├── /ai-trip-planner
├── /ecosystem
├── /app-features
├── /testimonials
├── /faq
├── /contact
├── /app                   ← "Access the Application" conversion page
└── /legal
    ├── /privacy-policy
    ├── /terms-and-conditions
    ├── /cancellation-policy
    └── /cookie-policy
```

**Primary nav (desktop):** Logo · About · Experience · Curated Stays · Services · AI Planner · For Hosts · [ Explore the App ] button

**Dropdown structure:**
- *Experience* → Experience Beyond Stay, Curated Stays, Experiences, Travel Guides
- *Services* → For Travellers, For Hosts, For Travel Curators
- *More* → Why Dhyana, Dhyana Ecosystem, App Features, Testimonials, FAQ, Contact

---

## 4. POC Scope — Phase 1 (Jira Epic DHN-5)

> "Build a clickable/scrollable proof-of-concept covering all Phase 1 (High priority) sections from the Feature Planning doc, using placeholder/sample content and media, to validate flow, storytelling pacing, and interactions before full development."

**Recommended build order** (top to bottom = page order; start here):

| # | Jira | Section | Notes |
|---|---|---|---|
| 1 | DHN-12 | Sticky Navigation & Mobile Menu | Build shell first — everything else sits inside it |
| 2 | DHN-13 | Video Landing Hero Section | First visual impression — build early to validate tone/motion direction |
| 3 | DHN-14 | About Dhyana Section | |
| 4 | DHN-15 | Experience Beyond Stay Section | |
| 5 | DHN-16 | Curated Stays Showcase | |
| 6 | DHN-17 | Why Dhyana Differentiator Section | |
| 7 | DHN-18 | Experiences Showcase Grid | |
| 8 | DHN-19 | Services Tabs — Travellers / Hosts / Curators | |
| 9 | DHN-20 | AI Trip Planner Showcase — Static Demo | Must be clearly labeled "demo," not live |
| 10 | DHN-21 | Dhyana Ecosystem Visual | |
| 11 | DHN-22 | Application Features Showcase | |
| 12 | DHN-23 | Testimonials Slider | |
| 13 | DHN-24 | App Download / Access CTA — QR + Buttons | |
| 14 | DHN-25 | FAQ Accordion | |
| 15 | DHN-26 | Contact & Lead Generation Forms — Category Based | Traveller / Host / Curator / Partner — form changes based on selection |
| 16 | DHN-27 | Footer | Build shell alongside nav |

**⚠️ Two gaps identified between the original POC story list and the client's later Master Content Document (flagged in Jira on DHN-2/DHN-43/DHN-48, decision still pending from the client):**
- **Travel Guides** is a full chapter in the Master Content Document (curators, destination stories, day-by-day itineraries, influencer content, earning model) but has no dedicated POC story yet — currently folded into Home section 01.6 only.
- **For Hosts** is far deeper in the Master Content Document (host problems, Dhyana's solution, property onboarding, marketing, hospitality consultancy, property management, become-a-host flow) than the original "Services tab" treatment (DHN-19) implies — client docs suggest a full dedicated page, not just a tab.

Recommend confirming with the client whether to add `DHN-54 Travel Guides Section (POC)` and `DHN-55 For Hosts Dedicated Page (POC)` before or shortly after this initial build.

---

## 5. Content Master Document — Chapter Briefs (Jira Epic DHN-2, Tasks DHN-38–53)

Source: client-supplied **"Dhyana Stays Website Content Master Document v3.0"** (151 pages, 16 chapters, 98 topics, attached to DHN-31).

**Important honest gap, carried over from Jira:** only **Chapter 01 (Home)** has fully-specified literal Content/UI requirement bullets per topic. Chapters 02–16 currently only have a one-line **purpose** per topic — the literal on-page copy, exact media list, and CTA text for those chapters still needs to be drafted (that's the remaining work tracked under DHN-38–53). Where a topic below has no "Content/UI requirements" line, treat the purpose statement as direction, not final copy — do not invent detailed copy that wasn't in the source document.

### Chapter 01 — HOME  (DHN-38)

- **01.1 Hero** — Create an immediate emotional connection through a cinematic premium landing experience. Communicate “Experience Beyond Stay” and show that Dhyana is about curated stays, destinations and experiences, not only accommodation.
  - Content/UI requirements: Full-screen video/visual; headline; supporting copy; primary Explore/Open App CTA; optional secondary CTA; scroll cue; mobile poster fallback; reduced-motion support
- **01.2 What is Dhyana?** — Give a concise definition of Dhyana Stays, the problem it addresses, and how curated stays, destinations, experiences and technology connect.
  - Content/UI requirements: Brand definition; problem/opportunity; curated proposition; link to About
- **01.3 Experience Beyond Stay** — Make the brand philosophy the emotional centre: a trip combines stay, destination, food, culture, activities, wellness and events.
  - Content/UI requirements: Stay; Destination; Food; Culture; Activities; Wellness; Events; Complete Journey
- **01.4 Curated Stays** — Show selective, high-quality properties through editorial storytelling rather than a crowded OTA grid.
  - Content/UI requirements: Luxury/premium; nature/farm; unique architecture; couple; family; wellness; workation; tiny/unique stays; images/video; location; highlights; app CTA
- **01.5 Experiences** — Demonstrate that Dhyana connects accommodation with local discovery.
  - Content/UI requirements: Local tours; food; culture; nature; adventure; wellness/yoga; farming; photography; workshops; music/events; property experiences
- **01.6 Travel Guides** — Introduce handpicked Travel Curators/influencers and real destination stories.
  - Content/UI requirements: Profile; destination; Day 1/2/3 videos; Instagram/YouTube links or embeds; story; property first then itinerary; search by location/curator; Open in AI Planner; earning opportunity
- **01.7 AI Trip Planner** — Present AI as the personalisation layer. Users can start from preferences or a Travel Guide and customise rather than blindly copy an itinerary.
  - Content/UI requirements: Destination/dates; travellers; occasion; budget; stay/experience preferences; AI itinerary preview; customise in app; AI Trip Guide; release-status label
- **01.8 Why Dhyana** — Summarise practical differentiation without vague claims.
  - Content/UI requirements: Less noise; handpicked stays; storytelling; curated experiences; trusted curators; AI planning; complete journey
- **01.9 Ecosystem** — Visually explain the connected stakeholder model.
  - Content/UI requirements: Traveller; Host; Travel Curator; Experience Provider; Dhyana; future architecture/investor/local-community relationships where approved
- **01.10 App Features** — Explain what happens after the website.
  - Content/UI requirements: Discover; Stays; Experiences; Travel Guides; AI Planner; Itinerary; Booking; Traveller Dashboard; Support
- **01.11 Testimonials** — Build trust with genuine, approved feedback.
  - Content/UI requirements: Traveller; Host; Curator stories; written/video; verified outcomes where available; responsive carousel/grid
- **01.12 Final CTA** — End with a clear next action.
  - Content/UI requirements: Explore/Open App; QR; Host enquiry; Curator enquiry; short brand reminder

### Chapter 02 — ABOUT DHYANA  (DHN-39)

- **02.1 Our Story** — Explain the observation behind Dhyana: travellers face fragmented, noisy discovery while quality properties and local experiences can struggle with positioning and demand. Dhyana connects curation, architecture, hospitality, technology and destination storytelling.
- **02.2 Vision** — Describe the long-term ambition for a trusted, experience-led hospitality ecosystem connecting quality properties, destinations, communities and intelligent technology.
- **02.3 Mission** — Explain how Dhyana delivers the vision: curate quality stays, create destination experiences, generate demand through storytelling, support hosts, empower curators and personalise travel with AI.
- **02.4 Beliefs** — State guiding principles: quality over quantity; curation over noise; storytelling over generic listings; experiences over room-only travel; technology enhances hospitality; local communities matter; trust comes from real information.
- **02.5 Dhyana Difference** — Bring the combined model together: curated hospitality, architecture expertise, experience integration, Travel Curators, AI personalisation and an ecosystem approach.

### Chapter 03 — EXPERIENCE BEYOND STAY  (DHN-40)

- **03.1 Stay** — The foundation: distinctive, quality-conscious properties with clear information about architecture, setting, amenities and suitable traveller types.
- **03.2 Destination** — Explain place character, neighbourhoods, landscape, access, seasonality, local context and reasons to visit.
- **03.3 Food** — Local cuisine, curated food, property dining and authentic food discovery as part of destination identity.
- **03.4 Culture** — Heritage, traditions, art, crafts, communities and respectful cultural discovery.
- **03.5 Activities** — Tours, cycling, workshops, photography, nature, adventure, family activities and other approved activities.
- **03.6 Wellness** — Yoga, meditation, retreats, nature-based relaxation and approved wellness experiences.
- **03.7 Events** — Festivals, music, retreats, workshops, property events and community programmes where relevant and date-sensitive.
- **03.8 Complete Journey** — Show the full flow: choose stay → discover destination → add experiences → build itinerary → book → travel → receive support.

### Chapter 04 — CURATED STAYS  (DHN-41)

- **04.1 What is a Curated Stay?** — A property intentionally selected for its combination of guest experience, setting, design/architecture, cleanliness, safety, maintenance, sustainability, operational readiness and story.
- **04.2 Selection Process** — Explain the evaluation philosophy. Where applicable this can include property review, physical inspection, guest-readiness checks, amenities, maintenance and operational assessment. Publish only the approved public checklist.
- **04.3 Stay Categories** — Use categories to reduce noise: Luxury Collection, Tiny Houses, Farm Stays, Nature Escapes, Wellness Retreats, Weekend Getaways, Couple, Family, Pet-Friendly and Workation.
- **04.4 Property Storytelling** — Every property should have a story: architecture/interior, rooms/units, amenities, location, destination, activities, food, unique features and suitable traveller. Use video where available.
- **04.5 Explore Stays** — Website showcases selected properties and routes users to the app. Real-time availability, pricing, payment and booking management remain operational app functions.

### Chapter 05 — EXPERIENCES  (DHN-42)

- **05.1 Local** — Neighbourhood walks, local guides, community visits and destination-specific activities.
- **05.2 Food** — Curated meals, food trails, cooking, farm-to-table and property dining where verified.
- **05.3 Culture** — Heritage, crafts, art, music, festivals and community-led experiences.
- **05.4 Nature** — Beaches, forests, farms, landscapes, birding and low-impact nature experiences.
- **05.5 Adventure** — Cycling, trekking, water and other activities only where safety and operator readiness are verified.
- **05.6 Wellness** — Yoga, meditation, retreats, spa and slow-travel experiences where available.
- **05.7 Property Experiences** — Bonfires, farm activities, workshops, private dining, wellness and other experiences within a stay.
- **05.8 Events** — Time-bound retreats, cultural programmes, workshops, music and community events; live availability belongs in the app.

### Chapter 06 — TRAVEL GUIDES  (DHN-43)

- **06.1 Travel Curators** — Profiles should show photo, bio, destinations, social channels and curated trips. Curators are handpicked rather than an open unverified directory.
- **06.2 Travel Stories** — Show why the creator visited, where they stayed, what they experienced and what made the trip memorable.
- **06.3 Destination Guides** — Location-based guides combine stays, food, experiences, local context and practical notes; support search by location and curator.
- **06.4 Day-by-Day Trips** — Present sequential Day 1/2/3 videos and connect each day to stay, experience or itinerary items.
- **06.5 Influencer Itineraries** — Do not simply copy/paste a creator itinerary. Open it in the AI Itinerary Creator so dates, budget, group, pace and preferences can be customised.
- **06.6 Earn as Curator** — Explain the opportunity at a high level: approved curators can share stays/itineraries through eligible referral or promo links and receive commissions under the approved commercial agreement. Do not publish an unapproved percentage.

### Chapter 07 — AI TRIP PLANNER  (DHN-44)

- **07.1 Dhyana AI** — Travel planning assistant that understands destination, dates, traveller profile, budget and preferences. AI assists hospitality rather than replacing it.
- **07.2 Trip Preferences** — Destination, dates, traveller count, travel type, occasion, budget, stay style, food, activities, wellness/adventure, pace and constraints.
- **07.3 AI Itinerary** — Day-by-day plan with stays, experiences, routes and practical suggestions. Clearly distinguish recommendations from confirmed availability.
- **07.4 Customisation** — Users can modify the plan. A Travel Guide itinerary can be the starting point rather than a fixed itinerary.
- **07.5 AI Trip Guide** — Future/live capability for destination context, recommendations, itinerary help and support. Status must be clearly labelled.
- **07.6 Booking** — Intended flow: Plan → Review → Select → Book. Live availability, checkout and payment occur in the operational app/booking engine unless explicitly integrated.

### Chapter 08 — SERVICES  (DHN-45)

- **08.1 For Travellers** — Curated stay discovery, destination inspiration, local experiences, Travel Guides, AI planning, itinerary customisation, booking and support.
- **08.2 For Hosts** — Property onboarding, positioning, storytelling, demand generation, marketing, hospitality consultancy, guest-experience improvement and—where contracted—property management. Commercial terms require approval.
- **08.3 For Travel Curators** — Access to curated stays/destinations, content opportunities, itinerary curation, referral/promo mechanisms and eligible commission-based earning. Avoid unapproved commercial promises.

### Chapter 09 — WHY DHYANA  (DHN-46)

- **09.1 Less Noise** — Intentional curation narrows discovery so users can spend more time understanding suitable places.
- **09.2 Handpicked** — Properties are selected using an internal quality philosophy rather than simply maximising listing count.
- **09.3 Storytelling** — Video, photos, architecture, amenities, destination context and property stories help users understand what they are choosing.
- **09.4 Experiences** — Food, culture, nature, adventure, wellness, activities and events extend the journey beyond the room.
- **09.5 Trusted Curators** — Handpicked creators provide destination stories and first-hand inspiration with clear identification and permissions.
- **09.6 AI** — AI converts preferences and inspiration into a personalised plan and lets travellers customise a Travel Guide itinerary.
- **09.7 Complete Journey** — Dhyana connects discovery, stay selection, experiences, itinerary planning and app-based booking/support.

### Chapter 10 — ECOSYSTEM  (DHN-47)

- **10.1 Traveller** — Discovers stays and experiences, uses Guides and AI, builds an itinerary and completes the journey in the app.
- **10.2 Host** — Provides a stay and participates through onboarding, storytelling, demand generation and hospitality support.
- **10.3 Travel Curator** — Creates destination stories, explores curated stays, shares experiences and can refer travellers through approved mechanisms.
- **10.4 Experience Provider** — Supplies local food, culture, nature, adventure, wellness, activities or events.
- **10.5 Dhyana** — Connects curation, storytelling, technology, partnerships, demand generation and the traveller journey.

### Chapter 11 — FOR HOSTS  (DHN-48)

- **11.1 Host Problems** — Fragmented demand, OTA dependence, difficulty standing out, weak storytelling/positioning, operational gaps and difficulty reaching suitable travellers.
- **11.2 Dhyana Solution** — Curated discovery, property storytelling, destination marketing, Travel Curator collaborations and complete guest experience. Do not guarantee occupancy/revenue.
- **11.3 Property Onboarding** — Initial conversation → property assessment → information/media collection → content preparation → listing setup → quality checks → campaign preparation → launch. Treat timing as internal operations.
- **11.4 Marketing** — Property video/photos, destination storytelling, social content, Travel Curators, cluster/region campaigns and targeted demand generation.
- **11.5 Hospitality Consultancy** — Support with USP, storytelling, guest experience, architecture/interior direction, hospitality standards and operational readiness.
- **11.6 Property Management** — Where contracted: guest communication, operations, occupancy optimisation, standards and reporting. Exact scope/fee must be contractual.
- **11.7 Become a Host** — Enquiry form: property, location, contact, type, approximate inventory, current status and partnership interest; include consent/privacy.

### Chapter 12 — APP FEATURES  (DHN-49)

- **12.1 Discover** — Explore destinations, curated collections, stories and recommendations.
- **12.2 Stays** — View property story, photos/video, location, amenities, availability/pricing when live and booking actions.
- **12.3 Experiences** — Discover local, food, culture, nature, adventure, wellness, property and event experiences.
- **12.4 Travel Guides** — Browse curators, watch stories, open guides and use itineraries as AI customisation starting points.
- **12.5 AI Planner** — Enter constraints/preferences, generate a plan, review options and refine.
- **12.6 Itinerary** — View day-by-day plans, combine stays and experiences and manage selections.
- **12.7 Booking** — Operational booking, payment, confirmation and management through the approved application.
- **12.8 Traveller Dashboard** — Current trip status, itinerary, booking details, updates/documents and support.
- **12.9 Support** — Traveller assistance and, when actually launched and tested, emergency/SOS pathways.

### Chapter 13 — TESTIMONIALS  (DHN-50)

- **13.1 Travellers** — Feedback on property, destination, experiences, planning and overall journey.
- **13.2 Hosts** — Verified feedback on onboarding, storytelling, marketing, guest experience or operational support; avoid unsupported guarantees.
- **13.3 Travel Curators** — Feedback on curated stays, destination experiences and creator collaboration.

### Chapter 14 — FAQ  (DHN-51)

- **14.1 Traveller** — What is Dhyana? How are stays curated? Where is it available? How do Guides work? Can an influencer itinerary be customised? How does AI work? How do I book?
- **14.2 Host** — How can I list? What is onboarding? What media is needed? How are properties marketed? What support is available? How do I contact the host team?
- **14.3 Travel Curator** — Who can apply? How are curators selected? What content can I create? How do referral/promo links work? How are eligible commissions handled? How do I apply?

### Chapter 15 — CONTACT  (DHN-52)

- **15.1 General** — Official company contact information, social links and general enquiry route.
- **15.2 Traveller** — Questions about destinations, stays, experiences, app access or bookings; route app-support cases appropriately.
- **15.3 Host** — Property partnership, onboarding, hospitality consultancy, marketing and property management.
- **15.4 Travel Curator** — Applications, collaboration, content partnerships and referral opportunities.
- **15.5 Partnership** — Experience providers, brands, communities, tourism organisations, technology and strategic partnerships.

### Chapter 16 — FOOTER  (DHN-53)

- **16.1 Explore** — Curated Stays, Experiences, Travel Guides, Destinations and other primary discovery areas.
- **16.2 Services** — Traveller, Host and Travel Curator services.
- **16.3 Company** — About, Story, Vision/Mission, Contact and approved company pages.
- **16.4 App** — Download/access, app features and QR/store CTA.
- **16.5 Legal** — Privacy Policy, Terms, Cookie Policy and other required legal/compliance pages.
- **16.6 Social Media** — Verified official Instagram, YouTube, LinkedIn and other approved channels.
---

## 6. Working Rules for Whoever Codes This

1. **Capability labeling is non-negotiable.** Every feature demo (AI planner, booking flow, live itinerary, etc.) shown on the website must visually indicate whether it's live, a showcase/demo, or coming soon. Don't let a component "look real" if the backing feature doesn't exist yet.
2. **This is a front-end-only build for now.** No database, no real API routes, no real auth, no payment gateway, no deployment config — matches the Application's current state (DHN-37). Use placeholder/sample content and static/mock data for the POC (DHN-5 explicitly calls for this).
3. **Don't fabricate content.** For chapters 02–16, only the topic purpose is confirmed from the client. If literal copy is needed to make the POC look real, mark it clearly as **placeholder copy — pending client draft** in code comments or a content TODO list, so it's never mistaken for approved copy.
4. **Two open decisions block full scope lock-in** (see §4): Travel Guides and For Hosts may need dedicated sections/pages beyond what's currently in DHN-5's story list. Build the current 16 stories first; leave layout flexible enough to slot these in.
5. **Suggested repo structure** (Next.js App Router, mirroring the sitemap in §3):
   ```
   app/
     (marketing)/
       page.tsx                     → Home (all storytelling sections, per §4 build order)
       about/page.tsx
       experience-beyond-stay/page.tsx
       curated-stays/page.tsx
       experiences/page.tsx
       travel-guides/page.tsx        → pending scope confirmation, see §4
       why-dhyana/page.tsx
       services/
         travellers/page.tsx
         hosts/page.tsx
         travel-curators/page.tsx
       ai-trip-planner/page.tsx
       ecosystem/page.tsx
       app-features/page.tsx
       testimonials/page.tsx
       faq/page.tsx
       contact/page.tsx
       app/page.tsx                 → "Access the Application" conversion page
       legal/
         privacy-policy/page.tsx
         terms-and-conditions/page.tsx
         cancellation-policy/page.tsx
         cookie-policy/page.tsx
   components/
     nav/                            → DHN-12
     sections/                       → one folder per DHN-13..27 section
     ui/                             → shared buttons, cards, accordions, sliders
   content/                          → structured content per chapter (from §5), keep copy out of components
   ```
6. **Jira ↔ GitHub linking (optional but recommended):** if your Jira/GitHub integration is connected, reference issue keys in commit messages and PR titles (e.g. `DHN-13: build video landing hero section`) so commits show up automatically on each Jira issue's Development panel. Ask if you'd like help setting up that connection.

---

## 7. Assets Still Needed

These were referenced in Jira but not yet uploaded into this working context — upload directly to chat when available, since Jira attachment content can't be fetched programmatically:
- `INVESTOR PITCH.docx`
- `Dhyana Stays - Full UI Reference.pdf` (~66MB)
- `Dhyana.png` logo file
- The actual **Dhyana Stays Application** codebase (repo link, zip, or connected folder) — needed to complete DHN-36/DHN-37 accurately and to confirm whether the website should share components/design tokens with it.

---

## 8. Jira Reference Index

| Area | Epic | Key Tasks/Stories |
|---|---|---|
| Content strategy & copy | DHN-2 | DHN-28, DHN-29, DHN-38–53 (16 chapter briefs) |
| Wireframing | DHN-3 | — |
| UI visual design | DHN-4 | — |
| **POC / Prototype (start here)** | **DHN-5** | **DHN-12–27** (16 sections) |
| Full front-end build | DHN-6 | — |
| Forms, lead capture, CMS | DHN-7 | — |
| Media production | DHN-8 | — |
| QA & cross-device testing | DHN-9 | — |
| SEO & analytics | DHN-10 | — |
| Launch | DHN-11 | — |
| Tech stack (website) | DHN-30 | open — decide whether to mirror Application stack |
| Requirements source doc | DHN-31 | all planning attachments live here |
| Application tech stack (reference) | DHN-32 | DHN-33, DHN-34, DHN-35, DHN-36 (blocked), DHN-37 |

Full board: https://dhyanaarccreation.atlassian.net/jira/software/projects/DHN/boards

---

*Generated from Jira project DHN and the client's planning documents (Requirement & Scope Definition v1.0, UI/UX Ideation & User Flow, Feature Planning, Information Architecture & Sitemap, and the Content Master Document v3.0). Keep this file updated as decisions get made — it's meant to be the single source of truth bridging Jira and this codebase.*
