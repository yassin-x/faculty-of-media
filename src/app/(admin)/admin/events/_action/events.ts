'use server';

import { Pages, Routes } from "@/constants/enums";
import { db } from "@/lib/prisma";
import { deleteCloudinaryImage, getImageUrl } from "@/server/db/cloudinary";
import { revalidatePath } from "next/cache";

export const newEventImage = async (image: File) => {
  try {
    if (!Boolean(image.size))
      return {
        status: 400,
        message: "Image is required",
      };
    const response = await getImageUrl(image, "events");
    if (!response) {
      return {
        status: 400,
        message: "Image upload failed",
      };
    }
    await db.events.create({
      data: {
        image: response,
      },
    });

    revalidatePath(`/${Routes.ADMIN}/${Pages.EVENTS}`);
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

export const deleteEventImage = async (id: string) => {
  try {
    const event = await db.events.findUnique({
      where: {
        id,
      },
    });
    const publicId = event?.image.split("/").pop()?.split(".")[0] as string;
    await deleteCloudinaryImage(publicId, "events");
    await db.events.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/${Routes.ADMIN}/${Pages.EVENTS}`);
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
