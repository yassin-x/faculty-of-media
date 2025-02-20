"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import React from "react";
import { deleteFAQ } from "../../_action/faq";
import { toast } from "@/hooks/use-toast";

export default function DeleteFAQ({ id }: { id: string }) {
  const handleDelete = async (faqId: string) => {
    try {
      const res = await deleteFAQ(faqId);
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
