import { describe, expect, it } from "vitest";

import { closeSprint, type SprintCard } from "@/lib/sprints/rollover";

const card = (
  id: string,
  status: SprintCard["status"],
  sprintId: string | null = "s19",
): SprintCard => ({
  id,
  status,
  sprintId,
  rollovers: 0,
});

describe("closeSprint", () => {
  const cards = [
    card("a", "done"),
    card("b", "in_progress"),
    card("c", "client_review"),
    card("d", "cancelled"),
    card("e", "todo", "s18"),
    card("f", "todo", null),
  ];

  it("moves only unfinished cards from the closing sprint", () => {
    const result = closeSprint(cards, "s19", "s20");
    expect(result.rolledOver).toEqual(["b", "c"]);
    expect(result.done).toEqual(["a"]);
    expect(result.cancelled).toEqual(["d"]);
    expect(result.cards.find((c) => c.id === "b")).toMatchObject({ sprintId: "s20", rollovers: 1 });
  });

  it("leaves finished cards with the closed sprint for reporting", () => {
    const result = closeSprint(cards, "s19", "s20");
    expect(result.cards.find((c) => c.id === "a")?.sprintId).toBe("s19");
  });

  it("does not touch cards outside the sprint", () => {
    const result = closeSprint(cards, "s19", "s20");
    expect(result.cards.find((c) => c.id === "e")).toEqual(cards[4]);
    expect(result.cards.find((c) => c.id === "f")).toEqual(cards[5]);
  });

  it("does not mutate its input", () => {
    const snapshot = structuredClone(cards);
    closeSprint(cards, "s19", "s20");
    expect(cards).toEqual(snapshot);
  });

  it("refuses to roll a sprint into itself", () => {
    expect(() => closeSprint(cards, "s19", "s19")).toThrow();
  });
});
