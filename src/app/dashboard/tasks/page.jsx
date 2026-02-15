"use client";
import { MOCK_TASKS } from "@/lib/mockData";
import { ListChecks, Plus, CheckCircle, AlertCircle, Clock, Circle } from "lucide-react";

export default function TasksPage() {
    const statusIcon = (s) => {
        const map = { done: <CheckCircle size={16} className="text-success" />, overdue: <AlertCircle size={16} className="text-danger" />, in_progress: <Clock size={16} className="text-accent" />, pending: <Circle size={16} className="text-text-muted" /> };
        return map[s];
    };
    const priorityBadge = (p) => {
        const map = { high: "bg-danger/[0.08] text-danger", medium: "bg-accent/[0.12] text-[#8B7724]", low: "bg-info/[0.08] text-info" };
        return <span className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${map[p]}`}>{p}</span>;
    };

    const done = MOCK_TASKS.filter((t) => t.status === "done").length;
    const total = MOCK_TASKS.length;

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="font-heading text-xl font-semibold flex items-center gap-2"><ListChecks size={22} className="text-primary" /> Tasks & Checklist</h2>
                    <p className="text-sm text-text-muted mt-0.5">{done}/{total} tasks completed</p>
                </div>
                <button className="btn-gradient px-5 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 self-start"><Plus size={16} /> Add Task</button>
            </div>
            <div className="bg-bg-card rounded-xl border border-border-light p-5">
                <div className="h-2.5 bg-bg-alt rounded-full overflow-hidden mb-6">
                    <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all" style={{ width: `${(done / total) * 100}%` }} />
                </div>
                <div className="space-y-2">
                    {MOCK_TASKS.map((t) => (
                        <div key={t.id} className={`flex items-center gap-3 p-3.5 rounded-lg border transition-colors ${t.status === "overdue" ? "bg-danger/[0.03] border-danger/10" : t.status === "done" ? "bg-bg-alt border-border-light opacity-70" : "bg-bg border-border-light hover:bg-bg-alt"
                            }`}>
                            {statusIcon(t.status)}
                            <div className="flex-1 min-w-0">
                                <span className={`text-sm font-medium ${t.status === "done" ? "line-through text-text-light" : ""}`}>{t.task}</span>
                                <div className="text-xs text-text-muted mt-0.5">Assigned to {t.assignee} · Due {t.dueDate}</div>
                            </div>
                            {priorityBadge(t.priority)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
