import { SectionHeading } from "@/components/ui/SectionHeading";
import { AppDownloadCta } from "@/components/sections/app-cta/AppDownloadCta";

export default function AppPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-24">
      <SectionHeading
        eyebrow="Access the Application"
        title="Everything here, now in your hands"
        description="Planning, personalisation, booking and trip management all live in the Dhyana Stays app — this website is where you discover it first."
        align="center"
      />
      <AppDownloadCta />
    </div>
  );
}
