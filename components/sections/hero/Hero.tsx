"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import Link from "next/link";
import { CalendarDays, Minus, Plus, Search, Sparkles, Users } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { CapabilityBadge } from "@/components/ui/CapabilityBadge";
import { useHomeSearch } from "@/components/sections/home/HomeSearch";

// DHN-13 — Hero (POC), restyled 2026-09-25 to the Application's traveller /
// curated-stay-booking look: a rounded video card beside the headline, and a
// floating capsule search bar underneath. Home-only.
//
// Copy is the genuine launch copy from content/content-master-chapters.json
// topic 01.1 (PROJECT_BRIEF.md §6.3) — unchanged by the restyle.
//
// The search bar is a SHOWCASE (PROJECT_BRIEF.md §6 rules 1 and 2): typing a
// destination live-filters the sample stays in the Home explorer, and Search
// scrolls there. Dates and guests are display-only — availability, pricing and
// booking live in the app — and the bar is labelled "demo" accordingly.
//
// Video: /motion-video.mp4 is the same file the Application's hero uses. It
// only plays when the visitor hasn't asked for reduced motion; otherwise (and
// until we know) the gradient card shows instead.
const HERO_VIDEO_SRC = "/motion-video.mp4";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** null on the server and during hydration, then true/false from the browser. */
function useMotionAllowed(): boolean | null {
  return useSyncExternalStore<boolean | null>(
    subscribeReducedMotion,
    () => !window.matchMedia(REDUCED_MOTION).matches,
    () => null,
  );
}

function scrollToId(id: string, smooth: boolean) {
  document.getElementById(id)?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
}

const SEGMENT = "flex items-center gap-3 px-6 py-4 md:py-0";
const DIVIDER = "mx-6 h-px shrink-0 bg-border-subtle md:mx-0 md:my-4 md:h-auto md:w-px md:self-stretch";
const DATE_INPUT =
  "w-[8.5rem] bg-transparent text-sm tracking-tight [color-scheme:light] focus:outline-none dark:[color-scheme:dark]";

function SearchCapsule({ smooth }: { smooth: boolean }) {
  const { query, setQuery } = useHomeSearch();
  const [guests, setGuests] = useState(2);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    scrollToId("explore-stays", smooth);
  }

  return (
    <div className="relative mx-auto mt-10 max-w-6xl px-6">
      <form
        role="search"
        aria-label="Search sample stays"
        onSubmit={handleSubmit}
        className="flex flex-col overflow-hidden rounded-[32px] border border-border-subtle bg-surface shadow-xl md:h-[76px] md:flex-row md:items-stretch md:rounded-full"
      >
        <label className={`${SEGMENT} md:flex-[1.4]`}>
          <Search size={18} strokeWidth={1.75} className="shrink-0 text-foreground/50" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Where do you want to go?"
            aria-label="Search destination"
            className="w-full bg-transparent text-base tracking-tight placeholder:text-foreground/50 focus:outline-none"
          />
        </label>

        <span className={DIVIDER} aria-hidden="true" />

        <div className={`${SEGMENT} gap-2`}>
          <CalendarDays size={18} strokeWidth={1.75} className="shrink-0 text-foreground/50" aria-hidden="true" />
          <input type="date" aria-label="Check-in date" className={DATE_INPUT} />
          <span className="text-foreground/30" aria-hidden="true">
            —
          </span>
          <input type="date" aria-label="Check-out date" className={DATE_INPUT} />
        </div>

        <span className={DIVIDER} aria-hidden="true" />

        <div className={`${SEGMENT} gap-2.5`}>
          <Users size={18} strokeWidth={1.75} className="shrink-0 text-foreground/50" aria-hidden="true" />
          <button
            type="button"
            aria-label="Fewer guests"
            disabled={guests <= 1}
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
            className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border-subtle text-foreground/60 transition-colors hover:border-brand/40 hover:text-brand disabled:opacity-30"
          >
            <Minus size={12} />
          </button>
          <span className="text-sm tracking-tight whitespace-nowrap tabular-nums">
            {guests} {guests === 1 ? "Guest" : "Guests"}
          </span>
          <button
            type="button"
            aria-label="More guests"
            disabled={guests >= 16}
            onClick={() => setGuests((g) => Math.min(16, g + 1))}
            className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border-subtle text-foreground/60 transition-colors hover:border-brand/40 hover:text-brand disabled:opacity-30"
          >
            <Plus size={12} />
          </button>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-brand px-8 py-4 text-base font-semibold tracking-tight whitespace-nowrap text-white transition-colors hover:bg-brand-strong focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:outline-none md:m-2.5 md:rounded-full md:py-0 dark:text-background"
        >
          <Search size={17} aria-hidden="true" />
          Search
        </button>
      </form>

      <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-xs text-foreground/70">
        <CapabilityBadge capability="demo" />
        <span>
          Filters the sample stays below by destination. Dates, guests, live availability and booking are in{" "}
          <Link href="/app" className="font-medium text-brand hover:underline">
            the app
          </Link>
          .
        </span>
      </p>
    </div>
  );
}

export function Hero() {
  const motionAllowed = useMotionAllowed();

  return (
    <section id="hero" className="relative overflow-hidden pt-10 pb-10 lg:pt-14">
      {/* Soft colour blobs (plain radial gradients — blur filters band). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-40 size-[520px] rounded-full bg-radial from-brand/20 to-transparent to-70%"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 -right-40 size-[460px] rounded-full bg-radial from-sky-400/15 to-transparent to-70%"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-6 lg:grid-cols-2 lg:gap-12">
        <div className="relative h-64 overflow-hidden rounded-[40px] bg-linear-to-br from-[#235233] via-[#2e6f40] to-[#1c2b20] shadow-xl ring-1 ring-black/5 sm:h-80 lg:rounded-[50px]">
          {motionAllowed ? (
            <video
              className="size-full object-cover"
              src={HERO_VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          ) : (
            <div className="flex size-full items-center justify-center" role="img" aria-label="Dhyana Stays">
              <Sparkles size={56} strokeWidth={1.25} className="text-white/30" aria-hidden="true" />
            </div>
          )}
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface px-3 py-1.5 shadow-sm">
            <Sparkles size={12} className="text-brand" aria-hidden="true" />
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase">
              India&apos;s Premier Curated Stays
            </span>
          </span>

          <h1 className="mt-4 font-display text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Experience Beyond <span className="text-brand">Stay</span>
          </h1>

          <p className="mt-4 max-w-lg text-base leading-7 opacity-75">
            Dhyana Stays curates distinctive properties, real destinations and meaningful
            experiences into one journey — discover it here, then take it further in the app.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ButtonLink href="/app">Explore the App</ButtonLink>
            <Button type="button" variant="secondary" onClick={() => scrollToId("about-dhyana", motionAllowed === true)}>
              See how it works
            </Button>
          </div>
        </div>
      </div>

      <SearchCapsule smooth={motionAllowed === true} />
    </section>
  );
}
