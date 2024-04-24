import React from "react";

import Router from "next/router";

import { HotelChoiceForm } from "../form/hotel/HotelChoiceForm";

const data = [
  {
    id: 1,
    title: "Address",
    address: "Just a random address in the Philippines.",
  },
  {
    id: 2,
    title: "Check-in / Check-out",
    description: "2 pm",
    subDescription: "11 am",
  },
  {
    id: 3,
    title: "Rooms",
    description: "Just a random address in the Philippines.",
  },
  {
    id: 4,
    title: "Available services",
    services: [
      {
        id: 1,
        service: "Laundry service",
      },
    ],
  },
  {
    id: 5,
    title: "Internet",
    description: "Free",
  },
  {
    id: 6,
    title: "Transportation",
    description: "Subject to supplement",
  },
  {
    id: 8,
    title: "Smoking policy",
    description: "No smoking",
  },
  {
    id: 9,
    title: "Children policy",
    description: "Children are welcome",
  },
  {
    id: 10,
    title: "Pets",
    description: "Pets are allowed",
  },
];

const HomeRooms = () => {
  return (
    <section className="mt-32 mb-5">
      <HotelChoiceForm />

      <div className="h-full flex-nowrap px-64">
        <section className="flex flex-col">
          <div className="px-10 py-20 space-y-10 grid">
            <h3 className="text-3xl font-serif font-thin text-gray-800">
              Hotel Information
            </h3>

            <div className="grid grid-cols-3 gap-y-4 gap-x-10">
              {data.map((d) => (
                <div key={d.id}>
                  <div className="py-8 border-b space-y-1">
                    <p className="text-lg font-serif font-thin text-gray-600">
                      {d.title}
                    </p>
                    {d.subDescription ? (
                      <div className="text-sm text-gray-800 space-y-1">
                        <p className="font-medium">
                          Check in:
                          <span className="ml-1 font-thin">
                            {d.description}
                          </span>
                        </p>
                        <p className="font-medium">
                          Check out:
                          <span className="ml-1 font-thin">
                            {d.subDescription}
                          </span>
                        </p>
                      </div>
                    ) : d.address ? (
                      <p className="text-sm text-gray-800 font-thin underline">
                        {d.address}
                      </p>
                    ) : d.services ? (
                      d.services.map((s) => (
                        <p
                          className="text-sm text-gray-800 font-thin"
                          key={s.id}
                        >
                          {s.service}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm text-gray-800 font-thin">
                        {d.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="place-self-center border border-black hover:bg-gray-950 hover:text-gray-50 duration-300 px-10 py-2.5 font-semibold text-sm"
              onClick={() => Router.push("/hotel/reservation")}
            >
              Book
            </button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default HomeRooms;

{
  /* <div className="grid grid-cols-2 items-center my-20">
        <p className="text-center text-wrap text-gray-500 px-28">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi error
          animi, ad deleniti, reiciendis excepturi ipsam cumque maxime odio
          necessitatibus corporis ut iste asperiores facere. Tempora architecto
          quisquam aliquam natus.
        </p>
        <Image src={"/hotel-1.jpg"} alt="Image" height={1000} width={1000} />
      </div> */
}
