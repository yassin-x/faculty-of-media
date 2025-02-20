"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { deleteEventImage } from "../../_action/events";

export default function DeleteEventImage({ id }: { id: string }) {
  const handleDelete = async (eventId: string) => {
    try {
      const res = await deleteEventImage(eventId);
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
