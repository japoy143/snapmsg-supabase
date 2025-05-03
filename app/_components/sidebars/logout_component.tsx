"use client";

import { useState } from "react";
import { signOutAction } from "@/app/actions";

export default function LogoutButton() {
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    setIsPending(true);
    await signOutAction(); // server action handles the logout + redirect
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className={`w-full py-2 rounded text-center text-[var(--secondary-color)] ${
        isPending ? "bg-gray-300 cursor-not-allowed" : "bg-white"
      }`}
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
