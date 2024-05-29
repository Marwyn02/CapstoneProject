import React from "react";
import { ReservationForm } from "@/components/form/ReservationForm";
import RoomSummary from "@/components/form/invoice/RoomSummary";
import FormLayout from "@/components/layout/FormLayout";

import { createClient } from "@/utils/supabase/server-props";
import { GetServerSidePropsContext } from "next";
import type { User } from "@supabase/supabase-js";

type Rooms = {
  id: string;
  name: string;
  image: string;
  amenities: {
    amenities: string[];
  };
  no_available: number;
  created_at: string;
  price: number;
  no_guest: number;
};

export default function ReservationPage({
  user,
  rooms,
}: {
  user: User;
  rooms: Rooms;
}) {
  return (
    <FormLayout user={user}>
      <section className="grid grid-cols-2 gap-x-2 md:px-20 lg:px-64">
        <ReservationForm user={user} />
        <RoomSummary rooms={rooms} />
      </section>
    </FormLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);
  const { rm } = context.query;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: rooms, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("name", rm);

  const [targetRoom]: any = rooms;
  const room = { ...targetRoom };

  if (error) {
    console.error(error, "Error");
  }

  return {
    props: { user, rooms: room },
  };
}
