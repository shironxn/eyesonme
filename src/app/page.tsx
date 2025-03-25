import AboutSection from "@/components/home/sections/about";
import AspirationSection from "@/components/home/sections/aspiration";
import HeroSection from "@/components/home/sections/hero";
import MarqueeSection from "@/components/home/sections/marquee";
import NewsSection from "@/components/home/sections/news";
import VisiMisiSection from "@/components/home/sections/visi-misi";

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
