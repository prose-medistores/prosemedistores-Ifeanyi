/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-12 bg-[#00477B] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand and Mission */}
        <div>
          <h2 className="text-2xl font-bold">ProseMediStore</h2>
          <p className="mt-2 text-sm text-gray-200">
            Delivering trusted medicines and healthcare essentials with care and convenience.
          </p>
          <div className="mt-4 flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-[#50D6FE] transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-[#50D6FE] transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-[#50D6FE] transition">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><a href="/about" className="hover:text-[#50D6FE] transition">About Us</a></li>
            <li><a href="/shop" className="hover:text-[#50D6FE] transition">Shop</a></li>
            <li><a href="/contact" className="hover:text-[#50D6FE] transition">Contact</a></li>
            <li><a href="/privacy" className="hover:text-[#50D6FE] transition">Privacy Policy</a></li>
          </ul>
        </div>
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm text-gray-200">
            📍 <span className="text-gray-100">Low cost Avenue, Abakaliki, Ebonyi State</span>
          </p>
          <p className="mt-2 text-sm">📞 <a href="tel:+2348065503154" className="hover:text-[#50D6FE] transition">+234 806 550 3154</a></p>
          <p className="mt-1 text-sm">💬 <a href="https://wa.me/2348065503154" className="hover:text-[#50D6FE] transition">Chat on WhatsApp</a></p>
          <p className="mt-1 text-sm">📧 <a href="mailto:support@medistore.com" className="hover:text-[#50D6FE] transition">support@prosemedistore.com</a></p>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-white/20 mt-8 py-4 text-center text-xs text-gray-300">
        © {new Date().getFullYear()} ProseMediStore All rights reserved.
      </div>
    </footer>
  );
}
