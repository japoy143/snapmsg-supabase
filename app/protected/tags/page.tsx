import { DashboardCard } from "@/app/_components/dashboard";
import SearchBar from "@/app/_components/search-bar";
import React from "react";
import TagDashboard from "../../_components/tags/tags_dashboard";
import { getAllTags } from "@/utils/supabase/tags";

export default async function page() {
  const allTags: any[] | null = await getAllTags();

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[var(--dashboard-background-color)]">
      <SearchBar name="Tags" />
      <div className=" flex-1 w-full h-full p-4 flex flex-col gap-4">
        <TagDashboard allTags={allTags} />

        <DashboardCard>
          <h1 className=" font-medium ">All Tags</h1>
          {allTags &&
            allTags.map((item: TagType) => <p key={item.id}>{item.tagname}</p>)}
        </DashboardCard>
      </div>
    </div>
  );
}
