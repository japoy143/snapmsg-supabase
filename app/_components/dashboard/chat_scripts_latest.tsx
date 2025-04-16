"use client";
import { getAllChatScripts } from "@/utils/supabase/chatscripts";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

export default function ChatScriptsLatest({ id }: { id: string }) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["scriptlist"],
    queryFn: () => getAllChatScripts(id),
  });

  if (isPending) {
    return Array.from({ length: 5 }).map((_, index) => {
      return (
        <div
          key={index}
          className=" grid grid-cols-4 text-left border-black/60 border-2 p-1 rounded mt-1 overflow-y-auto animate-pulse"
        >
          <p className=" col-span-2">
            <span className=" bg-slate-100 text-transparent">
              Lorem ipsum dolor sit amet,
            </span>
          </p>
          <p className=" col-span-2">
            <span className=" bg-slate-100 text-transparent">
              Lorem ipsum dolor sit amet,
            </span>
          </p>
        </div>
      );
    });
  }

  return (
    <>
      {data?.map((script, index) => {
        if (index <= 5) {
          return (
            <div
              key={script.id}
              className=" grid grid-cols-4 text-left border-black/60 border-2 p-1 rounded mt-1 overflow-y-auto"
            >
              <p className=" col-span-2">{script.script_title}</p>
              <p className=" col-span-2">{script.scripts}</p>
            </div>
          );
        }
      })}
    </>
  );
}
