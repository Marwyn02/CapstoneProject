import React, { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import useStore from "@/store/store";
import Router from "next/router";
// import { toast } from "@/components/ui/use-toast"

const Room = [
  {
    id: "small room",
    label: "Small Room",
  },
  {
    id: "big room",
    label: "Big Room",
  },
] as const;

const RoomFormSchema = z.object({
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
  room: z.string().refine((value) => value !== "", {
    message: "Please select a room.",
  }),
  adult: z.string(),
  children: z.string(),
  childrenAge: z.array(z.string()),
});

export function RoomForm() {
  const {
    setDate,
    setDayStay,
    setRoom,
    setAdult,
    setChildren,
    setChildrenAge,
  } = useStore();

  const [scheduleCheck, setScheduleCheck] = useState<any>();
  const [daysCheck, setDaysCheck] = useState<number>();
  const [numberOfRooms, setNumberOfRooms] = useState<string>("");
  const [numberOfChildrenAge, setNumberOfChildrenAge] = useState<string>("0");

  const [continueBooking, setContinueBooking] = useState<boolean>(false);

  const disabledBeforeDate = new Date();
  disabledBeforeDate.setDate(1);

  const form = useForm<z.infer<typeof RoomFormSchema>>({
    resolver: zodResolver(RoomFormSchema),
    defaultValues: {
      room: "",
      adult: "1 Adult",
      children: "0",
      childrenAge: ["None"],
    },
  });

  function onSubmit(data: z.infer<typeof RoomFormSchema>) {
    setContinueBooking(true);
    console.log("Data: ", data);

    try {
      if (data) {
        setDate(data?.date.from, data?.date.to);
        setDayStay(daysCheck);
        setRoom(data?.room);
        setAdult(data.adult);
        setChildren(data.children);
        setChildrenAge(data.childrenAge);

        Router.push("/reservation/invoice");
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
      {!continueBooking && (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex justify-between space-x-4"
        >
          {/* Form Section */}
          <section className="space-y-8">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
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

            {/* Room Input Field */}
            <FormField
              control={form.control}
              name="room"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Room available</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {Room.map((item) => (
                        <FormItem
                          className="flex items-center space-x-3 space-y-0"
                          key={item.id}
                        >
                          <FormControl>
                            <RadioGroupItem value={item.id} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
            control={form.control}
            name="room"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rooms</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setNumberOfRooms(value);
                  }}
                  defaultValue="1 Room"
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="1 Room" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1 Room">1 Room</SelectItem>
                    <SelectItem value="2 Rooms">2 Rooms</SelectItem>
                    <SelectItem value="3 Rooms">3 Rooms</SelectItem>
                    <SelectItem value="4 Rooms">4 Rooms</SelectItem>
                    <SelectItem value="5 Rooms">5 Rooms</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}

            {/* Adult Input Field */}
            <FormField
              control={form.control}
              name="adult"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adults</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue="1 Adult">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="1 Adult" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 20 }).map((_, i) => (
                        <SelectItem
                          key={i + 1}
                          value={`${i + 1} ${i + 1 === 1 ? "Adult" : "Adults"}`}
                        >
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
                      setNumberOfChildrenAge(value);
                    }}
                    defaultValue="0"
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="0" />
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
            <section className="grid grid-cols-4 gap-4">
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

            <Button type="submit">Continue</Button>
          </section>

          {/* <RoomInvoice day={daysCheck} /> */}
        </form>
      )}
    </Form>
  );
}
