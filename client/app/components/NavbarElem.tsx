"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

export default function NavbarElem({ userData }: { userData: any }) {
  return (
    <Navbar className="bg-gray-800">
      <Navbar.Brand as={Link} href="/">
        <Image
          src="/logo.png"
          width="128"
          height="128"
          alt="EventPro Logo"
          className="m-2"
        />
      </Navbar.Brand>

      <div>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {userData.name} {userData.surname}
            </span>
            <span className="block truncate text-sm font-medium">
              {userData.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Profil</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Wyloguj się</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
