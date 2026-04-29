import { CategoryType } from "@/types/Product.type";
import Link from "next/link";
interface CategoryProp {
  categories: CategoryType;
}
export default function CategotyCard({ categories }: CategoryProp) {
  return (
    <div className="col-span-1">
      <Link
        href={`/category/${categories._id}`}
        className="p-2  shadow flex flex-col items-center justify-center rounded-lg hover:shadow-lg duration-300 transition"
      >
        <div>
          <img
            src={categories.image}
            alt={categories.name}
            className="w-20 h-20 rounded-full"
          />
        </div>
        <span>{categories.name}</span>
      </Link>
    </div>
  );
}
