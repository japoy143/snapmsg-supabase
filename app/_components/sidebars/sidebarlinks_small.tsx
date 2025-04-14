"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface DashboardLinksPropsSmall {
  icon: React.JSX.Element;
  href: string;
}
export default function SidebarLinksSmall({
  href,
  icon,
}: DashboardLinksPropsSmall) {
  const pathName = usePathname();

  return (
    <Link
      href={href}
      className={`w-full flex gap-2 ${pathName === href ? "text-[var(--primary-color)]" : " text-white/40"} p-4`}
    >
      {icon}
    </Link>
  );
}
