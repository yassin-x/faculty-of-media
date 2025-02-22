"use client";

import React from "react";
import { Carousel } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
type HeroType = {
  id: string;
  image: string;
};

export default function Hero({ data }: { data: HeroType[] }) {
  return (
    <motion.section
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-x-hidden"
    >
      <Carousel autoplay autoplaySpeed={3000} dots={true} effect="fade">
        {data.map((hero) => (
          <div
            key={hero.id}
            className="relative w-full h-screen max-h-[40vh] sm:max-h-[70vh]"
          >
            <Image
              src={hero.image}
              alt={`Hero ${hero.id}`}
              fill
              className="object-cover w-full h-full"
              priority
            />
          </div>
        ))}
      </Carousel>
    </motion.section>
  );
}
