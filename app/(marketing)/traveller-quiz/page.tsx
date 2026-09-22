import { TravellerQuiz } from "@/components/sections/traveller-quiz/TravellerQuiz";

// DHN-54? — see PROJECT_BRIEF.md §4's second amendment: this ticket number
// conflicts with Travel Guides (already DHN-54, built at /travel-guides) —
// UNRESOLVED, check the live Jira ticket before trusting either mapping.
// Traveller Preference Quiz, ported from the standalone prototype artifact
// (https://claude.ai/artifact/Gcu7EsFaBs39i4anQJYbAt), linked from the
// "Blog" nav dropdown (components/nav/NavBar.tsx).
export default function TravellerQuizPage() {
  return <TravellerQuiz />;
}
