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
          <p>Protected</p>
        </DashboardCard>
      </div>
    </div>
  );
}
