import { DashboardCard } from "@/app/_components/dashboard";
import MessageResponse from "@/app/_components/response/message_response";
import ResponseDashboard from "@/app/_components/response/response_dashboard";
import SearchBar from "@/app/_components/search-bar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[var(--dashboard-background-color)]">
      <SearchBar name="Response" isSearchVisible="hidden" />
      <div className=" flex-1 w-full h-full p-4 flex flex-col gap-4">
        <ResponseDashboard />

        <DashboardCard>
          <h1 className=" font-medium">Sample Response</h1>
          <MessageResponse />
        </DashboardCard>
      </div>
    </div>
  );
}
