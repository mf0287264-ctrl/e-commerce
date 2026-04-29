import {
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaHeadset,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";
import logo from "@/images/navLogo.png";
import Image from "next/image";
import Link from "next/link";

const linkClass =
  "text-slate-400 text-sm w-fit px-1 py-0.5 rounded transition-all duration-200 hover:text-green-500 hover:px-2 cursor-pointer";

const socialClass =
  "w-9 h-9 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center transition-all duration-200 hover:bg-green-500 hover:text-white cursor-pointer";

export default function Footer() {
  return (
    <footer className="bg-[#101828] mt-10">
      {/* ── Perks Strip ── */}
      <div className="bg-[#f0fdf4] border-b border-green-100">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <span className="text-green-600 bg-green-100 p-2 rounded-lg flex-shrink-0">
                <FaTruck size={20} />
              </span>
              <div>
                <p className="font-semibold text-slate-800 text-sm">
                  Free Shipping
                </p>
                <p className="text-slate-500 text-xs">On orders over 500 EGP</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600 bg-green-100 p-2 rounded-lg flex-shrink-0">
                <FaUndo size={20} />
              </span>
              <div>
                <p className="font-semibold text-slate-800 text-sm">
                  Easy Returns
                </p>
                <p className="text-slate-500 text-xs">14-day return policy</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600 bg-green-100 p-2 rounded-lg flex-shrink-0">
                <FaShieldAlt size={20} />
              </span>
              <div>
                <p className="font-semibold text-slate-800 text-sm">
                  Secure Payment
                </p>
                <p className="text-slate-500 text-xs">100% secure checkout</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600 bg-green-100 p-2 rounded-lg flex-shrink-0">
                <FaHeadset size={20} />
              </span>
              <div>
                <p className="font-semibold text-slate-800 text-sm">
                  24/7 Support
                </p>
                <p className="text-slate-500 text-xs">Contact us anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-12 gap-8">
          {/* ── Brand Column — col-span-3 ── */}
          <div className="col-span-12 md:col-span-3 flex flex-col gap-5">
            <div className="bg-white rounded-xl px-4 py-2 w-fit">
              <Image src={logo} alt="FreshCart" height={48} width={197} />
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2 text-slate-400 text-sm">
                <span className="text-green-500 mt-0.5 flex-shrink-0">
                  <FaPhone size={13} />
                </span>
                +1 (800) 123-4567
              </div>
              <div className="flex items-start gap-2 text-slate-400 text-sm">
                <span className="text-green-500 mt-0.5 flex-shrink-0">
                  <FaEnvelope size={13} />
                </span>
                support@freshcart.com
              </div>
              <div className="flex items-start gap-2 text-slate-400 text-sm">
                <span className="text-green-500 mt-0.5 flex-shrink-0">
                  <FaMapMarkerAlt size={13} />
                </span>
                123 Commerce Street, New York, NY 10001
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3 mt-1">
              <Link href="/" aria-label="Facebook" className={socialClass}>
                <FaFacebookF size={14} />
              </Link>
              <Link href="/" aria-label="Twitter" className={socialClass}>
                <FaTwitter size={14} />
              </Link>
              <Link href="/" aria-label="Instagram" className={socialClass}>
                <FaInstagram size={14} />
              </Link>
              <Link href="/" aria-label="YouTube" className={socialClass}>
                <FaYoutube size={14} />
              </Link>
            </div>
          </div>

          {/* ── Spacer — col-span-1 ── */}
          <div className="hidden md:block md:col-span-1" />

          {/* ── Shop — col-span-2 ── */}
          <div className="col-span-6 md:col-span-2 flex flex-col gap-3">
            <h3 className="text-white font-bold text-base mb-1">Shop</h3>
            <Link href="/allProducts" className={linkClass}>
              All Products
            </Link>
            <Link href="/category" className={linkClass}>
              Categories
            </Link>
            <Link href="/brands" className={linkClass}>
              Brands
            </Link>
            <Link href="/" className={linkClass}>
              Electronics
            </Link>
            <Link href="/" className={linkClass}>
              Men&apos;s Fashion
            </Link>
            <Link href="/" className={linkClass}>
              Women&apos;s Fashion
            </Link>
          </div>

          {/* ── Account — col-span-2 ── */}
          <div className="col-span-6 md:col-span-2 flex flex-col gap-3">
            <h3 className="text-white font-bold text-base mb-1">Account</h3>
            <Link href="/profile/settings" className={linkClass}>
              My Account
            </Link>
            <Link href="/allorders" className={linkClass}>
              Order History
            </Link>
            <Link href="/wishlist" className={linkClass}>
              Wishlist
            </Link>
            <Link href="/cart" className={linkClass}>
              Shopping Cart
            </Link>
            <Link href="/login" className={linkClass}>
              Sign In
            </Link>
            <Link href="/signup" className={linkClass}>
              Create Account
            </Link>
          </div>

          {/* ── Support — col-span-2 ── */}
          <div className="col-span-6 md:col-span-2 flex flex-col gap-3">
            <h3 className="text-white font-bold text-base mb-1">Support</h3>
            <Link href="/contactUs" className={linkClass}>
              Contact Us
            </Link>
            <Link href="/" className={linkClass}>
              Help Center
            </Link>
            <Link href="/" className={linkClass}>
              Shipping Info
            </Link>
            <Link href="/" className={linkClass}>
              Returns &amp; Refunds
            </Link>
            <Link href="/" className={linkClass}>
              Track Order
            </Link>
          </div>

          {/* ── Legal — col-span-2 ── */}
          <div className="col-span-6 md:col-span-2 flex flex-col gap-3">
            <h3 className="text-white font-bold text-base mb-1">Legal</h3>
            <Link href="/privacy" className={linkClass}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={linkClass}>
              Terms of Service
            </Link>
            <Link href="/" className={linkClass}>
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            © 2026 FreshCart. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Created by{" "}
            <Link
              href="https://www.linkedin.com/in/mohamed-farid-6587ba298/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-300 transition-colors duration-200 hover:text-green-500"
            >
              Mohamed Farid
            </Link>
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <FaCcVisa size={32} />
            <FaCcMastercard size={32} />
            <FaCcPaypal size={32} />
          </div>
        </div>
      </div>
    </footer>
  );
}
