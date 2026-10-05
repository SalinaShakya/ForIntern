

"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "@/store/slices/cartSlice";

export default function Checkout() {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  return (
    <>
      <Navbar />

      <main className="bg-[#FBF5EF] min-h-screen py-16 px-6 pt-48 ">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">

          {/* Left - Checkout Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">

            <h1 className="text-3xl font-bold text-[#2D4A38] mb-2">
              Checkout
            </h1>

            <p className="text-gray-500 mb-8">
              Fill in your shipping information to complete your purchase.
            </p>

            <form className="space-y-8">

              {/* Contact */}
              <div>
                <h2 className="text-xl font-semibold text-[#2D4A38] mb-4">
                  Contact Information
                </h2>

                <div className="grid md:grid-cols-2 gap-5">

                  <div>
                    <label className="block mb-2 font-medium">
                      First Name
                    </label>

                    <input
                      type="text"
                      className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">
                      Last Name
                    </label>

                    <input
                      type="text"
                      className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2 font-medium">
                      Email
                    </label>

                    <input
                      type="email"
                      className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2 font-medium">
                      Phone Number
                    </label>

                    <input
                      type="text"
                      className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                  </div>

                </div>
              </div>

              {/* Address */}
              <div>
                <h2 className="text-xl font-semibold text-[#2D4A38] mb-4">
                  Shipping Address
                </h2>

                <div className="space-y-5">

                  <input
                    type="text"
                    placeholder="Street Address"
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700"
                  />

                  <div className="grid md:grid-cols-3 gap-5">

                    <input
                      type="text"
                      placeholder="City"
                      className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700"
                    />

                    <input
                      type="text"
                      placeholder="Province"
                      className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700"
                    />

                    <input
                      type="text"
                      placeholder="Postal Code"
                      className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700"
                    />

                  </div>

                </div>
              </div>

              {/* Payment */}
              <div>

                <h2 className="text-xl font-semibold text-[#2D4A38] mb-4">
                  Payment Method
                </h2>

                <label className="flex items-center gap-4 border-2 border-green-700 rounded-xl p-5 cursor-pointer bg-green-50">

                  <input
                    type="radio"
                    checked
                    readOnly
                    className="w-5 h-5 accent-green-700"
                  />

                  <span className="font-semibold">
                    Cash on Delivery
                  </span>

                </label>

              </div>

              <button
                type="submit"
                className="w-full bg-[#2D4A38] text-white py-4 rounded-xl font-semibold hover:bg-[#1f3528] transition"
              >
                Place Order
              </button>

            </form>

          </div>

         

        </div>
      </main>

      <Footer />
    </>
  );
}
