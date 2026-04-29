import HeaderForBrandDedailes from "@/app/_components/HeaderForBrandDedailes";
import ProductCard from "@/app/_components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  getProductBasedOnCategory,
  getSpecificCaregory,
} from "@/services/getAllCategories";
import Link from "next/link";
import React from "react";
import { FaBoxOpen, FaFilter, FaTags } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
interface paramsType {
  id: string;
}
export default async function page({ params }: { params: paramsType }) {
  const { id } = await params;
  const categoryData = await getSpecificCaregory(id);
  const product = await getProductBasedOnCategory(id);
  console.log(product);
  return (
    <div>
      {" "}
      <HeaderForBrandDedailes
        title={categoryData?.name ?? " home"}
        image={categoryData?.image}
        isCategory={true}
      />
      <div className="w-11/12 m-auto">
        <div className="flex flex-col gap-5 mt-7">
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-500 text-sm" />
            <span className="text-gray-500 text-sm font-medium">
              Active Filters:
            </span>
            <Link
              href={"/allcategories"}
              className="rounded-full py-1 px-3 bg-[#D0FAE5] text-[#007A55] flex items-center gap-1 hover:bg-[#A4F4CF] transition duration-200 cursor-pointer"
            >
              <FaTags className="text-xs" />
              <span className="text-sm font-medium">{categoryData?.name}</span>
              <IoIosClose className="text-base hover:text-[#5a06b8] text-xl" />
            </Link>
            <Link
              href={"/allcategories"}
              className="text-sm text-gray-500 underline cursor-pointer hover:text-gray-800 transition duration-200"
            >
              Clear all
            </Link>
          </div>
          <div className="text-sm text-gray-600">
            Showing {product?.length} products
          </div>
        </div>

        {product?.length == 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 w-full  mt-3">
            <div className="bg-[#F3F4F6] rounded-full p-6">
              <FaBoxOpen className="text-[#99A1AF] w-10 h-10" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <h2 className="text-lg font-bold text-gray-900">
                No Products Found
              </h2>
              <p className="text-sm text-gray-500">
                No products match your current filters.
              </p>
            </div>
            <Button className="bg-[#16A34A] hover:bg-[#15803D] cursor-pointer h-10 text-white font-semibold px-6 py-2 rounded-full transition duration-200">
              <Link href={"/allProducts"}> View All Products</Link>
            </Button>
          </div>
        )}

        <div className="grid gap-3 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-3">
          {product?.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
