import AspirasiSection from "@/components/beranda/sections/aspirasi";
import BeritaSection from "@/components/beranda/sections/berita";
import HeroSection from "@/components/beranda/sections/hero";
import MarqueeSection from "@/components/beranda/sections/marquee";
import TentangKamiSection from "@/components/beranda/sections/tentang-kami";
import VisiMisiSection from "@/components/beranda/sections/visi-misi";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <MarqueeSection />
      <TentangKamiSection />
      <VisiMisiSection />
      <BeritaSection />
      <AspirasiSection />
    </main>
  );
}
