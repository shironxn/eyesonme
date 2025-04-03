"use client";

import { FormAspiration } from "@/components/home/aspiration";
import { motion } from "framer-motion";
import Image from "next/image";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.2,
    },
  },
  hover: {
    scale: 1.1,
    rotate: 3,
    filter: "brightness(1.05)",
    transition: { duration: 0.4 },
  },
};

const formVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
      delay: 0.4,
    },
  },
};

export default function AspirationSection() {
  return (
    <section className="py-12 md:py-24 bg-main rounded-t-[48px] md:rounded-t-[96px] overflow-hidden">
      <div className="container grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
        <div className="space-y-8 md:space-y-12">
          <motion.div
            className="text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
          >
            <h2>Aspirasi</h2>
            <p>Sampaikan aspirasi Anda.</p>
          </motion.div>

          <motion.div
            className="flex justify-center md:hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover="hover"
            variants={imageVariants}
          >
            <Image
              src="/home/aspiration.png"
              alt="Ilustrasi Aspirasi"
              width={200}
              height={200}
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={formVariants}
          >
            <FormAspiration />
          </motion.div>
        </div>

        <motion.div
          className="hidden md:flex justify-center items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover="hover"
          variants={imageVariants}
        >
          <Image
            src="/home/aspiration.png"
            alt="Ilustrasi Aspirasi"
            width={250}
            height={250}
          />
        </motion.div>
      </div>
    </section>
  );
}
