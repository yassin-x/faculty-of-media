import React from "react";
import HeroControlle from "./_components/HeroControlle";
import { getAllHero } from "@/server/db/heroData";
import ImagesHero from "./_components/ImagesHero";

export default async function AdminHeroPage() {
  const hero = await getAllHero();
  return (
    <main>
      <HeroControlle />
      <ImagesHero hero={hero} />
    </main>
  );
}
