import type { Metadata } from "next";
import { AboutStory } from "@/components/sections/about-dhyana/AboutStory";

export const metadata: Metadata = {
  title: "About Dhyana Stays — Experience Beyond Stay",
  description:
    "Dhyana Stays is a curated travel and hospitality platform built around one idea: travel should be experienced, not simply booked.",
};

export default function AboutPage() {
  return <AboutStory />;
}
