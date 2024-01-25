import NavbarElem from "../components/NavbarElem";

export default function ProfileLayoput({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 min-h-screen h-full flex-col">
      <NavbarElem />
      {children}
    </main>
  );
}
