import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";

export default function ProfileHeader() {
  return (
    <div className="bg-gradient-to-r from-[#16A34A] via-[#22C55E] to-[#4ADE80]  h-[204px]  pb-20">
      <div className="w-10/12 m-auto pt-10 flex flex-col justify-center gap-5">
        <div className="text-sm text-white">
          <Link
            href={"/"}
            className="text-[#FFFFFFB2] hover:text-green-100 transition duration-200"
          >
            Home{" "}
          </Link>{" "}
          / <span className="text-[#FFFFFF]">My Account</span>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center w-14 h-14 bg-[#FFFFFF33] backdrop-blur-[8px] shadow-lg shadow-[#0000001A] rounded-[16px]">
            <FaUser className="text-white w-5 h-6" />
          </div>
          <div className="text-[#FFFFFF] ">
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="text-[#FFFFFFCC]">
              Manage your addresses and account settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
