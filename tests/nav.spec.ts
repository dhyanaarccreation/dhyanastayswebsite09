import { test, expect } from "@playwright/test";

// Smoke test for DHN-12 (Sticky Navigation) — extend as real sections land.
test("home page loads and nav links to About", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Dhyana Stays" })).toBeVisible();
  await page.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
});
