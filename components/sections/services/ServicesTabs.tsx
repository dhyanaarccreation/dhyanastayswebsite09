"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

// DHN-19 — Services Tabs (POC). Content basis: Chapter 08 SERVICES one-line
// topic purposes (08.1-08.3) — chapters beyond 01 have no approved
// Content/UI requirement bullets (PROJECT_BRIEF.md §5), so each bullet below
// is the source one-liner split into list items, not invented detail.

const TABS = [
  {
    key: "travellers",
    label: "For Travellers",
    href: "/services/travellers",
    points: [
      "Curated stay discovery",
      "Destination inspiration",
      "Local experiences",
      "Travel Guides",
      "AI planning",
      "Itinerary customisation",
      "Booking and support",
    ],
  },
  {
    key: "hosts",
    label: "For Hosts",
    href: "/services/hosts",
    points: [
      "Property onboarding",
      "Positioning and storytelling",
      "Demand generation and marketing",
      "Hospitality consultancy",
      "Guest-experience improvement",
      "Property management, where contracted",
    ],
  },
  {
    key: "curators",
    label: "For Travel Curators",
    href: "/services/travel-curators",
    points: [
      "Access to curated stays and destinations",
      "Content opportunities",
      "Itinerary curation",
      "Referral and promo mechanisms",
      "Eligible commission-based earning",
    ],
  },
] as const;

export function ServicesTabs({
  defaultTab = "travellers",
}: {
  defaultTab?: (typeof TABS)[number]["key"];
}) {
  const [active, setActive] = useState<(typeof TABS)[number]["key"]>(defaultTab);
  const tab = TABS.find((t) => t.key === active)!;

  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <SectionHeading eyebrow="Services" title="Built for three kinds of people" align="center" />

      <div className="mt-8 flex justify-center gap-2 rounded-full bg-brand-soft p-1.5">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActive(t.key)}
            className={`flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
              active === t.key ? "bg-surface text-brand shadow-sm" : "text-foreground/70"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-border-subtle bg-surface p-8">
        <ul className="grid gap-3 sm:grid-cols-2">
          {tab.points.map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm">
              <Check size={16} className="mt-0.5 shrink-0 text-brand" />
              <span className="opacity-80">{point}</span>
            </li>
          ))}
        </ul>
        {tab.key !== "travellers" ? (
          <p className="mt-6 text-xs opacity-50 italic">
            Exact commercial terms are confirmed during onboarding, not published
            here.
          </p>
        ) : null}
        <div className="mt-6">
          <ButtonLink href={tab.href} variant="secondary">
            More for {tab.label.replace("For ", "")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
