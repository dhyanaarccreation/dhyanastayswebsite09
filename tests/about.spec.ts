import { test, expect } from "@playwright/test";

// Final About copy (supplied 2026-09-25). These assertions pin the wording, so
// an accidental edit to the approved text fails here.

test.describe("Home — About teaser", () => {
  test("shows the finalized teaser copy and leads to /about", async ({ page }) => {
    await page.goto("/");
    const teaser = page.locator("#about-dhyana"); // also the Hero's scroll target
    await expect(teaser).toBeVisible();
    await expect(teaser.getByText("About Dhyana Stays", { exact: true })).toBeVisible();
    await expect(teaser.getByRole("heading", { name: "Experience Beyond Stay", exact: true })).toBeVisible();
    await expect(teaser).toContainText(
      "Dhyana Stays is more than a stay-booking platform. We curate unique stays, experiences, destinations, and travel stories — bringing every piece of your journey together, so you don't just book a stay, you remember a journey.",
    );

    const cta = teaser.getByRole("link", { name: "Explore Dhyana Stays" });
    await expect(cta).toHaveAttribute("href", "/about");
    await cta.click();
    await expect(page).toHaveURL(/\/about$/);
  });

  test("old working copy is gone", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("The website explains. The application executes.")).toHaveCount(0);
    // Scoped: the FAQ legitimately has its own "What is Dhyana?" question.
    await expect(page.locator("#about-dhyana").getByText("What is Dhyana?")).toHaveCount(0);
  });
});

test.describe("About page — six blocks", () => {
  test("renders every block with the finalized copy", async ({ page }) => {
    await page.goto("/about");

    await expect(page.getByRole("heading", { level: 1, name: "Experience Beyond Stay" })).toBeVisible();
    await expect(page.getByText("About Dhyana Stays", { exact: true })).toBeVisible();

    // Block headings, in order
    const headings = await page.locator("main h2").allTextContents();
    expect(headings).toEqual([
      "Who We Are",
      "Why We Started",
      "What We Do",
      "What Makes Us Different",
      "Our Journey",
      "Our Vision",
    ]);

    const main = page.locator("main");
    // 1 Who We Are
    await expect(main).toContainText(
      "Dhyana Stays is a curated travel and hospitality platform built around one idea: travel should be experienced, not simply booked.",
    );
    // 2 Why We Started
    await expect(main).toContainText(
      "Travellers often spend hours piecing together the right stay, experiences, food, and things to do — across a dozen different apps and tabs. We started Dhyana Stays to bring all of it into one meaningful journey.",
    );
    // 3 What We Do
    await expect(main).toContainText(
      "We connect five things that are usually scattered, so your trip feels like one story, not five separate bookings.",
    );
    const doItems = await page.locator("main li h3").allTextContents();
    expect(doItems).toEqual(["Curated Stays", "Experiences", "Travel Guides", "AI Trip Planning", "Hospitality"]);
    for (const line of [
      "Handpicked properties, chosen for character, not just availability.",
      "Local, cultural, and immersive moments woven into your stay.",
      "Real people who know a destination, sharing it honestly.",
      "A planner that learns your travel style, not a generic itinerary.",
      "Support and consultancy for hosts who want to do it right.",
    ]) {
      await expect(main).toContainText(line);
    }
    // 4 What Makes Us Different
    for (const line of [
      "Handpicked stays, not endless listings",
      "Curated experiences, not generic add-ons",
      "Trusted travel curators, not anonymous reviews",
      "AI-powered planning, built around you",
      "One journey, start to finish — not a string of separate bookings",
    ]) {
      await expect(main.getByText(line, { exact: true })).toBeVisible();
    }
    // 5 Our Journey
    await expect(main).toContainText(
      "Our story began with architecture — understanding how spaces shape the way people feel. That same thinking carried us into designing unique stays, then into hospitality, and eventually into building Dhyana Stays: a platform for experiencing places, not just visiting them.",
    );
    const steps = await page.locator("main ol li").allTextContents();
    expect(steps).toEqual(["Architecture", "Stay Design", "Hospitality", "Experience", "Dhyana Stays"]);
    // 6 Our Vision
    await expect(main).toContainText(
      "To build a global travel ecosystem where every destination can be discovered through its stays, its people, its culture, its food, and its experiences.",
    );
  });

  test("CTA exists, and the page has no horizontal overflow on a phone", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/about");
    await expect(page.getByRole("link", { name: "Explore Dhyana Stays" })).toHaveAttribute("href", "/curated-stays");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
