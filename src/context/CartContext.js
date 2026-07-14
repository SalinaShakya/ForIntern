"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  function addToCart(product) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === product.name);
      if (existing) {
        return prev.map((i) =>
          i.name === product.name ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsOpen(true);
  }

  function removeFromCart(name) {
    setCartItems((prev) => prev.filter((i) => i.name !== name));
  }

  function changeQty(name, delta) {
    setCartItems((prev) =>
      prev
        .map((i) => (i.name === name ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }

  const total = cartItems.reduce(
    (sum, i) => {
      // Remove any non-digit character (like 'Rs.', commas, spaces)
      const numericPrice = i.price.toString().replace(/[^0-9]/g, "");
      return sum + i.qty * parseInt(numericPrice, 10);
    },
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, changeQty, isOpen, setIsOpen, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
