import React, { ReactNode } from "react";

export default function DashboardCardsWrapper({
  children,
  isCards = "cards",
}: {
  children: ReactNode;
  isCards?: "card" | "cards";
}) {
  return (
    <div
      className={`w-full grid ${isCards === "cards" ? " grid-cols-3" : "grid-cols-1"}  gap-4`}
    >
      {children}
    </div>
  );
}
