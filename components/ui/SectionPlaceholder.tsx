import { CapabilityBadge } from "./CapabilityBadge";

type Capability = "live" | "demo" | "coming-soon";

/**
 * Generic placeholder for a not-yet-built POC section/page. Swap out with the
 * real component per PROJECT_BRIEF.md — keep the Jira key in a code comment
 * on the real component so it stays traceable back to the backlog.
 */
export function SectionPlaceholder({
  jiraKey,
  title,
  description,
  capability = "coming-soon",
}: {
  jiraKey: string;
  title: string;
  description: string;
  capability?: Capability;
}) {
  return (
    <section className="mx-auto flex max-w-4xl flex-col items-start gap-4 px-6 py-24">
      <span className="font-mono text-xs opacity-50">{jiraKey}</span>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      <p className="max-w-2xl text-base leading-7 opacity-70">{description}</p>
      <CapabilityBadge capability={capability} />
    </section>
  );
}
