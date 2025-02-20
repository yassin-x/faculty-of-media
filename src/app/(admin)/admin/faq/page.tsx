import { getAllFAQ } from "@/server/db/FAQData";
import React from "react";
import FAQData from "./_components/FAQData";
import FAQControlle from "./_components/FAQControlle";

export default async function FAQPage() {
  const FAQ = await getAllFAQ();
  return <main>
    <FAQControlle />
    <FAQData faq={FAQ}/>
  </main>;
}
