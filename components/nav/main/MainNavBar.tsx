/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Router from "next/router";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { NavSheetButton } from "../ui/NavSheetButton";
import { AuthNavBar } from "./AuthNavbar";

const MainNavBar = ({ user }: { user: User }) => {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Coastal Charm logo
  const CoastalCharmLogo = () => {
    return (
      <div className="flex flex-row justify-start md:justify-center items-center text-[#2A3242] font-medium tracking-wider font-serif cursor-default md:order-2">
        <h1 className="hidden md:block text-lg">Coastal</h1>
        <Image
          src="/MainLogo-removed.png"
          alt="Logo"
          height={1000}
          width={1000}
          priority
          className={
            path.length > 2
              ? "h-16 w-16 md:h-[70px] md:w-[70px] cursor-pointer"
              : scrolled
              ? "h-16 w-16 duration-500"
              : "h-20 w-20 md:h-24 md:w-24 duration-500"
          }
          onClick={() => Router.push("/")}
        />
        <h1 className="hidden md:block text-lg">Charm</h1>
      </div>
    );
  };

  // Fetch User details
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await fetch("/api/auth/getUser");

  //     if (res) {
  //       const { user } = await res.json();
  //       setUser(user);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  // Scroll changes
  useEffect(() => {
    const handleScroll = () => {
      if (path === "/") {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 1) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [path]);
  return (
    <nav
      className={
        path.length > 2
          ? "fixed w-full h-auto md:h-16 px-4 md:px-10 pb-1 pt-2.5 bg-white duration-500 z-50"
          : scrolled
          ? "fixed text-[#9da6b7] group w-full h-16 px-8 md:px-10 bg-white duration-500 z-50" // scrolled
          : "fixed z-10 text-[#9da6b7] group w-full h-10 md:h-24 px-8 md:px-10 pb-4 pt-2.5 bg-transparent duration-500" // not scrolled hover:bg-[#FFD493]
      }
    >
      <section className="grid grid-cols-2 justify-between md:grid-cols-3 md:justify-center items-center">
        <div className="hidden md:flex md:order-3 md:text-end md:justify-end">
          <AuthNavBar user={user} />
        </div>

        <CoastalCharmLogo />

        <div className="flex justify-end md:order-1 md:justify-start">
          <NavSheetButton />
        </div>
      </section>
    </nav>
  );
};

export default MainNavBar;
