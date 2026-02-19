
"use client";

import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export default function PortalLayout({ children }) {
    return (
        <div className={`${inter.variable} ${playfair.variable} font-sans bg-bg min-h-screen text-text`}>
            {children}
        </div>
    );
}
