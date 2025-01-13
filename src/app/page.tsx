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
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Harsanala Xayasadha
            </h1>
            <p className="text-base md:text-lg xl:text-2xl">
              MPK-OSIS SMA Negeri 48 Jakarta Periode 2024/2025
            </p>
          </div>
          <div className="flex justify-center md:justify-start gap-4">
            <BerandaCTA />
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center md:justify-end">
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
    </>
  );
}
