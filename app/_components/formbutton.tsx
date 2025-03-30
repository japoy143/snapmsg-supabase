import React from "react";

type FormButtonProps = {
  buttonName: string;
  action: () => void;
  type?: string;
};

export default function FormButton({
  buttonName,
  action,
  type = "submit",
}: FormButtonProps) {
  return (
    <>
      <button
        onClick={action}
        className=" w-full bg-[var(--primary-color)] py-2 rounded text-white "
      >
        {buttonName}
      </button>
    </>
  );
}
