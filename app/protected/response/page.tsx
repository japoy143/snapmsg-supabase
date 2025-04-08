import { DashboardCard } from "@/app/_components/dashboard";
import ResponseDashboard from "@/app/_components/response/response_dashboard";
import SearchBar from "@/app/_components/search-bar";
import React from "react";

export default async function page() {
  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[var(--dashboard-background-color)]">
      <SearchBar name="Response" isSearchVisible="hidden" />
      <div className=" flex-1 w-full h-full p-4 flex flex-col gap-4">
        <ResponseDashboard />

        <DashboardCard>
          <h1 className=" font-medium">Sample Response</h1>
          <div className=" border-2 border-black/60 rounded flex-1 w-full h-[400px]"></div>
        </DashboardCard>
      </div>
    </div>
  );
}
