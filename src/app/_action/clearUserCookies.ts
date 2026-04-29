"use server";
import { cookies } from "next/headers";

export async function clearUserCookies() {
  (await cookies()).delete("user_name");
}
