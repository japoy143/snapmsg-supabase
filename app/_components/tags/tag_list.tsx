"use client";
import ActionsMenu from "@/app/assets/svgs/actionsmenu";
import EventEmitter from "@/utils/EventEmitter";
import { getAllChatScripts } from "@/utils/supabase/chatscripts";
import { deleteTag, getAllTags } from "@/utils/supabase/tags";
import { getUserId } from "@/utils/supabase/users";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function TagList() {
  const {
    isPending: isUserIdPending,
    isError: isUserIdError,
    data: userId,
    error: userIdError,
  } = useQuery({
    queryKey: ["getuserid"],
    queryFn: getUserId,
  });
  //all tags query
  const {
    isPending: isTagsPending,
    isError: isTagsError,
    data: tagsData,
    error: errorTag,
  } = useQuery({
    queryKey: ["taglist"],
    queryFn: () => getAllTags(userId ?? ""),
    enabled: !!userId,
  });

  //all scripts query
  const {
    isPending: isScriptPending,
    isError: isScriptError,
    data: scriptData,
    error: errorScript,
  } = useQuery({
    queryKey: ["scriptlist"],
    queryFn: () => getAllChatScripts(userId ?? ""),
    enabled: !!userId,
  });

  const [scriptId, setScriptId] = useState<number | null>();
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() ?? "";

  //pending and error handlers
  if (isTagsPending && isScriptPending) {
    return <span>Loading...</span>;
  }

  if (isTagsError && isScriptError) {
    return (
      <span>
        ErrorTag: {errorTag.message}, ErrorScript:{errorScript.message}
      </span>
    );
  }

  /*
  Functions
  */
  function showAllAssociatedScripts(id: number) {
    try {
      const filterScripts = scriptData?.filter((script) =>
        JSON.parse(script.associated_tags_id).some((item: any) => item === id)
      );

      return filterScripts?.map((script, index) => {
        if (index <= 3) {
          return <span key={script.id}>{script.script_title}</span>;
        }
      });
    } catch (e) {
      return <span></span>;
    }
  }

  function openActionOptions(id: number) {
    setScriptId(id);
  }

  function closeActionsOptions() {
    setScriptId(undefined);
  }

  function updateTag(tag: TagType) {
    EventEmitter.emit("updateTag", { tag });
  }

  return (
    <>
      {tagsData &&
        tagsData
          .filter((tag) => tag.tagname.toLowerCase().includes(search))
          .map((tag: TagType) => (
            <div
              key={tag.id}
              className="relative w-full grid grid-cols-7 text-left border-2 border-black/60 rounded-md mb-2"
            >
              <div className="col-span-3 h-[140px] p-2 border-r-2 border-black/60">
                <p>{tag.tagname}</p>
              </div>
              <div className="col-span-3 flex flex-wrap space-x-2 p-2 border-r-2 border-black/60">
                {showAllAssociatedScripts(tag.id)}
              </div>
              <div className="col-span-1  flex  justify-end p-2">
                <div
                  className="cursor-pointer"
                  onClick={() => openActionOptions(tag.id)}
                >
                  <ActionsMenu className="size-6" />
                </div>
              </div>
              {tag.id === scriptId && (
                <div className="z-50 font-medium flex flex-col items-start justify-start px-6 absolute pb-4 space-y-2 w-[210px] right-0 top-10 rounded bg-slate-50 shadow-xl">
                  <span
                    className="cursor-pointer text-right w-full"
                    onClick={closeActionsOptions}
                  >
                    x
                  </span>
                  <button
                    onClick={() => updateTag(tag)}
                    className="hover:border-b-2 hover:border-[var(--primary-color)] w-full text-start"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteTag(tag.id)}
                    className="hover:border-b-2 hover:border-[var(--primary-color)] w-full text-start"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
    </>
  );
}
