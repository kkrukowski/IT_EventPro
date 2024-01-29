"use server";

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const downloadPdf = async (ticketData: any) => {
  try {
    const pdfApiUrl = API_URL + "/events/pdf";
    const pdf = await axios.post(pdfApiUrl, ticketData);
    if (!pdf) {
      return false;
    }
    return pdf.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const createEvent = async (eventData: any) => {
  try {
    const createEventApiUrl = API_URL + "/events";
    const event = await axios.post(createEventApiUrl, eventData);

    return event;
  } catch (error) {
    console.log("error", error);
  }
};

export const getEvents = async () => {
  try {
    const getEventsApiUrl = API_URL + "/events";
    const events = await axios.get(getEventsApiUrl);
    return events;
  } catch (error) {
    console.log("error", error);
  }
};
