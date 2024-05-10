import React from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server-props";
import { GetServerSidePropsContext } from "next";

import { HotelChoiceForm } from "@/components/form/hotel/HotelChoiceForm";
import FormLayout from "@/components/layout/FormLayout";

export default function HotelForm({ user }: { user: User }) {
  return (
    <FormLayout user={user}>
      <HotelChoiceForm user={user} />
    </FormLayout>
  );
}

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
