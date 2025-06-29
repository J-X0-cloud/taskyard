import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", heading: "Client work, handled start to finish" },
  { path: "/spaces", heading: "Give every client a space of their own" },
  { path: "/sprints", heading: "Plan delivery around your client’s calendar" },
  { path: "/docs", heading: "Docs that stay attached to the work" },
];

for (const { path, heading } of pages) {
  test(`${path} renders its hero and marks the current nav item`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
    await expect(page.getByRole("img", { name: "Taskyard product interface" })).toBeVisible();
  });
}

test("FAQ keeps one answer open at a time", async ({ page }) => {
  await page.goto("/");
  const first = page.locator(".faq details").nth(0);
  const second = page.locator(".faq details").nth(1);

  await first.locator("summary").click();
  await expect(first).toHaveAttribute("open", "");
  await second.locator("summary").click();
  await expect(second).toHaveAttribute("open", "");
  await expect(first).not.toHaveAttribute("open", "");
});

test("pricing link scrolls to the Studio plan", async ({ page, isMobile }) => {
  test.skip(isMobile, "Primary nav is collapsed into the menu on phones");
  await page.goto("/spaces");
  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "Pricing" })
    .click();
  await expect(page).toHaveURL(/\/#pricing$/);
  await expect(page.getByText("per team seat / month, billed annually")).toBeInViewport();
});

test("mobile menu opens without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await page.getByLabel("Open menu").click();
  await expect(
    page.locator(".ty-menu__panel").getByRole("link", { name: "Sprints" }),
  ).toBeVisible();
  await context.close();
});
