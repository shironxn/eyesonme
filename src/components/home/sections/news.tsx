"use client";

import { News } from "@/app/actions/news";
import { CardNews } from "@/components/news/card";
import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

export default function NewsSection({ news }: { news: News[] }) {
  return (
    <section className="py-12 md:py-24">
      <div className="container space-y-12">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={textVariants}
        >
          <h2>Berita Terbaru</h2>
          <p>
            Berita terkini seputar kegiatan, prestasi, dan acara OSIS SMAN 48
            Jakarta.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Array.isArray(news) &&
            news.map((item, index) => (
              <motion.div key={index} className="w-full h-full">
                <CardNews
                  data={JSON.parse(JSON.stringify(item))}
                  index={index}
                />
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
