import { getTokenFromClient } from "@/lib/getTokenFromClient";

/** Base URL of the Express API (no trailing slash). */
export const API_URL = process.env.NEXT_PUBLIC_MAIN_API ?? "";

type ApiOptions = Omit<RequestInit, "body"> & {
  /** Sent as the JSON request body. */
  json?: unknown;
};

/**
 * fetch() to the Express API from the browser, signed with the user's JWT.
 * The server reads the user's identity from the token, so nothing else is needed.
 */
export async function api(path: string, { json, headers, ...init }: ApiOptions = {}) {
  const token = await getTokenFromClient();

  return fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      ...(json !== undefined && { "Content-Type": "application/json" }),
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    body: json === undefined ? undefined : JSON.stringify(json),
  });
}
