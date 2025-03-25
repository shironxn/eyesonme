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

export default function MarqueeSection() {
  return (
    <section>
      <Marquee items={welcomes} />
    </section>
  );
}
