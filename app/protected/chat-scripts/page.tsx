import { DashboardCard } from "@/app/_components/dashboard";
import ChatScriptsDashboard from "@/app/_components/chat_scripts/chat_scripts_dashboard";
import SearchBar from "@/app/_components/search-bar";
import React from "react";
import { getAllTags } from "@/utils/supabase/tags";
import { getAllChatScripts } from "@/utils/supabase/chatscripts";
import ActionsMenu from "../../assets/svgs/actionsmenu";

export default async function page() {
  const tags: any[] | null = await getAllTags();
  const scripts: any[] | null = await getAllChatScripts();

  function showAllAssociatedTags(ids: string) {
    try {
      const tagIds: number[] = JSON.parse(ids);

      return tagIds
        .map((id) => tags?.find((tag) => tag.id === id))
        .filter(Boolean) // removes undefined ensures only true or false
        .map((item) => <span key={item.id}>{item.tagname}</span>); // only tagname
    } catch (e) {
      return <span></span>;
    }
  }

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[var(--dashboard-background-color)]">
      <SearchBar name="Chat Scripts" />
      <div className=" flex-1 w-full h-full p-4 flex flex-col gap-4">
        <ChatScriptsDashboard allTags={tags} />

        <DashboardCard>
          <h1 className=" font-medium ">All Chat Scripts</h1>

          {/* heading */}
          <div className=" flex-1 w-full h-full overflow-y-scroll  ">
            <div className=" w-full  grid grid-cols-7 p-2 text-left ">
              <div className=" col-span-3 ">
                <h2>Chat Scripts</h2>
              </div>
              <div className=" col-span-2">
                <h2>Associated Tags</h2>
              </div>
              <div className="  col-span-2 flex justify-between">
                <h2>Respond To</h2>
                <h2>Actions</h2>
              </div>
            </div>

            {scripts &&
              scripts.map((script: ChatScriptsType) => (
                <div
                  key={script.id}
                  className="w-full  grid grid-cols-7  text-left border-2 border-black/60 rounded-md  mb-2"
                >
                  <div className=" col-span-3 h-[140px] p-2 border-r-2 border-black/60 ">
                    <p>{script.scripts}</p>
                  </div>
                  <div className=" col-span-2 flex flex-wrap space-x-2 p-2 border-r-2 border-black/60">
                    {showAllAssociatedTags(script.associated_tags_id)}
                  </div>
                  <div className="  col-span-2 flex justify-between p-2">
                    <h2>Respond To</h2>
                    <ActionsMenu className={"size-6"} />
                  </div>
                </div>
              ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
