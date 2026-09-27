import type { Metadata } from "next";
import { ApplyInfluencerForm } from "@/components/sections/business/ApplyInfluencerForm";

export const metadata: Metadata = {
  title: "Apply as an Influencer — Dhyana Stays",
  description: "A showcase of the Dhyana Stays influencer application flow.",
};

export default function ApplyInfluencerPage() {
  return <ApplyInfluencerForm />;
}
