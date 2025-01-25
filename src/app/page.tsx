import { BerandaCTA } from "@/components/beranda/cta";
import Image from "next/image";
import Marquee from "@/components/ui/marquee";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import * as motion from "motion/react-client";

const welcomes = [
  "welcome",
  "selamat datang",
  "bienvenue",
  "benvenuto",
  "willkommen",
  "welkom",
  "välkommen",
  "witaj",
  "bem-vindo",
  "добро пожаловать",
  "ยินดีต้อนรับ",
  "karşılama",
  "hoş geldiniz",
  "欢迎",
  "환영",
  "歓迎",
];

const visi =
  "Mewujudkan Generas yang Sehat, Mandiri, ber Akhlak Mulia, Responsif, Terdepan dan Berwawasan Global (SMART-G).";

const misi = [
  "Membudayakan sikap religius beriman dan bertaqwa.",
  "Memperkuat nilai budaya dan karakter bangsa.",
  "Memperkuat nilai-nilai kebangsaan atas keberagaman Indonesia dengan menghargai orang lain.",
  "Peduli sesama, membentuk kerjasama dan bergotong royong.",
  "Memberikan layanan pendidikan yang bermutu.",
  "Optimalisasi 8 standar Pendidikan Nasional.",
  "Meningkatkan prestasi akademik dan non akademik.",
  "Manajemen sekolah bersih, transparan, dan profesional.",
  "Menanamkan jiwa kewirausahaan.",
  "Meningkatkan dukungan orang tua dan masyarakat.",
  "Menjalin kerjasama dengan sekolah, Perguruan Tinggi, dan Lembaga dalam serta luar negeri.",
  "Membiasakan berperilaku hidup bersih dan sehat.",
  "Menciptakan lingkungan yang nyaman dan asri.",
];

