"use client";

import { DesktopNavbar } from "@/components/nav/desktop-navbar";
import { MobileNavbar } from "@/components/nav/mobile-navbar";
import Link from "next/link";

const links: { name: string; href: string }[] = [
  { name: "Beranda", href: "/" },
  { name: "Program Kerja", href: "/proker" },
  { name: "Struktur Organisasi", href: "/struktur" },
  { name: "Berita", href: "/berita" },
];

export function Navbar() {
  return (
    <nav className="py-4 md:py-8 bg-bw navbar">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="hover: cursor-pointer font-semibold text-lg after:content-none hover:after:content-none focus:after:content-none "
        >
          EyesOnMe
        </Link>
        <MobileNavbar links={links} />
        <DesktopNavbar links={links} />
      </div>
    </nav>
  );
}
