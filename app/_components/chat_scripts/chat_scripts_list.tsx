"use client";
import ActionsMenu from "@/app/assets/svgs/actionsmenu";
import {
  deleteChatScripts,
  getAllChatScripts,
} from "@/utils/supabase/chatscripts";
import { getAllTags } from "@/utils/supabase/tags";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EventEmitter from "@/utils/EventEmitter";

export default function ChatScriptsList() {
  const [scriptId, setScriptId] = useState<number | undefined>();

  const {
    isPending: isTagPending,
    isError: isTagError,
    data: tagsData,
    error: tagError,
  } = useQuery({
    queryKey: ["taglist"],
    queryFn: getAllTags,
  });

  const {
    isPending: isScriptPending,
    isError: isScriptError,
    data: scriptsData,
    error: scriptError,
  } = useQuery({
    queryKey: ["scriptlist"],
    queryFn: getAllChatScripts,
  });

  if (isTagPending || isScriptPending) {
    return <div>...Loading</div>;
  }

  if (isTagError || isScriptError) {
    return (
      <div>
        {tagError && tagError.message}
        {scriptError && scriptError.message}
      </div>
    );
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

  function getAllAssociatedTags(ids: string) {
    try {
      const tagIds: number[] = JSON.parse(ids);

      return tagIds
        .map((id) => tagsData?.find((tag) => tag.id === id))
        .filter((tag): tag is TagType => tag !== undefined) // removes undefined ensures only true or false
        .map((item) => item); // only tagname
    } catch (e) {
      return [];
    }
  }

  function openActionOptions(id: number) {
    setScriptId(id);
  }

  function closeActionsOptions() {
    setScriptId(undefined);
  }

  async function deleteScript(id: number) {
    const { success } = await deleteChatScripts(id);

    if (success) {
      toast("Successfully deleted script", {
        type: "success",
      });
      EventEmitter.emit("clear");
    } else {
      toast("Failed deletion  of script", {
        type: "error",
      });
    }
  }

  function showUpdate(id: number, scriptname: string, associated_tag: string) {
    const allTags = getAllAssociatedTags(associated_tag);
    EventEmitter.emit("update", {
      id: id,
      scriptname: scriptname,
      associated_tag: allTags,
    });
  }

  useEffect(() => {
    function clear() {
      setScriptId(undefined);
    }

    const listener = EventEmitter.addListener("clear", clear);

    return () => {
      EventEmitter.removeListener("clear", clear);
    };
  }, []);

  return (
    <>
      {scriptsData &&
        scriptsData.map((script: ChatScriptsType) => (
          <div
            key={script.id}
            className="relative w-full  grid grid-cols-7  text-left border-2 border-black/60 rounded-md  mb-2"
          >
            <div className=" col-span-3 h-[140px] p-2 border-r-2 border-black/60 ">
              <p>{script.scripts}</p>
            </div>
            <div className=" col-span-2 flex flex-wrap space-x-2 p-2 border-r-2 border-black/60">
              {showAllAssociatedTags(script.associated_tags_id)}
            </div>
            <div className="  col-span-2 flex justify-between p-2">
              <h2>Respond To</h2>
              <div
                className=" cursor-pointer"
                onClick={() => openActionOptions(script.id)}
              >
                <ActionsMenu className={"size-6"} />
              </div>
            </div>
            {script.id === scriptId && (
              <div className="z-50  font-medium flex flex-col items-start justify-start px-6 absolute  pb-4 space-y-2 w-[210px] right-0 top-10 rounded bg-slate-50 shadow-xl ">
                <span
                  className=" cursor-pointer text-right w-full "
                  onClick={() => closeActionsOptions()}
                >
                  x
                </span>
                <button
                  onClick={() =>
                    showUpdate(
                      script.id,
                      script.scripts,
                      script.associated_tags_id
                    )
                  }
                  className=" hover:border-b-2 hover:border-[var(--primary-color)] w-full text-start"
                >
                  Update
                </button>
                <button
                  className=" hover:border-b-2 hover:border-[var(--primary-color)] w-full text-start"
                  onClick={() => deleteScript(script.id)}
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