const berita = [
  {
    id: 1,
    title: "OSIS Gelar Lomba Kebersihan Antar Kelas",
    description:
      "Lomba kebersihan antar kelas berlangsung seru. Kelas XII IPA 2 keluar sebagai juara!",
    thumbnail: "/image.jpg",
  },
  {
    id: 2,
    title: "OSIS Gelar Lomba Kebersihan Antar Kelas",
    description:
      "Lomba kebersihan antar kelas berlangsung seru. Kelas XII IPA 2 keluar sebagai juara!",
    thumbnail: "/image.jpg",
  },
  {
    id: 3,
    title: "OSIS Gelar Lomba Kebersihan Antar Kelas",
    description:
      "Lomba kebersihan antar kelas berlangsung seru. Kelas XII IPA 2 keluar sebagai juara!",
    thumbnail: "/image.jpg",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="py-12 md:py-24 bg-bg overflow-x-hidden">
        <div
          className="container mx-auto flex flex-col-reverse lg:flex-row justify-between items-center gap-8 md:gap-16"
          data-aos="zoom-out"
        >
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-4 text-main">
              <h1>Harsanala Xayasadha</h1>
              <p className="text-lg md:text-2xl">
                MPK-OSIS SMA Negeri 48 Jakarta Periode 2024/2025
              </p>
            </div>
            <div className="flex justify-center lg:justify-start gap-4">
              <BerandaCTA />
            </div>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end w-1/2">
            <Image
              src={"/logo/eyesonme.svg"}
              alt="eyesonme"
              width={250}
              height={250}
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Marquee Section */}
      <div>
        <Marquee items={welcomes} />
      </div>

      {/* Tentang Kami Section */}
      <div
        className="bg-main text-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] 
  dark:bg-[linear-gradient(to_right,#00000030_1px,transparent_1px),linear-gradient(to_bottom,#00000030_1px,transparent_1px)] 
  bg-[size:70px_70px] pb-12 border-b-2 border-black md:gap-16 py-12 md:py-24"
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div
            className="flex flex-col justify-center text-center md:items-start md:text-left"
            data-aos="fade-up"
          >
            <h2>Tentang Kami</h2>
            <p>
              OSIS SMAN 48 Jakarta adalah wadah bagi siswa untuk mengembangkan
              karakter, kreativitas, dan kepemimpinan, sekaligus menjadi pelopor
              perubahan positif di sekolah.
            </p>
          </div>
          <div className="space-y-4 md:space-y-8">
            <div
              className="shadow-accent shadow-[4px_6px_0px_#000] rounded-base border-2 border-accent"
              data-aos="fade-up"
            >
              <Image
                src={"/beranda/image1.jpg"}
                alt="image"
                width={500}
                height={500}
                className="w-full h-auto rounded-base grayscale hover:grayscale-0 transition-all duration-300 ease-in-out"
              />
            </div>

            <div className="relative">
              <div
                className="shadow-accent shadow-[4px_6px_0px_#000] rounded-base border-2 border-accent"
                data-aos="fade-up"
              >
                <Image
                  src={"/beranda/image2.jpg"}
                  alt="image"
                  width={500}
                  height={500}
                  className="w-full h-auto rounded-base grayscale hover:grayscale-0 transition-all duration-300 ease-in-out"
                />
              </div>

              <Image
                src={"/beranda/spark.svg"}
                alt="spark"
                width={100}
                height={100}
                className="w-1/6 md:w-1/5 h-auto absolute -right-0 bottom-0 z-10 translate-x-7 md:translate-x-12 translate-y-8 md:translate-y-12"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Visi Misi Section */}
      <div
        className="py-12 md:py-24 bg-secondary rounded-b-[48px] md:rounded-b-[96px] relative"
        id="visi-misi"
      >
        <div className="container mx-auto space-y-12 z-10 relative">
          <motion.div
            className="flex flex-col-reverse md:flex-row gap-4 md:gap-12 items-center"
            data-aos="fade-up"
            whileHover={{
              scale: 1.1,
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="rounded-base border-border border-2 shadow-shadow p-6 bg-bg w-full">
              <p>{visi}</p>
            </div>
            <h2>Visi</h2>
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row gap-4 md:gap-12 items-center"
            data-aos="fade-up"
            whileHover={{
              scale: 1.1,
            }}
            transition={{ duration: 0.2 }}
          >
            <h2>Misi</h2>
            <div className="rounded-base border-border border-2 shadow-shadow p-6 bg-bg w-full">
              <ol className="list-decimal list-inside space-y-2">
                {misi.map((item, index) => (
                  <li key={index} className="gap-3 flex items-start ">
                    <span>{index + 1}.</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>
        <Image
          src={"/beranda/shape-1.svg"}
          alt="shape"
          width={200}
          height={200}
          className="hidden lg:block absolute top-16 -translate-x-12 xl:-translate-x-8"
        />
        <Image
          src={"/beranda/shape-2.svg"}
          alt="shape"
          width={100}
          height={100}
          className="hidden lg:block absolute top-[50%] translate-y-8 left-10 xl:translate-y-24"
        />
        <Image
          src={"/beranda/shape-3.svg"}
          alt="shape"
          width={100}
          height={100}
          className="hidden lg:block absolute bottom-8 right-0 -translate-x-10 -translate-y-8"
        />
      </div>

      {/* Berita Terbaru */}
      <div className="py-12 md:py-24">
        <div className="container mx-auto space-y-12">
          <div className="text-center" data-aos="fade-up">
            <h2>Berita Terbaru</h2>
            <p>
              Berita terkini seputar kegiatan, prestasi, dan acara OSIS SMAN 48
              Jakarta.
            </p>
          </div>
          <div
            className="flex overflow-x-scroll snap-x snap-mandatory flex-nowrap md:grid md:grid-cols-3 md:overflow-visible gap-8 no-scrollbar"
            data-aos="fade-up"
          >
            {berita.map((item, index) => (
              <motion.div
                key={index}
                className="snap-center shrink-0 w-full md:w-auto p-2"
                whileHover={{
                  scale: 1.1,
                }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <Image
                      src={item.thumbnail}
                      alt="thumbnail"
                      width={500}
                      height={500}
                    />
                    <Link
                      href={`/berita/${item.id}`}
                      className="cursor-pointer hover:text-secondary after:content-none hover:after:content-none focus:after:content-none`"
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
      </div>

      {/* Aspirasi Section */}
      <div className="py-12 md:py-24 bg-secondary rounded-t-[48px] md:rounded-t-[96px]">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="space-y-8">
            <div className="text-center md:text-left" data-aos="fade-up">
              <h2>Aspirasi</h2>
              <p>Sampaikan aspirasi Anda untuk membantu kami.</p>
            </div>
            <div className="flex justify-center md:hidden" data-aos="fade-up">
              <Image
                src="/beranda/berita.png"
                alt="berita"
                width={200}
                height={200}
              />
            </div>
            <div className="space-y-4" data-aos="fade-up">
              <Label htmlFor="aspirasi">Tulis aspirasi Anda</Label>
              <Textarea
                id="aspirasi"
                placeholder="Contoh: aku mw makan siang gratis"
              />
              <Button>Kirim</Button>
            </div>
          </div>

          <div className="hidden md:flex justify-center" data-aos="fade-up">
            <Image
              src="/beranda/berita.png"
              alt="berita"
              width={250}
              height={250}
            />
          </div>
        </div>
      </div>
    </>
  );
}
