import { inferAdditionalFields, jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

/**
 * Better Auth client for the browser: sessions, sign in / out, profile updates and
 * `authClient.token()`, the JWT that is sent to the Express API.
 */
export const authClient = createAuthClient({
  // set NEXT_PUBLIC_BETTER_AUTH_URL when the site is served from a different origin (e.g. Vercel)
  ...(process.env.NEXT_PUBLIC_BETTER_AUTH_URL && {
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  }),

  plugins: [
    jwtClient(),
    // teaches TypeScript about the extra `bio` field declared in auth.ts
    inferAdditionalFields({ user: { bio: { type: "string", required: false } } }),
  ],
});
