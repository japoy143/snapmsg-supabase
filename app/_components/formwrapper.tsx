import React from "react";

export default function FormWrapper({
  children,
  sizes = "md",
}: {
  children: React.ReactNode;
  sizes?: "md" | "lg";
}) {
  return (
    <div
      className={` md:w-1/2 lg:w-1/3 xl:w-1/4  bg-white  py-6  px-8 rounded-lg `}
    >
      {children}
    </div>
  );
}
