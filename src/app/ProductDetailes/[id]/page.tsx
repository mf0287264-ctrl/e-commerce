import { CarouselSpacing } from "@/app/_components/CarouselSpacing";
import NavAndTabsProduct from "@/app/_components/NavAndTabsProduct";
import ProductDetailsSliderImage from "@/app/_components/ProductDetailsSliderImage";
import QuantityProduct from "@/app/_components/QuantityProduct";
import { getProductBasedOnCategory } from "@/services/getAllCategories";
import { getSpecificProduct } from "@/services/getSpecificProduct";
import Link from "next/link";
import { FaShieldAlt, FaShippingFast } from "react-icons/fa";
import { IoIosRefresh, IoMdHome } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import Rating from "../../_components/Rating";

interface probType {
  params: {
    id: string;
  };
}

export default async function page({ params }: probType) {
  const { id } = await params;
  const product = await getSpecificProduct(id);
  const youMayLikeProducts = await getProductBasedOnCategory(
    product?.category._id ?? "",
  );
  // console.log(product);
  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="mb-5 flex items-center gap-2 text-sm text-gray-500  flex-wrap">
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-green-600 transition-colors"
        >
          <IoMdHome /> <span>Home</span>
        </Link>
        <MdKeyboardArrowRight />
        <Link
          href={`/allcategories`}
          className="hover:text-green-600 transition-colors"
        >
          {product?.category?.name}
        </Link>
        <MdKeyboardArrowRight />
        <span className="hover:text-green-600 transition-colors cursor-pointer">
          {product?.subcategory?.[0]?.name}
        </span>
        <MdKeyboardArrowRight />
        <span className="font-semibold text-gray-900 truncate max-w-[200px]">
          {product?.title}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* ---- LEFT: Images ---- */}
        <div className="">
          <div className="shadow sticky top-11 rounded-2xl p-4 md:col-span-1 flex flex-col gap-4">
            <ProductDetailsSliderImage
              images={product?.images}
              coverImage={product?.imageCover}
              title={product?.title}
            />
          </div>
        </div>

        {/* ---- RIGHT: Info ---- */}
        <div className="md:col-span-3 flex flex-col gap-4 shadow  rounded-2xl p-6">
          {/* Badges */}
          <div className="flex gap-2">
            <span className="text-xs  text-[#15803D] bg-[#F0FDF4] px-3 py-1 rounded-full font-medium">
              {product?.category?.name}
            </span>
            <span className="text-xs  text-[#101828] bg-gray-50 px-3 py-1 rounded-full font-medium">
              {product?.brand?.name}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900">{product?.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <Rating
              rating={product?.ratingsAverage ? product?.ratingsAverage : 0}
            />
            <span className="text-sm text-gray-500">
              {product?.ratingsAverage} ({product?.ratingsQuantity} reviews)
            </span>
          </div>

          {/* Price */}
          {product?.priceAfterDiscount ? (
            <div className="flex gap-3 items-center ">
              <p className="text-2xl font-bold text-gray-900 ">
                {product?.priceAfterDiscount} EGP
              </p>
              <p className="text-red-700 line-through"> {product?.price} EGP</p>
              <div className="bg-red-600 px-2 rounded-2xl text-white ">
                Save{" "}
                {Math.round(
                  ((product?.price - product?.priceAfterDiscount) /
                    product?.price) *
                    100,
                )}
                %
              </div>
            </div>
          ) : (
            <p className="text-2xl font-bold text-gray-900">
              {product?.price} EGP
            </p>
          )}

          {/* Stock */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            <span className="text-sm text-green-600 font-medium">In Stock</span>
          </div>

          {/* Description */}
          <p className="text-sm text-[#4A5565] leading-relaxed border-t border-gray-200 pt-4">
            {product?.description}
          </p>

          {/* ----------qunatity and buttons-------- */}
          <QuantityProduct
            productId={product?._id ?? " "}
            maxQuantity={product?.quantity ?? 0}
            price={product?.price ?? 0}
            product={{
              _id: product?._id ?? "",
              title: product?.title ?? "",
              imageCover: product?.imageCover ?? "",
              price: product?.price ?? 0,
              category: product?.category ?? { name: "" },
            }}
          />

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3 border-t border-gray-200 pt-4">
            <div className="col-span-1 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-xl">
                <FaShippingFast className="text-green-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-700">
                  Free Delivery
                </span>
                <span className="text-[11px] text-gray-400">
                  Orders over 550
                </span>
              </div>
            </div>
            <div className="col-span-1 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-xl">
                <IoIosRefresh className="text-green-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-700">
                  30 Days Return
                </span>
                <span className="text-[11px] text-gray-400">Money back</span>
              </div>
            </div>
            <div className="col-span-1 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-xl">
                <FaShieldAlt className="text-green-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-700">
                  Secure Payment
                </span>
                <span className="text-[11px] text-gray-400">
                  100% Protected
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavAndTabsProduct product={product} />

      <div>
        <div className="flex justify-between items-center pt-20">
          <div className="flex items-center gap-2 mb-7">
            <div className="w-[6px] h-[32px] rounded-[33554400px] bg-gradient-to-r from-[#00BC7D] to-[#007A55]"></div>
            <span className="font-bold text-2xl"> You May Also </span>
            <span className="text-green-600 font-bold text-2xl">Like</span>
          </div>
        </div>
        <CarouselSpacing youMayLikeProducts={youMayLikeProducts} />
      </div>
    </div>
  );
}
