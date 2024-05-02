import React, { useEffect, useState } from "react";
import Image from "next/image";

import { NavSheetButton } from "../ui/NavSheetButton";

const MainNavBar = ({ className }: { className: string }) => {
  const [scrolled, setScrolled] = useState(false);

  // Scroll changes
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 1) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={
        scrolled
          ? `${className} group w-full h-16 px-8 md:px-10 bg-white duration-500 z-50` // scrolled
          : `${className} group w-full h-10 md:h-24 px-8 md:px-10 pb-4 pt-2.5 bg-transparent duration-500` // not scrolled hover:bg-[#FFD493]
      }
    >
      <section className="grid grid-cols-2 justify-between md:grid-cols-3 md:justify-center items-center">
        <div className="hidden md:block">
          <p className="text-xs font-bold tracking-widest">+63 919 231 9278</p>
        </div>

        <div className="flex flex-row justify-start md:justify-center items-center text-[#2A3242] font-extralight tracking-wider font-serif cursor-default">
          <h1 className="hidden md:block">Coastal</h1>

          <Image
            src="/MainLogo-removed.png"
            alt="Logo"
            height={1000}
            width={1000}
            className={
              scrolled
                ? "h-16 w-16 duration-500"
                : "h-20 w-20 md:h-24 md:w-24 duration-500"
            }
          />
          <h1 className="hidden md:block">Charm</h1>
        </div>

        <div className="flex justify-end">
          <NavSheetButton />
        </div>
      </section>
    </nav>
  );
};

export default MainNavBar;
