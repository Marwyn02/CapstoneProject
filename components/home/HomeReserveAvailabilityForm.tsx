import React, { useEffect, useState } from "react";
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

import { CalendarIcon } from "lucide-react";
import Router from "next/router";

const HomeReserveAvailabiltySchema = z.object({
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
  adult: z.string(),
  children: z.string(),
});

const HomeReserveAvailabilityForm = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const [daysCheck, setDaysCheck] = useState<number>();

  const [scheduleCheck, setScheduleCheck] = useState<any>();
  const [adultCount, setAdultCount] = useState<number>(0);
  const [childrenCount, setChildrenCount] = useState<number>(0);

  const [scrolled, setScrolled] = useState(false);

  // const disabledBeforeDate = new Date();
  // disabledBeforeDate.setDate(1);

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
      adult: "1 Adult",
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

      if (data) {
        const values = {
          adultCount: `${adultCount} ${adultCount > 1 ? "adults" : "adult"}`,
          childrenCount: childrenCount,
          date: {
            from: data.date.from,
            to: data.date.to,
          },
          days: daysCheck,
        };

        console.log(values);

        // setDate(data?.date.from, data?.date.to);
        // setDayStay(daysCheck);
        // setAdult(data.adult);
        // setChildren(data.children);
        // setChildrenAge(data.childrenAge);

        Router.push("/hotel");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    if (adultCount > 0 && scheduleCheck) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [adultCount, scheduleCheck]);

  // Day Stay Calculator
  useEffect(() => {
    if (scheduleCheck?.to !== undefined) {
      const differenceMs = scheduleCheck.to - scheduleCheck.from;
      const daysDifference = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
      setDaysCheck(daysDifference);
    }
  }, [scheduleCheck]);

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
          scrolled
            ? "flex justify-around items-start px-2 py-8 bg-white -translate-y-0 duration-700" // scrolled
            : "flex justify-around items-start px-2 py-8 mx-10 bg-slate-50 shadow-sm -translate-y-14 duration-700" // not scrolled
        }
      >
        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-wide">
            Check-in / Check-out
          </p>
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
                        {field.value?.from ? (
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

        <div className="grid place-self-center">
          <Button
            type="submit"
            className="border border-slate-800 px-8 py-3.5 rounded-none bg-transparent text-xs font-semibold tracking-wide text-[#2A3242] hover:bg-[#2A3242] hover:text-slate-100 duration-300"
            disabled={loading}
          >
            Check availability
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default HomeReserveAvailabilityForm;
