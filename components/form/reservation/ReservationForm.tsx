import React, { useEffect, useState } from "react";
import Router from "next/router";
import useStore from "@/store/store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../../ui/input";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/component";

type Rooms = {
  id: string;
  name: string;
  image: string;
  amenities: {
    amenities: string[];
  };
  no_available: number;
  created_at: string;
  price: number;
  no_guest: number;
};

const RoomFormSchema = z.object({
  adult: z.number(),
  children: z.number(),
  childrenAge: z.array(z.string()),
});

export function ReservationForm({ user, rooms }: { user: User; rooms: Rooms }) {
  const {
    setDate,
    nightStay,
    setNightStay,
    setAdult,
    adult,
    setChildren,
    children,
    setChildrenAge,
    date,
    room,
    total,
    setTotal,
  } = useStore();
  const supabase = createClient();
  const [numberOfChildrenAge, setNumberOfChildrenAge] = useState<string>("0");

  const form = useForm<z.infer<typeof RoomFormSchema>>({
    resolver: zodResolver(RoomFormSchema),
    defaultValues: {
      adult: adult,
      children: children,
      childrenAge: ["None"],
    },
  });

  async function onSubmit(data: z.infer<typeof RoomFormSchema>) {
    try {
      const d = {
        user_id: user.id,
        check_in: date.from,
        check_out: date.to,
        adult: String(adult),
        children: String(children),
        payment: String(total),
        room_id: rooms.id,
      };
      console.log(d);

      console.log("Your reservation is successful!");

      const { error } = await supabase.from("reservation").insert([
        {
          user_id: user.id,
          check_in: date.from,
          check_out: date.to,
          adult: String(adult),
          children: String(children),
          payment: String(total),
          room_id: rooms.id,
        },
      ]);

      // if (error) {
      //   console.error(error);
      // } else {
      //   console.log("Your reservation is successful!");
      // }

      // if (data) {
      //   console.log(data);

      //   setDate(data?.date.from, data?.date.to);
      //   setNightStay(daysCheck);
      //   setAdult(data.adult);
      //   setChildren(data.children);
      //   setChildrenAge(data.childrenAge);

      //   Router.push("/hotel/reservation/invoice");
      // }
      // Router.push("/hotel/enhancements/reservation/invoice");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex px-8 pt-24 pb-10 space-y-8 md:flex md:justify-between md:space-x-4 md:px-10 md:py-24"
      >
        {/* Form Section */}
        <section className="space-y-8">
          <div>
            <h2 className="font-thin text-2xl font-serif">Guest Information</h2>
            {!user && (
              <div className="grid grid-cols-1 space-y-4 border-b border-gray-600 pt-2 pb-8">
                {" "}
                <div className="grid grid-cols-2 gap-x-2">
                  <input
                    type="text"
                    placeholder="First name"
                    className="border border-gray-200 rounded-md px-3 py-2.5 placeholder:text-sm text-sm"
                  />{" "}
                  <input
                    type="text"
                    placeholder="Last name"
                    className="border border-gray-200 rounded-md px-3 py-2.5 placeholder:text-sm text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-2">
                  <input
                    type="text"
                    placeholder="Email address"
                    className="border border-gray-200 rounded-md px-3 py-2.5 placeholder:text-sm text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="border border-gray-200 rounded-md px-3 py-2.5 placeholder:text-sm text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-2">
                  <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-200 rounded-md px-3 py-2.5 placeholder:text-sm text-sm"
                  />
                </div>
                <button
                  type="button"
                  className="w-full md:w-auto mt-2.5 md:mt-0 border border-slate-800 py-2.5 rounded-none bg-transparent text-xs font-semibold tracking-wide text-[#2A3242] hover:bg-[#2A3242] hover:text-slate-100 duration-300"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>

          <section className="flex items-center gap-x-2 w-full md:grid-cols-none">
            {/* Adult Input Field */}
            <FormField
              control={form.control}
              name="adult"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Adults</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setAdult(parseInt(value));
                    }}
                    defaultValue={adult.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={adult} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 20 }).map((_, i) => (
                        <SelectItem key={i + 1} value={`${i + 1}`}>
                          {i + 1} {i + 1 === 1 ? "Adult" : "Adults"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Children Input Field */}
            <FormField
              control={form.control}
              name="children"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Children</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setChildren(parseInt(value));
                      setNumberOfChildrenAge(value);
                    }}
                    defaultValue={children.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={children} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 16 }).map((_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i} {i === 1 ? "Child" : "Children"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          {/* <div>
            <p className="text-xs mb-1">Special Request</p>
            <textarea
              name=""
              id=""
              className="h-[100px] w-full border border-black rounded-md text-sm p-2.5"
            ></textarea>
          </div> */}

          {/* Children Age Input Field */}
          <section>
            {parseInt(numberOfChildrenAge) !== 0 && (
              <h2 className="text-sm font-semibold mb-2.5">
                Indicate your children ages.
              </h2>
            )}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Array.from({ length: parseInt(numberOfChildrenAge) }).map(
                (_, i) => (
                  <FormField
                    key={i}
                    control={form.control}
                    name={`childrenAge.${i}`}
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Age" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 13 }).map((_, j) => (
                              <SelectItem
                                key={j}
                                value={`${j} ${j <= 1 ? "Year" : "Years"}`}
                              >
                                {j} {j <= 1 ? "Year" : "Years"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              )}
            </section>
          </section>

          <section>
            <h2 className="my-2">Finalise your booking</h2>
            <div className="grid grid-cols-1 space-y-4">
              <input
                type="text"
                placeholder="Credit card number"
                className="border border-gray-200 rounded-md px-3 py-2.5 placeholder:text-sm text-sm"
              />
              <div className="grid grid-cols-2 gap-x-2">
                <input
                  type="text"
                  placeholder="Month"
                  className="border border-gray-200 rounded-md px-3 py-2.5 placeholder:text-sm text-sm"
                />
                <input
                  type="text"
                  placeholder="Year"
                  className="border border-gray-200 rounded-md px-3 py-2.5 placeholder:text-sm text-sm"
                />
              </div>
            </div>
          </section>

          <Button type="submit" className="w-full">
            Confirm booking
          </Button>
        </section>
      </form>
    </Form>
  );
}
