"use client";
import React, { useEffect, useState } from "react";
import DashboardButton from "../dashboard/dashboard_button";
import DashboardCards from "../dashboard/dashboard_cards";
import DashboardCardsWrapper from "../dashboard/dashboard_cards_wrapper";
import { addScript, updateChatScripts } from "@/utils/supabase/chatscripts";
import FormErrors from "../formerrors";
import { getAllTags } from "@/utils/supabase/tags";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import EventEmitter from "@/utils/EventEmitter";
import { getUserId } from "@/utils/supabase/users";

type errorField = {
  script_title?: string[] | undefined;
  scripts?: string[] | undefined;
  associated_tags?: string[] | undefined;
};

export default function ChatScriptsDashboard() {
  const queryClient = useQueryClient();

  //states
  const [statusState, setStatusState] = useState<{
    success?: boolean;
    errorField?: errorField;
  }>({ success: false, errorField: undefined });

  const [script, setScript] = useState<string>("");
  const [script_title, setScriptTitle] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<TagType | undefined>();
  const [associatedTags, setAssociatedTags] = useState<TagType[]>([]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<number>(0);

  const {
    isPending: isUserIdPending,
    isError: isUserIdError,
    data: userId,
    error: userIdError,
  } = useQuery({
    queryKey: ["getuserid"],
    queryFn: getUserId,
  });

  const {
    isPending: isTagPending,
    isError: isTagError,
    data: tagsData,
    error: tagError,
  } = useQuery({
    queryKey: ["taglist"],
    queryFn: () => getAllTags(userId ?? ""),
    enabled: !!userId,
  });

  const mutation = useMutation({
    mutationFn: ({
      state,
      formData,
    }: {
      state: {
        success?: boolean;
        errorField?: errorField;
      };
      formData: FormData;
    }) => addScript(state, formData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["taglist"] });
      queryClient.invalidateQueries({ queryKey: ["scriptlist"] });

      toast("Successfully added new scripts", {
        type: "success",
      });
      //clear states
      clear();
      // Use returned result from addScript to update state
      setStatusState({
        success: data.success,
        errorField: data.errorField,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      script_title,
      script,
      associated_tags_id,
    }: {
      id: number;
      script_title: string;
      script: string;
      associated_tags_id: string;
    }) => updateChatScripts(id, script_title, script, associated_tags_id),

    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["taglist"] });
      queryClient.invalidateQueries({ queryKey: ["scriptlist"] });

      if (data) {
        toast("Successfully updated script", { type: "success" });
        clear();
        EventEmitter.emit("clear");
      } else {
        toast("Failed to update script", { type: "error" });
      }
    },
  });

  //Toast
  useEffect(() => {
    //set update state
    const sample = (data: any) => {
      setIsUpdate(true);
      setScriptTitle(data.script_title);
      setScript(data.scriptname);
      setAssociatedTags(data.associated_tag);
      setUpdateId(data.id);
    };

    const listener = EventEmitter.addListener("update", sample);

    if (!statusState.success) return;

    return () => {
      EventEmitter.off("update", sample);
    };
  }, [statusState?.success]);

  if (isTagPending) {
    return (
      <DashboardCardsWrapper isCards="card">
        <DashboardCards>
          <form className="w-full h-full grid grid-cols-2 gap-2 animate-pulse">
            <div className=" flex h-full w-full flex-col">
              <h1 className=" font-medium">
                <span className=" bg-gray-50 text-transparent">
                  Script Title
                </span>
              </h1>
              <h1 className=" font-medium">
                <span className=" bg-gray-50 text-transparent">
                  Lorem ipsum Lorem ipsum Lorem ipsum
                </span>
              </h1>
              <h1 className=" font-medium">
                <span className=" bg-gray-50 text-transparent">
                  Add Scripts
                </span>
              </h1>
              <div className="w-full h-1/4 lg:h-1/2  bg-gray-50  rounded-md"></div>
            </div>

            <div className="w-full h-full flex flex-col gap-2">
              <div className="h-1/3 flex flex-col">
                <h1 className=" font-medium">
                  <span className=" bg-gray-50 text-transparent">
                    Associate Tag
                  </span>
                </h1>
                <h1 className=" font-medium bg-gray-50 text-transparent">
                  select tag
                </h1>
              </div>
              {/* hidden associated inputs */}
              <h1 className=" font-medium">
                <span className=" bg-gray-50 text-transparent">
                  Associate Tag
                </span>
              </h1>
              {/* Associated tags */}
              <div className="h-[60px] flex  flex-wrap  bg-gray-50  rounded-md p-2   gap-4"></div>

              <div className="flex justify-end space-x-4">
                <h1 className=" font-medium">
                  <span className=" bg-gray-50 text-transparent">
                    Associate Tag
                  </span>
                </h1>

                <h1 className=" font-medium">
                  <span className=" bg-gray-50 text-transparent">
                    Associate Tag
                  </span>
                </h1>
              </div>
            </div>
          </form>
        </DashboardCards>
      </DashboardCardsWrapper>
    );
  }

  if (isTagError) {
    return <div>{tagError.message}</div>;
  }

  /*
Functions
  */
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      mutation.mutate({ state: statusState, formData });
    } catch (e) {
      setStatusState({ success: false });
    }
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
    setScriptTitle("");
    setSelectedTag(undefined);
    setAssociatedTags([]);
    setUpdateId(0);
    setIsUpdate(false);
  }

  async function update(
    id: number,
    script_title: string,
    script: string,
    associated_tags_id: string
  ) {
    await updateMutation.mutateAsync({
      id,
      script_title,
      script,
      associated_tags_id,
    });
  }

  return (
    <DashboardCardsWrapper isCards="card">
      <DashboardCards>
        <form
          onSubmit={handleSubmit}
          className="w-full h-full grid grid-cols-2 gap-2"
        >
          <div className="flex h-full w-full flex-col">
            <h1 className=" font-medium">Script Title</h1>
            <input
              className=" border-2 border-black/60 px-2 rounded"
              type="text"
              name="script_title"
              placeholder=" enter script title"
              value={script_title}
              onChange={(e) => setScriptTitle(e.target.value)}
            />
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
              error={
                statusState?.errorField?.scripts &&
                statusState.errorField.scripts[0]
              }
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
                  statusState?.errorField?.associated_tags &&
                  statusState.errorField.associated_tags[0]
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
                      script_title,
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
