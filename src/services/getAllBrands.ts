import { BrandsResponse } from "@/types/Brand.type";

export async function getAllBrands(): Promise<BrandsResponse | null> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
      cache: "force-cache",
    });
    const finalRes = await res.json();
    return finalRes;
  } catch (error) {
    console.log(error);
    return null;
  }
}
