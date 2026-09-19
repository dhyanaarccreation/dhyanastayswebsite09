"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

// DHN-13 — Video Landing Hero Section (POC).
// Content model per content/content-master-chapters.json topic 01.1: full-screen
// video/visual; headline; supporting copy; primary Explore/Open App CTA;
// optional secondary CTA; scroll cue; mobile poster fallback; reduced-motion
// support. Copy below is genuine launch copy (Chapter 01 has approved
// requirements — PROJECT_BRIEF.md §6.3), not placeholder text.

// No real hero video/photography has been supplied yet (PROJECT_BRIEF.md §7).
// Set these once the client provides final assets — the gradient fallback
// below covers both the "mobile poster fallback" and "reduced-motion support"
// requirements until then, and video only renders when both are present and
// motion isn't reduced.
const HERO_VIDEO_SRC: string | null = null;
const HERO_POSTER_SRC: string | null = null;

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return reduced;
}

function scrollToNextSection() {
  document.getElementById("about-dhyana")?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const reducedMotion = useReducedMotion();
  const canPlayVideo = Boolean(HERO_VIDEO_SRC) && !reducedMotion;

  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-white"
    >
      <div className="absolute inset-0 -z-10">
        {canPlayVideo ? (
          <video
            className="h-full w-full object-cover"
            src={HERO_VIDEO_SRC!}
            poster={HERO_POSTER_SRC ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          />
        ) : (
          <div
            className="h-full w-full bg-linear-to-br from-brand-strong via-brand to-[#1c2b20]"
            style={
              HERO_POSTER_SRC
                ? { backgroundImage: `url(${HERO_POSTER_SRC})`, backgroundSize: "cover", backgroundPosition: "center" }
                : undefined
            }
            role="img"
            aria-label="Curated Dhyana Stays property in a natural setting"
          />
        )}
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium tracking-[0.2em] uppercase backdrop-blur">
        India&apos;s Premier Curated Stays
      </span>

      <h1 className="mt-6 max-w-3xl text-center font-display text-5xl leading-tight font-semibold tracking-tight sm:text-6xl md:text-7xl">
        Experience Beyond Stay
      </h1>

      <p className="mt-6 max-w-xl text-center text-base leading-7 text-white/85 sm:text-lg">
        Dhyana Stays curates distinctive properties, real destinations and meaningful
        experiences into one journey — discover it here, then take it further in the app.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <ButtonLink href="/app" variant="inverse">
          Explore the App
        </ButtonLink>
        <button
          type="button"
          onClick={scrollToNextSection}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          See how it works
        </button>
      </div>

      <motion.button
        type="button"
        onClick={scrollToNextSection}
        aria-label="Scroll to next section"
        className="absolute bottom-8 text-white/80"
        animate={reducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={reducedMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  );
}
