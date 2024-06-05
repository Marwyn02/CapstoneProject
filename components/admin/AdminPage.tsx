import type { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import Guests from "./Guests";
import Reservations from "./Reservations";
import Link from "next/link";
import { createClient } from "@/utils/supabase/component";

const AdminPage = ({ guests, reservations, admin }: any) => {
  const supabase = createClient();
  const [toggle, setToggle] = useState(false);
  const [reservation, setReservation] = useState(reservations);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const { data: reservation } = await supabase
        .from("reservation")
        .select("*");
      setReservation(reservation);
    }, 300000); // 300000 ms = 5 minutes

    return () => clearInterval(intervalId);
  }, [supabase]);

  return (
    <div>
      <div className="flex justify-between items-center p-3 bg-gray-300">
        {" "}
        <h1 className=" font-semibold">Admin</h1>
        <Link href={"/"} className="text-sm">
          Back to home
        </Link>{" "}
      </div>{" "}
      <p className="p-3 text-sm">
        Welcome, Admin {admin.user.user_metadata.firstname}!
      </p>
      <div className="flex space-x-2 px-5 my-5">
        <button
          onClick={() => setToggle(false)}
          className={`${
            !toggle
              ? "border border-black bg-black text-gray-100"
              : "bg-gray-100 hover:bg-gray-200"
          } rounded-full text-sm px-4 py-1 duration-300`}
        >
          Guests
        </button>
        <button
          onClick={() => setToggle(true)}
          className={`${
            toggle
              ? "border border-black bg-black text-gray-100"
              : "bg-gray-100 hover:bg-gray-200"
          } rounded-full text-sm px-4 py-1 duration-300`}
        >
          Reservations
        </button>
      </div>
      <div className="space-y-4 mx-10">
        {!toggle ? (
          <Guests guests={guests} />
        ) : (
          <Reservations reservations={reservation} />
        )}
      </div>
    </div>
  );
};

export default AdminPage;
