"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";

export default function Forgreentea() {
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-25">
        <section className="max-w-6xl mx-auto px-6 py-1">
          <div className="grid md:grid-cols-2 gap-5 items-left">
            {/* Left Image */}
            <div>
              <Image
                src="/images/greentea.jpg"
                alt="Herbal Tea"
                width={600}
                height={450}
                className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-Herbal-800 mb-2 ">
                Herbal Tea
              </h2>

              <p className="text-sm text-gray-500 mb-4">
                Premium Loose Leaf Nepal Herbal Tea • 100g
              </p>

              <p className="text-gray-700 leading-2 mb-6">
                Our premium Herbal Tea is carefully harvested from the pristine tea gardens
                of Nepal. Made from hand-picked young tea leaves, it offers a refreshing,
                smooth flavor with delicate grassy notes and a naturally calming aroma.
                Rich in antioxidants, it is the perfect choice for those seeking a healthy
                and refreshing daily beverage.
              </p>

              {/* Product Details */}
              <div className="space-y-3 text-gray-700">
                <div>
                  <span className="font-semibold text-[#3B6B4A]">Weight:</span> 100g
                </div>


                {/* Price */}
                <p className="text-3xl font-bold text-[#3B6B4A] mt-8">
                  Rs. 45,678
                </p>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    id="add-to-cart-black-tea"
                    onClick={() => dispatch(addToCart({ name: "Herbal Tea", price: "Rs. 45,678", src: "/images/greentea.jpg" }))}
                    className="flex-1 py-3 text-sm font-semibold rounded-xl border-2 border-[#3B6B4A] text-[#3B6B4A] hover:bg-[#3B6B4A] hover:text-white transition-all duration-200"
                  >
                    🛒 Add to Cart
                  </button>

                  <Link
                    id="buy-now-black-tea"
                    href="/checkout"
                    className="flex-1 flex items-center justify-center py-3 text-sm font-semibold rounded-xl bg-[#3B6B4A] text-white hover:bg-[#2D4A38] transition-all duration-200"
                  >
                    Buy Now
                  </Link>
                </div>

                <div>
                  <span className="font-semibold text-[#3B6B4A]">Ingredients:</span>
                  <ul className="list-disc list-inside mt-1 ml-2">
                    <li>100% Premium Nepal Herbal Tea Leaves</li>
                    <li>No Artificial Flavors</li>
                    <li>No Preservatives</li>
                    <li>Naturally Rich in Antioxidants</li>
                  </ul>
                </div>

                <div>
                  <span className="font-semibold text-[#3B6B4A]">Flavor Profile:</span>
                  <p>Fresh • Light • Smooth • Mildly Grassy</p>
                </div>

                <div>
                  <span className="font-semibold text-[#3B6B4A]">Brewing Guide:</span>
                  <p>1 tsp tea • 80°C water • Steep for 2–3 minutes</p>
                </div>
              </div>

            </div>
          </div>
        </section>      </main>
      <Footer />
    </>
  );
}
