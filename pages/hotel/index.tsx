import React, { Suspense } from "react";
import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server-props";

import { HotelChoiceForm } from "@/components/form/hotel/HotelChoiceForm";
import FormLayout from "@/components/layout/FormLayout";

export default function Hotel({ user }: { user: User }) {
  return (
    <>
      <Head>
        <title>Coastal Charm - Reservations</title>
      </Head>
      <FormLayout user={user}>
        <Suspense fallback={<p>Loading...</p>}>
          <HotelChoiceForm user={user} />
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
      props: {
        user: user,
      },
    };
  } catch (error) {
    console.error("Error in Hotel Index: ", error);
  }
};
