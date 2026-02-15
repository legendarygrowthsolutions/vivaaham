"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = [
        { href: "#features", label: "Platform" },
        { href: "#how-it-works", label: "How It Works" },
        { href: "#pricing", label: "Pricing" },
        { href: "#faq", label: "FAQ" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${scrolled
                    ? "bg-bg/95 backdrop-blur-xl border-border shadow-md"
                    : "bg-bg/85 backdrop-blur-md border-border-light"
                }`}
        >
            <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[72px]">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 font-heading text-[1.4rem] font-bold text-primary">
                    <svg className="w-8 h-[22px]" viewBox="0 0 40 28" fill="none">
                        <circle cx="13" cy="14" r="10" stroke="#8B1A4A" strokeWidth="2.5" fill="none" />
                        <circle cx="27" cy="14" r="10" stroke="#D4A843" strokeWidth="2.5" fill="none" />
                    </svg>
                    <span>Vivaaham</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-text-muted hover:text-primary transition-colors relative group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                        </a>
                    ))}
                </nav>

                {/* Desktop CTAs */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="/login"
                        className="px-5 py-2.5 text-sm font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                    >
                        Login
                    </Link>
                    <a
                        href="#demo"
                        className="btn-gradient px-5 py-2.5 text-sm font-semibold rounded-lg inline-flex items-center gap-2"
                    >
                        Book a Demo
                    </a>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-bg-card border-t border-border-light px-6 py-4 space-y-3 animate-[fadeInDown_0.3s_ease]">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="block py-2 text-text-muted hover:text-primary font-medium"
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="pt-3 border-t border-border-light flex flex-col gap-2">
                        <Link
                            href="/login"
                            className="text-center py-3 text-sm font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all"
                            onClick={() => setMobileOpen(false)}
                        >
                            Login
                        </Link>
                        <a
                            href="#demo"
                            className="btn-gradient text-center py-3 text-sm font-semibold rounded-lg"
                            onClick={() => setMobileOpen(false)}
                        >
                            Book a Demo
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
