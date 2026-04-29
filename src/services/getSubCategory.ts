import { ProductsResponse } from "@/types/Brand.type";
import {
  SubCategoriesResponse,
  SubCategoryType,
} from "@/types/Categories.type";

export async function getSpecificSubCaregory(
  id: string,
): Promise<SubCategoriesResponse | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
      {
        cache: "no-store",
      },
    );
    const finalRes = await res.json();
    return finalRes;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getSubCategoryInfo(
  id: string,
): Promise<SubCategoryType | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/subcategories/${id}`,
      {
        cache: "no-store",
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
export async function getProductSubCaregory(
  id: string,
): Promise<ProductsResponse | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/?subcategory=${id}`,
      {
        cache: "no-store",
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
