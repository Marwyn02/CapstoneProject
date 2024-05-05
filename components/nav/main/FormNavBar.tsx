import React from "react";

import Image from "next/image";
import Router from "next/router";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavSheetButton } from "../ui/NavSheetButton";

const RoomNavBar = () => {
  const path = usePathname();

  // Back button conditionals
  const returnNavigation =
    path === "/hotel" ? (
      <Link href={"/"} className="text-xs font-semibold">
        Back
      </Link>
    ) : path === "/hotel/reservation" ? (
      <Link href={"/hotel"} className="text-xs font-semibold">
        Back
      </Link>
    ) : path === "/hotel/reservation/invoice" ? (
      <Link href={"/"} className="text-xs font-semibold">
        Back to home
      </Link>
    ) : path === "/register" || path === "login" ? (
      <Link href={"/"} className="text-xs font-semibold">
        Back to home
      </Link>
    ) : null;

  return (
    <nav className="fixed w-full h-12 md:h-16 px-8 md:px-10 pb-5 bg-slate-100 duration-500 z-50">
      <section className="grid grid-cols-2 justify-between md:grid-cols-3 md:justify-center items-center">
        <div className="hidden md:block">{returnNavigation}</div>

        <div className="flex flex-row justify-start md:justify-center items-center text-sm text-[#2A3242] font-extralight tracking-wider font-serif">
          <h1 className="hidden md:block cursor-default">Coastal</h1>
          <Image
            src="/MainLogo-removed.png"
            alt="Logo"
            height={1000}
            width={1000}
            className="h-20 w-20 md:h-[70px] md:w-[70px] cursor-pointer"
            onClick={() => Router.push("/")}
          />
          <h1 className="hidden md:block cursor-default">Charm</h1>
        </div>

        <div className="flex justify-end">
          <NavSheetButton />
        </div>
      </section>
    </nav>
  );
};

export default RoomNavBar;
