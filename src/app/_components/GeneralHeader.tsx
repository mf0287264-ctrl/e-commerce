import Link from "next/link";
import { FaTags, FaThLarge, FaBoxOpen, FaLayerGroup } from "react-icons/fa";

type Props = {
  isBrand?: boolean;
  isCategory?: boolean;
  isProduct?: boolean;
};

const config = {
  brand: {
    gradient: "bg-gradient-to-r from-[#7F22FE] via-[#8E51FF] to-[#C27AFF]",
    icon: <FaTags className="text-white w-5 h-6" />,
    title: "Top Brands",
    subtitle: "Shop from your favorite brands",
    breadcrumb: "Brands",
  },
  category: {
    gradient: "bg-gradient-to-r from-[#16A34A] via-[#22C55E] to-[#4ADE80]",
    icon: <FaLayerGroup className="text-white w-5 h-6" />,
    title: "All Categories",
    subtitle: "Browse our wide range of product categories",
    breadcrumb: "Categories",
  },
  product: {
    gradient: "bg-gradient-to-r from-[#16A34A] via-[#22C55E] to-[#4ADE80]",
    icon: <FaBoxOpen className="text-white w-5 h-6" />,
    title: "All Products",
    subtitle: "Explore our complete product collection",
    breadcrumb: "Products",
  },
};

export default function GeneralHeader({
  isBrand,
  isCategory,
  isProduct,
}: Props) {
  const active = isBrand
    ? config.brand
    : isCategory
      ? config.category
      : isProduct
        ? config.product
        : null;

  if (!active) return null;

  return (
    <div className={`${active.gradient} h-[204px] pb-20`}>
      <div className="w-10/12 m-auto pt-10 flex flex-col justify-center gap-5">
        <div className="text-sm text-white">
          <Link
            href="/"
            className="text-[#FFFFFFB2] hover:text-white transition duration-200"
          >
            Home
          </Link>{" "}
          / <span className="text-white">{active.breadcrumb}</span>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center w-14 h-14 bg-[#FFFFFF33] backdrop-blur-[8px] shadow-lg shadow-[#0000001A] rounded-[16px]">
            {active.icon}
          </div>
          <div className="text-white">
            <h1 className="text-3xl font-bold">{active.title}</h1>
            <p className="text-[#FFFFFFCC]">{active.subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
