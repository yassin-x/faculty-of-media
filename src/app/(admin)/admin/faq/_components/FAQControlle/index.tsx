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
import { toast } from "@/hooks/use-toast";
import { newFAQ } from "../../_action/faq";

export default function FAQControlle() {
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
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
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
      if (!question || !answer || !file) {
        return toast({
          title: "Please fill all fields",
          className: "!text-destructive",
        });
      }

      const res = await newFAQ(question, answer, file);
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
            {loading ? <LoaderIcon className="animate-spin" /> : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
