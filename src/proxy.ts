import { NextRequest, NextResponse } from "next/server";

import { auth } from "./app/lib/auth";

/**
 * Route protection (runs before the matched pages, see `config.matcher`).
 * - logged-in users do not need /login or /signup, so they are sent home
 * - guests cannot open /profile or anything below /events/ (details, add, edit, manage, joined, saved)
 * The public list at /events is deliberately not matched, so guests can browse it.
 */
export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  const isLoggedIn = Boolean(session?.user);
  const { pathname } = request.nextUrl;

  if (isLoggedIn && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isLoggedIn && (pathname.startsWith("/events/") || pathname === "/profile")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/events/:path+", "/profile"],
};
