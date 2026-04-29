"use server";
import { deleteWishlistType, wishlistLogsType } from "@/types/Wishlist.type";
import { getMyToken } from "@/utils/getMyToken";

export async function addProductToWishlist(productId: string) {
  const token = await getMyToken();
  if (!token) return null;
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token as string,
    },
    body: JSON.stringify({
      productId: productId,
    }),
  });
  const finalRes = await res.json();
  return finalRes;
}
export async function getWishlistLogs(): Promise<wishlistLogsType | null> {
  const token = await getMyToken();
  if (!token) {
    return null;
  }
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    headers: {
      token: token as string,
    },
  });
  const finalRes = await res.json();
  return finalRes;
}

export async function removeProductFromWishlist(
  productId: string,
): Promise<deleteWishlistType | null> {
  const token = await getMyToken();
  if (!token) {
    return null;
  }
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    },
  );
  const finalRes = await res.json();
  return finalRes;
}
