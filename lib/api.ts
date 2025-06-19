import { NextResponse } from "next/server";
import type { ZodError } from "zod";

import { sessionFromRequest } from "@/lib/auth/session";
import type { Session } from "@/lib/auth/types";

export function apiError(status: number, code: string, message: string, details?: unknown) {
  return NextResponse.json({ error: { code, message, details } }, { status });
}

export const unauthorized = () => apiError(401, "unauthorized", "Sign in to continue");

export function validationError(error: ZodError) {
  return apiError(422, "validation_failed", "The request is invalid.", error.flatten());
}

export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return undefined;
  }
}

type Handler<C> = (request: Request, session: Session, context: C) => Promise<Response>;

/** Wraps a route handler so it only runs with a valid session. */
export function withSession<C>(handler: Handler<C>) {
  return async (request: Request, context: C): Promise<Response> => {
    const session = sessionFromRequest(request);
    if (!session) return unauthorized();
    return handler(request, session, context);
  };
}
