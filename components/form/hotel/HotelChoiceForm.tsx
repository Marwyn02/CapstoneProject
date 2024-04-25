"use client";

import React, { useState } from "react";
import Router from "next/router";
import useStore from "@/store/store";

import Image from "next/image";

const data = [
  {
    id: 1,
    title: "1 Bedroom Villa",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas beatae facere excepturi asperiores, possimus recusandae nam autem libero ipsam voluptates quidem saepe ea unde eius accusamus pariatur doloremque voluptas voluptatem!",
    image: "/hotel_header.jpg",
  },
  {
    id: 2,
    title: "2 Bedroom Villa",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas beatae facere excepturi asperiores, possimus recusandae nam autem libero ipsam voluptates quidem saepe ea unde eius accusamus pariatur doloremque voluptas voluptatem!",
    image: "/hotel-1.jpg",
  },
];

export function HotelChoiceForm() {
  // const { setPlace } = useStore();

  // const [placeClicked, setPlaceClicked] = useState<string | null>(null);

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   try {
  //     setPlace(values.place);
  //     Router.push("/hotel/reservation");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <section className="overflow-x-auto snap-x snap-center snap-mandatory flex flex-nowrap">
      <div className="flex flex-row">
        {data.map((d) => (
          <section
            key={d.id}
            className="relative flex-none snap-start w-screen h-screen grid grid-cols-3 items-center gap-x-6 py-8"
          >
            <p className="absolute text-4xl font-serif text-white z-40 top-28 left-12 border-b pb-5 w-2/5">
              Our selection of rooms
            </p>
            <div className="h-screen z-20 flex justify-end items-end pb-10 bg-gradient-to-r from-black/75 to-transparent px-12 text-slate-200 -mt-8">
              <div className="space-y-4">
                <h2 className="text-4xl">{d.title}</h2>
                <p>{d.description}</p>
                {/* <button
                  type="button"
                  className="border border-black text-sm px-5 py-2"
                >
                  Book
                </button> */}
              </div>
            </div>

            <Image
              src={d.image}
              height={1050}
              width={1050}
              alt="Image"
              className="w-screen h-screen absolute brightness-75"
            />
          </section>
        ))}
      </div>
    </section>
  );
}

("La Union Staycation Resort");

("Batangas Beach Resort");
