import React from "react";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const rooms = [
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
  {
    id: 3,
    title: "Luxury Room",
    image: "/RoomImage-2.jpg",
  },
];

const HomeRooms = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 8000, stopOnInteraction: true })
  );

  return (
    <div className="mt-32">
      <Carousel
        opts={{
          loop: true,
          align: "center",
        }}
        plugins={[plugin.current]}
        className="w-full h-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {rooms.map((r, index) => (
            <CarouselItem key={index}>
              <Image
                src={r.image}
                height={1050}
                width={1050}
                alt="Image"
                className="brightness-75 contrast-100 saturate-150 w-full h-[375px] md:h-[700px] object-cover object-center"
              />
              <div className="absolute top-10 left-14 md:top-1/2 md:left-32">
                <h2 className="text-3xl md:text-7xl font-serif font-thin text-white">
                  {r.title}
                </h2>
                <p className="text-xs text-gray-100 md:mt-1">
                  9 sq.m 1 toilet, 3 cabinets
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HomeRooms;
