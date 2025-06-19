/**
 * Keyset pagination for board columns. Cards are ordered by (position, id); the cursor is the
 * last pair the client received. Unlike OFFSET, pages stay stable while cards are inserted
 * above the fold, and the database walks an index instead of counting skipped rows.
 */

export interface CardKey {
  position: number;
  id: string;
}

export function encodeCursor(key: CardKey): string {
  return Buffer.from(`${key.position}:${key.id}`).toString("base64url");
}

export function decodeCursor(cursor: string | null | undefined): CardKey | null {
  if (!cursor) return null;
  const raw = Buffer.from(cursor, "base64url").toString("utf8");
  const separator = raw.indexOf(":");
  if (separator < 1) return null;
  const position = Number(raw.slice(0, separator));
  const id = raw.slice(separator + 1);
  return Number.isFinite(position) && id ? { position, id } : null;
}

export function isAfter(card: CardKey, cursor: CardKey): boolean {
  return (
    card.position > cursor.position || (card.position === cursor.position && card.id > cursor.id)
  );
}

export function compareKeys(a: CardKey, b: CardKey): number {
  return a.position - b.position || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
}

export interface Page<T> {
  items: T[];
  nextCursor: string | null;
}

/** Applies a cursor and limit to an already-filtered list (the in-memory twin of the SQL query). */
export function paginate<T extends CardKey>(
  items: T[],
  cursor: string | null | undefined,
  limit: number,
): Page<T> {
  const after = decodeCursor(cursor);
  const ordered = [...items].sort(compareKeys);
  const remaining = after ? ordered.filter((item) => isAfter(item, after)) : ordered;
  const page = remaining.slice(0, limit);
  const last = page.at(-1);
  return {
    items: page,
    nextCursor: remaining.length > limit && last ? encodeCursor(last) : null,
  };
}
