"use client";
import {
  getAllSubscribers,
  updateSubscription,
} from "@/utils/supabase/admin/subscriber";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ArrowDown from "../assets/svgs/arrowdown";

export default function AllSubscriptionList() {
  // subscription list  query
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["subscriptionlist"],
    queryFn: () => getAllSubscribers(),
  });

  const [optionId, setOptionId] = useState<number | undefined>(undefined);

  //Functions
  function showOptions(id: number) {
    setOptionId(optionId === id ? undefined : id);
  }

  async function update(
    id: number,
    subscription: "Free Tier" | "Personal" | "Business" | "Block"
  ) {
    await updateSubscription(id, subscription);
    showOptions(id);
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
              <button
                onClick={() => update(user.id, "Block")}
                className=" hover:border-b-2 hover:border-black/60"
              >
                Block
              </button>
              <button
                onClick={() => update(user.id, "Free Tier")}
                className=" hover:border-b-2 hover:border-black/60"
              >
                Free Tier
              </button>
              <button
                onClick={() => update(user.id, "Personal")}
                className=" hover:border-b-2 hover:border-black/60"
              >
                Personal
              </button>
              <button
                onClick={() => update(user.id, "Business")}
                className=" hover:border-b-2 hover:border-black/60"
              >
                Business
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
