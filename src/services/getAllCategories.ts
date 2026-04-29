import { SubCategoriesResponse } from "@/types/Categories.type";
import { CategoryType, ProductType } from "@/types/Product.type";

export async function getAllCaregories(): Promise<CategoryType[] | null> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
      {
        cache: "force-cache",
      },
    );
    const finalRes = await res.json();
    return finalRes.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getSpecificCaregory(
  id: string,
): Promise<CategoryType | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      {
        cache: "force-cache",
      },
    );
    const finalRes = await res.json();
    return finalRes.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getAllSubCategories(
  id: string,
): Promise<SubCategoriesResponse | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
      {
        cache: "force-cache",
      },
    );
    const finalRes = await res.json();
    return finalRes;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProductBasedOnCategory(
  id: string,
): Promise<ProductType[] | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/?category[in]=${id}`,
      {},
    );
    const finalRes = await res.json();
    return finalRes.data;
  } catch (error) {
    return null;
  }
}
