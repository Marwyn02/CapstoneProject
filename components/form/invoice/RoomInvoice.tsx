import React, { useState, useEffect } from "react";
import Link from "next/link";
import useStore from "@/store/store";
import RoomCard from "../card/RoomCard";

const RoomInvoice = () => {
  const { date, dayStay, room, adult, children, childrenAge } = useStore();
  const [dayPrice, setDayPrice] = useState<number>();

  useEffect(() => {
    if (dayStay) {
      const serviceCharge = 500;

      const totalDayprice = dayStay * 1500 + serviceCharge;
      setDayPrice(totalDayprice);
    }
  }, [dayStay]);
  return (
    <section className="">
      <section className="flex space-y-6 space-x-4 my-2.5 w-full px-8 py-4 rounded-lg">
        <div className="flex flex-col">
          <RoomCard />
          <RoomCard />
          <RoomCard />
        </div>
        <div className="border p-5 w-full h-fit sticky top-6">
          {dayStay && (
            <div>
              <h1 className="text-2xl font-semibold mb-2">Your Stay</h1>
              <section className="text-sm mb-2">
                <p className="italic">
                  {new Date(date.from).toDateString() +
                    " " +
                    "-" +
                    " " +
                    new Date(date.to).toDateString()}
                </p>
                {adult ? <p>{adult}</p> : ""}
                {parseInt(children) !== 0 &&
                  (parseInt(children) === 1 ? (
                    <p>{children} Child</p>
                  ) : (
                    <p>{children} Children</p>
                  ))}
              </section>
              <section className="font-semibold italic text-gray-800">
                {dayStay} {dayStay <= 1 ? "Night" : "Nights"}
                <div className="flex justify-between items-center text-sm font-normal my-3">
                  <p className="indent-6">1500 / per night</p>
                  <p className="font-medium">₱{dayStay * 1500}</p>
                </div>
                <div>
                  <p>Taxes and Fees</p>
                  <div className="flex justify-between items-center font-normal text-sm">
                    <p className="indent-6">Service charge</p>
                    <p className="font-medium">₱500</p>
                  </div>
                </div>
              </section>
              <div className="border-y pt-5 pb-10 my-5 flex justify-between items-center">
                <p className="text-xl font-medium">Total:</p>
                <p className="font-medium">₱{dayPrice}</p>
              </div>
            </div>
          )}
          <Link href="/reservation">Back to reservation</Link>
        </div>
      </section>
    </section>
  );
};

export default RoomInvoice;
