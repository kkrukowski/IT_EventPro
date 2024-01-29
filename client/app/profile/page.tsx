import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserData } from "../actions";
import { getUserEvents } from "../api/auth/routes";
import { getEventData } from "../api/events/routes";
import Heading from "../components/Heading";
import ProfileForm from "../components/ProfileForm";
import ProfileUserEvents from "../components/ProfileUserEvents";

export default async function Profile() {
  const userData = await getUserData();
  const userEvents = await getUserEvents(userData.id);
  const userEventsData = await getEventData(userEvents);
  if (cookies().get("authToken") == undefined) {
    redirect("/login");
  }

  return (
    <section className="w-full  flex flex-col justify-center items-center p-10">
      <div className="w-fit rounded-xl bg-gray-800 p-10">
        <Heading title="Profil" />
        <ProfileForm userData={userData} />
      </div>
      {userData.role == "ADMIN" && (
        <div className="w-fit rounded-xl bg-gray-800 mt-10 p-10">
          <Heading title="Twoje wydarzenia" />
          <ProfileUserEvents eventsData={userEventsData} />
        </div>
      )}
    </section>
  );
}
