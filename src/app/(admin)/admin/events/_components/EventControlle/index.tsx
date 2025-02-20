"use client";

import { UploadIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { newEventImage } from "../../_action/events";

export default function EventControlle() {
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      try {
        const res = await newEventImage(file);
        setUploading(true);

        if (res?.status !== 200) {
          toast({
            title: res?.message,
            className: "!text-destructive",
          });
        }
        toast({
          title: res?.message,
          className: "!text-green-400",
        });
      } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
      } finally {
        setUploading(false);
      }
    }
  };
  return (
    <section className="container pb-4">
      <div>
        <label
          htmlFor="upload-image"
          className="cursor-pointer flex justify-center items-center"
        >
          <UploadIcon />
        </label>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id={"upload-image"}
          onChange={handleImageChange}
          name={"upload-image"}
          disabled={uploading}
        />
      </div>
    </section>
  );
}
