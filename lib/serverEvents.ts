import { Event } from "@/lib/event";
import { apiServer, isPrerenderAbort } from "@/lib/apiServer";

/**
 * Server-side loader shared by the dashboard pages
 * (`/myEvents` = events I created, `/bookedEvents` = events I joined).
 * `failed` lets the page show an error state instead of a misleading empty one.
 */
export async function fetchUserEvents(
  path: "/myEvents" | "/bookedEvents"
): Promise<{ events: Event[]; failed: boolean }> {
  try {
    // The server reads the user from the token, so the request needs nothing else.
    const response = await apiServer(path);

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();
    const list = Array.isArray(data) ? data : (data?.data ?? data?.events ?? []);

    return { events: Array.isArray(list) ? list : [], failed: false };
  } catch (error) {
    if (isPrerenderAbort(error)) throw error;
    console.error(`Failed to fetch ${path}:`, error);
    return { events: [], failed: true };
  }
}
