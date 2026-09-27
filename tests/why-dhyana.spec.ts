import { test, expect } from "@playwright/test";

// Why Dhyana — bento cards with icon tiles. The redesign is presentation-only,
// so the approved bullets (Home topic 01.8) and their order must not change.

const EXPECTED: [string, string][] = [
  ["Less noise", "Intentional curation narrows discovery so you spend more time understanding suitable places, not scrolling past them."],
  ["Handpicked stays", "Properties are selected using an internal quality philosophy rather than simply maximising listing count."],
  ["Storytelling", "Video, photos, architecture, amenities and destination context help you understand what you're choosing."],
  ["Curated experiences", "Food, culture, nature, adventure, wellness and events extend the journey beyond the room."],
  ["Trusted curators", "Handpicked creators provide destination stories and first-hand inspiration, clearly identified and permissioned."],
  ["AI planning", "AI converts preferences and inspiration into a personalised plan you can customise from a Travel Guide itinerary."],
  ["Complete journey", "Dhyana connects discovery, stay selection, experiences, itinerary planning and app-based booking and support."],
];

test("seven differentiators, in the approved order, with verbatim copy and an icon each", async ({ page }) => {
  await page.goto("/why-dhyana");
  const cards = page.locator("main article");
  await expect(cards).toHaveCount(7);
  for (let i = 0; i < EXPECTED.length; i++) {
    const [title, caption] = EXPECTED[i];
    await expect(cards.nth(i).getByRole("heading", { level: 3, name: title, exact: true })).toBeVisible();
    await expect(cards.nth(i)).toContainText(caption);
    await expect(cards.nth(i).locator("svg[aria-hidden='true']")).toHaveCount(1); // decorative icon
    await expect(cards.nth(i)).toContainText(String(i + 1).padStart(2, "0")); // index badge
  }
});

test("desktop: 3-up grid with a full-width closing card; seven distinct colourful icon tiles that react to hover", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/why-dhyana");
  const cards = page.locator("main article");
  const box = async (i: number) => (await cards.nth(i).boundingBox())!;
  const [a, b, c, last] = [await box(0), await box(1), await box(2), await box(6)];
  expect(Math.abs(a.y - b.y)).toBeLessThan(2); // first three share a row
  expect(Math.abs(b.y - c.y)).toBeLessThan(2);
  expect(last.width).toBeGreaterThan(a.width * 2.5); // spans the full row
  expect(last.y).toBeGreaterThan(a.y + a.height);

  // Colourful: every icon tile has its own gradient (seven distinct backgrounds)…
  const tiles = page.getByTestId("icon-tile");
  await expect(tiles).toHaveCount(7);
  const gradients = await tiles.evaluateAll((els) => els.map((e) => getComputedStyle(e).backgroundImage));
  expect(new Set(gradients).size).toBe(7);
  expect(gradients.every((g) => g.includes("linear-gradient"))).toBe(true);

  // …and hovering a card tilts/scales its tile. Tailwind v4 drives this through the
  // standalone `rotate` and `scale` CSS properties, not `transform`.
  const tile = tiles.nth(1);
  const pose = () => tile.evaluate((el) => `${getComputedStyle(el).rotate} | ${getComputedStyle(el).scale}`);
  expect(await pose()).toBe("none | none");
  await cards.nth(1).hover();
  await expect.poll(pose).not.toBe("none | none");
});

test("mobile: single column, no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/why-dhyana");
  const cards = page.locator("main article");
  const [a, b] = [(await cards.nth(0).boundingBox())!, (await cards.nth(1).boundingBox())!];
  expect(b.y).toBeGreaterThan(a.y + a.height - 1); // stacked
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
});
