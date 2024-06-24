import Image from "next/image";
import React from "react";

const Card = ({ reservation, rooms }: any) => {
  return (
    <div className="shadow-md rounded-b-md">
      <Image
        src={rooms.image}
        alt={rooms.name}
        height={600}
        width={600}
        className="h-[200px] w-full object-cover rounded-t-md"
      />
      <div>
        <div className="p-5">
          <p className="text-2xl font-bold">{rooms.name}</p>
          <p>Sub title</p>
        </div>
        <div className="grid grid-cols-3 gap-4 border-t p-4">
          <div>
            <p className="font-semibold">Date</p>
            <div className="flex items-center mt-1.5 gap-x-2">
              <p className="text-sm font-semibold text-gray-700">Check In: </p>
              <p className="text-sm text-gray-500">
                {new Date(reservation.check_in).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-x-2">
              <p className="text-sm font-semibold text-gray-700">Check Out: </p>
              <p className="text-sm text-gray-500">
                {new Date(reservation.check_out).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <p className="font-semibold">Time</p>
            <div className="flex items-center mt-1.5 gap-x-2">
              <p className="text-sm font-semibold text-gray-700">Time In: </p>
              <p className="text-sm text-gray-500">2pm</p>
            </div>
            <div className="flex items-center gap-x-2">
              <p className="text-sm font-semibold text-gray-700">Time Out: </p>
              <p className="text-sm text-gray-500">11am</p>
            </div>
          </div>

          <div>
            <p className="font-semibold">Guest</p>
            <div className="mt-1.5">
              <p className="text-sm text-gray-500">{reservation.adult} Adult</p>
              <p className="text-sm text-gray-500">
                {reservation.children} Children
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
