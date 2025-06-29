import { describe, expect, it } from "vitest";

import { assertCan, can, ForbiddenError, visibleSpaces } from "@/lib/auth/permissions";
import type { Action, SpaceAccessRecord } from "@/lib/auth/types";
import { spaces } from "@/lib/data/sandbox";

import { makeSession } from "../helpers";

const juniper = spaces.find((space) => space.id === "spc_juniper")!;
const halden = spaces.find((space) => space.id === "spc_halden")!;
const mesa = spaces.find((space) => space.id === "spc_mesa")!;

const ALL_ACTIONS: Action[] = [
  "space:view",
  "space:manage",
  "card:comment",
  "card:edit",
  "card:approve",
  "time:view",
  "doc:edit",
];

describe("client guests", () => {
  const guest = makeSession("usr_juniper_guest", "guest");

  it("can open only the space they were invited to", () => {
    expect(visibleSpaces(guest, spaces).map((space) => space.id)).toEqual(["spc_juniper"]);
  });

  it.each(ALL_ACTIONS)("is denied %s in another client's space", (action) => {
    expect(can(guest, action, halden)).toBe(false);
  });

  it.each(ALL_ACTIONS)("is denied %s in a private studio space", (action) => {
    expect(can(guest, action, mesa)).toBe(false);
  });

  it("can view, comment and approve as a commenter", () => {
    expect(can(guest, "space:view", juniper)).toBe(true);
    expect(can(guest, "card:comment", juniper)).toBe(true);
    expect(can(guest, "card:approve", juniper)).toBe(true);
  });

  it("cannot edit cards or docs as a commenter", () => {
    expect(can(guest, "card:edit", juniper)).toBe(false);
    expect(can(guest, "doc:edit", juniper)).toBe(false);
  });

  it("never sees internal time, even with the editor role", () => {
    const space: SpaceAccessRecord = { ...juniper, members: { usr_juniper_guest: "editor" } };
    expect(can(guest, "card:edit", space)).toBe(true);
    expect(can(guest, "time:view", space)).toBe(false);
    expect(can(guest, "space:manage", space)).toBe(false);
  });
});

describe("team members", () => {
  const maya = makeSession("usr_maya", "member");
  const priya = makeSession("usr_priya", "member");

  it("see every studio space but not private ones they are not in", () => {
    expect(visibleSpaces(maya, spaces).map((space) => space.id)).toEqual([
      "spc_juniper",
      "spc_halden",
    ]);
  });

  it("see private spaces they are a member of", () => {
    expect(can(priya, "space:view", mesa)).toBe(true);
    expect(can(priya, "time:view", mesa)).toBe(true);
  });

  it("can work in studio spaces but not manage them", () => {
    expect(can(maya, "card:edit", juniper)).toBe(true);
    expect(can(maya, "time:view", juniper)).toBe(true);
    expect(can(maya, "space:manage", juniper)).toBe(false);
  });
});

describe("owners and admins", () => {
  it("can manage every space in their workspace, private ones included", () => {
    const dana = makeSession("usr_dana", "owner");
    for (const space of spaces) expect(can(dana, "space:manage", space)).toBe(true);
  });
});

describe("workspace isolation", () => {
  it.each(["owner", "admin", "member", "guest"] as const)(
    "blocks a %s from another workspace",
    (role) => {
      const outsider = makeSession("usr_juniper_guest", role, { workspaceId: "ws_other" });
      for (const space of spaces) expect(can(outsider, "space:view", space)).toBe(false);
    },
  );
});

describe("assertCan", () => {
  it("throws a ForbiddenError naming the action", () => {
    const guest = makeSession("usr_halden_guest", "guest");
    expect(() => assertCan(guest, "space:view", juniper)).toThrow(ForbiddenError);
    expect(() => assertCan(guest, "space:view", halden)).not.toThrow();
  });
});
