"use client";
import EventEmitter from "@/utils/EventEmitter";
import React, { useEffect, useState } from "react";

export default function MessageResponse() {
  const [response, setResponse] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);

  //events
  useEffect(() => {
    const setter = (data: promptStatus) => {
      if (data.status === "pending") {
        setIsPending(true);
      } else if (data.status === "resolve") {
        setIsPending(false);
      }
      setResponse(data.response ?? "");
    };

    const listener = EventEmitter.addListener("api-called", setter);

    return () => {
      listener.off("api-called", setter);
    };
  }, []);

  return (
    <>
      <div className=" border-2 border-black/60 rounded flex-1 w-full h-full p-4 ">
        {isPending ? <p>Loading...</p> : response}
      </div>
    </>
  );
}
