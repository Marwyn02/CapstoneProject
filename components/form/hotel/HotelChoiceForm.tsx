"use client";

import React from "react";
import Router from "next/router";
import useStore from "@/store/store";

import Image from "next/image";
import Link from "next/link";
import HomeReserveAvailabilityForm from "@/components/home/HomeReserveAvailabilityForm";

export function HotelChoiceForm() {
  const { setRoom, setRoomPrice } = useStore();

  function choicedRoom(roomName: string, roomPrice: number) {
    try {
      setRoom(roomName);
      setRoomPrice(roomPrice);

      Router.push("/hotel/reservation");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <HomeReserveAvailabilityForm />
      {rooms.map((r) => (
        <div
          key={r.id}
          className="grid grid-cols-5 place-content-center h-screen px-20"
        >
          <Image
            src={r.image}
            alt="Image"
            height={200}
            width={600}
            className="h-[500px] w-full col-span-3"
          />
          <div className="col-span-2 border h-auto">
            <section className="flex flex-col">
              <div className="px-10 py-10">
                <h3 className="text-3xl font-thin text-gray-600 font-serif mb-5">
                  {r.title}
                </h3>

                <div className="space-y-1">
                  <p className="text-xs font-thin font-serif text-gray-600 italic">
                    Total for a night
                  </p>
                  <p className="text-4xl font-medium text-gray-800">
                    PHP {r.price}
                  </p>
                </div>

                <div className="border-y border-gray-400 py-8 mt-8">
                  <p className="mb-4 font-medium text-xs text-gray-900 uppercase">
                    Included in this rate
                  </p>
                  <p className="indent-4 text-sm font-light text-gray-600">
                    Breakfast for two each day
                  </p>
                </div>

                <div className="bg-gray-200 rounded-md mt-8 px-5 py-8">
                  <p className="text-gray-600 font-light">
                    Exclusive benefits —{" "}
                    <span className="text-sm font-normal">
                      sign in to your account to activate it.
                    </span>
                  </p>
                </div>

                <div className="mt-5 mb-10">
                  <p className="text-sm font-light text-gray-600">
                    Have an account? <Link href={"/register"}>Sign in</Link> or{" "}
                    <Link href={"/register"}>Create your account</Link>
                  </p>
                </div>

                <button
                  type="button"
                  className="border border-black px-10 py-2.5 font-semibold text-sm mt-5 hover:bg-black hover:text-white duration-300"
                  onClick={() => choicedRoom(r.title, r.price)}
                >
                  Choose
                </button>
              </div>
            </section>
          </div>
        </div>
      ))}
    </>
  );
}

const rooms = [
  {
    id: 1,
    image: "/hotel-1.jpg",
    title: "1 Bedroom Villa",
    price: 1500,
  },

  {
    id: 2,
    image: "/hotel_header.jpg",
    title: "2 Bedroom Villa",
    price: 2500,
  },
];
