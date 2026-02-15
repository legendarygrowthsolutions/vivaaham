"use client";
import { MOCK_ACTIVITY } from "@/lib/mockData";
import { Activity, Search, Filter } from "lucide-react";
import { useState } from "react";

export default function ActivityPage() {
    const [search, setSearch] = useState("");
    const filtered = MOCK_ACTIVITY.filter((a) =>
        search ? (a.user + a.action + a.target).toLowerCase().includes(search.toLowerCase()) : true
    );

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div>
                <h2 className="font-heading text-xl font-semibold flex items-center gap-2"><Activity size={22} className="text-primary" /> Activity Log</h2>
                <p className="text-sm text-text-muted mt-0.5">Track who changed what and when — full audit trail</p>
            </div>
            <div className="relative max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search activity..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
            </div>
            <div className="bg-bg-card rounded-xl border border-border-light p-5">
                <div className="space-y-4">
                    {filtered.map((act) => (
                        <div key={act.id} className="flex items-start gap-3 p-4 bg-bg-alt rounded-lg border border-border-light">
                            <div className="w-9 h-9 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-sm shrink-0">
                                {act.user.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm"><strong>{act.user}</strong> {act.action} <strong>{act.target}</strong></p>
                                <span className="text-xs text-text-light">{act.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
                {filtered.length === 0 && <p className="text-center text-text-muted text-sm py-8">No activity matching your search.</p>}
            </div>
        </div>
    );
}
