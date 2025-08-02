export { useAuthActions, useAuthToken } from "@convex-dev/auth/react";
export type { User } from "./types";

import { useQuery } from "convex/react";
import { useAuthToken } from "@convex-dev/auth/react";
import { api } from "@packages/backend/convex/_generated/api";

export function useCurrentUser() {
  const token = useAuthToken();
  const user = useQuery(api.users.getCurrentUser, token ? {} : "skip");
  return user;
}
