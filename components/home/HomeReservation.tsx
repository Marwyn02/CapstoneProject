import React, { useEffect, useState } from "react";
import Router from "next/router";

import { useForm } from "react-hook-form";
import {
  Button,
  GuestAddCountButton,
  GuestMinusCountButton,
} from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { z } from "zod";

import { CalendarIcon, UserRound } from "lucide-react";
import useStore from "@/store/store";

type ScreenProps = {
  width: number;
  height: number;
};

const homeReservationSchema = z.object({
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

const HomeReservation = () => {
  const {
    setDate,
    date,
    setNightStay,
    nightStay,
    setAdult,
    adult,
    setChildren,
    children,
  } = useStore();
  const [loading, setLoading] = useState<boolean>(true);

  const [scrolled, setScrolled] = useState<boolean>(false);

  const [screenSize, setScreenSize] = useState<ScreenProps>(() => ({
    width: 0,
    height: 0,
  }));

  // Disable date yesterdays
  const disabledBeforeDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() - 1,
    1
  );

  const form = useForm<z.infer<typeof homeReservationSchema>>({
    resolver: zodResolver(homeReservationSchema),
    defaultValues: {
      date: {
        from: date.from,
        to: date.to,
      },
    },
  });

  function onSubmit(data: z.infer<typeof homeReservationSchema>) {
    try {
      setLoading(true);
      if (data.date.from && data.date.to) {
        Router.push("/hotel");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    if (adult > 1 && date.from && date.to) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [adult, date]);

  // Day Stay Calculator
  useEffect(() => {
    if ((date.from && date.to) !== undefined) {
      const differenceMs = date.to - date.from;
      const daysDifference = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
      setNightStay(daysDifference);
    }
  }, [date, setNightStay]);

  // Screen size detector
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    setTimeout(() => {
      handleResize();
      window.addEventListener("resize", handleResize);
    }, 0);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Scroll changes
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 170) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={
          screenSize.width >= 768
            ? scrolled
              ? "sticky top-16 z-50 flex justify-center items-center gap-x-4 p-2 bg-white shadow-sm -translate-y-0 duration-700" // scrolled
              : "flex justify-center items-center gap-x-4 p-2 mx-auto bg-white -translate-y-14 duration-700" // not scrolled
            : "h-auto grid grid-cols-5 gap-x-0.5 pb-4 px-8 bg-white shadow-sm space-y-5" // mobile view
        }
      >
        {/* Date checking / checkout input field  */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant={"outline"}
                      className={cn(
                        "w-full md:w-[300px] mt-5 md:mt-0 justify-start text-left text-sm font-normal space-x-2 md:space-x-4",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date.from || date.to ? (
                        <section className="leading-tight md:flex md:divide-x md:space-x-5">
                          <div className="flex gap-x-0.5 text-slate-500 font-medium tracking-tightest">
                            <div className="flex items-center gap-x-0.5">
                              <p>
                                {" "}
                                {new Date(date.from).toLocaleDateString(
                                  "en-US",
                                  {
                                    day: "numeric",
                                  }
                                )}
                              </p>{" "}
                              <p>
                                {new Date(date.from).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                  }
                                )}
                              </p>
                            </div>
                            <p>-</p>
                            {date.to ? (
                              <div className="flex items-center gap-x-0.5">
                                <p>
                                  {" "}
                                  {new Date(date.to).toLocaleDateString(
                                    "en-US",
                                    {
                                      day: "numeric",
                                    }
                                  )}
                                </p>{" "}
                                <p>
                                  {new Date(date.to).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                    }
                                  )}
                                </p>
                              </div>
                            ) : (
                              <>Departure</>
                            )}
                          </div>
                          <div className="text-center font-medium md:indent-4">
                            {nightStay}{" "}
                            {nightStay && nightStay > 1 ? "nights" : "night"}
                          </div>
                        </section>
                      ) : (
                        <span>Arrival - Departure</span>
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

        {/* Adult and Children Counting Field */}
        <Popover>
          <PopoverTrigger className="col-span-2">
            <Button
              type="button"
              className={
                children > 0
                  ? "w-full md:w-[150px] flex space-x-2 items-center border border-black font-semibold py-1 px-2"
                  : "w-full py-2"
              }
            >
              <UserRound className="w-4 mr-2" />
              <div className="text-start leading-none">
                <p>
                  {adult}{" "}
                  <span className="font-normal text-xs">
                    {adult > 1 ? "adults" : "adult"}
                  </span>
                </p>

                {children > 0 && (
                  <p>
                    {children}{" "}
                    <span className="font-normal text-xs">
                      {children > 1 ? "children" : "child"}
                    </span>
                  </p>
                )}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] space-y-2">
            {/* Adult Count Container */}
            <div className="flex justify-center items-center gap-x-6">
              <GuestAddCountButton
                size={"icon"}
                onClick={() => {
                  if (adult < 20) {
                    setAdult(adult + 1);
                  }
                }}
              />
              <p className="flex items-center text-sm font-semibold w-[70px]">
                <UserRound className="h-4 w-4 mr-1.5 text-gray-600" />
                {adult}{" "}
                <span
                  className={
                    adult > 1
                      ? "indent-1 font-normal text-xs"
                      : "indent-1 mr-1.5 font-normal text-xs"
                  }
                >
                  {adult > 1 ? "adults" : "adult"}
                </span>
              </p>
              <GuestMinusCountButton
                variant={"outline"}
                size={"icon"}
                onClick={() => {
                  if (adult > 1) {
                    setAdult(adult - 1);
                  }
                }}
              />
            </div>

            {/* Children Count Container  */}
            <div className="flex justify-center items-center gap-x-6">
              <GuestAddCountButton
                size={"icon"}
                onClick={() => {
                  if (children < 20) {
                    setChildren(children + 1);
                  }
                }}
              />
              <p className="flex justify-center items-center text-sm font-semibold w-[70px]">
                {children}{" "}
                <span className="indent-1 font-normal text-xs">
                  {children > 1 ? "children" : "child"}
                </span>
              </p>
              <GuestMinusCountButton
                variant={"outline"}
                size={"icon"}
                onClick={() => {
                  if (children > 0) {
                    setChildren(children - 1);
                  }
                }}
              />
            </div>
          </PopoverContent>
        </Popover>

        <Button
          type="submit"
          variant={"outline"}
          className="col-span-5 w-full md:w-auto mt-2.5 md:mt-0 px-8 py-3.5 text-xs font-semibold tracking-wide text-[#2A3242] hover:bg-[#2A3242] hover:text-slate-100 duration-300"
          disabled={loading}
        >
          Book
        </Button>
      </form>
    </Form>
  );
};

export default HomeReservation;
