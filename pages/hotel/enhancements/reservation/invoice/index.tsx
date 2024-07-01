import React from "react";
import RoomInvoice from "@/components/form/invoice/RoomInvoice";

import { GetServerSidePropsContext } from "next";
import { createClient } from "@/utils/supabase/server-props";
import type { User } from "@supabase/supabase-js";
import FormLayout from "@/components/layout/FormLayout";

const ReservationInvoicePage = ({ user }: { user: User }) => {
  return (
    <FormLayout user={user}>
      <RoomInvoice />
    </FormLayout>
  );
};

export default ReservationInvoicePage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const supabase = createClient(context);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    props: {
      user,
    },
  };
};
