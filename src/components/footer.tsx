"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const links: { name: string; icon: string; href: string }[] = [
  {
    name: "instagram",
    icon: "/icons/instagram.svg",
    href: "https://www.instagram.com/mpkosis48",
  },
  {
    name: "youtube",
    icon: "/icons/youtube.svg",
    href: "https://youtube.com/@smanegeri48jakarta",
  },
  {
    name: "tiktok",
    icon: "/icons/tiktok.svg",
    href: "https://www.tiktok.com/@mpkosis48",
  },
];

export function Footer() {
  return (
    <footer className="md:flex items-center justify-center py-8 gap-8 bg-bw space-y-6">
      <div className="flex gap-6 items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.1, y: -8 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <Link
            href="https://eyesonme48.vercel.app"
            className="after:content-none hover:after:content-none focus:after:content-none"
            target="_blank"
          >
            <Image
              src="/logo/eyesonme.svg"
              alt="Eyes on Me Logo"
              width={60}
              height={60}
            />
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1, y: -8 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <Link
            href="https://sman48-jkt.sch.id"
            className="after:content-none hover:after:content-none focus:after:content-none"
            target="_blank"
          >
            <Image
              src="/logo/sman48.png"
              alt="SMAN 48 Jakarta Logo"
              width={60}
              height={60}
            />
          </Link>
        </motion.div>
      </div>
      <div className="space-y-6">
        <div className="text-center md:text-left">
          <p>Copyright © {new Date().getFullYear()} OSIS SMAN 48 Jakarta.</p>
          <p>All rights reserved.</p>
        </div>
        <div className="flex justify-center md:justify-start gap-4">
          {links.map((item, index) => (
            <motion.div
              className="flex items-center justify-center "
              key={index}
              whileHover={{ scale: 1.1, y: -8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Link
                className="after:content-none hover:after:content-none focus:after:content-none"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={item.icon} alt="eyesonme" width={24} height={24} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </footer>
  );
}
