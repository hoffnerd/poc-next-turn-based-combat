"use client";

// Types ----------------------------------------------------------------------------
import { type ReactNode } from "react";
// Packages -------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import ConvexClientProvider from "./ConvexClientProvider";
import Client from "../Client";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====
export default function Providers({ children }: { children: ReactNode }) {
    
    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <ConvexClientProvider>
            <Client />
            {children}
        </ConvexClientProvider>
    );
}
