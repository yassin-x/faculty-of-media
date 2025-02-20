import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getAllHero = cache(
  async () => {
    const res = await db.hero.findMany();
    return res;
  },
  ["hero"],
  { revalidate: 3600 }
);
