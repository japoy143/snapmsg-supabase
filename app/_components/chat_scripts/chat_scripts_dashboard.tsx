"use client";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import DashboardButton from "../dashboard/dashboard_button";
import DashboardCards from "../dashboard/dashboard_cards";
import DashboardCardsWrapper from "../dashboard/dashboard_cards_wrapper";
import { addScript, updateChatScripts } from "@/utils/supabase/chatscripts";
import FormErrors from "../formerrors";
import { getAllTags } from "@/utils/supabase/tags";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import EventEmitter from "@/utils/EventEmitter";

export default function ChatScriptsDashboard({ id }: { id: string }) {
  //actions
  const [state, action] = useActionState(addScript, null);
  //states
  const [script, setScript] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<TagType | undefined>();
  const [associatedTags, setAssociatedTags] = useState<TagType[]>([]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<number>(0);

  const {
    isPending: isTagPending,
    isError: isTagError,
    data: tagsData,
    error: tagError,
  } = useQuery({
    queryKey: ["taglist"],
    queryFn: () => getAllTags(id),
  });

  if (isTagPending) {
    <div>...Loading</div>;
  }

  if (isTagError) {
    <div>{tagError.message}</div>;
  }

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
    setScript("");
    setSelectedTag(undefined);
    setAssociatedTags([]);
    setUpdateId(0);
    setIsUpdate(false);
  }

  async function update(
    id: number,
    script: string,
    associated_tags_id: string
  ) {
    const { success } = await updateChatScripts(id, script, associated_tags_id);

    if (success) {
      toast("Successfully updated script", { type: "success" });
      clear();
      EventEmitter.emit("clear");
    } else {
      toast("Failed update script", { type: "error" });
    }
  }

  //Toast
  useEffect(() => {
    //set update state
    const sample = (data: any) => {
      setIsUpdate(true);
      setScript(data.scriptname);
      setAssociatedTags(data.associated_tag);
      setUpdateId(data.id);
    };

    const listener = EventEmitter.addListener("update", sample);

    if (!state?.success) return;

    startTransition(() => {
      toast("Successfully added new scripts", {
        type: "success",
      });
      //clear states
      clear();
      action("RESET");
    });

    return () => {
      EventEmitter.off("update", sample);
    };
  }, [state?.success]);

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
              error={state?.errorField?.scripts && state.errorField.scripts[0]}
            />
          </div>

          <div className="w-full h-full flex flex-col gap-2">
            <div className="h-1/3 flex flex-col">
              <h1 className="font-medium">Associate Tag </h1>
              <select
                name="associated"
                className="border-2 border-black/60 rounded px-2"
                value={selectedTag ? JSON.stringify(selectedTag) : ""}
                onChange={(e) => associateTag(e.target.value)}
              >
                <option value="" disabled>
                  select tags
                </option>
                {tagsData &&
                  tagsData.map((item) => (
                    <option key={item.id} value={JSON.stringify(item)}>
                      {item.tagname}
                    </option>
                  ))}
              </select>
              <FormErrors
                error={
                  state?.errorField?.associated_tags &&
                  state.errorField.associated_tags[0]
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

              {isUpdate ? (
                <DashboardButton
                  buttonName="Update"
                  type="custom"
                  action={() =>
                    update(
                      updateId,
                      script,
                      JSON.stringify(associatedTags.map((item) => item.id))
                    )
                  }
                />
              ) : (
                <DashboardButton
                  buttonName="Save"
                  type="submit"
                  action={() => {}}
                />
              )}
            </div>
          </div>
        </form>
      </DashboardCards>
    </DashboardCardsWrapper>
  );
}
