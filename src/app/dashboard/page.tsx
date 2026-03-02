"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, ShoppingBag, Headphones, ArrowRight, Clock } from "lucide-react";

export default function DashboardPage() {
    const { user, isLoaded } = useUser();
    const [recentRequests, setRecentRequests] = useState<Record<string, string>[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("apex-requests");
        if (saved) {
            try {
                setRecentRequests(JSON.parse(saved).reverse()); // newest first
            } catch {
                console.error("Failed to parse requests");
            }
        }
    }, []);

    if (!isLoaded) {
        return <div className="min-h-[80vh] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-gold-400 border-t-transparent rounded-full animate-spin"></div>
        </div>;
    }

    if (!user) {
        return <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold mb-4">You need to log in to access the dashboard</h2>
            <a href="/sign-in" className="px-6 py-3 bg-gold-400 text-dark-950 font-bold rounded shadow-glow-gold hover:bg-gold-300">Log In</a>
        </div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 min-h-[80vh]">
            <div className="mb-12">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                    Welcome back, <span className="text-gold-400">{user.firstName || "Creator"}</span>
                </h1>
                <p className="text-gray-400 text-lg">Manage your custom 3D printing requests here.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {/* Quick Actions */}
                <Link href="/upload" className="group p-6 bg-dark-900 border border-dark-800 rounded-xl hover:border-gold-400/50 transition-all hover:-translate-y-1 shadow-glow-hover flex items-center gap-4">
                    <div className="bg-gold-400/10 p-4 rounded-lg group-hover:bg-gold-400/20 transition-colors">
                        <PlusCircle className="h-8 w-8 text-gold-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white group-hover:text-gold-400 transition-colors">New Request</h3>
                        <p className="text-sm text-gray-400">Upload a 3D model</p>
                    </div>
                </Link>
                <Link href="/shop" className="group p-6 bg-dark-900 border border-dark-800 rounded-xl hover:border-gold-400/50 transition-all hover:-translate-y-1 shadow-glow-hover flex items-center gap-4">
                    <div className="bg-dark-800 p-4 rounded-lg group-hover:bg-dark-950 border border-transparent group-hover:border-gold-400/20 transition-all">
                        <ShoppingBag className="h-8 w-8 text-white group-hover:text-gold-400 transition-colors" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white group-hover:text-gold-400 transition-colors">Shop Models</h3>
                        <p className="text-sm text-gray-400">Browse ready prints</p>
                    </div>
                </Link>
                <a href="https://wa.me/919380376606" target="_blank" rel="noopener noreferrer" className="group p-6 bg-dark-900 border border-dark-800 rounded-xl hover:border-gold-400/50 transition-all hover:-translate-y-1 shadow-glow-hover flex items-center gap-4">
                    <div className="bg-dark-800 p-4 rounded-lg group-hover:bg-dark-950 border border-transparent group-hover:border-gold-400/20 transition-all">
                        <Headphones className="h-8 w-8 text-white group-hover:text-gold-400 transition-colors" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white group-hover:text-gold-400 transition-colors">Support</h3>
                        <p className="text-sm text-gray-400">Chat on WhatsApp</p>
                    </div>
                </a>
            </div>

            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Clock className="text-gold-400 h-6 w-6" /> Quotation History
                    </h2>
                    <span className="text-xs text-gray-500 bg-dark-900 px-3 py-1 rounded-full border border-dark-800">Stored on your device</span>
                </div>

                {recentRequests.length === 0 ? (
                    <div className="bg-dark-900 border border-dark-800 rounded-xl p-12 text-center flex flex-col items-center">
                        <Clock className="h-12 w-12 text-dark-500 mb-4" />
                        <p className="text-gray-400 text-lg mb-6">You haven&apos;t requested any quotations yet.</p>
                        <Link href="/upload" className="text-gold-400 font-semibold hover:underline flex items-center gap-2">
                            Start your first project <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-dark-950 border-b border-dark-800 text-gray-400 text-sm">
                                        <th className="p-4 font-semibold">Date</th>
                                        <th className="p-4 font-semibold">Dimensions (mm)</th>
                                        <th className="p-4 font-semibold">Material</th>
                                        <th className="p-4 font-semibold">Qty</th>
                                        <th className="p-4 font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dark-800/50">
                                    {recentRequests.map((req, idx) => (
                                        <tr key={idx} className="hover:bg-dark-800/50 transition-colors">
                                            <td className="p-4 text-white">
                                                {new Date(req.date).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 text-gray-300">
                                                {req.length} x {req.width} x {req.height}
                                            </td>
                                            <td className="p-4 text-gray-300">
                                                <span className="bg-dark-950 px-2 py-1 rounded text-xs border border-dark-800">{req.material}</span> {req.color && `- ${req.color}`}
                                            </td>
                                            <td className="p-4 text-gray-300">{req.quantity}</td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gold-400/10 text-gold-400 border border-gold-400/20">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span> Requested
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
