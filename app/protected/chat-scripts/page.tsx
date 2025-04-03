import { DashboardCard } from "@/app/_components/dashboard";
import ChatScriptsDashboard from "@/app/_components/chat_scripts/chat_scripts_dashboard";
import SearchBar from "@/app/_components/search-bar";
import React from "react";
import { getAllTags } from "@/utils/supabase/tags";

export default async function page() {
  const tags: any[] | null = await getAllTags();

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[var(--dashboard-background-color)]">
      <SearchBar name="Chat Scripts" />
      <div className=" flex-1 w-full h-full p-4 flex flex-col gap-4">
        <ChatScriptsDashboard allTags={tags} />

        <DashboardCard>
          <p>Protected</p>
        </DashboardCard>
      </div>
    </div>
  );
}
