import { NextResponse } from "next/server";

import { apiError } from "@/lib/api";
import { recordAudit } from "@/lib/audit";
import { cards, sprints, WORKSPACE_ID } from "@/lib/data/sandbox";
import { closeSprint, type SprintCard } from "@/lib/sprints/rollover";

/**
 * Scheduled hourly. Closes every sprint whose end date has passed and rolls unfinished cards
 * into the next sprint of the same space.
 */
export async function POST(request: Request) {
  if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return apiError(401, "unauthorized", "Invalid cron secret");
  }

  const now = Date.now();
  const due = sprints.filter((sprint) => !sprint.closedAt && Date.parse(sprint.endsAt) <= now);
  const results = [];

  for (const sprint of due) {
    const next = sprints
      .filter(
        (candidate) => candidate.spaceId === sprint.spaceId && candidate.number > sprint.number,
      )
      .sort((a, b) => a.number - b.number)[0];
    if (!next) continue;

    const sprintCards: SprintCard[] = cards
      .filter((card) => card.spaceId === sprint.spaceId)
      .map((card) => ({ id: card.id, status: card.status, sprintId: sprint.id, rollovers: 0 }));

    const result = closeSprint(sprintCards, sprint.id, next.id);
    sprint.closedAt = new Date(now).toISOString();
    recordAudit({
      workspaceId: WORKSPACE_ID,
      actorId: "system",
      action: "sprint.closed",
      targetType: "sprint",
      targetId: sprint.id,
      metadata: { done: result.done.length, rolledOver: result.rolledOver.length },
    });
    results.push({
      sprintId: sprint.id,
      nextSprintId: next.id,
      done: result.done.length,
      rolledOver: result.rolledOver.length,
      cancelled: result.cancelled.length,
    });
  }

  return NextResponse.json({ closed: results });
}
