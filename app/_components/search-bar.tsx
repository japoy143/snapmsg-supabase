"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Search } from "../assets/svgs";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

interface SearchBar {
  name: string;
  isSearchVisible?: "shown" | "hidden";
}

export default function SearchBar({
  name,
  isSearchVisible = "shown",
}: SearchBar) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <div
      className={`${isSearchVisible === "shown" ? "py-2" : "py-6"} px-4 bg-[var(--search-background)] flex items-center justify-between `}
    >
      <h1 className=" font-medium text-lg">{name}</h1>

      {isSearchVisible === "shown" && (
        <div>
          <label htmlFor="search">Search</label>
          <form className=" border-black border border-solid bg-[var(--search-bar-background)] flex  rounded pl-2  items-center">
            <input
              type="text"
              id="search"
              name="search"
              placeholder=" search here"
              onChange={(e) =>
                router.push(
                  pathname + "?" + createQueryString("search", e.target.value)
                )
              }
              className="focus:ring-0  focus:ring-transparent focus:outline-none py-1"
            />
            <Search className="size-6" />
          </form>
        </div>
      )}
    </div>
  );
}
