import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserData } from "../actions";
import Heading from "../components/Heading";
import ProfileForm from "../components/ProfileForm";

export default async function Profile() {
  const userData = await getUserData();
  if (cookies().get("authToken") == undefined) {
    redirect("/login");
  }

  return (
    <section className="w-full h-full flex flex-col justify-center items-center p-10">
      <div className="w-fit rounded-xl bg-gray-800 p-10">
        <Heading title="Profil" />
        <ProfileForm userData={userData} />
      </div>
    </section>
  );
}
