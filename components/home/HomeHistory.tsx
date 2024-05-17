/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React from "react";

const HomeHistory = () => {
  return (
    <section>
      <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-x-4">
        <div className="flex flex-col items-center md:items-start md:pl-64">
          <div className="md:flex md:items-center md:ml-5">
            <Image
              src="/MainLogo-removed.png"
              alt="Logo"
              height={500}
              width={500}
              className="h-[70px] w-[70px] mx-auto -pl-5 md:-ml-9"
            />
            <p className="text-xs text-zinc-500 italic font-serif font-thin">
              Coastal Charm's Memory
            </p>
          </div>
          <hr className="border[1px] border-zinc-200 w-10 md:w-16 md:-ml-3 my-8 md:my-10 rotate-90" />
          <p className="text-end text-sm font-thin leading-6 px-5">
            Situated on the breathtaking coast of the Philippines lies a hidden
            gem known as Coastal Charm. This charming sanctuary was established
            by the esteemed Solis family, a lineage known for their passion for
            coastal living. The story began when the Solis family stumbled upon
            the untouched beauty of the coastline during a family vacation.
            Captivated by the serene vistas, gentle sea breezes, and the warm
            embrace of the local community, the Solis family made a
            life-changing decision to transform their newfound paradise into a
            haven for travelers seeking solace.
          </p>
        </div>
        <Image
          src="/hotelHistory3.jpg"
          alt="History Image"
          height={500}
          width={500}
          className="mt-14 md:mt-36"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 md:justify-end">
        <div className="flex justify-end order-2 md:order-1">
          <Image
            src="/hotelHistory2.jpg"
            alt="Hotel History"
            height={500}
            width={500}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between items-start px-5 my-14 order-1 md:order-2 md:px-0 md:my-0 md:pr-80">
          <p className="text-start text-sm font-thin leading-6 md:mt-8">
            The Solis family invested not only their resources but also their
            passion into building Coastal Charm. As the years passed, the Solis
            family's commitment never wavered.
          </p>
          <p className="text-start text-sm font-thin leading-6 md:mt-8">
            They continued to innovate, adding new amenities and activities
            while staying true to their original vision of providing a haven
            where guests could unwind and escape the stresses of everyday life.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeHistory;
