"use client";

import Link from "next/link";

const links: { name: string; href: string }[] = [
  { name: "Beranda", href: "/" },
  { name: "Program Kerja", href: "/program-kerja" },
  { name: "Struktur Organisasi", href: "/struktur-organisasi" },
  { name: "Berita", href: "/berita" },
];

export function Navbar() {
  return (
    <nav className="py-8 bg-bw">
      <div className="container mx-auto flex justify-between">
        <div>EyesOnMe</div>
        <ul className="flex gap-4">
          {links.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
