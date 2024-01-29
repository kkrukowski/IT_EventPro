"use client";

import EventItem from "./EventItem";

export default function EventsList(props: { events: any; userData: any }) {
  return (
    <ul className="flex flex-col gap-4">
      {props.events.map((event: any) => (
        <EventItem
          key={event.id}
          eventTitle={event.title}
          eventDesc={event.description}
          eventDate={event.date}
          eventLoc={event.localization}
          userData={props.userData}
        />
      ))}
    </ul>
  );
}
