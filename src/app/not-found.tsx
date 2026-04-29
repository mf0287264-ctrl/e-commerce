"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FaAppleAlt, FaLeaf, FaCarrot, FaSeedling } from "react-icons/fa";
import { GiCherry, GiBroccoli, GiGrapes } from "react-icons/gi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, ArrowLeft } from "lucide-react";

function FloatingIcon({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none select-none text-green-200 ${className ?? ""}`}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function notfound() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#f0faf2] flex items-center justify-center">
      {/* LEFT SIDE — adjust top/left values to move each icon */}

      {/* Apple — top left */}
      <FloatingIcon className="top-[10%] left-[4%]" delay={0}>
        <FaAppleAlt size={28} />
      </FloatingIcon>

      {/* Leaf — mid left */}
      <FloatingIcon className="top-[55%] left-[7%]" delay={0.4}>
        <FaLeaf size={22} />
      </FloatingIcon>

      {/* Seedling — bottom left */}
      <FloatingIcon className="top-[75%] left-[3%]" delay={0.8}>
        <FaSeedling size={20} />
      </FloatingIcon>

      {/* Cherry — upper left */}
      <FloatingIcon className="top-[30%] left-[12%]" delay={1.2}>
        <GiCherry size={18} />
      </FloatingIcon>

      {/* RIGHT SIDE — adjust top/right values to move each icon */}

      {/* Small apple — top right */}
      <FloatingIcon className="top-[20%] right-[6%]" delay={0.2}>
        <FaAppleAlt size={16} />
      </FloatingIcon>

      {/* Leaf — top right */}
      <FloatingIcon className="top-[15%] right-[14%]" delay={0.6}>
        <FaLeaf size={20} />
      </FloatingIcon>

      {/* Carrot — mid right */}
      <FloatingIcon className="top-[45%] right-[4%]" delay={1.0}>
        <FaCarrot size={24} />
      </FloatingIcon>

      {/* Broccoli — lower right */}
      <FloatingIcon className="top-[65%] right-[10%]" delay={0.3}>
        <GiBroccoli size={22} />
      </FloatingIcon>

      {/* Grapes — bottom right */}
      <FloatingIcon className="top-[80%] right-[5%]" delay={0.7}>
        <GiGrapes size={18} />
      </FloatingIcon>

      {/* Extra seedling — bottom left area */}
      <FloatingIcon className="top-[85%] left-[15%]" delay={1.4}>
        <FaSeedling size={16} />
      </FloatingIcon>

      {/* ─── Main content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-xl w-full">
        {/* Cart card with 404 badge */}
        <div className="relative mb-8 inline-block">
          <div className="bg-white rounded-2xl shadow-md p-8 flex items-center justify-center w-44 h-36">
            <MdOutlineShoppingCart className="text-green-400" size={72} />
          </div>
          <Badge className="absolute -top-4 -right-4 bg-green-500 hover:bg-green-500 text-white text-lg font-bold rounded-full h-12 w-12 flex items-center justify-center shadow-md p-0">
            404
          </Badge>
        </div>

        {/* Smile dots */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
          <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
            <path
              d="M2 2 Q16 18 30 2"
              stroke="#4ade80"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">
          Oops! Nothing Here
        </h1>

        {/* Subtext */}
        <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed">
          Looks like this page went out of stock! Don&apos;t worry,
          <br className="hidden md:block" /> there&apos;s plenty more fresh
          content to explore.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-10">
          <Button
            asChild
            className="bg-[#23bc5b] h-11 text-white font-semibold px-7 rounded-xl text-base gap-2 
    transition-all duration-200 ease-in-out hover:bg-[#169914]! hover:-translate-y-1 hover:shadow-md"
          >
            <Link href="/">
              <Home size={18} />
              Go to Homepage
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border border-gray-200 text-gray-700 font-semibold px-7 h-11 rounded-xl text-base gap-2 
    bg-white transition-all duration-200 ease-in-out hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md"
          >
            <Link href="/">
              <ArrowLeft size={18} />
              Go Back
            </Link>
          </Button>
        </div>

        {/* Popular destinations */}
        <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-4">
            Popular Destinations
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {/* ← Update each href to your actual routes */}

            <Link
              href="/allProducts"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-green-600 bg-green-50 hover:bg-green-100 transition-colors"
            >
              All Products
            </Link>

            <Link
              href="/allcategories"
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              Categories
            </Link>

            <Link
              href="/allProducts"
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              Today&apos;s Deals
            </Link>

            <Link
              href="/contactUs"
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
