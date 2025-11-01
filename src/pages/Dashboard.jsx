import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ChatBox from "../components/ChatBox";
import axios from "axios";

const API = "https://medistore-backend.onrender.com"

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("user"));
  //   const token = localStorage.getItem("token");

  //   if (!storedUser || !token) {
  //     navigate("/login");
  //     return;
  //   }

  //   setUser(storedUser);
  // }, [navigate]);
  useEffect(() => {
  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  // If nothing is stored, just stop — no redirect
  if (!token || !storedUser) return;
  // Only set user if not admin
  if (storedUser.role !== "admin") {
    setUser(storedUser);
  }
}, []);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const [prescription, setPrescription] = useState(null);
  const handleUploadPrescription = async () => {
    if (!prescription) return;
    setIsSubmitting(true)
    const formData = new FormData();
    formData.append("image", prescription);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const email = user?.email;
      const res = await fetch(`${API}/api/prescriptions/upload?email=${email}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,

        },
        body: formData,
      });
      if (res.ok) {
        toast.success("Prescription uploaded successfully!");
        setPrescription(null);
      } else {
        const errData = await res.json();
        toast.error(`Upload failed: ${errData.message || "Please try again."}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false)
    }
  };


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
        const res = await axios.get(`${API}/api/orders/${email}`, {
          params: { email },
        });
        // ✅ Fix: handle different backend response structures
        const fetchedOrders = Array.isArray(res.data)
          ? res.data
          : res.data.orders || [];
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]); // fallback
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="font-bold text-primary">PMS</span>
          </div>
          <h1 className="text-xl font-semibold text-primary hidden sm:block">
            ProseMediStore Dashboard
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
            <button onClick={()=>navigate("/pending-deliveries")} className="bg-accent text-white w-full py-2 rounded-lg hover:bg-accent/90 transition">
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
              href="https://wa.me/2348162738527?text=Hello%20ProseMediStore%20team!%20I%20need%20help%20with%20my%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white text-center w-full py-2 block rounded-lg hover:bg-green-600 transition"
            >
              Chat on WhatsApp
            </a>
          </div>

           {/* Upload Prescription */}
    <div className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-lg transition col-span-full lg:col-span-3">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Upload Doctor’s Prescription
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Upload an image of your doctor’s prescription, and our team will prepare your medicines accordingly.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          type="file"
          accept="image/*"
          id="prescriptionUpload"
          className="hidden"
          onChange={(e) => setPrescription(e.target.files[0])}
        />
        <label
          htmlFor="prescriptionUpload"
          className="cursor-pointer flex items-center justify-center bg-primary text-white px-5 py-3 rounded-lg font-medium hover:bg-primary/90 transition w-full sm:w-auto"
        >
          Choose Image
        </label>
        {prescription && (
          <div className="flex items-center gap-3">
            <img
              src={URL.createObjectURL(prescription)}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-gray-200"
            />
            <span className="text-sm text-gray-600">{prescription.name}</span>
          </div>
        )}
        <button
          onClick={handleUploadPrescription}
          disabled={!prescription || isSubmitting}
          className={`${
            prescription && !isSubmitting
              ? "bg-accent hover:bg-accent/90"
              : "bg-gray-300 cursor-not-allowed"
          } text-white px-6 py-3 rounded-lg font-medium transition w-full sm:w-auto`}
        >
          {isSubmitting ? "Submitting..." : "Submit Prescription"}
        </button>
      </div>
    </div>

        </div>

        {/* Recent Activity */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Recent Activity
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow-soft">
            {loading ? (
              <p className="text-gray-500 text-sm">Loading recent activities...</p>
            ) : orders.length === 0 ? (
              <p className="text-gray-500 text-sm">No recent activities found.</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {orders.slice(0, 5).map((order, index) => (
                  <li key={index} className="py-3 flex justify-between items-center">
                    <span className="text-gray-700 font-medium">
                      {order.items && order.items.length > 0
                        ? order.items.map((item) => item.name).join(", ")
                        : "Order"}
                    </span>
                    <span
                      className={`text-sm ${
                        order.deliveryStatus === "Delivered"
                          ? "text-green-600"
                          : order.deliveryStatus === "Pending"
                          ? "text-yellow-600"
                          : "text-blue-600"
                      }`}
                    >
                      {order.deliveryStatus || "Processing"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
        <ChatBox label="Talk to a Doctor"/>
      </main>
    </div>
  );
}
