"use client";
import { signOutAction } from "@/app/actions";
import Logout from "@/app/assets/svgs/logout";
import React, { useState } from "react";

export default function LogoutIcon() {
  const [ispending, setIsPending] = useState<boolean>(false);

  async function handleAction() {
    setIsPending(true);
    await signOutAction();
  }

  return (
    <button disabled={ispending} onClick={handleAction} className=" text-white">
      {ispending ? "..." : <Logout className="size-6 text-white" />}
    </button>
  );
}
