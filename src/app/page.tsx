import { BerandaCTA } from "@/components/beranda/cta";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto flex justify-between items-center md:py-24 xl:py-48">
      <div className="space-y-6">
        <div className="space-y-4 text-main">
          <h1 className="text-6xl font-black">Harsanala Xayasadha</h1>
          <p className="text-lg md:text-2xl">
            MPK-OSIS SMA Negeri 48 Jakarta Periode 2024/2025
          </p>
        </div>
        <div className="flex gap-4">
          <BerandaCTA />
        </div>
      </div>
      <div>
        <Image src={"/logo.svg"} alt="logo" width={250} height={250} />
      </div>
    </div>
  );
}
