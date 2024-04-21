import React from "react";
import Image from "next/image";

import MainNavBar from "../nav/MainNavBar";

const HomeLandingPage = () => {
  return (
    <div>
      <MainNavBar className="fixed z-10 text-[#9da6b7]" />
      <div className="relative">
        <Image
          src="/Main-Image.jpg"
          alt="Image"
          height={3000}
          width={3000}
          className="h-[500px] md:h-screen w-full brightness-75"
        />
        <div className="absolute px-8 md:px-10 inset-0 flex items-center justify-center">
          <h1 className="text-slate-100 text-center text-5xl md:text-5xl font-bold">
            Creating Memories, One Stay at a Time.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HomeLandingPage;
