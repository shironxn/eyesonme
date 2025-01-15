import { BerandaCTA } from "@/components/beranda/cta";
import Image from "next/image";
import Marquee from "@/components/ui/marquee";

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

export default function Home() {
  return (
    <>
      <div className="container mx-auto flex flex-col-reverse md:flex-row justify-between items-center gap-8 md:gap-16 py-12 md:py-24">
        {/* Text Section */}
        <div className="space-y-6 text-center md:text-left">
          <div className="space-y-4 text-main">
            <h1>Harsanala Xayasadha</h1>
            <p className="text-lg md:text-2xl">
              MPK-OSIS SMA Negeri 48 Jakarta Periode 2024/2025
            </p>
          </div>
          <div className="flex justify-center md:justify-start gap-4">
            <BerandaCTA />
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center md:justify-end w-1/2">
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={250}
            height={250}
            className="max-w-full h-auto"
          />
        </div>
      </div>

      {/* Marquee Section */}
      <Marquee items={welcomes} />

      <div
        className="bg-main text-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] 
  dark:bg-[linear-gradient(to_right,#00000030_1px,transparent_1px),linear-gradient(to_bottom,#00000030_1px,transparent_1px)] 
  bg-[size:70px_70px] pb-12 border-b-2 border-black md:gap-16 py-12 md:py-24"
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center text-center md:items-start md:text-left">
            <h2>Tentang Kami</h2>
            <p>
              OSIS SMAN 48 Jakarta adalah wadah bagi siswa untuk mengembangkan
              karakter, kreativitas, dan kepemimpinan, sekaligus menjadi pelopor
              perubahan positif di sekolah.
            </p>
          </div>
          <div className="space-y-4 md:space-y-8">
            <div className="shadow-accent shadow-[4px_6px_0px_#000] rounded-base border-2 border-accent">
              <Image
                src={"/image1.jpg"}
                alt="image"
                width={500}
                height={500}
                className="max-w-full h-auto rounded-base grayscale hover:grayscale-0 transition-all duration-300 ease-in-out"
              />
            </div>

            <div className="relative shadow-accent shadow-[4px_6px_0px_#000] rounded-base border-2 border-accent">
              <Image
                src={"/image2.jpg"}
                alt="image"
                width={500}
                height={500}
                className="max-w-full h-auto rounded-base grayscale hover:grayscale-0 transition-all duration-300 ease-in-out"
              />
              <div className="absolute top-32 -right-12">
                <Image
                  src={"/spark.svg"}
                  alt="spark"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
