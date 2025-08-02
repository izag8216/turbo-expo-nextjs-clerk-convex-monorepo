"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ErrorBoundary } from "./ErrorBoundary";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "https://placeholder.convex.cloud");

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ErrorBoundary>
      <ConvexAuthProvider client={convex}>
        {children}
      </ConvexAuthProvider>
    </ErrorBoundary>
  );
}
