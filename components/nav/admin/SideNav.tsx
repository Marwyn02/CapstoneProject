import React from "react";
import { ThemedLink } from "../main/AuthNavbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SideNav = () => {
  return (
    <div className="flex flex-col space-y-10 p-8 border-r h-screen">
      <p className="text-[#2A3242] uppercase font-semibold text-xs">
        Welcome, Admin Marwyn!
      </p>

      <div className="space-y-6 flex-grow">
        <ThemedLink src={"/admin"} title="Dashboard" />
        <ThemedLink src={"/admin/guest"} title="Guests" />
        <ThemedLink src={"/admin/reservation"} title="Reservations" />
      </div>

      <div className="mt-auto">
        <Link href={"/"}>
          <Button variant={"outline"} className="w-full">
            Back to home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SideNav;

// {admin.user.user_metadata.firstname}
