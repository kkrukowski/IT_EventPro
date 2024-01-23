import NavbarElem from "../components/NavbarElem";

export default function ProfileLayoput({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 h-full flex-col">
      <NavbarElem />
      {children}
    </main>
  );
}
