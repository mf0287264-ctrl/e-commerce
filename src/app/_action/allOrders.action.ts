import { getUserId } from "@/utils/getUserId";
import { AllOrderType } from "../allorders/allorders.type";

export async function getUserOrder(): Promise<AllOrderType[] | null> {
  const userId = await getUserId();
  if (!userId) {
    return null;
  }
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  const finalRes = await res.json();

  return finalRes;
}
