"use client";

import { News } from "@/app/actions/news";
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
import Link from "next/link";

export function CardNews({ data }: { data: News }) {
  return (
    <Card>
      <CardHeader>
        <Image
          src={data.images[0]}
          alt={data.title}
          width={500}
          height={500}
          className="w-full h-auto object-cover"
        />
        <div>
          <Badge>
            {data.category.charAt(0).toUpperCase() + data.category.slice(1)}
          </Badge>
        </div>

        <Link
          href={`/berita/${data.id}/${data.title.toLowerCase().replace(/ /g, "-")}`}
          className="cursor-pointer hover:text-main after:content-none hover:after:content-none focus:after:content-none"
        >
          <CardTitle>{data.title}</CardTitle>
        </Link>
        <CardDescription className="line-clamp-3">
          {data.content}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <small className="flex items-center gap-1">
          <HeartIcon className="h-4 w-4" /> {data.likes}
        </small>
        <small>{data.timestamp}</small>
      </CardFooter>
    </Card>
  );
}
