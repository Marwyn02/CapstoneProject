import React from "react";

const HomeIntro = () => {
  return (
    <div className="grid grid-cols-1 place-items-center mt-32 px-24 text-center space-y-4">
      <h1 className="text-3xl font-thin tracking-tight mb-8 font-serif border-b pb-5">
        Welcome <span className="lowercase">to the</span> Coastal Charm
      </h1>
      <p className="px-32 text-center text-gray-500">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque
        quae, dolor nostrum sint quidem iste ex error obcaecati nesciunt,
        explicabo, quod minus. Sequi possimus est itaque! Nulla omnis doloribus
        fugit.
      </p>
    </div>
  );
};

export default HomeIntro;
