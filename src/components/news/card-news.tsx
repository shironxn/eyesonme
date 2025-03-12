"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { HeartIcon } from "lucide-react";

export interface CardNewsProps {
  id: string;
  title: string;
  description: string;
  author: string;
  content: string;
  likes: number;
  thumbnail: string;
  timestamp: string;
}

export function CardNews({ data }: { data: CardNewsProps }) {
  return (
    <Card>
      <CardHeader>
        <Image
          src={data.thumbnail}
          alt={data.title}
          width={500}
          height={500}
          className="w-full h-auto object-cover"
        />
        <div>
          <Badge className="">Pengumuman</Badge>
        </div>

        <Link
          href={`/berita/${data.title.toLowerCase().replace(/ /g, "-")}`}
          className="cursor-pointer hover:text-secondary after:content-none hover:after:content-none focus:after:content-none"
        >
          <CardTitle>{data.title}</CardTitle>
        </Link>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <small className="flex items-center gap-1">
          <HeartIcon className="h-4 w-4" /> {data.likes}
        </small>
        <small>{new Date(data.timestamp).toLocaleDateString("id")}</small>
      </CardFooter>
    </Card>
  );
}
