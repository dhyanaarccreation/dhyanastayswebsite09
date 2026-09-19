import {
  Compass,
  BedDouble,
  Sparkles,
  Video,
  Wand2,
  ListChecks,
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

// DHN-22 — Application Features Showcase (POC). Content basis: Home topic
// 01.10 (approved: Discover; Stays; Experiences; Travel Guides; AI Planner;
// Itinerary; Booking; Traveller Dashboard; Support), captions from Chapter
// 12's approved one-line topic purposes (12.1-12.9). These are Application
// features, listed in Appendix A of the Master Content Document as explicitly
// out of scope for the website itself — this section only explains them; none
// of it runs here (PROJECT_BRIEF.md §1/§6 rule 1).

const FEATURES = [
  { icon: Compass, title: "Discover", caption: "Explore destinations, curated collections, stories and recommendations." },
  { icon: BedDouble, title: "Stays", caption: "Property story, photos/video, location, amenities and booking actions." },
  { icon: Sparkles, title: "Experiences", caption: "Local, food, culture, nature, adventure, wellness and event experiences." },
  { icon: Video, title: "Travel Guides", caption: "Browse curators, watch stories, and use itineraries as AI starting points." },
  { icon: Wand2, title: "AI Planner", caption: "Enter preferences, generate a plan, review options and refine." },
  { icon: ListChecks, title: "Itinerary", caption: "Day-by-day plans combining stays and experiences." },
  { icon: CreditCard, title: "Booking", caption: "Operational booking, payment and confirmation through the app." },
  { icon: LayoutDashboard, title: "Traveller Dashboard", caption: "Trip status, itinerary, booking details and documents." },
  { icon: LifeBuoy, title: "Support", caption: "Traveller assistance and, once launched, emergency/SOS pathways." },
] as const;

export function AppFeaturesShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Application Features"
        title="What happens after the website"
        description="These features live in the Dhyana Stays application, not on this site — here's what's waiting once you open it."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, caption }) => (
          <div key={title} className="rounded-2xl border border-border-subtle bg-surface p-5">
            <div className="flex size-9 items-center justify-center rounded-full bg-brand-soft text-brand">
              <Icon size={16} />
            </div>
            <h3 className="mt-3 font-display text-base font-semibold">{title}</h3>
            <p className="mt-1 text-sm leading-6 opacity-70">{caption}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <ButtonLink href="/app" variant="primary">
          Open the app to try these
        </ButtonLink>
      </div>
    </section>
  );
}
