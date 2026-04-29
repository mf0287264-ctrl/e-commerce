import { getAllBrands } from "@/services/getAllBrands";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import GeneralHeader from "../_components/GeneralHeader";

export default async function page() {
  const brands = await getAllBrands();
  // console.log(brands);
  return (
    <div>
      <GeneralHeader isBrand={true} />
      <div className="w-10/12 m-auto py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-5">
          {brands?.data.map((brand) => (
            <Link
              href={`/BrandDetailes/${brand._id}`}
              key={brand._id}
              className="flex flex-col lg:h-[243px] border! border-[#F3F4F6] items-center justify-center gap-3 p-5 cursor-pointer shadow-md rounded-2xl hover:shadow-xl hover:border-[#ede3f9] hover:-translate-y-1.5 group transition-all duration-300"
            >
              <div className="bg-[#F9FAFB] rounded-xl w-full aspect-square flex items-center justify-center p-4 ">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-all duration-300"
                />
              </div>
              <span className="text-sm text-gray-700 group-hover:text-[#7F22FE] transition-colors duration-300">
                {brand.name}
              </span>
              <span className="flex items-center justify-center text-xs text-[#7F22FE] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Products <IoIosArrowRoundForward className="text-lg" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
