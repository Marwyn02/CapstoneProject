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
];

const HomeRooms = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <div className="mt-32">
      <Carousel
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
                className="brightness-75 w-full h-[700px] object-cover object-center"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {/* <section className={embla.embla}>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className={embla.embla__container}>
            {rooms.map((r, index) => (
              <div className={embla.embla__slide} key={index}>
                <Image
                  src={r.image}
                  height={1050}
                  width={1050}
                  alt="Image"
                  className="absolute brightness-75 w-full h-[700px] object-cover object-center"
                />
                <p className="absolute bottom-48 text-gray-100 left-32 z-10 text-5xl font-thin font-serif">
                  {r.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      </section> */}
      {/* <Carousel className="w-full">
        <CarouselContent>
          {rooms.map((r, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <section
                  key={r.id}
                  className="relative flex-none snap-start w-screen h-screen grid grid-cols-3 items-center gap-x-6 py-8"
                >
                  <p className="absolute text-4xl font-serif text-white z-40 top-28 left-12 border-b pb-5 w-2/5">
                    Our selection of rooms
                  </p>
                  <div className="h-screen z-20 flex justify-end items-end pb-10 bg-gradient-to-r from-black/75 to-transparent px-12 text-slate-200 -mt-8">
                    <div className="space-y-4">
                      <h2 className="text-4xl">{r.title}</h2>
                      <p>{r.description}</p>
                    </div>
                  </div>

                  <Image
                    src={r.image}
                    height={1050}
                    width={1050}
                    alt="Image"
                    className="w-screen h-screen absolute brightness-75"
                  />
                </section>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}
      {/* <section className="overflow-x-auto snap-x snap-center snap-mandatory flex flex-nowrap mt-32">
        <div className="flex flex-row">
          {rooms.map((d) => (
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
      </section> */}
    </div>
  );
};

export default HomeRooms;
