"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

export function NewsPagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const handlePagination = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber > 1) {
      params.set("page", pageNumber.toString());
    } else {
      params.delete("page");
    }

    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination className="flex justify-between items-center">
      <div>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={handlePagination(page - 1)}
              className={page <= 1 ? "hidden" : ""}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={handlePagination(page + 1)}
              className={page >= totalPages ? "hidden" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </div>
      <div>
        <p className="text-sm text-muted">
          {page} of {totalPages}
        </p>
      </div>
    </Pagination>
  );
}
