import React from "react";

export default function DashboardCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" flex-1 w-full h-full bg-[var(--cards-background-color)] py-2 px-4 rounded-md">
      {children}
    </div>
  );
}
