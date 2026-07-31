"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import YouMayLike from "@/components/youmaylike";

export default function InsideContact() {
  const { addToCart } = useCart();

  return (
    <>
      <Navbar />

      {/* <main className="max-w-7xl mx-auto px-8 pt-40 mb-20"> */}
      <main className="max-w-6xl mx-auto px-6 py-25">

        {/* Product Section */}
        <div className="grid md:grid-cols-2 gap-10 items-start ">
          {/* Left */}
          <div>
            <Image
              src="/images/blacktea.jpg"
              alt="Black Tea"
              width={700}
              height={500}
              className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Right */}
          <div>
            <h2 className="text-4xl font-bold mb-2">Black Tea</h2>

            <p className="text-sm text-gray-500 mb-4">
              Premium Loose Leaf Nepal Black Tea • 100g
            </p>

            <p className="text-gray-700 leading-8 mb-6">
              Our premium Black Tea is carefully harvested from the pristine tea
              gardens of Nepal. Made from hand-picked young tea leaves, it
              offers a refreshing, smooth flavor with delicate grassy notes and
              a naturally calming aroma. Rich in antioxidants, it is the
              perfect choice for those seeking a healthy and refreshing daily
              beverage.
            </p>

            <div className="mb-6">
              <span className="font-semibold text-[#3B6B4A]">
                Weight:
              </span>{" "}
              100g
            </div>

            <p className="text-4xl font-bold text-[#3B6B4A] mb-8">
              Rs. 450
            </p>

            <div className="flex gap-4">
              <button
                onClick={() =>
                  addToCart({
                    name: "Black Tea",
                    price: "Rs. 450",
                    src: "/images/blacktea.jpg",
                  })
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

        {/* Bottom Section */}
        <div className="mt-16 border-t border-gray-300 pt-10 flex gap-12">
          {/* Ingredients */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[#3B6B4A] mb-4">
              Ingredients
            </h3>

            <ul className="list-disc list-inside text-gray-700 leading-8">
              <li>100% Premium Nepal Black Tea Leaves</li>
              <li>No Artificial Flavors</li>
              <li>No Preservatives</li>
              <li>Naturally Rich in Antioxidants</li>
            </ul>
          </div>

          {/* Flavor Profile */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[#3B6B4A] mb-4">
              Flavor Profile
            </h3>

            <p className="text-gray-700 leading-8">
              Fresh <br />
              Light <br />
              Smooth <br />
              Mildly Grassy
            </p>
          </div>

          {/* Brewing Guide */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[#3B6B4A] mb-4">
              Brewing Guide
            </h3>

            <p className="text-gray-700 leading-8">
              1 tsp tea <br />
              80°C water <br />
              Steep for 2–3 minutes
            </p>
          </div>
        </div>

        {/* You May Also Like Section */}
        <YouMayLike />
      </main>

      <Footer />
    </>
  );
}