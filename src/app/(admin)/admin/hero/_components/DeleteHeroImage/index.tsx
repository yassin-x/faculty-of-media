"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { deleteHeroImage } from "../../_actions/hero";
import { toast } from "@/hooks/use-toast";

export default function DeleteHeroImage({ id }: { id: string }) {
  const handleDelete = async (heroId: string) => {
    try {
      const res = await deleteHeroImage(heroId);
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
