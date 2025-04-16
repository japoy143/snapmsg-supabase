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
import { getAllChatScripts } from "@/utils/supabase/chatscripts";
import { getAllTags } from "@/utils/supabase/tags";
import ChatScriptsLatest from "../_components/dashboard/chat_scripts_latest";
import TagListLatest from "../_components/dashboard/tag_list_latest";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  async function userDetails(id: string) {
    const { data, error } = await supabase
      .from("user_details")
      .select("*")
      .eq("auth_user_id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  const [scripts, tags, data] = await Promise.all([
    getAllChatScripts(user.id),
    getAllTags(user.id),
    userDetails(user.id),
  ]);

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[var(--dashboard-background-color)] z-0  relative ">
      {/* Custom Modal */}
      <ShowModal id={data.id} isset={data.isCompanySet} />
      <SearchBar name=" Dashboard" isSearchVisible="hidden" />
      <div className=" flex-1 w-full h-full p-4 flex flex-col gap-4">
        <DashboardCardsWrapper>
          <DashboardCards>
            <DashboardHeadingIcon
              color="bg-[var(--pastel-red-color)]"
              icon={<ChatScripts className="size-6" />}
              headingName="Chat Scripts"
            />
            <h1 className=" text-center text-4xl font-medium ">
              {scripts?.length}
            </h1>
          </DashboardCards>

          <DashboardCards>
            <DashboardHeadingIcon
              color="bg-[var(--pastel-yellow-color)]"
              icon={<Tags className="size-6" />}
              headingName="Total Tags"
            />

            <h1 className=" text-center text-4xl font-medium ">
              {tags?.length}
            </h1>
          </DashboardCards>

          <DashboardCards>
            <DashboardHeadingIcon
              color="bg-[var(--pastel-green-color)] "
              icon={<Response className="size-6" />}
              headingName="Total Response"
            />
            <h1 className=" text-center text-4xl font-medium ">
              {40 - data.tokens}
            </h1>
          </DashboardCards>
        </DashboardCardsWrapper>

        <DashboardCard>
          <h1>Latest Chat Scripts</h1>
          <div className=" flex-1 w-full ">
            <div className=" w-full  grid grid-cols-4 p-2 text-left ">
              <div className=" col-span-2">
                <h2>Script Title</h2>
              </div>
              <div className=" col-span-2">
                <h2>Associated Chat Script</h2>
              </div>
            </div>
          </div>
          <ChatScriptsLatest id={user.id} />
          <h1 className="mt-2">Latest Tags</h1>
          <div className=" flex-1 w-full ">
            <div className=" w-full  grid grid-cols-2 p-2 text-left ">
              <div className=" col-span-2">
                <h2>Tagname</h2>
              </div>
            </div>
          </div>
          <TagListLatest id={user.id} />
        </DashboardCard>
      </div>
    </div>
  );
}
