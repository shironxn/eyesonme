"use client";

import { InstagramIcon, LucideIcon, YoutubeIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const links: { icon: LucideIcon; href: string }[] = [
  {
    icon: InstagramIcon,
    href: "https://instagram.com",
  },
  {
    icon: YoutubeIcon,
    href: "https://youtube.com",
  },
];

export function Footer() {
  const router = useRouter();
  return (
    <footer className="md:flex items-center justify-center py-16 gap-8 bg-bw border-t-2 border-border space-y-6">
      <div className="flex justify-center">
        <Image src="/logo.svg" alt="logo" width={100} height={100} />
      </div>
      <div className="space-y-6">
        <div className="text-center md:text-left">
          <p>Copyright © {new Date().getFullYear()} OSIS SMAN 48 Jakarta.</p>
          <p>All rights reserved.</p>
        </div>
        <div className="flex justify-center md:justify-start gap-4">
          {links.map((item, index) => (
            <span
              key={index}
              className="bg-bg rounded-full p-2 hover:cursor-pointer flex items-center justify-center"
              onClick={() => router.push(item.href)}
            >
              {<item.icon />}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
