import { Hero } from "@/components/sections/hero/Hero";
import { SectionPlaceholder } from "@/components/ui/SectionPlaceholder";

// Home renders the full POC storytelling scroll per PROJECT_BRIEF.md §4 —
// sections are replaced one at a time, in build order. DHN-27 (Footer) is
// not listed here since it's a direct edit to components/nav/Footer.tsx,
// rendered globally by app/(marketing)/layout.tsx rather than as a Home section.
export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionPlaceholder
        id="about-dhyana"
        jiraKey="DHN-14"
        title="About Dhyana"
        description="Our story, vision, mission and beliefs."
      />
      <SectionPlaceholder
        jiraKey="DHN-15"
        title="Experience Beyond Stay"
        description="Stay, destination, food, culture, activities, wellness and events — the complete journey."
      />
      <SectionPlaceholder
        jiraKey="DHN-16"
        title="Curated Stays Showcase"
        description="Editorial showcase of selective, high-quality properties."
      />
      <SectionPlaceholder
        jiraKey="DHN-17"
        title="Why Dhyana"
        description="Practical differentiators: less noise, handpicked stays, storytelling, AI, trusted curators."
      />
      <SectionPlaceholder
        jiraKey="DHN-18"
        title="Experiences Showcase Grid"
        description="Local, food, culture, nature, adventure, wellness and property experiences."
      />
      <SectionPlaceholder
        jiraKey="DHN-19"
        title="Services"
        description="Tabbed overview for Travellers, Hosts and Travel Curators."
      />
      <SectionPlaceholder
        jiraKey="DHN-20"
        title="AI Trip Planner"
        description="Static showcase of AI-personalised itinerary planning."
        capability="demo"
      />
      <SectionPlaceholder
        jiraKey="DHN-21"
        title="Dhyana Ecosystem"
        description="Traveller, Host, Travel Curator, Experience Provider and Dhyana, visualised."
      />
      <SectionPlaceholder
        jiraKey="DHN-22"
        title="Application Features"
        description="Discover, Stays, Experiences, Travel Guides, AI Planner, Itinerary, Booking, Dashboard, Support."
      />
      <SectionPlaceholder
        jiraKey="DHN-23"
        title="Testimonials"
        description="Traveller, host and travel curator stories."
      />
      <SectionPlaceholder
        jiraKey="DHN-24"
        title="Access the App"
        description="QR code and store CTAs to the Dhyana Stays application."
      />
      <SectionPlaceholder
        jiraKey="DHN-25"
        title="FAQ"
        description="Traveller, host and travel curator questions."
      />
      <SectionPlaceholder
        jiraKey="DHN-26"
        title="Contact"
        description="Category-based lead generation for travellers, hosts, curators and partners."
      />
    </>
  );
}
