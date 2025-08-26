
// Types ----------------------------------------------------------------------------
import type { Metadata } from "next";
// Packages -------------------------------------------------------------------------
import { Geist, Geist_Mono } from "next/font/google";
// Data -----------------------------------------------------------------------------
// Server ---------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------
import "../styles/globals.css";
import Providers from "@/components/providers/Providers";



//______________________________________________________________________________________
// ===== Constants =====

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});



//______________________________________________________________________________________
// ===== Meta Data =====

export const metadata: Metadata = {
    title: "POC: Turn Based Combat",
    description: "Proof of Concept: Turn Based Combat on the web",
};



//______________________________________________________________________________________
// ===== Component =====

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}

