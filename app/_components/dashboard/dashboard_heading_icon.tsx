import React from "react";

interface DashboardheadingIconProps {
  color: string;
  icon: React.JSX.Element;
  headingName: string;
}

export default function DashboardHeadingIcon({
  color,
  icon,
  headingName,
}: DashboardheadingIconProps) {
  return (
    <div className=" flex items-center justify-start gap-2">
      <div
        className={` h-[60px] w-[60px] flex justify-center rounded-full items-center ${color} `}
      >
        {icon}
      </div>
      <h1 className=" font-medium text-lg">{headingName}</h1>
    </div>
  );
}
