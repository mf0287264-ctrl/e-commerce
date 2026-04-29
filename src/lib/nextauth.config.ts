import axios from "axios";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { refresh } from "next/cache";
import { cookies } from "next/headers";
import { email } from "zod";
// type MyObject = {
//   success: boolean;
//   data?: string;
//   status?: string;
// };
export const nextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "test",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          credentials,
        );
        if (res.data.message) {
          return {
            // id: res.data.token,
            name: res.data.user.name,
            email: res.data.user.email,
            realTokenFromBackend: res.data.token,
          };
        }
        return null;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  // secret: process.env.BETTER_AUTH_SECRET,

  callbacks: {
    jwt(params) {
      // refresh login nav

      if (params.user) {
        params.token.realTokenFromBackend = params?.user.realTokenFromBackend;
      }

      // handle update() trigger from client
      if (params.trigger === "update" && params.session?.name) {
        params.token.name = params.session.name; // <- update name in token
      }
      // console.log(params);
      return params.token;
    },
    session(params) {
      //use session
      if (params.session.user) {
        params.session.user.name = params.token.name as string;
      }
      // console.log("session", params.session);

      return params.session;
    },
  },
  // session: {
  //   maxAge: 60 * 60 * 5 * 24,
  // },
};
