
"use client";
import { useState } from "react";
import { FileDown, Download, FileText, TableProperties, BarChart3, Loader2 } from "lucide-react";
import { useGuests } from "@/hooks/useGuests";
import { useBudget } from "@/hooks/useBudget";
import { useVendors } from "@/hooks/useVendors";
import { useTravel } from "@/hooks/useTravel";
import { useGifts } from "@/hooks/useGifts";
import { useAuth } from "@/contexts/AuthContext";
import { generateGuestListPDF, generateBudgetPDF, generateVendorPDF, generateGiftPDF, generateCompleteReportPDF } from "@/lib/reports/generatePDF";
import { generateGuestListExcel, generateVendorExcel, generateTravelExcel } from "@/lib/reports/generateExcel";

export default function ReportsPage() {
    const { user } = useAuth();
    const { guests, refresh: refreshGuests } = useGuests();
    const { items: budgetItems, refresh: refreshBudget } = useBudget(); // Assuming useBudget returns { items }
    const { vendors, refresh: refreshVendors } = useVendors();
    const { travelPlans, refresh: refreshTravel } = useTravel();
    const { gifts, refresh: refreshGifts } = useGifts();

    // Track loading state for each report button
    const [generating, setGenerating] = useState(null);

    const handleExport = async (reportId, format) => {
        setGenerating(reportId);
        try {
            // Helper to ensure data is fresh
            // In a real app, strict freshness might require await fetchXXX(), 
            // but hooks usually keep data sync or we accept cached data for reports.

            switch (reportId) {
                case 1: // Guest List
                    if (!guests || guests.length === 0) await refreshGuests();
                    if (format === 'excel') generateGuestListExcel(guests);
                    else generateGuestListPDF(guests, user?.name + "'s Wedding");
                    break;
                case 2: // Budget
                    if (!budgetItems || budgetItems.length === 0) await refreshBudget();
                    generateBudgetPDF(budgetItems, user?.name + "'s Wedding");
                    break;
                case 3: // Vendors
                    if (!vendors || vendors.length === 0) await refreshVendors();
                    if (format === 'excel') generateVendorExcel(vendors);
                    else generateVendorPDF(vendors, user?.name + "'s Wedding");
                    break;
                case 4: // Travel
                    if (!travelPlans || travelPlans.length === 0) await refreshTravel();
                    generateTravelExcel(travelPlans);
                    break;
                case 5: // Gifts
                    if (!gifts || gifts.length === 0) await refreshGifts();
                    generateGiftPDF(gifts, user?.name + "'s Wedding");
                    break;
                case 6: // Complete Report
                    // Fetch all needed
                    await Promise.all([refreshGuests(), refreshBudget(), refreshVendors()]);
                    generateCompleteReportPDF({
                        guests,
                        budget: budgetItems,
                        vendors
                    }, user?.name + "'s Wedding");
                    break;
                default:
                    break;
            }
        } catch (err) {
            console.error("Report generation failed:", err);
            alert("Failed to generate report. Please try again.");
        } finally {
            setGenerating(null);
        }
    };

    const reports = [
        {
            id: 1,
            name: "Guest List",
            description: "Complete guest list with RSVP status, sides, event assignments, and contact details",
            icon: TableProperties,
            formats: [
                { type: 'pdf', label: 'PDF' },
                { type: 'excel', label: 'Excel' }
            ]
        },
        {
            id: 2,
            name: "Budget Summary",
            description: "Category-wise budget vs. actual spending with variance analysis",
            icon: BarChart3,
            formats: [
                { type: 'pdf', label: 'PDF' }
            ]
        },
        {
            id: 3,
            name: "Vendor Summary",
            description: "All vendor details, contract amounts, payment status, and contacts",
            icon: FileText,
            formats: [
                { type: 'pdf', label: 'PDF' },
                { type: 'excel', label: 'Excel' }
            ]
        },
        {
            id: 4,
            name: "Travel Manifest",
            description: "Outstation guest arrivals, modes of travel, pickup assignments",
            icon: TableProperties,
            formats: [
                { type: 'excel', label: 'Excel' }
            ]
        },
        {
            id: 5,
            name: "Gift Registry",
            description: "Gifts received with values and thank-you status",
            icon: FileText,
            formats: [
                { type: 'pdf', label: 'PDF' }
            ]
        },
        {
            id: 6,
            name: "Complete Event Report",
            description: "Full wedding report — guests, budget, vendors, timeline, and tasks",
            icon: BarChart3,
            formats: [
                { type: 'pdf', label: 'PDF' }
            ]
        },
    ];

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

                            <div className="flex items-center gap-2 mt-auto">
                                {r.formats.map(fmt => (
                                    <button
                                        key={fmt.type}
                                        onClick={() => handleExport(r.id, fmt.type)}
                                        disabled={generating === r.id}
                                        className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary/20 flex items-center gap-1 transition-colors disabled:opacity-50"
                                    >
                                        {generating === r.id ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                                        {fmt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
