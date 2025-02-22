"use client";
import MainHeading from "@/components/MainHeading";
import { Button } from "@/components/ui/button";
import { Pages } from "@/constants/enums";
import { Image } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

type EventsType = {
  id: string;
  image: string;
};

export default function Events({ data }: { data: EventsType[] }) {
  const router = useRouter();
  return (
    <section className="py-6 md:py-8">
      <div className="container">
        <MainHeading title={"Events Images"} />
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.slice(0, 6).map((item) => {
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  key={item.id}
                  className="cursor-pointer transition-transform duration-300 hover:scale-105"
                >
                  <Image
                    src={item.image}
                    alt={item.id}
                    width={300}
                    height={200}
                    preview={{ mask: false }}
                    className="rounded shadow-lg object-cover w-full h-full"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center items-center pt-4">
          <Button
            variant={"ghost"}
            onClick={() => {
              router.replace(`/${Pages.EVENTS}`);
            }}
          >
            See more...
          </Button>
        </div>
      </div>
    </section>
  );
}
