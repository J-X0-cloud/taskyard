import { expect, test } from "@playwright/test";

import { issueSession } from "../lib/auth/session";
import { WORKSPACE_ID } from "../lib/data/sandbox";

/**
 * Runs against the real server: the same checks as the unit suite, but through routing,
 * cookies and serialisation, so a misconfigured handler can't slip past.
 */
function cookieFor(userId: string, role: "member" | "guest") {
  process.env.SESSION_SECRET ??= "e2e-secret-0123456789abcdef0123456789";
  const { token } = issueSession({ userId, role, workspaceId: WORKSPACE_ID, mfa: true });
  return { cookie: `ty_session=${token}` };
}

test.describe("client guest isolation", () => {
  test("a guest cannot list or open another client's board", async ({ request }) => {
    const headers = cookieFor("usr_halden_guest", "guest");

    const spaces = await request.get("/api/spaces", { headers });
    expect(spaces.ok()).toBeTruthy();
    expect((await spaces.json()).data.map((space: { id: string }) => space.id)).toEqual([
      "spc_halden",
    ]);

    const cards = await request.get("/api/spaces/spc_juniper/columns/brief/cards", { headers });
    expect(cards.status()).toBe(404);
  });

  test("a guest cannot approve work outside their space", async ({ request }) => {
    const response = await request.post("/api/cards/crd_brief_001/approval", {
      headers: cookieFor("usr_halden_guest", "guest"),
      data: { decision: "approved" },
    });
    expect(response.status()).toBe(404);
  });

  test("a guest can approve work in their own space", async ({ request }) => {
    const response = await request.post("/api/cards/crd_brief_001/approval", {
      headers: cookieFor("usr_juniper_guest", "guest"),
      data: { decision: "approved", note: "Looks great" },
    });
    expect(response.status()).toBe(201);
  });

  test("anonymous requests are rejected", async ({ request }) => {
    expect((await request.get("/api/spaces")).status()).toBe(401);
  });
});
