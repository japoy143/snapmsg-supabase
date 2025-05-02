"use client";
import tags from "@/app/assets/svgs/tags";
import React from "react";
import ChatScriptsLatest from "./chat_scripts_latest";
import DashboardCard from "./dashboard_card";
import DashboardCards from "./dashboard_cards";
import DashboardCardsWrapper from "./dashboard_cards_wrapper";
import DashboardHeadingIcon from "./dashboard_heading_icon";
import TagListLatest from "./tag_list_latest";
import { getAllChatScripts } from "@/utils/supabase/chatscripts";
import { getAllTags } from "@/utils/supabase/tags";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails, getUserId } from "@/utils/supabase/users";
import { ChatScripts, Tags, Response } from "../../assets/svgs";
export default function StatsDashboard() {
  const {
    isPending: isUserIdPending,
    isError: isUserIdError,
    data: userId,
    error: userIdError,
  } = useQuery({
    queryKey: ["getuserid"],
    queryFn: getUserId,
  });

  const {
    isPending: isUserPending,
    isError: isUserError,
    data: userDetails,
    error: userDetailsError,
  } = useQuery({
    queryKey: ["userDetails"],
    queryFn: () => getUserDetails(userId ?? ""),
    enabled: !!userId,
  });

  const {
    isPending: isTagPending,
    isError: isTagError,
    data: tagsData,
    error: tagError,
  } = useQuery({
    queryKey: ["taglist"],
    queryFn: () => getAllTags(userId ?? ""),
    enabled: !!userId,
  });

  const {
    isPending: isScriptPending,
    isError: isScriptError,
    data: scriptsData,
    error: scriptError,
  } = useQuery({
    queryKey: ["scriptlist"],
    queryFn: () => getAllChatScripts(userId ?? ""),
    enabled: !!userId,
  });

  if (isScriptPending || isTagPending || isUserPending) {
    return <p>Loading ...</p>;
  }

  return (
    <div className=" flex-1 w-full h-full p-4 flex flex-col gap-4">
      <DashboardCardsWrapper>
        <DashboardCards>
          <DashboardHeadingIcon
            color="bg-[var(--pastel-red-color)]"
            icon={<ChatScripts className="size-6" />}
            headingName="Chat Scripts"
          />
          <h1 className=" text-center text-4xl font-medium ">
            {scriptsData?.length}
          </h1>
        </DashboardCards>

        <DashboardCards>
          <DashboardHeadingIcon
            color="bg-[var(--pastel-yellow-color)]"
            icon={<Tags className="size-6" />}
            headingName="Total Tags"
          />

          <h1 className=" text-center text-4xl font-medium ">
            {tagsData?.length}
          </h1>
        </DashboardCards>

        <DashboardCards>
          <DashboardHeadingIcon
            color="bg-[var(--pastel-green-color)] "
            icon={<Response className="size-6" />}
            headingName="Total Response"
          />
          <h1 className=" text-center text-4xl font-medium ">
            {userDetails.response_uses}
          </h1>
        </DashboardCards>
      </DashboardCardsWrapper>

      <DashboardCard>
        <h1>Latest Chat Scripts</h1>
        <div className=" flex-1 w-full ">
          <div className=" w-full  grid grid-cols-4 p-2 text-left ">
            <div className=" col-span-2">
              <h2>Script Title</h2>
            </div>
            <div className=" col-span-2">
              <h2>Associated Chat Script</h2>
            </div>
          </div>
        </div>
        <ChatScriptsLatest data={scriptsData} isPending={isScriptPending} />
        <h1 className="mt-2">Latest Tags</h1>
        <div className=" flex-1 w-full ">
          <div className=" w-full  grid grid-cols-2 p-2 text-left ">
            <div className=" col-span-2">
              <h2>Tagname</h2>
            </div>
          </div>
        </div>
        <TagListLatest data={tagsData} isPending={isTagPending} />
      </DashboardCard>
    </div>
  );
}
