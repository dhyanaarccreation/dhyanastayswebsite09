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
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

// DHN-15 — Experience Beyond Stay Section (POC). Content basis: Home topic
// 01.3 (approved pillar labels: Stay; Destination; Food; Culture; Activities;
// Wellness; Events; Complete Journey) with each pillar's caption drawn from
// Chapter 03's approved one-line topic purpose (content-master-chapters.json),
// trimmed for card display rather than invented.

const PILLARS = [
  {
    icon: BedDouble,
    label: "Stay",
    caption: "Distinctive, quality-conscious properties with clear architecture, setting and amenities.",
  },
  {
    icon: MapPin,
    label: "Destination",
    caption: "Place character, neighbourhoods, landscape and reasons to visit.",
  },
  {
    icon: UtensilsCrossed,
    label: "Food",
    caption: "Local cuisine, curated food and authentic dining as part of destination identity.",
  },
  {
    icon: Landmark,
    label: "Culture",
    caption: "Heritage, traditions, art, crafts and respectful cultural discovery.",
  },
  {
    icon: Compass,
    label: "Activities",
    caption: "Tours, cycling, workshops, photography, nature and adventure.",
  },
  {
    icon: Leaf,
    label: "Wellness",
    caption: "Yoga, meditation, retreats and nature-based relaxation.",
  },
  {
    icon: PartyPopper,
    label: "Events",
    caption: "Festivals, music, retreats and property events, where date-sensitive.",
  },
] as const;

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
        {PILLARS.map(({ icon: Icon, label, caption }) => (
          <div
            key={label}
            className="rounded-2xl border border-border-subtle bg-surface p-6 transition-colors hover:border-brand/40"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-brand-soft text-brand">
              <Icon size={20} />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{label}</h3>
            <p className="mt-2 text-sm leading-6 opacity-70">{caption}</p>
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
