"use client";

import Link from "next/link";

export function DesktopNavbar({
  links,
}: {
  links: { name: string; href: string }[];
}) {
  return (
    <ul className="flex gap-4">
      {links.map((item, index) => (
        <li key={index}>
          <Link href={item.href}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
}
