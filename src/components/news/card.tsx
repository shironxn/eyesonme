"use client";

import type { News } from "@/app/actions/news";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartIcon } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.15,
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
  hover: {
    scale: 1.03,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

export function CardNews({ data, index }: { data: News; index: number }) {
  const router = useRouter();

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover="hover"
      whileTap="tap"
      variants={cardVariants}
    >
      <Card className="flex flex-col h-[450px]">
        <CardHeader className="flex-1 space-y-3 overflow-hidden p-4">
          <div className="relative w-full h-48 overflow-hidden rounded-md">
            <Image
              src={data.images[0]}
              alt={data.title}
              width={500}
              height={300}
              className="w-full h-full object-fill"
            />
          </div>
          <div>
            <Badge>
              {data.category.charAt(0).toUpperCase() + data.category.slice(1)}
            </Badge>
          </div>

          <CardTitle
            className="line-clamp-2 text-lg cursor-pointer hover:text-main"
            onClick={() => {
              router.push(
                `/berita/${data.id}/${data.title
                  .toLowerCase()
                  .replace(/[^\w\s-]/g, "")
                  .replace(/\s+/g, "-")}`,
              );
            }}
          >
            {data.title}
          </CardTitle>

          <CardDescription className="line-clamp-3">
            {data.content.replace(/<[^>]+>/g, "\n")}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between mt-auto border-t p-4">
          <small className="flex items-center gap-1">
            <HeartIcon className="h-4 w-4" /> {data.likes}
          </small>
          <small>{data.timestamp}</small>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
