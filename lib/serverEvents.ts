import { headers } from "next/headers";

import { Event } from "@/lib/event";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { auth } from "@/src/app/lib/auth";

/**
 * Server-side loader shared by the dashboard pages
 * (`/myEvents` = events I created, `/bookedEvents` = events I joined).
 * `failed` lets the page show an error state instead of a misleading empty one.
 */
export async function fetchUserEvents(
  path: "/myEvents" | "/bookedEvents"
): Promise<{ events: Event[]; failed: boolean }> {
  try {
    // session + token are independent, so run them in parallel
    const [session, token] = await Promise.all([
      auth.api.getSession({ headers: await headers() }),
      getTokenFromServer(),
    ]);

    const email = session?.user?.email;
    if (!email) return { events: [], failed: true };

    const response = await fetch(`${process.env.NEXT_PUBLIC_MAIN_API}${path}`, {
      cache: "no-store",
      headers: { query: email, Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();
    const list = Array.isArray(data) ? data : (data?.data ?? data?.events ?? []);

    return { events: Array.isArray(list) ? list : [], failed: false };
  } catch (error) {
    console.error(`Failed to fetch ${path}:`, error);
    return { events: [], failed: true };
  }
}
