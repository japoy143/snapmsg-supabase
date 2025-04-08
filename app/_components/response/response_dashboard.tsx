"use client";
import React from "react";
import {
  DashboardCardsWrapper,
  DashboardCards,
  DashboardButton,
} from "../dashboard";
import { useQuery } from "@tanstack/react-query";
import { getUserId } from "@/utils/supabase/users";

export default function ResponseDashboard() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getuserid"],
    queryFn: getUserId,
  });

  return (
    <>
      <DashboardCardsWrapper isCards="card">
        <DashboardCards>
          <div className=" flex w-full h-full gap-2">
            <div className="w-1/2">
              <h1 className="font-medium text-lg">API URL</h1>
              <div className="flex w-full gap-1 items-center">
                <div className=" py-2 px-2 border-2 border-black/60 rounded-md  flex-1 w-full">
                  <p>chat-response/{data}/client</p>
                </div>
                <div className=" max-h-[60px]">
                  <DashboardButton buttonName="Copy Link" action={() => {}} />
                </div>
              </div>
              <h1 className="font-medium text-lg">Sample Test</h1>
              <div className="flex w-full gap-1 items-center">
                <div className=" py-2 px-2 border-2 border-black/60 rounded-md  flex-1 w-full">
                  <p>chat-response/{data}/client</p>
                </div>
                <div className=" max-h-[60px]">
                  <DashboardButton buttonName="Copy Link" action={() => {}} />
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <h1 className="font-medium text-lg">Custom Test</h1>
              <div className="flex w-full gap-1 items-center">
                <div className=" py-2 px-2 border-2 border-black/60 rounded-md  flex-1 w-full">
                  <p>chat-response/{data}/client</p>
                </div>
                <div className=" max-h-[80px]">
                  <DashboardButton buttonName="Copy Link" action={() => {}} />
                </div>
              </div>
            </div>
          </div>
        </DashboardCards>
      </DashboardCardsWrapper>
    </>
  );
}
