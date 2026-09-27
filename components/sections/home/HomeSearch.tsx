"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

// Home-only shared state: the destination typed into the hero search bar
// live-filters the sample stays in the Home explorer further down the page —
// the same interaction the Application's Home has. It is a front-end showcase
// only (PROJECT_BRIEF.md §6): nothing is sent anywhere, and dates / guests
// are not used to check availability.

type HomeSearch = { query: string; setQuery: (q: string) => void };

const HomeSearchContext = createContext<HomeSearch | null>(null);

export function HomeSearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const value = useMemo(() => ({ query, setQuery }), [query]);
  return <HomeSearchContext.Provider value={value}>{children}</HomeSearchContext.Provider>;
}

export function useHomeSearch(): HomeSearch {
  const ctx = useContext(HomeSearchContext);
  if (!ctx) throw new Error("useHomeSearch must be used inside <HomeSearchProvider>");
  return ctx;
}
