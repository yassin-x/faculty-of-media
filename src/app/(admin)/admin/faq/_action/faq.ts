"use server";

import { Pages, Routes } from "@/constants/enums";
import { db } from "@/lib/prisma";
import { deleteCloudinaryImage, getImageUrl } from "@/server/db/cloudinary";
import { revalidatePath } from "next/cache";

export const newFAQ = async (question: string, answer: string, image: File) => {
  try {
    if (!Boolean(image.size)) {
      return {
        status: 400,
        message: "Image is required",
      };
    }
    const response = await getImageUrl(image, "faq");
    if (!response) {
      return {
        status: 400,
        message: "Image upload failed",
      };
    }

    await db.fAQ.create({
      data: {
        question,
        answer,
        image: response,
      },
    });

    revalidatePath(`/${Routes.ADMIN}/${Pages.FAQ}`);
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

export const updateFAQ = async (
  id: string,
  question: string,
  answer: string,
  image?: File
) => {
  try {
    const faq = await db.fAQ.findUnique({
      where: {
        id,
      },
    });

    let imageUrl;
    if (!Boolean(image?.size) || !image) {
      imageUrl = faq?.image;
    } else {
      const publicId = faq?.image.split("/").pop()?.split(".")[0] as string;
      await deleteCloudinaryImage(publicId, "faq");
      imageUrl = await getImageUrl(image, "faq");
    }

    await db.fAQ.update({
      where: {
        id,
      },
      data: {
        question,
        answer,
        image: imageUrl,
      },
    });

    revalidatePath(`/${Routes.ADMIN}/${Pages.FAQ}`);
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

export const deleteFAQ = async (id: string) => {
  try {
    const faq = await db.fAQ.findUnique({
      where: {
        id,
      },
    });
    const publicId = faq?.image.split("/").pop()?.split(".")[0] as string;
    await deleteCloudinaryImage(publicId, "faq");
    await db.fAQ.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/${Routes.ADMIN}/${Pages.FAQ}`);
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
