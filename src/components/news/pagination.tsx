"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
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
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={handlePagination(page - 1)} />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={index + 1 === page}
              href={handlePagination(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href={handlePagination(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
