/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function Hero() {



  const phrases = [
    "trusted medicines",
    "quality healthcare",
    "affordable prescriptions",
    "doorstep delivery"
  ];
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsConsultOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const current = phrases[phraseIndex];
    let typingSpeed = isDeleting ? 60 : 100;
    const handleTyping = () => {
      setText(prev =>
        isDeleting ? current.substring(0, prev.length - 1) : current.substring(0, prev.length + 1)
      );
      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    };
    const timeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);





  return (
    <section id="home" className="pt-28 pb-16 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Fast, secure delivery of{" "}
            <span className="text-primary">{text}</span>
            <span className="border-r-2 border-primary ml-1 animate-pulse"></span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl">
            Order prescription and OTC drugs, consult a certified pharmacist, and get doorstep delivery.
            Safe, convenient and fast.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
  <a
    href="#shop"
    className="inline-flex items-center justify-center px-5 py-3 bg-primary text-white rounded-lg font-medium shadow hover:shadow-md transition"
  >
    Shop Medicines
  </a>

  {/* Dropdown Container */}
  <div className="relative inline-block text-left w-full sm:w-auto" ref={dropdownRef}>
    <button
      onClick={() => setIsConsultOpen(!isConsultOpen)}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 border border-primary rounded-lg font-medium text-primary hover:bg-primary hover:text-white transition"
    >
      Consult an Expert
      {/* Animated Chevron Icon */}
      <svg 
        className={`w-4 h-4 transition-transform duration-200 ${isConsultOpen ? 'rotate-180' : ''}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <AnimatePresence>
      {isConsultOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-0 mt-2 w-full sm:w-64 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden"
        >
          <div className="py-1">
            {/* Doctor WhatsApp Link */}
            <a
              href="https://wa.me/2348071964170?text=Hi,%20I%20would%20like%20to%20consult%20a%20Doctor%20in%20ProsemediStore"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 hover:bg-slate-50 transition-colors border-b border-gray-50 group"
            >
              <span className="block font-medium text-gray-800 group-hover:text-primary transition-colors">
                Speak with a Doctor
              </span>
              <span className="block text-xs text-gray-500 mt-0.5">
                Get medical advice & prescriptions
              </span>
            </a>

            {/* Pharmacist WhatsApp Link */}
            <a
              href="https://wa.me/2349072096805?text=Hi,%20I%20would%20like%20to%20consult%20a%20Pharmacist%20in%20ProsemediStore"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 hover:bg-slate-50 transition-colors group"
            >
              <span className="block font-medium text-gray-800 group-hover:text-primary transition-colors">
                Speak with a Pharmacist
              </span>
              <span className="block text-xs text-gray-500 mt-0.5">
                Questions about your medication
              </span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</div>
          <ul className="mt-8 grid grid-cols-3 gap-3 max-w-md">
            {[
              { title: "Verified", desc: "Certified pharmacists" },
              { title: "Secure", desc: "Safe payments" },
              { title: "Fast", desc: "Same-day delivery" },
            ].map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white p-3 rounded-lg text-center text-sm shadow-sm"
              >
                <strong className="block">{item.title}</strong>
                <span className="text-gray-500">{item.desc}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="order-last lg:order-last"
        >
          <div className="bg-white rounded-3xl p-5 shadow-soft">
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  name: "Paracetamol 500mg",
                  desc: "Pain relief",
                  img: "/parahero.jpg",
                },
                {
                  name: "Amoxicillin 250mg",
                  desc: "Antibiotic",
                  img: "/amoxhero.jpg",
                },
                {
                  name: "Vitamin C",
                  desc: "Supplement",
                  img: "/vitaminc.jpg",
                },
                {
                  name: "Ibuprofen 400mg",
                  desc: "Anti-inflammatory",
                  img: "/ibup.jpg",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
