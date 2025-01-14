"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
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
          <div className="flex flex-col gap-2 items-center pb-8">
            {links.map((item, index) => (
              <Link key={index} href={item.href}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
