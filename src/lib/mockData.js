// ===== MOCK DATA FOR ALL MODULES =====

export const PLANS = [
    {
        id: "shubh",
        name: "Shubh",
        tagline: "For intimate celebrations",
        price: "₹4,999",
        priceNum: 4999,
        features: [
            "Up to 300 guests",
            "3 events",
            "Guest & RSVP management",
            "Budget tracker",
            "Vendor management",
            "Digital invitations",
            "Email support",
        ],
    },
    {
        id: "mangal",
        name: "Mangal",
        tagline: "For the grand celebration",
        price: "₹9,999",
        priceNum: 9999,
        popular: true,
        features: [
            "Up to 1,000 guests",
            "Unlimited events",
            "Everything in Shubh",
            "Venue & room management",
            "Travel & logistics",
            "Family collaboration (5 users)",
            "Priority WhatsApp support",
        ],
    },
    {
        id: "shahi",
        name: "Shahi",
        tagline: "For the royal affair",
        price: "₹19,999",
        priceNum: 19999,
        features: [
            "Unlimited guests",
            "Unlimited events",
            "Everything in Mangal",
            "Dedicated account manager",
            "Custom integrations",
            "Unlimited family access",
            "24/7 phone + WhatsApp support",
        ],
    },
];

export const MOCK_GUESTS = [
    { id: 1, name: "Sharma Family", count: 8, side: "Bride", events: "All Events", rsvp: "accepted", phone: "+91 98765 43210", email: "sharma@email.com" },
    { id: 2, name: "Rajesh Kapoor", count: 3, side: "Groom", events: "Wedding, Reception", rsvp: "pending", phone: "+91 87654 32109", email: "rajesh@email.com" },
    { id: 3, name: "Meera & Anil Gupta", count: 2, side: "Bride", events: "Sangeet, Wedding", rsvp: "accepted", phone: "+91 76543 21098", email: "gupta@email.com" },
    { id: 4, name: "Vikram Singhania", count: 5, side: "Groom", events: "All Events", rsvp: "pending", phone: "+91 65432 10987", email: "vikram@email.com" },
    { id: 5, name: "Sunita Devi", count: 1, side: "Bride", events: "Wedding", rsvp: "declined", phone: "+91 54321 09876", email: "sunita@email.com" },
    { id: 6, name: "Patel Family", count: 6, side: "Groom", events: "All Events", rsvp: "accepted", phone: "+91 43210 98765", email: "patel@email.com" },
    { id: 7, name: "Nita Ambani (+3)", count: 4, side: "Bride", events: "Wedding, Reception", rsvp: "accepted", phone: "+91 32109 87654", email: "nita@email.com" },
    { id: 8, name: "Chacha Ji", count: 2, side: "Groom", events: "All Events", rsvp: "pending", phone: "+91 21098 76543", email: "chacha@email.com" },
];

export const MOCK_VENUES = [
    { id: 1, name: "Taj Palace, Jaipur", event: "Wedding Ceremony", date: "15 Feb 2026", status: "confirmed", rooms: 30, assigned: 25, cost: "₹8,00,000" },
    { id: 2, name: "Royal Orchid Lawns", event: "Mehendi & Sangeet", date: "12-13 Feb 2026", status: "confirmed", rooms: 0, assigned: 0, cost: "₹3,50,000" },
    { id: 3, name: "ITC Rajputana", event: "Reception", date: "16 Feb 2026", status: "deposit_paid", rooms: 15, assigned: 13, cost: "₹5,00,000" },
];

export const MOCK_VENDORS = [
    { id: 1, name: "Rajan Photography", category: "Photography", amount: "₹2,50,000", payment: "paid", phone: "+91 99887 76655", rating: 5 },
    { id: 2, name: "Annapurna Caterers", category: "Catering", amount: "₹4,80,000", payment: "partial", phone: "+91 88776 65544", rating: 4 },
    { id: 3, name: "Blooms & Petals", category: "Florist", amount: "₹1,20,000", payment: "unpaid", phone: "+91 77665 54433", rating: 5 },
    { id: 4, name: "DJ Suraj", category: "Music & DJ", amount: "₹85,000", payment: "paid", phone: "+91 66554 43322", rating: 4 },
    { id: 5, name: "Mandap Kings", category: "Décor", amount: "₹3,50,000", payment: "partial", phone: "+91 55443 32211", rating: 5 },
];

