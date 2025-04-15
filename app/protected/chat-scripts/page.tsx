import { DashboardCard } from "@/app/_components/dashboard";
import ChatScriptsDashboard from "@/app/_components/chat_scripts/chat_scripts_dashboard";
import SearchBar from "@/app/_components/search-bar";
import React from "react";
import ChatScriptsList from "../../_components/chat_scripts/chat_scripts_list";
import {
  dehydrate,
  hydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllTags } from "@/utils/supabase/tags";
import { getAllChatScripts } from "@/utils/supabase/chatscripts";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["taglist"],
      queryFn: () => getAllTags(user.id),
    }),

    queryClient.prefetchQuery({
      queryKey: ["scriptlist"],
      queryFn: () => getAllChatScripts(user.id),
    }),
  ]);

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[var(--dashboard-background-color)]">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchBar name="Chat Scripts" />
        <div className=" flex-1 w-full h-full p-4 flex flex-col gap-4">
          <ChatScriptsDashboard id={user.id} />

          <DashboardCard>
            <h1 className=" font-medium ">All Chat Scripts</h1>

            {/* heading */}
            <div className=" flex-1 w-full h-[200px]  ">
              <div className=" w-full  grid grid-cols-7 p-2 text-left ">
                <div className=" col-span-2 ">
                  <h2>Script Title</h2>
                </div>
                <div className=" col-span-3">
                  <h2>Chat Scripts</h2>
                </div>
                <div className="  col-span-2 flex justify-between">
                  <h2>Associated Tags</h2>
                  <h2>Actions</h2>
                </div>
              </div>

              <ChatScriptsList id={user.id} />
            </div>
          </DashboardCard>
        </div>
      </HydrationBoundary>
    </div>
  );
}
