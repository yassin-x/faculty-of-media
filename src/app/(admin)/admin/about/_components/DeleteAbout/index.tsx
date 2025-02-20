"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import React from "react";
import { deleteAbout } from "../../_action/about";
import { toast } from "@/hooks/use-toast";

export default function DeleteAbout({ id }: { id: string }) {
  const handleDelete = async (aboutId: string) => {
    try {
      const res = await deleteAbout(aboutId);
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
      console.log(`Error deleting hero image: ${error}`);
    }
  };
  return (
    <Button onClick={() => handleDelete(id)}>
      <TrashIcon />
    </Button>
  );
}
