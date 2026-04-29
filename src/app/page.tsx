import ProductCard from "./_components/ProductCard";
import { getProducts } from "@/services/Product";
import Slider from "./_components/Slider";
import slider1 from "@/images/slider1.png";
import slider2 from "@/images/slider2.png";
import slider3 from "@/images/slider3.jpg";
import { MdHeadsetMic, MdLocalShipping } from "react-icons/md";
import { FaArrowRight, FaShieldAlt } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { getAllCaregories } from "@/services/getAllCategories";
// import CategotyCard from "./_components/CategotyCard";
const CategotyCardByLazy = lazy(() => import("./_components/CategotyCard"));

import Link from "next/link";
import { TiArrowRight } from "react-icons/ti";
import { BsStars } from "react-icons/bs";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserId } from "@/utils/getUserId";
import { getUserOrder } from "./_action/allOrders.action";

const mySlider: string[] = [slider1.src, slider2.src, slider3.src];

export default async function Home() {
  // getMyToken();
  const products = await getProducts();
  const categories = await getAllCaregories();
  // console.log(categories);

  return (
    <>
      {/* slider */}
      <section>
        <div>
          <Slider images={mySlider} spaces={100} perView={1} />
        </div>
      </section>

      {/* under slider cards */}
      <div className="w-full bg-[#F9FAFB]">
        <div className=" w-11/12 m-auto py-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="col-span-1">
            <div className="bg-white p-4 flex gap-3 rounded-xl shadow hover:shadow-lg transition items-center">
              <div className="bg-[#FEF2F2] rounded-full p-2 w-10 h-10 flex justify-center items-center shrink-0">
                <MdLocalShipping className="text-[#2B7FFF]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold">Free shiping</span>
                <span className="text-[#6A7282] text-xs">
                  On orders over 500 EGP
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white p-4 flex items-center gap-3 rounded-xl shadow hover:shadow-lg transition">
              <div className="bg-[#ECFDF5] rounded-full p-2 w-10 h-10 flex justify-center items-center shrink-0">
                <FaShieldAlt className="text-[#00BC7D]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold">Secure Payment</span>
                <span className="text-[#6A7282] text-xs">
                  100% secure transactions
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white p-4 flex items-center gap-3 rounded-xl shadow hover:shadow-lg transition duration-600">
              <div className="bg-[#F3F4F6] rounded-full p-2 flex justify-center items-center w-10 h-10 shrink-0">
                <IoMdRefresh className="text-[#FF6900]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold">Easy Returns</span>
                <span className="text-[#6A7282] text-xs">
                  14-day return policy
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white p-4 flex items-center gap-3 rounded-xl shadow hover:shadow-lg transition">
              <div className="bg-[#F9FAFB] rounded-full p-2 w-10 h-10 flex justify-center items-center shrink-0">
                <MdHeadsetMic className="text-[#AD46FF]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold">24/7 Support</span>
                <span className="text-[#6A7282] text-xs">
                  Dedicated support team
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-11/12 xl:w-11/12 mx-auto">
        {/* catigories */}
        <section>
          <div className="flex justify-between items-center pt-20">
            <div className="flex items-center gap-2 mb-7">
              <div className="w-[6px] h-[32px] rounded-[33554400px] bg-gradient-to-r from-[#00BC7D] to-[#007A55]"></div>
              <span className="font-bold text-2xl"> Shop By </span>
              <span className="text-green-600 font-bold text-2xl">
                Category
              </span>
            </div>
            <Link
              href="/allcategories"
              className="flex items-center gap-1 cursor-pointer group "
            >
              <span className="text-[#16A34A] select-none group-hover:text-[#12bb50]  group-hover:-translate-y-0.5 transition duration-300">
                View All Categories
              </span>
              <FaArrowRight className="text-[#16A34A] group-hover:translate-x-1 transition duration-300" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {categories?.map((category) => (
              <Suspense
                key={category._id}
                fallback={
                  <div className="flex w-fit items-center gap-4">
                    <Skeleton className="size-10 shrink-0 rounded-full" />
                    <div className="grid gap-2">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                  </div>
                }
              >
                <CategotyCardByLazy categories={category} />
              </Suspense>
            ))}
          </div>

          {/*tow cards in the mid */}

          <div className=" py-20 px-5">
            <div className="gap-6 w-full grid grid-cols-1 md:grid-cols-2">
              {/* Card 1 - Green */}
              <div className="col-span-1 w-full">
                {" "}
                <div className="relative flex-1 w-full  rounded-2xl p-8 overflow-hidden bg-gradient-to-br from-[#00BC7D]  to-[#007A55] shadow-lg shadow-[#007A55]  hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                  {/* Bubbles */}
                  <div className="absolute -top-12 -right-8 w-44 h-44 rounded-full bg-white/10 pointer-events-none" />
                  <div className="absolute -bottom-8 right-14 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />

                  {/* Badge */}
                  <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full mb-5">
                    🔥 Deal of the Day
                  </span>

                  {/* Title */}
                  <h2 className="text-white text-2xl font-extrabold tracking-tight mb-2">
                    Fresh Organic Fruits
                  </h2>

                  {/* Subtitle */}
                  <p className="text-white/80 text-sm mb-5">
                    Get up to 40% off on selected organic fruits
                  </p>

                  {/* Discount */}
                  <div className="flex items-center gap-2 mb-7">
                    <span className="text-white text-2xl font-black tracking-tight">
                      40% OFF
                    </span>
                    <span className="text-white/75 text-xs">
                      Use code:{" "}
                      <span className="text-white font-bold">ORGANIC40</span>
                    </span>
                  </div>

                  {/* Button */}
                  <Link
                    href={"/allProducts"}
                    className="cursor-pointer inline-flex items-center gap-2 bg-white text-[#009966] text-sm font-bold px-6 py-2.5 rounded-full shadow-md  hover:scale-105 transition-all duration-200"
                  >
                    <span className="flex  items-center gap-1">
                      {" "}
                      Shop Now <TiArrowRight />
                    </span>
                  </Link>
                </div>
              </div>
              {/* Card 2 - Orange/Red */}
              <div className="col-span-1 w-full">
                {" "}
                <div className="relative col-span-1 flex-1 w-full  rounded-2xl p-8 overflow-hidden bg-gradient-to-br from-[#FF8904] to-[#FF2056] shadow-lg shadow-[#FF2056] hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                  {/* Bubbles */}
                  <div className="absolute -top-12 -right-8 w-44 h-44 rounded-full bg-white/10 pointer-events-none" />
                  <div className="absolute -bottom-8 right-14 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />

                  {/* Badge */}
                  <span className="flex items-center justify-center inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full mb-5">
                    <BsStars className="text-yellow-300" /> New Arrivals
                  </span>

                  {/* Title */}
                  <h2 className="text-white text-2xl font-extrabold tracking-tight mb-2">
                    Exotic Vegetables
                  </h2>

                  {/* Subtitle */}
                  <p className="text-white/80 text-sm mb-5">
                    Discover our latest collection of premium vegetables
                  </p>

                  {/* Discount */}
                  <div className="flex items-center gap-2 mb-7">
                    <span className="text-white text-2xl font-black tracking-tight">
                      25% OFF
                    </span>
                    <span className="text-white/75 text-xs">
                      Use code:{" "}
                      <span className="text-white font-bold">FRESH25</span>
                    </span>
                  </div>

                  {/* Button */}
                  <Link
                    href={"/allProducts"}
                    className="cursor-pointer inline-flex items-center gap-2 bg-white text-[#FF6900] text-sm font-bold px-6 py-2.5 rounded-full shadow-md  hover:scale-105 transition-all duration-200"
                  >
                    <span className="flex  items-center gap-1">
                      {" "}
                      Explore Now <TiArrowRight />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* products  */}
        <section>
          <div className="flex items-center gap-2 mb-7">
            <div className="w-[6px] h-[32px] rounded-[33554400px] bg-gradient-to-r from-[#00BC7D] to-[#007A55]"></div>
            <span className="font-bold text-2xl"> Featured </span>
            <span className="text-green-600 font-bold text-2xl">Products</span>
          </div>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products?.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
