"use client";

import { HomeCTA } from "@/components/home/cta";
import { motion } from "framer-motion";
import Image from "next/image";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: "easeInOut" },
  },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 1.2 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut", delay: 0.3 },
  },
};

export default function HeroSection() {
  return (
    <section className="py-12 md:py-24 bg-bg overflow-x-hidden">
      <div className="container flex flex-col-reverse lg:flex-row justify-between items-center gap-8 md:gap-16">
        <div className="space-y-6 text-center lg:text-left">
          <motion.div
            className="space-y-4 text-secondary"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
          >
            <h1>Harsanala Xayasadha</h1>
            <p>MPK-OSIS SMA Negeri 48 Jakarta Periode 2024/2025</p>
          </motion.div>
          <motion.div
            className="flex justify-center lg:justify-start gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            transition={{ delay: 0.4 }}
          >
            <HomeCTA />
          </motion.div>
        </div>
        <motion.div
          className="flex-1 flex justify-center lg:justify-end w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={logoVariants}
        >
          <Image
            src="/logo/eyesonme.svg"
            alt="Eyes on Me Logo"
            width={250}
            height={250}
            className="max-w-full h-auto"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
