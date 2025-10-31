import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import CartDrawer from "../components/CartDrawer";
import Footer from "../components/Footer";
import { drugs } from "../data/drugs";
import { FaWhatsapp } from "react-icons/fa";
import TrustedCareSection from "../components/TrustedCardSection";
import axios from "axios";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  // if (loading) return <p>Loading products...</p>;

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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
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
