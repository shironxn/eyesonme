import { getComments } from "@/app/actions/comment";
import { getNewsById } from "@/app/actions/news";
import { NewsCarousel } from "@/components/news/carousel";
import { CommentForm, DisplayComment } from "@/components/news/comment";
import {
  DeleteNews,
  LikeNews,
  ShareNews,
  UpdateNews,
} from "@/components/news/cta";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import {
  CalendarIcon,
  MessageSquareIcon,
  TriangleAlertIcon,
  UserIcon,
} from "lucide-react";
import { Metadata } from "next";
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

  const session = await auth();

  const news = await getNewsById(slug[0]);
  if (!news?.data) notFound();

  const comments = await getComments(news.data.id!);

  if (!slug[1]) {
    redirect(
      `/berita/${news.data.id}/${news.data.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")}`,
    );
  }

  return (
    <div className="container py-12 space-y-8">
      <header className="space-y-4 pb-4 border-b">
        <Badge>
          {news.data.category.charAt(0).toUpperCase() +
            news.data.category.slice(1)}
        </Badge>
        <h1>{news.data.title}</h1>
      </header>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-sm text-muted">
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
        <div className="flex items-center gap-3">
          {session?.user && (
            <>
              <UpdateNews newsId={news.data.id!} />
              <DeleteNews newsId={news.data.id!} />
            </>
          )}

          <LikeNews newsId={news.data.id!} likes={news.data.likes} />
          <ShareNews title={news.data.title} />
        </div>
      </div>

      <article className="space-y-8 pb-8 border-b">
        {Array.isArray(news.data.images) && (
          <figure className="my-6">
            <NewsCarousel images={news.data.images} />
          </figure>
        )}
        <div
          className="prose font-medium text-muted"
          dangerouslySetInnerHTML={{
            __html: news?.data?.content,
          }}
        />
      </article>

      <section className="pt-8">
        {comments.success ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold">Komentar</h2>
              <MessageSquareIcon />
            </div>

            <CommentForm newsId={news.data.id!} />

            <ul className="space-y-4">
              {Array.isArray(comments.data) &&
                comments.data.map((comment, index) => (
                  <li key={index}>
                    <DisplayComment
                      data={JSON.parse(JSON.stringify(comment))}
                    />
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <Alert variant="destructive">
            <TriangleAlertIcon className="h-4 w-4" color="white" />
            <AlertTitle>{comments.message}</AlertTitle>
            <AlertDescription>{comments.details}</AlertDescription>
          </Alert>
        )}
      </section>
    </div>
  );
}
