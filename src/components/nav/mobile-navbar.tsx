"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export function MobileNavbar({
  links,
}: {
  links: { name: string; href: string }[];
}) {
  return (
    <div className="block md:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <Button>
            <MenuIcon />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-[300px]">
            <DrawerHeader>
              <DrawerTitle></DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col gap-4 pb-8">
              {links.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-xl after:content-none hover:after:content-none focus:after:content-none hover:text-main"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
