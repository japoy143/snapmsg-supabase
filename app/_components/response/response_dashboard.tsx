"use client";
import React from "react";
import {
  DashboardCardsWrapper,
  DashboardCards,
  DashboardButton,
} from "../dashboard";
import { useQuery } from "@tanstack/react-query";
import { getUserId } from "@/utils/supabase/users";
import { toast } from "react-toastify";
import EventEmitter from "@/utils/EventEmitter";
import axios from "axios";

export default function ResponseDashboard() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getuserid"],
    queryFn: getUserId,
  });

  const apiUrl = "response/{client-id}/{prompt}";
  const sampleApiCall = `response/${data}/What is our Company?`;

  //actions
  function copyLink(text: string) {
    navigator.clipboard.writeText(text);
    toast.success("Successfully copy api url link", { type: "success" });
  }

  async function sendPrompt() {
    let data = "";
    try {
      const status: promptStatus = {
        status: "pending",
      };
      EventEmitter.emit("api-called", status);
      const response = await axios.get(
        `http://localhost:3000/${sampleApiCall}`
      );
      data = response.data;
      console.log(response.data);
    } catch (error) {
      const status: promptStatus = {
        status: "reject",
      };
      EventEmitter.emit("api-called", status);
    } finally {
      const status: promptStatus = {
        status: "resolve",
        response: data,
      };
      EventEmitter.emit("api-called", status);
    }
  }

  return (
    <>
      <DashboardCardsWrapper isCards="card">
        <div className=" p-4 bg-[var(--cards-background-color)] rounded-md shadow-md">
          <div className="w-full">
            <h1 className="font-medium text-lg">API URL</h1>
            <div className="flex w-full gap-1 items-center">
              <div className=" py-2 px-2 border-2 border-black/60 rounded-md flex  flex-1 w-full">
                <p>{apiUrl}</p>
              </div>
              <div className=" max-h-[60px]">
                <DashboardButton
                  buttonName="copy"
                  action={() => copyLink(apiUrl)}
                />
              </div>
            </div>
          </div>
          <div className=" w-full">
            <h1 className="font-medium text-lg">Sample Test</h1>
            <div className="flex w-full gap-1 items-center">
              <div className=" py-2 px-2 border-2 border-black/60 rounded-md  flex-1 w-full">
                <p>{sampleApiCall}</p>
              </div>
              <div className=" max-h-[60px]">
                <DashboardButton buttonName="send" action={sendPrompt} />
              </div>
            </div>
          </div>

          <div className="w-full  col-span-2">
            <h1 className="font-medium text-lg">Custom Test</h1>
            <div className="flex w-full gap-1 items-center">
              <div className=" py-2 px-2 border-2 border-black/60 rounded-md  flex flex-1 w-full">
                <p>response/{data}/</p>
                <input
                  className=" border-none outline-none"
                  type="text"
                  name="custom_prompt"
                  placeholder=" enter your prompt here..."
                />
              </div>
              <div className=" max-h-[80px]">
                <DashboardButton buttonName="send" action={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </DashboardCardsWrapper>
    </>
  );
}
