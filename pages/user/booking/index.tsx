import { createClient } from "@/utils/supabase/server-props";
import { GetServerSidePropsContext } from "next";
import type { User } from "@supabase/supabase-js";

import { UserNavbar } from "@/components/nav/user/UserNavbar";
import Page from "@/components/user/booking/Page";

export default function Booking({
  reservation,
  rooms,
  user,
}: {
  reservation: any;
  rooms: any;
  user: User;
}) {
  // console.log(reservation);
  // console.log(user);

  return (
    <>
      <UserNavbar user={user} />
      <Page reservation={reservation} rooms={rooms} />
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const supabase = createClient(context);
  const { data: users } = await supabase.auth.getUser();

  const { data: reservations, error: reservationsError } = await supabase
    .from("reservation")
    .select("*")
    .eq("user_id", users?.user?.id);

  if (reservationsError) {
    return {
      props: {
        user: users,
      },
    };
  }

  const roomIds = reservations.map((reservation) => reservation.room_id);

  const { data: rooms, error } = await supabase
    .from("rooms")
    .select("*")
    .in("id", roomIds);

  // console.log(rooms);

  // if (user.user?.app_metadata.role !== "super-admin") {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  // const { data: guests, error } = await supabase.from("guests").select("*");

  return {
    props: {
      reservation: reservations,
      rooms,
      user: users?.user ?? null,
    },
  };
};
