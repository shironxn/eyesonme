import { CardNews, CardNewsProps } from "@/components/news/card-news";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SearchIcon } from "lucide-react";

export default async function Berita() {
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

  return (
    <div className="container py-12 md:py-24 space-y-12">
      <div className="bg-main text-text p-8 rounded-base">
        <h1>Berita</h1>
        <p>
          Informasi terkini seputar kegiatan, prestasi, dan acara OSIS SMAN 48
          Jakarta.
        </p>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-4">
          <Button variant={"neutral"}>Semua</Button>
          <Button variant={"neutral"}>Kegiatan</Button>
          <Button variant={"neutral"}>Prestasi</Button>
          <Button variant={"neutral"}>Pengumuman</Button>
        </div>

        <div className="flex gap-4">
          <Input placeholder="Cari" />
          <Button size={"icon"}>
            <SearchIcon />
          </Button>
        </div>
      </div>

      <div className="grid grid-row md:grid-cols-3 gap-8">
        {berita.map((item, index) => (
          <CardNews key={index} data={item} />
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
          <div className="items-center md:flex hidden">
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
          </div>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
