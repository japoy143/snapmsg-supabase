"use client";
import React, { useState } from "react";
import Logo from "../assets/svgs/logo";
import Link from "next/link";
import { HamburgerMenu } from "../assets/svgs";

export default function Navigation() {
  const [menuOpen, setIsMenuOpen] = useState<boolean>(false);

  function scrollOnSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    const navbarHeight = 60;
    if (section) {
      const offsetTop = section.offsetTop - navbarHeight;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  }
  return (
    <nav className=" px-8 py-4 flex justify-between  items-center z-40 top-0 sticky bg-white">
      <div>
        <div className=" flex items-center gap-1">
          <Logo className=" size-6 text-[var(--primary-color)]" />
          {/* custom fonts  */}
          <button
            onClick={() => scrollOnSection("hero")}
            className=" text-[var(--primary-color)] text-md font-semi-bold"
          >
            SnagMsg
          </button>
        </div>
      </div>

      <div className=" hidden space-x-6 md:flex">
        <button onClick={() => scrollOnSection("services")}>Services</button>
        <button onClick={() => scrollOnSection("plans")}>Plans</button>
        <button onClick={() => scrollOnSection("contacts")}>Contact</button>
      </div>

      <div className="hidden md:flex gap-2 text-[14px]">
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

      <div
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className=" flex md:hidden relative "
      >
        <HamburgerMenu className="size-6" />
      </div>
      {menuOpen && (
        <div className="md:hidden  shadow-lg flex flex-col w-[200px] absolute  bg-slate-50 py-6 px-4 space-y-4 right-0 top-12">
          <Link
            className=" border-b hover:border-b-[var(--primary-color)] hover:text-[var(--primary-color)] font-medium"
            href={"/sign-in"}
          >
            Sign In
          </Link>
          <Link
            className=" border-b hover:border-b-[var(--primary-color)] hover:text-[var(--primary-color)] font-medium"
            href={"/sign-up"}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
