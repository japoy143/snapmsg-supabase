"use client";
import React, { useActionState, useState } from "react";
import {
  DashboardCardsWrapper,
  DashboardCards,
  DashboardHeadingIcon,
  DashboardButton,
} from "../dashboard";
import { Tags } from "@/app/assets/svgs";
import { addTags } from "@/utils/supabase/tags";
import FormErrors from "../formerrors";

export default function TagDashboard({
  allTags,
}: {
  allTags: TagType[] | null;
}) {
  const [state, action] = useActionState(addTags, null);
  const [tags, setTags] = useState<TagType[] | null>(allTags);

  return (
    <>
      <DashboardCardsWrapper>
        <DashboardCards>
          <DashboardHeadingIcon
            color="bg-[var(--pastel-yellow-color)]"
            icon={<Tags className="size-6" />}
            headingName="Commonly Used Tags"
          />

          <div className=" flex flex-wrap gap-1 mt-4">
            {tags &&
              tags.map((tag) => (
                <p
                  key={tag.id}
                  className="bg-[var(--pastel-yellow-color)] p-2 rounded-lg"
                >
                  {tag.tagname}
                </p>
              ))}
          </div>
        </DashboardCards>

        <DashboardCards className=" col-span-2">
          <h1 className="font-medium">Add Tags</h1>
          <form
            action={action}
            id="formId"
            className="w-full h-[40px] border-2  border-black/60 rounded"
          >
            <input
              type="text"
              className=" w-full h-full pl-2 "
              name="tagname"
              placeholder="tagname"
            />
            {state?.error.tagname && (
              <FormErrors error={state.error.tagname[0]} />
            )}
          </form>
          <h1 className="font-medium">Recently Added Tags</h1>
          <div className=" flex-1 w-full h-full border-2 border-black/60 rounded-lg "></div>
          <div className=" flex items-center justify-end space-x-4 mt-2">
            <DashboardButton
              color="black"
              buttonName="Cancel"
              action={() => {}}
            />
            <DashboardButton
              buttonName="Save"
              type="submit"
              formId="formId"
              action={() => {}}
            />
          </div>
        </DashboardCards>
      </DashboardCardsWrapper>
    </>
  );
}
