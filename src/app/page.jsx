"use client";

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import DashboardPreview from "@/components/landing/DashboardPreview";
import HowItWorks from "@/components/landing/HowItWorks";
import FamilySection from "@/components/landing/FamilySection";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import DemoForm from "@/components/landing/DemoForm";
import Footer from "@/components/landing/Footer";
import useScrollReveal from "@/lib/useScrollReveal";

export default function Home() {
    useScrollReveal();

    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <DashboardPreview />
                <HowItWorks />
                <FamilySection />
                <Testimonials />
                <Pricing />
                <FAQ />
                <DemoForm />
            </main>
            <Footer />
        </>
    );
}
