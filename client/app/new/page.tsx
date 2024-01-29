import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserData } from "../actions";
import EventForm from "../components/EventForm";
import Heading from "../components/Heading";

export default async function New() {
  // redirect to profile if user is logged in
  if (cookies().get("authToken") === undefined) {
    redirect("/login");
  }

  const userData = await getUserData();

  return (
    <main className="w-full h-full flex flex-1 flex-col justify-center items-center py-10">
      <div className="w-fit rounded-xl bg-gray-800 p-10">
        <Heading title="Nowe wydarzenie" />
        <EventForm userData={userData} />
      </div>
    </main>
  );
}
