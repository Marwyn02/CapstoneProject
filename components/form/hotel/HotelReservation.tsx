import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserRound } from "lucide-react";
import {
  GuestAddCountButton,
  GuestMinusCountButton,
} from "@/components/ui/button";

import useStore from "@/store/store";
import { useRouter } from "next/router";

const HotelReservation = () => {
  const router = useRouter();
  const {
    date,
    nightStay,
    adult,
    setAdult,
    children,
    setChildren,
    roomQuantity,
    currentRoomIndex,
  } = useStore();

  return (
    <section className="fixed w-full top-5 grid grid-cols-3 justify-center items-center gap-x-2 px-6 py-1.5 z-40 bg-white translate-y-14 md:top-2 md:py-3 md:px-14 duration-700">
      <div className="col-start-2 col-span-1 grid grid-cols-3 items-start">
        {/* Date and night stay display */}
        <div className="grid grid-cols-1 text-xs font-light tracking-wider md:text-end md:px-2">
          {date.from && date.to ? (
            <>
              {new Date(date.from).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              }) +
                " " +
                "-" +
                " " +
                new Date(date.to).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
            </>
          ) : (
            <span>Arrival - Departure</span>
          )}
          {nightStay && nightStay !== 0 ? (
            <p className="text-sm font-semibold tracking-tight">
              {nightStay} {nightStay > 1 ? "nights" : "night"}
            </p>
          ) : (
            ""
          )}
        </div>

        {/* Adult and Children Counting field  */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="grid justify-center md:w-[120px] border-x border-gray-500 mx-auto text-sm font-semibold px-1 text-end md:text-start leading-tight md:px-6">
              <p>
                {adult}{" "}
                <span className="font-light text-xs text-gray-600">
                  {adult > 1 ? "adults" : "adult"}
                </span>
              </p>
              <p>
                {children}{" "}
                <span className="font-light text-xs text-gray-600">
                  {children > 1 ? "children" : "child"}
                </span>
              </p>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] space-y-2">
            {/* Adult Count Container */}
            <div className="flex justify-center items-center gap-x-6">
              <GuestAddCountButton
                size={"icon"}
                onClick={() => {
                  if (adult < 20) {
                    const updatedAdults = adult + 1;
                    setAdult(updatedAdults);
                    router.push(
                      {
                        pathname: router.pathname,
                        query: {
                          checkIn: date.from,
                          checkOut: date.to,
                          adults: updatedAdults,
                          childrens: children,
                          nights: nightStay,
                        },
                      },
                      undefined,
                      { shallow: true }
                    );
                  }
                }}
              />
              <div className="flex items-center text-sm font-semibold w-[70px]">
                <UserRound className="h-4 w-4 mr-1.5 text-gray-600" />
                <p>
                  {adult}{" "}
                  <span className="font-normal text-xs">
                    {adult > 1 ? "adults" : "adult"}
                  </span>
                </p>
              </div>
              <GuestMinusCountButton
                variant={"outline"}
                size={"icon"}
                onClick={() => {
                  if (adult > 1) {
                    const updatedAdults = adult - 1;
                    setAdult(updatedAdults);
                    router.push(
                      {
                        pathname: router.pathname,
                        query: {
                          checkIn: date.from,
                          checkOut: date.to,
                          adults: updatedAdults,
                          childrens: children,
                          nights: nightStay,
                        },
                      },
                      undefined,
                      { shallow: true }
                    );
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
                    const updatedChildren = children + 1;
                    setAdult(updatedChildren);
                    router.push(
                      {
                        pathname: router.pathname,
                        query: {
                          checkIn: date.from,
                          checkOut: date.to,
                          adults: adult,
                          childrens: updatedChildren,
                          nights: nightStay,
                        },
                      },
                      undefined,
                      { shallow: true }
                    );
                  }
                }}
              />
              <div className="flex justify-center items-center text-sm font-semibold w-[70px]">
                <p>
                  {children}{" "}
                  <span className="font-normal text-xs">
                    {children > 1 ? "children" : "child"}
                  </span>
                </p>
              </div>
              <GuestMinusCountButton
                variant={"outline"}
                size={"icon"}
                onClick={() => {
                  if (children > 0) {
                    const updatedChildren = children - 1;
                    setChildren(updatedChildren);
                    router.push(
                      {
                        pathname: router.pathname,
                        query: {
                          checkIn: date.from,
                          checkOut: date.to,
                          adults: adult,
                          childrens: updatedChildren,
                          nights: nightStay,
                        },
                      },
                      undefined,
                      { shallow: true }
                    );
                  }
                }}
              />
            </div>
          </PopoverContent>
        </Popover>

        {/* Rooms */}
        <div>
          {currentRoomIndex > roomQuantity ? (
            <p className="text-xs text-gray-900 font-semibold">
              {currentRoomIndex - 1} / {roomQuantity}
            </p>
          ) : (
            <p className="text-xs text-gray-900 font-semibold">
              {currentRoomIndex} / {roomQuantity}
            </p>
          )}

          <p className="text-xs text-gray-600 font-light">Rooms</p>
        </div>
      </div>
    </section>
  );
};

export default HotelReservation;
