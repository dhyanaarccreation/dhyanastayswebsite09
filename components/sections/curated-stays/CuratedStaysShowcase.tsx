"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { ButtonLink } from "@/components/ui/Button";
import { CATEGORIES, SAMPLE_STAYS, type Category } from "./stays-data";

// DHN-16 — Curated Stays Showcase (POC). Content basis: Home topic 01.4
// (approved: Luxury/premium; nature/farm; unique architecture; couple; family;
// wellness; workation; tiny/unique stays; images/video; location; highlights;
// app CTA) and Chapter 04.3 Stay Categories. Property names below are sample
// data for POC layout only (rule 3) — no pricing or availability is shown,
// since 04.5 reserves live pricing/availability for the app.
// Sample data and stock-photo sources live in ./stays-data.ts (shared with the
// Home explorer).

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
            <div className="relative h-48 bg-brand-soft">
              <Image
                src={stay.image}
                alt={stay.alt}
                fill
                sizes="(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <span className="absolute top-3 left-3 rounded-full bg-surface/90 px-3 py-1 text-[11px] font-medium tracking-wide text-brand uppercase backdrop-blur">
                {stay.category}
              </span>
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
        Sample stays and stock photography shown for layout purposes — final
        property selection and photography are pending.
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
