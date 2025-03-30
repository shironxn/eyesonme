"use client";

import { Button } from "@/components/ui/button";
import { ClipboardListIcon, StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function HomeCTA() {
  const router = useRouter();

  return (
    <>
      <Button onClick={() => router.push("/proker")}>
        <ClipboardListIcon />
        Program Kerja
      </Button>
      <Button onClick={() => router.push("#visi-misi")} variant="accent">
        <StarIcon /> Visi Misi
      </Button>
    </>
  );
}
