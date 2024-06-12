import React from "react";
import Link from "next/link";
import { openSideAuth } from "@/store/store";
import { Button } from "../ui/button";

const HomePromotion = () => {
  const toggleActionState = openSideAuth((state) => state.toggleActionState);

  const handleToggleSheet = () => {
    toggleActionState();
  };

  return (
    <section className="h-auto w-full grid bg-zinc-800">
      <div className="grid place-self-center md:px-32 py-8 md:py-12">
        <div className="text-center space-y-9">
          <h2 className="text-white tracking-widest uppercase text-xl md:text-2xl font-thin font-serif leading-tight">
            Join us <br />{" "}
            <span className="text-xs md:text-base leading-snug text-gray-300">
              for access to exclusive benefits!
            </span>
          </h2>
          <Button
            type="button"
            className="border border-white text-xs uppercase md:font-medium tracking-widest text-white bg-transparent px-8 md:px-10 py-3 md:py-3.5 hover:bg-white hover:text-black duration-300"
            onClick={handleToggleSheet}
          >
            Be a member
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomePromotion;

// mb-[368px] lg:mb-[420px]
