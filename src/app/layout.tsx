import type { Metadata } from "next";
import { Public_Sans, Lexend, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/footer";
import AOSComponent from "@/hooks/aos";
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
  title: "Eyes On Me",
  description: "Official Website OSIS/MPK SMAN 48 Jakarta.",
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
        <AOSComponent>
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </AOSComponent>
      </body>
    </html>
  );
}
