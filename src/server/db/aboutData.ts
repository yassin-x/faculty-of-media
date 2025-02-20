import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getAllAbout = cache(
  async () => {
    const res = await db.aboutUs.findMany();
    return res;
  },
  ["about"],
  { revalidate: 3600 }
);
