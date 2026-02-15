"use client";
import { FileDown, Download, FileText, TableProperties, BarChart3 } from "lucide-react";

const reports = [
    { id: 1, name: "Guest List", description: "Complete guest list with RSVP status, sides, event assignments, and contact details", icon: TableProperties, format: "Excel / PDF" },
    { id: 2, name: "Budget Summary", description: "Category-wise budget vs. actual spending with variance analysis", icon: BarChart3, format: "PDF" },
    { id: 3, name: "Vendor Summary", description: "All vendor details, contract amounts, payment status, and contacts", icon: FileText, format: "Excel / PDF" },
    { id: 4, name: "Travel Manifest", description: "Outstation guest arrivals, modes of travel, pickup assignments", icon: TableProperties, format: "Excel" },
    { id: 5, name: "Gift Registry", description: "Gifts received with values and thank-you status", icon: FileText, format: "PDF" },
    { id: 6, name: "Complete Event Report", description: "Full wedding report — guests, budget, vendors, timeline, and tasks", icon: BarChart3, format: "PDF" },
];

export default function ReportsPage() {
    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div>
                <h2 className="font-heading text-xl font-semibold flex items-center gap-2"><FileDown size={22} className="text-primary" /> Export & Reports</h2>
                <p className="text-sm text-text-muted mt-0.5">Download reports and export data as PDF or Excel</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reports.map((r) => (
                    <div key={r.id} className="bg-bg-card rounded-xl border border-border-light p-5 hover:shadow-md transition-shadow flex gap-4">
                        <div className="w-12 h-12 bg-primary/[0.06] rounded-lg flex items-center justify-center shrink-0">
                            <r.icon size={22} className="text-primary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium text-sm mb-1">{r.name}</h3>
                            <p className="text-xs text-text-muted mb-3">{r.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-text-light">{r.format}</span>
                                <button className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary/20 flex items-center gap-1 transition-colors">
                                    <Download size={12} /> Export
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
