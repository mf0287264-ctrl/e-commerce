import { cookies } from "next/headers";
import { getMyToken } from "./getMyToken";

export async function getUserName(): Promise<string | null> {
  // check override cookie first
  const nameCookie = (await cookies()).get("user_name")?.value;
  if (nameCookie) return nameCookie;

  const token = await getMyToken();
  if (!token) return null;

  const payload = token.split(".")[1];
  const decoded = JSON.parse(atob(payload));

  return decoded.name;
}
