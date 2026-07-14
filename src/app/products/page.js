"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useCart } from "@/context/CartContext";

const slides = [
  { src: "/images/hero.jpg", label: "Tea Collection " },
  { src: "/images/teablack.jpg", label: "Black Tea" },
  { src: "/images/herbaltea.jpg", label: "Herbal Tea" },
];

export default function Products() {
  const [current, setCurrent] = useState(0);
  const { addToCart } = useCart();

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <>
      <Navbar />

      {/* Carousel — flush below navbar */}
      <div className=" relative w-full h-[400px] overflow-hidden">
              {/* <div className=" relative w-full h-[400px] overflow-hidden"> */}

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
            {/* Dark gradient overlay + label */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-2xl font-semibold tracking-wide drop-shadow-lg">
              {slide.label}
            </p>
          </div>
        ))}

        {/* Prev / Next arrows */}
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

        {/* Dot indicators */}
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

      {/* Products section */}
      <main className="pb-16 bg-[#FBF5EF]">
        <h1 className="text-5xl font-bold text-[#3B6B4A] pt-10 text-center">
          Our Products
        </h1>
        <p className="mt-4 text-[#5C6650] text-lg text-center">
          Explore our range of premium organic tea.
        </p>

        <div className="flex gap-8 mt-10 max-w-7xl mx-auto px-6 items-start">

          {/* ── Sidebar ── */}
          <aside className="w-52 shrink-0 rounded-2xl overflow-hidden shadow-sm" style={{ background: "#fff", border: "1px solid #E8DFCF" }}>

            {/* Collections */}
            <div className="border-b" style={{ borderColor: "#E8DFCF" }}>
              <p className="px-5 py-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#3B6B4A", background: "#F5EEE3" }}>
                Collections
              </p>
              <ul className="py-2">
                {["All Teas", "Black Tea", "Green Tea", "Herbal Tea", "Oolong Tea", "White Tea", "Blue Tea", "Masala Chiya", "Lemongrass Tea", "Tulsi Tea", "Ginger Tea"].map((item) => (
                  <li key={item}>
                    <button className="w-full text-left px-5 py-2 text-sm transition-colors hover:bg-[#F5EEE3]" style={{ color: "#5C6650" }}>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Origin */}
            <div>
              <p className="px-5 py-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#3B6B4A", background: "#F5EEE3" }}>
                Origin
              </p>
              <ul className="py-2">
                {["Nepal", "Darjeeling", "Assam", "Himalayan Blend"].map((origin) => (
                  <li key={origin}>
                    <button className="w-full text-left px-5 py-2 text-sm transition-colors hover:bg-[#F5EEE3]" style={{ color: "#5C6650" }}>
                      {origin}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </aside>

          {/* ── Product Grid ── */}
          <div className="flex-1 grid grid-cols-3 gap-6">

            {[
              { src: "/images/teablack.jpg", alt: "Black Tea", name: "Black Tea", price: "Rs. 450", buyLink: "/inside" },
              { src: "/images/teagreen.jpg", alt: "Green Tea", name: "Green Tea", price: "Rs. 400", buyLink: "/inside/forgreentea" },
              { src: "/images/herbaltea.jpg", alt: "Herbal Tea", name: "Herbal Tea", price: "Rs. 380", buyLink: "/inside/forherbaltea" },
              { src: "/images/whitetea.jpg", alt: "White Tea", name: "White Tea", price: "Rs. 600" },
              { src: "/images/bluetea.jpg", alt: "Blue Tea", name: "Blue Tea", price: "Rs. 480" },
              { src: "/images/masalatea.jpg", alt: "Masala Chai", name: "Masala Chiya", price: "Rs. 350" },
              { src: "/images/lemontea.jpg", alt: "Lemongrass Tea", name: "Lemongrass Tea", price: "Rs. 420" },
              { src: "/images/tulsitea.jpg", alt: "Tulsi Tea", name: "Tulsi Tea", price: "Rs. 390" },
              { src: "/images/gingertea.jpg", alt: "Ginger Tea", name: "Ginger Tea", price: "Rs. 360" },
            ].map((product) => (
              <div
                key={product.name}
                className="rounded-2xl overflow-hidden border border-[#E8DFCF] shadow-md bg-white flex flex-col group transition-shadow hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={product.src}
                    alt={product.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Info + Buttons */}
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[#2D4A38] font-semibold text-sm">{product.name}</p>
                    <span className="text-[#3B6B4A] font-bold text-sm">{product.price}</span>
                  </div>

                  <div className="flex gap-2">
                    {/* Add to Cart */}
                    <button
                      id={`add-to-cart-${product.name.replace(/\s+/g, "-").toLowerCase()}`}
                      onClick={() => addToCart({ name: product.name, price: product.price, src: product.src })}
                      className="flex-1 py-2 text-xs font-semibold rounded-lg border-2 border-[#3B6B4A] text-[#3B6B4A] hover:bg-[#3B6B4A] hover:text-white transition-all duration-200"
                    >
                       Add to Cart
                    </button>

                    {/*View — navigates to detail page if buyLink exists */}
                    {product.buyLink ? (
                      <Link
                        id={`buy-now-${product.name.replace(/\s+/g, "-").toLowerCase()}`}
                        href={product.buyLink}
                        className="flex-1 py-2 text-xs font-semibold rounded-lg bg-[#3B6B4A] text-white hover:bg-[#2D4A38] transition-all duration-200 text-center"
                      >
                        View
                      </Link>
                    ) : (
                      <button
                        id={`buy-now-${product.name.replace(/\s+/g, "-").toLowerCase()}`}
                        onClick={() => alert(`Proceeding to buy ${product.name}!`)}
                        className="flex-1 py-2 text-xs font-semibold rounded-lg bg-[#3B6B4A] text-white hover:bg-[#2D4A38] transition-all duration-200"
                      >
                        View
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

