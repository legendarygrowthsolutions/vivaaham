"use client";

import { useState } from "react";
import {
    LayoutDashboard, Users, Building2, Handshake, UtensilsCrossed,
    Palette, IndianRupee, Plane, Gift, ListChecks, UsersRound, Mail,
    AlertCircle, Clock, CheckCircle, BedDouble, Leaf, WheatOff, Image
} from "lucide-react";

const ICON_MAP = {
    LayoutDashboard, Users, Building2, Handshake, UtensilsCrossed,
    Palette, IndianRupee, Plane, Gift, ListChecks, UsersRound, Mail,
};

const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
    { id: "guests", label: "Guests & RSVP", icon: "Users" },
    { id: "venues", label: "Venues & Rooms", icon: "Building2" },
    { id: "vendors", label: "Vendors", icon: "Handshake" },
    { id: "food", label: "Food & Catering", icon: "UtensilsCrossed" },
    { id: "decor", label: "Décor & Themes", icon: "Palette" },
    { id: "budget", label: "Budget Tracker", icon: "IndianRupee" },
    { id: "travel", label: "Travel & Logistics", icon: "Plane" },
    { id: "gifts", label: "Gift Registry", icon: "Gift" },
    { id: "tasks", label: "Tasks & Checklist", icon: "ListChecks" },
    { id: "family", label: "Family Access", icon: "UsersRound" },
    { id: "invitations", label: "Digital Invites", icon: "Mail" },
];

