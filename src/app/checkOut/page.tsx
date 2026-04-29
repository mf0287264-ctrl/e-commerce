"use client";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiSolidError } from "react-icons/bi";
import { BsCashCoin, BsCreditCard2Back, BsTag } from "react-icons/bs";
import {
  FaCcMastercard,
  FaCcVisa,
  FaCity,
  FaPhoneAlt,
  FaReceipt,
  FaShieldAlt,
  FaWallet,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import {
  IoIosArrowRoundBack,
  IoMdHome,
  IoMdInformationCircle,
} from "react-icons/io";
import { MdLocalPostOffice, MdLocalShipping } from "react-icons/md";
import { RiShoppingBagFill } from "react-icons/ri";
import BeatLoader from "react-spinners/esm/BeatLoader";
import { toast } from "sonner";
import { cartContextP } from "../_Context/CartContext";
import { createCashOrder, createVisaOrder } from "../_action/checkOut";
import { checkOutSchema, CheckOutType } from "./checkOut.schema";
// import BeatLoader from "react-spinners/esm/BeatLoader";
type PaymentMethod = "cash" | "online";
export default function page() {
  const {
    totalProducts,
    totalPrice,
    cartCounter,
    cartId,
    setCardId,
    setCartCounter,
    setTotalPrice,
    setTotalProducts,
  } = useContext(cartContextP);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!cartId) {
      toast.error("The Cart Is Empty", {
        position: "top-left",
        richColors: true,
      });
    }
  }, [cartId]);
  const form = useForm<CheckOutType>({
    defaultValues: {
      city: "",
      details: "",
      phone: "",
      postalCode: "",
    },
    resolver: zodResolver(checkOutSchema),
    mode: "onChange",
  });
  const [selected, setSelected] = useState<PaymentMethod>("cash");

  async function onSubmit(values: CheckOutType) {
    setLoading(true);
    if (selected == "cash") {
      //   console.log(values);
      //   console.log(cartId);
      const res = await createCashOrder(cartId, values);
      if (res?.status == "success") {
        console.log(res);
        toast.success(res.message, {
          position: "top-left",
          richColors: true,
        });
        router.push("/allorders");
        setTimeout(() => {
          setTotalProducts(undefined);
          setTotalPrice(0);
          setCartCounter(0);
          setCardId(null);
        }, 1300);
      } else if (res?.status == "fail") {
        toast.error(res?.message, {
          position: "top-left",
          richColors: true,
        });
      }
      setLoading(false);
    } else if (selected == "online") {
      const res = await createVisaOrder(cartId, values);
      window.location.href =
        res?.session?.url ?? process.env.NEXTAUTH_URL_INTERNAL!;
      setLoading(false);
    }
  }
  if (!cartId)
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-28 h-28 bg-orange-100 rounded-full flex items-center justify-center mb-6">
          <BiSolidError className="w-12 h-12 text-orange-400" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Your cart is empty
        </h2>

        <p className="text-gray-500 text-center text-sm mb-8 max-w-xs">
          Add some items to your cart before checking out.
        </p>

        <Link
          href="/"
          className="shadow-lg shadow-[#74ad89] flex items-center gap-2 bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-bold px-8 py-3 rounded-xl hover:from-[#13803b] hover:to-[#166534] transition-all duration-300"
        >
          Continue Shopping <span className="text-lg">→</span>
        </Link>
      </div>
    );

  return (
    <div className="bg-gray-50">
      <div className="w-11/12 m-auto">
        <div className="py-5">
          <span className="text-xs text-gray-500">
            <Link className="hover:text-green-600 transition" href="/">
              Home
            </Link>{" "}
            /{" "}
            <Link className="hover:text-green-600 transition" href="/cart">
              Cart
            </Link>{" "}
            / <span className="text-gray-800">Checkout</span>
          </span>
        </div>

        <div className="flex items-center justify-between mb-7">
          <div>
            <div className="flex items-center gap-2 mb-1 ">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#16A34A] to-[#15803D] rounded-lg shadow shadow-[#1ca64e] ">
                <FaReceipt className="text-white w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Complete Your Order
              </h1>
            </div>
            <span className="text-sm text-[#6A7282]">
              Review your items and complete your purchase
            </span>
          </div>

          <Link
            href="/cart"
            className="flex items-center gap-1 text-green-600  group text-sm font-semibold"
          >
            <IoIosArrowRoundBack className="text-xl group-hover:-translate-x-1 transition duration-300" />
            <span className="group-hover:scale-105 transition duration-300 ">
              Back to Cart
            </span>
          </Link>
        </div>

        <div className="grid  grid-cols-1 md:grid-cols-5 gap-5 items-start">
          <div className="col-span-1 md:col-span-3">
            <div className="bg-white rounded-2xl overflow-hidden shadow border border-gray-100 w-full">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#16A34A] to-[#15803D] px-5 py-4 flex flex-col gap-1.5">
                <div className="flex items-center  gap-1">
                  <span>
                    <IoMdHome className="text-white text-2xl" />
                  </span>
                  <div>
                    <p className="text-white font-bold text-lg leading-tight">
                      Shipping Address
                    </p>
                  </div>
                </div>
                <p className="text-green-100 text-sm">
                  Where should we deliver your order?
                </p>
              </div>

              <div className="p-4 flex flex-col gap-3">
                {/* Delivery Information */}
                <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl p-3.5 flex items-center gap-2.5">
                  <span className="text-[#155DFC] text-base mt-0.5">
                    <span className="w-8 h-8 rounded-full bg-[#DCFCE7] flex items-center justify-center">
                      <IoMdInformationCircle className="w-4 h-4" />
                    </span>
                  </span>
                  <div>
                    <p className="text-[#193CB8] font-medium text-sm">
                      Delivery Information
                    </p>
                    <p className="text-[#155DFC] text-xs">
                      Please ensure your address is accurate for smooth delivery
                    </p>
                  </div>
                </div>

                {/* Form */}
                <form
                  id="checkOutForm"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-3"
                >
                  {/* City */}
                  <Controller
                    name="city"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-city">
                          City <span className="text-red-500">*</span>
                        </FieldLabel>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                            <div className="bg-[#F3F4F6] flex items-center justify-center w-8 h-8 rounded-lg">
                              <FaCity className="w-4 h-4" />
                            </div>
                          </span>
                          <Input
                            {...field}
                            id="form-city"
                            placeholder="e.g. Cairo, Alexandria, Giza"
                            autoComplete="on"
                            className="pl-13 h-13"
                            aria-invalid={fieldState.invalid}
                          />
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Street Address */}
                  <Controller
                    name="details"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-Address">
                          Street Address <span className="text-red-500">*</span>
                        </FieldLabel>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-400 text-sm pointer-events-none">
                            <div className="bg-[#F3F4F6] flex items-center justify-center w-8 h-8 rounded-lg">
                              <FaLocationDot className="w-4 h-4" />
                            </div>
                          </span>
                          <textarea
                            {...field}
                            id="form-Address"
                            placeholder="Street name, building number, floor, apartment..."
                            autoComplete="on"
                            rows={4}
                            aria-invalid={fieldState.invalid}
                            className="w-full pl-14 pr-3 py-2 text-sm border border-gray-200 rounded-xl outline-none resize-none focus:border-[#16A34A] transition-all placeholder-gray-400 text-gray-800"
                          />
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Phone Number */}
                  <Controller
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-Phone">
                          Phone Number <span className="text-red-500">*</span>
                        </FieldLabel>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                            <div className="bg-[#F3F4F6] flex items-center justify-center w-8 h-8 rounded-lg">
                              <FaPhoneAlt className="w-4 h-4" />
                            </div>
                          </span>
                          <Input
                            {...field}
                            id="form-Phone"
                            placeholder="01xxxxxxxxx"
                            autoComplete="on"
                            className="pl-14 pr-36 h-12"
                            aria-invalid={fieldState.invalid}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs whitespace-nowrap pointer-events-none">
                            Egyptian numbers only
                          </span>
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Postal Code */}
                  <Controller
                    name="postalCode"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-postalCode">
                          Postal Code <span className="text-red-500">*</span>
                        </FieldLabel>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                            <div className="bg-[#F3F4F6] flex items-center justify-center w-8 h-8 rounded-lg">
                              <MdLocalPostOffice className="w-4 h-4" />
                            </div>
                          </span>
                          <Input
                            {...field}
                            id="form-postalCode"
                            placeholder="12345"
                            autoComplete="on"
                            className="pl-13 h-13"
                            aria-invalid={fieldState.invalid}
                          />
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </form>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow border border-gray-100 w-full my-5">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#16A34A] to-[#15803D] px-5 py-4 flex items-center gap-3">
                <FaWallet className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white font-bold text-lg leading-tight">
                    Payment Method
                  </p>
                  <p className="text-green-100 text-sm">
                    Choose how you'd like to pay
                  </p>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-3">
                {/* Cash on Delivery */}
                <div
                  onClick={() => setSelected("cash")}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
            ${selected === "cash" ? "border-[#16A34A] bg-gradient-to-r from-[#F0FDF4] to-white" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200
            ${selected === "cash" ? "bg-gradient-to-br from-[#22C55E] to-[#16A34A] shadow-lg shadow-[#22C55E4D]" : "bg-gray-100"}`}
                  >
                    <BsCashCoin
                      className={`w-6 h-6 ${selected === "cash" ? "text-white" : "text-gray-400"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-semibold text-base ${selected === "cash" ? "text-[#15803D]" : "text-gray-800"}`}
                    >
                      Cash on Delivery
                    </p>
                    <p className="text-gray-500 text-sm">
                      Pay when your order arrives at your doorstep
                    </p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
            ${selected === "cash" ? "border-[#16A34A] bg-[#16A34A]" : "border-gray-300 bg-white"}`}
                  >
                    {selected === "cash" && (
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Pay Online */}
                <div
                  onClick={() => setSelected("online")}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
            ${selected === "online" ? "border-[#16A34A] bg-gradient-to-r from-[#F0FDF4] to-white" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200
            ${selected === "online" ? "bg-gradient-to-br from-[#22C55E] to-[#16A34A] shadow-lg shadow-[#22C55E4D]" : "bg-gray-100"}`}
                  >
                    <BsCreditCard2Back
                      className={`w-6 h-6 ${selected === "online" ? "text-white" : "text-gray-400"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-semibold text-base ${selected === "online" ? "text-[#15803D]" : "text-gray-800"}`}
                    >
                      Pay Online
                    </p>
                    <p className="text-gray-500 text-sm">
                      Secure payment with Credit/Debit Card via Stripe
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <FaCcVisa className="text-xl text-[#016FD0]" />

                      <FaCcMastercard className="text-xl text-[#EB001B]" />

                      <span className="bg-[#016FD0] text-white text-[8px] font-bold px-0.5 py-0.5 rounded ">
                        AMEX
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
            ${selected === "online" ? "border-[#16A34A] bg-[#16A34A]" : "border-gray-300 bg-white"}`}
                  >
                    {selected === "online" && (
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Security note */}
                <div className="flex items-center gap-3 bg-[#F0FDF4] rounded-xl p-3.5">
                  <div className="w-9 h-9 bg-[#DCFCE7] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <FaShieldAlt className="w-4 h-4 text-[#16A34A]" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold text-sm">
                      Secure & Encrypted
                    </p>
                    <p className="text-[#16A34A] text-xs">
                      Your payment info is protected with 256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 bg-white rounded-[16px] shadow border border-[#F3F4F6] overflow-hidden sticky top-27">
            <div className="bg-gradient-to-r from-[#16A34A] to-[#15803D] px-4 py-3 flex items-center gap-2">
              <RiShoppingBagFill className="w-6 h-5 text-white" />
              <div>
                <p className="text-white font-bold text-lg">Order Summary</p>
                <p className="text-green-100 text-sm">{cartCounter} items</p>
              </div>
            </div>

            <div className="p-4">
              {/* Items List */}
              <div className="flex flex-col gap-2 mb-4 border-b border-gray-100 pb-2">
                {totalProducts?.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex items-center gap-3 bg-gray-50 rounded-xl p-2.5"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.imageCover}
                        alt="product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {item.product.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.count}x{item.price} EGP
                      </p>
                    </div>
                    <span className="text-sm font-bold text-gray-800 flex-shrink-0">
                      {item.count * item.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-normal mb-2">
                <span className="text-[#4A5565]">Subtotal</span>
                <span> {totalPrice}</span>
              </div>
              <div className="flex justify-between font-normal pb-3 border-b border-gray-100">
                <span className="flex items-center gap-1.5 text-[#4A5565]">
                  <MdLocalShipping className="w-4 h-4 text-gray-400" /> Shipping
                </span>
                <span className="font-normal">
                  {" "}
                  {totalPrice > 500 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    <span className="text-gray-800">100</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between py-3">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-[#16A34A] text-xl">
                  {totalPrice > 500 ? totalPrice : totalPrice + 100}{" "}
                  <span className="text-gray-400 font-normal text-sm">EGP</span>
                </span>
              </div>

              <button
                disabled={loading}
                type="submit"
                form="checkOutForm"
                className=" w-full bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white rounded-xl py-3 text-base font-bold hover:from-[#13803b] hover:to-[#166534] transition-all duration-300 cursor-pointer mb-3"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    {" "}
                    <BeatLoader color="#4bea11" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <RiShoppingBagFill className="w-4 h-4" />
                    <span>Place Order</span>
                  </div>
                )}
              </button>

              <div className="flex justify-center gap-4 mt-2 p-2">
                <span className="flex items-center gap-1 text-xs text-gray-500 border-r border-gray-200 pr-4">
                  <FaShieldAlt className="w-3 h-3 text-green-500" /> Secure
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500 border-r border-gray-200 pr-4">
                  <MdLocalShipping className="w-3 h-3 text-blue-500" /> Fast
                  Delivery
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <BsTag className="w-3 h-3 text-orange-500" /> Easy Returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
