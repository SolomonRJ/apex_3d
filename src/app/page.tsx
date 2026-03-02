"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Box, Cpu, Cuboid, Gift, PenTool, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const services = [
  { icon: Box, title: "Custom 3D Printing", desc: "High precision printing for any design." },
  { icon: Cpu, title: "Prototype Manufacturing", desc: "Rapid prototyping for engineering." },
  { icon: Cuboid, title: "Miniatures & Figures", desc: "Detailed resin prints for collectors." },
  { icon: Gift, title: "Custom Gifting", desc: "Personalized 3D gifts for loved ones." },
  { icon: PenTool, title: "Product Design Assistance", desc: "We help turn ideas into 3D models." },
];

const featuredModels = [
  { id: "1", name: "Dragon Statue", material: "Resin", price: 1500, image: "/images/1.png" },
  { id: "2", name: "Custom Name Stand", material: "PLA", price: 500, image: "/images/2.jpg" },
  { id: "3", name: "Mechanical Gear Model", material: "PETG", price: 1200, image: "/images/3.png" },
  { id: "4", name: "Architectural Mini House", material: "PLA", price: 2000, image: "/images/4.png" },
  { id: "5", name: "Customized Keychain", material: "PLA", price: 250, image: "/images/5.png" },
  { id: "6", name: "Sci-Fi Helmet Prop", material: "ABS", price: 4500, image: "/images/6.jpeg" },
  { id: "7", name: "Articulated Snake", material: "Flexible", price: 800, image: "/images/7.jpeg" },
  { id: "8", name: "Vase Geometry", material: "PETG", price: 600, image: "/images/8.jpeg" },
  { id: "9", name: "Fantasy Miniature", material: "Resin", price: 900, image: "/images/10.jpeg" },
  { id: "10", name: "Phone Desk Stand", material: "PLA", price: 400, image: "/images/11.jpeg" },
  { id: "11", name: "RC Car Parts", material: "PETG", price: 1100, image: "/images/12.jpeg" },
  { id: "12", name: "Modern Lampshade", material: "PLA", price: 1800, image: "/images/13.jpeg" },
];

export default function Home() {
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-hero-gradient"></div>

        {/* Animated Background Wireframe (CSS Based Fake) */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-[1px] border-gold-400 border-dashed animate-[spin_60s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-[1px] border-gold-500/50 border-solid animate-[spin_40s_linear_infinite_reverse]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border-[1px] border-gold-600/30 border-dashed animate-[spin_20s_linear_infinite]" />
        </div>

        {/* Central Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold-400/20 blur-[150px] rounded-full z-0" />

        <div className="z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Turn Your Ideas Into <br className="hidden md:block" />
              <span className="gold-gradient-text">Reality</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-10 font-light max-w-2xl mx-auto"
          >
            Precision 3D Printing for Prototypes, Gifts & Custom Designs
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/shop"
              className="group relative px-8 py-4 bg-gold-400 text-dark-950 font-bold rounded-md overflow-hidden transition-all hover:scale-105 shadow-glow-gold hover:shadow-glow-gold-lg w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                View Models <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="/upload"
              className="group px-8 py-4 bg-transparent text-gold-400 border border-gold-400/50 hover:border-gold-400 font-bold rounded-md transition-all hover:bg-gold-400/10 hover:shadow-glow-gold w-full sm:w-auto text-center"
            >
              Upload Your Design
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-24 bg-dark-950 px-4 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our <span className="text-gold-400">Services</span></h2>
            <div className="w-24 h-1 bg-gold-400 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-8 rounded-xl hover:-translate-y-2 transition-transform duration-300 group"
              >
                <div className="w-14 h-14 rounded-lg bg-dark-800 border border-gold-400/20 flex items-center justify-center mb-6 group-hover:bg-gold-400/10 group-hover:border-gold-400/50 transition-colors">
                  <service.icon className="h-7 w-7 text-gold-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Models Section */}
      <section className="w-full py-24 bg-background px-4 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/10 to-transparent" />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured <span className="text-gold-400">Models</span></h2>
              <div className="w-24 h-1 bg-gold-400 rounded-full" />
            </div>
            <Link href="/shop" className="text-gold-400 hover:text-gold-300 flex items-center gap-2 mt-4 md:mt-0 font-medium group transition-colors">
              View all items <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredModels.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-dark-900 border border-dark-800 hover:border-gold-400/50 rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-glow-gold hover:-translate-y-1"
              >
                <div className="relative h-64 w-full overflow-hidden bg-dark-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-dark-950/80 backdrop-blur-sm border border-gold-400/30 rounded text-xs text-gold-400 font-medium">
                    {item.material}
                  </div>
                </div>
                <div className="p-5 flex flex-col justify-between h-[140px]">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-400">Discuss on WhatsApp</p>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full py-2.5 mt-3 bg-dark-800 hover:bg-gold-400 text-gold-400 hover:text-dark-950 rounded transition-all flex items-center justify-center gap-2 font-semibold text-sm border border-gold-400/20 hover:border-gold-400"
                  >
                    <ShoppingCart className="h-4 w-4" /> Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 bg-dark-950 px-4">
        <div className="max-w-4xl mx-auto text-center border border-gold-400/20 p-12 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gold-400/5 backdrop-blur-3xl z-0" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to print your idea?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Upload your 3D model now and get a fully customized quote. We support PLA, PETG, ABS, and Resin printing.
            </p>
            <Link
              href="/upload"
              className="inline-block px-10 py-4 bg-gold-400 text-dark-950 font-bold rounded-md transition-all hover:scale-105 shadow-glow-gold"
            >
              Upload Model Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
