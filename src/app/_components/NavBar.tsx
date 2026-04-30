"use client";
import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  FaBoxOpen,
  FaCog,
  FaGift,
  FaHeadset,
  FaHeart,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegUser,
  FaSearch,
  FaUserPlus,
} from "react-icons/fa";
import { CiHeart, CiUser } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "@/images/navLogo.png";
import { MdArrowDropDown, MdLocalShipping } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import { signOut, useSession } from "next-auth/react";
import { cartContextP } from "../_Context/CartContext";
import { clearUserCookies } from "../_action/clearUserCookies";
import { wishlistContext } from "../_Context/WishlistContext";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const profileRef = React.useRef<HTMLDivElement>(null);
  const profileRefTablet = React.useRef<HTMLDivElement>(null);

  const { cartCounter, localCart } = React.useContext(cartContextP);
  const { data: session } = useSession();
  const displayCartCounter = session
    ? cartCounter
    : localCart.reduce((sum, item) => sum + item.count, 0);

  const { wishlistCounter } = React.useContext(wishlistContext);
  const [categoriesOpen, setCategoriesOpen] = React.useState(false);
  // const session = useSession();

  async function logOutHandler() {
    await clearUserCookies();
    signOut({ callbackUrl: "/login", redirect: true });
  }

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      const clickedDesktop = profileRef.current?.contains(e.target as Node);
      const clickedTablet = profileRefTablet.current?.contains(
        e.target as Node,
      );
      if (!clickedDesktop && !clickedTablet) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <header className="w-full shadow bg-white sticky -top-0 z-50">
      {/* ===== TOP BAR ===== */}
      <div className="hidden pb-2 px-10 lg:flex items-center justify-between pt-3 border-b border-gray-200">
        <div className="flex gap-7 items-center">
          <span className="flex gap-2 items-center">
            <MdLocalShipping className="text-[#16A34A]" />
            <span className="text-[#6A7282] text-sm">
              Free Shipping on Orders 500 EGP
            </span>
          </span>
          <span className="flex gap-2 items-center">
            <FaGift className="text-[#16A34A]" />
            <span className="text-[#6A7282] text-sm">New Arrivals Daily</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 group">
            <FaPhoneAlt className="text-[#6A7282] text-sm group-hover:text-green-600 transition" />
            <a
              href="tel:+1 (800) 123-4567"
              className="text-[#6A7282] text-sm group-hover:text-green-600 transition"
            >
              +1 (800) 123-4567
            </a>
          </span>
          <span className="flex items-center gap-1 border-e pe-4 group">
            <IoMail className="text-[#6A7282] text-sm group-hover:text-green-600 transition" />
            <a
              href="mailto:support@freshcart.com"
              className="text-[#6A7282] text-sm group-hover:text-green-600 transition"
            >
              support@freshcart.com
            </a>
          </span>
          {session ? (
            <>
              <div className="flex items-center gap-1 group cursor-pointer">
                <FaRegUser className="text-[#3e4044] group-hover:text-green-600 transition duration-200" />
                <Link
                  href={"/profile/settings"}
                  className="text-[#3e4044] group-hover:text-green-600 transition duration-200"
                >
                  {session?.user?.name}
                </Link>
              </div>
              <div className="flex items-center gap-1 group cursor-pointer">
                <PiSignOutBold className="text-[#3e4044] group-hover:text-red-600 transition cursor-pointer duration-200" />
                <button
                  className="text-[#3e4044] group-hover:text-red-600 transition cursor-pointer duration-200"
                  onClick={logOutHandler}
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex text-sm items-center gap-1 group cursor-pointer">
                <FaRegUser className="text-[#6A7282] group-hover:text-green-600 transition" />
                <Link
                  href="/login"
                  className="text-[#6A7282] group-hover:text-green-600 transition"
                >
                  sign In
                </Link>
              </div>
              <div className="flex text-sm items-center gap-1 group cursor-pointer">
                <FaUserPlus className="text-[#6A7282] group-hover:text-green-600 transition" />
                <Link
                  href="/signup"
                  className="text-[#6A7282] group-hover:text-green-600 transition"
                >
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ===== DESKTOP ===== */}
      <NavigationMenu
        viewport={false}
        className="hidden lg:flex max-w-none w-full justify-between px-10 pb-3 pt-2"
      >
        <div className="logo shrink-0">
          <img src={logo.src} alt="logo" className="h-8" />
        </div>
        <div className="flex-1 mx-4 border-2 bg-[#F9FAFB] rounded-2xl relative">
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            className="w-full bg-transparent outline-none! pl-2 h-9 pr-9 rounded-2xl text-sm"
          />
          <div className="absolute top-1/2 -translate-y-1/2 right-1 bg-[#16A34A] w-[32px] h-[32px] rounded-full flex items-center justify-center">
            <FaSearch className="text-white text-xs" />
          </div>
        </div>
        <NavigationMenuList className="flex items-center gap-1">
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/">
                <div>Home</div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/allProducts">
                <div>Shop</div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger>
              <div>Categories</div>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="-left-5">
              <ul className="w-40 p-2">
                <ListItem href="/allcategories" title="All Categories" />
                <ListItem
                  href={`/specificCategory/6439d2d167d9aa4ca970649f`}
                  title="Electronics"
                />
                <ListItem
                  href={`/specificCategory/6439d58a0049ad0b52b9003f`}
                  title="Women's Fashion"
                />
                <ListItem
                  href={`/specificCategory/6439d5b90049ad0b52b90048`}
                  title="Men's Fashion"
                />
                <ListItem
                  href={`/specificCategory/6439d30b67d9aa4ca97064b1`}
                  title="Beauty & Health"
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/brands">
                <div>Brands</div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <div className="flex gap-1.5 items-center px-3 border-r border-gray-200">
              <div className="bg-[#F0FDF4] rounded-full p-3">
                <FaHeadset className="text-green-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#99A1AF]">Support</span>
                <span className="text-xs text-[#364153]">24/7 Help</span>
              </div>
            </div>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <div className="flex items-center gap-3 ms-2 text-xl text-gray-600">
              <Link href="/wishlist" className="relative">
                <CiHeart className="cursor-pointer hover:text-red-600 transition text-2xl" />
                <div className="absolute -top-1.5 -right-2 w-[18] h-[18] bg-white rounded-full" />
                <div className="absolute -top-1.5 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-[12px] font-bold">
                    {wishlistCounter > 99 ? <span>+99</span> : wishlistCounter}
                  </span>
                </div>
              </Link>
              <Link
                href="/cart"
                className="relative p-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition duration-200"
              >
                <FaCartShopping className="cursor-pointer text-xl text-[#6A7282]" />
                <div className="absolute top-0 right-0 w-[18] h-[18] bg-white rounded-full" />
                <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-[12px] font-bold">
                    {displayCartCounter > 99 ? (
                      <span>+99</span>
                    ) : (
                      displayCartCounter
                    )}
                  </span>
                </div>
              </Link>
              {session ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setProfileOpen((v) => !v);
                    }}
                    className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-200 transition cursor-pointer"
                  >
                    <FaRegUser className="text-[#16A34A]" size={16} />
                  </button>
                  {profileOpen && (
                    <ProfileDropdown
                      session={session}
                      logOutHandler={logOutHandler}
                      setProfileOpen={setProfileOpen}
                    />
                  )}
                </div>
              ) : (
                <button className="cursor-pointer text-lg w-25 p-1 flex items-center justify-center bg-[#16A34A] rounded-3xl text-white font-bold hover:bg-green-800 transition">
                  <Link href="/login" className="flex gap-1 items-center">
                    <CiUser /> sign in
                  </Link>
                </button>
              )}
            </div>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* ===== TABLET ===== */}
      <div className="hidden lg:hidden md:flex items-center justify-between gap-1 px-4 py-3">
        <div className="flex gap-2">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
          <div>
            <img src={logo.src} alt="logo" className="h-7 w-full object-fill" />
          </div>
        </div>
        <div className="lg:hidden w-full">
          <div className="flex-1 mx-4 border-2 bg-[#F9FAFB] rounded-2xl relative">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full bg-transparent outline-none! pl-2 h-9 pr-9 rounded-2xl text-sm"
            />
            <div className="absolute top-1/2 -translate-y-1/2 right-1 bg-[#16A34A] w-[32px] h-[32px] rounded-full flex items-center justify-center">
              <FaSearch className="text-white text-xs" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xl text-gray-600">
          <Link href="/wishlist" className="relative">
            <CiHeart className="cursor-pointer hover:text-red-600 transition text-2xl" />
            <div className="absolute -top-1.5 -right-2 w-[18] h-[18] bg-white rounded-full" />
            <div className="absolute -top-1.5 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-[12px] font-bold">
                {wishlistCounter > 99 ? <span>+99</span> : wishlistCounter}
              </span>
            </div>
          </Link>
          <Link
            href="/cart"
            className="relative p-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition duration-200"
          >
            <FaCartShopping className="cursor-pointer text-xl" />
            <div className="absolute top-0 right-0 w-[18] h-[18] bg-white rounded-full" />
            <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-[12px] font-bold">
                {displayCartCounter > 99 ? (
                  <span>+99</span>
                ) : (
                  displayCartCounter
                )}
              </span>
            </div>
          </Link>
          {session ? (
            <div className="relative" ref={profileRefTablet}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileOpen((v) => !v);
                }}
                className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-200 transition cursor-pointer"
              >
                <FaRegUser className="text-[#16A34A]" size={16} />
              </button>
              {profileOpen && (
                <ProfileDropdown
                  session={session}
                  logOutHandler={logOutHandler}
                  setProfileOpen={setProfileOpen}
                />
              )}
            </div>
          ) : (
            <button className="cursor-pointer text-sm w-20 p-2 flex items-center justify-center bg-[#16A34A] rounded-2xl text-white font-bold hover:bg-green-800 transition">
              <Link href="/login" className="flex gap-1 items-center">
                <CiUser /> <span>sign in</span>
              </Link>
            </button>
          )}
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="lg:hidden md:hidden flex items-center justify-between gap-1 px-4 py-3">
        <div className="flex gap-2">
          <div>
            <img src={logo.src} alt="logo" className="h-7 w-full object-fill" />
          </div>
        </div>
        <div className="flex items-center gap-3 text-xl text-gray-600">
          <Link href="/wishlist" className="relative">
            <CiHeart className="cursor-pointer hover:text-red-600 transition text-2xl" />
            <div className="absolute -top-1.5 -right-2 w-[18] h-[18] bg-white rounded-full" />
            <div className="absolute -top-1.5 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-[12px] font-bold">
                {wishlistCounter > 99 ? <span>+99</span> : wishlistCounter}
              </span>
            </div>
          </Link>
          <Link
            href="/cart"
            className="relative p-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition duration-200"
          >
            <FaCartShopping className="cursor-pointer text-xl" />
            <div className="absolute top-0 right-0 w-[18] h-[18] bg-white rounded-full" />
            <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-[12px] font-bold">
                {displayCartCounter > 99 ? (
                  <span>+99</span>
                ) : (
                  displayCartCounter
                )}
              </span>
            </div>
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <HiX className="cursor-pointer" />
            ) : (
              <div className="bg-[#16A34A] p-2 rounded-full">
                <HiMenu className="cursor-pointer text-white text-sm" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="lg:hidden flex flex-col px-4 pb-4 gap-2 border-t text-sm font-medium text-gray-700">
          {/* Search */}
          <div className="relative my-2">
            <input
              type="text"
              placeholder="Search products.."
              className="w-full border border-gray-200 rounded-lg pl-3 pr-10 h-9 text-sm outline-none bg-[#F9FAFB]"
            />
            <div className="absolute top-1/2 -translate-y-1/2 right-1 bg-[#16A34A] w-7 h-7 rounded-lg flex items-center justify-center">
              <FaSearch className="text-white text-xs" />
            </div>
          </div>

          {/* Nav Links */}
          <Link
            href="/"
            className="py-2 border-b hover:text-green-600"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/allProducts"
            className="py-2 border-b hover:text-green-600"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>
          {/* Categories */}
          <div className="border-b">
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="w-full flex items-center justify-between py-2 hover:text-green-600 transition"
            >
              <span>Categories</span>
              <span
                className={`transition-transform duration-200 ${categoriesOpen ? "rotate-180" : ""}`}
              >
                <MdArrowDropDown />
              </span>
            </button>

            {categoriesOpen && (
              <div className="flex flex-col pl-3 pb-2 gap-1">
                <Link
                  href="/allcategories"
                  className="py-1.5 text-gray-500 hover:text-green-600 transition text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  All Categories
                </Link>
                <Link
                  href="/specificCategory/6439d2d167d9aa4ca970649f"
                  className="py-1.5 text-gray-500 hover:text-green-600 transition text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  Electronics
                </Link>
                <Link
                  href="/specificCategory/6439d58a0049ad0b52b9003f"
                  className="py-1.5 text-gray-500 hover:text-green-600 transition text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  Women's Fashion
                </Link>
                <Link
                  href="/specificCategory/6439d5b90049ad0b52b90048"
                  className="py-1.5 text-gray-500 hover:text-green-600 transition text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  Men's Fashion
                </Link>
                <Link
                  href="/specificCategory/6439d30b67d9aa4ca97064b1"
                  className="py-1.5 text-gray-500 hover:text-green-600 transition text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  Beauty & Health
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/brands"
            className="py-2 border-b hover:text-green-600"
            onClick={() => setMenuOpen(false)}
          >
            Brands
          </Link>

          {/* Wishlist + Cart */}
          <div className="flex flex-col gap-1 py-2 border-b">
            <Link
              href="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-1.5 hover:text-green-600 transition"
            >
              <span className="flex items-center gap-2">
                <CiHeart className="text-red-500 text-xl" /> Wishlist
              </span>
              <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                {wishlistCounter > 99 ? "99+" : wishlistCounter}
              </span>
            </Link>
            <Link
              href="/cart"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-1.5 hover:text-green-600 transition"
            >
              <span className="flex items-center gap-2">
                <FaCartShopping className="text-[#16A34A] text-lg" /> Cart
              </span>
              <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                {displayCartCounter > 99 ? (
                  <span>+99</span>
                ) : (
                  displayCartCounter
                )}
              </span>
            </Link>
          </div>

          {/* User */}
          {session ? (
            <div className="flex flex-col gap-1 py-2 border-b">
              <div className="flex items-center gap-2 py-1.5 text-gray-700 hover:text-green-800 transition ">
                <FaRegUser size={14} />
                <Link href={"/profile/settings"}>{session.user?.name}</Link>
              </div>
              <button
                onClick={logOutHandler}
                className="flex items-center gap-2 py-1.5 text-red-500 hover:text-red-700 transition"
              >
                <PiSignOutBold size={15} /> Sign Out
              </button>
            </div>
          ) : (
            <div className="flex gap-3 py-2 border-b">
              <Link
                href="/login"
                className="text-green-600 hover:text-green-800 transition "
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="text-green-600 hover:text-green-800 transition"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Support */}
          <div className="flex items-center gap-3 py-2">
            <div className="w-9 h-9 bg-[#F0FDF4] rounded-full flex items-center justify-center shrink-0">
              <FaHeadset className="text-green-700" size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Need Help?</p>
              <p className="text-xs text-[#16A34A]">Contact Support</p>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

function ProfileDropdown({
  session,
  logOutHandler,
  setProfileOpen,
}: {
  session: any;
  logOutHandler: () => void;
  setProfileOpen: (v: boolean) => void;
}) {
  return (
    <div className="absolute right-0 top-10 w-56 bg-white rounded-2xl shadow-xl border border-[#F3F4F6] z-50 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#F3F4F6]">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
          <FaRegUser className="text-[#16A34A]" size={16} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {session?.data?.user?.name}
          </p>
          <p className="text-xs text-gray-400 truncate">
            {session?.data?.user?.email}
          </p>
        </div>
      </div>
      <div className="py-1">
        {[
          {
            href: "/profile/settings",
            icon: <FaRegUser size={14} />,
            label: "My Profile",
          },
          {
            href: "/allorders",
            icon: <FaBoxOpen size={14} />,
            label: "My Orders",
          },
          {
            href: "/wishlist",
            icon: <FaHeart size={14} />,
            label: "My Wishlist",
          },
          {
            href: "/profile/addresses",
            icon: <FaMapMarkerAlt size={14} />,
            label: "Addresses",
          },
          {
            href: "/profile/settings",
            icon: <FaCog size={14} />,
            label: "Settings",
          },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setProfileOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            <span className="text-gray-400">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
      <div className="border-t border-[#F3F4F6] py-1">
        <button
          onClick={logOutHandler}
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition w-full"
        >
          <PiSignOutBold size={15} /> Sign Out
        </button>
      </div>
    </div>
  );
}
function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block text-sm px-3 py-2 rounded-lg hover:bg-[#F0FDF4]! hover:text-[#54BC7A]! transition! duration-200 text-gray-700"
        >
          {title}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
