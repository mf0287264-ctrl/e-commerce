import { getMyToken } from "./getMyToken";

export async function getUserId(): Promise<string | null> {
  const token = await getMyToken();
  if (!token) return null;

  const payload = token.split(".")[1];
  const decoded = JSON.parse(atob(payload));

  return decoded.id;
}
