"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { getAllTeas, getTeaPrice } from "@/lib/teaApi";

const FALLBACK_IMG = "/images/hero.jpg";

/* Caffeine level colour badges matching products page */
const caffeineBadge = {
  none: { bg: "#E8F5E9", text: "#2E7D32", label: "No Caffeine" },
  low: { bg: "#FFF8E1", text: "#F9A825", label: "Low Caffeine" },
  medium: { bg: "#FFF3E0", text: "#EF6C00", label: "Medium Caffeine" },
  high: { bg: "#FFEBEE", text: "#C62828", label: "High Caffeine" },
};

/* Resilient fallback teas in case network or external API is offline */
const FALLBACK_TEAS = [
  {
    id: 1,
    name: "Himalayan Black Tea",
    slug: "black-tea",
    image_url: "/images/teablack.jpg",
    caffeine_level: "high",
    origin: "Ilam, Nepal",
    tea_type: { name: "Black Tea", slug: "black" },
  },
  {
    id: 2,
    name: "Organic Green Tea",
    slug: "green-tea",
    image_url: "/images/teagreen.jpg",
    caffeine_level: "low",
    origin: "Dhankuta, Nepal",
    tea_type: { name: "Green Tea", slug: "green" },
  },
  {
    id: 3,
    name: "Wild Herbal Infusion",
    slug: "herbal-tea",
    image_url: "/images/herbaltea.jpg",
    caffeine_level: "none",
    origin: "Solukhumbu, Nepal",
    tea_type: { name: "Herbal Tea", slug: "herbal" },
  },
  {
    id: 4,
    name: "Highland Oolong Tea",
    slug: "oolong-tea",
    image_url: "/images/oolongtea.jpg",
    caffeine_level: "medium",
    origin: "Kanyam, Nepal",
    tea_type: { name: "Oolong Tea", slug: "oolong" },
  },
  {
    id: 5,
    name: "Silver Needle White Tea",
    slug: "white-tea",
    image_url: "/images/whitetea.jpg",
    caffeine_level: "low",
    origin: "Panchthar, Nepal",
    tea_type: { name: "White Tea", slug: "white" },
  },
  {
    id: 6,
    name: "Spiced Masala Chiya",
    slug: "masala-tea",
    image_url: "/images/masalatea.jpg",
    caffeine_level: "medium",
    origin: "Kathmandu Valley, Nepal",
    tea_type: { name: "Black Tea", slug: "black" },
  },
];

export default function CollectionCarousel() {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const [teas, setTeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  /* Fetch teas from the API on mount, similar to the Products page */
  useEffect(() => {
    let cancelled = false;

    async function loadTeas() {
      try {
        const data = await getAllTeas();
        if (!cancelled) {
          if (Array.isArray(data) && data.length > 0) {
            setTeas(data);
          } else {
            setTeas(FALLBACK_TEAS);
          }
        }
      } catch (err) {
        console.warn("Could not load teas from API for collection carousel, using fallback teas:", err);
        if (!cancelled) {
          setTeas(FALLBACK_TEAS);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadTeas();
    return () => {
      cancelled = true;
    };
  }, []);

  /* Check scroll boundaries to show/hide left and right arrows */
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 15);
      setShowRight(scrollLeft < scrollWidth - clientWidth - 15);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      checkScroll();
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [teas, loading]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      // Scroll by 1-2 cards width for smooth pagination
      const offset = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto px-10 sm:px-14 lg:px-16 mt-8">
      {/* Left Navigation Arrow - positioned outside the card track to prevent overlapping */}
      <button
        onClick={() => scroll("left")}
        disabled={!showLeft}
        className={`absolute left-0 sm:left-1 md:left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white border border-[#E8DFCF] shadow-lg text-[#3B6B4A] hover:bg-[#3B6B4A] hover:text-white transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none cursor-pointer`}
        aria-label="Scroll Left"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 no-scrollbar"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Loading skeleton state */}
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-[260px] sm:w-[280px] shrink-0 snap-start rounded-2xl overflow-hidden border border-[#E8DFCF] shadow-md bg-white animate-pulse"
            >
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

        {/* Loaded Teas from API */}
        {!loading &&
          teas.map((tea) => {
            const price = getTeaPrice(tea);
            const badge = caffeineBadge[tea.caffeine_level] || caffeineBadge.medium;
            const productHref = `/products/${tea.slug}`;

            return (
              <div
                key={tea.id || tea.slug}
                className="w-[260px] sm:w-[280px] shrink-0 snap-start rounded-2xl overflow-hidden border border-[#E8DFCF] shadow-md bg-white flex flex-col group transition-all duration-300 hover:shadow-xl hover:border-[#3B6B4A]/40"
              >
                {/* Image Section */}
                <Link href={productHref} className="relative h-44 overflow-hidden bg-[#E8DFCF] block">
                  <img
                    src={tea.image_url || FALLBACK_IMG}
                    alt={tea.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMG;
                    }}
                  />
                  {/* Caffeine badge */}
                  <span
                    className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm"
                    style={{ background: badge.bg, color: badge.text }}
                  >
                    {badge.label}
                  </span>
                </Link>

                {/* Info & Content Section */}
                <div className="p-4 flex flex-col gap-2 flex-1 justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={productHref}
                        className="text-[#2D4A38] font-semibold text-sm line-clamp-1 hover:text-[#3B6B4A] transition-colors"
                        title={tea.name}
                      >
                        {tea.name}
                      </Link>
                      <span className="text-[#3B6B4A] font-bold text-sm shrink-0">{price}</span>
                    </div>

                    {/* Origin / Type */}
                    <p className="text-[11px] text-[#8A8A75] tracking-wide mt-1 truncate">
                      {tea.origin ? `📍 ${tea.origin}` : tea.tea_type?.name || "Himalayan Blend"}
                    </p>
                  </div>

                  {/* Action Buttons matching products page */}
                  <div className="flex gap-2 mt-3 pt-2 border-t border-[#F5EEE3]">
                    <button
                      type="button"
                      id={`home-add-to-cart-${tea.slug}`}
                      onClick={() =>
                        dispatch(
                          addToCart({
                            name: tea.name,
                            price,
                            src: tea.image_url || FALLBACK_IMG,
                          })
                        )
                      }
                      className="flex-1 py-2 text-xs font-semibold rounded-lg border-2 border-[#3B6B4A] text-[#3B6B4A] hover:bg-[#3B6B4A] hover:text-white transition-all duration-200 cursor-pointer text-center"
                    >
                      Add to Cart
                    </button>

                    <Link
                      id={`home-view-${tea.slug}`}
                      href={productHref}
                      className="flex-1 py-2 text-xs font-semibold rounded-lg bg-[#3B6B4A] text-white hover:bg-[#2D4A38] transition-all duration-200 text-center flex items-center justify-center"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Right Navigation Arrow - positioned outside the card track to prevent overlapping */}
      <button
        onClick={() => scroll("right")}
        disabled={!showRight}
        className={`absolute right-0 sm:right-1 md:right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white border border-[#E8DFCF] shadow-lg text-[#3B6B4A] hover:bg-[#3B6B4A] hover:text-white transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none cursor-pointer`}
        aria-label="Scroll Right"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
