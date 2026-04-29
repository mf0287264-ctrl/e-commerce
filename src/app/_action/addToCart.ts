"use server";
import { CartType } from "@/types/Cart.type";
import { getMyToken } from "@/utils/getMyToken";
export async function addToCard(productId: string): Promise<CartType | null> {
  const token = await getMyToken();
  if (!token) {
    return null;
  }
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
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
  } catch (error) {
    return null;
  }
}
export async function getCartLogs(): Promise<CartType | null> {
  const token = await getMyToken();
  if (!token) {
    return null;
  }
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
      headers: {
        token: token as string,
      },
    });
    const finalRes = await res.json();
    return finalRes;
  } catch (error) {
    return null;
  }
}
export async function deleteProductFromCard(
  productId: string,
): Promise<CartType | null> {
  const token = await getMyToken();
  if (!token) {
    return null;
  }
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          token: token as string,
        },
      },
    );
    const finalRes = await res.json();
    return finalRes;
  } catch (error) {
    return null;
  }
}
export async function deleteAllProductFromCard(): Promise<CartType | null> {
  const token = await getMyToken();
  if (!token) {
    return null;
  }
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    });
    const finalRes = await res.json();
    return finalRes;
  } catch (error) {
    return null;
  }
}
export async function updateProductFromCard(
  productId: string,
  count: number,
): Promise<CartType | null> {
  const token = await getMyToken();
  if (!token) {
    return null;
  }
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
      {
        method: "PUT",
        headers: {
          token: token as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          count: count,
        }),
      },
    );
    const finalRes = await res.json();
    return finalRes;
  } catch (error) {
    return null;
  }
}
