"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { EventProvider } from "@/contexts/EventContext";
import { ALL_MODULES } from "@/lib/mockData";
import {
    LayoutDashboard, Users, Building2, Handshake, UtensilsCrossed,
    Palette, IndianRupee, Plane, Gift, ListChecks, Mail, UsersRound,
    Clock, Activity, ScrollText, FileDown, LogOut, Menu, X,
    Bell, ChevronDown, Settings
} from "lucide-react";

const ICON_MAP = {
    LayoutDashboard, Users, Building2, Handshake, UtensilsCrossed,
    Palette, IndianRupee, Plane, Gift, ListChecks, Mail, UsersRound,
    Clock, Activity, ScrollText, FileDown, Settings
};

export default function DashboardLayout({ children }) {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg">
                <div className="animate-spin w-10 h-10 border-3 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!user) return null;

    // Filter modules based on user role and module access
    const visibleModules = ALL_MODULES.filter((m) => {
        if (user.role === "admin") return true;
        return user.modules?.includes(m.id);
    });

    const currentModule = pathname.replace("/dashboard", "").replace("/", "") || "dashboard";

    return (
        <EventProvider>
            <div className="min-h-screen flex bg-bg">
                {/* Sidebar Overlay (Mobile) */}
                {sidebarOpen && (
                    <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
                )}

                {/* Sidebar */}
                <aside
                    className={`fixed lg:sticky top-0 left-0 h-screen w-[260px] bg-gradient-to-b from-sidebar to-sidebar-hover text-white z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                        }`}
                >
                    {/* Logo */}
                    <div className="flex items-center justify-between px-5 py-5 border-b border-white/[0.08]">
                        <Link href="/dashboard" className="flex items-center gap-2.5 font-heading font-semibold text-[1.05rem]">
                            <svg className="w-7 h-5" viewBox="0 0 40 28" fill="none">
                                <circle cx="13" cy="14" r="10" stroke="#fff" strokeWidth="2.5" fill="none" />
                                <circle cx="27" cy="14" r="10" stroke="#D4A843" strokeWidth="2.5" fill="none" />
                            </svg>
                            Vivaaham
                        </Link>
                        <button className="lg:hidden text-white/60 hover:text-white" onClick={() => setSidebarOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
                        {visibleModules.map((mod) => {
                            const Icon = ICON_MAP[mod.icon] || LayoutDashboard;
                            const href = mod.id === "dashboard" ? "/dashboard" : `/dashboard/${mod.id}`;
                            const active = currentModule === mod.id || (mod.id === "dashboard" && currentModule === "");
                            return (
                                <Link
                                    key={mod.id}
                                    href={href}
                                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-[0.82rem] font-medium transition-all ${active
                                        ? "text-white bg-accent/15 font-semibold"
                                        : "text-white/55 hover:text-white/85 hover:bg-white/[0.06]"
                                        }`}
                                >
                                    <Icon size={18} className="shrink-0" />
                                    {mod.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Card */}
                    <div className="p-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-sm shrink-0">
                                {user.name?.charAt(0)}
                            </div>
                            <div className="min-w-0">
                                <div className="text-sm font-medium text-white truncate">{user.name}</div>
                                <div className="text-xs text-white/40 capitalize">{user.role}</div>
                            </div>
                        </div>
                        <button
                            onClick={() => { logout(); router.push("/"); }}
                            className="p-2 text-white/60 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
                            title="Sign Out"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </aside>

                {/* Main Area */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Top Bar */}
                    <header className="sticky top-0 z-30 bg-bg/95 backdrop-blur-xl border-b border-border-light px-5 py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                className="lg:hidden p-2 text-text-muted hover:text-text"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <Menu size={22} />
                            </button>
                            <div>
                                <h1 className="font-heading text-lg font-semibold">
                                    Welcome, {user.name?.split(" ")[0]} 👋
                                </h1>
                                <p className="text-xs text-text-muted">
                                    The wedding of <strong>{user.brideName || "—"}</strong> & <strong>{user.groomName || "—"}</strong>
                                </p>
                            </div>
                        </div>
                        <div className="flex-1" />
                        <div className="flex items-center gap-3">
                            <button className="relative p-2 text-text-muted hover:text-text rounded-lg hover:bg-bg-alt transition-colors">
                                <Bell size={20} />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
                            </button>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 p-5 lg:p-7">
                        {children}
                    </main>
                </div>
            </div>
        </EventProvider>
    );
}
