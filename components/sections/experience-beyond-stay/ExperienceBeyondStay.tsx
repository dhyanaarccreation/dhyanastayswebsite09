import Link from "next/link";
import {
  BedDouble,
  MapPin,
  UtensilsCrossed,
  Landmark,
  Compass,
  Leaf,
  PartyPopper,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ACCENTS, AccentIconTile, AccentSpot, type Accent } from "@/components/ui/AccentIconTile";

// DHN-15 — Experience Beyond Stay Section (POC). Content basis: Home topic
// 01.3 (approved pillar labels: Stay; Destination; Food; Culture; Activities;
// Wellness; Events; Complete Journey) with each pillar's caption drawn from
// Chapter 03's approved one-line topic purpose (content-master-chapters.json),
// trimmed for card display rather than invented. The colourful icon tiles
// (2026-09-25) are presentation only — see components/ui/AccentIconTile.tsx.

const PILLARS: { icon: LucideIcon; accent: Accent; label: string; caption: string }[] = [
  {
    icon: BedDouble,
    accent: "violet",
    label: "Stay",
    caption: "Distinctive, quality-conscious properties with clear architecture, setting and amenities.",
  },
  {
    icon: MapPin,
    accent: "sky",
    label: "Destination",
    caption: "Place character, neighbourhoods, landscape and reasons to visit.",
  },
  {
    icon: UtensilsCrossed,
    accent: "amber",
    label: "Food",
    caption: "Local cuisine, curated food and authentic dining as part of destination identity.",
  },
  {
    icon: Landmark,
    accent: "rose",
    label: "Culture",
    caption: "Heritage, traditions, art, crafts and respectful cultural discovery.",
  },
  {
    icon: Compass,
    accent: "teal",
    label: "Activities",
    caption: "Tours, cycling, workshops, photography, nature and adventure.",
  },
  {
    icon: Leaf,
    accent: "emerald",
    label: "Wellness",
    caption: "Yoga, meditation, retreats and nature-based relaxation.",
  },
  {
    icon: PartyPopper,
    accent: "fuchsia",
    label: "Events",
    caption: "Festivals, music, retreats and property events, where date-sensitive.",
  },
];

const JOURNEY_STEPS = [
  "Choose stay",
  "Discover destination",
  "Add experiences",
  "Build itinerary",
  "Book",
  "Travel",
  "Receive support",
];

export function ExperienceBeyondStay() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Experience Beyond Stay"
        title="A trip is more than a room"
        description="Stay, destination, food, culture, activities, wellness and events — Dhyana treats every trip as one complete journey, not a room booking."
        align="center"
      />

      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {PILLARS.map(({ icon, accent, label, caption }) => (
          <div
            key={label}
            className={`group relative overflow-hidden rounded-2xl border border-border-subtle bg-surface p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${ACCENTS[accent].border}`}
          >
            <AccentSpot accent={accent} />
            <div className="relative">
              <AccentIconTile icon={icon} accent={accent} />
              <h3 className="mt-5 font-display text-lg font-semibold">{label}</h3>
              <p className="mt-2 text-sm leading-6 opacity-70">{caption}</p>
            </div>
          </div>
        ))}
        <Link
          href="/experience-beyond-stay"
          className="flex flex-col items-start justify-center rounded-2xl border border-dashed border-brand/40 p-6 text-brand transition-colors hover:bg-brand-soft"
        >
          <span className="font-display text-lg font-semibold">See the full journey</span>
          <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium">
            Explore Experience Beyond Stay
            <ArrowRight size={16} />
          </span>
        </Link>
      </div>

      <div className="mt-16 rounded-3xl border border-border-subtle bg-brand-soft p-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
          Complete journey
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-3">
          {JOURNEY_STEPS.map((step, index) => (
            <span key={step} className="flex items-center gap-2">
              <span className="rounded-full bg-surface px-4 py-2 text-sm font-medium shadow-sm">
                {step}
              </span>
              {index < JOURNEY_STEPS.length - 1 ? (
                <ArrowRight size={16} className="text-brand/60" />
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
