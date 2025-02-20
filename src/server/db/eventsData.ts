import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getAllEvents = cache(
  async () => {
    const res = await db.events.findMany();
    return res;
  },
  ["events"],
  { revalidate: 3600 }
);
