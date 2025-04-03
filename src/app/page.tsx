import AboutSection from "@/components/home/sections/about";
import AspirationSection from "@/components/home/sections/aspiration";
import HeroSection from "@/components/home/sections/hero";
import MarqueeSection from "@/components/home/sections/marquee";
import NewsSection from "@/components/home/sections/news";
import VisiMisiSection from "@/components/home/sections/visi-misi";
import { getNews } from "@/app/actions/news";
import { notFound } from "next/navigation";

export default async function Home() {
  const news = await getNews({
    limitNews: 3,
  });
  if (!news.data) notFound();

  return (
    <main className="overflow-hidden">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <VisiMisiSection />
      <NewsSection news={news.data} />
      <AspirationSection />
    </main>
  );
}
