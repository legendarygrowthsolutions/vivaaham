"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEvents } from "@/contexts/EventContext";
import { MOCK_TASKS, MOCK_ACTIVITY, MOCK_NOTIFICATIONS } from "@/lib/mockData";
import {
    Users, CheckCircle, IndianRupee, Clock, AlertCircle, ListChecks,
    CalendarDays, Activity, TrendingUp, ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const { user } = useAuth();

    const { events, loading } = useEvents();

    // Wedding countdown
    const weddingDate = user?.weddingDate ? new Date(user.weddingDate) : new Date("2026-03-15");
    const now = new Date();
    const diffMs = weddingDate - now;
    const daysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

    if (loading) return null;

    const upcomingEvents = events.filter((e) => e.status === "upcoming").slice(0, 3);
    const recentActivity = MOCK_ACTIVITY.slice(0, 5);
    const overdueTasks = MOCK_TASKS.filter((t) => t.status === "overdue");
    const pendingTasks = MOCK_TASKS.filter((t) => t.status === "pending" || t.status === "in_progress");
    const unreadNotifs = MOCK_NOTIFICATIONS.filter((n) => !n.read);

    return (
        <div className="space-y-6 animate-[fadeIn_0.5s_ease]">
            {/* Wedding Countdown */}
            <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/[0.06] rounded-full" />
                <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-white/[0.04] rounded-full" />
                <div className="relative">
                    <p className="text-white/70 text-sm mb-1">Wedding of {user?.brideName || "—"} & {user?.groomName || "—"}</p>
                    <h2 className="font-heading text-[clamp(1.6rem,4vw,2.4rem)] font-bold mb-2">
                        {daysLeft} Days To Go! 🎊
                    </h2>
                    <p className="text-white/80 text-sm">
                        {weddingDate.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Users, label: "Total Guests", value: "847", sub: "623 accepted", color: "text-primary", bg: "bg-primary/[0.06]" },
                    { icon: CheckCircle, label: "Tasks Done", value: "78%", sub: "50 of 64", color: "text-success", bg: "bg-success/[0.06]" },
                    { icon: IndianRupee, label: "Budget Used", value: "₹18.2L", sub: "of ₹24.5L", color: "text-accent", bg: "bg-accent/[0.08]" },
                    { icon: ListChecks, label: "Pending", value: `${pendingTasks.length + overdueTasks.length}`, sub: `${overdueTasks.length} overdue`, color: "text-danger", bg: "bg-danger/[0.06]" },
                ].map((stat) => (
                    <div key={stat.label} className="bg-bg-card rounded-xl border border-border-light p-5 hover:shadow-md transition-shadow">
                        <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                            <stat.icon size={20} className={stat.color} />
                        </div>
                        <div className="font-heading text-2xl font-bold">{stat.value}</div>
                        <div className="text-xs text-text-muted mt-0.5">{stat.label}</div>
                        <div className="text-xs text-text-light mt-0.5">{stat.sub}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Events */}
                <div className="bg-bg-card rounded-xl border border-border-light p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-heading text-base font-semibold flex items-center gap-2">
                            <CalendarDays size={18} className="text-primary" /> Upcoming Events
                        </h3>
                        <Link href="/dashboard/timeline" className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {upcomingEvents.map((event) => (
                            <div key={event.id} className="flex items-center gap-3 p-3 bg-bg-alt rounded-lg">
                                <div className="w-10 h-10 bg-primary/[0.08] rounded-lg flex items-center justify-center text-primary font-heading font-bold text-sm">
                                    {new Date(event.date).getDate()}
                                </div>
                                <div className="flex-1">
                                    <span className="font-medium text-sm">{event.name}</span>
                                    <div className="text-xs text-text-muted">{event.venue}</div>
                                </div>
                                <span className="text-xs text-primary font-medium">
                                    {new Date(event.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-bg-card rounded-xl border border-border-light p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-heading text-base font-semibold flex items-center gap-2">
                            <Activity size={18} className="text-primary" /> Recent Activity
                        </h3>
                        <Link href="/dashboard/activity" className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {recentActivity.map((act) => (
                            <div key={act.id} className="flex items-start gap-3 p-3 bg-bg-alt rounded-lg">
                                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center text-accent font-bold text-xs shrink-0">
                                    {act.user.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm">
                                        <strong>{act.user}</strong> {act.action} <strong>{act.target}</strong>
                                    </p>
                                    <span className="text-xs text-text-light">{act.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Alerts */}
            {(overdueTasks.length > 0 || unreadNotifs.length > 0) && (
                <div className="bg-bg-card rounded-xl border border-border-light p-5">
                    <h3 className="font-heading text-base font-semibold flex items-center gap-2 mb-4">
                        <AlertCircle size={18} className="text-danger" /> Needs Attention
                    </h3>
                    <div className="space-y-2">
                        {overdueTasks.map((task) => (
                            <div key={task.id} className="flex items-center gap-3 p-3 bg-danger/[0.04] rounded-lg border border-danger/10">
                                <Clock size={16} className="text-danger shrink-0" />
                                <span className="text-sm">
                                    <strong>Overdue:</strong> {task.task} — Assigned to {task.assignee}
                                </span>
                            </div>
                        ))}
                        {unreadNotifs.slice(0, 3).map((notif) => (
                            <div key={notif.id} className={`flex items-center gap-3 p-3 rounded-lg border ${notif.type === "warning" ? "bg-warning/[0.04] border-warning/10" : "bg-info/[0.04] border-info/10"
                                }`}>
                                <AlertCircle size={16} className={notif.type === "warning" ? "text-warning shrink-0" : "text-info shrink-0"} />
                                <span className="text-sm">{notif.message}</span>
                                <span className="text-xs text-text-light ml-auto whitespace-nowrap">{notif.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
