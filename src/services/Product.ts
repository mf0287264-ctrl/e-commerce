import { ProductType } from "@/types/Product.type";

export async function getProducts(): Promise<ProductType[] | null> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
      cache: "force-cache",
      next: {
        revalidate: 60 * 10,
      },
    });
    const finalRes = await res.json();
    // console.log(finalRes.data);
    return finalRes.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
