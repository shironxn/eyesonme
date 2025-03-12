import { CardNews, CardNewsProps } from "@/components/news/card-news";
import * as motion from "motion/react-client";

const berita: CardNewsProps[] = [
  {
    id: "1",
    title: "OSIS Gelar Lomba Kebersihan Antar Kelas",
    description:
      "Lomba kebersihan antar kelas berlangsung seru. Kelas XII IPA 2 keluar sebagai juara!",
    author: "Admin OSIS",
    content:
      "OSIS mengadakan lomba kebersihan antar kelas untuk meningkatkan kesadaran siswa terhadap lingkungan yang bersih dan nyaman. Setelah melalui penilaian ketat, kelas XII IPA 2 dinobatkan sebagai pemenang.",
    thumbnail: "/beranda/image.jpg",
    likes: 10,
    timestamp: "2025-03-12T08:30:00Z",
  },
  {
    id: "2",
    title: "Siswa SMAN 48 Berhasil Raih Juara Olimpiade Matematika",
    description:
      "Salah satu siswa SMAN 48 berhasil meraih juara dalam Olimpiade Matematika tingkat nasional.",
    author: "Tim OSIS",
    content:
      "Prestasi membanggakan datang dari siswa kelas XI MIPA 1, yang berhasil membawa pulang medali emas dalam Olimpiade Matematika tingkat nasional. Kompetisi ini diikuti oleh ratusan peserta dari berbagai sekolah di Indonesia.",
    thumbnail: "/beranda/image.jpg",
    likes: 25,
    timestamp: "2025-03-10T14:00:00Z",
  },
  {
    id: "3",
    title: "SMAN 48 Adakan Seminar Karir dengan Alumni",
    description:
      "Alumni SMAN 48 berbagi pengalaman karir dan tips sukses di dunia kerja.",
    author: "Panitia Seminar",
    content:
      "Seminar ini menghadirkan beberapa alumni yang telah sukses di berbagai bidang, mulai dari teknologi hingga bisnis. Mereka membagikan pengalaman dan motivasi kepada para siswa kelas 12 yang bersiap menghadapi dunia perkuliahan dan kerja.",
    thumbnail: "/beranda/image.jpg",
    likes: 18,
    timestamp: "2025-03-05T10:00:00Z",
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
        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible gap-4 no-scrollbar">
          {berita.map((item) => (
            <motion.div
              key={item.id}
              className="snap-center shrink-0 w-full md:w-auto p-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <CardNews data={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
