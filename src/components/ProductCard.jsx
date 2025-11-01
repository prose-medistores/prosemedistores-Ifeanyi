import React from "react";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import axios from "axios";

function formatCurrency(v) {
  return `₦${Number(v).toLocaleString()}`;
}

export default function ProductCard({ product }) {
  const { add } = useCart();

  return (
    <article
      key={product._id}
      className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition flex flex-col"
    >
      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
        <img
          loading="lazy"
          src={product.image}
          alt={product.name}
          className="object-contain w-full h-full"
        />
      </div>
      <div className="mt-3 flex-1 flex flex-col">
        <h3 className="text-sm font-semibold text-gray-900">{product.name}</h3>
        <p className="text-xs text-gray-500 mt-1">{product.category}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-lg font-bold text-primary">
            {formatCurrency(product.price)}
          </div>
          <button
            onClick={() => add(product, 1)}
            className="px-4 py-2 bg-accent text-white rounded-lg font-medium hover:brightness-95 transition"
            aria-label={`Add ${product.name} to cart`}
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

