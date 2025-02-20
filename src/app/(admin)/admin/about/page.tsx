import React from "react";
import AboutControlle from "./_components/AboutControlle";
import AboutData from "./_components/AboutData";
import { getAllAbout } from "@/server/db/aboutData";

export default async function AboutPage() {
  const about = await getAllAbout();
  return (
    <main>
      <AboutControlle />
      <AboutData about={about} />
    </main>
  );
}
