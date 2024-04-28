import React from "react";

import Image from "next/image";

const HomeMap = () => {
  return (
    <div className="grid grid-cols-1 place-items-center my-10 md:mb-32 md:mt-16 px-8 md:px-10 space-y-6">
      <h2 className="font-thin font-serif text-3xl md:text-3xl mb-4 md:mb-5 border-b pb-5">
        Where can we found?
      </h2>
      <Image
        src={"/Test-Map.png"}
        alt="Map"
        height={1000}
        width={1000}
        // className="order-2 md:order-1"
      />
    </div>
  );
};

export default HomeMap;
