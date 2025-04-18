import { CardNews } from "@/components/news/card";
import { FilterNews } from "@/components/news/filter";
import { NewsPagination } from "@/components/news/pagination";
import { SearchNews } from "@/components/news/search";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { getNews } from "@/app/actions/news";
import Image from "next/image";

export default async function News(props: {
  searchParams?: Promise<{
    search?: string;
    filter?: string[];
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const filters = searchParams?.filter || [];
  const page = Number(searchParams?.page || 1);

  const news = await getNews({
    limitNews: 3,
    search,
    filters,
    page,
  });

  const session = await auth();

  return (
    <div className="min-h-screen">
      <div className="bg-bw">
        <div className="container py-12 md:py-16 lg:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center md:order-last">
              <Image
                src="/news/illustration.svg"
                width={400}
                height={400}
                alt="News illustration"
                className="w-full max-w-[250px] md:max-w-[400px]"
                priority
              />
            </div>

            <div className="space-y-4 text-secondary text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl">
                Berita Terkini
              </h1>
              <p className="text-base md:text-lg max-w-2xl mx-auto md:mx-0">
                Kabar terbaru seputar pengumuman, prestasi, dan acara seru OSIS
                SMAN 48 Jakarta.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <div className="w-full md:w-[400px]">
            <SearchNews />
          </div>
          <div className="flex flex-wrap items-center gap-3 md:gap-4 w-full md:w-auto justify-between md:justify-end">
            <FilterNews />
            {session?.user && (
              <Link href="/berita/add">
                <Button size="icon" className="h-10 w-10">
                  <PlusIcon className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container pb-16 md:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {Array.isArray(news.data) && news.data.length > 0 ? (
            news.data.map((item, index) => (
              <CardNews
                key={index}
                data={JSON.parse(JSON.stringify(item))}
                index={index}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">
                Tidak ada berita yang ditemukan
              </p>
            </div>
          )}
        </div>

        {news.data && news.totalPages > 1 && (
          <div className="flex justify-center mt-8 md:mt-12">
            <NewsPagination totalPages={news.totalPages} />
          </div>
        )}
      </div>
    </div>
  );
}
