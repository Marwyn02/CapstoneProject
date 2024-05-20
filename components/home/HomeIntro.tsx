/* eslint-disable react/no-unescaped-entities */
import React from "react";

const HomeIntro = () => {
  return (
    <div className="grid grid-cols-1 place-items-center mt-24 md:mt-32 px-8 lg:px-24 text-center space-y-4">
      <h1 className="text-3xl font-thin tracking-tight md:mb-1 font-serif md:pb-2 text-gray-500">
        Welcome <span className="lowercase">to the</span> Coastal Charm
      </h1>
      <hr className="w-10 md:w-20" />
      <div className="lg:px-52 text-center">
        <p className="mb-0.5 md:mb-2 text-sm font-extralight">
          Prepare to be captivated by Coastal Charm!
        </p>
        <p className="text-center text-sm font-thin leading-6">
          Experience countless delights from the moment you step into our lobby
          to the time you check out. Our friendly staff will always be on hand
          to cater to your needs, ensuring your stay is filled with joy and
          comfort. At Coastal Charm, you can immerse yourselves in the beauty of
          the coastline, whether it's through various adventures, serene beach
          walks, or simply lounging by the shore with a cocktail in hand.
          Experience the finest service and a delightful ambience only here at
          Coastal Charm.
        </p>
      </div>
    </div>
  );
};

export default HomeIntro;
