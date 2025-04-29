"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ArrowDown from "../assets/svgs/arrowdown";
import { getAllMessages } from "@/utils/supabase/message";

export default function MessageList() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["messagelist"],
    queryFn: () => getAllMessages(),
  });

  return (
    <>
      {data?.map((message: messagesType) => (
        <div
          key={message.id}
          className=" mt-1 border-2 border-black/60 rounded-md p-4 flex justify-between items-center  relative"
        >
          <p>{message.firstname}</p>
          <p>{message.email}</p>
          <p>{message.message}</p>
        </div>
      ))}
    </>
  );
}
