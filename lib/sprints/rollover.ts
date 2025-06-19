export type CardStatus =
  | "todo"
  | "in_progress"
  | "internal_review"
  | "client_review"
  | "done"
  | "cancelled";

export interface SprintCard {
  id: string;
  status: CardStatus;
  sprintId: string | null;
  /** How many sprints this card has been carried through. */
  rollovers: number;
}

export interface RolloverResult {
  closedSprintId: string;
  nextSprintId: string;
  done: string[];
  rolledOver: string[];
  cancelled: string[];
  cards: SprintCard[];
}

const FINISHED: ReadonlySet<CardStatus> = new Set(["done", "cancelled"]);

/**
 * Closes a sprint: finished cards stay with it for reporting, everything else moves to the
 * next sprint with its status, comments and time untouched. Cards outside the sprint are
 * returned unchanged. Pure, so it runs the same in a request, a cron job or a test.
 */
export function closeSprint(
  cards: SprintCard[],
  closingId: string,
  nextId: string,
): RolloverResult {
  if (closingId === nextId) throw new Error("A sprint cannot roll over into itself");

  const result: RolloverResult = {
    closedSprintId: closingId,
    nextSprintId: nextId,
    done: [],
    rolledOver: [],
    cancelled: [],
    cards: [],
  };

  for (const card of cards) {
    if (card.sprintId !== closingId) {
      result.cards.push(card);
      continue;
    }
    if (card.status === "done") result.done.push(card.id);
    if (card.status === "cancelled") result.cancelled.push(card.id);
    if (FINISHED.has(card.status)) {
      result.cards.push(card);
      continue;
    }
    result.rolledOver.push(card.id);
    result.cards.push({ ...card, sprintId: nextId, rollovers: card.rollovers + 1 });
  }

  return result;
}
