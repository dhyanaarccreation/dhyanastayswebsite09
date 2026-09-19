"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { ButtonLink } from "@/components/ui/Button";

// DHN-16 — Curated Stays Showcase (POC). Content basis: Home topic 01.4
// (approved: Luxury/premium; nature/farm; unique architecture; couple; family;
// wellness; workation; tiny/unique stays; images/video; location; highlights;
// app CTA) and Chapter 04.3 Stay Categories. Property names below are sample
// data for POC layout only (rule 3) — no real photography, pricing or
// availability is shown, since 04.5 reserves live pricing/availability for
// the app.

const CATEGORIES = ["All", "Tiny House", "Farm Stay", "Wellness Retreat", "Luxury Villa", "Heritage Home"] as const;

type Category = (typeof CATEGORIES)[number];

const SAMPLE_STAYS: {
  name: string;
  location: string;
  category: Exclude<Category, "All">;
  highlight: string;
}[] = [
  {
    name: "The Canopy Tiny House",
    location: "Auroville, Tamil Nadu",
    category: "Tiny House",
    highlight: "A minimalist retreat built around ancient mango trees.",
  },
  {
    name: "Nila Wellness Retreat",
    location: "Palakkad, Kerala",
    category: "Wellness Retreat",
    highlight: "Ayurvedic therapies with a resident wellness team.",
  },
  {
    name: "The Glass Pavilion",
    location: "Wayanad, Kerala",
    category: "Luxury Villa",
    highlight: "Floor-to-ceiling glass architecture over a private pool.",
  },
  {
    name: "Heritage Courtyard Villa",
    location: "Karaikudi, Tamil Nadu",
    category: "Heritage Home",
    highlight: "A restored Chettinad mansion with original courtyards.",
  },
  {
    name: "Vaksana Farms",
    location: "Near Tindivanam, Tamil Nadu",
    category: "Farm Stay",
    highlight: "A working organic farm reimagined as four unique stays.",
  },
];

export function CuratedStaysShowcase() {
  const [active, setActive] = useState<Category>("All");
  const visible = SAMPLE_STAYS.filter((stay) => active === "All" || stay.category === active);

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Curated Stays"
        title="Selective, not endless"
        description="Every property is chosen for its story, not just its square footage — editorial storytelling instead of a crowded listings grid."
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === category
                ? "bg-brand text-white"
                : "bg-surface text-foreground/70 hover:bg-brand-soft"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((stay) => (
          <div
            key={stay.name}
            className="overflow-hidden rounded-2xl border border-border-subtle bg-surface"
          >
            <div className="flex h-40 items-center justify-center bg-linear-to-br from-brand-soft to-brand/20 text-xs font-medium tracking-[0.15em] text-brand/70 uppercase">
              {stay.category}
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-semibold">{stay.name}</h3>
              <p className="mt-1 flex items-center gap-1 text-sm opacity-60">
                <MapPin size={14} />
                {stay.location}
              </p>
              <p className="mt-3 text-sm leading-6 opacity-70">{stay.highlight}</p>
            </div>
          </div>
        ))}
      </div>

      <PlaceholderNote>
        Sample stays shown for layout purposes — final property selection and
        photography are pending.
      </PlaceholderNote>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <ButtonLink href="/curated-stays" variant="secondary">
          Explore all curated stays
        </ButtonLink>
        <Link href="/app" className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline">
          See live availability in the app
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
