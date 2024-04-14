"use client";

import React, { useState } from "react";
import Router from "next/router";
import useStore from "@/store/store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";

const formSchema = z.object({
  place: z.string(),
});

export function HotelChoiceForm() {
  const { setPlace } = useStore();

  const [placeClicked, setPlaceClicked] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      place: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setPlace(values.place);
      Router.push("/hotel/reservation");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-10">
        <FormField
          control={form.control}
          name="place"
          render={({ field }) => (
            <FormItem className="space-y-8">
              <FormLabel>Choose where would you like.</FormLabel>
              <FormControl className="my-2">
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    setPlaceClicked(value);
                  }}
                  defaultValue={field.value}
                  className="flex flex-row space-3"
                >
                  <FormItem
                    className={`flex items-center space-y-0 rounded-md border ${
                      placeClicked === "La Union Staycation Resort"
                        ? "border-indigo-500 border-4"
                        : "border-4 border-transparent"
                    }`}
                  >
                    <FormControl className="hidden">
                      <RadioGroupItem value="La Union Staycation Resort" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <Image
                        src="/RoomImage.webp"
                        height={150}
                        width={150}
                        alt="Image"
                      />
                    </FormLabel>
                  </FormItem>
                  <FormItem
                    className={`flex items-center space-x-3 space-y-0 rounded-md border ${
                      placeClicked === "Batangas Beach Resort"
                        ? "border-indigo-500"
                        : ""
                    }`}
                  >
                    <FormControl>
                      <RadioGroupItem value="Batangas Beach Resort" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Batangas Beach Resort
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Continue</Button>
      </form>
    </Form>
  );
}
