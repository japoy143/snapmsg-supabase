import React from "react";

export default function FormWrapper({
  children,
  sizes = "md",
}: {
  children: React.ReactNode;
  sizes?: "md" | "lg";
}) {
  return (
    <div className={` w-1/3  bg-white  py-6  px-8 rounded-lg `}>{children}</div>
  );
}
