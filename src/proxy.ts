import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(req: NextRequest) {
  const jwt = await getToken({ req });
  const { pathname } = req.nextUrl;

  if (
    !jwt &&
    ["/allorders", "/profile/settings", "/profile/addresses"].includes(pathname)
  ) {
    return NextResponse.redirect(process.env.NEXTAUTH_URL_INTERNAL! + "/login");
  }

  if (jwt && ["/login", "/signup"].includes(pathname)) {
    return NextResponse.redirect(process.env.NEXTAUTH_URL_INTERNAL! + "/");
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/allorders",
    "/profile/settings",
    "/profile/addresses",
    "/login",
    "/signup",
  ],
};
