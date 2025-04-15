"use client";
import EventEmitter from "@/utils/EventEmitter";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function MessageResponse() {
  const [response, setResponse] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();

  //events
  useEffect(() => {
    console.log("running");
    const setter = (data: promptStatus) => {
      if (data.status === "pending") {
        setIsPending(true);
      } else if (data.status === "resolve") {
        setIsPending(false);
        router.refresh();
      } else {
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
      <div className="  overflow-y-scroll border-2 border-black/60 rounded flex-1 w-full h-full xl:h-[460px] p-4 ">
        {isPending ? (
          <div className=" animate-pulse text-justify space-y-6 ">
            <div className="space-y-2">
              <p>
                <span className="  bg-slate-100 text-transparent">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </span>
              </p>

              <p>
                <span className="   bg-slate-100 text-transparent">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis iste similique veritatis optio similique
                  veritatis optio
                </span>
              </p>

              <p>
                <span className="   bg-slate-100 text-transparent">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis iste similique veritatis optio similique
                  veritatis optio
                </span>
              </p>

              <p>
                <span className="   bg-slate-100 text-transparent">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis iste similique veritatis optio similique
                  veritatis optio
                </span>
              </p>

              <p>
                <span className="   bg-slate-100 text-transparent">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis iste similique veritatis optio similique
                  veritatis optio
                </span>
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="  bg-slate-100 text-transparent">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </span>
              </p>

              <p>
                <span className="   bg-slate-100 text-transparent">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis iste similique veritatis optio similique
                  veritatis optio
                </span>
              </p>

              <p>
                <span className="   bg-slate-100 text-transparent">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis iste similique veritatis optio similique
                  veritatis optio
                </span>
              </p>

              <p>
                <span className="   bg-slate-100 text-transparent">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis iste similique veritatis optio similique
                  veritatis optio
                </span>
              </p>

              <p>
                <span className="   bg-slate-100 text-transparent">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis iste similique veritatis optio similique
                  veritatis optio
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div className=" text-justify">{response}</div>
        )}
      </div>
    </>
  );
}
