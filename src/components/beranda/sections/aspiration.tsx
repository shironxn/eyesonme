import { FormAspiration } from "@/components/beranda/aspiration";
import Image from "next/image";

export default function AspirationSection() {
  return (
    <section className="py-12 md:py-24 bg-main rounded-t-[48px] md:rounded-t-[96px]">
      <div className="container grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="space-y-8">
          <div className="text-center md:text-left">
            <h2>Aspirasi</h2>
            <p>Sampaikan aspirasi Anda.</p>
          </div>
          <div className="flex justify-center md:hidden">
            <Image
              src="/beranda/berita.png"
              alt="Ilustrasi Aspirasi"
              width={200}
              height={200}
            />
          </div>
          <FormAspiration />
        </div>
        <div className="hidden md:flex justify-center">
          <Image
            src="/beranda/berita.png"
            alt="Ilustrasi Aspirasi"
            width={250}
            height={250}
          />
        </div>
      </div>
    </section>
  );
}
