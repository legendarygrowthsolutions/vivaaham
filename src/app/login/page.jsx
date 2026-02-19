"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles } from "lucide-react";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await login(email, password);
            if (res.success) {
                router.push("/dashboard");
            } else {
                setError(res.error || "Login failed");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-bg to-bg-alt flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2.5 font-heading text-[1.6rem] font-bold text-primary">
                        <svg className="w-9 h-6" viewBox="0 0 40 28" fill="none">
                            <circle cx="13" cy="14" r="10" stroke="#8B1A4A" strokeWidth="2.5" fill="none" />
                            <circle cx="27" cy="14" r="10" stroke="#D4A843" strokeWidth="2.5" fill="none" />
                        </svg>
                        Vivaaham
                    </Link>
                    <p className="text-sm text-text-muted mt-2">Welcome back to your wedding command centre</p>
                </div>

                {/* Card */}
                <div className="bg-bg-card rounded-2xl shadow-xl border border-border-light p-8">
                    <h2 className="font-heading text-xl mb-6 text-center">Sign In</h2>

                    {error && (
                        <div className="bg-danger/[0.06] text-danger text-sm px-4 py-3 rounded-lg mb-5 text-center font-medium">
                            {error}
                        </div>
                    )}

                    {/* Demo Credentials */}
                    <div className="bg-info/[0.05] border border-info/10 text-info text-xs px-4 py-3 rounded-lg mb-5">
                        <strong>Demo:</strong> rahul@example.com / demo123
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                <Mail size={16} className="text-primary" /> Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full px-4 py-3.5 rounded-lg border border-border bg-bg text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium mb-2">
                                <Lock size={16} className="text-primary" /> Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPw ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full px-4 py-3.5 rounded-lg border border-border bg-bg text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
                                >
                                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-gradient w-full py-4 rounded-lg font-semibold text-base inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                            ) : (
                                <>
                                    <LogIn size={18} /> Sign In
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-text-muted mt-6">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-primary font-semibold hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
