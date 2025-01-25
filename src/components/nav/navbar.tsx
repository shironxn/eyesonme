"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { MobileNavbar } from "@/components/nav/mobile-navbar";
import { DesktopNavbar } from "@/components/nav/desktop-navbar";
import Link from "next/link";

const links: { name: string; href: string }[] = [
  { name: "Beranda", href: "/" },
  { name: "Program Kerja", href: "/program-kerja" },
  { name: "Struktur Organisasi", href: "/struktur-organisasi" },
  { name: "Berita", href: "/berita" },
];

export function Navbar() {
  return (
    <div className="py-4 md:py-8 bg-bw">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="hover: cursor-pointer font-semibold text-lg after:content-none hover:after:content-none focus:after:content-none "
        >
          EyesOnMe
        </Link>

        {useIsMobile() ? (
          <MobileNavbar links={links} />
        ) : (
          <DesktopNavbar links={links} />
        )}
      </div>
    </div>
  );
}
