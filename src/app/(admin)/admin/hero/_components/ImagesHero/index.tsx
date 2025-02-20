"use clients";
import { Hero } from "@prisma/client";
import { Image } from "antd";
import React from "react";
import DeleteHeroImage from "../DeleteHeroImage";

export default function ImagesHero({ hero }: { hero: Hero[] }) {
  return (
    <section className="container flex justify-center items-center flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hero?.map((item) => {
          return (
            <div
              key={item.id}
              className="bg-card p-4 max-w-md h-full rounded-lg shadow-md flex justify-between flex-col items-center gap-4"
            >
              <Image
                src={item.image}
                alt={item.id.toString()}
                preview={{ mask: false }}
                className="object-cover rounded-lg cursor-pointer"
              />
              <DeleteHeroImage id={item.id} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
