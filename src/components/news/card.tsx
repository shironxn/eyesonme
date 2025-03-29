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
import Image from "next/image";
import { useRouter } from "next/navigation";

export function CardNews({ data }: { data: News }) {
  const router = useRouter();

  return (
    <Card className="flex flex-col h-[450px]">
      <CardHeader className="flex-1 space-y-3 overflow-hidden p-4">
        <div className="relative w-full h-48 overflow-hidden rounded-md">
          <Image
            src={data.images[0]}
            alt={data.title}
            width={500}
            height={300}
            className="w-full h-full object-fill"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.jpg";
            }}
          />
        </div>
        <div>
          <Badge>
            {data.category.charAt(0).toUpperCase() + data.category.slice(1)}
          </Badge>
        </div>

        <CardTitle
          className="line-clamp-2 text-lg cursor-pointer hover:text-main"
          onClick={() =>
            router.push(
              `/berita/${data.id}/${data.title.toLowerCase().replace(/ /g, "-")}`,
            )
          }
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
  );
}
