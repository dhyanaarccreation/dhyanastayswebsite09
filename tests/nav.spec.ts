import { test, expect } from "@playwright/test";

// Smoke test for DHN-12 (Sticky Navigation) — extend as real sections land.
// Scoped to the header: page content and the footer also contain "Dhyana
// Stays" text and an "About" link, so unscoped role queries are ambiguous.
test("Experiences dropdown lists its four items, without Experience Beyond Stay", async ({ page }) => {
  await page.goto("/");
  const header = page.getByRole("banner");
  const links = await header
    .locator("li.group ul a")
    .evaluateAll((els) => els.map((e) => `${e.textContent?.trim()}→${e.getAttribute("href")}`));
  // First dropdown is Experiences, second is Blog (Traveller Preference Quiz).
  expect(links.slice(0, 4)).toEqual([
    "Curated Stays→/curated-stays",
    "All Experiences→/experiences",
    "Travel Guides→/travel-guides",
    "AI Trip Planner→/ai-trip-planner",
  ]);
  expect(links.join(" ")).not.toContain("Experience Beyond Stay");
});

test("home page loads and nav links to About", async ({ page }) => {
  await page.goto("/");
  const header = page.getByRole("banner");
  await expect(header.getByRole("link", { name: "DhyanaStays", exact: true })).toBeVisible();
  await header.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
});
