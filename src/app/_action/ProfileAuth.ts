"use server";
import { getMyToken } from "@/utils/getMyToken";
import { ProfileInfo } from "../profile/settings/ProfileSettings.Schema";
import { ChangePasswordInfo } from "../profile/settings/ProfileSettingsPass.shema";
import { cookies } from "next/headers";
export async function updateLoggedUserData(ProfileNewData: ProfileInfo) {
  const token = await getMyToken();
  if (!token) return null;
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(ProfileNewData),
      },
    );
    const finalRes = await res.json();
    if (finalRes.message === "success") {
      (await cookies()).set("user_name", finalRes.user.name, { path: "/" });
    }
    return finalRes;
  } catch (error) {
    console.log(error);
  }
}
export async function updateLoggedUserPassword(
  ProfileNewPassword: ChangePasswordInfo,
) {
  const token = await getMyToken();
  if (!token) return null;
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(ProfileNewPassword),
      },
    );
    const finalRes = await res.json();
    return finalRes;
  } catch (error) {
    console.log(error);
    return null;
  }
}
