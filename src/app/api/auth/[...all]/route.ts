import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/src/app/lib/auth";

// All Better Auth endpoints (/api/auth/*): sign in, sign up, session, jwks, delete-user ...
export const { POST, GET } = toNextJsHandler(auth);
