
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export const seedData = async (weddingId, userId) => {
    console.log("Starting seed for wedding:", weddingId);

    // 1. Events
    const eventsData = [
        { wedding_id: weddingId, name: "Mehendi", date: "2026-02-12", status: "upcoming", start_time: "14:00", end_time: "18:00" },
        { wedding_id: weddingId, name: "Sangeet", date: "2026-02-13", status: "upcoming", start_time: "19:00", end_time: "23:59" },
        { wedding_id: weddingId, name: "Haldi", date: "2026-02-14", status: "upcoming", start_time: "10:00", end_time: "13:00" },
        { wedding_id: weddingId, name: "Wedding Ceremony", date: "2026-02-15", status: "upcoming", start_time: "09:00", end_time: "14:00" },
        { wedding_id: weddingId, name: "Reception", date: "2026-02-15", status: "upcoming", start_time: "19:00", end_time: "23:59" },
    ];

    const { data: events, error: eventsError } = await supabase
        .from('events')
        .insert(eventsData)
        .select();

    if (eventsError) throw new Error("Error seeding events: " + eventsError.message);
    const eventMap = events.reduce((acc, e) => ({ ...acc, [e.name]: e.id }), {});

    // 2. Guests
    const guestsData = [
        { wedding_id: weddingId, name: "Sharma Family", count: 4, side: "bride", rsvp: "accepted", email: "sharma@example.com", phone: "9876543210" },
        { wedding_id: weddingId, name: "Verma Family", count: 3, side: "groom", rsvp: "pending", email: "verma@example.com", phone: "9876543211" },
        { wedding_id: weddingId, name: "Rahul Gupta", count: 1, side: "bride", rsvp: "accepted", email: "rahul@example.com", phone: "9876543212" },
        { wedding_id: weddingId, name: "Priya Singh", count: 2, side: "groom", rsvp: "declined", email: "priya@example.com", phone: "9876543213" },
        { wedding_id: weddingId, name: "Amit & Neha", count: 2, side: "bride", rsvp: "accepted", email: "amit@example.com", phone: "9876543214" },
    ];

    const { data: guests, error: guestsError } = await supabase
        .from('guests')
        .insert(guestsData)
        .select();

    if (guestsError) throw new Error("Error seeding guests: " + guestsError.message);

    // 3. Team (Wedding Members)
    // We already have the current user, let's invite some dummy members
    const teamData = [
        { wedding_id: weddingId, user_id: null, invited_email: "planner@example.com", role: "admin", status: "invited", modules: ["all"] },
        { wedding_id: weddingId, user_id: null, invited_email: "photographer@example.com", role: "viewer", status: "invited", modules: ["events", "timeline"] },
    ];

    const { data: team, error: teamError } = await supabase
        .from('wedding_members')
        .insert(teamData)
        .select();

    if (teamError) throw new Error("Error seeding team: " + teamError.message);

    // 4. Vendors
    const vendorsData = [
        { wedding_id: weddingId, name: "Click Moments", category: "Photography", amount: 150000, payment_status: "partial", rating: 5, phone: "9988776655" },
        { wedding_id: weddingId, name: "Spice Delights", category: "Catering", amount: 450000, payment_status: "unpaid", rating: 4, phone: "9988776644" },
        { wedding_id: weddingId, name: "Floral Fantasy", category: "Decor", amount: 200000, payment_status: "paid", rating: 5, phone: "9988776633" },
        { wedding_id: weddingId, name: "DJ Beats", category: "Music", amount: 50000, payment_status: "paid", rating: 4, phone: "9988776622" },
    ];

    const { error: vendorsError } = await supabase.from('vendors').insert(vendorsData);
    if (vendorsError) throw new Error("Error seeding vendors: " + vendorsError.message);

    // 5. Budget Items
    const budgetData = [
        { wedding_id: weddingId, category: "Venue", budgeted: 500000, actual: 480000, notes: "Negotiated down" },
        { wedding_id: weddingId, category: "Catering", budgeted: 400000, actual: 450000, notes: "Extra plates added" },
        { wedding_id: weddingId, category: "Decor", budgeted: 250000, actual: 200000, notes: "Saved on flowers" },
        { wedding_id: weddingId, category: "Photography", budgeted: 150000, actual: 150000, notes: "Fixed package" },
        { wedding_id: weddingId, category: "Attire", budgeted: 300000, actual: 350000, notes: "Designer lehenga" },
    ];

    const { error: budgetError } = await supabase.from('budget_items').insert(budgetData);
    if (budgetError) throw new Error("Error seeding budget: " + budgetError.message);

    // 6. Tasks
    const tasksData = [
        { wedding_id: weddingId, title: "Book Venue", status: "done", priority: "high", due_date: "2026-01-01" },
        { wedding_id: weddingId, title: "Finalize Guest List", status: "in_progress", priority: "high", due_date: "2026-01-15" },
        { wedding_id: weddingId, title: "Send Invitations", status: "pending", priority: "medium", due_date: "2026-01-20" },
        { wedding_id: weddingId, title: "Book Makeup Artist", status: "pending", priority: "medium", due_date: "2026-01-25" },
        { wedding_id: weddingId, title: "Buy Wedding Rings", status: "pending", priority: "high", due_date: "2026-02-01" },
    ];

    const { error: tasksError } = await supabase.from('tasks').insert(tasksData);
    if (tasksError) throw new Error("Error seeding tasks: " + tasksError.message);

    // 7. Travel Plans
    if (guests.length > 0) {
        const travelData = [
            { wedding_id: weddingId, guest_id: guests[0].id, arrival_datetime: "2026-02-14 10:00:00", mode: "Flight", pickup_status: "arranged", details: "Flight AI-402" },
            { wedding_id: weddingId, guest_id: guests[1].id, arrival_datetime: "2026-02-14 14:00:00", mode: "Train", pickup_status: "pending", details: "Shatabdi Express" },
        ];
        const { error: travelError } = await supabase.from('travel_plans').insert(travelData);
        if (travelError) throw new Error("Error seeding travel: " + travelError.message);
    }

    // 8. Itinerary Slots
    if (eventMap['Wedding Ceremony']) {
        const slotsData = [
            { event_id: eventMap['Wedding Ceremony'], time: "09:00", activity: "Getting Ready", responsible: "Bride & Groom", sort_order: 1 },
            { event_id: eventMap['Wedding Ceremony'], time: "10:00", activity: "Baraat", responsible: "Groom's Family", sort_order: 2 },
            { event_id: eventMap['Wedding Ceremony'], time: "11:00", activity: "Jaimala", responsible: "All", sort_order: 3 },
            { event_id: eventMap['Wedding Ceremony'], time: "12:00", activity: "Pheras", responsible: "Priest", sort_order: 4 },
        ];
        const { error: slotsError } = await supabase.from('itinerary_slots').insert(slotsData);
        if (slotsError) throw new Error("Error seeding itinerary: " + slotsError.message);
    }

    // 9. Decor Plans
    const decorData = [];
    if (eventMap['Mehendi']) decorData.push({ wedding_id: weddingId, event_id: eventMap['Mehendi'], theme: "Boho Chic", colors: "Green & Pink", highlight: "Swing", notes: "Use marigolds" });
    if (eventMap['Reception']) decorData.push({ wedding_id: weddingId, event_id: eventMap['Reception'], theme: "Royal Glam", colors: "Gold & White", highlight: "Chandeliers", notes: "Elegant lighting" });

    if (decorData.length > 0) {
        const { error: decorError } = await supabase.from('decor_plans').insert(decorData);
        if (decorError) throw new Error("Error seeding decor: " + decorError.message);
    }

    // 10. Food Menus
    const menuData = [];
    if (eventMap['Mehendi']) menuData.push({ wedding_id: weddingId, event_id: eventMap['Mehendi'], menu_type: "High Tea", status: "finalized", headcount: 100, items: { starters: ["Samosa", "Paneer Tikka"], mains: ["Pav Bhaji"], desserts: ["Gulab Jamun"] } });
    if (eventMap['Reception']) menuData.push({ wedding_id: weddingId, event_id: eventMap['Reception'], menu_type: "Dinner Buffet", status: "draft", headcount: 300, items: { starters: ["Soup", "Kebabs"], mains: ["Dal Makhani", "Butter Chicken", "Naan"], desserts: ["Ice Cream", "Moong Dal Halwa"] } });

    if (menuData.length > 0) {
        const { error: menuError } = await supabase.from('food_menus').insert(menuData);
        if (menuError) throw new Error("Error seeding menus: " + menuError.message);
    }

    // 11. Invitations
    const inviteData = [];
    if (eventMap['Wedding Ceremony']) inviteData.push({ wedding_id: weddingId, event_id: eventMap['Wedding Ceremony'], design_name: "Traditional Red", channel: "whatsapp", sent_count: 150, delivered_count: 140, opened_count: 120 });

    if (inviteData.length > 0) {
        const { error: inviteError } = await supabase.from('invitations').insert(inviteData);
        if (inviteError) throw new Error("Error seeding invitations: " + inviteError.message);
    }

    // 12. Gifts
    const giftsData = [
        { wedding_id: weddingId, from_name: "Aunt Sarah", description: "Coffee Maker", estimated_value: 5000, thank_you_status: "pending" },
        { wedding_id: weddingId, from_name: "Uncle Bob", description: "Cash", estimated_value: 10000, thank_you_status: "sent" },
    ];
    const { error: giftsError } = await supabase.from('gifts').insert(giftsData);
    if (giftsError) throw new Error("Error seeding gifts: " + giftsError.message);

    console.log("Seeding complete!");
    return true;
};
