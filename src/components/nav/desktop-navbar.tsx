"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function DesktopNavbar({
  links,
}: {
  links: { name: string; href: string }[];
}) {
  const pathname = usePathname();

  return (
    <ul className="hidden md:flex gap-4">
      {links.map((item, index) => (
        <li key={index}>
          <Link
            href={item.href}
            className={pathname === item.href ? "active" : ""}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
