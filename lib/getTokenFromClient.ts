import { authClient } from "@/src/app/lib/auth-client";

/** JWT for the logged-in user (browser side). Undefined when nobody is logged in. */
export const getTokenFromClient = async () => {
  const { data } = await authClient.token();
  return data?.token;
};
