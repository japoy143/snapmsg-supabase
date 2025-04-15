import { DashboardCard } from "@/app/_components/dashboard";
import SearchBar from "@/app/_components/search-bar";
import React from "react";
import TagDashboard from "../../_components/tags/tags_dashboard";
import TagList from "@/app/_components/tags/tag_list";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllTags, getLatestTags } from "@/utils/supabase/tags";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getAllChatScripts } from "@/utils/supabase/chatscripts";

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
      queryKey: ["taglatest"],
      queryFn: () => getLatestTags(5, user.id),
    }),

    queryClient.prefetchQuery({
      queryKey: ["scriptlist"],
      queryFn: () => getAllChatScripts(user.id),
    }),
  ]);

  return (
    <div className="flex-1 w-full h-screen flex flex-col bg-[var(--dashboard-background-color)] ">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchBar name="Tags" />
        <div className=" flex-1 w-full h-full p-4 flex flex-col gap-4">
          <TagDashboard id={user.id} />

          <DashboardCard>
            <h1 className=" font-medium ">All Tags</h1>
            <div className=" flex-1 w-full h-[200px] ">
              <div className=" w-full  grid grid-cols-7 p-2 text-left ">
                <div className=" col-span-3 ">
                  <h2>Tag Name</h2>
                </div>
                <div className=" col-span-3">
                  <h2>Associated Chat Script</h2>
                </div>
                <div className="  col-span-1 flex justify-end">
                  <h2>Actions</h2>
                </div>
              </div>

              <TagList id={user.id} />
            </div>
          </DashboardCard>
        </div>
      </HydrationBoundary>
    </div>
  );
}
