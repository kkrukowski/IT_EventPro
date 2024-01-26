"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { HiKey, HiMail } from "react-icons/hi";

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { LoginUser } from "../api/auth/routes";
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

export default function LoginForm() {
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
    const userData = data;
    try {
      const loginUser = await LoginUser(userData);
      if (loginUser) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-md flex-col gap-4 w-[400px]"
    >
      {/* Email input */}
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="email" value="Adres email" className="text-white" />
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
  );
}
