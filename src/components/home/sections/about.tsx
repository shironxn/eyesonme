"use client";

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
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay: i * 0.3, ease: "easeOut" },
  }),
  hover: {
    scale: 1.05,
    transition: {
      scale: { duration: 0.5, ease: "easeOut" },
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      scale: { duration: 0.2, ease: "easeOut" },
    },
  },
};

const imageHoverVariants = {
  initial: { filter: "grayscale(100%)" },
  hover: {
    filter: "grayscale(0%)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
  tap: {
    filter: "grayscale(0%)",
    transition: { duration: 3, ease: "easeOut" },
  },
};

export default function AboutSection() {
  return (
    <section
      className="bg-secondary text-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] 
    dark:bg-[linear-gradient(to_right,#00000030_1px,transparent_1px),linear-gradient(to_bottom,#00000030_1px,transparent_1px)] 
    bg-[size:70px_70px] pb-12 border-b-2 border-black md:gap-16 py-12 md:py-24"
    >
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          className="flex flex-col justify-center text-center md:items-start md:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
        >
          <h2 className="text-white">Tentang Kami</h2>
          <p className="text-white">
            MPK-OSIS SMA Negeri 48 Jakarta adalah wadah bagi siswa/i untuk
            mengembangkan karakter, kreativitas, dan kepemimpinan, sekaligus
            menjadi pelopor perubahan positif di sekolah.
          </p>
        </motion.div>
        <div className="space-y-4 md:space-y-8">
          <motion.div
            className="shadow-accent shadow-[4px_6px_0px_#000] rounded-base border-2 border-accent"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover="hover"
            whileTap="tap"
            custom={0}
            variants={imageVariants}
          >
            <motion.div
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              variants={imageHoverVariants}
            >
              <Image
                src="/home/image1.jpg"
                alt="MPK-OSIS SMA Negeri 48 Jakarta"
                width={500}
                height={500}
                className="w-full h-auto rounded-base"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={imageVariants}
          >
            <motion.div
              className="shadow-accent shadow-[4px_6px_0px_#000] rounded-base border-2 border-accent overflow-hidden"
              whileHover="hover"
              whileTap="tap"
              variants={imageVariants}
            >
              <motion.div
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                variants={imageHoverVariants}
              >
                <Image
                  src="/home/image2.jpg"
                  alt="MPK-OSIS SMA Negeri 48 Jakarta"
                  width={500}
                  height={500}
                  className="w-full h-auto rounded-base"
                />
              </motion.div>
            </motion.div>

            <Image
              src="/home/spark.svg"
              alt="Spark decoration"
              width={100}
              height={100}
              className="w-1/6 md:w-1/5 h-auto absolute -right-0 bottom-0 z-10 translate-x-7 md:translate-x-12 translate-y-8 md:translate-y-12"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
