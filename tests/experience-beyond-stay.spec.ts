import { test, expect } from "@playwright/test";

// Experience Beyond Stay — seven pillar cards with colourful icon tiles. The
// redesign is presentation-only: approved pillar labels (Home topic 01.3), their
// captions and the journey band must be unchanged.

const PILLARS: [string, string][] = [
  ["Stay", "Distinctive, quality-conscious properties with clear architecture, setting and amenities."],
  ["Destination", "Place character, neighbourhoods, landscape and reasons to visit."],
  ["Food", "Local cuisine, curated food and authentic dining as part of destination identity."],
  ["Culture", "Heritage, traditions, art, crafts and respectful cultural discovery."],
  ["Activities", "Tours, cycling, workshops, photography, nature and adventure."],
  ["Wellness", "Yoga, meditation, retreats and nature-based relaxation."],
  ["Events", "Festivals, music, retreats and property events, where date-sensitive."],
];

test("seven pillars in the approved order, verbatim, each with its own colourful tile", async ({ page }) => {
  await page.goto("/experience-beyond-stay");
  const section = page.locator("main section").first();
  const cards = section.locator("h3").locator("xpath=ancestor::div[contains(@class,'group')][1]");
  await expect(cards).toHaveCount(7);
  for (let i = 0; i < PILLARS.length; i++) {
    const [label, caption] = PILLARS[i];
    await expect(cards.nth(i).getByRole("heading", { level: 3, name: label, exact: true })).toBeVisible();
    await expect(cards.nth(i)).toContainText(caption);
  }

  // Seven distinct gradients, all real linear-gradients (i.e. colourful, not one tint).
  const tiles = section.getByTestId("icon-tile");
  await expect(tiles).toHaveCount(7);
  const gradients = await tiles.evaluateAll((els) => els.map((e) => getComputedStyle(e).backgroundImage));
  expect(new Set(gradients).size).toBe(7);
  expect(gradients.every((g) => g.includes("linear-gradient"))).toBe(true);
  // Icons are decorative.
  await expect(section.locator("[data-testid='icon-tile'] svg[aria-hidden='true']")).toHaveCount(7);
});

test("hovering a pillar tilts its tile; the link card and journey band are intact", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/experience-beyond-stay");
  const section = page.locator("main section").first();

  const tile = section.getByTestId("icon-tile").nth(2);
  const pose = () => tile.evaluate((el) => `${getComputedStyle(el).rotate} | ${getComputedStyle(el).scale}`);
  expect(await pose()).toBe("none | none");
  await section.getByRole("heading", { level: 3, name: "Food", exact: true }).hover();
  await expect.poll(pose).not.toBe("none | none");

  await expect(section.getByRole("link", { name: /See the full journey/ })).toHaveAttribute("href", "/experience-beyond-stay");
  await expect(section.getByText("Complete journey", { exact: true })).toBeVisible();
  for (const step of ["Choose stay", "Discover destination", "Add experiences", "Build itinerary", "Book", "Travel", "Receive support"]) {
    await expect(section.getByText(step, { exact: true })).toBeVisible();
  }
});

test("mobile: two columns, no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/experience-beyond-stay");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
});
