import React, { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";

function formatCurrency(v) {
  return `₦${Number(v).toLocaleString()}`;
}

/* Replace this with your store WhatsApp number in international format (no +) */
const STORE_WHATSAPP_NUMBER = "2348065503154";

const API = "https://medistore-backend.onrender.com"

export default function CartDrawer({ open, onClose }) {
  const { items, updateQty, remove, clear, total } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [delivery, setDelivery] = useState({ name: "", phone: "", address: "", email: "" });
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) ref.current?.focus();
  }, [open]);

  const handleCheckout = async () => {
  if (!delivery.name || !delivery.phone || !delivery.address || !delivery.email) {
    alert("Please fill in delivery name, phone, address and email.");
    return;
  }
  try {
    // Build order data
    const orderData = {
      email: delivery.email,
      phone: delivery.phone,
      name: delivery.name,
      deliveryAddress: delivery.address,
      items: items.map((i) => ({
        // productId: i._id,
        name: i.name,
        price: i.price,
        quantity: i.qty,
        image: i.image,
      })),
      totalAmount: total,
    };
    // Send to backend
    const res = await axios.post(`${API}/api/orders/checkout`, orderData);
    if (res.data.success) {
      // Now proceed to WhatsApp after order is saved
      const lines = [
        "Hello, I want to place an order from MediStore.",
        "",
        "🛍️ Order details:",
        ...items.map((i) => `- ${i.name} x${i.qty} — ₦${i.price * i.qty}`),
        "",
        `💰 Total: ₦${total.toLocaleString()}`,
        "",
        "📦 Delivery Information:",
        `Name: ${delivery.name}`,
        `Phone: ${delivery.phone}`,
        `Address: ${delivery.address}`,
        `Email: ${delivery.email}`,
        "",
        `Order Reference: ${res.data.order.orderRef}`,
      ];
      const message = encodeURIComponent(lines.join("\n"));
      const url = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${message}`;
      window.open(url, "_blank");
    } else {
      alert("Failed to create order. Please try again.");
    }
  } catch (error) {
    console.error("Checkout Error:", error);
    alert("Something went wrong while processing your order. Please try again.");
  }
};

  if (!open) return null;

  return (
    <aside
      role="dialog"
      aria-modal="true"
      className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="text-lg font-semibold text-primary">Your Cart</h3>
        <div className="flex items-center gap-2">
          <button onClick={() => { clear(); onClose(); }} className="text-sm text-red-500">Clear</button>
          <button onClick={onClose} aria-label="Close cart" className="p-2 rounded hover:bg-gray-100">
            ✕
          </button>
        </div>
      </div>

      <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(100% - 170px)" }}>
        {items.length === 0 ? (
          <div className="text-center text-gray-500 py-10">Your cart is empty.</div>
        ) : (
          <ul className="space-y-4">
            {items.map((i) => (
              <li key={i.id} className="flex items-start gap-3">
                <img src={i.image} alt={i.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-gray-900">{i.name}</p>
                      <p className="text-xs text-gray-500">{i.category}</p>
                    </div>
                    <div className="text-sm font-semibold text-primary">{formatCurrency(i.price * i.qty)}</div>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => updateQty(i._id, i.qty - 1)}
                      className="px-2 py-1 border rounded"
                      aria-label={`Decrease ${i.name} quantity`}
                    >
                      −
                    </button>
                    <input
                      value={i.qty}
                      onChange={(e) => updateQty(i._id, Number(e.target.value || 1))}
                      className="w-12 text-center border rounded"
                      type="number"
                      min="1"
                      aria-label={`Quantity for ${i.name}`}
                    />
                    <button
                      onClick={() => updateQty(i._id, i.qty + 1)}
                      className="px-2 py-1 border rounded"
                      aria-label={`Increase ${i.name} quantity`}
                    >
                      +
                    </button>
                    <button onClick={() => remove(i._id)} className="ml-auto text-sm text-red-500">Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-600">Subtotal</div>
          <div className="text-lg font-semibold">{formatCurrency(total)}</div>
        </div>

        {!showCheckout ? (
          <div className="flex gap-2">
            <button
              onClick={() => setShowCheckout(true)}
              disabled={items.length === 0}
              className="flex-1 px-4 py-3 bg-primary text-white rounded-lg disabled:opacity-50"
            >
              Proceed to Checkout
            </button>
            <button onClick={onClose} className="px-4 py-3 border rounded-lg">Continue</button>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <input
                ref={ref}
                placeholder="Full name"
                value={delivery.name}
                onChange={(e) => setDelivery((d) => ({ ...d, name: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                placeholder="Email"
                value={delivery.email}
                onChange={(e) => setDelivery((d) => ({ ...d, email: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                placeholder="Phone number"
                value={delivery.phone}
                onChange={(e) => setDelivery((d) => ({ ...d, phone: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2"
              />
              <textarea
                placeholder="Delivery address"
                value={delivery.address}
                onChange={(e) => setDelivery((d) => ({ ...d, address: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2"
                rows={3}
              />
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2">
              <button onClick={handleCheckout} className="w-full bg-accent text-white py-2 rounded-lg">
                Checkout via WhatsApp
              </button>
              <button onClick={() => setShowCheckout(false)} className="w-full border py-2 rounded-lg">
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
