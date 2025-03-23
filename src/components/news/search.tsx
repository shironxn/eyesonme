"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";

export function SearchNews() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    const searchValue = e.currentTarget.search.value.trim();

    if (searchValue === "") {
      params.delete("search");
    } else {
      params.set("search", searchValue.toLowerCase());
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
      <Input name="search" placeholder="Cari" className="w-full md:w-64" />
      <Button size="icon" type="submit">
        <SearchIcon className="w-4 h-4" />
      </Button>
    </form>
  );
}
