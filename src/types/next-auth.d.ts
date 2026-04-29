import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    realTokenFromBackend: string;
  }

  interface Session {
    user?: DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    realTokenFromBackend?: string;
  }
}
