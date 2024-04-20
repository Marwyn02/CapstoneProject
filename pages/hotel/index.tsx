import React from "react";

import { HotelChoiceForm } from "@/components/form/hotel/HotelChoiceForm";
import FormLayout from "@/components/layout/FormLayout";
import Image from "next/image";

const HotelForm = () => {
  return (
    <FormLayout>
      {/* <Image
        src={"/FormHeader.jpg"}
        alt="Image"
        height={800}
        width={800}
        className="w-full h-[400px]"
      /> */}
      <section className="overflow-y-auto snap-y snap-mandatory max-h-screen">
        <HotelChoiceForm />

        <div className="snap-start h-screen w-screen  flex-nowrap">
          <section className="flex flex-col">
            <div className="px-10 py-32 space-y-2">
              <h3 className="text-2xl font-semibold">Hotel information</h3>

              <p>Address</p>
              <p>Check-in / Check-out</p>
              <p>Rooms</p>
              <p>Pets</p>
              <p>Internet</p>
              <p>Transportation</p>
              <p>Children policy</p>
              <p>Smoking policy</p>
              <p>Available services</p>

              <button className="border border-black px-10 py-2.5 font-semibold text-sm">
                Book
              </button>
            </div>
          </section>
        </div>
      </section>
    </FormLayout>
  );
};

export default HotelForm;
