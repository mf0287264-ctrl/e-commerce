"use client";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useRef } from "react";
import { cartContextP } from "../_Context/CartContext";
import { addToCard } from "../_action/addToCart";
import { toast } from "sonner";

export default function CartSyncOnLogin() {
  const { data: session } = useSession();
  const {
    localCart,
    clearLocalCart,
    setCartCounter,
    setTotalProducts,
    setTotalPrice,
    setCardId,
  } = useContext(cartContextP);
  const synced = useRef(false);

  useEffect(() => {
    if (!session || localCart.length === 0 || synced.current) return;
    synced.current = true;

    async function sync() {
      toast.loading("Syncing your cart...", {
        id: "cart-sync",
        richColors: true,
        position: "top-right",
      });
      let lastRes;
      for (const item of localCart) {
        for (let i = 0; i < item.count; i++) {
          lastRes = await addToCard(item._id);
        }
      }
      if (lastRes?.status === "success") {
        setCartCounter(lastRes.numOfCartItems);
        setTotalProducts(lastRes.data.products);
        setTotalPrice(lastRes.data.totalCartPrice);
        setCardId(lastRes.cartId);
        clearLocalCart();
        toast.success("Cart synced successfully!", {
          id: "cart-sync",
          richColors: true,
          position: "top-right",
        });
      }
    }

    sync();
  }, [session]);

  return null;
}
