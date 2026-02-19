import "./globals.css";

export const metadata = {
    title: "Vivaaham — Indian Wedding Management Platform | Every Ritual, Every Guest, Every Detail",
    description:
        "Vivaaham is India's smartest wedding management platform. From mehendi to vidaai, manage guests, vendors, venues, budgets, and every ritual — all in one place.",
    keywords:
        "Indian wedding planner, wedding management software, wedding RSVP, venue management, vendor management, wedding budget tracker, shaadi planner",
    openGraph: {
        title: "Vivaaham — India's Smartest Wedding Management Platform",
        description:
            "From mehendi to vidaai, manage every detail of your Big Fat Indian Wedding. Guests, vendors, venues, budgets — all in one place.",
        type: "website",
        url: "https://vivaaham.in",
    },
};

export const viewport = {
    themeColor: "#E91E63",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false, // Often desired for app-like feel
};

import { Providers } from "./providers";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
                    rel="stylesheet"
                />
                <link rel="icon" type="image/png" href="/logo.png" />
            </head>
            <body className="antialiased">
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
