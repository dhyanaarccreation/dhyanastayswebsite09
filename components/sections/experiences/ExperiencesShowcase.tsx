"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Sunrise,
  UtensilsCrossed,
  Palette,
  Mountain,
  Bird,
  Camera,
  MapPin,
  Clock,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { ButtonLink } from "@/components/ui/Button";

// DHN-18 — Experiences Showcase Grid (POC). Content basis: Home topic 01.5
// (approved: Local tours; food; culture; nature; adventure; wellness/yoga;
// farming; photography; workshops; music/events; property experiences).
// Sample experiences below — names, places, durations and captions — are POC
// layout data only (rule 3). No pricing or availability is shown (reserved
// for the app).
//
// Photos in public/images/experiences/ are Unsplash STOCK images standing in
// for real photography (pending); they do not depict these experiences. Swap
// each file in place (same filename) when real photography arrives. Sources:
//   sunrise-yoga.jpg               unsplash 1545205597-3d9d02c29597
//   farm-to-table-cooking.jpg      unsplash 1556910103-1c02745aae4d
//   western-ghats-trek.jpg         unsplash 1551632811-561732d1e306
//   pottery-workshop.jpg           unsplash 1493106641515-6b5631de4bb9
//   birdwatching-trail.jpg         unsplash 1444464666168-49d633b86797
//   night-photography-walk.jpg     unsplash 1419242902214-272b3f66ee7a
//   ayurvedic-abhyanga.jpg         unsplash 1544161515-4ab6ce6db874
//   thali-evening.jpg              unsplash 1567337710282-00832b415979
//   sunrise-summit-hike.jpg        unsplash 1526772662000-3f88f10405ff
//   temple-architecture-walk.jpg   unsplash 1582510003544-4d00b7f74220
//   backwater-boat-ride.jpg        unsplash 1602216056096-3b40cc0c9944
//   travel-photography-session.jpg unsplash 1452587925148-ce544e77e70d

const CATEGORIES = ["All", "Wellness", "Food", "Adventure", "Culture", "Nature", "Photography"] as const;
type Category = (typeof CATEGORIES)[number];
type ExperienceCategory = Exclude<Category, "All">;

const CATEGORY_ICON: Record<ExperienceCategory, typeof Sunrise> = {
  Wellness: Sunrise,
  Food: UtensilsCrossed,
  Adventure: Mountain,
  Culture: Palette,
  Nature: Bird,
  Photography: Camera,
};

// Ordered so the first six are one per category — that's what the Home teaser
// shows on "All" (see the `limit` prop); /experiences shows all twelve.
const SAMPLE_EXPERIENCES: {
  name: string;
  category: ExperienceCategory;
  location: string;
  duration: string;
  caption: string;
  image: string;
  alt: string;
}[] = [
  {
    name: "Sunrise Yoga at Auroville",
    category: "Wellness",
    location: "Auroville, Tamil Nadu",
    duration: "90 min",
    caption: "A guided morning practice as light hits the Matrimandir.",
    image: "/images/experiences/sunrise-yoga.jpg",
    alt: "Sample photo: a group practising yoga on a beach",
  },
  {
    name: "Farm-to-Table Cooking Class",
    category: "Food",
    location: "Near Tindivanam, Tamil Nadu",
    duration: "3 hrs",
    caption: "Cook a full meal from ingredients grown on-site.",
    image: "/images/experiences/farm-to-table-cooking.jpg",
    alt: "Sample photo: friends cooking together in a kitchen",
  },
  {
    name: "Western Ghats Trek",
    category: "Adventure",
    location: "Munnar, Kerala",
    duration: "Half day",
    caption: "A guided trail through forest and elephant country.",
    image: "/images/experiences/western-ghats-trek.jpg",
    alt: "Sample photo: hikers on a mountain trail",
  },
  {
    name: "Pottery Workshop",
    category: "Culture",
    location: "Auroville, Tamil Nadu",
    duration: "2 hrs",
    caption: "Hand-throw and glaze your own piece with a local artisan.",
    image: "/images/experiences/pottery-workshop.jpg",
    alt: "Sample photo: hands shaping clay on a potter's wheel",
  },
  {
    name: "Birdwatching Trail",
    category: "Nature",
    location: "Vedanthangal, Tamil Nadu",
    duration: "2.5 hrs",
    caption: "An early walk through wetlands with a naturalist guide.",
    image: "/images/experiences/birdwatching-trail.jpg",
    alt: "Sample photo: a kingfisher perched on a branch",
  },
  {
    name: "Night Photography Walk",
    category: "Photography",
    location: "Coorg, Karnataka",
    duration: "3 hrs",
    caption: "Long-exposure shooting under dark, rural skies.",
    image: "/images/experiences/night-photography-walk.jpg",
    alt: "Sample photo: a starry night sky over a dark horizon",
  },
  {
    name: "Ayurvedic Abhyanga Session",
    category: "Wellness",
    location: "Palakkad, Kerala",
    duration: "60 min",
    caption: "A traditional warm-oil massage with a resident therapist.",
    image: "/images/experiences/ayurvedic-abhyanga.jpg",
    alt: "Sample photo: warm oil being poured during a massage",
  },
  {
    name: "Home-Cooked Thali Evening",
    category: "Food",
    location: "Karaikudi, Tamil Nadu",
    duration: "2 hrs",
    caption: "A family-style South Indian dinner hosted at the property.",
    image: "/images/experiences/thali-evening.jpg",
    alt: "Sample photo: a thali with curries and flatbread",
  },
  {
    name: "Sunrise Summit Hike",
    category: "Adventure",
    location: "Wayanad, Kerala",
    duration: "4 hrs",
    caption: "A dawn climb to a ridge with wide valley views.",
    image: "/images/experiences/sunrise-summit-hike.jpg",
    alt: "Sample photo: a hiker looking out over a mountain valley",
  },
  {
    name: "Temple Architecture Walk",
    category: "Culture",
    location: "Thanjavur, Tamil Nadu",
    duration: "2 hrs",
    caption: "A guided walk through carved gopurams and stone mandapas.",
    image: "/images/experiences/temple-architecture-walk.jpg",
    alt: "Sample photo: a colourful temple gopuram under a night sky",
  },
  {
    name: "Backwater Boat Ride",
    category: "Nature",
    location: "Alleppey, Kerala",
    duration: "2 hrs",
    caption: "A slow glide along quiet canals lined with coconut palms.",
    image: "/images/experiences/backwater-boat-ride.jpg",
    alt: "Sample photo: a boat on a palm-lined backwater",
  },
  {
    name: "Travel Photography Session",
    category: "Photography",
    location: "Pondicherry",
    duration: "3 hrs",
    caption: "Learn to shoot travel stories with a local photographer.",
    image: "/images/experiences/travel-photography-session.jpg",
    alt: "Sample photo: a vintage camera, prints and a map",
  },
];

