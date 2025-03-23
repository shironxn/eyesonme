import AboutSection from "@/components/beranda/sections/about";
import AspirationSection from "@/components/beranda/sections/aspiration";
import HeroSection from "@/components/beranda/sections/hero";
import MarqueeSection from "@/components/beranda/sections/marquee";
import NewsSection from "@/components/beranda/sections/news";
import VisiMisiSection from "@/components/beranda/sections/visi-misi";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <VisiMisiSection />
      <NewsSection />
      <AspirationSection />
    </main>
  );
}
