import { DashboardCard } from "@/app/_components/dashboard";
import MessageList from "@/app/_components/messagelist";
import { getAllMessages } from "@/utils/supabase/message";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

export default async function page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["messagelist"],
    queryFn: getAllMessages,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex-1 w-full h-full flex flex-col bg-[var(--dashboard-background-color)] z-0   ">
        <div className=" flex-1 w-full h-full p-4 flex flex-col gap-4 z-0">
          <DashboardCard>
            <h1 className=" font-medium">All Message</h1>

            <MessageList />
          </DashboardCard>
        </div>
      </div>
    </HydrationBoundary>
  );
}
