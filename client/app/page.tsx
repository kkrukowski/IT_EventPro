import { getUserData } from "./actions";
import { getEvents } from "./api/events/routes";
import AddEventButton from "./components/AddEventButton";
import EventItem from "./components/EventItem";
import EventsList from "./components/EventsList";
import Heading from "./components/Heading";

export default async function Home() {
  const events = await getEvents();
  const userData = await getUserData();

  return (
    <main className="flex flex-col items-center p-10">
      <Heading title="Dostępne wydarzenia" />
      {userData?.role == "ADMIN" && <AddEventButton />}

      <section className="p-4 mt-5 rounded-xl max-h-[800px] overflow-auto">
        <EventsList events={events?.data} userData={userData} />
      </section>
    </main>
  );
}
