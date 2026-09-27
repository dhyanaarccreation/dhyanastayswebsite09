# Dhyana Stays — Website

Promotional / conversion website for Dhyana Stays. **Start here → [`PROJECT_BRIEF.md`](./PROJECT_BRIEF.md)** — it consolidates the Jira backlog (project `DHN`), the tech stack decisions, the sitemap, the POC build order, and the full content brief from the client's Master Content Document. Read it before writing any code.

## Stack

Next.js 16.2.10 · React 19.2.4 · TypeScript 5 · Turbopack · Tailwind CSS v4 · Framer Motion · Lucide · next-themes · next/font — mirrors the separate Dhyana Stays Application prototype's stack (see `PROJECT_BRIEF.md` §2). This is a **front-end-only, mock-data-driven prototype**: no database, no real auth, no payment gateway, no deployment config yet — with one deliberate, scoped exception: **lead capture** (below) has a real API route, because the client asked for form submissions to be reportable in Excel.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

```
app/(marketing)/     one route per sitemap page (see PROJECT_BRIEF.md §3)
app/api/leads/       lead capture submit + export routes (see "Lead capture" below)
components/nav/      NavBar (DHN-12), Footer (DHN-27)
components/sections/ real section builds go here as they replace the placeholders
components/ui/       shared UI, including CapabilityBadge (see below)
content/             content-master-chapters.json — structured chapter/topic data from the client's Content Master Document v3.0
lib/leads.ts         server-side Excel workbook read/append for lead capture
tests/               Playwright end-to-end tests
```

Every route currently renders a `SectionPlaceholder` — swap each one out for the real section per the POC build order in `PROJECT_BRIEF.md` §4 (start with DHN-12 Nav / DHN-13 Hero).

## Lead capture (Contact form)

The DHN-26 Contact form POSTs to `app/api/leads/route.ts`, which appends each
submission as a row in `data/leads.xlsx` (sheet "Contact Enquiries"), via
`lib/leads.ts` using `exceljs`. Host enquiries come through the same form's
"Host" category (`/contact?as=host`). This is the **one** exception to the
front-end-only rule above — added by explicit client decision, since a
lead-gen form that only shows a mock "thanks" screen doesn't let anyone
actually report or analyse who enquired. (The former DHN-55 Become-a-Host form
and its "Host Enquiries" sheet were removed; a workbook that already has that
sheet keeps its rows — they are simply no longer added to.)

- `data/` is git-ignored — it holds real visitor PII (names, emails, phone
  numbers, property locations) and must never be committed.
- Download the current workbook from `GET /api/leads/export`, protected by a
  token: set `LEADS_EXPORT_TOKEN` in the environment, then request
  `/api/leads/export?token=<value>` (or an `Authorization: Bearer <value>`
  header). Without that env var set, the route returns `503` and is fully
  disabled — safe by default, so leads are never publicly downloadable.
- **Durability caveat:** this writes to a file on local disk. That does
  **not** survive on a read-only or ephemeral serverless filesystem (e.g. a
  default Vercel deployment resets `/tmp` between invocations) — it needs a
  server with persistent storage (a VM, a container with a mounted volume,
  etc.), or migrating `lib/leads.ts` to a real database before real client
  leads depend on it long-term.
- The form includes a hidden honeypot field to drop obvious bot spam
  without adding a CAPTCHA dependency.

## Capability labeling — non-negotiable

Every feature demo (AI planner, booking, live itinerary, etc.) must show whether it's **live**, a **showcase/demo**, or **coming soon** — see `components/ui/CapabilityBadge.tsx` and `PROJECT_BRIEF.md` §1/§6. Never ship a component that "looks real" if the backing feature isn't actually live.

## Scripts

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run test:e2e` — Playwright end-to-end tests

## Jira

Project board: https://dhyanaarccreation.atlassian.net/jira/software/projects/DHN/boards
