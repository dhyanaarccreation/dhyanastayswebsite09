import { test, expect } from "@playwright/test";

// Home composition checks.

test("Home no longer has the Testimonials section, and the sections around it are intact and in order", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByText("Trust, in real voices")).toHaveCount(0);
  await expect(page.getByText(/Sample quote — pending/)).toHaveCount(0);

  // App Features → App download CTA → FAQ → Contact: the run that used to have
  // Testimonials between App Features and the CTA.
  const headings = [
    "What happens after the website",
    "Take Dhyana further, in the app",
    "Questions, answered",
    "Tell us who you are",
  ];
  const tops: number[] = [];
  for (const name of headings) {
    const h = page.getByRole("heading", { name, exact: true });
    await expect(h).toHaveCount(1);
    tops.push(await h.evaluate((el) => el.getBoundingClientRect().top + window.scrollY));
  }
  expect(tops).toEqual([...tops].sort((a, b) => a - b)); // strictly top-to-bottom
});
