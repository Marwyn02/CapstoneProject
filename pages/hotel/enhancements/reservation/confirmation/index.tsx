import React from "react";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import type { Reservation } from "@/types/types";
import { createClient } from "@/utils/supabase/static-props";

import ConfirmationPage from "@/components/form/confirmation/Confirmation";
import FormLayout from "@/components/layout/FormLayout";

const Confirmation = ({ reservation }: { reservation: Reservation }) => {
  return (
    <>
      <Head>
        <title>Coastal Charm - Confirmation</title>
      </Head>
      <FormLayout>
        <ConfirmationPage />
      </FormLayout>
    </>
  );
};

export default Confirmation;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const supabase = createClient();

  const { data: reservation } = await supabase
    .from("reservations")
    .select("*")
    .single();

  return {
    props: {
      reservation,
    },
  };
};
