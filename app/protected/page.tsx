import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SearchBar from "../_components/search-bar";
import {
  DashboardCard,
  DashboardCardsWrapper,
  DashboardHeadingIcon,
  DashboardCards,
} from "../_components/dashboard";
import { ChatScripts, Tags, Response } from "../assets/svgs";
import ShowModal from "../_components/showmodal";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: { isCompanySet },
  } = await supabase
    .from("user_details")
    .select("*")
    .eq("auth_user_id", user?.id)
    .single();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[var(--dashboard-background-color)] z-0  relative ">
      {/* Custom Modal */}
      <ShowModal isset={isCompanySet} />
      <SearchBar name=" Dashboard" />
      <div className=" flex-1 w-full h-full p-4 flex flex-col gap-4">
        <DashboardCardsWrapper>
          <DashboardCards>
            <DashboardHeadingIcon
              color="bg-[var(--pastel-red-color)]"
              icon={<ChatScripts className="size-6" />}
              headingName="Chat Scripts"
            />
            <h1 className=" text-center text-4xl font-medium ">10</h1>

            <div className=" flex-1 flex items-end justify-end h-full w-full">
              <p className=" text-gray-400 text-xs">Last updated 7hrs ago</p>
            </div>
          </DashboardCards>

          <DashboardCards>
            <DashboardHeadingIcon
              color="bg-[var(--pastel-yellow-color)]"
              icon={<Tags className="size-6" />}
              headingName="Total Tags"
            />

            <h1 className=" text-center text-4xl font-medium ">20</h1>

            <div className=" flex-1 flex items-end justify-end h-full w-full">
              <p className=" text-gray-400 text-xs">Last updated 7hrs ago</p>
            </div>
          </DashboardCards>

          <DashboardCards>
            <DashboardHeadingIcon
              color="bg-[var(--pastel-green-color)] "
              icon={<Response className="size-6" />}
              headingName="Total Response"
            />
            <h1 className=" text-center text-4xl font-medium ">40</h1>

            <div className=" flex-1 flex items-end justify-end h-full w-full">
              <p className=" text-gray-400 text-xs">Last updated 7hrs ago</p>
            </div>
          </DashboardCards>
        </DashboardCardsWrapper>

        <DashboardCard>
          <p>Protected</p>
        </DashboardCard>
      </div>
    </div>
  );
}