// Per-category colour for the icon on the "immersive" chips (literal classes).
const CATEGORY_COLOR: Record<ExperienceCategory, string> = {
  Wellness: "text-emerald-500",
  Food: "text-orange-500",
  Adventure: "text-sky-500",
  Culture: "text-pink-500",
  Nature: "text-teal-500",
  Photography: "text-violet-500",
};

// `limit` caps how many cards the "All" tab shows (the Home teaser passes 6);
// picking a category always shows every match. Omit it to show everything.
// `variant="immersive"` (Home only) restyles the chips and cards to the
// Application's big rounded photo-card look; the default keeps /experiences as-is.
export function ExperiencesShowcase({
  limit,
  variant = "default",
}: {
  limit?: number;
  variant?: "default" | "immersive";
}) {
  const immersive = variant === "immersive";
  const [active, setActive] = useState<Category>("All");
  const matches = SAMPLE_EXPERIENCES.filter((exp) => active === "All" || exp.category === active);
  const visible = active === "All" && limit ? matches.slice(0, limit) : matches;

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Experiences"
        title="Accommodation connected to local discovery"
        description="Local tours, food, culture, nature, adventure, wellness and property experiences — Dhyana doesn't stop at the front door."
      />

      <div className={`mt-8 flex flex-wrap ${immersive ? "gap-2.5" : "gap-2"}`} role="group" aria-label="Filter experiences by type">
        {CATEGORIES.map((category) => {
          const isActive = active === category;
          const ChipIcon = category === "All" ? null : CATEGORY_ICON[category];
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(category)}
              className={
                immersive
                  ? `inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium shadow-sm transition ${
                      isActive
                        ? "border-brand bg-brand text-white dark:text-background"
                        : "border-border-subtle bg-surface hover:-translate-y-px hover:shadow-md"
                    }`
                  : `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive ? "bg-brand text-white" : "bg-surface text-foreground/70 hover:bg-brand-soft"
                    }`
              }
            >
              {immersive && ChipIcon ? (
                <ChipIcon size={16} className={isActive ? "" : CATEGORY_COLOR[category as ExperienceCategory]} aria-hidden="true" />
              ) : null}
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(({ name, category, location, duration, caption, image, alt }) => {
          const Icon = CATEGORY_ICON[category];
          if (immersive) {
            return (
              <article
                key={name}
                className="group rounded-[34px] border border-border-subtle bg-surface p-1.5 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-[5/6]">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#235233] uppercase backdrop-blur">
                    <Icon size={13} aria-hidden="true" />
                    {category}
                  </span>
                  <span className="absolute top-4 right-4 rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-medium tracking-wider text-white/90 uppercase backdrop-blur">
                    Sample
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="font-display text-xl font-semibold">{name}</h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/85">
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={14} aria-hidden="true" />
                        {location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={14} aria-hidden="true" />
                        {duration}
                      </span>
                    </p>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/75">{caption}</p>
                  </div>
                </div>
              </article>
            );
          }
          return (
            <div key={name} className="overflow-hidden rounded-2xl border border-border-subtle bg-surface">
              <div className="relative h-44 bg-brand-soft">
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-surface/90 px-3 py-1 text-[11px] font-medium tracking-wide text-brand uppercase backdrop-blur">
                  <Icon size={13} aria-hidden="true" />
                  {category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold">{name}</h3>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm opacity-60">
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={14} aria-hidden="true" />
                    {location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={14} aria-hidden="true" />
                    {duration}
                  </span>
                </p>
                <p className="mt-3 text-sm leading-6 opacity-70">{caption}</p>
              </div>
            </div>
          );
        })}
      </div>

      <PlaceholderNote>
        Sample experiences and stock photography shown for layout purposes — the
        final catalogue is pending property and destination onboarding.
      </PlaceholderNote>

      <div className="mt-8">
        <ButtonLink href="/experiences" variant="secondary">
          Explore all experiences
        </ButtonLink>
      </div>
    </section>
  );
}