export const MOCK_FOOD = [
    { id: 1, event: "Mehendi", type: "Chaat & Street Food", headcount: 250, status: "finalized" },
    { id: 2, event: "Sangeet", type: "Continental + Indian", headcount: 400, status: "finalized" },
    { id: 3, event: "Wedding", type: "Full Rajasthani Thali", headcount: 800, status: "tasting_due" },
    { id: 4, event: "Reception", type: "Multi Cuisine Buffet", headcount: 600, status: "draft" },
];

export const MOCK_DECOR = [
    { id: 1, event: "Mehendi", theme: "Bohemian Garden", colors: "Yellow & Green", highlight: "Marigold Canopy" },
    { id: 2, event: "Sangeet", theme: "Bollywood Glam Night", colors: "Gold & Maroon", highlight: "LED Stage" },
    { id: 3, event: "Haldi", theme: "Rustic Sunshine", colors: "Turmeric Yellow", highlight: "Marigold Drapes" },
    { id: 4, event: "Wedding", theme: "Royal Rajputana", colors: "Deep Red & Gold", highlight: "Flower Mandap" },
    { id: 5, event: "Reception", theme: "Modern Elegance", colors: "Pastel Pink & White", highlight: "Crystal Decor" },
];

export const MOCK_BUDGET = [
    { id: 1, category: "Venue & Rooms", budget: 800000, actual: 750000, status: "under" },
    { id: 2, category: "Catering", budget: 500000, actual: 480000, status: "under" },
    { id: 3, category: "Décor & Flowers", budget: 400000, actual: 470000, status: "over" },
    { id: 4, category: "Photography", budget: 250000, actual: 250000, status: "on_track" },
    { id: 5, category: "Travel & Logistics", budget: 200000, actual: 120000, status: "under" },
    { id: 6, category: "Music & Entertainment", budget: 150000, actual: 85000, status: "under" },
    { id: 7, category: "Attire & Jewellery", budget: 350000, actual: 320000, status: "under" },
];

export const MOCK_TRAVEL = [
    { id: 1, guest: "Sharma Family (x8)", arriving: "11 Feb, 3 PM", mode: "Flight — DEL→JAI", pickup: "arranged" },
    { id: 2, guest: "Gupta Ji (+2)", arriving: "12 Feb, 10 AM", mode: "Train — Mumbai", pickup: "pending" },
    { id: 3, guest: "Mehra Family (x5)", arriving: "11 Feb, 6 PM", mode: "Self Drive", pickup: "not_needed" },
    { id: 4, guest: "Kapoor Uncle (+3)", arriving: "13 Feb, 1 PM", mode: "Flight — BLR→JAI", pickup: "pending" },
];

export const MOCK_GIFTS = [
    { id: 1, from: "Mama Ji & Family", gift: "Gold Necklace Set", value: "₹1,50,000", thankYou: "sent" },
    { id: 2, from: "Bua Ji", gift: "Cash Shagun", value: "₹51,000", thankYou: "sent" },
    { id: 3, from: "Sharma Uncle", gift: "Kitchen Appliance Set", value: "₹25,000", thankYou: "pending" },
    { id: 4, from: "College Friends", gift: "Group Gift — Luggage Set", value: "₹18,000", thankYou: "pending" },
];

