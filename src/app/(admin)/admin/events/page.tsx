import React from "react";
import EventControlle from "./_components/EventControlle";
import { getAllEvents } from "@/server/db/eventsData";
import ImagesEvents from "./_components/ImagesEvents";

export default async function EventsPage() {
  const events = await getAllEvents();
  return (
    <main>
      <EventControlle />
      <ImagesEvents events={events} />
    </main>
  );
}
