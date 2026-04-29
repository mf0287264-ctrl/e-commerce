"use server";
import {
  AddressResponse,
  GetUserAddressType,
} from "@/types/ProfileAddress.type";
import { getMyToken } from "@/utils/getMyToken";
import { AddressFormData } from "../profile/addresses/ProfileAddress.schema";

export async function addAddress(
  addressInfo: AddressFormData,
): Promise<AddressResponse | null> {
  const token = await getMyToken();
  if (!token) {
    return null;
  }
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/addresses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify(addressInfo),
      },
    );
    const finalRes = await res.json();
    return finalRes;
  } catch (error) {
    return null;
  }
}
export async function getAddress(): Promise<GetUserAddressType | null> {
  const token = await getMyToken();
  if (!token) {
    return null;
  }
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/addresses",
      {
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
export async function removeAddress(
  addressId: string,
): Promise<AddressResponse | null> {
  const token = await getMyToken();
  if (!token) {
    return null;
  }
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
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
