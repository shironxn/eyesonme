import { CardNews } from "@/components/news/card";
import { FilterNews } from "@/components/news/filter";
import { NewsPagination } from "@/components/news/pagination";
import { SearchNews } from "@/components/news/search";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { getNews } from "../actions/news";

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
    <div>
      <div className="bg-secondary text-white py-12">
        <div className="container space-y-2">
          <h1>Berita</h1>
          <p>
            Informasi terkini seputar kegiatan, prestasi, dan acara OSIS SMAN 48
            Jakarta.
          </p>
        </div>
      </div>

      <div className="container space-y-12 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <SearchNews />

          <div className="flex gap-4">
            <FilterNews />

            {session?.user && (
              <Link href="/berita/add">
                <Button size="icon">
                  <PlusIcon />
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {Array.isArray(news.data) &&
            news.data.map((item, index) => (
              <CardNews key={index} data={JSON.parse(JSON.stringify(item))} />
            ))}
        </div>

        {news.data && news.totalPages > 1 && (
          <NewsPagination totalPages={news.totalPages} />
        )}
      </div>
    </div>
  );
}
