import React from "react";

export default function FormErrors({ error }: { error?: string }) {
  return (
    <>
      <small className=" text-red-500">{error}</small>
    </>
  );
}
