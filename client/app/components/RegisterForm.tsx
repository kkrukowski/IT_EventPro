"use client";

import { Button, Checkbox, Dropdown, Label, TextInput } from "flowbite-react";
import { HiKey, HiMail, HiUser } from "react-icons/hi";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { RegisterUser } from "../api/auth/routes";

const schema = yup.object().shape({
  name: yup.string().required("Imie jest wymagame"),
  surname: yup.string().required("Nazwisko jest wymagane"),
  email: yup
    .string()
    .email("Format emaila jest niepoprawny")
    .required("Email jest wymagany"),
  password: yup
    .string()
    .min(6, "Hasło powinno posiadać przynajmniej 6 znaków")
    .required("Hasło jest wymagane"),
  repassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Hasła muszą być takie same")
    .required("Powtórzenie hasła jest wymagane"),
});

interface IFormInput {
  name: string;
  surname: string;
  email: string;
  password: string;
  repassword: string;
}

export default function RegisterForm() {
  const router = useRouter();

  const [role, setRole] = useState({
    role: "",
    placeholder: "Wybierz rolę konta",
    error: false,
    message: "",
  });

  const form = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (role.role === "") {
      setRole({
        role: "",
        placeholder: "Wybierz rolę konta",
        error: true,
        message: "Wybierz rolę konta",
      });
    } else {
      const userData = {
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password,
        role: role.role,
        createdAt: new Date(),
      };

      try {
        const registerUser = await RegisterUser(userData);
        if (registerUser) {
          router.push("/profile");
        }
      } catch (error) {
        console.log(error);
      }
    }
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
            placeholder="Imie"
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
            placeholder="Nazwisko"
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
      {/* Role input */}
      <div className="flex flex-col items-center justify-center w-full">
        <Dropdown label={role.placeholder}>
          <Dropdown.Header>
            <span className="block text-sm">Dostępne role 👇</span>
          </Dropdown.Header>
          <Dropdown.Item
            onClick={() => {
              setRole({
                role: "USER",
                placeholder: "Użytkownik",
                error: false,
                message: "",
              });
            }}
          >
            Użytkownik
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setRole({
                role: "ADMIN",
                placeholder: "Administrator",
                error: false,
                message: "",
              });
            }}
          >
            Organizator
          </Dropdown.Item>
        </Dropdown>
        {role.error && (
          <p className="text-red-600 text-sm w-full mt-2">{role.message}</p>
        )}
      </div>
      <Button type="submit">Zarejestruj się</Button>
      <p>
        Masz już konto?{" "}
        <Link
          href="/login"
          className="text-cyan-600 hover:underline dark:text-cyan-500"
        >
          Zaloguj się
        </Link>
      </p>
    </form>
  );
}
