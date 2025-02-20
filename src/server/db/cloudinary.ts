export const deleteCloudinaryImage = async (
  publicId: string,
  pathname: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
    {
      method: "DELETE",
      body: JSON.stringify({ publicId, pathname }),
    }
  );

  return {
    status: response.status,
    message: "Image deleted successfully",
  };
};

export const getImageUrl = async (imageFile: File, pathname: string) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("pathName", pathname);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const image = (await response.json()) as { url: string };
    return image.url;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
  }
};
