import Router from "next/router";
import React from "react";

const HomePromotion = () => {
  return (
    <section className="h-screen w-full grid bg-gray-950 mb-10">
      <div className="grid place-self-center">
        <div className="place-self-center border-4 border-white px-32 py-24">
          <div className=" text-center space-y-3">
            <h2 className="text-white text-2xl font-thin font-serif">
              Join us for access to exclusive benefits!
            </h2>
            <button
              className="text-sm w-32 text-black px-4 py-1.5 rounded-sm bg-white hover:bg-gray-400 hover:text-white duration-300"
              onClick={() => Router.push("/register")}
            >
              Be a member
            </button>
          </div>
        </div>
        <p className="place-self-center text-white text-xs text-center w-1/2 pt-5">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente,
          dolore eius quibusdam assumenda officiis deleniti ipsa corrupti
          architecto error labore alias placeat atque doloremque facere
          voluptatibus ex impedit, libero exercitationem?
        </p>
      </div>
    </section>
  );
};

export default HomePromotion;
