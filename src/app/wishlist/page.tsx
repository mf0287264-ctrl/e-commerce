"use client";

import { useContext, useState } from "react";
import { wishlistContext } from "../_Context/WishlistContext";
import Link from "next/link";
import { FaCheck, FaHeart, FaShoppingCart } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";
import {
  getWishlistLogs,
  removeProductFromWishlist,
} from "../_action/addToWishlist";
import { addToCard, deleteProductFromCard } from "../_action/addToCart";
import { cartContextP } from "../_Context/CartContext";
import { toast } from "sonner";
import BeatLoader from "react-spinners/esm/BeatLoader";
import { CiHeart } from "react-icons/ci";

export default function page() {
  const {
    wishlistProducts,
    wishlistCounter,
    setWishlistProducts,
    setWishlistCounter,
  } = useContext(wishlistContext);

  const {
    setCartCounter,
    setTotalPrice,
    setTotalProducts,
    setCardId,
    totalProducts,
  } = useContext(cartContextP);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);

  async function deleteHandler(productId: string) {
    setDeletingId(productId);
    const res = await removeProductFromWishlist(productId);
    if (!res) {
      toast.error("Something went wrong", {
        position: "top-left",
        richColors: true,
      });
      setDeletingId(null);
      return;
    }
    if (res.status == "success") {
      const fullWishlist = await getWishlistLogs();
      if (fullWishlist) {
        setWishlistProducts(fullWishlist.data);
      }
      setWishlistCounter(res.data.length);
      toast.success(res.message, { position: "top-left", richColors: true });
    } else {
      toast.error(res.message ?? "something went wrong", {
        position: "top-left",
        richColors: true,
      });
    }
    setDeletingId(null);
  }

  const isInCart = (productId: string) =>
    totalProducts?.some((item) => item.product._id === productId) ?? false;

  async function removeFromCartHandler(productId: string) {
    setAddingToCartId(productId);
    try {
      const res = await deleteProductFromCard(productId);
      if (!res) {
        toast.error("Something went wrong", {
          position: "top-left",
          richColors: true,
        });
        return;
      }
      setCartCounter(res.numOfCartItems ?? 0);
      setTotalPrice(res.data.totalCartPrice ?? 0);
      setTotalProducts(res.data.products ?? []);
    } finally {
      setAddingToCartId(null);
    }
  }

  async function addToCartHandler(productId: string) {
    setAddingToCartId(productId);
    try {
      const res = await addToCard(productId);
      if (!res) {
        toast.error("Something went wrong", {
          position: "top-left",
          richColors: true,
        });
        return;
      }
      if (res.status == "success") {
        setCartCounter(res.numOfCartItems ?? 0);
        setTotalProducts(res.data.products);
        setTotalPrice(res.data.totalCartPrice ?? 0);
        setCardId(res.cartId ?? null);
        toast.success(res.message ?? "Added to cart", {
          position: "top-left",
          richColors: true,
        });
      } else {
        toast.error(res.message ?? "Something went wrong", {
          position: "top-left",
          richColors: true,
        });
      }
    } finally {
      setAddingToCartId(null);
    }
  }
  if (wishlistCounter == 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-28 h-28 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <CiHeart className="w-12 h-12 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Your <span className="text-red-400">wishlist</span> is empty
        </h2>
        <p className="text-gray-500 text-center text-sm mb-8 max-w-xs">
          Browse products and save your favorites here.
        </p>

        <Link
          href="/"
          className="shadow-lg shadow-red-400 flex items-center gap-2 bg-gradient-to-r from-red-400 to-red-600 text-white font-bold px-8 py-3 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300"
        >
          Browse Products <span className="text-lg">→</span>
        </Link>
      </div>
    );
  }
  return (
    <div className="pb-10 min-h-130">
      <div className="w-11/12 md:w-10/12 m-auto">
        <p className="text-xs text-gray-500 mb-2">
          <Link className="hover:text-green-600 transition" href={"/"}>
            Home
          </Link>{" "}
          / <span className="text-gray-800">Wishlist</span>
        </p>

        <div className="flex items-center gap-3 mt-3 mb-2">
          <div className="w-9 h-9 bg-[#FEF2F2] rounded-lg flex items-center justify-center">
            <FaHeart className="text-xl text-[#FB2C36]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        </div>

        <p className="text-gray-500 mb-5">
          You have{" "}
          <span className="text-[#FB2C36] font-bold">
            {" "}
            {wishlistCounter} items
          </span>{" "}
          saved
        </p>

        <div className="border border-[#F3F4F6] rounded-2xl overflow-hidden mb-5">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#F3F4F6] hover:bg-white">
                  <TableHead className="text-gray-500 font-medium py-4 pl-5">
                    Product
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium text-center">
                    Price
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium text-center">
                    Status
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium text-right pr-5">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wishlistProducts?.map((product) => (
                  <TableRow
                    key={product._id}
                    className="border-b border-[#F3F4F6] hover:bg-gray-50 transition"
                  >
                    <TableCell className="py-5 pl-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl border border-[#F3F4F6] overflow-hidden shrink-0">
                          <img
                            src={product.imageCover}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <Link
                            href={`ProductDetailes/${product._id}`}
                            className="text-sm font-semibold text-gray-900 hover:text-green-600 transition line-clamp-2"
                          >
                            {product.title?.split(" ").slice(0, 3).join(" ")}...
                          </Link>
                          <span className="text-xs text-gray-400">
                            {product.category?.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm font-semibold text-gray-900">
                        {product.price} EGP
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="flex items-center justify-center gap-1 text-sm text-[#16A34A] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] inline-block" />
                        In Stock
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-5">
                      <div className="flex items-center justify-end gap-2">
                        {/* ===============add to cart=============== */}
                        <Button
                          onClick={() =>
                            isInCart(product._id)
                              ? removeFromCartHandler(product._id)
                              : addToCartHandler(product._id)
                          }
                          disabled={addingToCartId === product._id}
                          className={`
    ${
      isInCart(product._id)
        ? "bg-white border border-[#16A34A] text-[#16A34A] hover:bg-red-50 hover:text-red-500 hover:border-red-300"
        : "bg-[#16A34A] hover:bg-[#15803D] text-white"
    }
    disabled:opacity-60 rounded-xl h-9 px-4 text-sm font-medium 
    flex items-center gap-1.5 cursor-pointer transition duration-200 min-w-[120px]
  `}
                        >
                          {addingToCartId === product._id ? (
                            <BeatLoader
                              color={isInCart(product._id) ? "#16A34A" : "#fff"}
                              size={8}
                            />
                          ) : isInCart(product._id) ? (
                            <>
                              <FaCheck size={13} /> In Cart
                            </>
                          ) : (
                            <>
                              <FaShoppingCart size={13} /> Add to Cart
                            </>
                          )}
                        </Button>

                        {/* ===============delete=============== */}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => deleteHandler(product._id)}
                          disabled={deletingId === product._id}
                          className="rounded-xl w-9 h-9 border-[#F3F4F6] text-gray-400 hover:text-red-500 hover:bg-[#FEF2F2] disabled:bg-gray-100 disabled:text-gray-300 cursor-pointer transition duration-200"
                        >
                          {deletingId === product._id ? (
                            <BeatLoader color="#9ca3af" size={4} />
                          ) : (
                            <FaTrash size={13} />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-[#F3F4F6]">
            {wishlistProducts?.map((product) => (
              <div key={product._id} className="p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl border border-[#F3F4F6] overflow-hidden shrink-0">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {product.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {product.category?.name}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-500">
                    Price:{" "}
                    <span className="font-bold text-gray-900">
                      {product.price} EGP
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    Status:
                    <span className="flex items-center gap-1 text-[#16A34A] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] inline-block" />
                      In Stock
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() =>
                      isInCart(product._id)
                        ? removeFromCartHandler(product._id)
                        : addToCartHandler(product._id)
                    }
                    disabled={addingToCartId === product._id}
                    className={`
    flex-1 h-10 rounded-xl text-sm font-medium
    flex items-center justify-center gap-1.5 cursor-pointer transition duration-200
    ${
      isInCart(product._id)
        ? "bg-white border border-[#16A34A] text-[#16A34A] hover:bg-red-50 hover:text-red-500 hover:border-red-300"
        : "bg-[#16A34A] hover:bg-[#15803D] text-white"
    }
    disabled:opacity-60
  `}
                  >
                    {addingToCartId === product._id ? (
                      <BeatLoader
                        color={isInCart(product._id) ? "#16A34A" : "#fff"}
                        size={8}
                      />
                    ) : isInCart(product._id) ? (
                      <>
                        <FaCheck size={13} /> In Cart
                      </>
                    ) : (
                      <>
                        <FaShoppingCart size={13} /> Add to Cart
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => deleteHandler(product._id)}
                    disabled={deletingId === product._id}
                    className="rounded-xl w-10 h-10 border-[#F3F4F6] text-gray-400 hover:text-red-500 hover:bg-[#FEF2F2] disabled:bg-gray-100 disabled:text-gray-300 cursor-pointer transition duration-200"
                  >
                    {deletingId === product._id ? (
                      <BeatLoader color="#9ca3af" size={4} />
                    ) : (
                      <FaTrash size={13} />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link
          href={"/"}
          className="cursor-pointer w-fit flex gap-2 text-sm text-[#6A7282] hover:text-green-600 transition-colors duration-200 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">
            ←
          </span>
          <span className="group-hover:-translate-x-1 transition-transform duration-200">
            Continue Shopping
          </span>
        </Link>
      </div>
    </div>
  );
}
