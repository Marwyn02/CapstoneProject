import React, { Suspense } from "react";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server-props";

import { ReservationForm } from "@/components/form/reservation/ReservationForm";
import Summary from "@/components/form/reservation/Summary";
import FormLayout from "@/components/layout/FormLayout";

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
    <>
      <Head>
        <title>Coastal Charm - Reservations</title>
      </Head>
      <FormLayout user={user}>
        <Suspense fallback={<p>Loading...</p>}>
          <section className="grid grid-cols-8 md:px-8 lg:px-10">
            <ReservationForm user={user} rooms={rooms} />
            <Summary rooms={rooms} />
          </section>
        </Suspense>
      </FormLayout>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const supabase = createClient(context);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    return {
      props: { user },
    };
  } catch (error) {
    console.error("Error in Reservation Index: ", error);
  }
};
