"use server";
import axios from "axios";
import { formDataInputType } from "./login.schema";
import { cookies } from "next/headers";

export async function logInAction(data: formDataInputType) {
  try {
    const res = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      data,
    );
    console.log(res);
    const myCookies = await cookies();
    myCookies.set("token", res.data.token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return { success: true };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        data: error.response?.data,
        status: error.response?.status,
      };
    }
  }
}
