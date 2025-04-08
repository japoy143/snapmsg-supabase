"use client";
import React, { useActionState, useEffect } from "react";
import {
  DashboardCardsWrapper,
  DashboardCards,
  DashboardHeadingIcon,
  DashboardButton,
} from "../dashboard";
import { Tags } from "@/app/assets/svgs";
import { addTags, getLatestTags } from "@/utils/supabase/tags";
import FormErrors from "../formerrors";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function TagDashboard() {
  const [state, action] = useActionState(addTags, null);

  //Toast handler
  useEffect(() => {
    if (state?.success) {
      toast("Successfully added", { type: "success" });
    }
  }, [state?.success]);

  const {
    isPending: isTagsPending,
    isError: isTagsError,
    data: tagLatest,
    error: tagError,
  } = useQuery({
    queryKey: ["taglatest"],
    queryFn: () => getLatestTags(5),
  });

  if (isTagsPending) {
    return <div>...Loading</div>;
  }

  if (isTagsError) {
    <div>{tagError.message}</div>;
  }

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
            {tagLatest &&
              tagLatest.map((tag) => (
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
            <div className=" w-full text-right">
              {state?.errorField?.tagname && (
                <FormErrors error={state.errorField.tagname[0]} />
              )}
            </div>
          </form>
          <h1 className="font-medium">Recently Added Tags</h1>
          <div className=" flex-1 w-full h-full border-2 border-black/60 rounded-lg p-2 ">
            {tagLatest && tagLatest[0]?.tagname}
          </div>
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
