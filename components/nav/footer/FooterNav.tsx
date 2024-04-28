import React from "react";

const FooterNav = () => {
  return (
    <footer className="h-[550px] bg-zinc-900 w-full text-slate-200 px-8 md:px-52 md:py-28">
      <section className="py-8 md:py-10">
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
              <p className="text-sm font-light text-gray-400">
                Be a member in our club
              </p>
              <button className="border px-12 py-1.5 border-gray-200 text-sm font-light hover:bg-gray-200 hover:text-gray-800 hover:font-medium duration-300">
                Join
              </button>
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
