"use client";
import { Button } from "@/components/ui/button";
import { CameraIcon, EditIcon, LoaderIcon, PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import { toast } from "@/hooks/use-toast";
import { FAQ } from "@prisma/client";
import { updateFAQ } from "../../_action/faq";

export default function UpdateAbout({ data }: { data: FAQ }) {
  return <DialogDemo data={data} />;
}

function DialogDemo({ data }: { data: FAQ }) {
  const [image, setImage] = useState(data?.image);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const [question, setQuestion] = useState(data?.question);
  const [answer, setAnswer] = useState(data?.answer);
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
      if (!question || !answer) {
        return toast({
          title: "Please fill all fields",
          className: "!text-destructive",
        });
      }
      const res = await updateFAQ(data?.id, question, answer, file);
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
      setFile(undefined);
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
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
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
                className="border rounded-lg w-[250px] h-[150px] flex items-center justify-center cursor-pointer transition"
              >
                {image ? (
                  <Image
                    src={image}
                    alt="Uploaded Image"
                    width={250}
                    height={150}
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <CameraIcon className="w-8 h-8 text-gray-500" />
                )}
              </label>
            </div>
            <div>
              <Label
                htmlFor={"question"}
                className="capitalize text-black dark:text-white mb-2"
              >
                Question
              </Label>
              <Input
                type="text"
                placeholder="Question"
                autoFocus={true}
                name={"question"}
                id={"question"}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="focus:!ring-0"
              />
            </div>
            <div>
              <Label
                htmlFor={"answer"}
                className="capitalize text-black dark:text-white mb-2"
              >
                Answer
              </Label>
              <Textarea
                placeholder="Answer"
                name="answer"
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
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
            {loading ? <LoaderIcon className="animate-spin" /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
