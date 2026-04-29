"use client";
import React, { useContext, useState } from "react";
import { BsBoxSeam, BsCheckLg, BsTag, BsTrash2 } from "react-icons/bs";
import {
  FaLock,
  FaPlus,
  FaShieldAlt,
  FaShoppingCart,
  FaTrash,
} from "react-icons/fa";
import { cartContextP } from "../_Context/CartContext";
import Link from "next/link";
import { TiMinus } from "react-icons/ti";
import { RiShoppingBagFill } from "react-icons/ri";
import { MdLocalShipping } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  deleteAllProductFromCard,
  deleteProductFromCard,
  updateProductFromCard,
} from "../_action/addToCart";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";

export default function page() {
  const {
    cartCounter,
    totalPrice,
    totalProducts,
    setTotalPrice,
    setCartCounter,
    setTotalProducts,
    setCardId,
    localCart,
    removeFromLocalCart,
    updateLocalCart,
    clearLocalCart,
  } = useContext(cartContextP);

  const { data: session } = useSession();
  const isGuest = !session;

  const localTotalPrice = localCart.reduce(
    (sum, item) => sum + item.price * item.count,
    0,
  );
  const localCounter = localCart.reduce((sum, item) => sum + item.count, 0);

  const displayPrice = isGuest ? localTotalPrice : totalPrice;
  const displayCounter = isGuest ? localCounter : cartCounter;

  const [myDeleteAll, setMyDeleteAll] = useState(false);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [updateCount, setUpdateCount] = useState<Set<string>>(new Set());

  async function deleteHandler(productId: string) {
    setDeletingIds((prev) => new Set(prev).add(productId));
    const res = await deleteProductFromCard(productId);
    setTotalProducts(res?.data.products);
    setTotalPrice(res?.data.totalCartPrice ?? 0);
    setCartCounter(res?.numOfCartItems ?? 0);
    if (res?.status == "success") {
      toast.success(res.message, { position: "top-left", richColors: true });
    } else if (res?.status == "fail") {
      toast.error(res.message, { position: "top-left", richColors: true });
    }
    setDeletingIds((prev) => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
  }

  async function deleteAllHandler() {
    setMyDeleteAll(true);
    const res = await deleteAllProductFromCard();
    if (res?.status == "success") {
      toast.success(res.message, { position: "top-left", richColors: true });
      setTotalProducts(res?.data.products);
      setTotalPrice(res?.data.totalCartPrice);
      setCartCounter(res?.numOfCartItems ?? 0);
      setCardId(res.cartId);
    } else if (res?.status == "fail") {
      toast.error(res.message, { position: "top-left", richColors: true });
    }
    setMyDeleteAll(false);
  }

  async function updateHandler(productId: string, count: number) {
    if (count < 1) return;
    setUpdateCount((prev) => new Set(prev).add(productId));
    const res = await updateProductFromCard(productId, count);
    setTotalProducts(res?.data.products);
    setTotalPrice(res?.data.totalCartPrice ?? 0);
    setCartCounter(res?.numOfCartItems ?? 0);
    setUpdateCount((prev) => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
  }

  if (displayCounter === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-28 h-28 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <BsBoxSeam className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Your cart is empty
        </h2>
        <p className="text-gray-500 text-center text-sm mb-8 max-w-xs">
          Looks like you haven't added anything to your cart yet. Start
          exploring our products!
        </p>
        <Link
          href="/"
          className="shadow-lg hover:-translate-y-2 shadow-[#74ad89] flex items-center gap-2 bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-bold px-8 py-3 rounded-xl hover:from-[#13803b] hover:to-[#166534] transition-all duration-300"
        >
          Start Shopping <span className="text-lg">→</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="w-11/12 m-auto">
        <p className="text-xs text-gray-500 mb-2">
          <Link className="hover:text-green-600 transition" href={"/"}>
            Home
          </Link>{" "}
          / <span className="text-gray-800">Shopping Cart</span>
        </p>

        <div className="flex items-center gap-3 mt-3 mb-2">
          <div className="w-9 h-9 bg-gradient-to-r from-[#16A34A] to-[#15803D] rounded-lg flex items-center justify-center">
            <FaShoppingCart className="text-xl text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        </div>

        <p className="text-gray-500 mb-5">
          You have{" "}
          <span className="text-green-700 font-bold">
            {" "}
            {displayCounter} items
          </span>{" "}
          in your cart
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-start">
          <div className="flex flex-col gap-4 col-span-1 md:col-span-3">
            {isGuest
              ? localCart.map((item) => (
                  <div
                    key={item._id}
                    className="relative bg-white rounded-[16px] shadow border border-[#F3F4F6] p-5"
                  >
                    <div className="flex items-center gap-10">
                      <div className="relative flex-shrink-0 w-20 h-20">
                        <div className="w-25 h-25 rounded-xl bg-[#F3F4F6] flex items-center justify-center overflow-hidden">
                          <img
                            src={item.imageCover}
                            alt={item.title}
                            className="w-22 h-22 object-cover rounded-xl"
                          />
                        </div>
                        <div className="absolute -bottom-11 right-1 whitespace-nowrap bg-[#00C950] text-white text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                          <BsCheckLg className="w-2.5 h-2.5" /> In Stock
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 pt-1">
                        <p className="font-medium text-sm text-gray-900 mb-1.5">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 my-2">
                          <span className="bg-gradient-to-r from-[#F0FDF4] to-[#F3F4F6] text-[#15803D] text-[11.5px] px-2.5 py-0.5 rounded-full">
                            {item.category.name}
                          </span>
                        </div>
                        <p className="text-[#16A34A] font-bold text-[18px] m-0">
                          {item.price} <span>EGP</span>
                          <span className="text-xs text-[#99A1AF] font-normal">
                            {" "}
                            per unit
                          </span>
                        </p>

                        <div className="flex justify-between">
                          <div className="bg-[#F9FAFB] border rounded-xl border-[#E5E7EB] p-1 w-fit flex items-center gap-2.5 mt-4">
                            {item.count === 1 ? (
                              <button className="w-[30px] h-[30px] bg-gray-200! cursor-pointer shadow rounded-[8px] border-[1.5px] border-gray-300 bg-transparent flex items-center justify-center text-gray-500 text-lg">
                                <TiMinus />
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  updateLocalCart(item._id, item.count - 1)
                                }
                                className="w-[30px] h-[30px] active:scale-105 hover:bg-gray-100 transition duration-150 cursor-pointer shadow rounded-[8px] border-[1.5px] border-gray-300 bg-transparent flex items-center justify-center text-gray-500 text-lg"
                              >
                                <TiMinus />
                              </button>
                            )}
                            <span className="text-sm font-bold w-5 h-6 flex items-center justify-center">
                              {item.count}
                            </span>
                            <button
                              onClick={() =>
                                updateLocalCart(item._id, item.count + 1)
                              }
                              className="w-[30px] h-[30px] active:scale-105 hover:bg-[#0b7431] transition duration-150 cursor-pointer shadow rounded-[8px] bg-[#16A34A] border-none flex items-center justify-center text-white text-lg"
                            >
                              <FaPlus />
                            </button>
                          </div>

                          <div className="flex items-end gap-5">
                            <div className="flex-col">
                              <p className="text-[11.5px] text-right text-[#99A1AF] m-0">
                                Total
                              </p>
                              <p className="text-[22px] font-bold text-gray-900 leading-none m-0">
                                {item.price * item.count}
                                <span className="text-xs font-normal text-[#99A1AF] ml-px">
                                  EGP
                                </span>
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromLocalCart(item._id)}
                              className="w-[34px] h-[34px] hover:bg-red-200 cursor-pointer rounded-lg bg-red-100 border-none flex items-center justify-center"
                            >
                              <FaTrash className="w-3.5 h-3.5 text-red-700" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : totalProducts?.map((item) => (
                  <div
                    key={item.product._id}
                    className="relative bg-white rounded-[16px] shadow border border-[#F3F4F6] p-5"
                  >
                    {deletingIds.has(item.product._id) && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-xs rounded-[16px] z-10 flex items-center justify-center">
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow border border-gray-100">
                          <Spinner className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-gray-600 font-medium">
                            Deleting...
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-10">
                      <div className="relative flex-shrink-0 w-20 h-20">
                        <div className="w-25 h-25 rounded-xl bg-[#F3F4F6] flex items-center justify-center overflow-hidden">
                          <img
                            src={item.product.imageCover}
                            alt={item.product.title}
                            className="w-22 h-22 object-cover rounded-xl"
                          />
                        </div>
                        <div className="absolute -bottom-11 right-1 whitespace-nowrap bg-[#00C950] text-white text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                          <BsCheckLg className="w-2.5 h-2.5" /> In Stock
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 pt-1">
                        <p className="font-medium text-sm text-gray-900 mb-1.5">
                          {item.product.title}
                        </p>
                        <div className="flex items-center gap-2 my-2">
                          <span className="bg-gradient-to-r from-[#F0FDF4] to-[#F3F4F6] text-[#15803D] text-[11.5px] px-2.5 py-0.5 rounded-full">
                            {item.product.category.name}
                          </span>
                        </div>
                        <p className="text-[#16A34A] font-bold text-[18px] m-0">
                          {item.price} <span>EGP</span>
                          <span className="text-xs text-[#99A1AF] font-normal">
                            {" "}
                            per unit
                          </span>
                        </p>

                        <div className="flex justify-between">
                          <div className="bg-[#F9FAFB] border rounded-xl border-[#E5E7EB] p-1 w-fit flex items-center gap-2.5 mt-4">
                            {item.count == 1 ? (
                              <button className="w-[30px] h-[30px] bg-gray-200! cursor-pointer shadow rounded-[8px] border-[1.5px] border-gray-300 bg-transparent flex items-center justify-center text-gray-500 text-lg">
                                <TiMinus />
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  updateHandler(
                                    item.product._id,
                                    item.count - 1,
                                  )
                                }
                                disabled={updateCount.has(item.product._id)}
                                className="w-[30px] h-[30px] active:scale-105 hover:bg-gray-100 transition duration-150 cursor-pointer shadow rounded-[8px] border-[1.5px] border-gray-300 bg-transparent flex items-center justify-center text-gray-500 text-lg"
                              >
                                <TiMinus />
                              </button>
                            )}
                            <span className="text-sm font-bold w-5 h-6 flex items-center justify-center">
                              {updateCount.has(item.product._id) ? (
                                <Spinner className="w-3.5 h-3.5 text-green-600" />
                              ) : (
                                item.count
                              )}
                            </span>
                            <button
                              onClick={() =>
                                updateHandler(item.product._id, item.count + 1)
                              }
                              disabled={updateCount.has(item.product._id)}
                              className="w-[30px] h-[30px] active:scale-105 hover:bg-[#0b7431] transition duration-150 cursor-pointer shadow rounded-[8px] bg-[#16A34A] border-none flex items-center justify-center text-white text-lg"
                            >
                              <FaPlus />
                            </button>
                          </div>

                          <div className="flex items-end gap-5">
                            <div className="flex-col">
                              <p className="text-[11.5px] text-right text-[#99A1AF] m-0">
                                Total
                              </p>
                              <p className="text-[22px] font-bold text-gray-900 leading-none m-0">
                                {item.price * item.count}
                                <span className="text-xs font-normal text-[#99A1AF] ml-px">
                                  EGP
                                </span>
                              </p>
                            </div>
                            <button
                              disabled={deletingIds.has(item.product._id)}
                              onClick={() => deleteHandler(item.product._id)}
                              className="w-[34px] h-[34px] hover:bg-red-200 cursor-pointer rounded-lg bg-red-100 border-none flex items-center justify-center"
                            >
                              {deletingIds.has(item.product._id) ? (
                                <Spinner className="w-3.5 h-3.5 text-red-700" />
                              ) : (
                                <FaTrash className="w-3.5 h-3.5 text-red-700" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

            <div className="flex justify-between items-center pt-1">
              <Link href="/" className="text-sm text-green-600 hover:underline">
                ← Continue Shopping
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    disabled={myDeleteAll}
                    className="cursor-pointer text-sm text-gray-400 flex items-center gap-1.5 group transition duration-200 hover:text-red-600"
                  >
                    {myDeleteAll ? (
                      <Spinner className="w-3.5 h-3.5" />
                    ) : (
                      <BsTrash2 className="w-3.5 h-3.5 group-hover:scale-105 transition duration-200" />
                    )}
                    Clear all items
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear your cart?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove all {displayCounter} items from your
                      cart. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={isGuest ? clearLocalCart : deleteAllHandler}
                      className="rounded-xl bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                    >
                      Yes, clear all
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 bg-white rounded-[16px] shadow border border-[#F3F4F6] overflow-hidden sticky top-27">
            <div className="bg-gradient-to-r from-[#16A34A] to-[#15803D] px-4 py-3 flex items-center gap-2">
              <RiShoppingBagFill className="w-6 h-5 text-white" />
              <div>
                <p className="text-white font-bold text-lg">Order Summary</p>
                <p className="text-green-100 text-sm">
                  {displayCounter} items in your cart
                </p>
              </div>
            </div>

            <div className="p-4">
              {displayPrice > 500 ? (
                <div className="bg-gradient-to-r from-[#F0FDF4] to-[#F3F4F6] rounded-lg p-2.5 flex items-center gap-2.5 mb-4">
                  <div className="w-10 h-10 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                    <MdLocalShipping className="w-5 h-5 text-green-600 flex-shrink-0" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#008236]">
                      Free Shipping!
                    </p>
                    <p className="text-sm text-[#00A63E]">
                      You qualify for free delivery
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-[#FFFAEB] rounded-lg p-3 pb-5 mb-4">
                  <div className="flex items-center gap-2.5 mb-2">
                    <MdLocalShipping className="w-5 h-5 text-[#FF6900] shrink-0" />
                    <p className="text-sm text-[#4E5766]">
                      Add{" "}
                      <span className="font-bold text-[#FF6900]">
                        {500 - displayPrice} EGP
                      </span>{" "}
                      more for free shipping
                    </p>
                  </div>
                  <Progress
                    value={(displayPrice / 500) * 100}
                    className="h-1.5 bg-orange-100"
                    indicatorClassName="bg-gradient-to-r from-[#FF8A02] to-[#FFB800] rounded-lg"
                  />
                </div>
              )}

              <div className="flex justify-between font-normal mb-2">
                <span className="text-[#4A5565]">Subtotal</span>
                <span>{displayPrice} EGP</span>
              </div>
              <div className="flex justify-between font-normal pb-3 border-b border-gray-100">
                <span className="text-text-[#4A5565]">Shipping</span>
                <span className="font-normal">
                  {displayPrice > 500 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    <span className="text-gray-800">100 EGP</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between py-3">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-[#101828] text-xl">
                  {displayPrice > 500 ? displayPrice : displayPrice + 100}{" "}
                  <span className="text-gray-400 font-normal text-sm">EGP</span>
                </span>
              </div>

              <div className="cursor-pointer hover:bg-gray-100 border border-dashed border-gray-200 rounded-lg flex justify-center items-center gap-2 px-3 py-2 mb-3">
                <BsTag className="w-3.5 h-3.5 text-gray-600" />
                <span className="text-sm text-gray-600">Apply Promo Code</span>
              </div>

              {isGuest ? (
                <Link
                  href="/login"
                  className="w-full bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white rounded-lg py-2.5 text-lg font-bold flex items-center justify-center gap-2 hover:from-[#13803b] hover:to-[#166534] transition-all duration-300 cursor-pointer"
                >
                  <FaLock className="w-3.5 h-3.5" /> Sign in to Checkout
                </Link>
              ) : (
                <Link
                  href="/checkOut"
                  className="w-full bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white rounded-lg py-2.5 text-lg font-bold flex items-center justify-center gap-2 hover:from-[#13803b] hover:to-[#166534] transition-all duration-300 cursor-pointer"
                >
                  <FaLock className="w-3.5 h-3.5" /> Secure Checkout
                </Link>
              )}

              <div className="flex justify-center gap-5 mt-3 p-2">
                <span className="flex items-center gap-1 text-xs text-gray-500 border-r-1 border-gray-200 pr-5">
                  <FaShieldAlt className="w-3 h-3 text-green-500" /> Secure
                  Payment
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <MdLocalShipping className="w-3 h-3 text-blue-500" /> Fast
                  Delivery
                </span>
              </div>

              <p className="text-center mt-3">
                <Link
                  href="/"
                  className="text-sm text-green-600 hover:underline flex items-center justify-center gap-1"
                >
                  <IoIosArrowRoundBack className="text-xl" /> Continue Shopping
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
