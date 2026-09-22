"use client";

import { useState } from "react";
import { Instagram, Youtube, MapPin, Sparkles, Wallet2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { CapabilityBadge } from "@/components/ui/CapabilityBadge";
import { ButtonLink } from "@/components/ui/Button";

// DHN-54 — Travel Guides Section (POC), the dedicated page recommended in
// PROJECT_BRIEF.md §4 (previously a scope gap, folded only into Home 01.6).
// Content basis: Chapter 06 TRAVEL GUIDES one-line topic purposes
// (06.1-06.6, PROJECT_BRIEF.md §5) — only topic purposes are client-approved
// for this chapter, so every curator/story/guide below is sample POC layout
// data (rule 3), not invented final copy.

const CURATORS: {
  name: string;
  handle: string;
  platform: "Instagram" | "YouTube";
  destinations: string;
  bio: string;
}[] = [
  {
    name: "Aritra Sen",
    handle: "@aritra.wanders",
    platform: "Instagram",
    destinations: "Auroville · Pondicherry · Coorg",
    bio: "Slow-travel stories from Tamil Nadu and Karnataka's quieter corners.",
  },
  {
    name: "Meera Krishnan",
    handle: "@meera.trails",
    platform: "YouTube",
    destinations: "Wayanad · Munnar · Palakkad",
    bio: "Kerala wellness retreats and farm stays, filmed as day-by-day vlogs.",
  },
  {
    name: "Devika Rao",
    handle: "@devika.stays",
    platform: "Instagram",
    destinations: "Karaikudi · Chettinad",
    bio: "Heritage architecture and restoration stories from Tamil Nadu's Chettinad belt.",
  },
];

const DESTINATION_GUIDES: { location: string; summary: string; tags: string[] }[] = [
  {
    location: "Auroville, Tamil Nadu",
    summary: "Tiny house stays, farm-to-table food, the Matrimandir and slow mornings.",
    tags: ["Stays", "Food", "Culture"],
  },
  {
    location: "Wayanad, Kerala",
    summary: "Glass-pavilion architecture, forest treks and wellness therapies.",
    tags: ["Stays", "Nature", "Wellness"],
  },
  {
    location: "Karaikudi, Tamil Nadu",
    summary: "Restored Chettinad mansions, courtyard architecture and regional cuisine.",
    tags: ["Stays", "Culture"],
  },
];

const DAY_BY_DAY = [
  { day: "Day 1", plan: "Arrive in Auroville, sunset walk to the Matrimandir viewpoint." },
  { day: "Day 2", plan: "Farm-to-table cooking class, afternoon at a curated wellness session." },
  { day: "Day 3", plan: "Pondicherry heritage walk, curator-recommended lunch, evening departure." },
];

export function TravelGuidesShowcase() {
  const [activeCurator, setActiveCurator] = useState(0);

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-24">
        <SectionHeading
          eyebrow="Travel Guides"
          title="Real trips, told by the people who took them"
          description="Handpicked Travel Curators share destination stories and day-by-day trips — a starting point to customise, not a fixed itinerary to copy."
        />
      </section>

      {/* 06.1 Travel Curators */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h3 className="font-display text-xl font-semibold">Travel Curators</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 opacity-70">
          Curators are handpicked rather than an open, unverified directory — each profile
          shows their destinations, channel and curated trips.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CURATORS.map((curator, index) => {
            const Icon = curator.platform === "Instagram" ? Instagram : Youtube;
            return (
              <button
                key={curator.handle}
                type="button"
                onClick={() => setActiveCurator(index)}
                className={`rounded-2xl border p-6 text-left transition-colors ${
                  activeCurator === index
                    ? "border-brand bg-brand-soft"
                    : "border-border-subtle bg-surface hover:bg-brand-soft/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-brand text-white">
                    {curator.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-display text-base font-semibold">{curator.name}</p>
                    <p className="flex items-center gap-1 text-xs opacity-60">
                      <Icon size={12} /> {curator.handle}
                    </p>
                  </div>
                </div>
                <p className="mt-3 flex items-center gap-1 text-xs opacity-60">
                  <MapPin size={12} /> {curator.destinations}
                </p>
                <p className="mt-3 text-sm leading-6 opacity-70">{curator.bio}</p>
              </button>
            );
          })}
        </div>

        <PlaceholderNote>
          Curator names and stats shown are sample data for layout purposes — final curator
          onboarding and permissions are pending.
        </PlaceholderNote>
      </section>

      {/* 06.2 Travel Stories + 06.4 Day-by-Day Trips */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="rounded-3xl border border-border-subtle bg-surface p-6 lg:col-span-2">
            <h3 className="font-display text-lg font-semibold">Travel Story</h3>
            <p className="mt-2 text-sm leading-6 opacity-70">
              {CURATORS[activeCurator].name} on why the trip stayed with them, where they
              stayed, and what they experienced — told day by day.
            </p>
            <p className="mt-4 flex items-center gap-1 text-xs opacity-60">
              <MapPin size={12} /> {CURATORS[activeCurator].destinations.split(" · ")[0]}
            </p>
          </div>

          <div className="rounded-3xl border border-border-subtle bg-surface p-6 lg:col-span-3">
            <h3 className="font-display text-lg font-semibold">Sample day-by-day trip</h3>
            <ol className="mt-5 space-y-4">
              {DAY_BY_DAY.map(({ day, plan }) => (
                <li key={day} className="flex gap-4 border-b border-border-subtle pb-4 last:border-0 last:pb-0">
                  <span className="w-16 shrink-0 text-sm font-semibold text-brand">{day}</span>
                  <span className="text-sm leading-6 opacity-80">{plan}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <PlaceholderNote>
          Sample story and day-by-day plan shown for layout purposes — real Travel Stories
          are pending curator content and permissions.
        </PlaceholderNote>
      </section>

      {/* 06.3 Destination Guides */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h3 className="font-display text-xl font-semibold">Destination Guides</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 opacity-70">
          Location-based guides combine stays, food, experiences and practical local
          context in one place.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATION_GUIDES.map((guide) => (
            <div key={guide.location} className="rounded-2xl border border-border-subtle bg-surface p-6">
              <p className="flex items-center gap-1 font-display text-base font-semibold">
                <MapPin size={16} className="text-brand" /> {guide.location}
              </p>
              <p className="mt-3 text-sm leading-6 opacity-70">{guide.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {guide.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 06.5 Influencer Itineraries -> AI customisation */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl border border-border-subtle bg-brand-soft p-8">
          <div className="flex flex-wrap items-center gap-3">
            <Sparkles size={20} className="text-brand" />
            <h3 className="font-display text-lg font-semibold">Don&apos;t just copy the itinerary — customise it</h3>
            <CapabilityBadge capability="demo" />
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-6 opacity-70">
            Any curator itinerary can be opened in the AI Itinerary Creator, so dates,
            budget, group size, pace and preferences adjust to your trip instead of a
            fixed copy-paste plan.
          </p>
          <div className="mt-6">
            <ButtonLink href="/ai-trip-planner" variant="primary">
              Customise in the AI Trip Planner
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 06.6 Earn as Curator */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl border border-border-subtle bg-surface p-8">
          <div className="flex flex-wrap items-center gap-3">
            <Wallet2 size={20} className="text-brand" />
            <h3 className="font-display text-lg font-semibold">Earn as a Travel Curator</h3>
            <CapabilityBadge capability="coming-soon" />
          </div>
          <ul className="mt-4 grid gap-2 text-sm opacity-80 sm:grid-cols-2">
            <li>Share stays and itineraries through eligible referral or promo links</li>
            <li>Receive commissions under an approved commercial agreement</li>
          </ul>
          <PlaceholderNote>
            Exact commission structure is confirmed in the approved curator agreement —
            not published here.
          </PlaceholderNote>
          <div className="mt-6">
            <ButtonLink href="/contact?as=curator" variant="secondary">
              Apply as a Travel Curator
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
