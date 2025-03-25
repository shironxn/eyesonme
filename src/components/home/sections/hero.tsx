import Image from "next/image";
import { HomeCTA } from "@/components/home/cta";

export default function HeroSection() {
  return (
    <section className="py-12 md:py-24 bg-bg overflow-x-hidden">
      <div className="container flex flex-col-reverse lg:flex-row justify-between items-center gap-8 md:gap-16">
        <div className="space-y-6 text-center lg:text-left">
          <div className="space-y-4">
            <h1>Harsanala Xayasadha</h1>
            <p>MPK-OSIS SMA Negeri 48 Jakarta Periode 2024/2025</p>
          </div>
          <div className="flex justify-center lg:justify-start gap-4">
            <HomeCTA />
          </div>
        </div>
        <div className="flex-1 flex justify-center lg:justify-end w-1/2">
          <Image
            src="/logo/eyesonme.svg"
            alt="Eyes on Me Logo"
            width={250}
            height={250}
            className="max-w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
