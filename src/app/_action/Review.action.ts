"use server";

import { Review } from "@/types/Product.type";
import { getMyToken } from "@/utils/getMyToken";

interface ReviewType {
  review: string;
  rating: number;
}
interface noTokenType {
  noToken: boolean;
}
interface existType {
  message: string;
  errors: { value: string; msg: string; param: string; location: string };
}

export async function createReviewForProduct(
  productId: string,
  review: ReviewType,
): Promise<Review | existType | null | noTokenType> {
  const token = await getMyToken();
  if (!token) return { noToken: true };
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify(review),
      },
    );
    const finalRes = await res.json();
    return finalRes;
  } catch (error) {
    return null;
  }
}

export async function getProductReviews(
  productId: string,
): Promise<Review[] | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,
      { method: "GET" },
    );
    const finalRes = await res.json();
    return finalRes.data ?? null;
  } catch (error) {
    return null;
  }
}
