import MainHeading from "@/components/MainHeading";
import { getAllEvents } from "@/server/db/eventsData";
import { Image } from "antd";
import React from "react";

export default async function EventsPage() {
  const events = await getAllEvents();
  return (
    <main>
      <section className="py-8 md:py-10">
        <div className="container">
          <MainHeading title={"Events Images"} />
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((item) => {
                return (
                  <div
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
