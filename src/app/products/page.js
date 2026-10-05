"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { getAllTeas, getTeaPrice } from "@/lib/teaApi";

const slides = [
  { src: "/images/hero1.jpg", label: "Tea Collection " },
  { src: "/images/teablack.jpg", label: "Black Tea" },
  { src: "/images/herbaltea.jpg", label: "Herbal Tea" },
];

/* ── Fallback image for broken Wikimedia URLs ── */
const FALLBACK_IMG = "/images/hero.jpg";

/* ── Caffeine level colour badges ── */
const caffeineBadge = {
  none: { bg: "#E8F5E9", text: "#2E7D32", label: "No Caffeine" },
  low: { bg: "#FFF8E1", text: "#F9A825", label: "Low Caffeine" },
  medium: { bg: "#FFF3E0", text: "#EF6C00", label: "Medium Caffeine" },
  high: { bg: "#FFEBEE", text: "#C62828", label: "High Caffeine" },
};

export default function Products() {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);

  /* ── API state ── */
  const [teas, setTeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ── Filter & search state ── */
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  /* ── Fetch teas on mount ── */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getAllTeas();
        if (!cancelled) setTeas(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  /* ── Auto-advance carousel every 4 s ── */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  /* ── Derive sidebar categories from fetched data ── */
  const sidebarFilters = (() => {
    const typeMap = new Map();
    const categoryMap = new Map();
    teas.forEach((t) => {
      const teaType = t.tea_type || t.base_type;
      if (teaType) typeMap.set(teaType.slug, teaType.name);
      if (t.category) categoryMap.set(t.category.slug, t.category.name);
    });
    return {
      types: [...typeMap.entries()],       // [[slug, name], ...]
      categories: [...categoryMap.entries()],
    };
  })();

  /* ── Apply filters ── */
  const filteredTeas = teas.filter((t) => {
    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        t.name.toLowerCase().includes(q) ||
        (t.origin || "").toLowerCase().includes(q) ||
        (t.description || "").toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }
    // Category / Type filter
    if (activeFilter === "all") return true;
    const typeSlug = t.tea_type?.slug || t.base_type?.slug || "";
    const catSlug = t.category?.slug || "";
    return typeSlug === activeFilter || catSlug === activeFilter;
  });

  return (
    <>
      <Navbar />

      {/* ── Carousel ── */}
      <div className="relative w-full h-[400px] overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <img
              src={slide.src}
              alt={slide.label}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-2xl font-semibold tracking-wide drop-shadow-lg">
              {slide.label}
            </p>
          </div>
        ))}

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center transition"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center transition"
          aria-label="Next"
        >
          ›
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-2.5 h-2.5 rounded-full transition-all"
              style={{ background: i === current ? "#fff" : "rgba(255,255,255,0.4)" }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Products section ── */}
      <main className="pb-16 bg-[#FBF5EF]">
        <h1 className="text-5xl font-bold text-[#3B6B4A] pt-10 text-center">
          Our Products
        </h1>
        <p className="mt-4 text-[#5C6650] text-lg text-center">
          Explore our range of premium organic tea.
        </p>

        {/* ── Search Bar ── */}
        <div className="max-w-md mx-auto mt-6 px-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5C6650]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </span>
            <input
              id="products-search"
              type="text"
              placeholder="Search teas by name, origin…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E8DFCF] bg-white text-sm text-[#2D4A38] placeholder-[#A0A08B] focus:outline-none focus:ring-2 focus:ring-[#3B6B4A]/30 focus:border-[#3B6B4A] transition shadow-sm"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mt-10 max-w-7xl mx-auto px-4 lg:px-6 items-start">

          {/* ── Sidebar ── */}
          <aside className="w-full md:w-52 shrink-0 rounded-2xl overflow-hidden shadow-sm" style={{ background: "#fff", border: "1px solid #E8DFCF" }}>

            {/* Tea Types */}
            <div className="border-b" style={{ borderColor: "#E8DFCF" }}>
              <p className="px-5 py-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#3B6B4A", background: "#F5EEE3" }}>
                Collections
              </p>
              <ul className="py-2">
                {/* "All Teas" always at top */}
                <li>
                  <button
                    id="filter-all"
                    onClick={() => setActiveFilter("all")}
                    className="w-full text-left px-5 py-2 text-sm transition-colors"
                    style={{
                      color: activeFilter === "all" ? "#fff" : "#5C6650",
                      background: activeFilter === "all" ? "#3B6B4A" : "transparent",
                    }}
                  >
                    All Teas
                  </button>
                </li>
                {sidebarFilters.types.map(([slug, name]) => (
                  <li key={slug}>
                    <button
                      id={`filter-${slug}`}
                      onClick={() => setActiveFilter(slug)}
                      className="w-full text-left px-5 py-2 text-sm transition-colors"
                      style={{
                        color: activeFilter === slug ? "#fff" : "#5C6650",
                        background: activeFilter === slug ? "#3B6B4A" : "transparent",
                      }}
                    >
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <p className="px-5 py-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#3B6B4A", background: "#F5EEE3" }}>
                Category
              </p>
              <ul className="py-2">
                {sidebarFilters.categories.map(([slug, name]) => (
                  <li key={slug}>
                    <button
                      id={`filter-cat-${slug}`}
                      onClick={() => setActiveFilter(slug)}
                      className="w-full text-left px-5 py-2 text-sm transition-colors"
                      style={{
                        color: activeFilter === slug ? "#fff" : "#5C6650",
                        background: activeFilter === slug ? "#3B6B4A" : "transparent",
                      }}
                    >
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </aside>

          {/* ── Product Grid ── */}
          <div className="flex-1 w-full">

            {/* Loading state */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-[#E8DFCF] shadow-md bg-white animate-pulse">
                    <div className="h-44 bg-[#E8DFCF]" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-[#E8DFCF] rounded w-3/4" />
                      <div className="h-3 bg-[#E8DFCF] rounded w-1/2" />
                      <div className="flex gap-2 mt-4">
                        <div className="h-8 bg-[#E8DFCF] rounded-lg flex-1" />
                        <div className="h-8 bg-[#E8DFCF] rounded-lg flex-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="text-center py-20">
                <p className="text-red-600 text-lg font-semibold">Failed to load teas</p>
                <p className="text-[#5C6650] mt-2 text-sm">{error}</p>
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && filteredTeas.length === 0 && (
              <div className="text-center py-20">
                <p className="text-[#5C6650] text-lg">No teas match your search.</p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveFilter("all"); }}
                  className="mt-4 text-[#3B6B4A] underline text-sm"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Tea cards */}
            {!loading && !error && filteredTeas.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeas.map((tea) => {
                  const price = getTeaPrice(tea);
                  const badge = caffeineBadge[tea.caffeine_level] || caffeineBadge.medium;

                  return (
                    <div
                      key={tea.id}
                      className="rounded-2xl overflow-hidden border border-[#E8DFCF] shadow-md bg-white flex flex-col group transition-shadow hover:shadow-xl"
                    >
                      {/* Image */}
                      <div className="relative h-44 overflow-hidden bg-[#E8DFCF]">
                        <img
                          src={tea.image_url}
                          alt={tea.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => { e.target.src = FALLBACK_IMG; }}
                        />
                        {/* Caffeine badge */}
                        <span
                          className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                          style={{ background: badge.bg, color: badge.text }}
                        >
                          {badge.label}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="p-4 flex flex-col gap-2 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-[#2D4A38] font-semibold text-sm">{tea.name}</p>
                          <span className="text-[#3B6B4A] font-bold text-sm">{price}</span>
                        </div>

                        {/* Origin */}
                        {tea.origin && (
                          <p className="text-[10px] text-[#8A8A75] tracking-wide">
                            📍 {tea.origin}
                          </p>
                        )}

                        {/* Characteristics tags */}
                        {tea.characteristics && tea.characteristics.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {tea.characteristics.slice(0, 3).map((c) => (
                              <span
                                key={c.id}
                                className="text-[10px] px-2 py-0.5 rounded-full border border-[#E8DFCF] text-[#5C6650] bg-[#F9F5EF]"
                              >
                                {c.name}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Spacer to push buttons to bottom */}
                        <div className="flex-1" />

                        {/* Buttons */}
                        <div className="flex gap-2 mt-2">
                          <button
                            id={`add-to-cart-${tea.slug}`}
                            onClick={() =>
                              dispatch(
                                addToCart({
                                  name: tea.name,
                                  price,
                                  src: tea.image_url || FALLBACK_IMG,
                                })
                              )
                            }
                            className="flex-1 py-2 text-xs font-semibold rounded-lg border-2 border-[#3B6B4A] text-[#3B6B4A] hover:bg-[#3B6B4A] hover:text-white transition-all duration-200"
                          >
                            Add to Cart
                          </button>

                          <Link
                            id={`view-${tea.slug}`}
                            href={`/products/${tea.slug}`}
                            className="flex-1 py-2 text-xs font-semibold rounded-lg bg-[#3B6B4A] text-white hover:bg-[#2D4A38] transition-all duration-200 text-center"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
