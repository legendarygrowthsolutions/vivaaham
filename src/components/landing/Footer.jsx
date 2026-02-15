import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-10 border-t border-border-light bg-bg">
            <div className="max-w-[1200px] mx-auto px-6 text-center">
                <Link href="/" className="inline-flex items-center gap-2.5 font-heading text-[1.4rem] font-bold text-primary mb-3">
                    <svg className="w-8 h-[22px]" viewBox="0 0 40 28" fill="none">
                        <circle cx="13" cy="14" r="10" stroke="#8B1A4A" strokeWidth="2.5" fill="none" />
                        <circle cx="27" cy="14" r="10" stroke="#D4A843" strokeWidth="2.5" fill="none" />
                    </svg>
                    Vivaaham
                </Link>
                <p className="text-text-muted text-sm mb-2">Every Ritual, Every Guest, Every Detail — Managed.</p>
                <p className="text-text-light text-xs">
                    © 2026 Vivaaham. A product of{" "}
                    <a href="https://legendarygrowthsolutions.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-text-muted hover:text-primary transition-colors">
                        Legendary Growth Solutions
                    </a>
                </p>
            </div>
        </footer>
    );
}
