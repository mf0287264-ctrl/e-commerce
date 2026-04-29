import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken(): Promise<string | null> {
  const myCookies = await cookies();
  const tokenFromCookies = myCookies.get("next-auth.session-token")?.value;
  // console.log("tokenFromCookies", tokenFromCookies);
  const tokenAfterDecoded = await decode({
    token: tokenFromCookies,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  // console.log("tokenAfterDecoded", tokenAfterDecoded);
  // console.log("realTokenFromBackend", tokenAfterDecoded?.realTokenFromBackend);
  return tokenAfterDecoded?.realTokenFromBackend as string;
}
