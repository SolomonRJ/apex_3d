"use client";

import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

const products = [
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

export default function ShopPage() {
    const { addToCart } = useCart();

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 min-h-[80vh]">
            <div className="text-center mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold mb-4"
                >
                    Explore Our <span className="text-gold-400">Models</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 max-w-2xl mx-auto"
                >
                    Browse our collection of precision-printed 3D models. From rapid prototypes to detailed resin miniatures.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        className="bg-dark-900 border border-dark-800 hover:border-gold-400/50 rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-glow-gold hover:-translate-y-1 flex flex-col"
                    >
                        <div className="relative h-64 w-full overflow-hidden bg-dark-800 shrink-0">
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={500}
                                height={300}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute top-3 left-3 px-3 py-1 bg-dark-950/80 backdrop-blur-sm border border-gold-400/30 rounded text-xs text-gold-400 font-medium">
                                {item.material}
                            </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1 justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                                <p className="text-sm text-gray-400 font-medium">Discuss on WhatsApp</p>
                            </div>

                            <button
                                onClick={() => addToCart(item)}
                                className="w-full py-2.5 mt-5 bg-dark-800 hover:bg-gold-400 text-gold-400 hover:text-dark-950 rounded transition-all flex items-center justify-center gap-2 font-semibold text-sm border border-gold-400/20 hover:border-gold-400"
                            >
                                <ShoppingCart className="h-4 w-4" /> Add to Cart
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
