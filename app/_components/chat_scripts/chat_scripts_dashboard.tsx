"use client";
import React, { useActionState, useState } from "react";
import DashboardButton from "../dashboard/dashboard_button";
import DashboardCards from "../dashboard/dashboard_cards";
import DashboardCardsWrapper from "../dashboard/dashboard_cards_wrapper";
import { addScript } from "@/utils/supabase/chatscripts";
import FormErrors from "../formerrors";

export default function ChatScriptsDashboard({
  allTags,
}: {
  allTags: TagType[] | null;
}) {
  const [script, setScript] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<TagType>();
  const [tags, setTags] = useState<TagType[] | null>(allTags);
  const [associatedTags, setAssociatedTags] = useState<TagType[]>([]);

  //actions
  const [state, action] = useActionState(addScript, null);

  function associateTag(tag: string) {
    //from json
    const parsedTag: TagType = JSON.parse(tag);
    setSelectedTag(parsedTag);
    //if doesnt exist then push
    if (
      parsedTag &&
      !associatedTags.some((tag) => tag.tagname === parsedTag.tagname)
    ) {
      setAssociatedTags((prev) => [...prev, parsedTag]);
    }
  }

  function removeAssociatedTag(id: number) {
    setAssociatedTags((prev) => prev.filter((_, index) => index !== id));
  }

  function clear() {
    setAssociatedTags([]);
    setScript("");
  }

  return (
    <DashboardCardsWrapper isCards="card">
      <DashboardCards>
        <form action={action} className="w-full h-full grid grid-cols-2 gap-2">
          <div className="flex h-full w-full flex-col">
            <h1 className="font-medium">Add Chat Scripts</h1>
            <div className="w-full h-full flex-1 border-2 border-black/60 rounded-md">
              <textarea
                name="scripts"
                value={script}
                onChange={(e) => setScript(e.target.value)}
                className="h-full w-full p-2"
              ></textarea>
            </div>
            <FormErrors
              error={state?.error.scripts && state.error.scripts[0]}
            />
          </div>

          <div className="w-full h-full flex flex-col gap-2">
            <div className="h-1/3 flex flex-col">
              <h1 className="font-medium">Associate Tag</h1>
              <select
                name="associated"
                className="border-2 border-black/60 rounded px-2"
                value={selectedTag ? JSON.stringify(selectedTag) : ""}
                onChange={(e) => associateTag(e.target.value)}
              >
                <option value="" disabled>
                  select tags
                </option>
                {tags &&
                  tags.map((item) => (
                    <option key={item.id} value={JSON.stringify(item)}>
                      {item.tagname}
                    </option>
                  ))}
              </select>
              <FormErrors
                error={
                  state?.error.associated_tags && state.error.associated_tags[0]
                }
              />
            </div>
            {/* hidden associated inputs */}
            <input
              type="hidden"
              value={JSON.stringify(associatedTags.map((item) => item.id))}
              name="associated_tags"
            />
            {/* Associated tags */}
            <div className="h-[60px] flex  flex-wrap border-2 border-black/60 rounded-md p-2  overflow-y-scroll gap-4">
              {associatedTags.map((tag, index) => (
                <div
                  onClick={() => removeAssociatedTag(index)}
                  key={index}
                  className=" cursor-pointer p-1 flex space-x-1 justify-between"
                >
                  <p>{tag.tagname}</p>
                  <span className=" text-red-500">x</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4">
              <DashboardButton
                color="black"
                buttonName="Cancel"
                action={clear}
              />
              <DashboardButton
                buttonName="Save"
                type="submit"
                action={() => {}}
              />
            </div>
          </div>
        </form>
      </DashboardCards>
    </DashboardCardsWrapper>
  );
}
