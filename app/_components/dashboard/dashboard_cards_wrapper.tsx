import React, { ReactNode } from "react";

export default function DashboardCardsWrapper({
  children,
  isCards = "cards",
}: {
  children: ReactNode;
  isCards?: "card" | "cards" | "four-cards";
}) {
  return (
    <div
      className={
        isCards === "four-cards"
          ? `w-full grid grid-cols-4  gap-4`
          : `w-full grid ${isCards === "cards" ? " grid-cols-3" : "grid-cols-1"}  gap-4`
      }
    >
      {children}
    </div>
  );
}
