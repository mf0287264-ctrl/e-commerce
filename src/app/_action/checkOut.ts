"use server";
import { getMyToken } from "@/utils/getMyToken";
import {
  OnlineOrderResponse,
  OrderResponse,
  ShippingAddress,
} from "./../../types/CheckOut.type";

export async function createCashOrder(
  cartId: string | null,
  shippingInfo: ShippingAddress,
): Promise<OrderResponse | null> {
  const token = await getMyToken();
  if (!token) {
    return null;
  }
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({
        shippingAddress: {
          details: shippingInfo.details,
          phone: shippingInfo.phone,
          city: shippingInfo.city,
          postalCode: shippingInfo.postalCode,
        },
      }),
    },
  );
  const finalRes = await res.json();
  return finalRes;
}
export async function createVisaOrder(
  cartId: string | null,
  shippingInfo: ShippingAddress,
): Promise<OnlineOrderResponse | null> {
  const token = await getMyToken();
  if (!token) {
    return null;
  }
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({
        shippingAddress: {
          details: shippingInfo.details,
          phone: shippingInfo.phone,
          city: shippingInfo.city,
        },
      }),
    },
  );
  const finalRes = await res.json();
  return finalRes;
}
