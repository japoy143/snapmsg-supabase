"use client";
import { getAllSubscribers } from "@/utils/supabase/admin/subscriber";
import { useQuery } from "@tanstack/react-query";

import React, { useState } from "react";
import ArrowDown from "../assets/svgs/arrowdown";

export default function AllSubscriptionList() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["subscriptionlist"],
    queryFn: () => getAllSubscribers(),
  });

  const [optionId, setOptionId] = useState<number | undefined>(undefined);

  function showOptions(id: number) {
    setOptionId(optionId === id ? undefined : id);
  }

  return (
    <>
      {data?.map((user: UserDetails) => (
        <div
          key={user.id}
          className=" mt-1 border-2 border-black/60 rounded-md p-4 flex justify-between items-center  relative"
        >
          <p>{user.email}</p>
          <div
            className=" flex items-center font-medium cursor-pointer"
            onClick={() => showOptions(user.id)}
          >
            {user.subscription}
            <ArrowDown className="size-4" />
          </div>
          {optionId === user.id && (
            <div className=" absolute bg-white shadow-xl py-4 px-6 flex flex-col right-0 top-10 space-y-2 z-10 ">
              <button className=" hover:border-b-2 hover:border-black/60">
                Free Tier
              </button>
              <button className=" hover:border-b-2 hover:border-black/60">
                Personal
              </button>
              <button className=" hover:border-b-2 hover:border-black/60">
                Business
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
