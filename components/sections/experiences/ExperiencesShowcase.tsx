"use client";

import { useState } from "react";
import {
  Sunrise,
  UtensilsCrossed,
  Palette,
  Mountain,
  Bird,
  Camera,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { ButtonLink } from "@/components/ui/Button";

// DHN-18 — Experiences Showcase Grid (POC). Content basis: Home topic 01.5
// (approved: Local tours; food; culture; nature; adventure; wellness/yoga;
// farming; photography; workshops; music/events; property experiences).
// Sample experiences below are POC layout data only (rule 3).

const CATEGORIES = ["All", "Wellness", "Food", "Adventure", "Culture", "Nature", "Photography"] as const;
type Category = (typeof CATEGORIES)[number];

const SAMPLE_EXPERIENCES: {
  icon: typeof Sunrise;
  name: string;
  category: Exclude<Category, "All">;
  caption: string;
}[] = [
  { icon: Sunrise, name: "Sunrise Yoga at Auroville", category: "Wellness", caption: "A guided morning practice as light hits the Matrimandir." },
  { icon: UtensilsCrossed, name: "Farm-to-Table Cooking Class", category: "Food", caption: "Cook a full meal from ingredients grown on-site." },
  { icon: Mountain, name: "Western Ghats Trek", category: "Adventure", caption: "A guided trail through forest and elephant country." },
  { icon: Palette, name: "Pottery Workshop", category: "Culture", caption: "Hand-throw and glaze your own piece with a local artisan." },
  { icon: Bird, name: "Birdwatching Trail", category: "Nature", caption: "An early walk through wetlands with a naturalist guide." },
  { icon: Camera, name: "Night Photography Walk", category: "Photography", caption: "Long-exposure shooting under dark, rural skies." },
];

export function ExperiencesShowcase() {
  const [active, setActive] = useState<Category>("All");
  const visible = SAMPLE_EXPERIENCES.filter((exp) => active === "All" || exp.category === active);

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Experiences"
        title="Accommodation connected to local discovery"
        description="Local tours, food, culture, nature, adventure, wellness and property experiences — Dhyana doesn't stop at the front door."
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === category ? "bg-brand text-white" : "bg-surface text-foreground/70 hover:bg-brand-soft"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(({ icon: Icon, name, category, caption }) => (
          <div key={name} className="rounded-2xl border border-border-subtle bg-surface p-6">
            <div className="flex size-10 items-center justify-center rounded-full bg-brand-soft text-brand">
              <Icon size={20} />
            </div>
            <p className="mt-4 text-xs font-semibold tracking-[0.15em] text-brand uppercase">{category}</p>
            <h3 className="mt-1 font-display text-lg font-semibold">{name}</h3>
            <p className="mt-2 text-sm leading-6 opacity-70">{caption}</p>
          </div>
        ))}
      </div>

      <PlaceholderNote>
        Sample experiences shown for layout purposes — the final catalogue is
        pending property and destination onboarding.
      </PlaceholderNote>

      <div className="mt-8">
        <ButtonLink href="/experiences" variant="secondary">
          Explore all experiences
        </ButtonLink>
      </div>
    </section>
  );
}
