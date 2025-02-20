import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getAllFAQ = cache(
  async () => {
    const res = await db.fAQ.findMany();
    return res;
  },
  ["faq"],
  { revalidate: 3600 }
);
