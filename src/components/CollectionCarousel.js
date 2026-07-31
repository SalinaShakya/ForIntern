"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const collectionItems = [
  { name: "Black Tea", src: "/images/teablack.jpg", alt: "Black Tea", href: "/inside" },
  { name: "Green Tea", src: "/images/teagreen.jpg", alt: "Green Tea", href: "/inside/forgreentea" },
  { name: "Herbal Tea", src: "/images/herbaltea.jpg", alt: "Herbal Tea", href: "/inside/forherbaltea" },
  { name: "Oolong Tea", src: "/images/oolongtea.jpg", alt: "Oolong Tea", href: "/inside/foroolongtea" },
  { name: "White Tea", src: "/images/whitetea.jpg", alt: "White Tea", href: "/products" },
  { name: "Blue Tea", src: "/images/bluetea.jpg", alt: "Blue Tea", href: "/products" },
  { name: "Masala Chiya", src: "/images/masalatea.jpg", alt: "Masala Chai", href: "/products" },
  { name: "Lemongrass Tea", src: "/images/lemontea.jpg", alt: "Lemongrass Tea", href: "/products" },
  { name: "Tulsi Tea", src: "/images/tulsitea.jpg", alt: "Tulsi Tea", href: "/products" },
  { name: "Ginger Tea", src: "/images/gingertea.jpg", alt: "Ginger Tea", href: "/products" },
];

export default function CollectionCarousel() {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 10);
      setShowRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      // Run once initially
      checkScroll();
      
      // Also check on window resize
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      // Scroll by 80% of client width for a smooth pagination-like experience
      const offset = direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative max-w-6xl mx-auto px-6 mt-9 group">
      {/* Left Navigation Button */}
      <button
        onClick={() => scroll("left")}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-[#E8DFCF] shadow-lg text-[#3B6B4A] hover:bg-[#3B6B4A] hover:text-white transition-all duration-300 ${
          showLeft ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
        }`}
        aria-label="Scroll Left"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 no-scrollbar"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {collectionItems.map((item) => (
          <Link
            href={item.href}
            key={item.name}
            className="flex-none w-[calc(100%-16px)] sm:w-[calc(50%-16px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-16px)] xl:w-[calc(20%-16px)] snap-start block group/card"
          >
            <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-md h-55 transition-all duration-300 group-hover/card:shadow-xl group-hover/card:border-[#3B6B4A]/30">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-6 pb-3 text-center transition-all duration-300 group-hover/card:from-black/95">
                <p className="text-white font-semibold text-sm tracking-wide transition-colors duration-300 group-hover/card:text-[#FBF5EF]">
                  {item.name}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Right Navigation Button */}
      <button
        onClick={() => scroll("right")}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-[#E8DFCF] shadow-lg text-[#3B6B4A] hover:bg-[#3B6B4A] hover:text-white transition-all duration-300 ${
          showRight ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
        }`}
        aria-label="Scroll Right"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

    </div>
  );
}
