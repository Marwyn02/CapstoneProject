import React, { useEffect, useState } from "react";
import Router from "next/router";

import { Controller, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import useStore from "@/store/store";

import {
  Button,
  GuestAddCountButton,
  GuestMinusCountButton,
} from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CalendarIcon, UserRound } from "lucide-react";

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
    roomGuest,
    setRoomGuest,
    roomQuantity,
    setRoomQuantity,
  } = useStore();
  const { control, handleSubmit } = useForm();

  // Utility States
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const [initialDate, setInitialDate] = useState<any>({
    date: { from: undefined, to: undefined },
  });

  // Disable date yesterdays
  const disabledBeforeDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() - 1,
    1
  );

  const onSubmit = (data: any) => {
    try {
      setLoading(true);
      setIsSubmitting(true);
      if (date.from && date.to) {
        Router.push({
          pathname: "/hotel",
        });
      } else if (data.date.from && data.date.to) {
        Router.push({
          pathname: "/hotel",
        });
      }
    } catch (error) {
      console.error("Error occured: ", error);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        setLoading(false);
      }, 3000);
    }
  };

  const handleAdultChange = (index: number, increment: number) => {
    const updatedRooms = roomGuest.map((room, i) => {
      if (i === index) {
        return {
          ...room,
          adults: Math.max(1, room.adults + increment),
        };
      }
      return room;
    });
    setRoomGuest(updatedRooms);
  };

  const handleChildrenChange = (index: number, increment: number) => {
    const updatedRooms = roomGuest.map((room, i) => {
      if (i === index) {
        return {
          ...room,
          children: Math.max(0, room.children + increment),
        };
      }
      return room;
    });
    setRoomGuest(updatedRooms);
  };

  // Side effect the total guest number
  useEffect(() => {
    const roomGuestQuery = roomGuest.map((room, index) => ({
      [`room${index + 1}Adults`]: room.adults,
      [`room${index + 1}Children`]: room.children,
    }));

    let totalAdults = 0;
    let totalChildren = 0;

    for (const room of roomGuestQuery) {
      const index = roomGuestQuery.indexOf(room) + 1; // Get the current room index

      const adultProp = `room${index}Adults`;
      const childrenProp = `room${index}Children`;

      totalAdults += room[adultProp];
      totalChildren += room[childrenProp];
    }

    setAdult(totalAdults);
    setChildren(totalChildren);
  }, [roomGuest, setAdult, setChildren]);

  // Set the room guest number form
  useEffect(() => {
    if (roomQuantity > roomGuest.length) {
      setRoomGuest([
        ...roomGuest,
        { adults: 2, children: 0, room: "", price: 0 },
      ]);
    } else if (roomQuantity < roomGuest.length) {
      setRoomGuest(roomGuest.slice(0, roomQuantity));
    }
  }, [setRoomGuest, roomGuest, roomQuantity]);

  useEffect(() => {
    if (date.from && date.to && nightStay > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [adult, date, nightStay]);

  // Day Stay Calculator
  useEffect(() => {
    if (initialDate.date.from) {
      setNightStay(0);
    }

    if (date.from && date.to) {
      const from = new Date(date.from);
      const to = new Date(date.to);

      if (from && to) {
        const differenceMs = to.getTime() - from.getTime();
        const daysDifference = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
        setNightStay(daysDifference);
      }
    }
  }, [date, initialDate.date.from, setNightStay]);

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`h-auto grid grid-cols-5 gap-x-0.5 pb-4 px-8 bg-white shadow-sm space-y-5 md:flex md:justify-center md:items-center md:py-2
        md:space-y-0 md:gap-x-4 duration-700 ${
          scrolled
            ? "md:sticky md:top-16 md:z-50 md:shadow-sm md:-translate-y-0" // scrolled
            : "md:mx-auto md:-translate-y-14" // not scrolled
        }`}
    >
      {/* Date checking / checkout input field  */}
      <Controller
        name={"date"}
        control={control}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "h-auto w-full md:w-[300px] mt-5 md:mt-0 justify-start text-left text-sm text-slate-600 font-normal space-x-2 py-2.5 md:space-x-4 hover:text-slate-100",
                  !field.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date.from || date.to ? (
                  <section className="leading-tight md:flex md:divide-x md:space-x-5">
                    <div className="flex gap-x-0.5 font-medium tracking-tightest">
                      <div className="flex items-center gap-x-0.5">
                        <>
                          {new Date(date.from).toLocaleDateString("en-US", {
                            day: "numeric",
                          })}
                        </>{" "}
                        <>
                          {new Date(date.from).toLocaleDateString("en-US", {
                            month: "short",
                          })}
                        </>
                      </div>
                      <p>-</p>
                      {date.to ? (
                        <div className="flex items-center gap-x-0.5">
                          <>
                            {new Date(date.to).toLocaleDateString("en-US", {
                              day: "numeric",
                            })}
                          </>{" "}
                          <>
                            {new Date(date.to).toLocaleDateString("en-US", {
                              month: "short",
                            })}
                          </>
                        </div>
                      ) : (
                        <>Departure</>
                      )}
                    </div>

                    {!isNaN(nightStay) && (
                      <div className="text-center font-medium md:indent-4">
                        {nightStay} {nightStay > 1 ? "nights" : "night"}
                      </div>
                    )}
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
                defaultMonth={field.value?.from || new Date()}
                selected={
                  field.value?.from && field.value?.to
                    ? { from: field.value.from, to: field.value.to }
                    : { from: date.from, to: date.to }
                }
                onSelect={(value) => {
                  field.onChange(value);
                  setInitialDate({
                    date: { from: value?.from, to: value?.to },
                  });

                  setDate(value?.from, value?.to);
                }}
                numberOfMonths={2}
                disabled={(date) => date < disabledBeforeDate}
              />
            </PopoverContent>
          </Popover>
        )}
      />

      {/* Adult and Children Counting Field */}
      <Popover>
        <PopoverTrigger className="col-span-2 md:col-span-0" asChild>
          <Button
            type="button"
            className={`w-full md:w-[150px] h-auto ${
              children > 0
                ? "flex space-x-2 items-center border border-black font-semibold py-1 px-2"
                : "py-2"
            }`}
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
        <PopoverContent className="w-full space-y-4 px-8 py-5 rounded-none">
          <div className="flex justify-center items-center gap-x-6 pb-2.5 border-b border-gray-400">
            <GuestAddCountButton
              size={"icon"}
              onClick={() => {
                if (roomQuantity < 4) {
                  setRoomQuantity(roomQuantity + 1);
                }
              }}
            />
            <div className="flex justify-center items-center text-sm font-semibold w-[70px]">
              {roomQuantity}{" "}
              <span className="indent-1 font-normal text-xs">
                {roomQuantity > 1 ? "Rooms" : "Room"}
              </span>
            </div>
            <GuestMinusCountButton
              variant={"outline"}
              size={"icon"}
              onClick={() => {
                if (roomQuantity > 1) {
                  setRoomQuantity(roomQuantity - 1);
                }
              }}
            />
          </div>

          {/* Adult Count Container */}
          <div
            className={`grid ${
              roomGuest.length > 1 ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
            {roomGuest.map((room, index) => (
              <div
                key={index}
                className={`space-y-2 py-5 ${
                  index % 2 === 0 ? "border-r border-gray-300 pr-5" : "pl-5"
                } ${roomGuest.length === 1 && "border-none pr-0"} ${
                  index === 2 || index === 3 ? "border-t border-gray-300" : ""
                }`}
              >
                <p className="tracking-widest text-xs text-gray-600 uppercase">
                  Room {index + 1}
                </p>
                {/* Adult handler */}
                <div className="flex items-center gap-10">
                  <GuestAddCountButton
                    size={"icon"}
                    onClick={() => {
                      if (room.adults < 4) {
                        handleAdultChange(index, 1);
                      }
                    }}
                  />
                  <div className="flex items-center text-sm font-semibold w-[70px]">
                    <UserRound className="h-4 w-4 mr-1.5 text-gray-600" />
                    {room.adults}{" "}
                    <span
                      className={
                        room.adults > 1
                          ? "indent-1 font-normal text-xs"
                          : "indent-1 mr-1.5 font-normal text-xs"
                      }
                    >
                      {room.adults > 1 ? "adults" : "adult"}
                    </span>
                  </div>
                  <GuestMinusCountButton
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => handleAdultChange(index, -1)}
                  />
                </div>

                {/* Children Count Container  */}
                <div className="flex items-center gap-10">
                  <GuestAddCountButton
                    size={"icon"}
                    onClick={() => {
                      if (room.children < 4) {
                        handleChildrenChange(index, 1);
                      }
                    }}
                  />
                  <div className="flex justify-center items-center text-sm font-semibold w-[70px]">
                    {room.children}{" "}
                    <span className="indent-1 font-normal text-xs">
                      {room.children > 1 ? "children" : "child"}
                    </span>
                  </div>
                  <GuestMinusCountButton
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => handleChildrenChange(index, -1)}
                  />
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Button
        type="submit"
        variant={"outline"}
        className="col-span-5 md:col-span-0 w-full md:w-auto mt-2.5 md:mt-0 md:m-0 px-8 py-3.5 text-xs font-semibold tracking-wide text-[#2A3242] hover:bg-[#2A3242] hover:text-slate-100 duration-300"
        disabled={isSubmitting || loading}
      >
        {!isSubmitting ? "Book" : "Preparing your room"}
      </Button>
    </form>
  );
};

export default HomeReservation;
