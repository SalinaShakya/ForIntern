"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Mail() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("Thank you for subscribing! We'll keep in touch.");

    const supabase = createClient();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const cleanEmail = email.trim().toLowerCase();

        if (!cleanEmail) {
            setError("Please enter your email address.");
            return;
        }

        // Standard email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanEmail)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            setLoading(true);

            const { error: insertError } = await supabase
                .from("newsletter_subscribers")
                .insert([{ email: cleanEmail }]);

            if (insertError) {
                // Code 23505 is PostgreSQL unique constraint violation (already subscribed)
                if (insertError.code === "23505") {
                    setSuccessMessage("You are already subscribed! We'll keep you updated.");
                    setSubmitted(true);
                    return;
                }
                throw insertError;
            }

            setSuccessMessage("✨ Thank you for subscribing! We'll keep in touch.");
            setSubmitted(true);
            setEmail("");
        } catch (err) {
            console.error("Newsletter subscription error:", err);
            setError(err.message || "Failed to subscribe. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-[#FBF5EF] py-16 px-6 border-t border-[#FBF5EF]/10">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-[#2C3A1E] text-3xl font-bold mb-3 tracking-wide">
                    Stay in Touch
                </h2>
                <p className="text-[#5C6650] max-w-lg mx-auto mb-8 text-base leading-relaxed">
                    Subscribe to our newsletter to receive updates on seasonal Himalayan harvests, exclusive blend launches, and wellness tips.
                </p>

                {submitted ? (
                    <div className="bg-white/80 border border-[#3B6B4A]/20 py-4 px-6 rounded-xl max-w-md mx-auto shadow-sm">
                        <p className="text-[#3B6B4A] font-semibold text-sm">
                            {successMessage}
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                disabled={loading}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError("");
                                }}
                                className="flex-1 px-5 py-3 rounded-xl bg-white border border-[#E8DFCF] focus:outline-none focus:border-[#3B6B4A] text-black placeholder:text-gray-400 shadow-sm transition-all text-sm disabled:opacity-60"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 rounded-xl bg-[#3B6B4A] hover:bg-[#2C3A1E] text-white font-bold transition-all duration-300 text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                        Subscribing...
                                    </>
                                ) : (
                                    "Subscribe"
                                )}
                            </button>
                        </div>
                        {error && (
                            <p className="text-red-600 text-xs font-semibold mt-2.5 text-center">
                                {error}
                            </p>
                        )}
                    </form>
                )}
            </div>
        </section>
    );
}
