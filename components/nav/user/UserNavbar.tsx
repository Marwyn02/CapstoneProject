/* eslint-disable react/display-name */
import React, { useState } from "react";
import type { User } from "@supabase/supabase-js";
import Image from "next/image";

import { NavSheetButton } from "../ui/NavSheetButton";
import { AuthNavBar } from "../main/AuthNavbar";
import { usePathname } from "next/navigation";
import Router from "next/router";

type Users = {
  user: User;
};

export function UserNavbar({ user }: { user: User }) {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);

  return (
    <nav
      className={
        "fixed w-full h-auto md:h-[85px] px-4 md:px-10 pb-1 pt-2.5 bg-white duration-500 z-50 hover:bg-gray-100"
      }
    >
      <section className="grid grid-cols-2 justify-between md:grid-cols-3 md:justify-center items-center">
        <div className="hidden md:flex md:order-3 md:text-end md:justify-end">
          <AuthNavBar user={user} />
        </div>

        {/* Logo and Name of the business */}
        <div className="flex flex-row justify-start md:justify-center items-center text-[#2A3242] font-extralight tracking-wider font-serif cursor-default md:order-2">
          <h1 className="hidden md:block">Coastal</h1>
          <Image
            src="/MainLogo-removed.png"
            alt="Logo"
            height={1000}
            width={1000}
            className={
              path.length > 2
                ? "h-16 w-16 md:h-[70px] md:w-[70px] cursor-pointer"
                : scrolled
                ? "h-16 w-16 duration-500"
                : "h-20 w-20 md:h-24 md:w-24 duration-500"
            }
            onClick={() => Router.push("/")}
          />
          <h1 className="hidden md:block">Charm</h1>
        </div>

        <div className="flex justify-end md:order-1 md:justify-start">
          <NavSheetButton />
        </div>
      </section>
    </nav>
  );
}
