import React from "react";

interface buttonProps {
  buttonName: string;
  action: () => void;
  color?: "purple" | "black";
  type?: "submit" | "custom";
  formId?: string;
}

export default function DashboardButton({
  buttonName,
  action,
  color = "purple",
  type = "custom",
  formId,
}: buttonProps) {
  return (
    <>
      {type === "custom" ? (
        <div
          onClick={action}
          className={`p-2 ${color === "purple" ? "bg-[var(--primary-color)]" : "bg-[var(--secondary-color)]"} text-white rounded cursor-pointer`}
        >
          {buttonName}
        </div>
      ) : (
        <button
          form={formId}
          type="submit"
          className={`p-2 ${color === "purple" ? "bg-[var(--primary-color)]" : "bg-[var(--secondary-color)]"} text-white rounded`}
        >
          {buttonName}
        </button>
      )}
    </>
  );
}
