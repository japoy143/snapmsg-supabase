import DashboardCard from "@/app/_components/dashboard/dashboard_card";
import DashboardCards from "@/app/_components/dashboard/dashboard_cards";
import DashboardCardsWrapper from "@/app/_components/dashboard/dashboard_cards_wrapper";
import SearchBar from "@/app/_components/search-bar";
import { ArrowDown } from "@/app/assets/svgs";
import React from "react";

export default function page() {
  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[var(--dashboard-background-color)]">
      <SearchBar name="Chat Scripts" />
      <div className=" flex-1 w-full h-full p-4 flex flex-col gap-4">
        <DashboardCardsWrapper isCards="card">
          <DashboardCards>
            <div className=" w-full h-full grid grid-cols-2 gap-2">
              <div className=" flex h-full w-full flex-col">
                <h1 className="font-medium ">Add Chat Scripts</h1>
                <div className=" w-full h-full flex-1 border-2 border-black/60 rounded-md">
                  <textarea className=" h-full w-full"></textarea>
                </div>
              </div>

              <div className=" w-full h-full flex flex-col  gap-1">
                <div className=" h-1/3 flex flex-col">
                  <h1 className="font-medium">Associate Tag</h1>
                  <div className=" flex-1 w-full h-full border-2  border-black/60 rounded-md flex px-6 items-center justify-between ">
                    <h2 className=" ">Frequently Ask Questions</h2>
                    <ArrowDown className=" size-6" />
                  </div>
                </div>
                <div className="h-1/2 border-2 border-black/60 rounded-md"></div>
                <div className=" flex justify-end space-x-4">
                  <button className="p-2 bg-[var(--secondary-color)] text-white rounded">
                    Cancel
                  </button>
                  <button className="p-2 bg-[var(--primary-color)] text-white rounded">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </DashboardCards>
        </DashboardCardsWrapper>

        <DashboardCard>
          <p>Protected</p>
        </DashboardCard>
      </div>
    </div>
  );
}
