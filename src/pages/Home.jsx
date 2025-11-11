import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import CartDrawer from "../components/CartDrawer";
import Footer from "../components/Footer";
// import { drugs } from "../data/drugs";
import { FaWhatsapp } from "react-icons/fa";
import TrustedCareSection from "../components/TrustedCardSection";
import axios from "axios";






const API = "https://medistore-backend.onrender.com";



export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); //  new state for search
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API}/api/products`);
        setProducts(response.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  //  Filter products by name or category
  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch = product.category
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return nameMatch || categoryMatch;
  });
  return (
    <>
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <main>
        <Hero />
        <section id="shop" className="py-12 bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-primary mb-6">
              Available Medicines
            </h2>
            {/*  Search bar */}
            <div className="flex justify-center mb-8">
              <div className="relative w-full sm:w-1/2">
                <input
                  type="text"
                  placeholder="Search by name or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm shadow-sm transition"
                />
                {/* Search Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                  />
                </svg>
              </div>
            </div>
            {/*  Product Grid */}
            {loading ? (
              <p className="text-center text-gray-500">Loading products...</p>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-10">
                No products match your search.
              </p>
            )}
          </div>
        </section>
        <TrustedCareSection />
        {/* WhatsApp Chat CTA */}
        <a
          href="https://wa.me/2348162738527"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50"
        >
          <FaWhatsapp size={22} />
          <span className="hidden sm:inline font-medium">Talk to us</span>
        </a>
        <Footer />
      </main>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
