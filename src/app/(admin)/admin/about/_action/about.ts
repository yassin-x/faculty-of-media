"use server";

import { Pages, Routes } from "@/constants/enums";
import { db } from "@/lib/prisma";
import { deleteCloudinaryImage, getImageUrl } from "@/server/db/cloudinary";
import { revalidatePath } from "next/cache";

export const newAbout = async (title: string, desc: string, image: File) => {
  try {
    if (!Boolean(image.size)) {
      return {
        status: 400,
        message: "Image is required",
      };
    }
    const response = await getImageUrl(image, "about");
    if (!response) {
      return {
        status: 400,
        message: "Image upload failed",
      };
    }

    await db.aboutUs.create({
      data: {
        title,
        description: desc,
        image: response,
      },
    });

    revalidatePath(`/${Routes.ADMIN}/${Pages.ABOUT}`);
    revalidatePath(`${Routes.ROOT}`);
    return {
      status: 200,
      message: "Added successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Unexpected error",
    };
  }
};

export const updateAbout = async (
  id: string,
  title: string,
  desc: string,
  image?: File
) => {
  try {
    const about = await db.aboutUs.findUnique({
      where: {
        id,
      },
    });

    let imageUrl;
    if (!Boolean(image?.size) || !image) {
      imageUrl = about?.image;
    } else {
      const publicId = about?.image.split("/").pop()?.split(".")[0] as string;
      await deleteCloudinaryImage(publicId, "about");
      imageUrl = await getImageUrl(image, "about");
    }

    await db.aboutUs.update({
      where: {
        id,
      },
      data: {
        title,
        description: desc,
        image: imageUrl,
      },
    });

    revalidatePath(`/${Routes.ADMIN}/${Pages.ABOUT}`);
    revalidatePath(`${Routes.ROOT}`);

    return {
      status: 200,
      message: "Updated successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Unexpected error",
    };
  }
};

export const deleteAbout = async (id: string) => {
  try {
    const about = await db.aboutUs.findUnique({
      where: {
        id,
      },
    });
    const publicId = about?.image.split("/").pop()?.split(".")[0] as string;
    await deleteCloudinaryImage(publicId, "about");
    await db.aboutUs.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/${Routes.ADMIN}/${Pages.ABOUT}`);
    revalidatePath(`${Routes.ROOT}`);

    return {
      status: 200,
      message: "Deleted successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Unexpected error",
    };
  }
};
