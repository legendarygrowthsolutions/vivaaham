"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "vivaaham_user";

// Demo users for testing
const DEMO_USERS = [
    {
        id: "1",
        name: "Rahul Sharma",
        email: "rahul@example.com",
        password: "demo123",
        phone: "+91 98765 43210",
        brideName: "Priya",
        groomName: "Arjun",
        plan: "mangal",
        role: "admin",
        modules: [
            "dashboard", "guests", "venues", "vendors", "food", "decor",
            "budget", "travel", "gifts", "tasks", "invitations", "team",
            "timeline", "activity", "itinerary", "reports"
        ],
        weddingDate: "2026-03-15",
    },
];

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch { }
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Check demo users first
        const demoUser = DEMO_USERS.find(
            (u) => u.email === email && u.password === password
        );
        if (demoUser) {
            const { password: _, ...userData } = demoUser;
            setUser(userData);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
            return { success: true };
        }

        // Check localStorage for signed-up users
        const allUsers = JSON.parse(localStorage.getItem("vivaaham_all_users") || "[]");
        const found = allUsers.find(
            (u) => u.email === email && u.password === password
        );
        if (found) {
            const { password: _, ...userData } = found;
            setUser(userData);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
            return { success: true };
        }

        return { success: false, error: "Invalid email or password" };
    };

    const signup = (data) => {
        const newUser = {
            id: Date.now().toString(),
            name: data.name,
            email: data.email,
            phone: data.phone,
            brideName: data.brideName,
            groomName: data.groomName,
            plan: data.plan,
            role: "admin",
            modules: [
                "dashboard", "guests", "venues", "vendors", "food", "decor",
                "budget", "travel", "gifts", "tasks", "invitations", "team",
                "timeline", "activity", "itinerary", "reports"
            ],
            weddingDate: data.weddingDate || "",
        };

        // Store with password for login
        const allUsers = JSON.parse(localStorage.getItem("vivaaham_all_users") || "[]");
        allUsers.push({ ...newUser, password: data.password });
        localStorage.setItem("vivaaham_all_users", JSON.stringify(allUsers));

        // Set current user (without password)
        setUser(newUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
    };

    const updateUser = (updates) => {
        const updated = { ...user, ...updates };
        setUser(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}
