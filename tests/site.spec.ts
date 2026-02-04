import { test, expect } from "@playwright/test";

test("home loads and has primary actions", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Pawdate Stockholm" })).toBeVisible();
  await expect(page.locator('a[href="/dogs"]:has-text("Dogs")').first()).toBeVisible();
});

test("dogs list loads", async ({ page }) => {
  await page.goto("/dogs");
  await expect(page.getByRole("heading", { name: "Dogs" })).toBeVisible();
});

test("create dog profile flow", async ({ page }) => {
  await page.goto("/dogs/new");
  await expect(page.getByRole("heading", { name: "Create dog profile" })).toBeVisible();

  await page.getByLabel("Dog name").fill("TestDog");
  await page.getByLabel("Short bio").fill("QA dog");
  await page.getByRole("button", { name: "Create" }).click();

  // After submit, the server action returns void (no redirect). Go to list.
  await page.goto("/dogs");
  await expect(page.getByRole("heading", { name: "TestDog" }).first()).toBeVisible();
});

test("static pages load", async ({ page }) => {
  for (const path of ["/about", "/safety", "/privacy", "/terms", "/contact"]) {
    await page.goto(path);
    await expect(page.locator("body")).toContainText(/./);
  }
});
