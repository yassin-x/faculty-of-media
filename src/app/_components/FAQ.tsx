"use client";

import React, { useEffect, useState } from "react";
import MainHeading from "@/components/MainHeading";
import { Carousel, Image } from "antd";
import { motion } from "framer-motion";

type FAQType = {
  id: string;
  image: string;
  question: string;
  answer: string;
};

export default function FAQ({ data }: { data: FAQType[] }) {
  const [slidesToShow, setSlidesToShow] = useState(4);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSlidesToShow(1);
      } else if (width < 992) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(4);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <section className="py-6 md:py-8">
      <div className="container overflow-hidden">
        <MainHeading title={"FAQ"} />
        <Carousel
          autoplay
          dots={false}
          slidesToShow={slidesToShow}
          slidesToScroll={1}
          pauseOnHover
          className="w-full min-h-[300px]"
        >
          {data.map((item) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              key={item.id}
              className="w-[300px] min-h-[300px] px-2"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="bg-card shadow-lg p-4 rounded-lg w-full h-full flex flex-col justify-between">
                  <Image
                    src={item.image}
                    alt={item.id}
                    height={150}
                    preview={{ mask: false }}
                    className="w-full h-[150px] object-cover rounded-md mb-4 cursor-pointer"
                  />
                  <div className="flex flex-col items-center py-2">
                    <h3 className="text-xl font-semibold text-primary text-center mb-2">
                      {item.question}
                    </h3>
                    <p className="text-accent text-center">{item.answer}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
