import { ProductsResponse, SingleBrandResponse } from "@/types/Brand.type";

export async function getSpecificBrand(
  id: string,
): Promise<ProductsResponse | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/?brand=${id}`,
      {
        cache: "force-cache",
      },
    );
    const finalRes = await res.json();
    // console.log(finalRes.data);
    return finalRes;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getBrandInfo(
  id: string,
): Promise<SingleBrandResponse | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
      {
        cache: "force-cache",
      },
    );
    const finalRes = await res.json();
    // console.log(finalRes.data);
    return finalRes;
  } catch (error) {
    console.log(error);
    return null;
  }
}
