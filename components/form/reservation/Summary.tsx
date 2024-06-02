import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useStore from "@/store/store";

import { CheckInDate, CheckOutDate, NightStayCount } from "./components/date";

type searchParamsProps = {
  checkIn: string;
  checkOut: string;
  adults: string;
  childrens: string;
  nights: string;
  rm: string;
  rmPrice: string;
};

type Rooms = {
  id: string;
  name: string;
  image: string;
  amenities: {
    amenities: string[];
  };
  no_available: number;
  created_at: string;
  price: number;
  no_guest: number;
};

const Summary = ({ rooms }: { rooms: Rooms }) => {
  const router = useRouter();
  const { checkIn, checkOut, nights } = router.query as searchParamsProps;
  const {
    date,
    nightStay,
    setNightStay,
    adult,
    children,
    room,
    roomPrice,
    total,
    setTotal,
  } = useStore();

  useEffect(() => {
    const { nights, rmPrice } = router.query as searchParamsProps;

    if (nightStay && rooms.price) {
      const total = rooms.price * nightStay + 150;
      setTotal(total);
    } else if (nights) {
      const total = Number(nights) * Number(rmPrice) + 150;
      setTotal(total);
    }
  }, [nightStay, rooms.price, router, setTotal]);

  useEffect(() => {
    if (Object.keys(rooms).length === 0) {
      router.back();
    }
  }, [router, rooms]);

  useEffect(() => {
    const { checkIn, checkOut } = router.query as searchParamsProps;

    if (date.from && date.to) {
      const cIn = new Date(date.from);
      const cOut = new Date(date.to);

      const numberOfNightStay = cOut.getTime() - cIn.getTime();
      const nightsDifference = Math.ceil(
        numberOfNightStay / (1000 * 60 * 60 * 24)
      );
      setNightStay(nightsDifference);
    } else if (checkIn && checkOut) {
      const cIn = new Date(checkIn);
      const cOut = new Date(checkOut);

      const numberOfNightStay = cOut.getTime() - cIn.getTime();
      const nightsDifference = Math.ceil(
        numberOfNightStay / (1000 * 60 * 60 * 24)
      );
      setNightStay(nightsDifference);
    }
  }, [date, setNightStay, router]);
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
        <CheckInDate date={date} checkIn={checkIn} />
        <CheckOutDate date={date} checkOut={checkOut} />
        <NightStayCount date={date} nightStay={nightStay} night={nights} />
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
        <p className="text-sm text-gray-500">{rooms.name}</p>
      </div>

      <div className="pb-6">
        <p className="text-sm text-gray-500">1 room</p>
      </div>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Rooms: </p>
          <p className="font-medium text-sm text-gray-800">PHP {rooms.price}</p>
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

export default Summary;
