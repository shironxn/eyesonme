"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen text-center w-full md:max-w-xl">
      <video autoPlay muted loop>
        <source src="/404.webm" type="video/webm" />
      </video>
      <div className="space-y-2">
        <h1 className="text-2xl md:text-4xl font-semibold">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-muted">
          Selamat! Kamu berhasil menemukan halaman yang sama sekali nggak ada
          isinya.
        </p>
      </div>
      <Button className="mt-8" onClick={() => router.push("/")}>
        Kembali ke Beranda
      </Button>
    </div>
  );
}
