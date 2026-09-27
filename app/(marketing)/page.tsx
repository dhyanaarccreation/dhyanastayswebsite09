import { Hero } from "@/components/sections/hero/Hero";
import { AboutTeaser } from "@/components/sections/about-dhyana/AboutTeaser";
import { ExperienceBeyondStay } from "@/components/sections/experience-beyond-stay/ExperienceBeyondStay";
import { HomeSearchProvider } from "@/components/sections/home/HomeSearch";
import { HomeStaysExplorer } from "@/components/sections/home/HomeStaysExplorer";
import { HomeAiBanner } from "@/components/sections/home/HomeAiBanner";
import { FloatingAiPlanner } from "@/components/sections/home/FloatingAiPlanner";
import { WhyDhyana } from "@/components/sections/why-dhyana/WhyDhyana";
import { ExperiencesShowcase } from "@/components/sections/experiences/ExperiencesShowcase";
import { AiTripPlannerShowcase } from "@/components/sections/ai-trip-planner/AiTripPlannerShowcase";
import { EcosystemVisual } from "@/components/sections/ecosystem/EcosystemVisual";
import { AppFeaturesShowcase } from "@/components/sections/app-features/AppFeaturesShowcase";
import { AppDownloadCta } from "@/components/sections/app-cta/AppDownloadCta";
import { FaqAccordion } from "@/components/sections/faq/FaqAccordion";
import { ContactSection } from "@/components/sections/contact/ContactSection";

// Home renders the full POC storytelling scroll per PROJECT_BRIEF.md §4, in
// build order. DHN-27 (Footer) is not listed here since it's a direct edit to
// components/nav/Footer.tsx, rendered globally by app/(marketing)/layout.tsx.
// 2026-09-25: the Testimonials section (DHN-23, TestimonialsGrid) was removed
// from Home at the owner's request — testimonials will go on another page.
// The component is kept for reuse (it still renders at /testimonials).
// 2026-09-25: Home-only restyle to the Application's traveller / curated-stay
// booking look — capsule search hero, colourful category chips, big photo
// cards, AI-planner banner and floating pill. Section ORDER is unchanged
// (§4 build order); other routes keep their own components. The hero search
// (a labelled demo) filters HomeStaysExplorer through HomeSearchProvider.
export default function HomePage() {
  return (
    <HomeSearchProvider>
      <Hero />
      <AboutTeaser />
      <ExperienceBeyondStay />
      <HomeStaysExplorer />
      <HomeAiBanner />
      <WhyDhyana />
      <ExperiencesShowcase limit={6} variant="immersive" />
      <AiTripPlannerShowcase />
      <EcosystemVisual />
      <AppFeaturesShowcase />
      <AppDownloadCta />
      <FaqAccordion />
      <ContactSection />
      <FloatingAiPlanner />
    </HomeSearchProvider>
  );
}
