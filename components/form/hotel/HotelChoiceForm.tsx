"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { User } from "@supabase/supabase-js";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import HotelCard from "./HotelCard";
import HotelReservation from "./HotelReservation";
import RoomInfo from "./RoomInfo";
import RoomDetails from "./RoomDetails";

export function HotelChoiceForm({ user }: { user: User }) {
  const [openDetails, setOpenDetails] = useState(null);

  const handleToggleDetails = (id: any) => {
    if (openDetails === id) {
      setOpenDetails(null);
    } else {
      setOpenDetails(id);
    }
  };
  return (
    <>
      {/* Hotel Booking Form */}
      <HotelReservation />
      <hr className="border-b border-black pt-40" />
      <div className="pt-10 mb-8 space-y-10">
        {rooms.map((r) => (
          <section
            key={r.id}
            className="grid grid-cols-1 gap-x-5 lg:grid-cols-8 place-content-center lg:px-24"
          >
            {/* Hotel Room Image Carousel */}
            <Carousel
              opts={{
                loop: true,
                align: "center",
              }}
              // plugins={[plugin.current]}
              className="w-full h-full col-span-4"
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
                      className="brightness-75 contrast-100 saturate-150 w-full h-[250px] md:h-[400px] object-cover object-center"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="top-2/3" />
              <CarouselNext className="top-2/3" />

              <RoomInfo />
            </Carousel>

            {/* Hotel Room Detail Card */}
            {openDetails !== r.id ? (
              <HotelCard
                user={user}
                info={r}
                openDetails={openDetails}
                onOpenDetails={() => handleToggleDetails(r.id)}
              />
            ) : (
              <RoomDetails
                info={r}
                openDetails={openDetails}
                onOpenDetails={() => handleToggleDetails(r.id)}
              />
            )}
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
    title: "Deluxe Ocean View Suite",
    price: 1500,
    amenities: [
      "Complimentary Internet",
      "Complimentary Mineral Water in the room upon arrival",
      "American breakfast for 2 daily",
      "Daily Housekeeping",
      "Swimming Pool Access",
      "Free valet parking for one vehicle",
      "Free yogurt on arrival",
    ],
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
