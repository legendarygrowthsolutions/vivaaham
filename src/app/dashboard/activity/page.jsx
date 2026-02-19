
"use client";
import { useActivity } from "@/hooks/useActivity";
import { Activity, Search, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

export default function ActivityPage() {
    const { logs, loading, fetchLogs } = useActivity();
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    const filtered = logs.filter((a) =>
        search ? (
            (a.user_name || "") +
            (a.action || "") +
            (a.entity_type || "") +
            (a.entity_name || "")
        ).toLowerCase().includes(search.toLowerCase()) : true
    );

    // Helper to format text
    const formatAction = (act) => {
        return (
            <span>
                <strong>{act.user_name}</strong> {act.action} {act.entity_type} <strong>{act.entity_name}</strong>
            </span>
        );
    };

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                        <Activity size={22} className="text-primary" /> Activity Log
                    </h2>
                    <p className="text-sm text-text-muted mt-0.5">Track real-time changes and audit trail</p>
                </div>
                <button
                    onClick={fetchLogs}
                    disabled={loading}
                    className="p-2 hover:bg-bg-alt rounded-lg text-primary transition-colors"
                    title="Refresh Logs"
                >
                    <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            <div className="relative max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search activity..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
            </div>

            <div className="bg-bg-card rounded-xl border border-border-light p-5">
                <div className="space-y-4">
                    {loading && logs.length === 0 ? (
                        <div className="text-center py-8 text-text-muted">Loading activity...</div>
                    ) : filtered.length > 0 ? (
                        filtered.map((act) => (
                            <div key={act.id} className="flex items-start gap-3 p-4 bg-bg-alt rounded-lg border border-border-light animate-[fadeIn_0.2s_ease]">
                                <div className="w-9 h-9 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-sm shrink-0 uppercase">
                                    {(act.user_name || "U").charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm">{formatAction(act)}</p>
                                    <span className="text-xs text-text-light">
                                        {formatDistanceToNow(new Date(act.created_at), { addSuffix: true })}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-text-muted">
                            {search ? "No matching activity found." : "No recent activity recorded."}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

