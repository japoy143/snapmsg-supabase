import Logo from "@/app/assets/svgs/logo";
import {
  Stack,
  Tags,
  Response,
  ChatScripts,
  Logout,
  Tokens,
} from "../../assets/svgs";
import Link from "next/link";
import React from "react";
import SidebarLinksSmall from "./sidebarlinks_small";
import { signOutAction } from "@/app/actions";
import FreeTokens from "@/app/protected/free_token";

export default function SidebarSmall() {
  return (
    <>
      <div className=" px-2 py-10">
        <Link href={"/"}>
          <Logo className="size-6 text-white/40" />
        </Link>
      </div>
      <SidebarLinksSmall
        href="/protected"
        icon={<Stack className=" size-6" />}
      />

      <SidebarLinksSmall
        href="/protected/chat-scripts"
        icon={<ChatScripts className=" size-6" />}
      />

      <SidebarLinksSmall
        href="/protected/tags"
        icon={<Tags className=" size-6" />}
      />

      <SidebarLinksSmall
        href="/protected/response"
        icon={<Response className=" size-6" />}
      />

      <div className=" flex-1 flex flex-col justify-end py-10 space-y-6 items-center">
        <div className=" text-white/40 flex  ">
          <Tokens className=" size-6 text-white/40" />
          <FreeTokens />
        </div>

        <form action={signOutAction}>
          <button type="submit">
            <Logout className="size-6 text-white" />
          </button>
        </form>
      </div>
    </>
  );
}
