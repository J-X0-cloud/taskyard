import { NextResponse } from "next/server";
import { z } from "zod";

import { apiError, readJson, validationError, withSession } from "@/lib/api";
import { recordAudit } from "@/lib/audit";
import { can } from "@/lib/auth/permissions";
import { cards, spaces } from "@/lib/data/sandbox";

const bodySchema = z.object({
  decision: z.enum(["approved", "changes_requested"]),
  note: z.string().trim().max(2000).optional(),
});

interface Context {
  params: Promise<{ cardId: string }>;
}

/** POST /api/cards/:cardId/approval — a client or teammate signs off (or pushes back) on a card. */
export const POST = withSession<Context>(async (request, session, { params }) => {
  const { cardId } = await params;
  const parsed = bodySchema.safeParse(await readJson(request));
  if (!parsed.success) return validationError(parsed.error);

  const card = cards.find((candidate) => candidate.id === cardId);
  const space = card ? spaces.find((candidate) => candidate.id === card.spaceId) : undefined;
  // Same response for "missing" and "not yours", so card ids can't be enumerated.
  if (!card || !space || !can(session, "space:view", space)) {
    return apiError(404, "not_found", `Card ${cardId} was not found`);
  }
  if (!can(session, "card:approve", space)) {
    return apiError(403, "forbidden", "Your role in this space can't approve work");
  }

  const entry = recordAudit({
    workspaceId: session.workspaceId,
    actorId: session.userId,
    action: `card.${parsed.data.decision}`,
    targetType: "card",
    targetId: card.id,
    metadata: parsed.data.note ? { note: parsed.data.note } : undefined,
  });

  return NextResponse.json(
    { cardId: card.id, decision: parsed.data.decision, by: session.userId, at: entry.at },
    { status: 201 },
  );
});