const screens = {
    dashboard: {
        title: "Wedding Dashboard", badge: "Live Overview",
        content: (
            <>
                <div className="grid grid-cols-3 gap-3 mb-5">
                    <StatCard value="847" label="Total Guests" />
                    <StatCard value="73%" label="RSVPs In" />
                    <StatCard value="₹18.2L" label="Spent / ₹24.5L" />
                </div>
                <div className="bg-bg-alt rounded-xl p-4 mb-4">
                    <div className="text-xs text-text-muted font-semibold mb-3">Budget by Category</div>
                    <div className="flex items-end gap-2 h-[100px]">
                        {[85, 65, 45, 30, 55, 20].map((h, i) => (
                            <div key={i} className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t-md relative" style={{ height: `${h}%` }}>
                                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[0.6rem] text-text-muted whitespace-nowrap">
                                    {["Venue", "Catering", "Décor", "Photo", "Attire", "Travel"][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="space-y-2 mt-8">
                    <ListItem icon={AlertCircle} text={<>Caterer final menu confirmation due <strong>tomorrow</strong></>} />
                    <ListItem icon={Clock} text="Mehendi artist arriving at 4 PM today" />
                    <ListItem icon={CheckCircle} text="Sangeet venue deposit paid — ₹1.2L ✓" />
                </div>
            </>
        ),
    },
    guests: {
        title: "Guests & RSVP", badge: "847 Guests",
        content: (
            <>
                <div className="grid grid-cols-3 gap-3 mb-5">
                    <StatCard value="623" label="Accepted" color="text-success" />
                    <StatCard value="156" label="Pending" color="text-accent" />
                    <StatCard value="68" label="Declined" color="text-danger" />
                </div>
                <Table
                    headers={["Guest", "Side", "Events", "RSVP"]}
                    rows={[
                        ["Sharma Family (x8)", "Bride", "All Events", <Badge key="1" status="green">Accepted</Badge>],
                        ["Rajesh Kapoor (+2)", "Groom", "Wedding, Reception", <Badge key="2" status="yellow">Pending</Badge>],
                        ["Meera & Anil Gupta", "Bride", "Sangeet, Wedding", <Badge key="3" status="green">Accepted</Badge>],
                        ["Vikram Singhania (+4)", "Groom", "All Events", <Badge key="4" status="yellow">Pending</Badge>],
                        ["Sunita Devi", "Bride", "Wedding", <Badge key="5" status="red">Declined</Badge>],
                    ]}
                />
            </>
        ),
    },
    venues: {
        title: "Venues & Rooms", badge: "3 Venues",
        content: (
            <>
                <div className="grid grid-cols-3 gap-3 mb-5">
                    <StatCard value="3" label="Venues Booked" />
                    <StatCard value="45" label="Rooms Blocked" />
                    <StatCard value="38" label="Rooms Assigned" />
                </div>
                <Table
                    headers={["Venue", "Event", "Date", "Status"]}
                    rows={[
                        ["Taj Palace, Jaipur", "Wedding Ceremony", "15 Feb 2026", <Badge key="1" status="green">Confirmed</Badge>],
                        ["Royal Orchid Lawns", "Mehendi & Sangeet", "12-13 Feb 2026", <Badge key="2" status="green">Confirmed</Badge>],
                        ["ITC Rajputana", "Reception", "16 Feb 2026", <Badge key="3" status="yellow">Deposit Paid</Badge>],
                    ]}
                />
                <div className="mt-4">
                    <div className="text-xs text-text-muted font-semibold mb-2">Room Allocation</div>
                    <div className="space-y-2">
                        <ListItem icon={BedDouble} text="Taj Palace — 25/30 rooms assigned" />
                        <ListItem icon={BedDouble} text="ITC Rajputana — 13/15 rooms assigned" />
                    </div>
                </div>
            </>
        ),
    },
    vendors: {
        title: "Vendor Management", badge: "12 Vendors",
        content: (
            <>
                <div className="grid grid-cols-3 gap-3 mb-5">
                    <StatCard value="12" label="Total Vendors" />
                    <StatCard value="₹8.4L" label="Paid" />
                    <StatCard value="₹3.1L" label="Pending" />
                </div>
                <Table
                    headers={["Vendor", "Category", "Amount", "Payment"]}
                    rows={[
                        ["Rajan Photography", "Photography", "₹2,50,000", <Badge key="1" status="green">Paid</Badge>],
                        ["Annapurna Caterers", "Catering", "₹4,80,000", <Badge key="2" status="yellow">50% Paid</Badge>],
                        ["Blooms & Petals", "Florist", "₹1,20,000", <Badge key="3" status="red">Unpaid</Badge>],
                        ["DJ Suraj", "Music & DJ", "₹85,000", <Badge key="4" status="green">Paid</Badge>],
                        ["Mandap Kings", "Décor", "₹3,50,000", <Badge key="5" status="yellow">Advance Paid</Badge>],
                    ]}
                />
            </>
        ),
    },
    food: {
        title: "Food & Catering", badge: "5 Events",
        content: (
            <>
                <div className="grid grid-cols-3 gap-3 mb-5">
                    <StatCard value="5" label="Event Menus" />
                    <StatCard value="847" label="Est. Headcount" />
                    <StatCard value="32" label="Menu Items" />
                </div>
                <Table
                    headers={["Event", "Type", "Headcount", "Status"]}
                    rows={[
                        ["Mehendi", "Chaat & Street Food", "250", <Badge key="1" status="green">Finalized</Badge>],
                        ["Sangeet", "Continental + Indian", "400", <Badge key="2" status="green">Finalized</Badge>],
                        ["Wedding", "Full Rajasthani Thali", "800", <Badge key="3" status="yellow">Tasting Due</Badge>],
                        ["Reception", "Multi Cuisine Buffet", "600", <Badge key="4" status="yellow">Draft</Badge>],
                    ]}
                />
                <div className="mt-4">
                    <div className="text-xs text-text-muted font-semibold mb-2">Dietary Notes</div>
                    <div className="space-y-2">
                        <ListItem icon={Leaf} text="120 guests — Pure Vegetarian (Jain)" />
                        <ListItem icon={WheatOff} text="8 guests — Gluten Free" />
                    </div>
                </div>
            </>
        ),
    },
    decor: {
        title: "Décor & Themes", badge: "Per Event",
        content: (
            <>
                <div className="grid grid-cols-3 gap-3 mb-5">
                    <StatCard value="5" label="Theme Boards" />
                    <StatCard value="3" label="Mandap Designs" />
                    <StatCard value="8" label="Colour Palettes" />
                </div>
                <div className="space-y-2">
                    {[
                        { event: "Mehendi", theme: "Bohemian Garden", detail: "Yellow & Green, Marigold Canopy" },
                        { event: "Sangeet", theme: "Bollywood Glam Night", detail: "Gold & Maroon, LED Stage" },
                        { event: "Haldi", theme: "Rustic Sunshine", detail: "Turmeric Yellow, Marigold Drapes" },
                        { event: "Wedding", theme: "Royal Rajputana", detail: "Deep Red & Gold, Flower Mandap" },
                        { event: "Reception", theme: "Modern Elegance", detail: "Pastel Pink & White, Crystal Decor" },
                    ].map((d) => (
                        <ListItem key={d.event} icon={Palette} text={<><strong>{d.event}</strong> — {d.theme} ({d.detail})</>} />
                    ))}
                </div>
            </>
        ),
    },
    budget: {
        title: "Budget Tracker", badge: "₹24.5L Total",
        content: (
            <>
                <div className="grid grid-cols-3 gap-3 mb-5">
                    <StatCard value="₹24.5L" label="Total Budget" />
                    <StatCard value="₹18.2L" label="Spent" />
                    <StatCard value="₹6.3L" label="Remaining" color="text-success" />
                </div>
                <Table
                    headers={["Category", "Budget", "Actual", "Status"]}
                    rows={[
                        ["Venue & Rooms", "₹8,00,000", "₹7,50,000", <Badge key="1" status="green">Under</Badge>],
                        ["Catering", "₹5,00,000", "₹4,80,000", <Badge key="2" status="green">Under</Badge>],
                        ["Décor & Flowers", "₹4,00,000", "₹4,70,000", <Badge key="3" status="red">Over ₹70K</Badge>],
                        ["Photography", "₹2,50,000", "₹2,50,000", <Badge key="4" status="blue">On Track</Badge>],
                        ["Travel & Logistics", "₹2,00,000", "₹1,20,000", <Badge key="5" status="green">Under</Badge>],
                    ]}
                />
            </>
        ),
    },
    travel: {
        title: "Travel & Logistics", badge: "120 Travellers",
        content: (
            <>
                <div className="grid grid-cols-3 gap-3 mb-5">
                    <StatCard value="120" label="Outstation Guests" />
                    <StatCard value="18" label="Pickups Scheduled" />
                    <StatCard value="6" label="Shuttle Routes" />
                </div>
                <Table
                    headers={["Guest", "Arriving", "Mode", "Pickup"]}
                    rows={[
                        ["Sharma Family (x8)", "11 Feb, 3 PM", "Flight — DEL→JAI", <Badge key="1" status="green">Arranged</Badge>],
                        ["Gupta Ji (+2)", "12 Feb, 10 AM", "Train — Mumbai", <Badge key="2" status="yellow">Pending</Badge>],
                        ["Mehra Family (x5)", "11 Feb, 6 PM", "Self Drive", <Badge key="3" status="blue">Not Needed</Badge>],
                        ["Kapoor Uncle (+3)", "13 Feb, 1 PM", "Flight — BLR→JAI", <Badge key="4" status="yellow">Pending</Badge>],
                    ]}
                />
            </>
        ),
    },
    gifts: {
        title: "Gift Registry", badge: "68 Gifts",
        content: (
            <>
                <div className="grid grid-cols-3 gap-3 mb-5">
                    <StatCard value="68" label="Gifts Received" />
                    <StatCard value="₹4.2L" label="Cash/Shagun" />
                    <StatCard value="42" label="Thank You Sent" />
                </div>
                <Table
                    headers={["From", "Gift", "Value", "Thank You"]}
                    rows={[
                        ["Mama Ji & Family", "Gold Necklace Set", "₹1,50,000", <Badge key="1" status="green">Sent</Badge>],
                        ["Bua Ji", "Cash Shagun", "₹51,000", <Badge key="2" status="green">Sent</Badge>],
                        ["Sharma Uncle", "Kitchen Appliance Set", "₹25,000", <Badge key="3" status="yellow">Pending</Badge>],
                        ["College Friends", "Group Gift — Luggage Set", "₹18,000", <Badge key="4" status="yellow">Pending</Badge>],
                    ]}
                />
            </>
        ),
    },
    tasks: {
        title: "Tasks & Checklist", badge: "78% Done",
        content: (
            <>
                <div className="grid grid-cols-3 gap-3 mb-5">
                    <StatCard value="64" label="Total Tasks" />
                    <StatCard value="50" label="Completed" />
                    <StatCard value="8" label="Overdue" />
                </div>
                <div className="space-y-2">
                    <ListItem icon={CheckCircle} iconColor="text-success" text={<s className="text-text-light">Book mehendi artist</s>} />
                    <ListItem icon={CheckCircle} iconColor="text-success" text={<s className="text-text-light">Confirm pandit ji for muhurat</s>} />
                    <ListItem icon={AlertCircle} iconColor="text-danger" text={<><strong>Finalize reception menu</strong> — <span className="text-danger text-xs">Overdue by 2 days</span></>} />
                    <ListItem icon={Clock} iconColor="text-accent" text={<>Send reminder to pending RSVPs — <span className="text-xs text-text-muted">Due tomorrow</span></>} />
                    <ListItem icon={Clock} iconColor="text-accent" text={<>Coordinate baraat route with police — <span className="text-xs text-text-muted">Due in 3 days</span></>} />
                </div>
            </>
        ),
    },
    family: {
        title: "Family Collaboration", badge: "8 Members",
        content: (
            <>
                <div className="grid grid-cols-3 gap-3 mb-5">
                    <StatCard value="8" label="Team Members" />
                    <StatCard value="3" label="Roles" />
                    <StatCard value="24" label="Updates Today" />
                </div>
                <Table
                    headers={["Member", "Role", "Assigned", "Status"]}
                    rows={[
                        ["Rahul (Bride's Brother)", "Admin", "All sections", <Badge key="1" status="green">Active</Badge>],
                        ["Papa Ji", "Viewer + Budget", "Budget, Vendors", <Badge key="2" status="green">Active</Badge>],
                        ["Mummy Ji", "Editor", "Food, Décor, Guests", <Badge key="3" status="green">Active</Badge>],
                        ["Priya (Bride)", "Editor", "Décor, Invitations", <Badge key="4" status="green">Active</Badge>],
                        ["Chachu", "Viewer", "Travel, Venues", <Badge key="5" status="yellow">Invited</Badge>],
                    ]}
                />
            </>
        ),
    },
    invitations: {
        title: "Digital Invitations", badge: "3 Designs",
        content: (
            <>
                <div className="grid grid-cols-3 gap-3 mb-5">
                    <StatCard value="3" label="Invitation Designs" />
                    <StatCard value="720" label="Sent" />
                    <StatCard value="68%" label="Opened" />
                </div>
                <div className="space-y-2 mb-4">
                    <ListItem icon={Image} text={<><strong>Royal Rajputana</strong> — Main wedding card (sent to all guests)</>} />
                    <ListItem icon={Image} text={<><strong>Sangeet Night</strong> — Bollywood theme invite (400 guests)</>} />
                    <ListItem icon={Image} text={<><strong>Haldi Ceremony</strong> — Close family only (150 guests)</>} />
                </div>
                <Table
                    headers={["Channel", "Sent", "Delivered", "Opened"]}
                    rows={[
                        ["WhatsApp", "580", "575", "512"],
                        ["Email", "120", "118", "76"],
                        ["SMS", "20", "20", "—"],
                    ]}
                />
            </>
        ),
    },
};

function StatCard({ value, label, color = "text-primary" }) {
    return (
        <div className="p-3 bg-bg-alt rounded-xl text-center">
            <div className={`font-heading text-xl font-bold ${color}`}>{value}</div>
            <div className="text-[0.7rem] text-text-muted mt-0.5">{label}</div>
        </div>
    );
}

function Badge({ status, children }) {
    const colors = {
        green: "bg-success/[0.08] text-success",
        yellow: "bg-accent/[0.12] text-[#8B7724]",
        red: "bg-danger/[0.08] text-danger",
        blue: "bg-info/[0.08] text-info",
    };
    return (
        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[0.72rem] font-semibold ${colors[status]}`}>
            {children}
        </span>
    );
}

function Table({ headers, rows }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-[0.82rem]">
                <thead>
                    <tr>
                        {headers.map((h) => (
                            <th key={h} className="text-left px-3 py-2.5 bg-bg-alt text-text-muted font-semibold text-[0.72rem] uppercase tracking-wider">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i}>
                            {row.map((cell, j) => (
                                <td key={j} className="px-3 py-3 border-b border-border-light last:border-b-0">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function ListItem({ icon: Icon, text, iconColor = "text-primary" }) {
    return (
        <div className="flex items-center gap-3 px-4 py-3 bg-bg-alt rounded-lg text-[0.85rem]">
            <Icon size={18} className={`${iconColor} shrink-0`} />
            <span>{text}</span>
        </div>
    );
}

export default function DashboardPreview() {
    const [activeScreen, setActiveScreen] = useState("dashboard");

    return (
        <section className="py-16 lg:py-24" id="features">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="text-center max-w-xl mx-auto mb-14 reveal">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary/[0.08] to-accent/[0.08] text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                        <LayoutDashboard size={16} /> Platform Preview
                    </span>
                    <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] leading-tight mb-4">
                        Your Entire Wedding.<br />
                        <span className="gradient-text">One Dashboard.</span>
                    </h2>
                    <p className="text-text-muted text-lg">Click through the features below. This is exactly what you&apos;ll get.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] bg-bg-card rounded-2xl shadow-xl border border-border-light overflow-hidden min-h-[520px] reveal">
                    {/* Sidebar */}
                    <div className="bg-gradient-to-b from-sidebar to-sidebar-hover p-0 overflow-y-auto lg:block hidden">
                        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.08] text-white font-heading font-semibold text-[1.05rem]">
                            <svg className="w-7 h-5" viewBox="0 0 40 28" fill="none">
                                <circle cx="13" cy="14" r="10" stroke="#fff" strokeWidth="2.5" fill="none" />
                                <circle cx="27" cy="14" r="10" stroke="#D4A843" strokeWidth="2.5" fill="none" />
                            </svg>
                            Vivaaham
                        </div>
                        <nav className="flex flex-col gap-0.5 p-2">
                            {navItems.map((item) => {
                                const Icon = ICON_MAP[item.icon];
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveScreen(item.id)}
                                        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-[0.82rem] font-medium transition-all text-left w-full ${activeScreen === item.id
                                                ? "text-white bg-accent/15 font-semibold"
                                                : "text-white/55 hover:text-white/85 hover:bg-white/[0.06]"
                                            }`}
                                    >
                                        <Icon size={18} className="shrink-0" />
                                        {item.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Mobile Tab Scroll */}
                    <div className="lg:hidden overflow-x-auto border-b border-border-light bg-bg-alt">
                        <div className="flex gap-1 p-2 min-w-max">
                            {navItems.map((item) => {
                                const Icon = ICON_MAP[item.icon];
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveScreen(item.id)}
                                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${activeScreen === item.id
                                                ? "bg-primary text-white font-semibold"
                                                : "text-text-muted hover:bg-bg-card"
                                            }`}
                                    >
                                        <Icon size={14} />
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 lg:p-7 overflow-y-auto animate-[fadeIn_0.3s_ease]">
                        <div key={activeScreen} className="animate-[fadeIn_0.35s_ease]">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-heading text-xl">{screens[activeScreen].title}</h3>
                                <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-primary/[0.08] text-primary">
                                    {screens[activeScreen].badge}
                                </span>
                            </div>
                            {screens[activeScreen].content}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
