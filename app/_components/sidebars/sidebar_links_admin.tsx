"use client";
import React from "react";
import LogoHeader from "../logo-header";
import DashboardLinks from "../dashboard/dashboard_links";
import { Stack, MessageSvg } from "../../assets/svgs";
import { usePathname } from "next/navigation";
import Users from "@/app/assets/svgs/users";

export default function SideBarLinksAdmin() {
  const pathName = usePathname();
  return (
    <>
      <div className=" px-4 py-10">
        <LogoHeader color="sidebar" />
      </div>

      <div className=" w-full">
        <DashboardLinks
          isActive={pathName === "/admin/dashboard"}
          icon={<Stack className="size-6" />}
          linkName="Dashboard"
          href="/admin/dashboard"
        />
        <DashboardLinks
          isActive={pathName === "/admin/dashboard/users"}
          icon={<Users className="size-6" />}
          linkName="Users"
          href="/admin/dashboard/users"
        />

        <DashboardLinks
          isActive={pathName === "/admin/dashboard/message"}
          icon={<MessageSvg className="size-6" />}
          linkName="Message"
          href="/admin/dashboard/message"
        />
      </div>
    </>
  );
}