export const MOCK_TASKS = [
    { id: 1, task: "Book mehendi artist", assignee: "Rahul", dueDate: "2026-02-01", status: "done", priority: "high" },
    { id: 2, task: "Confirm pandit ji for muhurat", assignee: "Papa Ji", dueDate: "2026-02-05", status: "done", priority: "high" },
    { id: 3, task: "Finalize reception menu", assignee: "Mummy Ji", dueDate: "2026-02-10", status: "overdue", priority: "high" },
    { id: 4, task: "Send reminder to pending RSVPs", assignee: "Rahul", dueDate: "2026-02-14", status: "in_progress", priority: "medium" },
    { id: 5, task: "Coordinate baraat route with police", assignee: "Chachu", dueDate: "2026-02-12", status: "pending", priority: "medium" },
    { id: 6, task: "Final dress fitting for bride", assignee: "Priya", dueDate: "2026-02-13", status: "pending", priority: "high" },
    { id: 7, task: "Print place cards for reception", assignee: "Rahul", dueDate: "2026-02-14", status: "pending", priority: "low" },
];

export const MOCK_INVITATIONS = [
    { id: 1, design: "Royal Rajputana", event: "Main wedding", sent: 580, delivered: 575, opened: 512, channel: "WhatsApp" },
    { id: 2, design: "Sangeet Night", event: "Sangeet", sent: 120, delivered: 118, opened: 76, channel: "Email" },
    { id: 3, design: "Haldi Ceremony", event: "Haldi", sent: 20, delivered: 20, opened: 0, channel: "SMS" },
];

export const MOCK_TEAM = [
    { id: 1, name: "Rahul (Bride's Brother)", role: "admin", modules: ["all"], status: "active", lastActive: "Just now" },
    { id: 2, name: "Papa Ji", role: "viewer", modules: ["budget", "vendors"], status: "active", lastActive: "2 hours ago" },
    { id: 3, name: "Mummy Ji", role: "editor", modules: ["food", "decor", "guests"], status: "active", lastActive: "30 min ago" },
    { id: 4, name: "Priya (Bride)", role: "editor", modules: ["decor", "invitations"], status: "active", lastActive: "1 hour ago" },
    { id: 5, name: "Chachu", role: "viewer", modules: ["travel", "venues"], status: "invited", lastActive: "Never" },
];

export const MOCK_EVENTS_TIMELINE = [
    { id: 1, name: "Roka", date: "2025-12-20", status: "completed", venue: "Home" },
    { id: 2, name: "Engagement", date: "2026-01-15", status: "completed", venue: "Grand Hyatt" },
    { id: 3, name: "Mehendi", date: "2026-02-12", status: "completed", venue: "Royal Orchid Lawns" },
    { id: 4, name: "Haldi", date: "2026-02-13", status: "upcoming", venue: "Royal Orchid Lawns" },
    { id: 5, name: "Sangeet", date: "2026-02-14", status: "upcoming", venue: "Royal Orchid Lawns" },
    { id: 6, name: "Wedding", date: "2026-02-15", status: "upcoming", venue: "Taj Palace, Jaipur" },
    { id: 7, name: "Reception", date: "2026-02-16", status: "upcoming", venue: "ITC Rajputana" },
];

export const MOCK_NOTIFICATIONS = [
    { id: 1, type: "warning", message: "Caterer final menu confirmation due tomorrow", time: "2 hours ago", read: false },
    { id: 2, type: "info", message: "Mehendi artist arriving at 4 PM today", time: "3 hours ago", read: false },
    { id: 3, type: "success", message: "Sangeet venue deposit paid — ₹1.2L ✓", time: "5 hours ago", read: true },
    { id: 4, type: "warning", message: "8 tasks overdue — needs attention", time: "1 day ago", read: true },
    { id: 5, type: "info", message: "156 RSVPs still pending", time: "1 day ago", read: false },
];

export const MOCK_ACTIVITY = [
    { id: 1, user: "Rahul", action: "updated guest RSVP status", target: "Sharma Family", time: "10 min ago" },
    { id: 2, user: "Mummy Ji", action: "finalized menu for", target: "Sangeet", time: "30 min ago" },
    { id: 3, user: "Papa Ji", action: "reviewed budget for", target: "Venue & Rooms", time: "1 hour ago" },
    { id: 4, user: "Priya", action: "updated décor theme for", target: "Reception", time: "2 hours ago" },
    { id: 5, user: "Rahul", action: "sent RSVP reminder to", target: "156 pending guests", time: "3 hours ago" },
    { id: 6, user: "System", action: "auto-flagged overdue task:", target: "Finalize reception menu", time: "5 hours ago" },
];

