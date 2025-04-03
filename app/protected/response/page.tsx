"use client";
import {
  DashboardButton,
  DashboardCardsWrapper,
  DashboardCards,
  DashboardCard,
} from "@/app/_components/dashboard";
import SearchBar from "@/app/_components/search-bar";
import React from "react";

export default function page() {
  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[var(--dashboard-background-color)]">
      <SearchBar name="Response" isSearchVisible="hidden" />
      <div className=" flex-1 w-full h-full p-4 flex flex-col gap-4">
        <DashboardCardsWrapper isCards="card">
          <DashboardCards>
            <div className=" flex w-full h-full gap-2">
              <div className="w-1/2">
                <h1 className="font-medium text-lg">API URL</h1>
                <div className="flex w-full gap-1">
                  <div className=" h-[40px] border-2 border-black/60 rounded-md  flex-1 w-full"></div>
                  <DashboardButton buttonName="Copy Link" action={() => {}} />
                </div>
                <h1 className="font-medium text-lg">Sample Test</h1>
                <div className="flex w-full  gap-1">
                  <div className=" h-[40px] border-2 border-black/60 rounded-md  flex-1 w-full"></div>
                  <DashboardButton buttonName="Copy Link" action={() => {}} />
                </div>
              </div>
              <div className="w-1/2">
                <h1 className="font-medium text-lg">Custom Test</h1>
                <div className="flex w-full  gap-1">
                  <div className=" h-[40px] border-2 border-black/60 rounded-md  flex-1 w-full"></div>
                  <DashboardButton buttonName="Copy Link" action={() => {}} />
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
