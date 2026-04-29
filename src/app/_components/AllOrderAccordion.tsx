"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaPhoneAlt,
  FaReceipt,
  FaTruck,
} from "react-icons/fa";
import { FaBagShopping, FaLocationDot } from "react-icons/fa6";
import { IoBag } from "react-icons/io5";
import { AllOrderType } from "../allorders/allorders.type";
import Image from "next/image";
import { MdPaid } from "react-icons/md";

export default function AllOrderAccordion({
  allOrders,
}: {
  allOrders: AllOrderType[] | null;
}) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  return (
    <Accordion
      type="multiple"
      value={openItems}
      onValueChange={setOpenItems}
      className="w-full flex flex-col gap-4 pb-10"
    >
      {allOrders
        ?.slice()
        .reverse()
        .map((order) => (
          <AccordionItem
            key={order._id}
            value={`order-${order.id}`}
            className={`bg-white rounded-2xl border-2 shadow px-5 py-1 hover:shadow-md transition-all duration-300 ${
              openItems.includes(`order-${order.id}`)
                ? "border-[#BBF7D0] shadow-md shadow-[#DCFCE780]"
                : "border-gray-100"
            }`}
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-4 w-full py-3">
                <div className="w-27 h-27 relative rounded-xl flex items-center justify-center bg-gray-50">
                  <Image
                    src={order.cartItems[0]?.product.imageCover}
                    alt="product"
                    width={80}
                    height={80}
                    priority
                    className="object-cover rounded-xl !w-[80px] !h-[80px]"
                    style={{ width: 80, height: 80 }}
                  />
                  {order.cartItems.length > 1 && (
                    <div className="absolute shadow-md -top-4 -right-2 bg-black rounded-full text-white w-7 h-7 flex items-center justify-center">
                      +{order.cartItems.length - 1}
                    </div>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mb-1 ${
                      order.isDelivered
                        ? "bg-blue-100 text-blue-600"
                        : order.isPaid
                          ? "bg-green-100 text-green-600"
                          : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {order.isDelivered ? (
                      <FaTruck className="w-4 h-4" />
                    ) : order.isPaid ? (
                      <MdPaid className="w-4 h-4" />
                    ) : (
                      <FaClock className="w-4 h-4" />
                    )}

                    {order.isDelivered
                      ? "Delivered"
                      : order.isPaid
                        ? "Paid"
                        : "Processing"}
                  </span>

                  <div className="flex items-center gap-1.5 text-gray-800 font-bold text-base">
                    <span className="text-gray-400 text-sm">#</span> {order.id}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt />{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <IoBag /> {order.cartItems.length} items
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FaLocationDot /> {order.shippingAddress.city}
                    </span>
                  </div>

                  <p className="text-gray-900 font-bold text-xl mt-1">
                    {order.totalOrderPrice}{" "}
                    <span className="text-xs text-gray-400 font-normal">
                      EGP
                    </span>
                  </p>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="pt-3 flex flex-col gap-5 border-t border-t-gray-100">
                {/* Order Items */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-[#DCFCE7] rounded flex items-center justify-center">
                      <FaReceipt className="text-[#16A34A]" />
                    </div>
                    <p className="font-semibold text-gray-800 text-sm">
                      Order Items
                    </p>
                  </div>

                  {order.cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 bg-gray-50 border border-[#F3F4F6] rounded-xl p-3"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white border border-gray-100 flex-shrink-0 flex items-center justify-center">
                        <Image
                          src={item.product.imageCover}
                          alt="product"
                          width={48}
                          height={48}
                          priority
                          className="object-cover !w-[48px] !h-[48px]"
                        />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          {item.product.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.count} × {item.price} EGP
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          {item.count * item.price}
                        </p>
                        <p className="text-xs text-gray-400">EGP</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 border border-[#F3F4F6]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
                        <FaLocationDot className="text-blue-600" />
                      </span>
                      <p className="font-semibold text-gray-800 text-sm">
                        Delivery Address
                      </p>
                    </div>
                    <p className="font-bold text-gray-900 text-sm">
                      {order.shippingAddress.city}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {order.shippingAddress.details}
                    </p>
                    <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                      <FaPhoneAlt /> {order.shippingAddress.phone}
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="bg-[#FEF3C6] rounded-xl p-4 border border-[#FEE685]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 bg-[#FE9A00] rounded-md flex items-center text-white justify-center">
                        <FaClock />
                      </span>
                      <p className="font-semibold text-gray-800 text-sm">
                        Order Summary
                      </p>
                    </div>

                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>Subtotal</span>
                      <span>{order.totalOrderPrice} EGP</span>
                    </div>

                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>Shipping</span>
                      <span>
                        {order.shippingPrice === 0
                          ? "Free"
                          : `${order.shippingPrice} EGP`}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm font-bold text-gray-900">
                      <span>Total</span>
                      <span>{order.totalOrderPrice} EGP</span>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
    </Accordion>
  );
}
