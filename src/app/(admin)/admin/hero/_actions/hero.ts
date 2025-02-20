"use server";

import { Pages, Routes } from "@/constants/enums";
import { db } from "@/lib/prisma";
import { deleteCloudinaryImage, getImageUrl } from "@/server/db/cloudinary";
import { revalidatePath } from "next/cache";

export const newHeroImage = async (image: File) => {
  try {
    if (!Boolean(image.size))
      return {
        status: 400,
        message: "Image is required",
      };
    const response = await getImageUrl(image, "hero");
    if (!response) {
      return {
        status: 400,
        message: "Image upload failed",
      };
    }
    await db.hero.create({
      data: {
        image: response,
      },
    });

    revalidatePath(`/${Routes.ADMIN}/${Pages.HERO}`);
    revalidatePath(`${Routes.ROOT}`);

    return {
      status: 200,
      message: "Image uploaded successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Unexpected error",
    };
  }
};

export const deleteHeroImage = async (id: string) => {
  try {
    const hero = await db.hero.findUnique({
      where: {
        id,
      },
    });
    const publicId = hero?.image.split("/").pop()?.split(".")[0] as string;
    await deleteCloudinaryImage(publicId, "hero");
    await db.hero.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/${Routes.ADMIN}/${Pages.HERO}`);
    revalidatePath(`${Routes.ROOT}`);

    return {
      status: 200,
      message: "Image deleted successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Unexpected error",
    };
  }
};
