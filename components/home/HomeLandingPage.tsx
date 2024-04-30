import React from "react";
import { ParallaxBanner } from "react-scroll-parallax";

const HomeLandingPage = () => {
  return (
    <>
      <ParallaxBanner
        layers={[{ image: "/Main-Image.jpg", speed: -15 }]}
        className="h-screen w-full"
      >
        <div className="absolute h-screen w-full px-8 md:px-10 inset-0 flex items-center justify-center">
          <h1 className="text-slate-100 text-center text-5xl md:text-5xl font-bold">
            Creating Memories, One Stay at a Time.
          </h1>
        </div>
      </ParallaxBanner>
    </>
  );
};

export default HomeLandingPage;
