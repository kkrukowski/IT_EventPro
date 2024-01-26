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
