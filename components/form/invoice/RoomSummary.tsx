import React, { useState, useEffect } from "react";
import useStore from "@/store/store";

const RoomSummary = () => {
  const { date, nightStay, setNightStay, adult, children, room, roomPrice } =
    useStore();

  const [total, setTotal] = useState<number>();

  useEffect(() => {
    if (nightStay) {
      const total = nightStay && roomPrice * nightStay + 150;
      setTotal(total);
    }
  }, [nightStay, roomPrice]);

  useEffect(() => {
    if (date.from && date.to) {
      const numberOfNightStay = date.to - date.from;
      const nightsDifference = Math.ceil(
        numberOfNightStay / (1000 * 60 * 60 * 24)
      );
      setNightStay(nightsDifference);
    }
  }, [date.to, date.from, setNightStay]);
  return (
    <div className="sticky shadow-lg h-min w-full my-20 pt-4 pb-10 px-16 space-y-6">
      <h2 className="font-thin font-serif text-2xl border-b border-gray-400 pb-6">
        Summary
      </h2>

      <div className="py-6 border-b">
        <p className="font-medium text-sm text-gray-800">Coastal Charm</p>
        <p className="text-sm text-gray-500">La Union, Philippines</p>
      </div>

      {/* Check in/ Check out field */}
      <div className="border-b pb-6 space-y-8">
        <div>
          <p className="font-medium text-sm text-gray-800">Check in:</p>
          <p className="text-sm text-gray-500">
            {date.from !== undefined && date.from !== ""
              ? new Date(date.from).toDateString()
              : ""}
          </p>
        </div>
        <div>
          <p className="font-medium text-sm text-gray-800">Check out:</p>
          <p className="text-sm text-gray-500">
            {date.to !== undefined && date.to !== ""
              ? new Date(date.to).toDateString()
              : ""}
          </p>
        </div>

        <div>
          <p className="font-medium text-sm text-gray-800">Length of stay:</p>
          <p className="text-sm text-gray-500">
            {date.to && nightStay && nightStay > 1
              ? `${nightStay} nights`
              : nightStay && nightStay <= 1
              ? `${nightStay} night`
              : ""}
          </p>
        </div>
      </div>

      <div className="border-b pb-6">
        <p className="text-sm text-gray-500">
          {adult > 1 ? `${adult} adults` : `${adult} adult`}
        </p>
        <p className="text-sm text-gray-400">
          {children > 1 ? `${children} children` : `${children} child`}
        </p>
      </div>

      <div className="border-b pb-6">
        <p className="text-sm text-gray-500">{room}</p>
      </div>

      <div className="pb-6">
        <p className="text-sm text-gray-500">1 room</p>
      </div>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Rooms: </p>
          <p className="font-medium text-sm text-gray-800">PHP {roomPrice}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Taxes: </p>
          <p className="font-medium text-sm text-gray-800">PHP 150</p>
        </div>

        <div className="flex justify-between items-center py-2">
          <p className="font-medium text-sm text-gray-800">Total: </p>
          <p className="font-bold text-4xl text-black tracking-tighter">
            {total ? `PHP ${total}` : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomSummary;
