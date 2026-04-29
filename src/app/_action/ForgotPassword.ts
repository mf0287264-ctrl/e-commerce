import { CodeForm } from "../_components/ForgotPasswordVerify";

interface mailValidation {
  statusMsg: string;
  message: string;
}
interface codeValidation {
  statusMsg: string;
  message: string;
  status: string;
}
interface resetPassordResponse {
  statusMsg: string;
  message: string;
  token: string;
}
export async function forgotPass(
  email: string,
): Promise<mailValidation | null> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      },
    );
    const finalRes = await res.json();
    return finalRes;
  } catch (error) {
    return null;
  }
}

export async function forgotPassVerifyCode(
  resetCode: CodeForm,
): Promise<codeValidation | null> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resetCode),
      },
    );
    const finalRes = await res.json();
    return finalRes;
  } catch (error) {
    return null;
  }
}
export async function resetPassword(
  email: string,
  newPassword: string,
): Promise<resetPassordResponse | null> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          newPassword: newPassword,
        }),
      },
    );
    const finalRes = await res.json();
    return finalRes;
  } catch (error) {
    return null;
  }
}
