import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields, jwtClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  ...(process.env.NEXT_PUBLIC_BETTER_AUTH_URL && {
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  }),

  plugins: [
    jwtClient(),
    inferAdditionalFields({
      user: { bio: { type: "string", required: false } },
    }),
  ]
})