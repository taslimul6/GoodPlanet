import { API_URL } from "@/lib/apiClient";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

/**
 * fetch() to the Express API from a server component, signed with the user's JWT.
 * Responses are never cached because they depend on who is logged in.
 */
export async function apiServer(path: string, init: RequestInit = {}) {
  const token = await getTokenFromServer();

  return fetch(`${API_URL}${path}`, {
    cache: "no-store",
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...init.headers },
  });
}

/**
 * While Next.js prerenders a page, a request that needs the logged-in user is stopped
 * on purpose and rejected with this digest. It is not a real error: code that catches
 * request errors must let it through.
 */
export const isPrerenderAbort = (err: unknown) =>
  (err as { digest?: string } | null)?.digest === "HANGING_PROMISE_REJECTION";
