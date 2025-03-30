"use client";
import React, { useEffect, useRef } from "react";

type FormInputProps = {
  labelName: string;
  holder: string;
  type?: string;
  name: string;
  placeholder: string;
  error?: string;
};

export default function FormInput({
  labelName,
  holder,
  type = "text",
  name,
  placeholder,
  error,
}: FormInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  //autofocus handler
  useEffect(() => {
    if (error && inputRef.current) {
      inputRef.current.focus();
    }
  }, [error]);

  return (
    <>
      <div className=" ">
        <label htmlFor={holder}>{labelName}</label>
        <input
          type={type}
          id={holder}
          name={name}
          placeholder={placeholder}
          ref={inputRef}
          className={`block w-full px-2 py-2 bg-[var(--forms-background-color)] rounded mt-1 outline-none 
          focus:ring-2 ${
            error ? "focus:ring-red-500" : "focus:ring-[var(--primary-color)]"
          }
        `}
        />

        {/* errors  */}
        <small className=" text-red-500 text-sm">{error}</small>
      </div>
    </>
  );
}
