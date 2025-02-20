import { FAQ } from "@prisma/client";
import { Image } from "antd";
import React from "react";
import DeleteFAQ from "../DeleteFAQ";
import UpdateFAQ from "../UpdateFAQ";

export default function FAQData({ faq }: { faq: FAQ[] }) {
  return (
    <section className="container flex justify-center items-center flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {faq?.map((item) => {
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
              <div className="flex flex-col gap-4 w-full overflow-hidden">
                <h3 className="text-xl font-semibold text-primary text-start w-full">
                  {item.question}
                </h3>
                <p className="text-accent w-full break-words">{item.answer}</p>
              </div>

              <div className="gap-4 flex flex-row items-center ">
                <DeleteFAQ id={item.id} />
                <UpdateFAQ data={item} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
