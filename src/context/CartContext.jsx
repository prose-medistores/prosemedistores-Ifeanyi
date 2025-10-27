

import React, { createContext, useContext, useEffect, useState } from "react";
const CartContext = createContext();
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("medistore_cart")) || [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("medistore_cart", JSON.stringify(items));
  }, [items]);
  // ✅ Fixed: Use _id instead of id
  const add = (product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((p) => p._id === product._id);
      if (found) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, qty: p.qty + qty } : p
        );
      }
      return [...prev, { ...product, qty }];
    });
  };
  // ✅ Also fix other id references
  const updateQty = (_id, qty) =>
    setItems((prev) =>
      prev.map((p) => (p._id === _id ? { ...p, qty: Math.max(1, qty) } : p))
    );
  const remove = (_id) => setItems((prev) => prev.filter((p) => p._id !== _id));
  const clear = () => setItems([]);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);
  return (
    <CartContext.Provider value={{ items, add, updateQty, remove, clear, count, total }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}
