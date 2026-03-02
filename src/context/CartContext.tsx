"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
    id: string;
    name: string;
    material: string;
    price: number;
    quantity: number;
    image?: string;
};

type CartContextType = {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    removeFromCart: (id: string, material: string) => void;
    updateQuantity: (id: string, material: string, quantity: number) => void;
    clearCart: () => void;
    total: number;
    itemCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("apex-cart");
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch {
                console.error("Failed to parse cart");
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("apex-cart", JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addToCart = (newItem: Omit<CartItem, "quantity">) => {
        setItems((current) => {
            const existing = current.find(
                (i) => i.id === newItem.id && i.material === newItem.material
            );
            if (existing) {
                return current.map((i) =>
                    i.id === newItem.id && i.material === newItem.material
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...current, { ...newItem, quantity: 1 }];
        });
    };

    const removeFromCart = (id: string, material: string) => {
        setItems((current) =>
            current.filter((i) => !(i.id === id && i.material === material))
        );
    };

    const updateQuantity = (id: string, material: string, quantity: number) => {
        if (quantity < 1) return;
        setItems((current) =>
            current.map((i) =>
                i.id === id && i.material === material ? { ...i, quantity } : i
            )
        );
    };

    const clearCart = () => setItems([]);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                total,
                itemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
