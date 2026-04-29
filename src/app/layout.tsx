import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./_components/NavBar";
import { Toaster } from "@/components/ui/sonner";
import AuthProviders from "./_providers/AuthProviders";
import CardContext from "./_Context/CartContext";
import { getCartLogs } from "./_action/addToCart";
import Footer from "./_components/Footer";
import { Suspense } from "react";
import WishlistContext from "./_Context/WishlistContext";
import { getWishlistLogs } from "./_action/addToWishlist";
import CartSyncOnLogin from "./_components/CartSyncOnLogin";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "e-commerce",
  description: "e-commerce app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  async function handleCounter() {
    const res = await getCartLogs();
    return res;
  }
  const getCartRes = await handleCounter();

  async function wishlistHandler() {
    const res = await getWishlistLogs();
    return res;
  }
  const wishlistLogs = await wishlistHandler();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{ fontFamily: "Gill Sans, sans-serif" }}
    >
      <body className="flex flex-col min-h-screen">
        <AuthProviders>
          <CardContext cartData={getCartRes}>
            <WishlistContext wishlistData={wishlistLogs}>
              <CartSyncOnLogin />
              <NavBar />
              <Toaster />
              {children}
              <Footer />
            </WishlistContext>
          </CardContext>
        </AuthProviders>
      </body>
    </html>
  );
}
