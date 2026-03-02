"use client";

import { useCart } from "@/context/CartContext";
import { useUser } from "@clerk/nextjs";
import { Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, total } = useCart();
    const { user, isLoaded } = useUser();

    const handleWhatsAppOrder = () => {
        if (!user) return; // Should be protected by middleware

        const userName = user.fullName || "Customer";
        let message = `*NEW ORDER REQUEST* 🚀\n\n*Name:* ${userName}\n\n*Items:*\n`;

        items.forEach((item, index) => {
            message += `${index + 1}. ${item.name} (${item.material}) x ${item.quantity}\n`;
        });

        message += `\n*Pricing will be discussed here.*\n\nPlease confirm my order.`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/919380376606?text=${encodedMessage}`, "_blank");
    };

    if (!isLoaded) return <div className="min-h-[60vh] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-400"></div></div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 min-h-[80vh]">
            <h1 className="text-3xl font-bold mb-8">Shopping <span className="text-gold-400">Cart</span></h1>

            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[40vh] border border-dark-800 rounded-xl bg-dark-900/50 backdrop-blur-sm">
                    <p className="text-gray-400 mb-6">Your cart is empty.</p>
                    <Link href="/shop" className="px-6 py-3 bg-gold-400 text-dark-950 font-bold rounded-md hover:bg-gold-300 transition-colors shadow-glow-gold">
                        Browse Models
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        {items.map((item) => (
                            <div key={`${item.id}-${item.material}`} className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-dark-900 border border-dark-800 rounded-xl shadow-lg relative glow-hover">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-dark-800 rounded-md overflow-hidden shrink-0">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-dark-500">Image</div>
                                    )}
                                </div>

                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                                    <div className="text-sm text-gold-400 mb-4">{item.material} / Price on request</div>

                                    <div className="flex items-center justify-center sm:justify-start gap-4">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.material, item.quantity - 1)}
                                            className="p-2 border border-dark-800 rounded hover:bg-dark-800 transition-colors"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.material, item.quantity + 1)}
                                            className="p-2 border border-dark-800 rounded hover:bg-dark-800 transition-colors"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="sm:ml-auto flex flex-col items-end gap-4 mt-4 sm:mt-0 text-right">
                                    <div className="text-sm text-gray-400 font-bold">TBD</div>
                                    <button
                                        onClick={() => removeFromCart(item.id, item.material)}
                                        className="text-red-500 hover:text-red-400 text-sm flex items-center gap-1 group"
                                    >
                                        <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform" /> Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Checkout Summary */}
                    <div className="bg-dark-900 border border-dark-800 rounded-xl p-8 h-fit shadow-lg outline-1 outline-gold-400/10 outline">
                        <h2 className="text-xl font-bold mb-6 border-b border-dark-800 pb-4">Order Summary</h2>
                        <div className="space-y-4 mb-6 text-gray-300">
                            <div className="flex justify-between">
                                <span>Subtotal ({items.reduce((acc, curr) => acc + curr.quantity, 0)} items)</span>
                                <span>TBD</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Shipping</span>
                                <span>Calculated on WhatsApp</span>
                            </div>
                        </div>
                        <div className="border-t border-dark-800 pt-6 mb-8 flex justify-between items-end">
                            <span className="text-lg font-bold">Estimated Total</span>
                            <span className="text-2xl font-bold text-gold-400">TBD</span>
                        </div>

                        <button
                            onClick={handleWhatsAppOrder}
                            disabled={!user}
                            className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-all shadow-glow-gold hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Order on WhatsApp <ArrowRight className="h-5 w-5" />
                        </button>
                        {!user && (
                            <p className="text-sm text-red-400 mt-4 text-center">Please login to request an order.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
