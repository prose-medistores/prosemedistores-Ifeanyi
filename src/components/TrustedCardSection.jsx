import { motion } from "framer-motion";





export default function TrustedCareSection() {
  const features = [
    {
      title: "Certified Pharmacists",
      desc: "Our team consists of verified, licensed pharmacists dedicated to ensuring you receive the safest and most effective medications.",
      icon: "https://cdn-icons-png.flaticon.com/512/2920/2920244.png",
    },
    {
      title: "Authentic Medicines",
      desc: "We source only from NAFDAC-approved suppliers, guaranteeing every drug is original and effective — no counterfeits, ever.",
      icon: "https://cdn-icons-png.flaticon.com/512/3103/3103446.png",
    },
    {
      title: "Fast Delivery Nationwide",
      desc: "Order from anywhere in Nigeria — our express logistics partners deliver right to your doorstep, often the same day.",
      icon: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    },
    {
      title: "Affordable Healthcare",
      desc: "We believe quality healthcare should be accessible to all. Enjoy fair prices and periodic discounts on trusted brands.",
      icon: "https://cdn-icons-png.flaticon.com/512/2164/2164832.png",
    },
  ];
  return (
    <section className="bg-[#f9fafb] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Nigerians Trust <span className="text-primary">MediStore</span>
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            We go beyond selling medicines — we deliver care, convenience, and
            confidence in every order.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg text-center border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                <motion.img
                  src={item.icon}
                  alt={item.title}
                  className="w-16 h-16"
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 10 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <a
            href="#shop"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl font-medium shadow hover:shadow-md transition"
          >
            Start Shopping Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}