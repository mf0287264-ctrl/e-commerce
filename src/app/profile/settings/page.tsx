import { ProfileFormSettings } from "@/app/_components/ProfileFormSettings";
import React from "react";
import { getUserId } from "@/utils/getUserId";
import { getUserRole } from "@/utils/getUserRole";
import ProfileSideCard from "@/app/_components/ProfileSideCard";
import ProfileFormSettingsPass from "@/app/_components/ProfileFormSettingsPass";
import ProfileHeader from "@/app/_components/ProfileHeader";
import { getUserName } from "@/utils/getMyName";
export default async function page() {
  const UserId = await getUserId();
  const userRole = await getUserRole();
  const userName = await getUserName();
  return (
    <div>
      <ProfileHeader />
      <div className="w-10/12 m-auto pt-10">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-9 ">
          <div className="col-span-2">
            <ProfileSideCard />
          </div>
          <div className="col-span-7 space-y-8">
            <ProfileFormSettings
              UserId={UserId}
              userRole={userRole}
              userName={userName}
            />
            <ProfileFormSettingsPass />
          </div>
        </div>
      </div>
    </div>
  );
}
