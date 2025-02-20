import { AboutUs } from "@prisma/client";
import { Image } from "antd";
import React from "react";
import DeleteAbout from "../DeleteAbout";
import UpdateAbout from "../UpdateAbout";

export default function AboutData({ about }: { about: AboutUs[] }) {
  return (
    <section className="container flex justify-center items-center flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {about?.map((item) => {
          return (
            <div
              key={item.id}
              className="bg-card p-4 max-w-md h-full rounded-lg shadow-md flex justify-between flex-col items-center gap-4"
            >
              <Image
                src={item.image}
                alt={item.id.toString()}
                preview={{ mask: false }}
                className="object-cover rounded-full cursor-pointer"
              />
              <div className="flex flex-col gap-4 w-full overflow-hidden">
                <h3 className="text-xl font-semibold text-primary text-start w-full">
                  {item.title}
                </h3>
                <p className="text-accent w-full break-words">
                  {item.description}
                </p>
              </div>

              <div className="gap-4 flex flex-row items-center ">
                <DeleteAbout id={item.id} />
                <UpdateAbout data={item} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
