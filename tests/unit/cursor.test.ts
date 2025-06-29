import { describe, expect, it } from "vitest";

import { decodeCursor, encodeCursor, paginate, type Page } from "@/lib/board/cursor";

const cards = Array.from({ length: 7 }, (_, index) => ({
  id: `crd_${index}`,
  position: (index + 1) * 1024,
}));

describe("cursor encoding", () => {
  it("round-trips a key", () => {
    expect(decodeCursor(encodeCursor({ position: 2048, id: "crd_1" }))).toEqual({
      position: 2048,
      id: "crd_1",
    });
  });

  it("returns null for garbage instead of throwing", () => {
    expect(decodeCursor("%%%")).toBeNull();
    expect(decodeCursor(Buffer.from("no-separator").toString("base64url"))).toBeNull();
    expect(decodeCursor(null)).toBeNull();
  });
});

describe("paginate", () => {
  it("walks every card exactly once across pages", () => {
    const seen: string[] = [];
    let cursor: string | null = null;
    do {
      const page: Page<(typeof cards)[number]> = paginate(cards, cursor, 3);
      seen.push(...page.items.map((card) => card.id));
      cursor = page.nextCursor;
    } while (cursor);
    expect(seen).toEqual(cards.map((card) => card.id));
  });

  it("returns no cursor on the last page", () => {
    expect(paginate(cards, null, 10).nextCursor).toBeNull();
  });

  it("breaks position ties by id so pages never overlap", () => {
    const tied = [
      { id: "b", position: 1 },
      { id: "a", position: 1 },
      { id: "c", position: 1 },
    ];
    const first = paginate(tied, null, 2);
    const second = paginate(tied, first.nextCursor, 2);
    expect([...first.items, ...second.items].map((card) => card.id)).toEqual(["a", "b", "c"]);
  });

  it("keeps later pages stable when a card is inserted above the cursor", () => {
    const first = paginate(cards, null, 3);
    const withInsert = [{ id: "crd_new", position: 512 }, ...cards];
    expect(paginate(withInsert, first.nextCursor, 3).items.map((card) => card.id)).toEqual([
      "crd_3",
      "crd_4",
      "crd_5",
    ]);
  });
});
