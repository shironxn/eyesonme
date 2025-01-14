"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { MobileNavbar } from "@/components/nav/mobile-navbar";
import { DesktopNavbar } from "@/components/nav/desktop-navbar";
import { useRouter } from "next/navigation";

const links: { name: string; href: string }[] = [
  { name: "Beranda", href: "/" },
  { name: "Program Kerja", href: "/program-kerja" },
  { name: "Struktur Organisasi", href: "/struktur-organisasi" },
  { name: "Berita", href: "/berita" },
];

export function Navbar() {
  const router = useRouter();

  return (
    <div className="py-8 bg-bw">
      <div className="container mx-auto flex justify-between items-center">
        <div onClick={() => router.push("/")} className="hover: cursor-pointer">
          EyesOnMe
        </div>

        {useIsMobile() ? (
          <MobileNavbar links={links} />
        ) : (
          <DesktopNavbar links={links} />
        )}
      </div>
    </div>
  );
}
