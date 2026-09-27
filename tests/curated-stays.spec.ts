import { test, expect } from "@playwright/test";

// Curated Stays showcase — six sample stays, each with a (stock) photo. The
// photos are local files under public/images/stays, so a broken path shows up
// here as a zero-width image.

test.describe("Curated Stays showcase", () => {
  test("shows six sample stays and every photo loads", async ({ page }) => {
    await page.goto("/curated-stays");
    const cards = page.locator("main h3");
    await expect(cards).toHaveCount(6);
    await expect(cards).toHaveText([
      "The Canopy Tiny House",
      "Nila Wellness Retreat",
      "The Glass Pavilion",
      "Heritage Courtyard Villa",
      "Vaksana Farms",
      "Salt & Sky Beach Villa",
    ]);

    const imgs = page.locator("main img");
    await expect(imgs).toHaveCount(6);
    // Scroll each into view (images are lazy) then confirm they decoded.
    for (let i = 0; i < 6; i++) await imgs.nth(i).scrollIntoViewIfNeeded();
    await expect
      .poll(() => imgs.evaluateAll((els) => els.filter((e) => (e as HTMLImageElement).naturalWidth > 0).length))
      .toBe(6);

    // Photos are labelled as sample stock, not as the real properties.
    await expect(page.getByText(/stock photography shown for layout purposes/)).toBeVisible();
  });

  test("category filters narrow the grid", async ({ page }) => {
    await page.goto("/curated-stays");
    await page.getByRole("button", { name: "Luxury Villa", exact: true }).click();
    await expect(page.locator("main h3")).toHaveText(["The Glass Pavilion", "Salt & Sky Beach Villa"]);
    await page.getByRole("button", { name: "Farm Stay", exact: true }).click();
    await expect(page.locator("main h3")).toHaveText(["Vaksana Farms"]);
    await page.getByRole("button", { name: "All", exact: true }).click();
    await expect(page.locator("main h3")).toHaveCount(6);
  });
});
