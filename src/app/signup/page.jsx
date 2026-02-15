"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { PLANS } from "@/lib/mockData";
import {
    User, Mail, Phone, Lock, Eye, EyeOff, Heart, Sparkles,
    CreditCard, CalendarDays, Tag, Check, ArrowLeft, ArrowRight,
    Shield, CheckCircle
} from "lucide-react";

const STEPS = ["Personal Details", "Wedding Details", "Choose Plan", "Payment", "Confirmation"];

export default function SignupPage() {
    const { signup } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "", email: "", phone: "", password: "",
        brideName: "", groomName: "", weddingDate: "",
        plan: "mangal",
        cardNumber: "", cardExpiry: "", cardCvc: "", cardName: "",
    });

    const update = (field, val) => setForm((p) => ({ ...p, [field]: val }));

    const canNext = () => {
        if (step === 0) return form.name && form.email && form.phone && form.password;
        if (step === 1) return form.brideName && form.groomName;
        if (step === 2) return form.plan;
        if (step === 3) return form.cardNumber && form.cardExpiry && form.cardCvc && form.cardName;
        return true;
    };

    const handleNext = () => {
        if (step === 3) {
            // Process dummy payment
            setLoading(true);
            setTimeout(() => {
                signup(form);
                setStep(4);
                setLoading(false);
            }, 2000);
            return;
        }
        setStep(step + 1);
    };

    const selectedPlan = PLANS.find((p) => p.id === form.plan);

    return (
        <div className="min-h-screen bg-gradient-to-br from-bg to-bg-alt flex items-center justify-center p-6">
            <div className="w-full max-w-lg">
                {/* Logo */}
                <div className="text-center mb-6">
                    <Link href="/" className="inline-flex items-center gap-2.5 font-heading text-[1.6rem] font-bold text-primary">
                        <svg className="w-9 h-6" viewBox="0 0 40 28" fill="none">
                            <circle cx="13" cy="14" r="10" stroke="#8B1A4A" strokeWidth="2.5" fill="none" />
                            <circle cx="27" cy="14" r="10" stroke="#D4A843" strokeWidth="2.5" fill="none" />
                        </svg>
                        Vivaaham
                    </Link>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    {STEPS.map((s, i) => (
                        <div key={s} className="flex items-center gap-2">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < step
                                        ? "bg-success text-white"
                                        : i === step
                                            ? "bg-gradient-to-r from-primary to-accent text-white scale-110"
                                            : "bg-border text-text-muted"
                                    }`}
                            >
                                {i < step ? <Check size={14} /> : i + 1}
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className={`w-6 h-0.5 ${i < step ? "bg-success" : "bg-border"}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Card */}
                <div className="bg-bg-card rounded-2xl shadow-xl border border-border-light p-8">
                    <h2 className="font-heading text-xl mb-1 text-center">{STEPS[step]}</h2>
                    <p className="text-sm text-text-muted text-center mb-7">
                        {step === 0 && "Tell us about yourself"}
                        {step === 1 && "Add the couple's details"}
                        {step === 2 && "Choose the perfect plan for your wedding"}
                        {step === 3 && "Complete payment to activate your account"}
                        {step === 4 && "You're all set!"}
                    </p>

                    {/* Step 0: Personal Details */}
                    {step === 0 && (
                        <div className="space-y-4">
                            <Field icon={User} label="Full Name" value={form.name} onChange={(v) => update("name", v)} placeholder="Rahul Sharma" />
                            <Field icon={Mail} label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="rahul@example.com" />
                            <Field icon={Phone} label="Phone" type="tel" value={form.phone} onChange={(v) => update("phone", v)} placeholder="+91 98765 43210" />
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium mb-2"><Lock size={16} className="text-primary" /> Password</label>
                                <div className="relative">
                                    <input type={showPw ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="Min 8 characters" className="w-full px-4 py-3.5 rounded-lg border border-border bg-bg text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all pr-12" />
                                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text">{showPw ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 1: Wedding Details */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <Field icon={Heart} label="Bride's Name" value={form.brideName} onChange={(v) => update("brideName", v)} placeholder="Priya" />
                            <Field icon={Sparkles} label="Groom's Name" value={form.groomName} onChange={(v) => update("groomName", v)} placeholder="Arjun" />
                            <Field icon={CalendarDays} label="Wedding Date (optional)" type="date" value={form.weddingDate} onChange={(v) => update("weddingDate", v)} />
                        </div>
                    )}

                    {/* Step 2: Plan Selection */}
                    {step === 2 && (
                        <div className="space-y-3">
                            {PLANS.map((plan) => (
                                <button
                                    key={plan.id}
                                    onClick={() => update("plan", plan.id)}
                                    className={`w-full p-5 rounded-xl border-2 text-left transition-all ${form.plan === plan.id
                                            ? "border-primary bg-primary/[0.03] shadow-md"
                                            : "border-border-light hover:border-border"
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-0.5">
                                        <h3 className="font-heading text-lg">{plan.name}</h3>
                                        <span className="font-heading text-xl font-bold text-primary">{plan.price}</span>
                                    </div>
                                    <p className="text-xs text-text-muted mb-3">{plan.tagline}</p>
                                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                                        {plan.features.slice(0, 3).map((f) => (
                                            <span key={f} className="text-xs text-text-muted flex items-center gap-1">
                                                <Check size={12} className="text-success" /> {f}
                                            </span>
                                        ))}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Step 3: Payment */}
                    {step === 3 && (
                        <div className="space-y-4">
                            <div className="bg-bg-alt rounded-xl p-4 mb-2 flex items-center justify-between">
                                <div>
                                    <span className="text-xs text-text-muted">{selectedPlan?.name} Plan</span>
                                    <div className="font-heading text-xl font-bold text-primary">{selectedPlan?.price}</div>
                                </div>
                                <Tag size={24} className="text-accent" />
                            </div>
                            <div className="bg-info/[0.05] border border-info/10 text-info text-xs px-4 py-3 rounded-lg flex items-center gap-2">
                                <Shield size={16} />
                                <span>This is a <strong>demo payment</strong>. No real charges will be made.</span>
                            </div>
                            <Field icon={User} label="Cardholder Name" value={form.cardName} onChange={(v) => update("cardName", v)} placeholder="Rahul Sharma" />
                            <Field icon={CreditCard} label="Card Number" value={form.cardNumber} onChange={(v) => update("cardNumber", v)} placeholder="4242 4242 4242 4242" />
                            <div className="grid grid-cols-2 gap-4">
                                <Field icon={CalendarDays} label="Expiry" value={form.cardExpiry} onChange={(v) => update("cardExpiry", v)} placeholder="MM/YY" />
                                <Field icon={Lock} label="CVC" value={form.cardCvc} onChange={(v) => update("cardCvc", v)} placeholder="123" />
                            </div>
                        </div>
                    )}

                    {/* Step 4: Confirmation */}
                    {step === 4 && (
                        <div className="text-center py-6">
                            <div className="w-20 h-20 mx-auto mb-5 bg-success/10 rounded-full flex items-center justify-center animate-[fadeInUp_0.5s_ease]">
                                <CheckCircle size={40} className="text-success" />
                            </div>
                            <h3 className="font-heading text-2xl mb-2">Shubh Aarambh! 🎉</h3>
                            <p className="text-text-muted text-sm mb-6">
                                Welcome to Vivaaham, {form.name}! Your {selectedPlan?.name} plan is active.<br />
                                Let&apos;s start planning the wedding of <strong>{form.brideName}</strong> & <strong>{form.groomName}</strong>.
                            </p>
                            <button
                                onClick={() => router.push("/dashboard")}
                                className="btn-gradient px-8 py-4 rounded-lg font-semibold text-base inline-flex items-center gap-2"
                            >
                                Go to Dashboard <ArrowRight size={18} />
                            </button>
                        </div>
                    )}

                    {/* Navigation */}
                    {step < 4 && (
                        <div className="flex items-center justify-between mt-8">
                            {step > 0 ? (
                                <button onClick={() => setStep(step - 1)} className="text-text-muted hover:text-text font-medium text-sm flex items-center gap-1.5">
                                    <ArrowLeft size={16} /> Back
                                </button>
                            ) : (
                                <span />
                            )}
                            <button
                                onClick={handleNext}
                                disabled={!canNext() || loading}
                                className="btn-gradient px-6 py-3 rounded-lg font-semibold text-sm inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                                ) : step === 3 ? (
                                    <><CreditCard size={16} /> Pay {selectedPlan?.price}</>
                                ) : (
                                    <>Next <ArrowRight size={16} /></>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {step < 4 && (
                    <p className="text-center text-sm text-text-muted mt-5">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
                    </p>
                )}
            </div>
        </div>
    );
}

function Field({ icon: Icon, label, value, onChange, placeholder, type = "text" }) {
    return (
        <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Icon size={16} className="text-primary" /> {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-3.5 rounded-lg border border-border bg-bg text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
        </div>
    );
}
