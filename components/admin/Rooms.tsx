import Image from "next/image";
import React from "react";
import type { Room } from "@/types/types";
import { AirVent, Hotel, Martini, Wifi } from "lucide-react";
import { Button } from "../ui/button";

const Rooms = ({ rooms }: { rooms: Room }) => {
  return (
    <section className="relative overflow-x-auto col-start-2 col-span-full space-y-4">
      <div className="flex justify-end items-center my-5">
        <Button>Add Room</Button>
      </div>
      <h2 className="uppercase font-semibold text-xs mt-5 mb-2">Rooms</h2>{" "}
      <div className="flex space-x-2">
        {rooms.map((room, i: number) => (
          <div key={i} className="border rounded-md">
            <Image
              src={room.image}
              alt={room.name}
              height={500}
              width={500}
              className="h-[300px]"
            />
            <div className="p-2.5">
              <div className="flex justify-between items-center">
                <p className="text-lg font-serif font-medium text-gray-700">
                  {room.name}
                </p>
                <p className="font-serif">₱{room.price}</p>
              </div>

              {/* Highlight inclusions */}
              <div className="md:border-0 md:border-gray-400 py-4 my-5 md:pt-5 md:pb-2 md:mt-0">
                <p className="mb-3 font-bold underline md:font-medium text-xs text-gray-900 uppercase">
                  Highlighted Inclusions
                </p>
                <div className="grid grid-cols-3 gap-x-2 indent-2 text-sm font-light text-gray-600">
                  <div className="flex">
                    <Wifi className="w-4" />
                    <p>Free Wi-Fi</p>
                  </div>

                  <div className="flex">
                    <Hotel className="w-4" />
                    <p>Daily Housekeeping</p>
                  </div>

                  <div className="flex">
                    <AirVent className="w-4" />
                    <p>Aircondition</p>
                  </div>

                  <div className="flex">
                    <Martini className="w-4" />
                    <p>Welcome Drink</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Rooms;
