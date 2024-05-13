import React, { useEffect, useState } from "react";
import Router from "next/router";
import useStore from "@/store/store";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
// import { toast } from "@/components/ui/use-toast"

const Meal = [
  {
    id: "lunch",
    label: "Lunch",
  },
  {
    id: "dinner",
    label: "Dinner",
  },
] as const;

const Transport = [
  {
    id: "pickup service",
    label: "Pick-up Service",
    info: "This refers to transporting you (our customer) to this desired destination.",
  },
  {
    id: "dropoff service",
    label: "Drop-off Service",
    info: "This refers to transporting you (our customer) back to your homes.",
  },
  {
    id: "roundtrip service",
    label: "Round-trip Service",
    info: "This refers to providing transportation for you (our customer) from your home to our location (this place) and then back to your home again. It covers both pick-up and drop-off services in a single trip.",
  },
] as const;

const RoomFormSchema = z
  .object({
    date: z.object({
      from: z.date(),
      to: z.date(),
    }),
    adult: z.number(),
    children: z.number(),
    childrenAge: z.array(z.string()),
    meal: z.boolean().default(false).optional(),
    mealItems: z.array(z.string()).nullable(),
    transport: z.boolean().default(false).optional(),
    transportItems: z.string(),
  })
  .superRefine((values, ctx) => {
    if (values.meal === true && values?.mealItems?.length === 0) {
      ctx.addIssue({
        message: "Meal selection must be filled in.",
        code: z.ZodIssueCode.custom,
        path: ["mealItems"],
      });
    }
    if (values.meal === false) {
      values.mealItems = [];
    }
    if (values.transport === true && values.transportItems.length === 0) {
      ctx.addIssue({
        message: "Transport service selection must be filled in.",
        code: z.ZodIssueCode.custom,
        path: ["transportItems"],
      });
    }
    if (values.transport === false) {
      values.transportItems = "";
    }
  });

export function ReservationForm({ data }: { data: any }) {
  const {
    setDate,
    setNightStay,
    setAdult,
    adult,
    setChildren,
    children,
    setChildrenAge,
    date,
  } = useStore();

  const [scheduleCheck, setScheduleCheck] = useState<any>();
  const [daysCheck, setDaysCheck] = useState<number>();
  const [includeMeal, setIncludeMeal] = useState<boolean>(false);
  const [includeTransport, setIncludeTransport] = useState<boolean>(false);
  const [numberOfChildrenAge, setNumberOfChildrenAge] = useState<string>("0");

  // Disable date yesterdays
  const disabledBeforeDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() - 1,
    1
  );

  const form = useForm<z.infer<typeof RoomFormSchema>>({
    resolver: zodResolver(RoomFormSchema),
    defaultValues: {
      adult: adult,
      children: children,
      childrenAge: ["None"],
      date: {
        to: date.to,
        from: date.from,
      },
      meal: false,
      mealItems: [],
      transport: false,
      transportItems: "",
    },
  });

  function onSubmit(data: z.infer<typeof RoomFormSchema>) {
    try {
      if (data) {
        console.log(data);

        setDate(data?.date.from, data?.date.to);
        setNightStay(daysCheck);
        setAdult(data.adult);
        setChildren(data.children);
        setChildrenAge(data.childrenAge);

        Router.push("/hotel/reservation/invoice");
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Day Stay Calculator
  useEffect(() => {
    if (scheduleCheck?.to !== undefined) {
      const differenceMs = scheduleCheck.to - scheduleCheck.from;
      const daysDifference = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
      setDaysCheck(daysDifference);
    }
  }, [scheduleCheck]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex justify-between space-x-4 px-10 py-24"
      >
        {/* Form Section */}
        <section className="space-y-8">
          <h2 className="font-thin text-2xl font-serif">
            Personal Information
          </h2>
          {!data.user && (
            <div className="grid grid-cols-1 space-y-4 border-b pb-8">
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
                type="submit"
                className="w-full md:w-auto mt-2.5 md:mt-0 border border-slate-800 py-2.5 rounded-none bg-transparent text-xs font-semibold tracking-wide text-[#2A3242] hover:bg-[#2A3242] hover:text-slate-100 duration-300"
              >
                Sign up
              </button>
            </div>
          )}

          {/* Date Stay Input Field */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date.from && date.to ? (
                          <>
                            {new Date(date.from).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }) +
                              " " +
                              "-" +
                              " " +
                              new Date(date.to).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                          </>
                        ) : field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value?.from}
                        selected={field.value}
                        onSelect={(value) => {
                          field.onChange(value);
                          setDate(value?.from, value?.to);
                          setScheduleCheck(value);
                        }}
                        numberOfMonths={2}
                        disabled={(date) => date < disabledBeforeDate}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Adult Input Field */}
          <FormField
            control={form.control}
            name="adult"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
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

          {/* Children Age Input Field */}
          <section>
            {parseInt(numberOfChildrenAge) !== 0 && (
              <h2 className="text-sm font-semibold mb-2.5">
                Indicate your children ages.
              </h2>
            )}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

          {/* Adds on Input Field */}
          <section className="border-t border-gray-600 pt-5">
            <h2 className="my-2">Enhance your stay</h2>
            {/* Meal Inclusion Input Field */}
            <div className="space-y-4 mb-4">
              <FormField
                control={form.control}
                name="meal"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(value: boolean) => {
                          field.onChange(value);
                          setIncludeMeal(value);
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Include meal?</FormLabel>
                      <FormDescription>
                        You can manage your meal in your stay.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {includeMeal && (
                <FormField
                  control={form.control}
                  name="mealItems"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Meal</FormLabel>
                        <FormDescription>
                          Select the meals you want to include in your stay.
                        </FormDescription>
                      </div>
                      {Meal.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="mealItems"
                          render={({ field }: any) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value: string) =>
                                                value !== item.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Transport Service Inclusion Input Field */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="transport"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(value: boolean) => {
                          field.onChange(value);
                          setIncludeTransport(value);
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Transport Service</FormLabel>
                      <FormDescription>
                        Less hassle transport service
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {includeTransport && (
                <FormField
                  control={form.control}
                  name="transportItems"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Service type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {Transport.map((item) => (
                            <FormItem
                              className="flex items-center space-x-3 space-y-0"
                              key={item.id}
                            >
                              <FormControl>
                                <RadioGroupItem value={item.id} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>{item.label}</FormLabel>
                                <FormDescription>{item.info}</FormDescription>
                              </div>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
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

          <Button type="submit">Confirm booking</Button>
        </section>
      </form>
    </Form>
  );
}
