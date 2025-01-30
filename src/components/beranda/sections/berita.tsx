import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";

const berita = [
  {
    id: 1,
    title: "OSIS Gelar Lomba Kebersihan Antar Kelas",
    description:
      "Lomba kebersihan antar kelas berlangsung seru. Kelas XII IPA 2 keluar sebagai juara!",
    thumbnail: "/beranda/image.jpg",
  },
  {
    id: 2,
    title: "OSIS Gelar Lomba Kebersihan Antar Kelas",
    description:
      "Lomba kebersihan antar kelas berlangsung seru. Kelas XII IPA 2 keluar sebagai juara!",
    thumbnail: "/beranda/image.jpg",
  },
  {
    id: 3,
    title: "OSIS Gelar Lomba Kebersihan Antar Kelas",
    description:
      "Lomba kebersihan antar kelas berlangsung seru. Kelas XII IPA 2 keluar sebagai juara!",
    thumbnail: "/beranda/image.jpg",
  },
];

export default function BeritaSection() {
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
        <div className="flex overflow-x-auto snap-x snap-mandatory flex-nowrap md:grid md:grid-cols-3 md:overflow-visible gap-8 no-scrollbar">
          {berita.map((item) => (
            <motion.div
              key={item.id}
              className="snap-center shrink-0 w-full md:w-auto p-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={500}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                  <Link
                    href={`/berita/${item.id}`}
                    className="cursor-pointer hover:text-secondary after:content-none hover:after:content-none focus:after:content-none"
                  >
                    <CardTitle>{item.title}</CardTitle>
                  </Link>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
