
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, ArrowRight } from "lucide-react";

export default function GuestLoginPage() {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const supabase = createClient();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Check if guest exists with this phone number
            const { data, error } = await supabase
                .from('guests')
                .select('*')
                .eq('phone', phone)
                .maybeSingle();

            if (error) throw error;

            if (!data) {
                setError("No invitation found for this phone number. Please contact the couple.");
                setLoading(false);
                return;
            }

            // Store guest info in localStorage for this session
            localStorage.setItem('guest_token', JSON.stringify({
                id: data.id,
                name: data.name,
                weddingId: data.wedding_id,
                phone: data.phone
            }));

            // Redirect to portal dashboard
            router.push('/portal/dashboard');

        } catch (err) {
            console.error("Login error:", err);
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg p-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-[0.03] z-0 pointer-events-none"></div>
            <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] z-0"></div>

            <div className="w-full max-w-md bg-bg-card border border-border-light rounded-2xl shadow-xl p-8 relative z-10 animate-[fadeIn_0.5s_ease]">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
                    </div>
                    <h1 className="font-heading text-2xl font-bold text-text mb-2">Guest Access</h1>
                    <p className="text-text-muted text-sm">Enter your phone number to view your invitation and wedding details.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase text-text-muted mb-1.5">Phone Number</label>
                        <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="e.g. 9876543210"
                            className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-text focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-danger/10 text-danger text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !phone}
                        className="w-full btn-gradient py-3.5 rounded-xl font-semibold text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>Access Invitation <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
                    </button>
                </form>

                <p className="text-center text-xs text-text-light mt-6">
                    Protected by Vivaaham &copy; {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
}
