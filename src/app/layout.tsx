import type { Metadata } from "next";
import { Public_Sans, Lexend, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Harsanala Xayasadha - MPK-OSIS SMA Negeri 48 Jakarta",
  description:
    "MPK-OSIS SMA Negeri 48 Jakarta Periode 2024/2025 - Wadah pengembangan karakter, kreativitas, dan kepemimpinan siswa.",
  openGraph: {
    title: "Harsanala Xayasadha - MPK-OSIS SMA Negeri 48 Jakarta",
    description:
      "MPK-OSIS SMA Negeri 48 Jakarta Periode 2024/2025 - Wadah pengembangan karakter, kreativitas, dan kepemimpinan siswa.",
    images: [
      {
        url: "/image1.jpg",
        width: 1200,
        height: 630,
        alt: "Harsanala Xayasadha",
      },
    ],
  },
  metadataBase: new URL("https://eyesonme.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.variable} ${lexend.variable} ${poppins.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
