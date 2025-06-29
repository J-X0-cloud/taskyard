import { describe, expect, it } from "vitest";

import { GET as listCards } from "@/app/api/spaces/[spaceId]/columns/[columnId]/cards/route";
import { GET as listSpaces } from "@/app/api/spaces/route";

import { authedRequest } from "../helpers";

const context = (spaceId: string, columnId: string) => ({
  params: Promise.resolve({ spaceId, columnId }),
});

async function fetchCards(
  url: string,
  userId: string,
  role: "member" | "guest",
  spaceId = "spc_juniper",
) {
  const response = await listCards(authedRequest(url, userId, role), context(spaceId, "brief"));
  return { status: response.status, body: await response.json() };
}

describe("GET /api/spaces", () => {
  it("rejects requests without a session", async () => {
    const response = await listSpaces(new Request("http://localhost:3000/api/spaces"), undefined);
    expect(response.status).toBe(401);
  });

  it("lists only the guest's own space", async () => {
    const response = await listSpaces(
      authedRequest("/api/spaces", "usr_halden_guest", "guest"),
      undefined,
    );
    const body = await response.json();
    expect(body.data.map((space: { id: string }) => space.id)).toEqual(["spc_halden"]);
  });
});

describe("GET /api/spaces/:id/columns/:column/cards", () => {
  it("pages through a 60-card column 25 at a time", async () => {
    const ids: string[] = [];
    let url = "/api/spaces/spc_juniper/columns/brief/cards?limit=25";
    let pages = 0;
    for (;;) {
      const { status, body } = await fetchCards(url, "usr_maya", "member");
      expect(status).toBe(200);
      ids.push(...body.items.map((card: { id: string }) => card.id));
      pages++;
      if (!body.nextCursor) break;
      url = `/api/spaces/spc_juniper/columns/brief/cards?limit=25&cursor=${body.nextCursor}`;
    }
    expect(pages).toBe(3);
    expect(new Set(ids).size).toBe(60);
  });

  it("shows estimates and hours to the team", async () => {
    const { body } = await fetchCards(
      "/api/spaces/spc_juniper/columns/brief/cards",
      "usr_maya",
      "member",
    );
    expect(body.items[0]).toHaveProperty("estimateHours");
  });

  it("hides estimates and hours from client guests", async () => {
    const { status, body } = await fetchCards(
      "/api/spaces/spc_juniper/columns/brief/cards",
      "usr_juniper_guest",
      "guest",
    );
    expect(status).toBe(200);
    expect(body.items[0]).not.toHaveProperty("estimateHours");
    expect(body.items[0]).not.toHaveProperty("loggedHours");
  });

  it("answers 404, not 403, when a guest probes another client's space", async () => {
    const { status } = await fetchCards(
      "/api/spaces/spc_juniper/columns/brief/cards",
      "usr_halden_guest",
      "guest",
    );
    expect(status).toBe(404);
  });

  it("validates the page size", async () => {
    const { status } = await fetchCards(
      "/api/spaces/spc_juniper/columns/brief/cards?limit=500",
      "usr_maya",
      "member",
    );
    expect(status).toBe(422);
  });
});
