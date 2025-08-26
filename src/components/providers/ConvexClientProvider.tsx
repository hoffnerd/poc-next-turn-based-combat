"use client";

// Types ----------------------------------------------------------------------------
import type { ReactNode } from "react";
// Packages -------------------------------------------------------------------------
import { ConvexProvider, ConvexReactClient } from "convex/react";
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Constants =====
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);



//______________________________________________________________________________________
// ===== Component =====
export default function ConvexClientProvider({ children }: { children: ReactNode }) {
    return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
