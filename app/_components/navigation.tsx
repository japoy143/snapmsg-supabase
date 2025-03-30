import React from "react";
import Logo from "../assets/svgs/logo";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className=" px-8 py-4 flex justify-between  items-center z-40 top-0 sticky bg-white">
      <div>
        <div className=" flex items-center gap-1">
          <Logo className=" size-6 text-[var(--primary-color)]" />
          {/* custom fonts  */}
          <Link
            href={"/"}
            className=" text-[var(--primary-color)] text-md font-semi-bold"
          >
            SnagMsg
          </Link>
        </div>
      </div>

      <div className=" space-x-6">
        <Link className=" text-[var(--secondary-color)]" href={"#"}>
          Services
        </Link>
        <Link className=" text-[var(--secondary-color)]" href={"#"}>
          About
        </Link>
        <Link className=" text-[var(--secondary-color)]" href={"#"}>
          Contact
        </Link>
      </div>

      <div className="flex gap-2 text-[14px]">
        <Link className="p-2 border-r" href={"/sign-in"}>
          Sign In
        </Link>
        <Link
          className="p-2 rounded-md text-white  bg-[var(--primary-color)]"
          href={"/sign-up"}
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
