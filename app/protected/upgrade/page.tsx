import { CheckedSvg } from "@/app/assets/svgs";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="p-8">
      <h1 className=" font-bold">Upgrade Plan</h1>
      <p>Snapmsg pricing plan are designed to help you grow your business</p>

      <div className=" grid grid-cols-1 sm:grid-cols-3 gap-2 xl:px-96 mt-10">
        <div className=" p-4 border-black/30 border-2 rounded-lg  col-span-1 shadow-lg text-justify space-y-8 flex flex-col justify-between">
          <div className=" space-y-1">
            <h2 className=" font-medium text-2xl">Free</h2>
            <h3 className=" font-medium text-4xl">
              0<span className=" text-sm">$</span>
            </h3>
            <p className=" text-sm text-black/50">
              Get started with 50 free tokens to test the platform and explore
              its features. Perfect for new users who want to try before they
              buy.
            </p>
          </div>
          <div>
            <h3 className=" font-medium leading-none">Features</h3>
            <p className=" leading-none text-sm  text-black/50">
              Everything in our free plan includes
            </p>
            <div className="mt-2 space-y-8">
              <div className=" flex gap-2">
                <CheckedSvg className="size-6 text-[var(--primary-color)]" />
                <p>40 Free token</p>
              </div>

              <div className=" flex gap-2">
                <CheckedSvg className="size-6 text-[var(--primary-color)]" />
                <p>Api Integration</p>
              </div>

              <div className=" flex gap-2">
                <CheckedSvg className="size-6 text-[var(--primary-color)]" />
                <p>Create custom message for client replies</p>
              </div>
            </div>
          </div>
          <button className=" w-full py-4  rounded-lg text-white  bg-[var(--primary-color)]">
            Free
          </button>
        </div>
        <div className=" p-4 border-black/30 border-2 rounded-lg  col-span-1 shadow-lg text-justify space-y-8 flex flex-col justify-between">
          <div className=" space-y-1">
            <div className=" flex items-center justify-between">
              <h2 className=" font-medium text-2xl">Business</h2>
              <p className=" text-[var(--primary-color)] font-medium text-sm">
                Popular
              </p>
            </div>
            <h3 className=" font-medium text-4xl">
              12<span className=" text-sm">$</span>
            </h3>
            <p className=" text-sm text-black/50">
              Unlock full access with 1200 tokens for more extended and detailed
              interactions. Ideal for users who need regular access.
            </p>
          </div>
          <div>
            <h3 className=" font-medium leading-none">Features</h3>
            <p className=" leading-none text-sm  text-black/50">
              Everything in our free plan includes
            </p>
            <div className="mt-2 space-y-8">
              <div className=" flex gap-2">
                <CheckedSvg className="size-6 text-[var(--primary-color)]" />
                <p>1200 Tokens</p>
              </div>

              <div className=" flex gap-2">
                <CheckedSvg className="size-6 text-[var(--primary-color)]" />
                <p>Api Integration</p>
              </div>

              <div className=" flex gap-2">
                <CheckedSvg className="size-6 text-[var(--primary-color)]" />
                <p>Create custom message for client replies</p>
              </div>

              <div className=" flex gap-2">
                <CheckedSvg className="size-6 text-[var(--primary-color)]" />
                <p>Fast api Response</p>
              </div>
            </div>
          </div>
          <Link
            className=" text-center w-full py-4  rounded-lg text-white  bg-[var(--primary-color)]"
            href={"/protected/payment-gateway/12"}
          >
            Subscribe
          </Link>
        </div>

        <div className=" p-4 border-black/30 border-2 rounded-lg  col-span-1 shadow-lg text-justify space-y-8 flex flex-col justify-between">
          <div className=" space-y-1">
            <h2 className=" font-medium text-2xl">Personal</h2>
            <h3 className=" font-medium text-4xl">
              5<span className=" text-sm">$</span>
            </h3>
            <p className=" text-sm text-black/50">
              Enjoy 450 tokens for even more flexibility and in-depth usage. for
              personal and small business integration.
            </p>
          </div>
          <div>
            <h3 className=" font-medium leading-none">Features</h3>
            <p className=" leading-none text-sm  text-black/50">
              Everything in our free plan includes
            </p>
            <div className="mt-2 space-y-8">
              <div className=" flex gap-2">
                <CheckedSvg className="size-6 text-[var(--primary-color)]" />
                <p>450 Tokens</p>
              </div>

              <div className=" flex gap-2">
                <CheckedSvg className="size-6 text-[var(--primary-color)]" />
                <p>Api Integration</p>
              </div>

              <div className=" flex gap-2">
                <CheckedSvg className="size-6 text-[var(--primary-color)]" />
                <p>Create custom message for client replies</p>
              </div>

              <div className=" flex gap-2">
                <CheckedSvg className="size-6 text-[var(--primary-color)]" />
                <p>Fast api Response</p>
              </div>
            </div>
          </div>
          <Link
            className=" text-center w-full py-4  rounded-lg text-white  bg-[var(--primary-color)]"
            href={"/protected/payment-gateway/5"}
          >
            Subscribe
          </Link>
        </div>
      </div>
    </div>
  );
}
