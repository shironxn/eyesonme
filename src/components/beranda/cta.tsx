"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function BerandaCTA() {
  const router = useRouter();

  return (
    <>
      <Button
        onClick={() => router.push("/program-kerja")}
        className="bg-secondary"
      >
        Program Kerja
      </Button>
      <Button onClick={() => router.push("#visi-misi")}>Visi Misi</Button>
    </>
  );
}
