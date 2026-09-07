import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
/**
 * AboutUs.jsx
 * Production-grade About page for ProseMediStore / MediStore
 *
 * Usage:
 *  - Put this file into src/pages/AboutUs.jsx
 *  - Ensure framer-motion and Tailwind are installed and configured
 *  - Adjust images, copy, and links as needed
 */
export default function AboutUs() {
  const featureCards = [
    {
      title: "Verified Medicines",
      desc: "We source from certified suppliers and ensure every product is genuine.",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2l3 6 6 .5-4.5 3.9 1.5 6L12 16l-6 2.4 1.5-6L3 8.5 9 8 12 2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: "Licensed Pharmacists",
      desc: "Talk to certified pharmacists and get professional guidance when you need it.",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: "Fast Delivery",
      desc: "Same-day and next-day options available — right to your door.",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 12h14l4 5V7l-4 5H3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];
  const team = [
  { 
    name: "Dr. Precious Ohakosim", 
    role: "Doctor 1", 
    img: "/ify.jpg" 
  },
  { 
    name: "Dr. Glory Ekanem", 
    role: "Doctor 2", 
    img: "/glory.jpg" 
  },
  { 
    name: "Dr. Gift Seikakere", 
    role: "Doctor 3", 
    img: "/gift.jpg" 
  },
  { 
    name: "Charles Ademola", 
    role: "CTO", 
    img: "/char2.jpg" 
  },
  { 
    name: "Miss Oselumehse Beckley", 
    role: "Healthcare Assistant", 
    img: "/ose.jpg" 
  },
  { 
    name: "Mr Izunna Fortune", 
    role: "Customer Support", 
    img: "/izunna.jpg" 
  },
];
  return (
    <div className="min-h-screen bg-light text-gray-900">
      {/* HERO */}
      <header className="bg-gradient-to-r from-primary to-primary/80 text-white">
      <Navbar/>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              About <span className="text-white/95">ProseMediStore</span>
            </h1>
            <p className="mt-4 max-w-2xl text-primary/10 text-lg md:text-xl">
              We make trusted medicines and healthcare advice accessible to everyone — safely, quickly and affordably. From verified products to licensed pharmacists, we cover the entire care journey.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#mission" className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-semibold rounded-lg shadow hover:opacity-95 transition">
                Our Mission
              </a>
              <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition">
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
        {/* Mission */}
        <section id="mission" className="bg-white rounded-2xl shadow p-8 md:p-12">
          <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
            <p className="mt-3 text-gray-600 max-w-3xl">
              To combine technology, clinical expertise and reliable supply-chain practices to deliver genuine medicines and expert guidance to users anywhere in the country.
              We aim to reduce the friction of getting medicine by making ordering, consultation, and delivery seamless and secure.
            </p>
          </motion.div>
        </section>
        {/* Feature Cards */}
        <section className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-3">
          {featureCards.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition flex gap-4 items-start"
            >
              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                {f.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{f.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </section>
        {/* Stats + Story */}
        <section className="mt-10 grid gap-6 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow">
            <motion.h3 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-xl font-semibold text-gray-800">How we started</motion.h3>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-3 text-gray-600">
              Founded by a small team of pharmacists and engineers, ProseMediStore began with a single idea: reliable medicine delivery with trusted medical counsel. Over the years we've scaled our supply chain, built a responsive support team and integrated expert pharmacists into our platform so every customer feels safe.
            </motion.p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-primary/5 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-primary">20k+</p>
                <p className="text-sm text-gray-500 mt-1">Orders delivered</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-primary">4.9</p>
                <p className="text-sm text-gray-500 mt-1">Avg. rating</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-primary">50+</p>
                <p className="text-sm text-gray-500 mt-1">Certified pharmacists</p>
              </div>
            </div>
          </div>
          <aside className="bg-white p-6 rounded-2xl shadow flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Quality & Safety</h4>
              <p className="mt-2 text-sm text-gray-500">
                We run supplier audits, batch verification and safe-packaging checks for every order.
              </p>
            </div>
            <div className="mt-6">
              <h5 className="text-sm text-gray-500">Headquarters</h5>
              <p className="text-sm text-gray-700 mt-1">Administrative Office: 3C7J+8PW. Utako</p>
            </div>
          </aside>
        </section>
        {/* Team */}
        <section className="mt-10 bg-white p-8 rounded-2xl shadow">
      <div className="max-w-2xl mx-auto text-center sm:text-left sm:mx-0">
  <motion.h3 
    initial={{ opacity: 0, y: 10 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true }}
    className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
  >
    The minds behind your care
  </motion.h3>
  
  <motion.p 
    initial={{ opacity: 0, y: 10 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true }}
    transition={{ delay: 0.1 }}
    className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg"
  >
    We’re a dedicated collective of pharmaceutical experts and technologists, united by a single mission: making your health and convenience our top priority.
  </motion.p>
</div>
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {team.map((m, idx) => (
          <motion.article 
            key={m.name} 
            initial={{ opacity: 0, y: 12 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ delay: idx * 0.12 }} 
            className="bg-white rounded-xl p-4 text-center shadow"
          >
            <img 
              src={m.img} 
              alt={m.name} 
              className="mx-auto w-28 h-28 rounded-full object-cover border-4 border-white shadow-sm" 
            />
            <h4 className="mt-4 font-semibold text-gray-800">{m.name}</h4>
            <p className="text-sm text-gray-500">{m.role}</p>
          </motion.article>
        ))}
      </div>
   </section>
        
        {/* CTA */}
        <section id="contact" className="mt-10 bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl p-8 text-center">
          <motion.h3 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-2xl font-semibold">
            Ready to get started?
          </motion.h3>
          <p className="mt-3 text-blue-100 max-w-xl mx-auto">
            Order trusted medicines, consult with our experts, and get safe delivery right away.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a href="/#shop" className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:opacity-95">Shop Now</a>
            <a href="https://wa.me/2348162738527" target="_blank" rel="noreferrer" className="border border-white/30 px-6 py-3 rounded-lg">Chat with Pharmacist</a>
          </div>
        </section>
        
      </main>

      {/* Your Main Footer Component goes here! */}
      <Footer />
      
    </div>
  );
}









