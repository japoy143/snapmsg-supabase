import { DashboardCard } from "@/app/_components/dashboard";
import { ArrowDown } from "@/app/assets/svgs";
import { getAllSubscribers } from "@/utils/supabase/admin/subscriber";
import React from "react";

import AllSubscriptionList from "../../../_components/allsubscriptionlist";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function page() {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ["subscriptionlist"],
    queryFn: getAllSubscribers,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex-1 w-full h-full flex flex-col bg-[var(--dashboard-background-color)] z-0   ">
        <div className=" flex-1 w-full h-full p-4 flex flex-col gap-4 z-0">
          <DashboardCard>
            <h1 className=" font-medium">All Subscribers</h1>

            <AllSubscriptionList />
          </DashboardCard>
        </div>
      </div>
    </HydrationBoundary>
  );
}
