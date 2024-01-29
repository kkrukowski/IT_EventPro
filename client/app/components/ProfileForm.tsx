"use client";

import { Button, Checkbox, Dropdown, Label, TextInput } from "flowbite-react";
import { HiKey, HiMail, HiUser } from "react-icons/hi";

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { getUserData } from "../actions";
import Heading from "../components/Heading";

const schema = yup.object().shape(
  {
    name: yup.string().notRequired(),
    surname: yup.string().notRequired(),
    password: yup
      .string()
      .nullable()
      .notRequired()
      .when("password", {
        is: (value: string) => value?.length,
        then: (rule) =>
          rule.min(6, "Hasło powinno posiadać przynajmniej 6 znaków"),
      }),
    repassword: yup
      .string()
      .nullable()
      .oneOf([yup.ref("password"), ""], "Hasła muszą być takie same")
      .notRequired(),
  },
  [["password", "password"]]
);

interface IFormInput {}

export default function ProfileForm({ userData }: { userData: any }) {
  const form = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const userData = {};

    // axios
    //   .put(process.env.NEXT_PUBLIC_API_URL + "/users", userData)
    //   .then((res) => {
    //     if (res.status === 201) {
    //       console.log("User created");
    //       router.push("/profile");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data.message);
    //   });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-md flex-col gap-4 w-[400px]"
    >
      <div className="grid md:grid-cols-2 md:gap-6">
        {/* Name input */}
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" className="text-white" />
          </div>
          <TextInput
            id="name"
            type="text"
            icon={HiUser}
            placeholder={userData.name}
            {...register("name", { required: true })}
            color={errors.name && "failure"}
            helperText={errors.name?.message}
          />
        </div>
        {/* Surname input */}
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="surname" value="Nazwisko" className="text-white" />
          </div>
          <TextInput
            id="surname"
            type="text"
            icon={HiUser}
            placeholder={userData.surname}
            {...register("surname", { required: true })}
            color={errors.surname && "failure"}
            helperText={errors.surname?.message}
          />
        </div>
      </div>

      {/* Email input */}
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="email" value="Adres email" className="text-white" />
        </div>
        <TextInput
          id="email"
          type="email"
          icon={HiMail}
          placeholder={userData.email}
          disabled
        />
      </div>
      {/* Password input */}
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="password" value="Hasło" className="text-white" />
        </div>
        <TextInput
          id="password"
          type="password"
          icon={HiKey}
          placeholder="*****"
          {...register("password", { required: true })}
          color={errors.password && "failure"}
          helperText={errors.password?.message}
        />
      </div>
      {/* Re-Password input */}
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label
            htmlFor="repassword"
            value="Powtórz hasło"
            className="text-white"
          />
        </div>
        <TextInput
          id="repassword"
          type="password"
          icon={HiKey}
          placeholder="*****"
          {...register("repassword", { required: true })}
          color={errors.repassword && "failure"}
          helperText={errors.repassword?.message}
        />
      </div>
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label
            htmlFor="role"
            value="Rola użytkownika"
            className="text-white"
          />
        </div>
        <TextInput
          id="role"
          type="text"
          icon={HiUser}
          placeholder={userData.role == "ADMIN" ? "Organizator" : "Użytkownik"}
          disabled
        />
      </div>
      <Button type="submit">Zmień dane</Button>
    </form>
  );
}
