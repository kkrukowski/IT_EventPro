"use server";

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const downloadPdf = async () => {
  try {
    const pdfApiUrl = API_URL + "/events/pdf";
    console.log("pdfApiUrl", pdfApiUrl);
    const pdf = await axios.post(pdfApiUrl, {
      eventName: "IEM 2024",
      name: "Kamil",
      surname: "Kowalski",
    });
    console.log("pdf", pdf);
    if (!pdf) {
      return false;
    }
    return pdf;
  } catch (error) {
    console.log("error", error);
  }
};
