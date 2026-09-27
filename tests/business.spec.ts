import { test, expect } from "@playwright/test";

// Business Hub (/business) and the influencer application demo
// (/business/apply-influencer). Both are showcase-only: the assistant is a
// keyword matcher and the influencer form must never hit /api/leads
// (PROJECT_BRIEF.md §6 rules 1 and 2).

test.describe("Business hub", () => {
  test("nav has a single Business item — no Become a Host item, and the For Hosts page is gone", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("banner");
    await expect(nav.getByRole("link", { name: "Business", exact: true })).toHaveAttribute("href", "/business");
    await expect(nav.getByRole("link", { name: /Become a Host/ })).toHaveCount(0);
    await expect(page.getByText("Become a Host")).toHaveCount(0); // nav + footer
    await expect(page.locator('a[href="/for-hosts"]')).toHaveCount(0);

    await nav.getByRole("link", { name: "Business", exact: true }).click();
    await expect(page).toHaveURL(/\/business$/);
    await expect(page.getByRole("heading", { level: 1, name: /One door/ })).toBeVisible();

    const gone = await page.goto("/for-hosts");
    expect(gone?.status()).toBe(404);
  });

  test("hosting path still works: Host & List → Contact form on the Host category", async ({ page }) => {
    await page.goto("/business");
    await page.locator("#business-tabs").getByRole("link", { name: "Start listing" }).click();
    await expect(page).toHaveURL(/\/contact\?as=host$/);
    await expect(page.getByText("Property name & location")).toBeVisible();
  });

  test("the removed host-enquiry API path is rejected and writes nothing", async ({ request }) => {
    // Unknown formType returns before any workbook access — safe against a live server.
    const res = await request.post("/api/leads", {
      data: { formType: "hostEnquiry", propertyName: "x", contactName: "x", email: "x@x.co", consent: true },
    });
    expect(res.status()).toBe(400);
    expect((await res.json()).error).toBe("Unknown form type.");
  });

  test("no link on /business points at a removed route", async ({ page }) => {
    await page.goto("/business");
    for (const tab of ["Host & List", "Invest", "Consultancy", "Influencers", "Careers"]) {
      await page.getByRole("button", { name: tab, exact: true }).click();
      const hrefs = await page.locator("a[href]").evaluateAll((els) => els.map((e) => e.getAttribute("href") ?? ""));
      expect(hrefs.filter((h) => h.startsWith("/for-hosts"))).toEqual([]);
    }
  });

  test("tabs switch content and CTAs point at routes that exist on this site", async ({ page }) => {
    await page.goto("/business");
    await expect(page.getByRole("heading", { level: 1, name: /One door/ })).toBeVisible();

    await page.getByRole("button", { name: "Invest", exact: true }).click();
    await expect(page.getByRole("heading", { level: 3, name: "Joint Investment Partnership" })).toBeVisible();
    await expect(page.getByText(/does not guarantee returns/)).toBeVisible();

    await page.getByRole("button", { name: "Consultancy", exact: true }).click();
    const hrefs = await page.locator("#business-tabs a").evaluateAll((els) => els.map((e) => e.getAttribute("href")));
    expect(hrefs).toEqual(["/contact?as=partner", "/contact?as=partner"]);

    await page.getByRole("button", { name: "Influencers", exact: true }).click();
    await expect(page.getByRole("link", { name: /Apply as influencer/ })).toHaveAttribute(
      "href",
      "/business/apply-influencer",
    );
  });

  test("assistant is labelled demo, replies with a CTA and keeps the newest reply in view", async ({ page }) => {
    await page.goto("/business");
    await expect(page.getByText("Showcase / Demo")).toBeVisible();

    const box = page.getByLabel("Ask the business assistant");
    const send = page.getByRole("button", { name: "Send", exact: true });
    for (const q of ["how do I list my property", "invest", "influencer", "food kitchen", "zzz"]) {
      await box.fill(q);
      await send.click();
    }
    // Scoped to the chat box — the Host tab card also has a "Start listing" link.
    const chat = page.locator("[aria-live=polite]");
    await expect(chat.getByRole("link", { name: "Start listing" })).toHaveAttribute("href", "/contact?as=host");
    await expect(chat.getByRole("link", { name: "Contact us instead" })).toHaveAttribute("href", "/contact");

    // The chat box scrolls to the latest message rather than hiding it below the fold.
    expect(await chat.evaluate((el) => el.scrollHeight > el.clientHeight)).toBe(true); // it does overflow…
    expect(await chat.evaluate((el) => Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 2)).toBe(true); // …and sits at the bottom
  });
});

