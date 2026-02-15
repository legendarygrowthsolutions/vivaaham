"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { MOCK_EVENTS_TIMELINE } from "@/lib/mockData";

const EventContext = createContext();

export function EventProvider({ children }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initialize from LocalStorage or Mock Data
    useEffect(() => {
        const storedEvents = localStorage.getItem("vivaaham_events");
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
        } else {
            setEvents(MOCK_EVENTS_TIMELINE);
        }
        setLoading(false);
    }, []);

    // Persist to LocalStorage whenever events change
    useEffect(() => {
        if (!loading) {
            localStorage.setItem("vivaaham_events", JSON.stringify(events));
        }
    }, [events, loading]);

    const addEvent = (event) => {
        const newEvent = {
            id: Date.now(), // Simple ID generation
            status: "upcoming",
            ...event,
        };
        setEvents((prev) => [...prev, newEvent]);
        return newEvent;
    };

    const updateEvent = (id, updatedFields) => {
        setEvents((prev) =>
            prev.map((event) => (event.id === id ? { ...event, ...updatedFields } : event))
        );
    };

    const deleteEvent = (id) => {
        setEvents((prev) => prev.filter((event) => event.id !== id));
    };

    const getEventById = (id) => {
        return events.find((event) => event.id === id);
    };

    return (
        <EventContext.Provider
            value={{
                events: events.sort((a, b) => new Date(a.date) - new Date(b.date)), // Always sorted by date
                loading,
                addEvent,
                updateEvent,
                deleteEvent,
                getEventById,
            }}
        >
            {children}
        </EventContext.Provider>
    );
}

export function useEvents() {
    return useContext(EventContext);
}
