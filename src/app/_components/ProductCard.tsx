import { ProductType } from "@/types/Product.type";
import { CiHeart } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import Rating from "./Rating";
import Link from "next/link";
import AddToCardBtn from "./AddToCardBtn";
import AddToWishlist from "./AddToWishlist";

type Props = {
  product: ProductType;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="col-span-1 p-2 hover:-translate-y-2 transition-transform duration-300">
      <div className="w-full h-full bg-white rounded-lg hover:shadow-md transition duration-300 border border-[#E5E7EB] p-5 relative flex flex-col">
        {(product?.priceAfterDiscount ?? 0) > 0 && (
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-[#FB2C36] text-white text-xs font-bold px-2 py-1 rounded-md">
              -
              {Math.round(
                ((product.price - product.priceAfterDiscount!) /
                  product.price) *
                  100,
              )}
              %
            </span>
          </div>
        )}
        {/* action buttons */}
        <div className="absolute top-3 right-2 flex flex-col justify-center gap-2 text-gray-500 z-10">
          <AddToWishlist productId={product._id} />
          <div className="w-8 h-8 rounded-full shadow-2xl border flex items-center justify-center hover:text-green-600 bg-white cursor-pointer">
            <FiRefreshCcw className="w-4 h-4" />
          </div>
          <Link
            href={`/ProductDetailes/${product.id}`}
            className="w-8 h-8 rounded-full shadow-2xl border flex items-center justify-center hover:text-green-600 bg-white cursor-pointer"
          >
            <FaEye className="w-4 h-4" />
          </Link>
        </div>

        {/* image */}
        <div className="flex justify-center items-center h-[180px]">
          <img
            src={product?.imageCover}
            alt="product"
            className="h-full w-full object-contain"
          />
        </div>

        {/* content */}
        <div className="mt-3 flex flex-col flex-1">
          <p className="text-gray-400 text-[12px]">{product?.category?.name}</p>
          <Link
            href={`/ProductDetailes/${product.id}`}
            className="font-semibold text-gray-800 text-sm leading-snug mt-0.5 line-clamp-2"
          >
            {product?.title.split(" ").slice(0, 2).join(" ")}
          </Link>

          {/* rating */}
          <div className="flex items-center gap-1 text-yellow-400 text-sm mt-1">
            <Rating rating={product?.ratingsAverage} />
            <span className="text-gray-500 text-xs">
              {product.ratingsAverage} ({product.ratingsQuantity})
            </span>
          </div>

          {/* price + button — pushed to bottom */}
          <div className="flex items-center justify-between mt-auto pt-3 gap-2">
            <div className="flex flex-col min-w-0">
              {product.priceAfterDiscount ? (
                <>
                  <span className="text-[#16A34A] font-bold text-sm whitespace-nowrap">
                    {product.priceAfterDiscount} EGP
                  </span>
                  <span className="text-xs line-through text-red-600 whitespace-nowrap">
                    {product.price} EGP
                  </span>
                </>
              ) : (
                <span className="font-bold text-[#16A34A] text-sm whitespace-nowrap">
                  {product.price} EGP
                </span>
              )}
            </div>
            {/* modified here */}
            <AddToCardBtn productId={product._id} product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
