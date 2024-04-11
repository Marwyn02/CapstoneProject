import Link from "next/link";
import React from "react";
import { NavSheetButton } from "./ui/NavSheetButton";
import Image from "next/image";

const MainNavBar = () => {
  return (
    <nav className="w-full h-24 px-10 py-2.5 bg-[#FFD493]">
      <section className="flex flex-row justify-between items-center">
        <NavSheetButton />

        <div className="flex flex-row items-center text-[#2A3242]">
          <h1 className="font-light italic">Coastal</h1>
          <Image
            src="/MainLogo.png"
            alt="Logo"
            height={1000}
            width={1000}
            className="h-20 w-20"
          />
          <h1 className="font-light italic">Charm</h1>
        </div>

        <Link
          href="/hotel"
          className="px-8 py-2.5 border border-[#2A3242] text-sm font-light tracking-wider text-[#2A3242] bg-[#FFD493] hover:bg-[#f8cd8c] hover:border-slate-500 hover:text-[#2A3242] duration-300"
        >
          Reserve
        </Link>
      </section>
    </nav>
  );
};

export default MainNavBar;
