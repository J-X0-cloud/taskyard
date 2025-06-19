import { can } from "@/lib/auth/permissions";
import type { Session } from "@/lib/auth/types";
import { cards, spaces, type SandboxCard } from "@/lib/data/sandbox";

import { paginate, type Page } from "./cursor";

export type PublicCard = Omit<SandboxCard, "estimateHours" | "loggedHours">;
export type InternalCard = SandboxCard;

export class SpaceNotFoundError extends Error {
  constructor(readonly spaceId: string) {
    super(`Space ${spaceId} was not found`);
    this.name = "SpaceNotFoundError";
  }
}

export interface CardPageQuery {
  spaceId: string;
  columnId: string;
  cursor?: string | null;
  limit: number;
}

/** Strips internal planning fields for sessions that may not see time and estimates. */
function present(card: SandboxCard, showTime: boolean): PublicCard | InternalCard {
  if (showTime) return card;
  const { estimateHours: _estimate, loggedHours: _logged, ...rest } = card;
  return rest;
}

/**
 * Loads one column of a board a page at a time. Callers render the first page immediately
 * and fetch the rest as the column scrolls, instead of pulling the entire board in one query.
 *
 * Returns "not found" for spaces the session cannot see, so guests can't probe for the
 * existence of other clients' spaces.
 */
export function listColumnCards(
  session: Session,
  query: CardPageQuery,
): Page<PublicCard | InternalCard> {
  const space = spaces.find((candidate) => candidate.id === query.spaceId);
  if (!space || !can(session, "space:view", space)) throw new SpaceNotFoundError(query.spaceId);

  const showTime = can(session, "time:view", space);
  const column = cards.filter(
    (card) => card.spaceId === space.id && card.columnId === query.columnId,
  );
  const page = paginate(column, query.cursor, query.limit);
  return { items: page.items.map((card) => present(card, showTime)), nextCursor: page.nextCursor };
}
