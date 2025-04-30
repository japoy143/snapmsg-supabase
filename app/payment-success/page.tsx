"use client";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <main className=" max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-600 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-8">Success fully Paid</h1>
        <Link href={"/protected"} className=" font-bold   ">
          Go back to Dashboard
        </Link>
      </div>
    </main>
  );
}
