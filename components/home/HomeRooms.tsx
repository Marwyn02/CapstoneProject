import Image from "next/image";
import Router from "next/router";
import React from "react";
import { HotelChoiceForm } from "../form/hotel/HotelChoiceForm";

const HomeRooms = () => {
  return (
    <section className="mt-32 mb-5">
      <HotelChoiceForm />

      <div className="h-full flex-nowrap">
        <section className="flex flex-col">
          <div className="px-10 py-32 space-y-2">
            <h3 className="text-2xl font-serif font-thin">Hotel information</h3>

            <p>Address</p>
            <p>Check-in / Check-out</p>
            <p>Rooms</p>
            <p>Pets</p>
            <p>Internet</p>
            <p>Transportation</p>
            <p>Children policy</p>
            <p>Smoking policy</p>
            <p>Available services</p>

            <button
              className="border border-black px-10 py-2.5 font-semibold text-sm"
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
