import { getComments } from "@/app/actions/comment";
import { getNewsById } from "@/app/actions/news";
import { CommentForm, DisplayComment } from "@/components/news/comment";
import { LikeNews, ShareNews } from "@/components/news/cta";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MessageSquareIcon, UserIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsById(slug[0]);

  if (!news?.data) return { title: "Berita Tidak Ditemukan" };

  return {
    title: news.data.title + " | Harsanala Xayasadha",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  const news = await getNewsById(slug[0]);
  if (!news?.data) notFound();

  if (!slug[1])
    redirect(
      `/berita/${news.data.id}/${news.data.title.toLowerCase().replace(/ /g, "-")}`,
    );

  const comments = await getComments(news.data.id!);

  return (
    <div className="container space-y-2 py-12 md:py-24">
      <header className="space-y-3">
        <Badge>
          {news.data.category.charAt(0).toUpperCase() +
            news.data.category.slice(1)}
        </Badge>
        <h1>{news.data.title}</h1>
      </header>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 text-sm border-t py-4">
        <div className="flex flex-wrap gap-4">
          <span className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <time>{news.data.timestamp}</time>
          </span>
          <span className="flex items-center gap-2">
            <UserIcon className="w-4 h-4" />
            {news.data.author}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <LikeNews newsId={news.data.id!} likes={news.data.likes} />
          <ShareNews title={news.data.title} />
        </div>
      </div>

      <article className="space-y-8" aria-labelledby="article-title">
        <figure className="my-8">
          <Image
            src={news.data.image_url}
            alt={`Gambar ${news.data.title}`}
            width={1200}
            height={675}
            className="w-full aspect-video rounded-base object-cover"
            priority
          />
        </figure>

        <div className="text-muted font-medium">
          <p>{news.data.content}</p>
        </div>
      </article>

      <section aria-labelledby="comments-title" className="pt-16">
        <h4 id="comments-title" className="mb-6 flex gap-4 items-center">
          Komentar
          <MessageSquareIcon />
        </h4>

        <CommentForm newsId={news.data.id!} />

        <div className="mt-8 space-y-6">
          {Array.isArray(comments.data) &&
            comments.data.map((comment, index) => (
              <DisplayComment
                key={index}
                data={JSON.parse(JSON.stringify(comment))}
              />
            ))}
        </div>
      </section>
    </div>
  );
}
