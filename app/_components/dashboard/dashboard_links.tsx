"use client";
import Link from "next/link";
import React from "react";

interface DashboardLinksProps {
  icon: React.JSX.Element;
  linkName: string;
  href: string;
  isActive: boolean;
}

export default function DashboardLinks({
  icon,
  linkName,
  href,
  isActive,
}: DashboardLinksProps) {
  return (
    <Link
      href={href}
      className={`w-full flex gap-2 ${isActive ? "bg-[var(--primary-color)] text-white " : "bg-[var(--secondary-color)] text-white/40"} p-4`}
    >
      {icon}
      {linkName}
    </Link>
  );
}
