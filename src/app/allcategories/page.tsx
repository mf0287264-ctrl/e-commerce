import React from "react";
import GeneralHeader from "../_components/GeneralHeader";
import { IoIosArrowRoundForward } from "react-icons/io";
import Link from "next/link";
import { getAllCaregories } from "@/services/getAllCategories";

export default async function page() {
  const res = await getAllCaregories();
  console.log(res);
  return (
    <div>
      <GeneralHeader isCategory={true} />
      <div className="w-10/12 m-auto py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-5">
          {res?.map((catygory) => (
            <Link
              href={`/category/${catygory._id}`}
              key={catygory._id}
              className="flex flex-col border border-[#F3F4F6] items-center gap-3 p-3 cursor-pointer shadow-sm rounded-2xl hover:shadow-xl hover:-translate-y-1.5 group transition-all duration-300"
            >
              <div className="rounded-xl overflow-hidden w-full aspect-square">
                <img
                  src={catygory.image}
                  alt={catygory.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#16A34A] transition-colors duration-300 pb-1">
                {catygory.name}
              </span>
              <span className="flex items-center justify-center text-xs text-[#16A34A] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mt-2 pb-1">
                View Products <IoIosArrowRoundForward className="text-lg" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
