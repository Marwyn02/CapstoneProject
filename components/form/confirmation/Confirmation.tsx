import React from "react";
import Link from "next/link";
import useStore from "@/store/store";

import { Button } from "@/components/ui/button";
import type { Reservation } from "@/types/types";

const ConfirmationPage = ({ reservation }: { reservation: Reservation }) => {
  const {
    date,
    nightStay,
    adult,
    children,
    roomQuantity,
    roomGuest,
    services,
    subtotal,
  } = useStore();
  const total = subtotal / 2;

  return (
    <section className="grid grid-cols-1 space-y-6 pt-16 pb-6 mx-48 rounded-lg">
      {/* Title */}
      <div className="pt-10 text-center">
        <h1 className="text-2xl font-bold font-serif mb-20">
          Your Staycation Adventure Awaits!
        </h1>

        <div className="bg-gray-700 text-white text-sm font-extralight tracking-wider p-5 space-y-2">
          <p>Your confirmation number is</p>
          <p className="font-bold tracking-[1em] text-center text-base uppercase">
            M1B4A01
          </p>
        </div>
      </div>

      {/* Content  */}
      <div className="pt-5 px-5 space-y-6">
        <div className="grid grid-cols-2 py-6 border-b">
          <p className="font-medium text-sm text-gray-800">Name</p>
          <p className="text-sm text-gray-500">Marwyn Sumargo</p>
        </div>

        {/* Check in/ Check out field */}
        <div className="border-b pb-6 space-y-2">
          <div className="grid grid-cols-2">
            <p className="font-medium text-sm text-gray-800">Check in:</p>
            <p className="text-sm text-gray-500">
              {date.from !== undefined && date.from !== ""
                ? new Date(date.from).toDateString()
                : ""}
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="font-medium text-sm text-gray-800">Check out:</p>
            <p className="text-sm text-gray-500">
              {date.to !== undefined && date.to !== ""
                ? new Date(date.to).toDateString()
                : ""}
            </p>
          </div>

          <div className="grid grid-cols-2">
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

        <div className="border-b pb-6 grid grid-cols-2">
          <p className="font-medium text-sm text-gray-800">Guest(s):</p>

          <div>
            <p className="text-sm text-gray-500">
              {adult > 1 ? `${adult} adults` : `${adult} adult`}
            </p>
            <p className="text-sm text-gray-400">
              {children > 1 ? `${children} children` : `${children} child`}
            </p>
          </div>
        </div>

        <div className="space-y-6 pb-10">
          {/* Rooms */}
          <div className="border-b pb-6 grid grid-cols-2">
            <p className="font-medium text-sm text-gray-800">Room(s):</p>
            <div>
              <p className="text-sm text-gray-500">
                {roomQuantity > 1
                  ? `${roomQuantity} rooms`
                  : `${roomQuantity} room`}
              </p>
              {roomGuest.map((r, index) => (
                <p key={index} className="text-sm text-gray-500">
                  {r.room}
                </p>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="border-b pb-6 grid grid-cols-2">
            <p className="font-medium text-sm text-gray-800">Service(s):</p>
            <div>
              {Object.entries(services).map(([key, value], i) =>
                value.choice ? (
                  <div
                    key={i}
                    className="flex capitalize space-x-1 text-sm text-gray-500"
                  >
                    <p>{key}: </p>
                    <p>{value.choice}</p>
                  </div>
                ) : null
              )}
            </div>
          </div>

          <div className="grid grid-cols-2">
            <p className="font-medium text-sm text-gray-800">Total</p>
            <p className="text-sm text-gray-500">
              ₱{subtotal.toLocaleString("en-US")}
            </p>
          </div>

          <div className="grid grid-cols-2 py-6 border-b">
            <p className="font-medium text-sm text-gray-800">
              Remaining Balance
            </p>
            <p className="text-sm text-gray-800 font-bold">
              ₱{total.toLocaleString("en-US")}
            </p>
          </div>
        </div>

        <Link href={"/"}>
          <Button className="w-full text-xs">Back to home</Button>
        </Link>
      </div>
    </section>
  );
};

export default ConfirmationPage;
