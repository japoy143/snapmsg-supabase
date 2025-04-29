"use client";
import React from "react";

export default function Footer() {
  function scrollOnSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    const navbarHeight = 60;
    if (section) {
      const offsetTop = section.offsetTop - navbarHeight;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  }

  return (
    <footer className="py-6  bg-[var(--primary-color)] text-white">
      <div className="px-4 flex items-center justify-between">
        <h4 className=" font-medium text-xl">Snapmsg</h4>
        <div className=" flex gap-4">
          <button onClick={() => scrollOnSection("services")}>Services</button>
          <button onClick={() => scrollOnSection("plans")}>Plans</button>
          <button onClick={() => scrollOnSection("contacts")}>Contact</button>
        </div>
      </div>
      <div className=" pt-4 border-b border-white "></div>
      <p className="pt-2 text-end text-sm">
        2025 snapmsg. all rights reserved.
      </p>
    </footer>
  );
}
