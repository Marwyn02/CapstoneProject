import React from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server-props";
import { GetServerSidePropsContext } from "next";

import { HotelChoiceForm } from "@/components/form/hotel/HotelChoiceForm";
import FormLayout from "@/components/layout/FormLayout";
import Head from "next/head";

type Rooms = {
  id: string;
  image: string;
  name: string;
  no_available: number;
  no_guest: number;
  price: number;
  created_at: string;
  amenities: {
    amenities: string[];
  };
}[];

export default function Hotel({ user, rooms }: { user: User; rooms: Rooms }) {
  return (
    <>
      <Head>
        <title>Coastal Charm - Reservations</title>
      </Head>
      <FormLayout user={user}>
        <HotelChoiceForm user={user} rooms={rooms} />
      </FormLayout>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const supabase = createClient(context);
  const { adults } = context.query;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: rooms, error } = await supabase
    .from("rooms")
    .select("*")
    .gte("no_adult", adults);

  return {
    props: {
      user,
      rooms,
    },
  };
};
