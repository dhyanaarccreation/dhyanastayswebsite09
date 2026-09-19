# Dhyana Stays — Website

Promotional / conversion website for Dhyana Stays. **Start here → [`PROJECT_BRIEF.md`](./PROJECT_BRIEF.md)** — it consolidates the Jira backlog (project `DHN`), the tech stack decisions, the sitemap, the POC build order, and the full content brief from the client's Master Content Document. Read it before writing any code.

## Stack

Next.js 16.2.10 · React 19.2.4 · TypeScript 5 · Turbopack · Tailwind CSS v4 · Framer Motion · Lucide · next-themes · next/font — mirrors the separate Dhyana Stays Application prototype's stack (see `PROJECT_BRIEF.md` §2). This is currently a **front-end-only, mock-data-driven prototype**: no database, no API routes, no real auth, no payment gateway, no deployment config yet.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

```
app/(marketing)/     one route per sitemap page (see PROJECT_BRIEF.md §3)
components/nav/      NavBar (DHN-12), Footer (DHN-27)
components/sections/ real section builds go here as they replace the placeholders
components/ui/       shared UI, including CapabilityBadge (see below)
content/             content-master-chapters.json — structured chapter/topic data from the client's Content Master Document v3.0
tests/               Playwright end-to-end tests
```

Every route currently renders a `SectionPlaceholder` — swap each one out for the real section per the POC build order in `PROJECT_BRIEF.md` §4 (start with DHN-12 Nav / DHN-13 Hero).

## Capability labeling — non-negotiable

Every feature demo (AI planner, booking, live itinerary, etc.) must show whether it's **live**, a **showcase/demo**, or **coming soon** — see `components/ui/CapabilityBadge.tsx` and `PROJECT_BRIEF.md` §1/§6. Never ship a component that "looks real" if the backing feature isn't actually live.

## Scripts

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run test:e2e` — Playwright end-to-end tests

## Jira

Project board: https://dhyanaarccreation.atlassian.net/jira/software/projects/DHN/boards
