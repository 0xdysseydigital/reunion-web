import { test, expect } from "@playwright/test";

// How long the initial loading screen runs (scale=1 → 3.3s + exit animation buffer)
const INITIAL_LOAD_MS = 4200;
// How long the page-transition overlay runs (scale=0.7 → ~2.3s + buffer)
const TRANSITION_MS = 3000;
// Time for Lenis to settle after a wheel event (duration 1.2s + buffer)
const LENIS_SETTLE_MS = 1600;

test.describe("Lenis scroll behaviour across page navigation", () => {

  test("scroll resets to top after navigation", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(INITIAL_LOAD_MS);

    await page.mouse.wheel(0, 800);
    await page.waitForTimeout(LENIS_SETTLE_MS);

    const scrollBefore = await page.evaluate(() => window.scrollY);
    expect(scrollBefore).toBeGreaterThan(200);

    await page.goto("/vibes");
    await page.waitForTimeout(TRANSITION_MS);

    const scrollAfter = await page.evaluate(() => window.scrollY);
    expect(scrollAfter).toBe(0);
  });

  test("scroll limit updates for the new page — no premature clamping", async ({ page }) => {
    // The core regression: Lenis kept the old page's scrollHeight as the limit.
    // Navigate from reservations (short page) to vibes (very long — many h-screen sections).
    // If the limit is not recalculated, Lenis will stop scroll after ~reservations height.
    await page.goto("/reservations");
    await page.waitForTimeout(INITIAL_LOAD_MS);

    // Record how tall the short page is
    const shortPageHeight = await page.evaluate(
      () => document.documentElement.scrollHeight
    );

    await page.goto("/vibes");
    await page.waitForTimeout(TRANSITION_MS);

    const longPageHeight = await page.evaluate(
      () => document.documentElement.scrollHeight
    );
    // Vibes should be substantially taller
    expect(longPageHeight).toBeGreaterThan(shortPageHeight + 1000);

    // Wheel scroll well past the short page's height limit
    const scrollAmount = shortPageHeight + 200;
    for (let i = 0; i < Math.ceil(scrollAmount / 200); i++) {
      await page.mouse.wheel(0, 200);
      await page.waitForTimeout(100);
    }
    await page.waitForTimeout(LENIS_SETTLE_MS);

    const finalScroll = await page.evaluate(() => window.scrollY);
    // Must have scrolled past the old limit — proves the limit was recalculated
    expect(finalScroll).toBeGreaterThan(shortPageHeight * 0.8);
  });

  test("scroll is responsive immediately after navigation", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(INITIAL_LOAD_MS);

    await page.goto("/private-dining");
    await page.waitForTimeout(TRANSITION_MS);

    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(LENIS_SETTLE_MS);

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(100);
  });

  test("scroll stays healthy across multiple sequential navigations", async ({ page }) => {
    const routes = ["/", "/vibes", "/private-dining"];

    await page.goto(routes[0]);
    await page.waitForTimeout(INITIAL_LOAD_MS);

    for (let i = 1; i < routes.length; i++) {
      await page.mouse.wheel(0, 600);
      await page.waitForTimeout(LENIS_SETTLE_MS);

      await page.goto(routes[i]);
      await page.waitForTimeout(TRANSITION_MS);

      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBe(0);
    }

    // Confirm scroll still works on the final page
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(LENIS_SETTLE_MS);
    const finalScroll = await page.evaluate(() => window.scrollY);
    expect(finalScroll).toBeGreaterThan(100);
  });

});
