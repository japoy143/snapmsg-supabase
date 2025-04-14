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
        className={`h-[20px] w-[20px] md:h-[40px] md:w-[40px] lg:h-[60px] lg:w-[60px] flex justify-center rounded-full items-center ${color} `}
      >
        {icon}
      </div>
      <h1 className=" font-medium text-sm md:text-lg">{headingName}</h1>
    </div>
  );
}
