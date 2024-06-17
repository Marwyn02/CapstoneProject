import React from "react";
import { GetServerSidePropsContext } from "next";
import { createClient } from "@/utils/supabase/server-props";
import type { Reservation as ReservationType } from "@/types/types";

import Reservations from "@/components/admin/Reservations";
import SideNav from "@/components/nav/admin/SideNav";

const Reservation = ({ reservation }: { reservation: ReservationType }) => {
  return (
    <section className="grid grid-cols-6 space-x-10 mr-10">
      <SideNav />
      <Reservations reservations={reservation} />
    </section>
  );
};

export default Reservation;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const supabase = createClient(context);

  // Call the session if the user is a super admin
  const { data: user } = await supabase.auth.getUser();

  // Check if the user is a super admin
  if (user.user?.app_metadata.role !== "super-admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { data: reservation } = await supabase.from("reservation").select("*");

  return {
    props: {
      reservation,
    },
  };
};
