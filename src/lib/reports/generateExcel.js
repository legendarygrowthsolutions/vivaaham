
import * as XLSX from 'xlsx';
import { format } from 'date-fns';

const saveExcel = (workbook, filename) => {
    XLSX.writeFile(workbook, `${filename}_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
};

export const generateGuestListExcel = (guests) => {
    const worksheet = XLSX.utils.json_to_sheet(guests.map(g => ({
        Name: g.name,
        Side: g.side,
        RSVP: g.rsvp_status,
        Count: g.count,
        Phone: g.phone || '',
        Email: g.email || '',
        Event: g.eventName || '',
        Notes: g.dietary_notes || ''
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Guests");
    saveExcel(workbook, "Guest_List");
};

export const generateVendorExcel = (vendors) => {
    const worksheet = XLSX.utils.json_to_sheet(vendors.map(v => ({
        Name: v.name,
        Category: v.category,
        Phone: v.phone,
        Email: v.email,
        Total_Amount: v.amount,
        Paid_Status: v.payment_status,
        Notes: v.notes
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vendors");
    saveExcel(workbook, "Vendor_List");
};

export const generateTravelExcel = (travelPlans) => {
    const worksheet = XLSX.utils.json_to_sheet(travelPlans.map(t => ({
        Guest: t.guestName,
        Phone: t.guestPhone,
        Arrival: t.arrival_datetime ? format(new Date(t.arrival_datetime), 'PPpp') : '',
        Mode: t.mode,
        Details: t.details,
        Pickup_Status: t.pickup_status
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Travel_Manifest");
    saveExcel(workbook, "Travel_Manifest");
};
