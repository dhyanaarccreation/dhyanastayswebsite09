import { test, expect, type Page } from "@playwright/test";

// Home — traveller / curated-stay-booking restyle (2026-09-25). Home only:
// other routes must keep their own components. Everything here is a labelled
// showcase (PROJECT_BRIEF.md §6): no prices, no booking, no backend calls.

const stays = (page: Page) => page.locator("#explore-stays article");
const count = (page: Page) => page.locator("#explore-stays").getByText(/curated stays? found/);

test.describe("Home hero + capsule search", () => {
  test("headline, labelled demo search, and a playing video", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Experience Beyond Stay");
    await expect(page.getByText("India's Premier Curated Stays")).toBeVisible();

    const search = page.getByRole("search", { name: "Search sample stays" });
    await expect(search).toBeVisible();
    await expect(search.getByLabel("Search destination")).toBeVisible();
    await expect(search.getByLabel("Check-in date")).toBeVisible();
    await expect(search.getByLabel("Check-out date")).toBeVisible();
    await expect(search.getByRole("button", { name: "Search" })).toBeVisible();
    // Rule 1: the bar says it is a demo, and where the real thing lives.
    await expect(page.locator("#hero").getByText("Showcase / Demo")).toBeVisible();
    await expect(page.locator("#hero").getByRole("link", { name: "the app", exact: true })).toHaveAttribute("href", "/app");

    const video = page.locator("#hero video");
    await expect(video).toHaveAttribute("src", "/motion-video.mp4");
    await expect.poll(() => video.evaluate((v) => !(v as HTMLVideoElement).paused)).toBe(true);
  });

  test("reduced motion: no video is rendered", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("/");
    await expect(page.locator("#hero")).toBeVisible();
    await expect(page.locator("#hero video")).toHaveCount(0);
    await ctx.close();
  });

  test("guest stepper is bounded at 1", async ({ page }) => {
    await page.goto("/");
    const search = page.getByRole("search", { name: "Search sample stays" });
    await expect(search.getByText("2 Guests")).toBeVisible();
    await search.getByRole("button", { name: "More guests" }).click();
    await expect(search.getByText("3 Guests")).toBeVisible();
    await search.getByRole("button", { name: "Fewer guests" }).click();
    await search.getByRole("button", { name: "Fewer guests" }).click();
    await expect(search.getByText("1 Guest", { exact: true })).toBeVisible();
    await expect(search.getByRole("button", { name: "Fewer guests" })).toBeDisabled();
  });

  test("See how it works scrolls to the About teaser", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "See how it works" }).click();
    await expect.poll(() => page.locator("#about-dhyana").evaluate((el) => el.getBoundingClientRect().top)).toBeLessThan(300);
  });
});

