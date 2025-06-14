"use client";
import { Button } from "@/components/ui/button";
import { CameraIcon, LoaderIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { newAbout } from "../../_action/about";
import { toast } from "@/hooks/use-toast";

export default function AboutControlle() {
  return (
    <section className="pb-4">
      <div className="container flex justify-center items-center">
        <DialogDemo />
      </div>
    </section>
  );
}

function DialogDemo() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFile(file);
      setImage(url);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!title || !description || !file) {
        return toast({
          title: "Please fill all fields",
          className: "!text-destructive",
        });
      }

      const res = await newAbout(title, description, file);
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
      setOpen(false);
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-4">
            <div className="flex flex-col items-center gap-4">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="image-upload"
                onChange={handleImageChange}
                name="image"
              />
              <label
                htmlFor="image-upload"
                className="border rounded-full w-[150px] h-[150px] flex items-center justify-center cursor-pointer transition"
              >
                {image ? (
                  <Image
                    src={image}
                    alt="Uploaded Image"
                    width={150}
                    height={150}
                    className="object-cover rounded-full"
                  />
                ) : (
                  <CameraIcon className="w-8 h-8 text-gray-500" />
                )}
              </label>
            </div>
            <div>
              <Label
                htmlFor={"title"}
                className="capitalize text-black dark:text-white mb-2"
              >
                Title
              </Label>
              <Input
                type="text"
                placeholder="Title"
                autoFocus={true}
                name={"title"}
                id={"title"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="focus:!ring-0"
              />
            </div>
            <div>
              <Label
                htmlFor={"desc"}
                className="capitalize text-black dark:text-white mb-2"
              >
                Description
              </Label>
              <Textarea
                placeholder="Description"
                name="desc"
                id="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="focus:!ring-0"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={loading}
            onClick={() => handleSubmit()}
          >
            {loading ? <LoaderIcon className="animate-spin" /> : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
