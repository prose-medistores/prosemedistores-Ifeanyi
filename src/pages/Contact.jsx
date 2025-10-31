import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // You can integrate with backend or service like Brevo/Resend here
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>  
    <Navbar/>
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-20">
        
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Get In Touch
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about your prescription, orders, or our services? Our
            support team is here to help you 24/7.
          </p>
        </motion.div>
        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-lg p-8 space-y-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Contact Information
            </h2>
            <div className="flex items-center gap-4">
              <Mail className="text-primary" />
              <div>
                <p className="font-medium text-gray-800">Email</p>
                <p className="text-gray-500">support@prosemedistore.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-primary" />
              <div>
                <p className="font-medium text-gray-800">Phone</p>
                <p className="text-gray-500">+234 806 550 3154</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-primary" />
              <div>
                <p className="font-medium text-gray-800">Address</p>
                <p className="text-gray-500">
                  Plot 10, Crescent Drive, Garki, Abuja, Nigeria
                </p>
              </div>
            </div>
            <p className="text-gray-600 mt-6">
              You can also reach us via WhatsApp or visit our social media
              pages for real-time support.
            </p>
          </motion.div>
          {/* Right Side - Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              Send Us a Message
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Type your message here..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90"
              } transition`}
            >
              <Send size={18} />
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}

