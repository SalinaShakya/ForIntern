"use client";

import { useState } from "react";

export default function Mail() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter your email address.");
            return;
        }
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setSubmitted(true);
        setError("");
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
                            ✨ Thank you for subscribing! We'll keep in touch.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError("");
                                }}
                                className="flex-1 px-5 py-3 rounded-xl bg-white border border-[#E8DFCF] focus:outline-none focus:border-[#3B6B4A] text-black placeholder:text-gray-400 shadow-sm transition-all text-sm"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 rounded-xl bg-[#3B6B4A] hover:bg-[#2C3A1E] text-white font-bold transition-all duration-300 text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Subscribe
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
