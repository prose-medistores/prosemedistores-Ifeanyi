import React, { useEffect, useState } from "react";
import axios from "axios";
export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.email) {
          setOrders([]);
          setLoading(false);
          return;
        }
        const res = await axios.get("http://localhost:5000/api/orders", {
          params: { email: user.email },
        });
        setOrders(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600">Loading your orders...</p>
      </div>
    );
  }
  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No Orders"
          className="w-32 h-32 mb-6 opacity-80"
        />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No orders yet
        </h2>
        <p className="text-gray-500 mb-4">
          You haven’t placed any orders yet. Start shopping now!
        </p>
        <a
          href="/"
          className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition-all font-medium"
        >
          Go to Shop
        </a>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-light py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-8">
          My Orders
        </h1>
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-soft p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-wrap justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Order #{order.orderRef || order._id.slice(-6).toUpperCase()}
                </h2>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${
                    order.deliveryStatus === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.deliveryStatus === "Processing"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.deliveryStatus}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-4">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between mb-3 last:mb-0"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg border"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-700">
                      ₦{item.price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100 text-sm">
                <p className="text-gray-600">
                  <strong>Address:</strong> {order.deliveryAddress}
                </p>
                <p className="font-semibold text-gray-800">
                  Total: ₦{order.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}