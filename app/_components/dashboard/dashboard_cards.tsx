import React, { ReactNode } from "react";

export default function DashboardCards({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`${className} h-[200px] flex flex-col bg-[var(--cards-background-color)] shadow-md px-4 py-2 rounded`}
    >
      {children}
    </div>
  );
}
