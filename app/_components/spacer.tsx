import React from "react";

type SpacerProps = {
  className: string;
};
export default function Spacer({ className }: SpacerProps) {
  return (
    <>
      <div className={className}></div>
    </>
  );
}
