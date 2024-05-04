/* eslint-disable react/no-unescaped-entities */
import React from "react";

const HomeIntro = () => {
  return (
    <div className="grid grid-cols-1 place-items-center mt-24 md:mt-32 px-8 lg:px-24 text-center space-y-4">
      <h1 className="text-3xl font-thin tracking-tight mb-3 md:mb-8 font-serif border-b pb-3 md:pb-5">
        Welcome <span className="lowercase">to the</span> Coastal Charm
      </h1>
      <div className="lg:px-52 text-center text-gray-500 text-sm">
        <p className="mb-0.5 md:mb-2 font-medium">
          Prepare to be captivated by Coastal Charm!
        </p>
        <p>
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
