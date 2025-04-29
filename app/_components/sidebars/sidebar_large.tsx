import { signOutAction } from "@/app/actions";
import UserEmail from "@/app/_components/email";
import FreeTokens from "@/app/_components/free_token";
import React from "react";
import SideBarLinks from "./sidebarlinks";
import Link from "next/link";

export default function SideBarLarge() {
  return (
    <>
      <SideBarLinks />
      <div className=" flex-1 flex flex-col justify-end text-white p-8 w-full space-y-4 text-center">
        <div>
          <p>
            Free Tokens <FreeTokens />
          </p>
          <Link
            href={"/protected/upgrade"}
            className=" text-xs text-white/50 hover:text-white  cursor-pointer"
          >
            Upgrade
          </Link>
        </div>

        <div>
          <UserEmail />
        </div>

        <form action={signOutAction}>
          <button
            type="submit"
            className="w-full py-2 bg-white rounded text-center text-[var(--secondary-color)]"
          >
            Logout
          </button>
        </form>
      </div>
    </>
  );
}
