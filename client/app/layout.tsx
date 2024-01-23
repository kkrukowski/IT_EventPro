import { Footer } from "flowbite-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import NavbarElem from "./components/NavbarElem";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EventPro",
  description: "Projekt zaliczeniowy IT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={"flex flex-1 h-full flex-col " + inter.className}>
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
