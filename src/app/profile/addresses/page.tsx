import AddressServer from "@/app/_components/AddressServer";
import { LazyLoadingProfileAddress } from "@/app/_components/LazyLoadingProfileAddress";
import ProfileHeader from "@/app/_components/ProfileHeader";
import ProfileSideCard from "@/app/_components/ProfileSideCard";
import { Suspense } from "react";

export default function page() {
  return (
    <div>
      <ProfileHeader />
      <div className="w-10/12 m-auto pt-10">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-9 ">
          <div className="col-span-2">
            <ProfileSideCard />
          </div>
          <div className="col-span-7  lg:min-h-[600px] md:min-h-[340px]">
            <Suspense fallback={<LazyLoadingProfileAddress />}>
              <AddressServer />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
