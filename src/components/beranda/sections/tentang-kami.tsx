import Image from "next/image";

export default function TentangKamiSection() {
  return (
    <section
      className="bg-main text-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] 
    dark:bg-[linear-gradient(to_right,#00000030_1px,transparent_1px),linear-gradient(to_bottom,#00000030_1px,transparent_1px)] 
    bg-[size:70px_70px] pb-12 border-b-2 border-black md:gap-16 py-12 md:py-24"
    >
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center text-center md:items-start md:text-left">
          <h2>Tentang Kami</h2>
          <p>
            MPK-OSIS SMA Negeri 48 Jakarta adalah wadah bagi siswa/i untuk
            mengembangkan karakter, kreativitas, dan kepemimpinan, sekaligus
            menjadi pelopor perubahan positif di sekolah.
          </p>
        </div>
        <div className="space-y-4 md:space-y-8">
          <div className="shadow-accent shadow-[4px_6px_0px_#000] rounded-base border-2 border-accent">
            <Image
              src="/beranda/image1.jpg"
              alt="MPK-OSIS SMA Negeri 48 Jakarta"
              width={500}
              height={500}
              className="w-full h-auto rounded-base grayscale hover:grayscale-0 transition-all duration-300 ease-in-out"
            />
          </div>
          <div className="relative">
            <div className="shadow-accent shadow-[4px_6px_0px_#000] rounded-base border-2 border-accent">
              <Image
                src="/beranda/image2.jpg"
                alt="MPK-OSIS SMA Negeri 48 Jakarta"
                width={500}
                height={500}
                className="w-full h-auto rounded-base grayscale hover:grayscale-0 transition-all duration-300 ease-in-out"
              />
            </div>
            <Image
              src="/beranda/spark.svg"
              alt="Spark decoration"
              width={100}
              height={100}
              className="w-1/6 md:w-1/5 h-auto absolute -right-0 bottom-0 z-10 translate-x-7 md:translate-x-12 translate-y-8 md:translate-y-12"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
