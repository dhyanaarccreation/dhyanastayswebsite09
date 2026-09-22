import { ForHostsShowcase } from "@/components/sections/for-hosts/ForHostsShowcase";

// DHN-55 — For Hosts Dedicated Page (POC). Lives at /for-hosts, replacing
// the old /services/hosts route that reused the generic ServicesTabs (that
// whole Services Tabs section, DHN-19, was removed by client decision — see
// PROJECT_BRIEF.md §4).
export default function ForHostsPage() {
  return <ForHostsShowcase />;
}
