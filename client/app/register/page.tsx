import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import Heading from "../components/Heading";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  // redirect to profile if user is logged in
  if (cookies().get("authToken")) {
    redirect("/profile");
  }

  return (
    <section className="w-full h-full flex flex-col justify-center items-center py-10">
      <Image
        src="/logo.png"
        width="256"
        height="100"
        alt="EventPro Logo"
        className="mb-4"
      />
      <div className="w-fit rounded-xl bg-gray-800 p-10">
        <Heading title="Rejestracja" />
        <RegisterForm />
      </div>
    </section>
  );
}
