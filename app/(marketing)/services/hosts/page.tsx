import { ServicesTabs } from "@/components/sections/services/ServicesTabs";

// PROJECT_BRIEF.md §4 flags "For Hosts" as needing a possible full dedicated
// page (Chapter 11 has 7 much deeper topics than a services tab implies) —
// decision still pending the client. Kept intentionally light here (reusing
// the same Services tab as every other audience) rather than over-building a
// dedicated Host experience ahead of that confirmation.
export default function HostsPage() {
  return <ServicesTabs defaultTab="hosts" />;
}
