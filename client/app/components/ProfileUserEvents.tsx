import EventItem from "./EventItem";

export default function ProfileUserEvents(props: { eventsData: any }) {
  return (
    <div>
      <EventItem
        eventTitle={props.eventsData.title}
        eventDate={props.eventsData.date}
        eventDesc={props.eventsData.description}
        eventLoc={props.eventsData.localization}
      />
    </div>
  );
}
