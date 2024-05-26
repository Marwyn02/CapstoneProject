import React from "react";
import Link from "next/link";
import HomePromotion from "@/components/home/HomePromotion";
import { Button } from "@/components/ui/button";

const FooterNav = ({ toggleSheet }: { toggleSheet: () => void }) => {
  return (
    <footer className="-z-10 fixed bottom-0 left-0 h-auto bg-black w-full text-slate-200 ">
      <HomePromotion />
      <section className="py-8 px-8 md:px-52 md:py-10">
        <div className="grid grid-cols-3 gap-x-12">
          <div className="grid grid-rows-4 grid-flow-col gap-4 text-gray-100 font-thin pt-2">
            <p className="hover:text-white hover:font-light duration-300">
              Home
            </p>
            <p className="hover:text-white hover:font-light duration-300">
              The Hotel
            </p>
            <p className="hover:text-white hover:font-light duration-300">
              The Rooms
            </p>
            <p className="hover:text-white hover:font-light duration-300">
              Events
            </p>
            <p className="hover:text-white hover:font-light duration-300">
              Contact
            </p>
          </div>
          <div className="space-y-6">
            <h1 className="text-xl md:text-xl font-thin tracking-[0.25em] font-serif mb-4 md:mb-6">
              Coastal Charm
            </h1>
            <div>
              <p className="text-sm font-light text-gray-400">
                Blk. 3 Lot 2, 5 Congressional Rd, General Mariano Alvarez, 4117
                Cavite
              </p>
              <p className="text-sm font-thin text-gray-500">Philippines</p>
            </div>
            <p className="text-sm font-light text-gray-400">+63 9192319278</p>
          </div>
          <div className="space-y-6">
            <h1 className="text-xl md:text-xl font-thin tracking-[0.25em] font-serif mb-4 md:mb-6">
              Join us
            </h1>
            <div className="space-y-2">
              <p className="text-sm font-light text-gray-400 mb-6">
                Be a member in our club
              </p>
              <Button
                onClick={toggleSheet}
                className="border px-12 py-2 border-gray-200 text-sm font-light hover:bg-gray-200 hover:text-gray-800 hover:font-medium duration-300"
              >
                Join
              </Button>
              {/* <Link
                href={"/register"}
                className="border px-12 py-2 border-gray-200 text-sm font-light hover:bg-gray-200 hover:text-gray-800 hover:font-medium duration-300"
              >
                Join
              </Link> */}
            </div>
          </div>
        </div>
        <p className="text-sm md:text-xs font-light text-center text-gray-50 pt-3 md:pt-10 mt-6 md:mt-16">
          &copy; Coastal Charm
        </p>
      </section>
    </footer>
  );
};

export default FooterNav;
