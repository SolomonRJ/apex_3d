import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "APEX 3D PRINTS | Turn Your Ideas Into Reality",
  description: "Precision 3D Printing for Prototypes, Gifts & Custom Designs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
        },
        variables: {
          colorPrimary: "#D4AF37",
          colorBackground: "#050505",
          colorInputBackground: "#1a1a1a",
          colorInputText: "#fcfcfc",
          colorText: "#fcfcfc",
          colorTextSecondary: "#a3a3a3",
        },
      }}
    >
      <html lang="en" className="dark scroll-smooth">
        <body className={`${inter.className} min-h-screen flex flex-col pt-20 bg-background text-foreground`}>
          <CartProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
