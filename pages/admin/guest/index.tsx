import React from "react";
import { GetServerSidePropsContext } from "next";
import { createClient } from "@/utils/supabase/server-props";
import type { Guest as GuestType } from "@/types/types";

import Guests from "@/components/admin/Guests";
import SideNav from "@/components/nav/admin/SideNav";

const Guest = ({ guests }: { guests: GuestType }) => {
  return (
    <section className="grid grid-cols-6 space-x-10 mr-10">
      <SideNav />
      <Guests guests={guests} />
    </section>
  );
};

export default Guest;

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

  const { data: guests } = await supabase.from("guests").select("*");

  return {
    props: {
      guests,
    },
  };
};
