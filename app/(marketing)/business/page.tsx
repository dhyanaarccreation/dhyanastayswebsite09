import type { Metadata } from "next";
import { BusinessHub } from "@/components/sections/business/BusinessHub";

export const metadata: Metadata = {
  title: "Business with Dhyana Stays",
  description:
    "Host a stay, invest in a project, enquire about consultancy, join the influencer program or the team.",
};

// Business Hub — one door for hosts, investors, consultancy clients,
// influencers and careers. Ported from the Application prototype; see the
// notes at the top of BusinessHub.tsx for what was adapted and why.
export default function BusinessPage() {
  return <BusinessHub />;
}
