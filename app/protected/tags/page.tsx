import DashboardCard from "@/app/_components/dashboard/dashboard_card";
import DashboardCards from "@/app/_components/dashboard/dashboard_cards";
import DashboardCardsWrapper from "@/app/_components/dashboard/dashboard_cards_wrapper";
import DashboardHeadingIcon from "@/app/_components/dashboard/dashboard_heading_icon";
import SearchBar from "@/app/_components/search-bar";
import { Tags } from "lucide-react";
import React from "react";

export default function page() {
  const sampleTags = ["fix", "problem", "faqs"];

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[var(--dashboard-background-color)]">
      <SearchBar name="Tags" />
      <div className=" flex-1 w-full h-full p-4 flex flex-col gap-4">
        <DashboardCardsWrapper>
          <DashboardCards>
            <DashboardHeadingIcon
              color="bg-[var(--pastel-yellow-color)]"
              icon={<Tags className="size-6" />}
              headingName="Commonly Used Tags"
            />

            <div className=" flex flex-wrap gap-1 mt-4">
              {sampleTags.map((tag) => (
                <p
                  key={tag}
                  className="bg-[var(--pastel-yellow-color)] p-2 rounded-lg"
                >
                  {tag}
                </p>
              ))}
            </div>
          </DashboardCards>

          <DashboardCards className=" col-span-2">
            <h1 className="font-medium">Add Tags</h1>
            <div className="w-full h-[40px] border-2  border-black/60 rounded">
              <input
                type="text"
                className=" w-full h-full pl-2 "
                placeholder="tagname"
              />
            </div>
            <h1 className="font-medium">Recently Added Tags</h1>
            <div className=" flex-1 w-full h-full border-2 border-black/60 rounded-lg "></div>
            <div className=" flex items-center justify-end space-x-4 mt-2">
              <button className=" p-2 text-white bg-[var(--secondary-color)] rounded">
                Cancel
              </button>
              <button className="p-2 text-white bg-[var(--primary-color)] rounded ">
                Add
              </button>
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
