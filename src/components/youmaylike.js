"use client";

import { useState, useEffect } from "react";
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

/* Fallback recommendations in case network or external API is offline */
const FALLBACK_RECOMMENDED = [
  {
    id: 101,
    name: "Organic Green Tea",
    slug: "green-tea",
    image_url: "/images/teagreen.jpg",
    origin: "Dhankuta, Nepal",
    caffeine_level: "low",
    tea_type: { name: "Green Tea", slug: "green" },
  },
  {
    id: 102,
    name: "Wild Herbal Infusion",
    slug: "herbal-tea",
    image_url: "/images/herbaltea.jpg",
    origin: "Solukhumbu, Nepal",
    caffeine_level: "none",
    tea_type: { name: "Herbal Tea", slug: "herbal" },
  },
  {
    id: 103,
    name: "Highland Oolong Tea",
    slug: "oolong-tea",
    image_url: "/images/oolongtea.jpg",
    origin: "Kanyam, Nepal",
    caffeine_level: "medium",
    tea_type: { name: "Oolong Tea", slug: "oolong" },
  },
];

export default function YouMayLike({ currentSlug, teaType }) {
  const dispatch = useDispatch();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadRecommendations() {
      try {
        const allTeas = await getAllTeas();
        if (cancelled) return;

        if (Array.isArray(allTeas) && allTeas.length > 0) {
          // Exclude the tea currently being viewed
          const candidates = allTeas.filter((t) => t.slug !== currentSlug);

          // If teaType or category is provided, prioritize similar teas first
          const sameType = teaType
            ? candidates.filter(
                (t) =>
                  t.tea_type?.slug === teaType ||
                  t.base_type?.slug === teaType ||
                  t.category?.slug === teaType
              )
            : [];
          const otherTypes = candidates.filter((t) => !sameType.some((s) => s.slug === t.slug));

          const selected = [...sameType, ...otherTypes].slice(0, 3);
          setRecommendations(selected.length > 0 ? selected : candidates.slice(0, 3));
        } else {
          setRecommendations(
            FALLBACK_RECOMMENDED.filter((t) => t.slug !== currentSlug).slice(0, 3)
          );
        }
      } catch (err) {
        console.warn("Failed to load recommendations from API, using fallback:", err);
        if (!cancelled) {
          setRecommendations(
            FALLBACK_RECOMMENDED.filter((t) => t.slug !== currentSlug).slice(0, 3)
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadRecommendations();
    return () => {
      cancelled = true;
    };
  }, [currentSlug, teaType]);

  return (
    <section className="mt-20 border-t border-[#E8DFCF] pt-12">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-[#3B6B4A]">
          You May Also Like
        </h3>
        <p className="mt-2 text-[#5C6650] text-sm max-w-md mx-auto">
          Explore more handcrafted specialty teas crafted from organic Himalayan harvests.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Loading Skeleton */}
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden border border-[#E8DFCF] shadow-md bg-white animate-pulse flex flex-col"
            >
              <div className="h-52 bg-[#E8DFCF]" />
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-[#E8DFCF] rounded w-3/4" />
                  <div className="h-3 bg-[#E8DFCF] rounded w-1/2" />
                </div>
                <div className="flex gap-2 pt-3">
                  <div className="h-9 bg-[#E8DFCF] rounded-lg flex-1" />
                  <div className="h-9 bg-[#E8DFCF] rounded-lg flex-1" />
                </div>
              </div>
            </div>
          ))}

        {/* Loaded Recommended Teas */}
        {!loading &&
          recommendations.map((tea) => {
            const price = getTeaPrice(tea);
            const badge = caffeineBadge[tea.caffeine_level] || caffeineBadge.medium;
            const productHref = `/products/${tea.slug}`;

            return (
              <div
                key={tea.id || tea.slug}
                className="rounded-2xl overflow-hidden border border-[#E8DFCF] shadow-md bg-white flex flex-col group transition-all duration-300 hover:shadow-xl hover:border-[#3B6B4A]/40"
              >
                {/* Product Image */}
                <Link href={productHref} className="relative h-52 overflow-hidden bg-[#E8DFCF] block">
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

                {/* Info */}
                <div className="p-5 flex flex-col gap-2 flex-1 justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={productHref}
                        className="text-[#2C3A1E] font-bold text-base hover:text-[#3B6B4A] transition-colors line-clamp-1"
                        title={tea.name}
                      >
                        {tea.name}
                      </Link>
                      <span className="text-[#3B6B4A] font-bold text-sm shrink-0">{price}</span>
                    </div>

                    <p className="text-xs text-[#8A8A75] mt-1 truncate">
                      {tea.origin ? `📍 ${tea.origin}` : tea.tea_type?.name || "Himalayan Blend"}
                    </p>
                  </div>

                  {/* Buttons matching products page */}
                  <div className="flex gap-2 mt-4 pt-3 border-t border-[#F5EEE3]">
                    <button
                      type="button"
                      id={`recommend-add-to-cart-${tea.slug}`}
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
                      id={`recommend-view-${tea.slug}`}
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
    </section>
  );
}
