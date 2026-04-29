import Link from "next/link";
import React from "react";
import { FaFolderOpen, FaHeadset, FaShieldAlt, FaUser } from "react-icons/fa";

export default function HeaderForBrandDedailes({
  title,
  image,
  isSub,
  isprivacy,
  isContact,
  isCategory,
}: {
  title: string;
  image?: string;
  isSub?: boolean;
  isprivacy?: boolean;
  isContact?: boolean;
  isCategory?: boolean;
}) {
  return (
    <div className="bg-gradient-to-r from-[#16A34A] via-[#22C55E] to-[#4ADE80]  h-[204px]  pb-20">
      <div className="w-10/12 m-auto pt-10 flex flex-col justify-center gap-5">
        <div className="text-sm text-[#FFFFFFB2]">
          <Link
            href={"/"}
            className="text-[#FFFFFFB2] hover:text-green-100 transition duration-200"
          >
            Home{" "}
          </Link>
          /{" "}
          {isSub ? (
            <Link
              href={"/allcategories"}
              className="text-[#FFFFFFB2] hover:text-green-100 transition duration-200"
            >
              Categories /
            </Link>
          ) : isprivacy ? (
            ""
          ) : isContact ? (
            ""
          ) : isCategory ? (
            <Link
              href={"/allcategories"}
              className="text-[#FFFFFFB2] hover:text-green-100 transition duration-200"
            >
              category /
            </Link>
          ) : (
            <Link
              href={"/brands"}
              className="text-[#FFFFFFB2] hover:text-green-100 transition duration-200"
            >
              Brands /
            </Link>
          )}{" "}
          <span className="text-[#FFFFFF]">{title}</span>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center w-14 h-14 bg-[#FFFFFF33] backdrop-blur-[8px] shadow-lg shadow-[#0000001A] rounded-[16px]">
            {isSub ? (
              <FaFolderOpen className="text-white text-3xl" />
            ) : isprivacy ? (
              <FaShieldAlt className="text-white text-3xl" />
            ) : isContact ? (
              <FaHeadset className="text-white text-3xl" />
            ) : (
              <img
                src={image}
                alt="brand photo"
                className="w-full h-full object-contain rounded-[16px]"
              />
            )}
          </div>
          <div className="text-[#FFFFFF] ">
            <h1 className="text-3xl font-bold">{title}</h1>
            {isContact ? (
              <span>
                We'd love to hear from you. Get in touch with our team.
              </span>
            ) : (
              <p className="text-[#FFFFFFCC]">Shop {title} products</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
