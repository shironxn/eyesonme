import { getNewsById } from "@/app/actions/news";
import NewsForm from "@/components/news/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const news = await getNewsById(id);

  if (!news?.data) return { title: "Berita Tidak Ditemukan" };

  return {
    title: news.data.title + " | Harsanala Xayasadha",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const news = await getNewsById(id);
  if (!news?.data) notFound();

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen space-y-8 py-12 md:py-24">
      <Card className="w-full max-w-xl">
        <CardHeader className="bg-bw">
          <CardTitle className="text-3xl">Edit Berita</CardTitle>
          <CardDescription>Silakan isi form di bawah ini</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="mt-8">
          <NewsForm data={news.data} />
        </CardContent>
      </Card>
    </div>
  );
}
