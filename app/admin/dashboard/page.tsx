"use server";
import {
  DashboardCardsWrapper,
  DashboardCards,
  DashboardHeadingIcon,
  DashboardCard,
} from "@/app/_components/dashboard";
import { ChatScripts, Response } from "@/app/assets/svgs";
import { getAllSubscribers } from "@/utils/supabase/admin/subscriber";

import { Tags } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  async function getCookies() {
    const cookie = await cookies();
    const admin_cookie_token = process.env["ADMIN_COOKIE_TOKEN"] ?? "";

    const user_token = cookie.get(admin_cookie_token);

    return user_token?.value;
  }

  const admin_token = await getCookies();

  const allSubscribers = await getAllSubscribers();

  const freetierSubscribers = filterSubscribers("Free Tier") ?? [];
  const businessSubscribers = filterSubscribers("Business") ?? [];
  const personalSubscribers = filterSubscribers("Personal") ?? [];

  const subscribers = [...businessSubscribers, ...personalSubscribers];

  if (admin_token === "") {
    return redirect("/admin/sign-in");
  }

  function filterSubscribers(subscription: string): UserDetails[] | null {
    const data = allSubscribers?.filter(
      (user) => user.subscription === subscription
    );

    return data ?? [];
  }

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[var(--dashboard-background-color)] z-0  relative ">
      <div className=" flex-1 w-full h-full p-4 flex flex-col gap-4">
        <DashboardCardsWrapper>
          <DashboardCards>
            <DashboardHeadingIcon
              color="bg-[var(--pastel-red-color)]"
              icon={<ChatScripts className="size-6" />}
              headingName="Free Tier"
            />
            <h1 className=" text-center text-4xl font-medium ">
              {freetierSubscribers.length}
            </h1>
          </DashboardCards>

          <DashboardCards>
            <DashboardHeadingIcon
              color="bg-[var(--pastel-yellow-color)]"
              icon={<Tags className="size-6" />}
              headingName="Personal"
            />

            <h1 className=" text-center text-4xl font-medium ">
              {personalSubscribers.length}
            </h1>
          </DashboardCards>

          <DashboardCards>
            <DashboardHeadingIcon
              color="bg-[var(--pastel-green-color)] "
              icon={<Response className="size-6" />}
              headingName="Business"
            />
            <h1 className=" text-center text-4xl font-medium ">
              {businessSubscribers.length}
            </h1>
          </DashboardCards>
        </DashboardCardsWrapper>

        <DashboardCard>
          <h1 className=" font-medium">Latest Subscriber</h1>
          <div className=" flex-1 w-full h-full ">
            {subscribers?.map((user) => (
              <div
                key={user.id}
                className=" w-full p-2 border-2 border-black/60 rounded flex  justify-between mt-1"
              >
                <p>{user.email}</p>
                <p>{user.subscription}</p>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
