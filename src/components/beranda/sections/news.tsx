import { getNews } from "@/app/actions/news";
import NotFound from "@/app/not-found";
import { CardNews } from "@/components/news/card";
import * as motion from "motion/react-client";

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
        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible gap-4 no-scrollbar">
          {Array.isArray(news.data) &&
            news.data.map((item) => (
              <motion.div
                key={item.id}
                className="snap-center shrink-0 w-full md:w-auto p-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <CardNews data={JSON.parse(JSON.stringify(item))} />
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
