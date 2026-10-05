"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectIsCartOpen,
  selectCartTotal,
  removeFromCart,
  changeQty,
  setCartOpen,
} from "@/store/slices/cartSlice";

export default function CartSidebar() { //actual sidebar to appear
  const dispatch = useDispatch(); //to send instructions to redux (perform this action)
  const cartItems = useSelector(selectCartItems);
  const isOpen = useSelector(selectIsCartOpen);
  const total = useSelector(selectCartTotal);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={() => dispatch(setCartOpen(false))}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-[#2D4A38]">Your Cart</h2>
          <button 
            onClick={() => dispatch(setCartOpen(false))}
            className="text-gray-500 hover:text-gray-800 transition p-2"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <span className="text-4xl mb-3">🛒</span>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.name} className="flex gap-4 p-3 bg-[#F5EEE3] rounded-xl border border-[#E8DFCF]">
                  {/* Image */}
                  <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.src || item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-[#2D4A38] leading-tight">{item.name}</h4>
                      <button 
                        onClick={() => dispatch(removeFromCart(item.name))}
                        className="text-red-500 hover:text-red-700 text-xs "
                      >
                        Remove
                      </button>
                    </div>
                    <div className="text-sm font-semibold text-[#3B6B4A]">{item.price}</div>
                    
                    {/* Qty Controls */}
                    <div className="flex items-center gap-3 mt-1">
                      <button 
                        onClick={() => dispatch(changeQty({ name: item.name, delta: -1 }))}
                        className="w-6 h-6 rounded bg-white border border-[#E8DFCF] flex items-center justify-center text-xs hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="text-xs font-semibold">{item.qty}</span>
                      <button 
                        onClick={() => dispatch(changeQty({ name: item.name, delta: 1 }))}
                        className="w-6 h-6 rounded bg-white border border-[#E8DFCF] flex items-center justify-center text-xs hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="text-xl font-bold text-[#2D4A38]">Rs. {total.toLocaleString()}</span>
            </div>
            <Link 
              href="/checkout"
              onClick={() => dispatch(setCartOpen(false))}
              className="w-full py-3 rounded-xl bg-[#3B6B4A] text-white font-bold hover:bg-[#2D4A38] transition-colors flex items-center justify-center text-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
