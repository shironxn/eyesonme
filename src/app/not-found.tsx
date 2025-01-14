"use client";

import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="container mx-auto flex flex-col gap-4 min-h-screen justify-center items-center text-center">
      <h1>404</h1>
      <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>
      <Button onClick={() => router.push("/")}>
        <HomeIcon /> Beranda
      </Button>
    </div>
  );
}
