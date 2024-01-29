"use client";

import { Button, Checkbox, Dropdown, Label, TextInput } from "flowbite-react";
import { HiKey, HiMail, HiUser } from "react-icons/hi";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { storeUserData } from "../actions";
import { LoginUser, updateUser } from "../api/auth/routes";
import Login from "../login/page";

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

interface IFormInput {
  name: string;
  surname: string;
  password: string;
  repassword: string;
}

export default function ProfileForm({ userData }: { userData: any }) {
  const form = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const updateUserData = {
      name: data?.name,
      surname: data?.surname,
      password: data?.password,
    };

    const updatedUser = await updateUser(userData.id, updateUserData);

    if (updatedUser) {
      await storeUserData(updatedUser);
      window.location.reload();
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const formData: IFormInput = {
          name: data.name || "",
          surname: data.surname || "",
          password: data.password || "",
          repassword: data.repassword || "",
        };

        onSubmit(formData);
      })}
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
            {...register("name", { required: false })}
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
            {...register("surname", { required: false })}
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
          {...register("password", { required: false })}
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
          {...register("repassword", { required: false })}
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
