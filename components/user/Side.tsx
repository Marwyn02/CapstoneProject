import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Side = () => {
  const path = usePathname();

  const bookingStyle = `${
    path === "/user/booking"
      ? "bg-gray-500 px-5 py-2 text-gray-100 text-sm rounded-md"
      : "bg-gray-100 px-5 py-2 text-sm rounded-md"
  } hover:bg-gray-400 hover:text-gray-100 duration-300`;

  const profileStyle = `${
    path === "/user/profile"
      ? "bg-gray-500 px-5 py-2 text-gray-100 text-sm rounded-md"
      : "bg-gray-100 px-5 py-2 text-sm rounded-md"
  } hover:bg-gray-400 hover:text-gray-100 duration-300`;

  return (
    <nav className="pt-48 pl-16">
      <div className="flex flex-col space-y-2">
        <Link href={"/user/booking"} className={bookingStyle}>
          Bookings
        </Link>
        <Link href={"/user/profile"} className={profileStyle}>
          Account
        </Link>
      </div>
    </nav>
  );
};

export default Side;