test.describe("Home stays explorer", () => {
  test("six photo cards, each tagged Sample, no prices, every photo loads", async ({ page }) => {
    await page.goto("/");
    await expect(stays(page)).toHaveCount(6);
    await expect(count(page)).toHaveText("6 curated stays found");
    await expect(page.locator("#explore-stays").getByText("Sample", { exact: true })).toHaveCount(6);
    await expect(page.locator("#explore-stays")).not.toContainText("₹");

    const imgs = page.locator("#explore-stays img");
    for (let i = 0; i < 6; i++) await imgs.nth(i).scrollIntoViewIfNeeded();
    await expect
      .poll(() => imgs.evaluateAll((els) => els.filter((e) => (e as HTMLImageElement).naturalWidth > 0).length))
      .toBe(6);
  });

  test("typing a destination in the hero filters the grid live; Clear resets", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Search destination").fill("wayanad");
    await expect(stays(page)).toHaveCount(1);
    await expect(stays(page).first().getByRole("heading", { name: "The Glass Pavilion" })).toBeVisible();
    await expect(count(page)).toHaveText("1 curated stay found for “wayanad”");

    await page.getByRole("button", { name: "Clear search" }).click();
    await expect(stays(page)).toHaveCount(6);
    await expect(page.getByLabel("Search destination")).toHaveValue("");
  });

  test("no match shows an empty state; search text and category chips combine", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Search destination").fill("zzzz");
    await expect(stays(page)).toHaveCount(0);
    await expect(page.getByText("No sample stays match that yet")).toBeVisible();

    // Two sample stays are in Kerala; a category chip narrows within the search.
    await page.getByLabel("Search destination").fill("kerala");
    await expect(stays(page).getByRole("heading")).toHaveText(["Nila Wellness Retreat", "The Glass Pavilion"]);
    await page.locator("#explore-stays").getByRole("button", { name: "Wellness Retreat", exact: true }).click();
    await expect(stays(page).getByRole("heading")).toHaveText(["Nila Wellness Retreat"]);
    await expect(count(page)).toHaveText("1 curated stay found for “kerala”");
  });

  test("category chips filter and report the count", async ({ page }) => {
    await page.goto("/");
    const ex = page.locator("#explore-stays");
    await ex.getByRole("button", { name: "Luxury Villa", exact: true }).click();
    await expect(stays(page)).toHaveCount(2);
    await expect(count(page)).toHaveText("2 curated stays found");
    await expect(ex.getByRole("button", { name: "Luxury Villa", exact: true })).toHaveAttribute("aria-pressed", "true");
    await ex.getByRole("button", { name: "Farm Stay", exact: true }).click();
    await expect(stays(page)).toHaveCount(1);
    await ex.getByRole("button", { name: "All", exact: true }).click();
    await expect(stays(page)).toHaveCount(6);
  });

  test("pressing Search scrolls to the explorer", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Search destination").fill("auroville");
    await page.getByRole("search").getByRole("button", { name: "Search", exact: true }).click();
    await expect.poll(() => page.locator("#explore-stays").evaluate((el) => el.getBoundingClientRect().top)).toBeLessThan(200);
    await expect(stays(page)).toHaveCount(1);
  });
});

test.describe("Home extras", () => {
  test("AI banner and floating pill are honest and lead to the labelled demo page", async ({ page }) => {
    await page.goto("/");
    const banner = page.locator("main section a[href='/ai-trip-planner']").first();
    await expect(banner).toContainText("Showcase");
    await expect(banner).toContainText("See a sample plan");
    await expect(banner).not.toContainText("Try it");

    const pill = page.getByRole("link", { name: "Open the AI Trip Planner showcase" });
    await expect(pill).toHaveAttribute("href", "/ai-trip-planner");
    await expect(pill).toBeVisible();
  });

  test("Experiences on Home use the photo-card look with Sample tags", async ({ page }) => {
    await page.goto("/");
    const s = page.locator("section").filter({ has: page.getByRole("heading", { name: "Accommodation connected to local discovery" }) });
    await expect(s.locator("article")).toHaveCount(6);
    await expect(s.getByText("Sample", { exact: true })).toHaveCount(6);
  });

  test("the restyle is Home-only: /curated-stays and /experiences keep their own look, no floating pill", async ({ page }) => {
    await page.goto("/curated-stays");
    await expect(page.locator("#explore-stays")).toHaveCount(0);
    await expect(page.locator("main article")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Open the AI Trip Planner showcase" })).toHaveCount(0);
    await expect(page.locator("main h3")).toHaveCount(6);

    await page.goto("/experiences");
    await expect(page.locator("main article")).toHaveCount(0); // default variant uses plain cards
    await expect(page.locator("main h3")).toHaveCount(12);
    await expect(page.getByRole("link", { name: "Open the AI Trip Planner showcase" })).toHaveCount(0);
    await expect(page.locator("main video")).toHaveCount(0);
  });

  test("no horizontal overflow on a phone, and no lead/API calls from Home interactions", async ({ page }) => {
    const api: string[] = [];
    page.on("request", (r) => r.url().includes("/api/") && api.push(r.url()));
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByLabel("Search destination").fill("gokarna");
    await page.getByRole("search").getByRole("button", { name: "Search", exact: true }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
    expect(api).toEqual([]);
  });
});
