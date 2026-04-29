import HeaderForBrandDedailes from "@/app/_components/HeaderForBrandDedailes";
import SubCategoryCard from "@/app/_components/SubCategoryCard";
import {
  getAllSubCategories,
  getSpecificCaregory,
} from "@/services/getAllCategories";
import Link from "next/link";
import React from "react";
import { BsBoxSeam } from "react-icons/bs";
import { FaFolderOpen } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";

interface ParamsType {
  id: string;
}
export default async function page({ params }: { params: ParamsType }) {
  const { id } = await params;
  const res = await getAllSubCategories(id);
  const category = await getSpecificCaregory(id);
  console.log(res);
  return (
    <div>
      <HeaderForBrandDedailes
        title={category?.name ?? "home"}
        image={
          category?.image ??
          "https://ecommerce.routemisr.com/Route-Academy-categories/1681511427130.png"
        }
      />

      <div className="w-11/12 m-auto mt-5">
        <div className="flex flex-col gap-5">
          <Link
            className="flex items-center hover:text-green-500 transition duration-100 text-gray-400 text-sm"
            href={"/allcategories"}
          >
            <IoIosArrowRoundBack className="text-xl" /> Back to Categories
          </Link>
          <span className="font-bold mb-5">
            {res?.data.length} Subcategories in {category?.name}
          </span>
        </div>
        {res?.data.length == 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-28 h-28 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FaFolderOpen className="w-12 h-12 text-gray-400" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              No Subcategories Found
            </h2>

            <p className="text-gray-500 text-center text-sm mb-8 max-w-xs">
              This category doesn't have any subcategories yet.
            </p>

            <Link
              href="/allProducts"
              className="shadow-lg hover:-translate-y-2 shadow-[#74ad89] flex items-center gap-2 bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-bold px-8 py-3 rounded-xl hover:from-[#13803b] hover:to-[#166534] transition-all duration-300"
            >
              View All Products <span className="text-lg">→</span>
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-5">
            {res?.data.map((sub) => (
              <div key={sub._id} className="col-span-1">
                <SubCategoryCard name={sub.name} id={sub._id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
