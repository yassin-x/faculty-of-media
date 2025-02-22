"use client";
import MainHeading from "@/components/MainHeading";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

type AboutType = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export default function About({ data }: { data: AboutType[] }) {
  return (
    <section className="py-6 md:py-8">
      <div className="container">
        <MainHeading title={"About Us"} />
        {data.map((item, index) => {
          return (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              key={item.id}
              className={`flex flex-col  md:flex-row items-center justify-center gap-8 md:gap-12 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-shrink-0">
                <Image
                  src={item.image}
                  width={300}
                  height={300}
                  alt={`Image ${item.id}`}
                  className="rounded-full shadow-lg"
                />
              </div>
              <div className="text-center md:text-left max-w-lg">
                <h1 className="text-3xl font-bold text-primary mb-4 max-w-md">
                  {item.title}
                </h1>
                <p className="text-accent break-words max-w-md">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
