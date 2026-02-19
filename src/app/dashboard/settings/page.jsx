
"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { seedData } from "@/lib/seed";
import { Settings, Database, AlertTriangle, CheckCircle } from "lucide-react";

export default function SettingsPage() {
    const { user } = useAuth();
    const [seeding, setSeeding] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error'
    const [message, setMessage] = useState("");

    const handleSeedData = async () => {
        if (!confirm("⚠️ This will add dummy data to your wedding profile. It might duplicate existing entries if you run it multiple times. Are you sure?")) {
            return;
        }

        setSeeding(true);
        setStatus(null);
        try {
            await seedData(user.weddingId, user.id);
            setStatus('success');
            setMessage("Demo data populated successfully! Refresh the page to see changes.");
        } catch (error) {
            console.error("Seeding error:", error);
            setStatus('error');
            setMessage("Error populating data: " + error.message);
        } finally {
            setSeeding(false);
        }
    };

    return (
        <div className="space-y-6 animate-[fadeIn_0.5s_ease] max-w-2xl">
            <div>
                <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                    <Settings size={22} className="text-primary" /> Settings
                </h2>
                <p className="text-sm text-text-muted mt-0.5">Manage your account and preferences</p>
            </div>

            {/* Profile Section */}
            <div className="bg-bg-card rounded-xl border border-border-light p-6">
                <h3 className="text-lg font-semibold mb-4">Profile Details</h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase text-text-muted mb-1">Name</label>
                            <div className="p-2 bg-bg-alt rounded border border-border-light text-sm">{user?.name}</div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase text-text-muted mb-1">Email</label>
                            <div className="p-2 bg-bg-alt rounded border border-border-light text-sm">{user?.email}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Demo Data Section */}
            <div className="bg-bg-card rounded-xl border border-border-light p-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Database size={18} /> Demo Content
                </h3>
                <p className="text-sm text-text-muted mb-6">
                    Use this tool to populate your account with sample weddings data for testing purposes.
                </p>

                {status && (
                    <div className={`mb-4 p-3 rounded-lg border flex items-start gap-2 text-sm ${status === 'success' ? 'bg-success/10 border-success/20 text-success' : 'bg-danger/10 border-danger/20 text-danger'
                        }`}>
                        {status === 'success' ? <CheckCircle size={16} className="mt-0.5" /> : <AlertTriangle size={16} className="mt-0.5" />}
                        <span>{message}</span>
                    </div>
                )}

                <button
                    onClick={handleSeedData}
                    disabled={seeding}
                    className="btn-secondary w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 border border-border-light hover:bg-bg-alt transition-colors"
                >
                    {seeding ? (
                        <>
                            <span className="animate-spin w-4 h-4 border-2 border-text-muted border-t-text rounded-full"></span>
                            Populating...
                        </>
                    ) : (
                        <>
                            <Database size={16} /> Populate Demo Data
                        </>
                    )}
                </button>
                <p className="text-xs text-text-muted mt-2">
                    Note: This adds events, guests, vendors, and more. It does not replace existing data.
                </p>
            </div>
        </div>
    );
}
