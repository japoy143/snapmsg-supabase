import DashboardCard from "@/app/_components/dashboard/dashboard_card";
import DashboardCards from "@/app/_components/dashboard/dashboard_cards";
import DashboardCardsWrapper from "@/app/_components/dashboard/dashboard_cards_wrapper";
import SearchBar from "@/app/_components/search-bar";
import React from "react";

export default function page() {
  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[var(--dashboard-background-color)]">
      <SearchBar name="Response" isSearchVisible="hidden" />
      <div className=" flex-1 w-full h-full p-4 flex flex-col gap-4">
        <DashboardCardsWrapper>
          <DashboardCards>card 1</DashboardCards>
          <DashboardCards>card 2</DashboardCards>
          <DashboardCards>card 3</DashboardCards>
        </DashboardCardsWrapper>

        <DashboardCard>
          <p>Protected</p>
        </DashboardCard>
      </div>
    </div>
  );
}
