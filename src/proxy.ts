import { NextResponse } from "next/server";
import { auth } from "./app/lib/auth";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const user = session?.user;
  const pathname = request.nextUrl.pathname;

  // Logged-in user cannot access login or signup
  if (user && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Only logged-in users can access events routes
  if (!user && pathname.startsWith("/events")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/events/:path+"],
};