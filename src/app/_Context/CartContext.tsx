"use client";
import { CartProduct, CartType } from "@/types/Cart.type";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface LocalCartItem {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  category: { name: string };
  count: number;
}

interface CartContextType {
  cartCounter: number;
  setCartCounter: (value: number) => void;
  totalPrice: number;
  setTotalPrice: (value: number) => void;
  totalProducts: CartProduct[] | undefined;
  setTotalProducts: (value: CartProduct[] | undefined) => void;
  cartId: string | null;
  setCardId: (value: string | null) => void;
  localCart: LocalCartItem[];
  addToLocalCart: (product: LocalCartItem) => void;
  removeFromLocalCart: (productId: string) => void;
  clearLocalCart: () => void;
  updateLocalCart: (productId: string, count: number) => void;
}

export const cartContextP = createContext({} as CartContextType);

export default function CartContext({
  children,
  cartData,
}: {
  children: ReactNode;
  cartData: CartType | null;
}) {
  const [cartCounter, setCartCounter] = useState(cartData?.numOfCartItems ?? 0);
  const [totalPrice, setTotalPrice] = useState(
    cartData?.data?.totalCartPrice ?? 0,
  );
  const [totalProducts, setTotalProducts] = useState(
    cartData?.data?.products ?? undefined,
  );
  const [cartId, setCardId] = useState(cartData?.cartId ?? null);
  const [localCart, setLocalCart] = useState<LocalCartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("guest_cart");
    if (stored) setLocalCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("guest_cart", JSON.stringify(localCart));
  }, [localCart]);

  function addToLocalCart(product: LocalCartItem) {
    setLocalCart((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, count: item.count + 1 } : item,
        );
      }
      return [...prev, { ...product, count: 1 }];
    });
  }

  function removeFromLocalCart(productId: string) {
    setLocalCart((prev) => prev.filter((item) => item._id !== productId));
  }

  function updateLocalCart(productId: string, count: number) {
    if (count < 1) return;
    setLocalCart((prev) =>
      prev.map((item) => (item._id === productId ? { ...item, count } : item)),
    );
  }

  function clearLocalCart() {
    setLocalCart([]);
    localStorage.removeItem("guest_cart");
  }

  return (
    <cartContextP.Provider
      value={{
        cartCounter,
        setCartCounter,
        totalPrice,
        setTotalPrice,
        totalProducts,
        setTotalProducts,
        cartId,
        setCardId,
        localCart,
        addToLocalCart,
        removeFromLocalCart,
        clearLocalCart,
        updateLocalCart,
      }}
    >
      {children}
    </cartContextP.Provider>
  );
}
