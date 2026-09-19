import { Hero } from "@/components/sections/hero/Hero";
import { AboutDhyana } from "@/components/sections/about-dhyana/AboutDhyana";
import { ExperienceBeyondStay } from "@/components/sections/experience-beyond-stay/ExperienceBeyondStay";
import { CuratedStaysShowcase } from "@/components/sections/curated-stays/CuratedStaysShowcase";
import { WhyDhyana } from "@/components/sections/why-dhyana/WhyDhyana";
import { ExperiencesShowcase } from "@/components/sections/experiences/ExperiencesShowcase";
import { ServicesTabs } from "@/components/sections/services/ServicesTabs";
import { AiTripPlannerShowcase } from "@/components/sections/ai-trip-planner/AiTripPlannerShowcase";
import { EcosystemVisual } from "@/components/sections/ecosystem/EcosystemVisual";
import { AppFeaturesShowcase } from "@/components/sections/app-features/AppFeaturesShowcase";
import { TestimonialsGrid } from "@/components/sections/testimonials/TestimonialsGrid";
import { AppDownloadCta } from "@/components/sections/app-cta/AppDownloadCta";
import { FaqAccordion } from "@/components/sections/faq/FaqAccordion";
import { ContactSection } from "@/components/sections/contact/ContactSection";

// Home renders the full POC storytelling scroll per PROJECT_BRIEF.md §4, in
// build order. DHN-27 (Footer) is not listed here since it's a direct edit to
// components/nav/Footer.tsx, rendered globally by app/(marketing)/layout.tsx.
export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutDhyana />
      <ExperienceBeyondStay />
      <CuratedStaysShowcase />
      <WhyDhyana />
      <ExperiencesShowcase />
      <ServicesTabs />
      <AiTripPlannerShowcase />
      <EcosystemVisual />
      <AppFeaturesShowcase />
      <TestimonialsGrid />
      <AppDownloadCta />
      <FaqAccordion />
      <ContactSection />
    </>
  );
}
