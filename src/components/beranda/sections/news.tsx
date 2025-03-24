import { getNews } from "@/app/actions/news";
import NotFound from "@/app/not-found";
import { CardNews } from "@/components/news/card";

export default async function NewsSection() {
  const news = await getNews(3);
  if (!news.data) NotFound();

  return (
    <section className="py-12 md:py-24">
      <div className="container space-y-12">
        <div className="text-center">
          <h2>Berita Terbaru</h2>
          <p>
            Berita terkini seputar kegiatan, prestasi, dan acara OSIS SMAN 48
            Jakarta.
          </p>
        </div>
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 snap-x snap-mandatory md:overflow-visible no-scrollbar">
          {Array.isArray(news.data) &&
            news.data.map((item, index) => (
              <div
                key={index}
                className={`snap-center shrink-0 w-full md:w-auto p-2 ${index === 2 && "md:col-span-2 md:mx-auto lg:col-span-1 lg:mx-0"}`}
              >
                <CardNews data={JSON.parse(JSON.stringify(item))} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
