import { ProductType } from "@/types/Product.type";

export async function getSpecificProduct(
  id: string,
): Promise<ProductType | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      {
        cache: "force-cache",
      },
    );
    const finalRes = await res.json();
    // console.log(finalRes.data);
    return finalRes.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
