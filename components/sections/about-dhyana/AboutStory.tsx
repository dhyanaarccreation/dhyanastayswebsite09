import type { ReactNode } from "react";
import { ArrowRight, BedDouble, BookOpen, Check, Compass, ConciergeBell, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

// /about — full About page (DHN-14 / Chapter 02). Final copy supplied by the
// project owner on 2026-09-25, in six blocks: Who We Are, Why We Started,
// What We Do, What Makes Us Different, Our Journey, Our Vision. Copy below is
// verbatim — don't reword it here; change it at the source.

const WHAT_WE_DO: { icon: typeof BedDouble; title: string; text: string }[] = [
  { icon: BedDouble, title: "Curated Stays", text: "Handpicked properties, chosen for character, not just availability." },
  { icon: Compass, title: "Experiences", text: "Local, cultural, and immersive moments woven into your stay." },
  { icon: BookOpen, title: "Travel Guides", text: "Real people who know a destination, sharing it honestly." },
  { icon: Sparkles, title: "AI Trip Planning", text: "A planner that learns your travel style, not a generic itinerary." },
  { icon: ConciergeBell, title: "Hospitality", text: "Support and consultancy for hosts who want to do it right." },
];

const DIFFERENCES = [
  "Handpicked stays, not endless listings",
  "Curated experiences, not generic add-ons",
  "Trusted travel curators, not anonymous reviews",
  "AI-powered planning, built around you",
  "One journey, start to finish — not a string of separate bookings",
];

const JOURNEY = ["Architecture", "Stay Design", "Hospitality", "Experience", "Dhyana Stays"];

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-border-subtle py-14">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-3 lg:gap-12">
        <h2 className="font-display text-2xl font-semibold tracking-tight">{title}</h2>
        <div className="lg:col-span-2">{children}</div>
      </div>
    </section>
  );
}

export function AboutStory() {
  return (
    <>
      <header className="mx-auto max-w-6xl px-6 pt-24 pb-16 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">About Dhyana Stays</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Experience Beyond Stay
        </h1>
      </header>

      <Block title="Who We Are">
        <p className="font-display text-2xl leading-9">
          Dhyana Stays is a curated travel and hospitality platform built around one idea: travel
          should be experienced, not simply booked.
        </p>
      </Block>

      <Block title="Why We Started">
        <p className="text-lg leading-8 opacity-80">
          Travellers often spend hours piecing together the right stay, experiences, food, and things
          to do — across a dozen different apps and tabs. We started Dhyana Stays to bring all of it
          into one meaningful journey.
        </p>
      </Block>

      <Block title="What We Do">
        <p className="text-lg leading-8 opacity-80">
          We connect five things that are usually scattered, so your trip feels like one story, not
          five separate bookings.
        </p>
        <ul className="mt-8 divide-y divide-border-subtle overflow-hidden rounded-2xl border border-border-subtle bg-surface">
          {WHAT_WE_DO.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-4 p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                <Icon size={20} />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-6 opacity-70">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="What Makes Us Different">
        <ul className="space-y-4 rounded-3xl border border-border-subtle bg-brand-soft p-6 sm:p-8">
          {DIFFERENCES.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-surface text-brand">
                <Check size={14} />
              </span>
              <span className="text-base leading-7 font-medium">{point}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Our Journey">
        <p className="text-lg leading-8 opacity-80">
          Our story began with architecture — understanding how spaces shape the way people feel. That
          same thinking carried us into designing unique stays, then into hospitality, and eventually
          into building Dhyana Stays: a platform for experiencing places, not just visiting them.
        </p>
        <ol className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-3">
          {JOURNEY.map((step, index) => {
            const isLast = index === JOURNEY.length - 1;
            return (
              <li key={step} className="flex items-center gap-2">
                <span
                  className={
                    isLast
                      ? "rounded-full border border-brand/40 bg-surface px-4 py-2 text-sm font-semibold text-brand shadow-sm"
                      : "rounded-full bg-surface px-4 py-2 text-sm font-medium shadow-sm"
                  }
                >
                  {step}
                </span>
                {!isLast ? <ArrowRight size={16} aria-hidden="true" className="text-brand/60" /> : null}
              </li>
            );
          })}
        </ol>
      </Block>

      <Block title="Our Vision">
        <p className="border-l-2 border-brand pl-6 font-display text-2xl leading-9">
          To build a global travel ecosystem where every destination can be discovered through its
          stays, its people, its culture, its food, and its experiences.
        </p>
      </Block>

      <section className="border-t border-border-subtle px-6 py-16 text-center">
        <ButtonLink href="/curated-stays">
          Explore Dhyana Stays
          <ArrowRight size={16} />
        </ButtonLink>
        <p className="mx-auto mt-6 max-w-md text-xs opacity-60">
          No booking, payments or live AI planning happen on this website — every feature demo here is
          honestly labelled and routes to the app for the real thing.
        </p>
      </section>
    </>
  );
}
