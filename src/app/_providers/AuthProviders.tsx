"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
//session
export default function AuthProviders({ children }: any) {
  return <SessionProvider>{children}</SessionProvider>;
}
