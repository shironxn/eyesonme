import { CardNews } from "@/components/news/card";
import { FilterNews } from "@/components/news/filter";
import { SearchNews } from "@/components/news/search";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getNews } from "../actions/news";
import NotFound from "../not-found";

export default async function News(props: {
  searchParams?: Promise<{
    search?: string;
    filter?: string[];
  }>;
}) {
  const news = await getNews();
  if (!news.data) NotFound();

  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const filters = searchParams?.filter || [];

  const filteredNews = news.data?.filter((item) => {
    return (
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (filters.length === 0 || filters.includes(item.category.toLowerCase()))
    );
  });

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <SearchNews />
          <FilterNews />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {Array.isArray(filteredNews) &&
            filteredNews.map((item, index) => (
              <CardNews key={index} data={JSON.parse(JSON.stringify(item))} />
            ))}
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="hidden md:inline-block">
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
