"use client";
import { getAllTags } from "@/utils/supabase/tags";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function TagListLatest({ id }: { id: string }) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["taglist"],
    queryFn: () => getAllTags(id),
  });

  if (isPending) {
    return Array.from({ length: 3 }).map((_, index) => {
      return (
        <div
          key={index}
          className=" grid grid-cols-2 text-left border-black/60 border-2 p-1 rounded mt-1 overflow-y-auto animate-pulse"
        >
          <p className=" col-span-2">
            <span className=" bg-slate-100 text-transparent">
              Lorem ipsum dawcawwd
            </span>
          </p>
        </div>
      );
    });
  }

  return (
    <>
      {data?.map((tag, index) => {
        if (index <= 5) {
          return (
            <div
              key={tag.id}
              className=" grid grid-cols-2 text-left border-black/60 border-2 p-1 rounded mt-1 overflow-y-auto"
            >
              <p className=" col-span-2">{tag.tagname}</p>
            </div>
          );
        }
      })}
    </>
  );
}
