import { getProducts } from "@/services/Product";
import GeneralHeader from "../_components/GeneralHeader";
import ProductCard from "../_components/ProductCard";

export default async function page() {
  const res = await getProducts();
  console.log(res);
  return (
    <div>
      <GeneralHeader isProduct={true} />
      <div className="w-11/12 m-auto">
        <div className="text-sm text-gray-600 my-7">Showing 40 products</div>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {res?.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
