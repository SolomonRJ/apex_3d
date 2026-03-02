import Link from "next/link";
import { MessageCircle, Instagram } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-dark-950 border-t border-gold-400/20 py-12 px-4 sm:px-6 lg:px-8 mt-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                {/* Brand */}
                <div className="flex flex-col items-center md:items-start space-y-4">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Image src="/images/logo.jpeg" alt="APEX 3D PRINTS Logo" width={40} height={40} className="rounded-md object-cover" />
                        <span className="font-bold text-xl tracking-wider text-foreground">
                            APEX <span className="gold-gradient-text">3D</span> PRINTS
                        </span>
                    </Link>
                    <p className="text-gray-400 text-sm font-light">
                        &quot;Get Your Thoughts Into Hands&quot;
                    </p>
                </div>

                {/* Socials & Contact */}
                <div className="flex items-center gap-6">
                    <a
                        href="https://www.instagram.com/apex3dprints.co"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-dark-800 rounded-full hover:bg-gold-400 hover:text-dark-950 transition-all shadow-glow-gold hover:scale-110"
                    >
                        <Instagram className="h-5 w-5" />
                    </a>
                    <a
                        href="https://wa.me/919380376606"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-dark-800 rounded-full hover:bg-green-500 hover:text-white transition-all shadow-glow-gold hover:scale-110"
                    >
                        <MessageCircle className="h-5 w-5" />
                    </a>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-dark-800 text-center text-gray-500 text-sm">
                <p>© 2026 APEX 3D PRINTS. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
