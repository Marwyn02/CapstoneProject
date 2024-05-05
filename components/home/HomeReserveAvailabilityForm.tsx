import React, { useEffect, useState } from "react";
import Router from "next/router";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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

import { format } from "date-fns";
import { z } from "zod";

import { CalendarIcon, UserRound, Plus, Minus } from "lucide-react";
import useStore from "@/store/store";
import { usePathname } from "next/navigation";

type ScreenProps = {
  width: number;
  height: number;
};

const HomeReserveAvailabiltySchema = z.object({
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
  adult: z.string(),
  children: z.string(),
});

const HomeReserveAvailabilityForm = () => {
  const path = usePathname();
  const {
    setDate,
    date,
    setNightStay,
    setAdult,
    adult,
    setChildren,
    children,
  } = useStore();
  const [loading, setLoading] = useState<boolean>(true);

  const [daysCheck, setDaysCheck] = useState<number>();

  const [scheduleCheck, setScheduleCheck] = useState<any>();
  const [adultCount, setAdultCount] = useState<number>(adult || 2);
  const [childrenCount, setChildrenCount] = useState<number>(children || 0);

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

  const form = useForm<z.infer<typeof HomeReserveAvailabiltySchema>>({
    resolver: zodResolver(HomeReserveAvailabiltySchema),
    defaultValues: {
      date: {
        from: date.from,
        to: date.to,
      },
      adult: "2 Adults",
      children: "0",
    },
  });

  function onSubmit(data: z.infer<typeof HomeReserveAvailabiltySchema>) {
    try {
      setLoading(true);

      if (adultCount === 0) {
        setLoading(false);
        return;
      }

      if (data || (date.from && date.to)) {
        setDate(data?.date.from, data?.date.to);
        setNightStay(daysCheck);
        setAdult(adultCount);
        setChildren(childrenCount);

        Router.push("/hotel");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    if ((adultCount > 0 && scheduleCheck) || (date.from && date.to)) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [adultCount, scheduleCheck, date]);

  // Day Stay Calculator
  useEffect(() => {
    if (scheduleCheck?.to !== undefined) {
      const differenceMs = scheduleCheck.to - scheduleCheck.from;
      const daysDifference = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
      setDaysCheck(daysDifference);
    }
  }, [scheduleCheck]);

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
          path === "/hotel"
            ? "sticky top-2 flex justify-center items-center gap-x-4 p-2 z-50 bg-white translate-y-14 duration-700"
            : screenSize.width >= 768
            ? scrolled
              ? "sticky top-16 z-50 flex justify-center items-center gap-x-4 p-2 bg-white shadow-sm -translate-y-0 duration-700" // scrolled
              : "flex justify-center items-center gap-x-4 p-2 mx-auto bg-white -translate-y-14 duration-700" // not scrolled
            : "flex-col p-8 bg-white shadow-sm space-y-5" // mobile view
        }
      >
        <div className="space-y-2">
          {/* Date checkin checkout input field  */}
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
                              {format(field.value.from, "LLL dd, y") +
                                " " +
                                "-" +
                                " " +
                                format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
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
        </div>

        {/* Mobile Viewed Adult and Children Counting  */}
        <section className="grid grid-cols-3 items-center md:hidden">
          <div className="space-y-2">
            <p className="text-sm font-semibold tracking-wide">Adults</p>
            {/* Adult Counting */}
            <div className="flex items-center gap-x-3">
              <button
                type="button"
                className="border border-black px-2.5 py-0.5"
                onClick={() => {
                  if (adultCount < 20) {
                    setAdultCount(adultCount + 1);
                  }
                }}
              >
                +
              </button>
              <span>{adultCount}</span>
              <button
                type="button"
                className="border border-black px-2.5 py-0.5"
                onClick={() => {
                  if (adultCount > 0) {
                    setAdultCount(adultCount - 1);
                  }
                }}
              >
                -
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold tracking-wide">Children</p>
            {/* Children Counting */}
            <div className="flex items-center gap-x-3">
              <button
                type="button"
                className="border border-black px-2.5 py-0.5"
                onClick={() => {
                  if (childrenCount < 20) {
                    setChildrenCount(childrenCount + 1);
                  }
                }}
              >
                +
              </button>
              <span>{childrenCount}</span>
              <button
                type="button"
                className="border border-black px-2.5 py-0.5"
                onClick={() => {
                  if (childrenCount > 0) {
                    setChildrenCount(childrenCount - 1);
                  }
                }}
              >
                -
              </button>
            </div>
          </div>
          <div></div>
        </section>

        {/* Desktop view  */}
        <div className="space-y-2 hidden md:block">
          {/* Adult Counting */}
          <div className="flex items-center gap-x-3">
            <button
              type="button"
              className="border border-black p-2"
              onClick={() => {
                if (adultCount < 20) {
                  setAdultCount((prevCount) => prevCount + 1);
                }
              }}
            >
              <Plus className="h-4 w-4" />
            </button>
            <span className="flex items-center text-sm">
              <UserRound className="h-5 w-5 mr-3 text-gray-600" />{" "}
              {adultCount > 1 ? `${adultCount} adults` : `${adultCount} adult`}
            </span>
            <button
              type="button"
              className="border border-black p-2"
              onClick={() => {
                if (adultCount > 0) {
                  setAdultCount(adultCount - 1);
                }
              }}
            >
              <Minus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-2 hidden md:block">
          {/* Children Counting */}
          <div className="flex items-center gap-x-3">
            <button
              type="button"
              className="border border-black p-2"
              onClick={() => {
                if (childrenCount < 20) {
                  setChildrenCount(childrenCount + 1);
                }
              }}
            >
              <Plus className="h-4 w-4" />
            </button>
            <span className="text-sm">
              {" "}
              {childrenCount > 1
                ? `${childrenCount} children`
                : `${childrenCount} child`}
            </span>
            <button
              type="button"
              className="border border-black p-2"
              onClick={() => {
                if (childrenCount > 0) {
                  setChildrenCount(childrenCount - 1);
                }
              }}
            >
              <Minus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="md:grid md:place-self-center">
          <Button
            type="submit"
            className="w-full md:w-auto mt-2.5 md:mt-0 border border-slate-800 px-8 py-3.5 rounded-none bg-transparent text-xs font-semibold tracking-wide text-[#2A3242] hover:bg-[#2A3242] hover:text-slate-100 duration-300"
            disabled={loading}
          >
            {path !== "/hotel" ? "Book" : "Change book"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default HomeReserveAvailabilityForm;
