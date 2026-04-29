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

export default function AddToWishlistProduct({
  productId,
}: {
  productId: string;
}) {
  const { setWishlistCounter, setWishlistProducts, wishlistProducts } =
    useContext(wishlistContext);
  const isInWishlist =
    wishlistProducts?.some((item) => item._id === productId) ?? false;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
      className={`hover:border-red-600 transition group flex-1
         flex items-center justify-center gap-2 border
          cursor-pointer hover:border-gray-300
         text-gray-600 rounded-xl py-2.5 text-sm font-medium transition bg-red-50 border-red-600`}
    >
      {loading ? (
        <Spinner className="text-red-500" />
      ) : (
        <FaHeart className=" text-red-700" />
      )}

      <span className="text-red-700">Remove from Wishlist</span>
    </button>
  ) : (
    <button
      disabled={loading}
      onClick={() => addToWishlistHandler(productId)}
      className={`hover:border-red-600 transition group flex-1
         flex items-center justify-center gap-2 border
      border-gray-200  cursor-pointer hover:border-gray-300
         text-gray-600 rounded-xl py-2.5 text-sm font-medium transition`}
    >
      {loading ? (
        <Spinner className="text-red-500" />
      ) : (
        <CiHeart className="text-xl group-hover:text-red-700" />
      )}
      <span className={`group-hover:text-red-700`}>Add to Wishlist</span>
    </button>
  );
}
