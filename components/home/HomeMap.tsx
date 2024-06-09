import React from "react";

import Image from "next/image";
import { User } from "@supabase/supabase-js";

const HomeMap = ({ user }: { user: User }) => {
  const mapStyle = `grid grid-cols-1 place-items-center mt-14 md:mt-16 px-8 md:px-10 pb-5 space-y-6 ${
    !user ? "mb-[560px] lg:mb-[580px]" : "mb-[400px] lg:mb-[400px]"
  } `;

  return (
    <div className={mapStyle}>
      <h2 className="font-thin font-serif text-3xl md:text-3xl mb-4 md:mb-3.5 border-b pb-5">
        Where can we found?
      </h2>
      <Image src={"/Test-Map.png"} alt="Map" height={1000} width={1000} />
    </div>
  );
};

export default HomeMap;
