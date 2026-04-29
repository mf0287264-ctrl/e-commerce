"use client";
import React, { useContext, useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa";
import { addToCard, deleteProductFromCard } from "../_action/addToCart";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { cartContextP } from "../_Context/CartContext";
import { useSession } from "next-auth/react";

export default function AddToCardBtn({
  productId,
  product,
}: {
  productId: string;
  product?: {
    _id: string;
    title: string;
    imageCover: string;
    price: number;
    category: { name: string };
  };
}) {
  const [loading, setLoading] = useState(false);
  const {
    setCartCounter,
    setTotalPrice,
    setTotalProducts,
    setCardId,
    totalProducts,
    localCart,
    addToLocalCart,
    removeFromLocalCart,
  } = useContext(cartContextP);
  const { data: session } = useSession();

  const isInCart = session
    ? (totalProducts?.some((item) => item.product._id === productId) ?? false)
    : localCart.some((item) => item._id === productId);

  async function addToCardHandler() {
    if (!session) {
      if (!product) return;
      addToLocalCart({ ...product, count: 1 });
      toast.success("Added to cart", {
        position: "top-left",
        richColors: true,
        description: "Sign in to save your cart permanently",
      });
      return;
    }
    setLoading(true);
    const res = await addToCard(productId);
    if (!res) {
      setLoading(false);
      return;
    }
    if (res.status === "success") {
      toast.success(res.message, { position: "top-left", richColors: true });
      setCartCounter(res.numOfCartItems);
      setTotalProducts(res.data.products);
      setTotalPrice(res.data.totalCartPrice);
      setCardId(res.cartId);
    } else {
      toast.error(res.message, { position: "top-left", richColors: true });
    }
    setLoading(false);
  }

  async function deleteHandler() {
    if (!session) {
      removeFromLocalCart(productId);
      return;
    }
    setLoading(true);
    const res = await deleteProductFromCard(productId);
    if (!res) {
      setLoading(false);
      return;
    }
    setCartCounter(res.numOfCartItems ?? 0);
    setTotalPrice(res.data.totalCartPrice ?? 0);
    setTotalProducts(res.data.products ?? []);
    setLoading(false);
  }

  return isInCart ? (
    <button
      disabled={loading}
      onClick={deleteHandler}
      className="bg-[#16A34A] text-white w-8 h-8 rounded-full flex items-center justify-center text-lg hover:bg-green-700 transition duration-200 cursor-pointer"
    >
      {loading ? <Spinner /> : <FaCheck className="text-xl" />}
    </button>
  ) : (
    <button
      disabled={loading}
      onClick={addToCardHandler}
      className="bg-[#16A34A] text-white w-8 h-8 rounded-full flex items-center justify-center text-lg hover:bg-green-700 transition duration-200 cursor-pointer"
    >
      {loading ? <Spinner /> : <FaPlus className="text-xl" />}
    </button>
  );
}
