import { test, expect, type Page } from "@playwright/test";

// Experiences showcase — twelve sample experiences with local stock photos.
// Home shows the first six (one per category); /experiences shows all twelve.

const SECTION_TITLE = "Accommodation connected to local discovery";

function section(page: Page) {
  return page.locator("section").filter({ has: page.getByRole("heading", { name: SECTION_TITLE }) });
}

async function allImagesLoaded(page: Page, expected: number) {
  const imgs = section(page).locator("img");
  await expect(imgs).toHaveCount(expected);
  for (let i = 0; i < expected; i++) await imgs.nth(i).scrollIntoViewIfNeeded(); // lazy-loaded
  await expect
    .poll(() => imgs.evaluateAll((els) => els.filter((e) => (e as HTMLImageElement).naturalWidth > 0).length))
    .toBe(expected);
}

test.describe("Experiences showcase", () => {
  test("/experiences shows all twelve, each with a loaded photo, place and duration", async ({ page }) => {
    await page.goto("/experiences");
    await expect(section(page).locator("h3")).toHaveCount(12);
    await allImagesLoaded(page, 12);
    // Every card carries a duration line (e.g. "90 min", "3 hrs", "Half day").
    await expect(section(page).getByText(/^(\d+(\.\d)? ?(min|hrs)|Half day)$/)).toHaveCount(12);
    await expect(page.getByText(/stock photography shown for layout purposes/)).toBeVisible();
  });

  test("Home teaser shows six (one per category) and links on to all", async ({ page }) => {
    await page.goto("/");
    const s = section(page);
    await expect(s.locator("h3")).toHaveText([
      "Sunrise Yoga at Auroville",
      "Farm-to-Table Cooking Class",
      "Western Ghats Trek",
      "Pottery Workshop",
      "Birdwatching Trail",
      "Night Photography Walk",
    ]);
    await allImagesLoaded(page, 6);
    await expect(s.getByRole("link", { name: "Explore all experiences" })).toHaveAttribute("href", "/experiences");
  });

  test("a category filter shows every match, even past the Home limit", async ({ page }) => {
    await page.goto("/");
    const s = section(page);
    await s.getByRole("button", { name: "Wellness", exact: true }).click();
    await expect(s.locator("h3")).toHaveText(["Sunrise Yoga at Auroville", "Ayurvedic Abhyanga Session"]);
    await s.getByRole("button", { name: "Photography", exact: true }).click();
    await expect(s.locator("h3")).toHaveText(["Night Photography Walk", "Travel Photography Session"]);
    await s.getByRole("button", { name: "All", exact: true }).click();
    await expect(s.locator("h3")).toHaveCount(6);
  });
});