test.describe("Influencer application demo", () => {
  test("validates each step, finishes without sending anything", async ({ page }) => {
    const leadsRequests: string[] = [];
    page.on("request", (r) => {
      if (r.url().includes("/api/leads")) leadsRequests.push(r.url());
    });

    await page.goto("/business/apply-influencer");
    await expect(page.getByText(/not sent anywhere/)).toBeVisible();

    // Step 1 — empty submit is rejected
    await page.getByRole("button", { name: /Continue/ }).click();
    await expect(page.getByText("Email is required.")).toBeVisible();
    await page.getByPlaceholder("Your full name").fill("Asha Verma");
    await page.getByPlaceholder("you@example.com").fill("asha@example.com");
    await page.getByPlaceholder("+91 98765 43210").fill("98765 43210");
    await page.getByPlaceholder("Where you're based").fill("Bengaluru");
    await page.getByPlaceholder("Your age").fill("12");
    await page.getByRole("button", { name: /Continue/ }).click();
    await expect(page.getByText("Must be between 16 and 100.")).toBeVisible();
    await page.getByPlaceholder("Your age").fill("27");
    await page.getByRole("button", { name: /Continue/ }).click();

    // Step 2
    await expect(page.getByText("Step 2 of 3")).toBeVisible();
    await page.getByRole("button", { name: /Continue/ }).click();
    await expect(page.getByText("Select your follower range.")).toBeVisible();
    await page.getByPlaceholder("yourhandle", { exact: true }).fill("asha.travels");
    await page.getByPlaceholder("instagram.com/yourhandle").fill("instagram.com/asha.travels");
    await page.locator('select[name="followers"]').selectOption({ index: 2 });
    await page.getByPlaceholder("e.g. 25000").fill("30000");
    await page.getByPlaceholder("Link to your portfolio or drive folder").fill("drive.google.com/x");
    await page.locator('textarea[name="bestContent"]').fill("instagram.com/reel/1");
    await page.getByRole("button", { name: /Continue/ }).click();

    // Step 3 — declaration required, then finish
    await expect(page.getByText("Step 3 of 3")).toBeVisible();
    await page.getByRole("button", { name: /Finish demo/ }).click();
    await expect(page.getByText("Please confirm the declaration to continue.")).toBeVisible();
    await page.locator('select[name="category"]').selectOption({ index: 1 });
    await page.getByPlaceholder("e.g. English, Hindi, Tamil").fill("English, Hindi");
    await page.locator('textarea[name="bio"]').fill("Slow travel storyteller");
    await page.locator('select[name="travelAvailability"]').selectOption({ index: 1 });
    await page.getByRole("button", { name: "Free Stay" }).click();
    await page.locator('textarea[name="whyJoin"]').fill("Love curated stays");
    await page.locator('input[name="declaration"]').check();
    await page.getByRole("button", { name: /Finish demo/ }).click();

    await expect(page.getByText("Demo complete — nothing was sent")).toBeVisible();
    await expect(page.getByRole("link", { name: /Contact the team/ })).toHaveAttribute("href", "/contact?as=curator");
    expect(leadsRequests).toEqual([]);
  });
});
