
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

// Helper to format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(amount || 0);
};

// --- PDF Generators ---

// 1. Guest List PDF
export const generateGuestListPDF = (guests, weddingName = "Wedding") => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.text(`${weddingName} - Guest List`, 14, 22);
    doc.setFontSize(11);
    doc.text(`Generated on: ${format(new Date(), 'PPpp')}`, 14, 30);

    // Table
    const tableColumn = ["Name", "Side", "RSVP", "Count", "Phone", "Event"];
    const tableRows = [];

    guests.forEach(guest => {
        const guestData = [
            guest.name,
            guest.side,
            guest.rsvp_status,
            guest.count,
            guest.phone || '-',
            guest.eventName || '-'
        ];
        tableRows.push(guestData);
    });

    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        theme: 'grid',
        headStyles: { fillColor: [233, 30, 99] }, // Primary pinkish
    });

    doc.save(`Guest_List_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};

// 2. Budget Summary PDF
export const generateBudgetPDF = (budgetItems, weddingName = "Wedding") => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(`${weddingName} - Budget Summary`, 14, 22);
    doc.setFontSize(11);
    doc.text(`Generated on: ${format(new Date(), 'PPpp')}`, 14, 30);

    const tableColumn = ["Category", "Estimated", "Actual", "Paid", "Balance"];
    const tableRows = [];

    let totalEst = 0;
    let totalAct = 0;
    let totalPaid = 0;

    budgetItems.forEach(item => {
        totalEst += item.estimated_amount || 0;
        totalAct += item.actual_amount || 0;
        totalPaid += item.paid_amount || 0;

        const itemData = [
            item.category,
            formatCurrency(item.estimated_amount),
            formatCurrency(item.actual_amount),
            formatCurrency(item.paid_amount),
            formatCurrency((item.actual_amount || 0) - (item.paid_amount || 0))
        ];
        tableRows.push(itemData);
    });

    // Total Row
    tableRows.push([
        "TOTAL",
        formatCurrency(totalEst),
        formatCurrency(totalAct),
        formatCurrency(totalPaid),
        formatCurrency(totalAct - totalPaid)
    ]);

    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        theme: 'striped',
        headStyles: { fillColor: [233, 30, 99] },
        footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' }
    });

    doc.save(`Budget_Summary_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};

// 3. Vendor Summary PDF
export const generateVendorPDF = (vendors, weddingName = "Wedding") => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(`${weddingName} - Vendor List`, 14, 22);
    doc.setFontSize(11);
    doc.text(`Generated on: ${format(new Date(), 'PPpp')}`, 14, 30);

    const tableColumn = ["Name", "Category", "Phone", "Amount", "Status"];
    const tableRows = [];

    vendors.forEach(v => {
        const vendorData = [
            v.name,
            v.category,
            v.phone || '-',
            formatCurrency(v.amount),
            v.payment_status
        ];
        tableRows.push(vendorData);
    });

    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        headStyles: { fillColor: [233, 30, 99] },
    });

    doc.save(`Vendor_List_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};

// 4. Gift Registry PDF
export const generateGiftPDF = (gifts, weddingName = "Wedding") => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(`${weddingName} - Gift Registry`, 14, 22);

    const tableColumn = ["Gift Item", "From", "Value", "Status"];
    const tableRows = [];

    gifts.forEach(g => {
        const giftData = [
            g.item_name,
            g.giver_name,
            g.value ? formatCurrency(g.value) : '-',
            g.status
        ];
        tableRows.push(giftData);
    });

    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        headStyles: { fillColor: [233, 30, 99] },
    });

    doc.save(`Gift_Registry_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};

// 5. Complete Report PDF (Aggregation)
export const generateCompleteReportPDF = (data, weddingName = "Wedding") => {
    const doc = new jsPDF();
    let yPos = 20;

    // Title
    doc.setFontSize(24);
    doc.text(weddingName, 105, yPos, { align: 'center' });
    yPos += 10;
    doc.setFontSize(16);
    doc.text("Complete Wedding Report", 105, yPos, { align: 'center' });
    yPos += 20;
    doc.setFontSize(10);
    doc.text(`Generated on: ${format(new Date(), 'PPpp')}`, 14, yPos);
    yPos += 10;

    // 1. Budget Summary
    doc.setFontSize(14);
    doc.text("1. Budget Summary", 14, yPos);
    yPos += 5;

    const budgetRows = data.budget.map(item => [
        item.category,
        formatCurrency(item.estimated_amount),
        formatCurrency(item.actual_amount),
        formatCurrency(item.paid_amount)
    ]);

    autoTable(doc, {
        head: [["Category", "Estimated", "Actual", "Paid"]],
        body: budgetRows,
        startY: yPos,
        theme: 'grid',
        headStyles: { fillColor: [100, 100, 100] },
    });

    yPos = doc.lastAutoTable.finalY + 15;

    // 2. Guest Statistics
    doc.setFontSize(14);
    doc.text("2. Guest Statistics", 14, yPos);
    yPos += 5;

    const totalGuests = data.guests.reduce((sum, g) => sum + (g.count || 1), 0);
    const confirmedGuests = data.guests.filter(g => g.rsvp_status === 'confirmed').reduce((sum, g) => sum + (g.count || 1), 0);

    autoTable(doc, {
        head: [["Metric", "Value"]],
        body: [
            ["Total Invited", totalGuests],
            ["Confirmed", confirmedGuests],
            ["Pending", totalGuests - confirmedGuests] // Simplification
        ],
        startY: yPos,
        theme: 'plain',
    });

    yPos = doc.lastAutoTable.finalY + 15;

    // 3. Vendors
    doc.setFontSize(14);
    doc.text("3. Key Vendors", 14, yPos);
    yPos += 5;

    const vendorRows = data.vendors.map(v => [v.name, v.category, v.payment_status]);

    autoTable(doc, {
        head: [["Name", "Category", "Status"]],
        body: vendorRows,
        startY: yPos,
        theme: 'grid',
        headStyles: { fillColor: [100, 100, 100] },
    });

    doc.save(`Complete_Wedding_Report_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};
