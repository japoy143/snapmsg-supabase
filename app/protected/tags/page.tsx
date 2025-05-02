export const dynamic = "force-dynamic";
import { DashboardCard } from "@/app/_components/dashboard";
import SearchBar from "@/app/_components/search-bar";
import React from "react";
import TagDashboard from "../../_components/tags/tags_dashboard";
import TagList from "@/app/_components/tags/tag_list";
import { getAuthUser } from "@/utils/supabase/users";

export default async function page() {
  return (
    <div className="flex-1 w-full h-screen flex flex-col bg-[var(--dashboard-background-color)] ">
      <SearchBar name="Tags" />
      <div className=" flex-1 w-full h-full p-4 flex flex-col gap-4">
        <TagDashboard />

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

            <TagList />
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
