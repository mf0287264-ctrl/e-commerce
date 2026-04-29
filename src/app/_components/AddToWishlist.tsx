"use client";
import { useContext, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { toast } from "sonner";
import {
  addProductToWishlist,
  getWishlistLogs,
  removeProductFromWishlist,
} from "../_action/addToWishlist";
import { wishlistContext } from "../_Context/WishlistContext";
import { FaHeart } from "react-icons/fa";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export default function AddToWishlist({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const { setWishlistCounter, setWishlistProducts, wishlistProducts } =
    useContext(wishlistContext);
  const router = useRouter();
  const isInWishlist =
    wishlistProducts?.some((item) => item._id === productId) ?? false;
  async function addToWishlistHandler(productId: string) {
    setLoading(true);
    const res = await addProductToWishlist(productId);
    if (!res) {
      toast.info("you must login first", {
        position: "top-left",
        richColors: true,
        style: { background: "white", color: "green" },
      });
      setLoading(false);
      router.push("/login");
      return;
    }
    if (res.status == "fail") {
      toast.error(res.message, {
        position: "top-left",
        richColors: true,
      });
    } else if (res.status == "success") {
      toast.success(res.message, {
        position: "top-left",
        richColors: true,
      });
      setWishlistCounter(res.data.length);
      const fullWishlist = await getWishlistLogs();
      if (fullWishlist) {
        setWishlistProducts(fullWishlist.data);
      }
    }
    setLoading(false);
  }
  async function deleteFromWishList() {
    setLoading(true);

    try {
      const res = await removeProductFromWishlist(productId);

      if (!res || res.status !== "success") {
        toast.error(res?.message || "Failed to remove from wishlist", {
          position: "top-left",
          richColors: true,
        });
        return;
      }
      setWishlistCounter(res.data.length ?? 0);

      const fullWishlist = await getWishlistLogs();

      if (fullWishlist?.data) {
        setWishlistProducts(fullWishlist.data);
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-left",
        richColors: true,
      });
    } finally {
      setLoading(false);
    }
  }
  return isInWishlist ? (
    <button
      disabled={loading}
      onClick={deleteFromWishList}
      className="w-8 h-8 rounded-full shadow-2xl border flex items-center justify-center bg-white cursor-pointer hover:text-red-600"
    >
      {loading ? <Spinner /> : <FaHeart className="w-4 h-4 text-red-600" />}
    </button>
  ) : (
    <button
      disabled={loading}
      onClick={() => addToWishlistHandler(productId)}
      className="w-8 h-8 rounded-full shadow-2xl border flex items-center justify-center bg-white cursor-pointer hover:text-red-600"
    >
      {loading ? (
        <Spinner className="text-red-500" />
      ) : (
        <CiHeart className="w-5 h-5" />
      )}
    </button>
  );
}
