import { headers } from "next/headers";

import { auth } from "@/src/app/lib/auth";

/** JWT for the logged-in user (server components and route handlers). */
export const getTokenFromServer = async () => {
  const jwt = await auth.api.getToken({ headers: await headers() });
  return jwt?.token;
};
