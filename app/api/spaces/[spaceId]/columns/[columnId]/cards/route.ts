import { NextResponse } from "next/server";
import { z } from "zod";

import { apiError, validationError, withSession } from "@/lib/api";
import { listColumnCards, SpaceNotFoundError } from "@/lib/board/card-service";

const querySchema = z.object({
  cursor: z.string().max(200).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});

interface Context {
  params: Promise<{ spaceId: string; columnId: string }>;
}

/**
 * GET /api/spaces/:spaceId/columns/:columnId/cards?cursor=…&limit=25
 * One page of a board column. The board renders the first page of every column right away
 * and requests further pages as each column scrolls.
 */
export const GET = withSession<Context>(async (request, session, { params }) => {
  const { spaceId, columnId } = await params;
  const parsed = querySchema.safeParse(Object.fromEntries(new URL(request.url).searchParams));
  if (!parsed.success) return validationError(parsed.error);

  try {
    const page = listColumnCards(session, { spaceId, columnId, ...parsed.data });
    return NextResponse.json(page, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    if (error instanceof SpaceNotFoundError) return apiError(404, "not_found", error.message);
    throw error;
  }
});
