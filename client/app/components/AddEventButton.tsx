"use client";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function AddEventButton() {
  const router = useRouter();
  const addEvent = () => {
    router.push("/new");
  };

  return (
    <Button className="p-0" onClick={addEvent}>
      <span className="text-xl">+</span>
    </Button>
  );
}
