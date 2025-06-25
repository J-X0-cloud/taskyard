import { NextResponse } from "next/server";

import { withSession } from "@/lib/api";
import { can, visibleSpaces } from "@/lib/auth/permissions";
import { spaces } from "@/lib/data/sandbox";

/** GET /api/spaces — the spaces this session may open. Guests see only their own. */
export const GET = withSession(async (_request, session) => {
  const data = visibleSpaces(session, spaces).map((space) => ({
    id: space.id,
    name: space.name,
    color: space.color,
    visibility: space.visibility,
    canManage: can(session, "space:manage", space),
  }));
  return NextResponse.json({ data });
});
