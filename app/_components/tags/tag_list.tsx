"use client";
import ActionsMenu from "@/app/assets/svgs/actionsmenu";
import EventEmitter from "@/utils/EventEmitter";
import { deleteTag, getAllTags } from "@/utils/supabase/tags";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

export default function TagList() {
  const [scriptId, setScriptId] = useState<number | null>();

  const {
    isPending: isTagsPending,
    isError: isTagsError,
    data: tagsData,
    error: errorTag,
  } = useQuery({
    queryKey: ["taglist"],
    queryFn: getAllTags,
  });

  if (isTagsPending) {
    return <span>Loading...</span>;
  }

  if (isTagsError) {
    return <span>Error: {errorTag.message}</span>;
  }

  function showAllAssociatedTags(ids: string) {
    try {
      const tagIds: number[] = JSON.parse(ids);

      return tagIds
        .map((id) => tagsData?.find((tag) => tag.id === id))
        .filter((tag): tag is TagType => tag !== undefined) // removes undefined ensures only true or false
        .map((item) => <span key={item.id}>{item.tagname}</span>); // only tagname
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
        tagsData.map((tag: TagType, index: number) => (
          <div
            key={tag.id}
            className="relative w-full    grid grid-cols-7  text-left border-2 border-black/60 rounded-md  mb-2"
          >
            <div className=" col-span-3 h-[140px] p-2 border-r-2 border-black/60 ">
              <p>{tag.tagname}</p>
            </div>
            <div className=" col-span-2 flex flex-wrap space-x-2 p-2 border-r-2 border-black/60">
              10
            </div>
            <div className="  col-span-2 flex justify-between p-2">
              <h2>Respond To</h2>
              <div
                className=" cursor-pointer"
                onClick={() => openActionOptions(tag.id)}
              >
                <ActionsMenu className={"size-6"} />
              </div>
            </div>
            {tag.id === scriptId && (
              <div
                className={`z-50  font-medium flex flex-col items-start justify-start px-6 absolute  pb-4 space-y-2 w-[210px]  right-0 top-10  rounded bg-slate-50 shadow-xl `}
              >
                <span
                  className=" cursor-pointer text-right w-full "
                  onClick={() => closeActionsOptions()}
                >
                  x
                </span>
                <button
                  onClick={() => updateTag(tag)}
                  className=" hover:border-b-2 hover:border-[var(--primary-color)] w-full text-start"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteTag(tag.id)}
                  className=" hover:border-b-2 hover:border-[var(--primary-color)] w-full text-start"
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
