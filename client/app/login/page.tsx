"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { HiKey, HiMail } from "react-icons/hi";

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Heading from "../components/Heading";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Format emaila jest niepoprawny")
    .required("Email jest wymagany"),
  password: yup.string().required("Hasło jest wymagane"),
});

interface IFormInput {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();

  const form = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    axios.get(process.env.NEXT_PUBLIC_API_URL + "/users/", data).then(
  };

  return (
    <section className="w-full h-full flex flex-col justify-center items-center py-10">
      <Image
        src="/logo.png"
        width="256"
        height="100"
        alt="EventPro Logo"
        className="mb-4"
      />
      <div className="w-fit rounded-xl bg-gray-800 p-10">
        <Heading title="Logowanie" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-w-md flex-col gap-4 w-[400px]"
        >
          {/* Email input */}
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label
                htmlFor="email"
                value="Adres email"
                className="text-white"
              />
            </div>
            <TextInput
              id="email"
              type="email"
              icon={HiMail}
              placeholder="name@email.com"
              {...register("email", { required: true })}
              color={errors.email && "failure"}
              helperText={errors.email?.message}
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
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-white">
              Zapamiętaj mnie
            </Label>
          </div>
          <Button type="submit">Zaloguj</Button>
          <p>
            Nie masz konta?{" "}
            <Link
              href="/register"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              Zarejestruj się
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
