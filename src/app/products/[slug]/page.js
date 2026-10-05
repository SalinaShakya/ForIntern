"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { getTeaBySlug, getTeaPrice } from "@/lib/teaApi";
import YouMayLike from "@/components/youmaylike";

const FALLBACK_IMG = "/images/hero.jpg";

const caffeineBadge = {
  none: { bg: "#E8F5E9", text: "#2E7D32", label: "Caffeine Free" },
  low: { bg: "#FFF8E1", text: "#F9A825", label: "Low Caffeine" },
  medium: { bg: "#FFF3E0", text: "#EF6C00", label: "Medium Caffeine" },
  high: { bg: "#FFEBEE", text: "#C62828", label: "High Caffeine" },
};

export default function TeaDetailPage() {
  const dispatch = useDispatch(); //gives access to redux dispatch function send instruction to redux
  const params = useParams(); //extracts the dynamic param in url("slug")
  const slug = params?.slug;

  const [tea, setTea] = useState(null); //stores fetched data
  const [loading, setLoading] = useState(true); //loading UI
  const [error, setError] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await getTeaBySlug(slug);
        if (!cancelled) {
          setTea(data);
          setImgSrc(data.image_url);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-10 animate-pulse">
            <div className="h-[450px] bg-[#E8DFCF] rounded-2xl" />
            <div className="space-y-4">
              <div className="h-8 bg-[#E8DFCF] rounded w-3/4" />
              <div className="h-4 bg-[#E8DFCF] rounded w-1/2" />
              <div className="h-24 bg-[#E8DFCF] rounded" />
              <div className="h-10 bg-[#E8DFCF] rounded w-1/3" />
              <div className="flex gap-4 mt-8">
                <div className="h-12 bg-[#E8DFCF] rounded-xl flex-1" />
                <div className="h-12 bg-[#E8DFCF] rounded-xl flex-1" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  /* ── Error state ── */
  if (error || !tea) {
    return (
      <>
        <Navbar />
        <main className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-[#3B6B4A] mb-4">Tea Not Found</h2>
          <p className="text-[#5C6650] mb-6">{error || "We couldn't find that tea."}</p>
          <Link href="/products" className="text-[#3B6B4A] underline font-semibold">
            ← Back to Products
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const price = getTeaPrice(tea);
  const badge = caffeineBadge[tea.caffeine_level] || caffeineBadge.medium;

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-25">

        {/* ── Breadcrumb ── */}
        <nav className="mb-6 text-sm text-[#8A8A75]">
          <Link href="/products" className="hover:text-[#3B6B4A] transition-colors">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-[#2D4A38] font-medium">{tea.name}</span>
        </nav>

        {/* ── Product Section ── */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left — Image */}
          <div className="relative">
            <img
              src={imgSrc || FALLBACK_IMG}
              alt={tea.name}
              className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
              onError={() => setImgSrc(FALLBACK_IMG)}
            />
            {/* Caffeine badge */}
            <span
              className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ background: badge.bg, color: badge.text }}
            >
              {badge.label}
            </span>
          </div>

          {/* Right — Details */}
          <div>
            <h2 className="text-4xl font-bold mb-2">{tea.name}</h2>

            <p className="text-sm text-gray-500 mb-1">
              {tea.category?.name}{tea.tea_type ? ` • ${tea.tea_type.name}` : ""}
            </p>

            {tea.origin && (
              <p className="text-sm text-gray-500 mb-4">
                📍 {tea.origin}
              </p>
            )}

            {/* Characteristics tags */}
            {tea.characteristics && tea.characteristics.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tea.characteristics.map((c) => (
                  <span
                    key={c.id}
                    className="text-xs px-3 py-1 rounded-full border border-[#E8DFCF] text-[#5C6650] bg-[#F9F5EF]"
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            )}

            <p className="text-gray-700 leading-8 mb-6">
              {tea.description}
            </p>

            {/* Health benefits */}
            {tea.health_benefits && tea.health_benefits.length > 0 && (
              <div className="mb-6">
                <span className="font-semibold text-[#3B6B4A] text-sm">Health Benefits: </span>
                <span className="text-sm text-gray-600">
                  {tea.health_benefits.map((h) => h.name).join(" · ")}
                </span>
              </div>
            )}

            <p className="text-4xl font-bold text-[#3B6B4A] mb-8">
              {price}
            </p>

            <div className="flex gap-4">
              <button
                id={`add-to-cart-${tea.slug}`}
                onClick={() =>
                  dispatch(
                    addToCart({
                      name: tea.name,
                      price,
                      src: imgSrc || FALLBACK_IMG,
                    })
                  )
                }
                className="flex-1 py-3 rounded-xl border-2 border-[#3B6B4A] text-[#3B6B4A] font-semibold hover:bg-[#3B6B4A] hover:text-white transition"
              >
                🛒 Add to Cart
              </button>

              <Link
                href="/checkout"
                className="flex-1 flex items-center justify-center py-3 rounded-xl bg-[#3B6B4A] text-white font-semibold hover:bg-[#2D4A38] transition"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>

        {/* ── Bottom Section ── */}
        <div className="mt-16 border-t border-gray-300 pt-10 flex flex-col md:flex-row gap-12">
          {/* Ingredients */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[#3B6B4A] mb-4">
              Ingredients
            </h3>
            {tea.composition && tea.composition.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700 leading-8">
                {tea.composition.map((c, i) => (
                  <li key={i}>
                    {c.amount} {c.ingredient?.name}
                    {c.ingredient?.description && (
                      <span className="text-xs text-gray-500 block ml-6">
                        {c.ingredient.description}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No ingredient data available.</p>
            )}
          </div>

          {/* Flavor Profile */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[#3B6B4A] mb-4">
              Flavor Profile
            </h3>
            {tea.characteristics && tea.characteristics.length > 0 ? (
              <p className="text-gray-700 leading-8">
                {tea.characteristics.map((c) => c.name).join(" · ")}
              </p>
            ) : (
              <p className="text-gray-500 text-sm">No flavor data available.</p>
            )}
          </div>

          {/* Brewing Guide */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[#3B6B4A] mb-4">
              Brewing Guide
            </h3>
            <div className="text-gray-700 leading-8 space-y-1">
              {tea.temperature_celsius && (
                <p>🌡️ {tea.temperature_celsius}°C water</p>
              )}
              {tea.steeping_time_minutes && (
                <p>⏱️ Steep for {tea.steeping_time_minutes} min</p>
              )}
              {tea.brewing_instructions && (
                <p className="text-sm text-gray-600 mt-2">
                  {tea.brewing_instructions}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        <YouMayLike />
      </main>

      <Footer />
    </>
  );
}
