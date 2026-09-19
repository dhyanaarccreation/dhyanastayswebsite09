"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";

// DHN-25 — FAQ Accordion (POC). Questions are the approved verbatim text from
// Chapter 14 (content-master-chapters.json topics 14.1-14.3) — chapters
// beyond 01 have no approved answer copy, so every answer below is a
// conservative draft grounded only in facts already established elsewhere in
// PROJECT_BRIEF.md, clearly marked pending client approval (rule 2).

const CATEGORIES = [
  {
    key: "traveller",
    label: "Traveller",
    items: [
      { q: "What is Dhyana?", a: "Dhyana Stays is a curated hospitality ecosystem connecting distinctive properties, real destinations and meaningful experiences, personalised with AI." },
      { q: "How are stays curated?", a: "Properties are evaluated against an internal quality philosophy before being featured — the full published checklist is still being finalised." },
      { q: "Where is it available?", a: "Dhyana currently features stays across select destinations in India; the current list is available in the app." },
      { q: "How do Guides work?", a: "Handpicked Travel Curators share real destination stories and day-by-day trips you can open directly in the AI Trip Planner." },
      { q: "Can an influencer itinerary be customised?", a: "Yes — any Travel Guide itinerary can be opened in the AI Trip Planner and adjusted for your dates, budget and group." },
      { q: "How does AI work?", a: "Dhyana AI turns your preferences into a day-by-day itinerary suggestion — it assists hospitality rather than replacing it." },
      { q: "How do I book?", a: "Booking, payment and confirmation happen in the Dhyana Stays app, not on this website." },
    ],
  },
  {
    key: "host",
    label: "Host",
    items: [
      { q: "How can I list?", a: "Start with a host enquiry on this site — our team will guide you through onboarding from there." },
      { q: "What is onboarding?", a: "An initial conversation, property assessment, media collection and quality checks before your listing goes live." },
      { q: "What media is needed?", a: "Property photos and, where possible, video — the host team confirms the exact list during onboarding." },
      { q: "How are properties marketed?", a: "Through property storytelling, destination marketing and Travel Curator collaborations." },
      { q: "What support is available?", a: "Hospitality consultancy and, where contracted, property management support." },
      { q: "How do I contact the host team?", a: "Use the Host category on the Contact page." },
    ],
  },
  {
    key: "curator",
    label: "Travel Curator",
    items: [
      { q: "Who can apply?", a: "Dhyana works with handpicked Travel Curators rather than an open directory — apply via the curator enquiry form." },
      { q: "How are curators selected?", a: "Selection criteria are still being finalised; applications are currently reviewed individually." },
      { q: "What content can I create?", a: "Destination stories, day-by-day trip content and property-first itineraries." },
      { q: "How do referral/promo links work?", a: "Approved curators can share stays and itineraries through eligible referral or promo links." },
      { q: "How are eligible commissions handled?", a: "Commission terms are confirmed under an approved commercial agreement during onboarding — no percentage is published here." },
      { q: "How do I apply?", a: "Use the Travel Curator category on the Contact page." },
    ],
  },
] as const;

export function FaqAccordion() {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]["key"]>("traveller");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const category = CATEGORIES.find((c) => c.key === activeCategory)!;

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <SectionHeading eyebrow="FAQ" title="Questions, answered" align="center" />

      <PlaceholderNote>
        Questions below are approved; answers are draft copy pending final
        client sign-off.
      </PlaceholderNote>

      <div className="mt-6 flex justify-center gap-2 rounded-full bg-brand-soft p-1.5">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => {
              setActiveCategory(c.key);
              setOpenQuestion(null);
            }}
            className={`flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
              activeCategory === c.key ? "bg-surface text-brand shadow-sm" : "text-foreground/70"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-6 divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-surface">
        {category.items.map(({ q, a }) => {
          const key = `${category.key}-${q}`;
          const isOpen = openQuestion === key;
          return (
            <div key={key}>
              <button
                type="button"
                onClick={() => setOpenQuestion(isOpen ? null : key)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium"
                aria-expanded={isOpen}
              >
                {q}
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-brand transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen ? (
                <p className="px-5 pb-4 text-sm leading-6 opacity-70">{a}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
