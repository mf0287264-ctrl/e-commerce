"use server";
import axios from "axios";
import { formDataType } from "./signup.type";

export async function signUpAction(data: formDataType) {
  console.log(data);
  try {
    const res = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      data,
    );
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
