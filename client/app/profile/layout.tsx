import { getUserData } from "../actions";
import NavbarElem from "../components/NavbarElem";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUserData();
  return (
    <main className="flex flex-1 min-h-screen h-full flex-col">
      <NavbarElem userData={userData} />
      {children}
    </main>
  );
}
