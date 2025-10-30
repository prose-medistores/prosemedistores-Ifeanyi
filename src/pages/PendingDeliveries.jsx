import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function PendingDeliveries() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const email = user?.email;
        if (!email) {
          setOrders([]);
          setLoading(false);
          return;
        }
        const res = await axios.get(`http://localhost:5000/api/orders/${email}`, {
          params: { email },
        });
        const fetchedOrders = Array.isArray(res.data)
          ? res.data
          : res.data.orders || [];
        // :white_check_mark: Filter out only pending (not delivered) orders
        const pending = fetchedOrders.filter(
          (order) => order.deliveryStatus !== "Delivered"
        );
        setOrders(pending);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600">Loading pending deliveries...</p>
      </div>
    );
  }
  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4772/4772310.png"
          alt="All Delivered"
          className="w-32 h-32 mb-6 opacity-80"
        />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No pending deliveries
        </h2>
        <p className="text-gray-500 mb-4">
          All your orders have been delivered successfully :tada:
        </p>
        <button
          onClick={() => navigate(-1)}
          className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition-all font-medium"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-light py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-8">
          Pending Deliveries
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
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {order.deliveryStatus}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-4">
                {order.items?.map((item, i) => (
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
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-700">
                      ₦{Number(item.price || 0).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100 text-sm">
                <p className="text-gray-600">
                  <strong>Address:</strong> {order.deliveryAddress}
                </p>
                <p className="font-semibold text-gray-800">
                  Total: ₦{Number(order.totalAmount || 0).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-primary text-white px-6 py-2.5 rounded-lg mt-6 font-medium hover:bg-primary/90 transition-all shadow-sm flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>
    </div>
  );
}