export const MOCK_ITINERARY = [
    {
        id: 1,
        event: "Mehendi",
        date: "12 Feb 2026",
        timeSlots: [
            { time: "10:00 AM", activity: "Venue setup begins", responsible: "Décor Team" },
            { time: "2:00 PM", activity: "Mehendi artist arrives", responsible: "Vendor Coordinator" },
            { time: "3:00 PM", activity: "Bride's mehendi begins", responsible: "Priya" },
            { time: "4:00 PM", activity: "Guest mehendi starts", responsible: "Mehendi Team" },
            { time: "6:00 PM", activity: "Chaat counter opens", responsible: "Caterer" },
            { time: "9:00 PM", activity: "Event wrap-up", responsible: "Rahul" },
        ],
    },
    {
        id: 2,
        event: "Sangeet",
        date: "14 Feb 2026",
        timeSlots: [
            { time: "4:00 PM", activity: "Sound check & stage setup", responsible: "DJ Suraj" },
            { time: "6:00 PM", activity: "Guest arrivals begin", responsible: "Ushers" },
            { time: "7:00 PM", activity: "Welcome note & dinner starts", responsible: "MC" },
            { time: "8:00 PM", activity: "Performance round begins", responsible: "Choreographer" },
            { time: "10:00 PM", activity: "Open dance floor", responsible: "DJ Suraj" },
            { time: "11:30 PM", activity: "Event ends", responsible: "Rahul" },
        ],
    },
    {
        id: 3,
        event: "Wedding",
        date: "15 Feb 2026",
        timeSlots: [
            { time: "6:00 AM", activity: "Mandap setup", responsible: "Mandap Kings" },
            { time: "8:00 AM", activity: "Baraat assembly", responsible: "Groom's Family" },
            { time: "9:00 AM", activity: "Baraat procession", responsible: "Band & DJ" },
            { time: "10:00 AM", activity: "Jaimala ceremony", responsible: "Pandit Ji" },
            { time: "11:00 AM", activity: "Pheras begin", responsible: "Pandit Ji" },
            { time: "1:00 PM", activity: "Lunch service", responsible: "Caterer" },
            { time: "3:00 PM", activity: "Vidaai", responsible: "Both Families" },
        ],
    },
];

export const ALL_MODULES = [
    { id: "dashboard", name: "Dashboard", icon: "LayoutDashboard" },
    { id: "guests", name: "Guests & RSVP", icon: "Users" },
    { id: "venues", name: "Venues & Rooms", icon: "Building2" },
    { id: "vendors", name: "Vendors", icon: "Handshake" },
    { id: "food", name: "Food & Catering", icon: "UtensilsCrossed" },
    { id: "decor", name: "Décor & Themes", icon: "Palette" },
    { id: "budget", name: "Budget Tracker", icon: "IndianRupee" },
    { id: "travel", name: "Travel & Logistics", icon: "Plane" },
    { id: "gifts", name: "Gift Registry", icon: "Gift" },
    { id: "tasks", name: "Tasks & Checklist", icon: "ListChecks" },
    { id: "invitations", name: "Digital Invites", icon: "Mail" },
    { id: "timeline", name: "Event Timeline", icon: "Clock" },
    { id: "itinerary", name: "Ceremony Script", icon: "ScrollText" },
    { id: "activity", name: "Activity Log", icon: "Activity" },
    { id: "reports", name: "Export & Reports", icon: "FileDown" },
    { id: "team", name: "Team Management", icon: "UsersRound" },
    { id: "settings", name: "Settings", icon: "Settings" },
];

export const ROLES = [
    { id: "admin", name: "Admin", description: "Full access to all modules" },
    { id: "editor", name: "Editor", description: "Can view and edit assigned modules" },
    { id: "viewer", name: "Viewer", description: "Read-only access to assigned modules" },
];
