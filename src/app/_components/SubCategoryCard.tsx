import Link from "next/link";
import React from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function SubCategoryCard({
  name,
  id,
}: {
  name: string;
  id: string;
}) {
  return (
    <Link
      href={`/SubCategories/${id}`}
      className="flex flex-col gap-3 p-4 rounded-2xl h-[150px] border border-[#F3F4F6] group shadow-sm w-full hover:-translate-y-1.5 hover:shadow-lg hover:border-green-200 transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] group-hover:bg-[#DCFCE7]  transition-all duration-200 flex items-center justify-center ">
        <FaFolderOpen className="text-[#16A34A]" size={18} />
      </div>
      <span className="text-base font-bold text-gray-900 group-hover:text-[#16A34A] transition-all duration-200">
        {name}
      </span>
      <span className="text-xs text-[#16A34A] flex items-center opacity-0 group-hover:opacity-100 transition-all duration-200">
        Browse Products <IoIosArrowRoundForward className="text-lg " />
      </span>
    </Link>
  );
}
