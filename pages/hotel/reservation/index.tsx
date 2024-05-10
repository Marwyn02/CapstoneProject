import React from "react";
import { ReservationForm } from "@/components/form/ReservationForm";
import RoomSummary from "@/components/form/invoice/RoomSummary";
import FormLayout from "@/components/layout/FormLayout";

import { createClient } from "@/utils/supabase/server-props";
import { GetServerSidePropsContext } from "next";
import { User } from "@supabase/supabase-js";

export default function ReservationPage({ user }: { user: User }) {
  return (
    <FormLayout user={user}>
      <section className="grid grid-cols-2 md:px-20 lg:px-40">
        <ReservationForm user={user} />
        <RoomSummary />
      </section>
    </FormLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return {
    props: { user },
  };
}
