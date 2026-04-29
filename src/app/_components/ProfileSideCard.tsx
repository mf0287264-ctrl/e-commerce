"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdLocationOn, MdSettings } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const links = [
  { href: "/profile/addresses", label: "My Addresses", icon: MdLocationOn },
  { href: "/profile/settings", label: "Settings", icon: MdSettings },
];

export default function ProfileSideCard() {
  const pathname = usePathname();

  return (
    <Card className="w-full  border border-[#F3F4F6]!">
      <CardHeader className="px-4 border-b border-gray-100">
        <span className="text-sm font-semibold text-gray-900">My Account</span>
      </CardHeader>
      <CardContent className="px-2 pb-3 pt-0 flex flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-green-50 text-green-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <span className="flex items-center gap-2">
                <Icon
                  className={cn(
                    "w-4 h-4",
                    isActive ? "text-green-600" : "text-gray-400",
                  )}
                />
                {label}
              </span>
              <MdChevronRight
                className={cn(
                  "w-4 h-4",
                  isActive ? "text-green-500" : "text-gray-300",
                )}
              />
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
