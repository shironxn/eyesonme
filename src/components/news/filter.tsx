"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

const filterOptions = ["pengumuman", "prestasi", "acara"];

export function FilterNews() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.delete("filter");
    filters.forEach((item) => params.append("filter", item));

    router.replace(`${pathname}?${params.toString()}`);
  }, [filters, pathname, router, searchParams]);

  function toggleFilter(item: string) {
    setFilters((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });
  }

  return (
    <div className="flex flex-wrap gap-4">
      {filterOptions.map((item) => (
        <Button
          key={item}
          variant={filters.includes(item) ? "default" : "neutral"}
          onClick={() => toggleFilter(item)}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </Button>
      ))}
    </div>
  );
}
