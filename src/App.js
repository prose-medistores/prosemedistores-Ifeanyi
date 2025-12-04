


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";
import PendingDeliveries from "./pages/PendingDeliveries";
import { Toaster } from "react-hot-toast";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/Contact";
import HowToInstall from "./pages/HowToInstall";
// import usePageTracking from "./utils/UsePageTracking";
// import { useEffect } from "react";

export default function App() {

  // usePageTracking()

  // Auto-update logic
  // useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     // Try registering service worker (if it exists in public folder)
  //     navigator.serviceWorker
  //       .register("/service-worker.js")
  //       .then((registration) => {
  //         // Check for new versions
  //         registration.onupdatefound = () => {
  //           const newWorker = registration.installing;
  //           newWorker.onstatechange = () => {
  //             if (
  //               newWorker.state === "installed" &&
  //               navigator.serviceWorker.controller
  //             ) {
  //               // Automatically reload for latest version
  //               window.location.reload();
  //             }
  //           };
  //         };
  //       })
  //       .catch((err) => console.log("SW registration failed:", err));
  //     // Also manually check all registered SWs for updates
  //     navigator.serviceWorker.getRegistrations().then((registrations) => {
  //       registrations.forEach((r) => r.update());
  //     });
  //   }
  // }, []);


  return (
    <CartProvider>    
      <Router>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/how" element={<HowToInstall />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/pending-deliveries" element={<PendingDeliveries />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
