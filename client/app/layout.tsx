import { Footer } from "flowbite-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { getUserData } from "./actions";
import NavbarElem from "./components/NavbarElem";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EventPro",
  description: "Projekt zaliczeniowy IT",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUserData();

  return (
    <html lang="pl">
      <body className={"flex flex-1 max-w-screen flex-col " + inter.className}>
        {userData.name !== undefined && <NavbarElem userData={userData} />}
        {children}
        <Footer container className="rounded-none bg-gray-800">
          <Footer.Copyright
            by="Kamil Krukowski"
            year={2024}
            className="text-white"
          />
        </Footer>
      </body>
    </html>
  );
}
