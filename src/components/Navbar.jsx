



import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
function IconCart(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...props}>
      <path
        d="M3 3h2l.9 5.4A3 3 0 0 0 8.8 11h8.9a1 1 0 0 0 .96-.75L21 6H6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="20" r="1" fill="currentColor" />
      <circle cx="18" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}
export default function Navbar({ onCartOpen }) {

  const location = useLocation();
  
  // Helper to determine if a link is active for that premium styling
  const isActive = (path) => location.pathname === path;

  const { count } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20"> {/* Increased height slightly for breathing room */}
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center transition-colors group-hover:bg-primary/10">
              <img
                src="/Prologo.png"
                alt="ProseMediStore Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="block">
              <h1 className="text-xl font-bold text-primary tracking-tight leading-none group-hover:text-primary transition-colors">
                ProseMediStore
              </h1>
              <p className="text-xs font-medium text-slate-500 mt-1">
                Trusted online pharmacy
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
             <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/about') ? 'text-primary' : 'text-slate-600'}`}
            >
              About Us
            </Link>
            <Link 
              to="/how" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/how') ? 'text-primary' : 'text-slate-600'}`}
            >
              How to Install
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/contact') ? 'text-primary' : 'text-slate-600'}`}
            >
              Contact
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              to="/login"
              className="text-sm font-medium text-primary hover:text-primary transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="bg-slate-900 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-slate-800 transition-colors shadow-sm"
            >
              Sign up
            </Link>
            
            {/* Divider */}
            <div className="h-6 w-px bg-gray-200"></div>

            <button
              onClick={onCartOpen}
              aria-label="Open cart"
              className="relative p-2 text-slate-600 hover:text-primary hover:bg-primary/5 rounded-full transition-all focus:outline-none"
            >
              <IconCart className="w-6 h-6" />
              {count > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-white">
                  {count}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Cart + Menu Buttons */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={onCartOpen}
              aria-label="Open cart"
              className="relative p-2 text-slate-700 hover:bg-slate-50 rounded-full transition-colors"
            >
              <IconCart className="w-6 h-6" />
              {count > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 flex items-center justify-center min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-white">
                  {count}
                </span>
              )}
            </button>
            
            <button
              className="p-2 -mr-2 text-slate-700 hover:bg-slate-50 rounded-full transition-colors"
              onClick={toggleDrawer}
              aria-label="Toggle menu"
            >
              {drawerOpen ? <X size={26} strokeWidth={2.5} /> : <Menu size={26} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </div>

            {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 h-[100dvh] w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 flex flex-col md:hidden ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-lg font-bold text-primary tracking-tight">Menu</h2>
          <button
            onClick={toggleDrawer}
            className="p-2 -mr-2 rounded-full text-primary hover:bg-slate-50 transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Body */}
        <div className="flex-1 flex flex-col justify-between px-6 py-6 overflow-y-auto min-h-0">
          <div className="flex flex-col space-y-5">
            <Link
              to="/about"
              className="text-lg font-medium text-primary hover:text-primary transition-colors"
              onClick={toggleDrawer}
            >
              About Us
            </Link>
            <Link
              to="/how"
              className="text-lg font-medium text-primary hover:text-primary transition-colors"
              onClick={toggleDrawer}
            >
              How to Install
            </Link>
            <Link
              to="/contact"
              className="text-lg font-medium text-primary hover:text-primary transition-colors"
              onClick={toggleDrawer}
            >
              Contact
            </Link>
          </div>
          
          <div className="pt-6 border-t border-gray-100 flex flex-col space-y-3 flex-shrink-0 mt-6">
            <Link
              to="/login"
              onClick={toggleDrawer}
              className="w-full py-3 text-center text-primary font-medium rounded-xl hover:bg-slate-50 transition-colors border border-gray-100"
            >
              Log in
            </Link>
            <Link
              to="/register"
              onClick={toggleDrawer}
              className="w-full py-3 text-center bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity md:hidden"
          onClick={toggleDrawer}
        ></div>
      )}
    </nav>
  );
}






