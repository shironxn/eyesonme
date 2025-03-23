import * as motion from "motion/react-client";
import Image from "next/image";

const visi =
  "Mewujudkan Generasi yang Sehat, Mandiri, ber Akhlak Mulia, Responsif, Terdepan dan Berwawasan Global (SMART-G).";

const misi = [
  "Membudayakan sikap religius beriman dan bertaqwa",
  "Memperkuat nilai budaya dan karakter bangsa",
  "Memperkuat nilai-nilai kebangsaan atas keberagaman Indonesia dengan menghargai orang lain",
  "Peduli sesama, membentuk kerjasama dan bergotong royong",
  "Memberikan layanan pendidikan yang bermutu",
  "Optimalisasi 8 standar Pendidikan Nasional",
  "Meningkatkan prestasi akademik dan non akademik",
  "Manajemen sekolah bersih, transparan, dan profesional",
  "Menanamkan jiwa kewirausahaan",
  "Meningkatkan dukungan orang tua dan masyarakat",
  "Menjalin kerjasama dengan sekolah, Perguruan Tinggi, dan Lembaga dalam serta luar negeri",
  "Membiasakan berperilaku hidup bersih dan sehat",
  "Menciptakan lingkungan yang nyaman dan asri",
];

export default function VisiMisiSection() {
  return (
    <section
      className="py-12 md:py-24 bg-main rounded-b-[48px] md:rounded-b-[96px] relative"
      id="visi-misi"
    >
      <div className="container space-y-12 z-10 relative">
        <motion.div
          className="flex flex-col-reverse md:flex-row gap-4 md:gap-12 items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="rounded-base border-border border-2 shadow-shadow p-6 bg-bg w-full">
            <p>{visi}</p>
          </div>
          <h2>Visi</h2>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-4 md:gap-12 items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <h2>Misi</h2>
          <div className="rounded-base border-border border-2 shadow-shadow p-6 bg-bg w-full">
            <ol className="list-decimal list-inside space-y-2">
              {misi.map((item, index) => (
                <li key={index} className="gap-3 flex items-start">
                  <span>{index + 1}.</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
      <Image
        src="/beranda/shape-1.svg"
        alt="Decorative shape 1"
        width={200}
        height={200}
        className="hidden lg:block absolute top-16 -translate-x-12 xl:-translate-x-8"
      />
      <Image
        src="/beranda/shape-2.svg"
        alt="Decorative shape 2"
        width={100}
        height={100}
        className="hidden lg:block absolute top-[50%] translate-y-8 left-10 xl:translate-y-24"
      />
      <Image
        src="/beranda/shape-3.svg"
        alt="Decorative shape 3"
        width={100}
        height={100}
        className="hidden lg:block absolute bottom-8 right-0 -translate-x-10 -translate-y-8"
      />
    </section>
  );
}
