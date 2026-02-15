"use client";
import { MOCK_ITINERARY } from "@/lib/mockData";
import { ScrollText, Calendar, Clock, User } from "lucide-react";
import { useState } from "react";

export default function ItineraryPage() {
    const [activeEvent, setActiveEvent] = useState(0);

    return (
        <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
            <div>
                <h2 className="font-heading text-xl font-semibold flex items-center gap-2"><ScrollText size={22} className="text-primary" /> Ceremony Script / Itinerary</h2>
                <p className="text-sm text-text-muted mt-0.5">Detailed event-by-event schedule with roles and responsibilities</p>
            </div>

            {/* Event Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {MOCK_ITINERARY.map((ev, i) => (
                    <button
                        key={ev.id}
                        onClick={() => setActiveEvent(i)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeEvent === i ? "bg-primary text-white" : "bg-bg-card border border-border-light text-text-muted hover:border-primary"
                            }`}
                    >
                        {ev.event}
                    </button>
                ))}
            </div>

            {/* Selected Event */}
            <div className="bg-bg-card rounded-xl border border-border-light p-5">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/[0.08] rounded-lg flex items-center justify-center">
                        <Calendar size={20} className="text-primary" />
                    </div>
                    <div>
                        <h3 className="font-heading text-lg font-semibold">{MOCK_ITINERARY[activeEvent].event}</h3>
                        <span className="text-sm text-text-muted">{MOCK_ITINERARY[activeEvent].date}</span>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-border-light" />
                    <div className="space-y-4">
                        {MOCK_ITINERARY[activeEvent].timeSlots.map((slot, i) => (
                            <div key={i} className="flex gap-4 relative">
                                <div className="w-9 h-9 bg-bg rounded-full border-2 border-primary flex items-center justify-center z-10 shrink-0">
                                    <Clock size={14} className="text-primary" />
                                </div>
                                <div className="flex-1 bg-bg-alt rounded-lg p-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                        <span className="font-medium text-sm">{slot.activity}</span>
                                        <span className="text-xs font-bold text-primary">{slot.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-1 text-xs text-text-muted">
                                        <User size={12} /> {slot.responsible}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
