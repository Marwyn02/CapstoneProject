"use client";

import React from "react";
import Image from "next/image";
import type { User } from "@supabase/supabase-js";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import HomeReserveAvailabilityForm from "@/components/home/HomeReservation";
import HotelCard from "./HotelCard";
import HotelReservation from "./HotelReservation";

export function HotelChoiceForm({ user }: { user: User }) {
  return (
    <>
      {/* Hotel Booking Form */}
      <HotelReservation />
      <div className="pt-32 space-y-5">
        {rooms.map((r) => (
          <section
            key={r.id}
            className="grid grid-cols-1 lg:grid-cols-5 place-content-center lg:px-36"
          >
            {/* Hotel Room Image Carousel */}
            <Carousel
              opts={{
                loop: true,
                align: "center",
              }}
              // plugins={[plugin.current]}
              className="w-full h-full col-span-3"
              // onMouseEnter={plugin.current.stop}
              // onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {carousel.map((r, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={r.image}
                      height={1050}
                      width={1050}
                      alt="Image"
                      className="brightness-75 contrast-100 saturate-150 w-full h-[250px] md:h-[500px] object-cover object-center"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="top-2/3" />
              <CarouselNext className="top-2/3" />
            </Carousel>

            {/* Hotel Room Detail Card */}
            <HotelCard user={user} info={r} />
          </section>
        ))}
      </div>
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

const carousel = [
  {
    id: 1,

    image: "/hotel_header.jpg",
  },
  {
    id: 2,
    image: "/hotel-1.jpg",
  },
];
