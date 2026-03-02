"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ShoppingCart, Menu, X } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/upload", label: "Upload Model" },
    { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { itemCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when path changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <nav
            className={cn(
                "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent",
                scrolled
                    ? "bg-dark-950/80 backdrop-blur-md border-gold-400/20 shadow-glow-gold"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 group">
                            <Image src="/images/logo.jpeg" alt="APEX 3D PRINTS Logo" width={40} height={40} className="rounded-md object-cover" />
                            <span className="font-bold text-xl tracking-wider text-foreground whitespace-nowrap">
                                APEX <span className="gold-gradient-text">3D</span> PRINTS
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-gold-400 relative",
                                    pathname === link.href ? "text-gold-400" : "text-gray-300"
                                )}
                            >
                                {link.label}
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute -bottom-1 left-0 w-full h-[2px] bg-gold-400"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/cart" className="relative group">
                            <ShoppingCart className="h-6 w-6 text-gray-300 group-hover:text-gold-400 transition-colors" />
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-gold-500 text-dark-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </Link>

                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="px-5 py-2.5 text-sm font-semibold rounded-md bg-dark-800 text-gold-400 border border-gold-400/30 hover:bg-gold-400 hover:text-dark-950 hover:shadow-glow-gold transition-all duration-300">
                                    Log In
                                </button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <Link href="/cart" className="relative">
                            <ShoppingCart className="h-6 w-6 text-gray-300" />
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-gold-500 text-dark-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white"
                        >
                            {isOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-dark-950 border-b border-gold-400/20"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "block px-3 py-3 rounded-md text-base font-medium",
                                        pathname === link.href
                                            ? "text-gold-400 bg-dark-800"
                                            : "text-gray-300 hover:text-gold-400 hover:bg-dark-800"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="mt-4 px-3">
                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <button className="w-full px-5 py-3 text-sm font-semibold rounded-md bg-dark-800 text-gold-400 border border-gold-400/30 hover:bg-gold-400 hover:text-dark-950 transition-all">
                                            Log In
                                        </button>
                                    </SignInButton>
                                </SignedOut>
                                <SignedIn>
                                    <div className="py-3">
                                        <UserButton afterSignOutUrl="/" />
                                    </div>
                                </SignedIn>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
