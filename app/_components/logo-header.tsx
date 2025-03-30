import React from "react";
import Logo from "../assets/svgs/logo";
import Link from "next/link";

type logoColor = {
  color?: "sidebar" | "form";
};

export default function LogoHeader({ color = "form" }: logoColor) {
  return (
    <div
      className={` flex items-center gap-1 ${color === "sidebar" ? "text-[#ffffff]" : "text-[var(--primary-color)]"}`}
    >
      <Logo className="size-6" />
      {/* custom fonts  */}
      <Link href={"/"} className="text-md font-semi-bold">
        SnagMsg
      </Link>
    </div>
  );
}
