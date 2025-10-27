import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      navigate("/login");
      return;
    }

    setUser(storedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="font-bold text-primary">MS</span>
          </div>
          <h1 className="text-xl font-semibold text-primary hidden sm:block">
            MediStore Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-700 text-sm hidden sm:block">
            Hello, <span className="font-medium">{user?.name || "User"}</span>
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        {/* Dashboard Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Orders Summary Card */}
          <div className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Your Orders
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Manage and track your previous medicine purchases.
            </p>
            <button onClick={() => navigate("/orders")} className="bg-primary text-white w-full py-2 rounded-lg hover:bg-primary/90 transition">
              View Orders
            </button>
          </div>

          {/* Pending Deliveries */}
          <div className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Pending Deliveries
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Keep track of drugs that are currently being processed.
            </p>
            <button className="bg-accent text-white w-full py-2 rounded-lg hover:bg-accent/90 transition">
              Track Deliveries
            </button>
          </div>

          {/* Chat With Pharmacist */}
          <div className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Need Help?
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Chat directly with a licensed pharmacist or doctor for guidance.
            </p>
            <a
              href="https://wa.me/2348162738527?text=Hello%20MediStore%20team!%20I%20need%20help%20with%20my%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white text-center w-full py-2 block rounded-lg hover:bg-green-600 transition"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Recent Activity
          </h2>

          <div className="bg-white p-6 rounded-2xl shadow-soft">
            <ul className="divide-y divide-gray-100">
              <li className="py-3 flex justify-between items-center">
                <span className="text-gray-700">Paracetamol 500mg</span>
                <span className="text-sm text-gray-500">Delivered</span>
              </li>
              <li className="py-3 flex justify-between items-center">
                <span className="text-gray-700">Vitamin C Tablets</span>
                <span className="text-sm text-gray-500">Pending</span>
              </li>
              <li className="py-3 flex justify-between items-center">
                <span className="text-gray-700">Ibuprofen 200mg</span>
                <span className="text-sm text-gray-500">Processing</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
