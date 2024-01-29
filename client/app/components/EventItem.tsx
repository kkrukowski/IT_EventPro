"use client";

import { Button } from "flowbite-react";
import { downloadPdf } from "../api/events/routes";

import Image from "next/image";
import { useEffect } from "react";

export default function EventItem(props: {
  eventTitle: string;
  eventDesc: string;
  eventDate: string;
  eventLoc: string;
  userData: any;
}) {
  const downloadPdfHandler = async () => {
    const ticketData = {
      eventTitle: props.eventTitle,
      eventDesc: props.eventDesc,
      eventDate: props.eventDate,
      eventLoc: props.eventLoc,
      userName: "Kamil",
      userSurname: "Kowalski",
    };
    const pdfFileName = await downloadPdf(ticketData);
    if (pdfFileName) {
      const url = `http://localhost:5000/tickets/${pdfFileName}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="flex h-fit w-[800px] bg-gray-800 p-4 rounded-3xl">
      <Image
        src="/thumbnail.jpg"
        alt="Event thumbnail"
        className="rounded-xl mr-8"
        width="250"
        height="250"
      />
      <div className="flex flex-col flex-1">
        <div className="flex flex-col h-full flex-1">
          <span>
            📅 {props.eventDate} | 📌 {props.eventLoc}
          </span>
          <h2 className="text-2xl font-bold">{props.eventTitle}</h2>
          <p>{props.eventDesc}</p>
        </div>
        {props.userData?.role == "USER" && (
          <div className="flex">
            <Button className="w-fit mt-5 mr-5">Zapisz się</Button>
            <Button
              color="blue"
              className="w-fit mt-5"
              onClick={downloadPdfHandler}
            >
              Pobierz bilet
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
