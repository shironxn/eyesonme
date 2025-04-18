"use client";

import { DesktopNavbar } from "@/components/nav/desktop-navbar";
import { MobileNavbar } from "@/components/nav/mobile-navbar";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const links: { name: string; href: string }[] = [
  { name: "Beranda", href: "/" },
  { name: "Program Kerja", href: "/proker" },
  { name: "Struktur Organisasi", href: "/struktur" },
  { name: "Berita", href: "/berita" },
];

export function Navbar({ session }: { session: User | undefined }) {
  return (
    <nav className="py-4 md:py-8 bg-bw navbar">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="hover: cursor-pointer font-semibold text-lg after:content-none hover:after:content-none focus:after:content-none "
        >
          <Image
            src="/logo/mpkosis.svg"
            alt="MPK OSIS Logo"
            width={60}
            height={60}
          />
        </Link>
        <div className="flex flex-row-reverse md:flex-row gap-4 md:gap-8 items-center">
          <MobileNavbar links={links} />
          <DesktopNavbar links={links} />
          {session && (
            <Button size="icon" onClick={() => signOut()}>
              <LogOutIcon />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
