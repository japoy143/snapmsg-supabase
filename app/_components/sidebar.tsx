"use client";
import React from "react";
import LogoHeader from "./logo-header";
import DashboardLinks from "./dashboard_links";
import { Stack, Tags, Response, ChatScripts } from "../assets/svgs";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathName = usePathname();
  return (
    <>
      <div className=" px-4 py-10">
        <LogoHeader color="sidebar" />
      </div>

      <div className=" w-full">
        <DashboardLinks
          isActive={pathName === "/protected"}
          icon={<Stack className="size-6" />}
          linkName="Dashboard"
          href="/protected"
        />
        <DashboardLinks
          isActive={pathName === "/protected/chat-scripts"}
          icon={<ChatScripts className="size-6" />}
          linkName="Chat Scripts"
          href="/protected/chat-scripts"
        />
        <DashboardLinks
          isActive={pathName === "/protected/tags"}
          icon={<Tags className="size-6" />}
          linkName="Tags"
          href="/protected/tags"
        />
        <DashboardLinks
          isActive={pathName === "/protected/response"}
          icon={<Response className="size-6" />}
          linkName="Response"
          href="/protected/response"
        />
      </div>
    </>
  );
}
