"use client";

import { Button, Checkbox, Datepicker, Label, TextInput } from "flowbite-react";
import { HiKey, HiMail } from "react-icons/hi";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { createEvent } from "../api/events/routes";

const schema = yup.object().shape({
  title: yup.string().required("Tytuł jest wymagany"),
  description: yup.string().required("Opis jest wymagany"),
  date: yup.string().required("Data jest wymagana"),
  localization: yup.string().required("Lokalizacja jest wymagana"),
});

interface IFormInput {
  title: string;
  description: string;
  localization: string;
  date: string;
}

export default function EventForm() {
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
    const eventData = {
      title: data.title,
      description: data.description,
      date: data.date,
      localization: data.localization,
      createdAt: "",
    };
    const res = await createEvent(eventData);

    if (res) {
      router.push("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-md flex-col gap-4 w-[400px]"
    >
      {/* Name input */}
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label
            htmlFor="title"
            value="Tytuł wydarzenia"
            className="text-white"
          />
        </div>
        <TextInput
          id="title"
          type="text"
          placeholder="Tytuł wydarzenia"
          {...register("title", { required: true })}
          color={errors.title && "failure"}
          helperText={errors.title?.message}
        />
      </div>
      {/* Name input */}
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label
            htmlFor="description"
            value="Opis wydarzenia"
            className="text-white"
          />
        </div>
        <TextInput
          id="description"
          type="text"
          placeholder="Opis wydarzenia"
          {...register("description", { required: true })}
          color={errors.description && "failure"}
          helperText={errors.description?.message}
        />
      </div>
      {/* Date input */}
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label
            htmlFor="date"
            value="Data wydarzenia"
            className="text-white"
          />
        </div>
        <TextInput
          id="date"
          type="date"
          placeholder="Data wydarzenia"
          {...register("date", { required: true })}
          color={errors.date && "failure"}
          helperText={errors.date?.message}
        />
      </div>
      {/* Name input */}
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label
            htmlFor="localization"
            value="Lokalizacja"
            className="text-white"
          />
        </div>
        <TextInput
          id="localization"
          type="text"
          placeholder="Lokalizacja"
          {...register("localization", { required: true })}
          color={errors.localization && "failure"}
          helperText={errors.localization?.message}
        />
      </div>
      <Button type="submit">Stwórz wydarzenie</Button>
    </form>
  );
}
