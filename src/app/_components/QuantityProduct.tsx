"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { RiFlashlightFill } from "react-icons/ri";
import { TiShoppingCart } from "react-icons/ti";
import { toast } from "sonner";
import { addToCard } from "../_action/addToCart";
import { cartContextP } from "../_Context/CartContext";
import AddToWishlistProduct from "./AddToWishlistProduct";

export default function QuantityProduct({
  productId,
  maxQuantity,
  price,
  product,
}: {
  productId: string;
  maxQuantity: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    price: number;
    category: { name: string };
  };
}) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const {
    setCartCounter,
    setTotalPrice,
    setTotalProducts,
    setCardId,
    addToLocalCart,
  } = useContext(cartContextP);
  const { data: session } = useSession();

  async function addToCardHandler() {
    if (!session) {
      for (let i = 0; i < quantity; i++) {
        addToLocalCart({ ...product, count: 1 });
      }
      toast.success("Added to cart", {
        position: "top-left",
        richColors: true,
        description: "Sign in to save your cart permanently",
      });
      setQuantity(1);
      return;
    }

    setLoading(true);
    for (let i = 0; i < quantity - 1; i++) {
      await addToCard(productId);
    }
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
      setQuantity(1);
    } else {
      toast.error(res.message, { position: "top-left", richColors: true });
    }
    setLoading(false);
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Quantity</span>
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setQuantity((v) => Math.max(1, v - 1))}
            className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition text-lg font-bold cursor-pointer"
          >
            −
          </button>
          <span className="px-4 py-2 text-sm font-semibold text-gray-800 border-x border-gray-200 min-w-[40px] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((v) => Math.min(maxQuantity, v + 1))}
            className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition text-lg font-bold cursor-pointer"
          >
            +
          </button>
        </div>
        <span className="text-sm text-gray-400">{maxQuantity} available</span>
      </div>

      <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
        <span className="text-sm text-gray-500 font-medium">Total Price:</span>
        <span className="text-lg font-bold text-[#16A34A]">
          {price * quantity} EGP
        </span>
      </div>

      <div className="flex gap-3">
        <button
          disabled={loading}
          onClick={addToCardHandler}
          className="cursor-pointer shadow-sm shadow-[#16a34a] flex-1 flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold rounded-xl py-3 transition-all text-sm"
        >
          <TiShoppingCart className="text-xl" />
          {loading ? <Spinner /> : <span>Add to Cart</span>}
        </button>
        <button className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl py-3 transition-all text-sm">
          <RiFlashlightFill className="text-white text-xl" /> Buy Now
        </button>
      </div>

      <div className="flex items-center gap-2">
        <AddToWishlistProduct productId={productId} />
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border border-gray-200 hover:border-green-600 text-gray-600 rounded-xl p-2.5 transition cursor-pointer h-10 w-10"
            >
              <FaShareAlt className="text-xl" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input
                  id="link"
                  defaultValue={process.env.NEXT_PUBLIC_URL!}
                  readOnly
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
