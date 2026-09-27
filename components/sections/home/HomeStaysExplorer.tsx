"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Crown,
  Heart,
  House,
  Landmark,
  LayoutGrid,
  MapPin,
  Sprout,
  X,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { ButtonLink } from "@/components/ui/Button";
import { CATEGORIES, SAMPLE_STAYS, type Category } from "@/components/sections/curated-stays/stays-data";
import { useHomeSearch } from "./HomeSearch";

// Home "Curated Stays" (DHN-16), restyled 2026-09-25 to the Application's
// "Explore All Stays" look: colourful category chips, a result count, and big
// rounded photo cards with a white border. Home-only — /curated-stays keeps
// CuratedStaysShowcase. Same sample data (./stays-data), no prices or
// availability (04.5 reserves those for the app; PROJECT_BRIEF.md §6 rule 3).
// Every card carries a "Sample" tag because names, places and photos are
// stand-ins. The destination typed into the hero search bar filters this grid.

const CHIP: Record<Category, { icon: LucideIcon; color: string }> = {
  All: { icon: LayoutGrid, color: "text-brand" },
  "Tiny House": { icon: House, color: "text-orange-500" },
  "Farm Stay": { icon: Sprout, color: "text-emerald-500" },
  "Wellness Retreat": { icon: Heart, color: "text-pink-500" },
  "Luxury Villa": { icon: Crown, color: "text-amber-500" },
  "Heritage Home": { icon: Landmark, color: "text-violet-500" },
};

export function HomeStaysExplorer() {
  const { query, setQuery } = useHomeSearch();
  const [active, setActive] = useState<Category>("All");

  const q = query.trim().toLowerCase();
  const visible = SAMPLE_STAYS.filter(
    (stay) =>
      (active === "All" || stay.category === active) &&
      (!q || `${stay.name} ${stay.location} ${stay.category}`.toLowerCase().includes(q)),
  );

  return (
    <section id="explore-stays" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        eyebrow="Curated Stays"
        title="Selective, not endless"
        description="Every property is chosen for its story, not just its square footage — editorial storytelling instead of a crowded listings grid."
      />

      <div className="mt-8 flex flex-wrap gap-2.5" role="group" aria-label="Filter stays by type">
        {CATEGORIES.map((category) => {
          const { icon: Icon, color } = CHIP[category];
          const isActive = active === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(category)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium shadow-sm transition ${
                isActive
                  ? "border-brand bg-brand text-white dark:text-background"
                  : "border-border-subtle bg-surface hover:-translate-y-px hover:shadow-md"
              }`}
            >
              <Icon size={16} className={isActive ? "" : color} aria-hidden="true" />
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm" aria-live="polite">
        <p className="opacity-70">
          {visible.length} curated {visible.length === 1 ? "stay" : "stays"} found
          {q ? <> for “{query.trim()}”</> : null}
        </p>
        {q ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-surface px-3 py-1 text-xs font-medium text-brand hover:bg-brand-soft"
          >
            <X size={12} aria-hidden="true" /> Clear search
          </button>
        ) : null}
      </div>

      {visible.length === 0 ? (
        <div className="mt-6 rounded-[34px] border border-dashed border-border-subtle bg-surface p-10 text-center">
          <p className="font-display text-xl font-semibold">No sample stays match that yet</p>
          <p className="mx-auto mt-2 max-w-md text-sm opacity-70">
            The sample set is small. Try a destination like Auroville, Wayanad or Gokarna — or browse the
            full range in the app.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((stay) => (
            <article
              key={stay.name}
              className="group rounded-[34px] border border-border-subtle bg-surface p-1.5 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-[5/6]">
                <Image
                  src={stay.image}
                  alt={stay.alt}
                  fill
                  sizes="(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
                <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#235233] uppercase backdrop-blur">
                  {stay.category}
                </span>
                <span className="absolute top-4 right-4 rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-medium tracking-wider text-white/90 uppercase backdrop-blur">
                  Sample
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="font-display text-xl font-semibold">{stay.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-white/85">
                    <MapPin size={14} aria-hidden="true" />
                    {stay.location}
                  </p>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/75">{stay.highlight}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <PlaceholderNote>
        Sample stays and stock photography shown for layout purposes — final property selection and
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
