"use client";

import { Button } from "@/components/ui/button";
import { ClipboardListIcon, StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function BerandaCTA() {
  const router = useRouter();

  return (
    <>
      <Button onClick={() => router.push("/program-kerja")} className="bg-main">
        <ClipboardListIcon />
        Program Kerja
      </Button>
      <Button onClick={() => router.push("#visi-misi")}>
        <StarIcon /> Visi Misi
      </Button>
    </>
  );
}
